from __future__ import annotations

import numpy as np
import numpy.typing as npt

from .utils import as_2d

FloatArray = npt.NDArray[np.floating]


def is_orthonormal(Q: npt.ArrayLike, *, tol: float = 1e-10) -> bool:
    """
    True when the columns of Q are orthonormal (Q^T Q = I) to tolerance.
    """
    mat = as_2d(Q)
    n_cols = mat.shape[1]
    return bool(np.allclose(mat.T @ mat, np.eye(n_cols), atol=tol, rtol=tol))


def is_upper_triangular(R: npt.ArrayLike, *, tol: float = 1e-12) -> bool:
    """
    Return True if all entries below the main diagonal are smaller than tol.
    """
    mat = as_2d(R)
    tril = np.tril(mat, k=-1)
    return bool(np.all(np.abs(tril) <= tol))


def relative_error(a: npt.ArrayLike, b: npt.ArrayLike) -> float:
    """
    Relative error between a and b: ||a - b||_2 / max(||b||_2, eps).
    """
    aa = np.asarray(a, dtype=np.float64)
    bb = np.asarray(b, dtype=np.float64)
    diff = np.linalg.norm(aa - bb)
    denom = float(np.linalg.norm(bb))
    if denom < 1e-15:
        denom = 1e-15
    return float(diff / denom)


def assert_close(name: str, got: npt.ArrayLike, expected: npt.ArrayLike, *, tol: float = 1e-8) -> None:
    """
    Raise an AssertionError with a helpful message when got and expected differ.
    """
    if not np.allclose(got, expected, atol=tol, rtol=tol):
        rel = relative_error(got, expected)
        raise AssertionError(
            f"{name} failed: relative error {rel:.2e} exceeds tol={tol}. got={got!r}, expected={expected!r}"
        )
