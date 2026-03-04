from __future__ import annotations

from dataclasses import dataclass

import numpy as np
import numpy.typing as npt

Array = npt.NDArray[np.floating]


def _as_array(a: npt.ArrayLike) -> Array:
    return np.array(a, dtype=float)


def assert_close(label: str, actual: npt.ArrayLike, expected: npt.ArrayLike, *, tol: float = 1e-9) -> None:
    actual_arr = _as_array(actual)
    expected_arr = _as_array(expected)
    if not np.allclose(actual_arr, expected_arr, rtol=tol, atol=tol):
        diff = np.linalg.norm(actual_arr - expected_arr)
        raise AssertionError(f"{label} not close (|diff|={diff:.3e}, tol={tol})")


def is_upper_triangular(A: npt.ArrayLike, *, tol: float = 1e-9) -> bool:
    arr = _as_array(A)
    if arr.ndim != 2:
        raise ValueError("Input must be a 2D matrix.")
    return bool(np.allclose(arr, np.triu(arr), atol=tol, rtol=0.0))


def is_orthonormal(Q: npt.ArrayLike, *, tol: float = 1e-9) -> bool:
    arr = _as_array(Q)
    if arr.ndim != 2:
        raise ValueError("Input must be a 2D matrix.")
    m, n = arr.shape
    if m < n:
        return False
    I = np.eye(n)
    return bool(np.allclose(arr.T @ arr, I, atol=tol, rtol=0.0))


@dataclass(frozen=True)
class RelativeError:
    absolute: float
    relative: float


def relative_error(actual: npt.ArrayLike, expected: npt.ArrayLike) -> RelativeError:
    actual_arr = _as_array(actual).reshape(-1)
    expected_arr = _as_array(expected).reshape(-1)
    diff = float(np.linalg.norm(actual_arr - expected_arr))
    denom = float(np.linalg.norm(expected_arr))
    rel = diff / denom if denom > 0 else float("inf")
    return RelativeError(absolute=diff, relative=rel)
