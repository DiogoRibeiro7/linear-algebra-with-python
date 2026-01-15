from __future__ import annotations

from dataclasses import dataclass

import numpy as np
import numpy.typing as npt

from .decompositions import qr_gram_schmidt
from .utils import as_1d, as_2d, FloatArray


@dataclass(frozen=True)
class LeastSquaresResult:
    x: FloatArray
    residual_norm: float
    method: str


def least_squares_normal_eq(A: npt.ArrayLike, b: npt.ArrayLike) -> LeastSquaresResult:
    """
    Solve (Aᵀ A) x = Aᵀ b directly. This squares the condition number of A,
    so tiny perturbations to A or b can lead to large solution errors.
    """
    A0 = as_2d(A)
    b0 = as_1d(b)
    if A0.shape[0] < A0.shape[1]:
        raise ValueError("Normal equations require at least as many rows as columns.")

    AtA = A0.T @ A0
    Atb = A0.T @ b0
    x = np.linalg.solve(AtA, Atb)
    residual = A0 @ x - b0
    return LeastSquaresResult(
        x=x,
        residual_norm=float(np.linalg.norm(residual)),
        method="normal_eq",
    )


def least_squares_qr(A: npt.ArrayLike, b: npt.ArrayLike) -> LeastSquaresResult:
    """
    Solve the least squares problem via QR decomposition so we never square
    the condition number. This is numerically stable even when A is ill-conditioned.
    """
    A0 = as_2d(A)
    b0 = as_1d(b)
    if A0.shape[0] < A0.shape[1]:
        raise ValueError("QR least squares requires at least as many rows as columns.")

    qr_result = qr_gram_schmidt(A0, method="modified")
    Qtb = qr_result.Q.T @ b0
    x = np.linalg.solve(qr_result.R, Qtb)
    residual = A0 @ x - b0
    return LeastSquaresResult(
        x=x,
        residual_norm=float(np.linalg.norm(residual)),
        method="qr",
    )
