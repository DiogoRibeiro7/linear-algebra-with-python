from __future__ import annotations
import math
import numpy as np
import numpy.typing as npt
from .utils import as_1d
FloatArray = npt.NDArray[np.floating]

def dot(u: npt.ArrayLike, v: npt.ArrayLike) -> float:
    uu = as_1d(u); vv = as_1d(v)
    if uu.shape != vv.shape:
        raise ValueError("u and v must have the same shape.")
    return float(np.dot(uu, vv))

def norm(u: npt.ArrayLike) -> float:
    return float(np.linalg.norm(as_1d(u), ord=2))

def normalize(u: npt.ArrayLike, *, eps: float = 1e-15) -> FloatArray:
    uu = as_1d(u)
    n = float(np.linalg.norm(uu))
    if n <= eps:
        raise ValueError("Cannot normalize a near-zero vector.")
    return uu / n

def angle(u: npt.ArrayLike, v: npt.ArrayLike, *, eps: float = 1e-15) -> float:
    nu = norm(u); nv = norm(v)
    if nu <= eps or nv <= eps:
        raise ValueError("Angle is undefined for near-zero vectors.")
    c = dot(u, v) / (nu * nv)
    c = max(-1.0, min(1.0, c))
    return float(math.acos(c))

def projection(u: npt.ArrayLike, onto: npt.ArrayLike, *, eps: float = 1e-15) -> FloatArray:
    uu = as_1d(u); vv = as_1d(onto)
    denom = float(np.dot(vv, vv))
    if denom <= eps:
        raise ValueError("Cannot project onto a near-zero vector.")
    return (float(np.dot(uu, vv)) / denom) * vv
