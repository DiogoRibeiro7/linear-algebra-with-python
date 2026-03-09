from __future__ import annotations

import numpy as np
import numpy.typing as npt

Array = npt.NDArray[np.floating]


def _as_2d(A: npt.ArrayLike) -> Array:
    arr = np.array(A, dtype=float)
    if arr.ndim != 2:
        raise ValueError("Input must be a 2D matrix.")
    return arr


def qr_gram_schmidt(A: npt.ArrayLike) -> tuple[Array, Array]:
    """Compute QR decomposition using classical Gram-Schmidt."""
    arr = _as_2d(A)
    m, n = arr.shape
    Q = np.zeros((m, n), dtype=float)
    R = np.zeros((n, n), dtype=float)

    for j in range(n):
        v = arr[:, j].copy()
        for i in range(j):
            R[i, j] = float(np.dot(Q[:, i], v))
            v = v - R[i, j] * Q[:, i]
        R[j, j] = float(np.linalg.norm(v))
        if R[j, j] <= 1e-12:
            raise ValueError("Matrix has linearly dependent columns.")
        Q[:, j] = v / R[j, j]

    return Q, R
