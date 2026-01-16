from __future__ import annotations
from dataclasses import dataclass
import numpy as np
import numpy.typing as npt
FloatArray = npt.NDArray[np.floating]

@dataclass(frozen=True)
class LinearMap2D:
    A: FloatArray
    def __post_init__(self) -> None:
        if self.A.shape != (2, 2):
            raise ValueError("LinearMap2D requires a 2x2 matrix.")
    def apply(self, pts: FloatArray) -> FloatArray:
        if pts.ndim != 2 or pts.shape[1] != 2:
            raise ValueError("pts must be (N, 2).")
        return (self.A @ pts.T).T

def unit_circle(n: int = 400) -> FloatArray:
    t = np.linspace(0.0, 2.0 * np.pi, n, endpoint=True)
    return np.column_stack([np.cos(t), np.sin(t)]).astype(np.float64)


def unit_square(n: int = 400) -> FloatArray:
    if n < 4:
        raise ValueError("unit_square requires at least 4 sample points.")
    t = np.linspace(0.0, 4.0, n, endpoint=True)
    coords = np.empty((n, 2), dtype=np.float64)
    coords[t <= 1.0, 0] = t[t <= 1.0]
    coords[t <= 1.0, 1] = 0.0
    mask = (t > 1.0) & (t <= 2.0)
    coords[mask, 0] = 1.0
    coords[mask, 1] = t[mask] - 1.0
    mask = (t > 2.0) & (t <= 3.0)
    coords[mask, 0] = 3.0 - t[mask]
    coords[mask, 1] = 1.0
    mask = t > 3.0
    coords[mask, 0] = 0.0
    coords[mask, 1] = 4.0 - t[mask]
    return coords


def apply_linear_map(matrix: npt.ArrayLike, pts: npt.ArrayLike) -> FloatArray:
    """
    Apply a 2×2 matrix to a set of 2D points using the column-vector convention:
    returns `(A @ pts.T).T`.
    """
    return LinearMap2D(np.asarray(matrix, dtype=np.float64)).apply(np.asarray(pts, dtype=np.float64))
