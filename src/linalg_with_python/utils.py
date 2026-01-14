from __future__ import annotations
import numpy as np
import numpy.typing as npt
FloatArray = npt.NDArray[np.floating]

def as_1d(x: npt.ArrayLike) -> FloatArray:
    arr = np.asarray(x, dtype=np.float64)
    if arr.ndim != 1:
        raise ValueError("Expected a 1D array.")
    if not np.all(np.isfinite(arr)):
        raise ValueError("Array must contain only finite values.")
    return arr

def as_2d(A: npt.ArrayLike) -> FloatArray:
    arr = np.asarray(A, dtype=np.float64)
    if arr.ndim != 2:
        raise ValueError("Expected a 2D array.")
    if not np.all(np.isfinite(arr)):
        raise ValueError("Matrix must contain only finite values.")
    return arr
