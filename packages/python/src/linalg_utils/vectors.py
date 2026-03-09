from __future__ import annotations

import math
from dataclasses import dataclass

import numpy as np
import numpy.typing as npt

Array = npt.NDArray[np.floating]


def _as_vector(v: npt.ArrayLike) -> Array:
    arr = np.array(v, dtype=float).reshape(-1)
    if arr.size == 0:
        raise ValueError("Vector must be non-empty.")
    return arr


def dot(a: npt.ArrayLike, b: npt.ArrayLike) -> float:
    """Dot product of two vectors."""
    a_arr = _as_vector(a)
    b_arr = _as_vector(b)
    if a_arr.shape != b_arr.shape:
        raise ValueError("Vectors must have the same shape.")
    return float(np.dot(a_arr, b_arr))


def norm(v: npt.ArrayLike) -> float:
    """Euclidean norm of a vector."""
    arr = _as_vector(v)
    return float(np.linalg.norm(arr))


def angle(a: npt.ArrayLike, b: npt.ArrayLike) -> float:
    """Angle between vectors in radians."""
    a_arr = _as_vector(a)
    b_arr = _as_vector(b)
    denom = np.linalg.norm(a_arr) * np.linalg.norm(b_arr)
    if denom <= 0:
        raise ValueError("Vectors must be non-zero to compute an angle.")
    cos_theta = float(np.dot(a_arr, b_arr) / denom)
    cos_theta = max(-1.0, min(1.0, cos_theta))
    return float(math.acos(cos_theta))


def projection(a: npt.ArrayLike, b: npt.ArrayLike) -> Array:
    """Project vector a onto vector b."""
    a_arr = _as_vector(a)
    b_arr = _as_vector(b)
    denom = float(np.dot(b_arr, b_arr))
    if abs(denom) <= 1e-12:
        raise ValueError("Cannot project onto the zero vector.")
    return (float(np.dot(a_arr, b_arr)) / denom) * b_arr


@dataclass(frozen=True)
class RelativeError:
    absolute: float
    relative: float

    @classmethod
    def from_vectors(cls, actual: npt.ArrayLike, expected: npt.ArrayLike) -> RelativeError:
        a_arr = _as_vector(actual)
        e_arr = _as_vector(expected)
        diff = np.linalg.norm(a_arr - e_arr)
        denom = np.linalg.norm(e_arr)
        rel = diff / denom if denom > 0 else float("inf")
        return cls(absolute=float(diff), relative=float(rel))
