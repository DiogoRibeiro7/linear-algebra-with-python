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

def qr_gram_schmidt(
    A: npt.ArrayLike,
    *,
    method: Method = "modified",
    eps: float = 1e-12,
    return_full: bool = False,
) -> QRResult:
    """
    Thin (or optionally full) QR decomposition via Gram-Schmidt.

    Args:
        method: Either 'modified' or 'classical' Gram-Schmidt.
        return_full: When True, extend Q to an m×m orthonormal basis and R to m×n.
        eps: Threshold for detecting rank-deficiency.
    """
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
            raise ValueError(
                f"Column {j} appears linearly dependent: residual norm {R[j, j]:.2e} <= eps."
            )
        Q[:, j] = v / R[j, j]

    if return_full:
        full_cols: list[FloatArray] = [Q[:, j] for j in range(n)]
        target = m
        for candidate_idx in range(m):
            if len(full_cols) >= target:
                break
            v = np.eye(m, dtype=np.float64)[:, candidate_idx]
            for existing in full_cols:
                proj = float(existing @ v)
                v = v - proj * existing
            norm_v = float(np.linalg.norm(v))
            if norm_v <= eps:
                continue
            full_cols.append(v / norm_v)
        while len(full_cols) < target:
            v = np.random.default_rng().normal(size=(m,))
            for existing in full_cols:
                proj = float(existing @ v)
                v = v - proj * existing
            norm_v = float(np.linalg.norm(v))
            if norm_v <= eps:
                continue
            full_cols.append(v / norm_v)
        Q_full = np.column_stack(full_cols)
        R_full = np.zeros((m, n), dtype=np.float64)
        R_full[:n, :] = R
        return QRResult(Q=Q_full, R=R_full)

    return QRResult(Q=Q, R=R)
