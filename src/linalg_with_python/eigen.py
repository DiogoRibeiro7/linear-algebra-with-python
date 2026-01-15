from __future__ import annotations
from dataclasses import dataclass
import math
from typing import Tuple

import numpy as np
import numpy.typing as npt

from .utils import as_1d, as_2d

FloatArray = npt.NDArray[np.floating]


@dataclass(frozen=True)
class Eigen2x2Result:
    eigenvalues: Tuple[float, float]
    eigenvectors: FloatArray


@dataclass(frozen=True)
class PowerIterationResult:
    eigenvalue: float
    eigenvector: FloatArray
    iterations: int


def rayleigh_quotient(A: npt.ArrayLike, x: npt.ArrayLike) -> float:
    """
    Compute (xᵀ A x) / (xᵀ x); equals the eigenvalue when x is an eigenvector.
    """
    AA = as_2d(A)
    xx = as_1d(x)
    if AA.shape[0] != AA.shape[1]:
        raise ValueError("A must be square.")
    if AA.shape[0] != xx.shape[0]:
        raise ValueError("Vector length must match matrix dimension.")
    denom = float(np.dot(xx, xx))
    if denom == 0.0:
        raise ValueError("Rayleigh quotient is undefined for the zero vector.")
    return float(np.dot(xx, AA @ xx)) / denom


def eigen_2x2(A: npt.ArrayLike) -> Eigen2x2Result:
    """
    Analytical eigenpairs for real 2×2 matrices with real eigenvalues.
    The 2×2 determinant gives the signed area scaling, while each eigenvector
    points along a direction that is only stretched by its eigenvalue.
    """
    mat = as_2d(A)
    if mat.shape != (2, 2):
        raise ValueError("eigen_2x2 requires a 2×2 matrix.")
    trace = float(mat[0, 0] + mat[1, 1])
    det = float(mat[0, 0] * mat[1, 1] - mat[0, 1] * mat[1, 0])
    disc = trace * trace - 4.0 * det
    if disc < 0.0:
        raise ValueError("Matrix does not have real eigenvalues.")
    sqrt_disc = math.sqrt(disc)
    lambda1 = 0.5 * (trace + sqrt_disc)
    lambda2 = 0.5 * (trace - sqrt_disc)

    def _eigenvector_for(lam: float) -> FloatArray:
        shifted = mat - lam * np.eye(2)
        row0 = shifted[0]
        row1 = shifted[1]

        def _vector_from(row: np.ndarray) -> FloatArray:
            if np.allclose(row, 0.0):
                return np.array([1.0, 0.0], dtype=np.float64)
            return np.array([-row[1], row[0]], dtype=np.float64)

        candidate = _vector_from(row0)
        if np.allclose(candidate, 0.0):
            candidate = _vector_from(row1)
        norm = float(np.linalg.norm(candidate))
        if norm == 0.0:
            raise ValueError("Unable to construct eigenvector.")
        return candidate / norm

    v1 = _eigenvector_for(lambda1)
    v2 = _eigenvector_for(lambda2)
    vectors = np.column_stack([v1, v2])
    return Eigen2x2Result(eigenvalues=(lambda1, lambda2), eigenvectors=vectors)


def power_iteration(
    A: npt.ArrayLike,
    *,
    max_iter: int = 10_000,
    tol: float = 1e-10,
    seed: int = 0,
) -> PowerIterationResult:
    """
    Approximate the dominant eigenvalue/vector pair. Converges when A has a
    unique largest-magnitude eigenvalue (a spectral gap) and the initial vector
    has nonzero component in that eigendirection; it may stall otherwise.
    Raises if the iteration hits the zero vector or if A is not square.
    """
    AA = as_2d(A)
    if AA.shape[0] != AA.shape[1]:
        raise ValueError("A must be square.")
    n = AA.shape[0]
    rng = np.random.default_rng(seed)
    x: FloatArray = np.asarray(rng.normal(size=n), dtype=np.float64)
    x = x / np.linalg.norm(x)

    last = 0.0
    for k in range(1, max_iter + 1):
        y = AA @ x
        ny = float(np.linalg.norm(y))
        if ny == 0.0:
            raise ValueError("Encountered zero vector.")
        x = y / ny
        lam = rayleigh_quotient(AA, x)
        if abs(lam - last) <= tol * max(1.0, abs(lam)):
            return PowerIterationResult(lam, x, k)
        last = lam
    return PowerIterationResult(last, x, max_iter)
