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


def unit_circle(num: int = 200) -> Array:
    theta = np.linspace(0.0, 2.0 * np.pi, num)
    return np.column_stack((np.cos(theta), np.sin(theta)))


def unit_square(num: int = 100) -> Array:
    t = np.linspace(0.0, 1.0, num)
    top = np.column_stack((t, np.ones_like(t)))
    right = np.column_stack((np.ones_like(t), t[::-1]))
    bottom = np.column_stack((t[::-1], np.zeros_like(t)))
    left = np.column_stack((np.zeros_like(t), t))
    return np.vstack((top, right, bottom, left))


def apply_linear_map(A: npt.ArrayLike, points: npt.ArrayLike) -> Array:
    mat = _as_2d(A)
    pts = np.array(points, dtype=float)
    if pts.ndim == 1:
        pts = pts.reshape(1, -1)
    if mat.shape[1] != pts.shape[1]:
        raise ValueError("Incompatible dimensions between A and points.")
    return (mat @ pts.T).T


@dataclass(frozen=True)
class LinearMap2D:
    A: Array

    def __post_init__(self) -> None:
        arr = _as_2d(self.A)
        if arr.shape != (2, 2):
            raise ValueError("LinearMap2D requires a 2x2 matrix.")
        object.__setattr__(self, "A", arr)

    def apply(self, points: npt.ArrayLike) -> Array:
        return apply_linear_map(self.A, points)
