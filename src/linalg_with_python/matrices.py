from __future__ import annotations
import numpy as np
import numpy.typing as npt
from .utils import as_2d, as_1d
FloatArray = npt.NDArray[np.floating]

def matvec(A: npt.ArrayLike, x: npt.ArrayLike) -> FloatArray:
    AA = as_2d(A); xx = as_1d(x)
    if AA.shape[1] != xx.shape[0]:
        raise ValueError("Incompatible shapes for matvec.")
    return AA @ xx
