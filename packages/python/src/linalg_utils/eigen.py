from __future__ import annotations

from dataclasses import dataclass

import numpy as np
import numpy.typing as npt

Array = npt.NDArray[np.floating]


def _as_square(A: npt.ArrayLike) -> Array:
    arr = np.array(A, dtype=float)
    if arr.ndim != 2:
        raise ValueError("Input must be a 2D matrix.")
    if arr.shape[0] != arr.shape[1]:
        raise ValueError("Matrix must be square.")
    return arr


def rayleigh_quotient(A: npt.ArrayLike, v: npt.ArrayLike) -> float:
    A_arr = _as_square(A)
    v_arr = np.array(v, dtype=float).reshape(-1)
    if A_arr.shape[0] != v_arr.shape[0]:
        raise ValueError("Incompatible dimensions between A and v.")
    num = float(v_arr.T @ A_arr @ v_arr)
    den = float(v_arr.T @ v_arr)
    if abs(den) <= 1e-12:
        raise ValueError("Vector must be non-zero.")
    return num / den


@dataclass(frozen=True)
class Eigen2x2Result:
    eigenvalues: Array
    eigenvectors: Array


def eigen_2x2(A: npt.ArrayLike) -> Eigen2x2Result:
    A_arr = _as_square(A)
    if A_arr.shape != (2, 2):
        raise ValueError("Matrix must be 2x2.")
    values, vectors = np.linalg.eig(A_arr)
    return Eigen2x2Result(
        eigenvalues=np.array(values, dtype=float),
        eigenvectors=np.array(vectors, dtype=float),
    )


@dataclass(frozen=True)
class PowerIterationResult:
    eigenvalue: float
    eigenvector: Array
    iterations: int


def power_iteration(
    A: npt.ArrayLike, *, num_iters: int = 1000, tol: float = 1e-10, seed: int | None = None
) -> PowerIterationResult:
    A_arr = _as_square(A)
    n = A_arr.shape[0]
    rng = np.random.default_rng(seed)
    b_k: Array = np.array(rng.normal(size=n), dtype=float)
    b_k = b_k / np.linalg.norm(b_k)
    eigenvalue = 0.0

    for i in range(1, num_iters + 1):
        b_k1: Array = A_arr @ b_k
        norm = float(np.linalg.norm(b_k1))
        if norm <= 1e-12:
            raise ValueError("Power iteration failed: zero vector encountered.")
        b_k1 = b_k1 / norm
        new_eigenvalue = float(b_k1.T @ A_arr @ b_k1)
        if abs(new_eigenvalue - eigenvalue) <= tol:
            return PowerIterationResult(eigenvalue=new_eigenvalue, eigenvector=b_k1, iterations=i)
        b_k = b_k1
        eigenvalue = new_eigenvalue

    return PowerIterationResult(eigenvalue=eigenvalue, eigenvector=b_k, iterations=num_iters)
