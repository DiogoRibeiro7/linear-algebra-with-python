from __future__ import annotations

import numpy as np
import numpy.typing as npt

FloatArray = npt.NDArray[np.floating]


def det_2x2(A: npt.ArrayLike) -> float:
    """
    Determinant of a 2×2 matrix: the signed area scaling of the plane when
    the matrix acts on the standard basis.
    """
    mat = np.asarray(A, dtype=np.float64)
    if mat.shape != (2, 2):
        raise ValueError("det_2x2 expects a 2×2 matrix.")
    return float(mat[0, 0] * mat[1, 1] - mat[0, 1] * mat[1, 0])


def inv_2x2(A: npt.ArrayLike, *, tol: float = 1e-12) -> FloatArray:
    """
    Inverse of a 2×2 matrix computed via the explicit adjugate formula.
    Raises if the matrix collapses the plane (determinant too small).
    """
    mat = np.asarray(A, dtype=np.float64)
    if mat.shape != (2, 2):
        raise ValueError("inv_2x2 expects a 2×2 matrix.")
    determinant = det_2x2(mat)
    if abs(determinant) <= tol:
        raise ValueError("Matrix is not invertible (determinant is zero or too close).")
    return np.array(
        [[mat[1, 1], -mat[0, 1]], [-mat[1, 0], mat[0, 0]]],
        dtype=np.float64,
    ) / determinant


def is_invertible(A: npt.ArrayLike, *, tol: float = 1e-12) -> bool:
    """
    Determines whether a square matrix is invertible by checking its condition number:
    a very ill-conditioned matrix behaves like a collapse and fails the test.
    """
    mat = np.asarray(A, dtype=np.float64)
    if mat.ndim != 2 or mat.shape[0] != mat.shape[1]:
        raise ValueError("is_invertible requires a square matrix.")
    cond = np.linalg.cond(mat)
    if np.isinf(cond) or cond > 1.0 / tol:
        return False
    return True
