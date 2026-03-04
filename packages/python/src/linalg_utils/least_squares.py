from __future__ import annotations

from dataclasses import dataclass

import numpy as np
import numpy.typing as npt

Array = npt.NDArray[np.floating]


def _as_2d(A: npt.ArrayLike) -> Array:
    arr = np.array(A, dtype=float)
    if arr.ndim != 2:
        raise ValueError("Input must be a 2D matrix.")
    return arr


def _as_vec(b: npt.ArrayLike) -> Array:
    return np.array(b, dtype=float).reshape(-1)


@dataclass(frozen=True)
class LeastSquaresResult:
    x: Array
    residual: Array
    residual_norm: float
    method: str


@dataclass(frozen=True)
class RelativeError:
    absolute: float
    relative: float

    @classmethod
    def from_vectors(cls, actual: npt.ArrayLike, expected: npt.ArrayLike) -> "RelativeError":
        a_arr = np.array(actual, dtype=float).reshape(-1)
        e_arr = np.array(expected, dtype=float).reshape(-1)
        diff = float(np.linalg.norm(a_arr - e_arr))
        denom = float(np.linalg.norm(e_arr))
        rel = diff / denom if denom > 0 else float("inf")
        return cls(absolute=diff, relative=rel)


def least_squares_normal_eq(A: npt.ArrayLike, b: npt.ArrayLike) -> LeastSquaresResult:
    """Solve least squares via normal equations."""
    A_arr = _as_2d(A)
    b_arr = _as_vec(b)
    ATA = A_arr.T @ A_arr
    ATb = A_arr.T @ b_arr
    try:
        x = np.linalg.solve(ATA, ATb)
    except np.linalg.LinAlgError:
        x, *_ = np.linalg.lstsq(ATA, ATb, rcond=None)
    residual = A_arr @ x - b_arr
    residual_norm = float(np.linalg.norm(residual))
    return LeastSquaresResult(x=x, residual=residual, residual_norm=residual_norm, method="normal_eq")


def least_squares_qr(A: npt.ArrayLike, b: npt.ArrayLike) -> LeastSquaresResult:
    """Solve least squares via QR decomposition."""
    A_arr = _as_2d(A)
    b_arr = _as_vec(b)
    Q, R = np.linalg.qr(A_arr, mode="reduced")
    x = np.linalg.solve(R, Q.T @ b_arr)
    residual = A_arr @ x - b_arr
    residual_norm = float(np.linalg.norm(residual))
    return LeastSquaresResult(x=x, residual=residual, residual_norm=residual_norm, method="qr")
