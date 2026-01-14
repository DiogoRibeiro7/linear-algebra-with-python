from __future__ import annotations
from dataclasses import dataclass
import numpy as np
import numpy.typing as npt
from .utils import as_2d
FloatArray = npt.NDArray[np.floating]

@dataclass(frozen=True)
class PowerIterationResult:
    eigenvalue: float
    eigenvector: FloatArray
    iterations: int

def power_iteration(A: npt.ArrayLike, *, max_iter: int = 10_000, tol: float = 1e-10, seed: int = 0) -> PowerIterationResult:
    AA = as_2d(A)
    if AA.shape[0] != AA.shape[1]:
        raise ValueError("A must be square.")
    n = AA.shape[0]
    rng = np.random.default_rng(seed)
    x = rng.normal(size=n).astype(np.float64)
    x = x / np.linalg.norm(x)

    last = 0.0
    for k in range(1, max_iter + 1):
        y = AA @ x
        ny = float(np.linalg.norm(y))
        if ny == 0.0:
            raise ValueError("Encountered zero vector.")
        x = y / ny
        lam = float(x.T @ (AA @ x))
        if abs(lam - last) <= tol * max(1.0, abs(lam)):
            return PowerIterationResult(lam, x, k)
        last = lam
    return PowerIterationResult(last, x, max_iter)
