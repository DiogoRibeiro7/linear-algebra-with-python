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
