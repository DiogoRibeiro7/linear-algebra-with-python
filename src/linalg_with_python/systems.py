from __future__ import annotations
from dataclasses import dataclass
import numpy as np
import numpy.typing as npt
from .utils import as_1d, as_2d
FloatArray = npt.NDArray[np.floating]

@dataclass(frozen=True)
class SolveResult:
    x: FloatArray
    residual_norm: float
    cond_A: float

def solve(A: npt.ArrayLike, b: npt.ArrayLike) -> SolveResult:
    AA = as_2d(A)
    bb = as_1d(b)
    if AA.shape[0] != AA.shape[1]:
        raise ValueError("A must be square.")
    if AA.shape[0] != bb.shape[0]:
        raise ValueError("b shape incompatible with A.")
    x = np.linalg.solve(AA, bb)
    r = AA @ x - bb
    return SolveResult(
        x=x,
        residual_norm=float(np.linalg.norm(r, ord=2)),
        cond_A=float(np.linalg.cond(AA)),
    )
