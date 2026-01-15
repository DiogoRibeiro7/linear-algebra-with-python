from __future__ import annotations
import math
import numpy as np
import numpy.typing as npt
from .utils import as_1d
FloatArray = npt.NDArray[np.floating]

def dot(u: npt.ArrayLike, v: npt.ArrayLike) -> float:
    uu = as_1d(u)
    vv = as_1d(v)
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
    nu = norm(u)
    nv = norm(v)
    if nu <= eps or nv <= eps:
        raise ValueError("Angle is undefined for near-zero vectors.")
    c = dot(u, v) / (nu * nv)
    c = max(-1.0, min(1.0, c))
    return float(math.acos(c))

def projection(u: npt.ArrayLike, onto: npt.ArrayLike, *, eps: float = 1e-15) -> FloatArray:
    uu = as_1d(u)
    vv = as_1d(onto)
    denom = float(np.dot(vv, vv))
    if denom <= eps:
        raise ValueError("Cannot project onto a near-zero vector.")
    return (float(np.dot(uu, vv)) / denom) * vv


def distance(u: npt.ArrayLike, v: npt.ArrayLike) -> float:
    uu = as_1d(u)
    vv = as_1d(v)
    if uu.shape != vv.shape:
        raise ValueError("u and v must have the same shape.")
    diff = uu - vv
    return float(np.linalg.norm(diff, ord=2))


def is_orthogonal(u: npt.ArrayLike, v: npt.ArrayLike, *, tol: float = 1e-10) -> bool:
    return abs(dot(u, v)) <= tol


def cosine_similarity(u: npt.ArrayLike, v: npt.ArrayLike) -> float:
    uu = as_1d(u)
    vv = as_1d(v)
    if uu.shape != vv.shape:
        raise ValueError("u and v must have the same shape.")
    nu = float(np.linalg.norm(uu))
    nv = float(np.linalg.norm(vv))
    eps = 1e-15
    if nu <= eps or nv <= eps:
        raise ValueError("Cosine similarity requires non-zero vectors.")
    return float(np.dot(uu, vv)) / (nu * nv)


def gram_schmidt(vectors: list[np.ndarray]) -> FloatArray:
    if not vectors:
        raise ValueError("At least one vector is required.")

    length: tuple[int, ...] | None = None
    basis: list[FloatArray] = []
    for vector in vectors:
        working = as_1d(vector)
        if length is None:
            length = working.shape
        elif working.shape != length:
            raise ValueError("All vectors must have the same shape.")
        working = np.asarray(working, dtype=np.float64)

        for existing in basis:
            coeff = float(np.dot(existing, working))
            working = working - coeff * existing

        norm_w = float(np.linalg.norm(working))
        if norm_w <= 1e-15:
            raise ValueError("Input vectors must be linearly independent.")

        basis.append(working / norm_w)

    return np.column_stack(basis)
