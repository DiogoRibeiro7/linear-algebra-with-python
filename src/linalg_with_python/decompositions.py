from __future__ import annotations
from dataclasses import dataclass
from typing import Literal
import numpy as np
import numpy.typing as npt
from .utils import as_2d
FloatArray = npt.NDArray[np.floating]
Method = Literal["classical", "modified"]

@dataclass(frozen=True)
class QRResult:
    Q: FloatArray
    R: FloatArray

def qr_gram_schmidt(A: npt.ArrayLike, *, method: Method = "modified", eps: float = 1e-12) -> QRResult:
    A0 = as_2d(A)
    m, n = A0.shape
    Q = np.zeros((m, n), dtype=np.float64)
    R = np.zeros((n, n), dtype=np.float64)

    if method not in ("classical", "modified"):
        raise ValueError("Unknown method.")

    for j in range(n):
        v = A0[:, j].copy()
        if method == "classical":
            for i in range(j):
                R[i, j] = float(Q[:, i].T @ A0[:, j])
                v = v - R[i, j] * Q[:, i]
        else:
            for i in range(j):
                R[i, j] = float(Q[:, i].T @ v)
                v = v - R[i, j] * Q[:, i]
        R[j, j] = float(np.linalg.norm(v))
        if R[j, j] <= eps:
            raise ValueError("Matrix appears rank-deficient.")
        Q[:, j] = v / R[j, j]

    return QRResult(Q=Q, R=R)
