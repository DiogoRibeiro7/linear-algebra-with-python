from __future__ import annotations

import numpy as np
import numpy.typing as npt
from scipy.linalg import lu, lu_factor, lu_solve

Array = npt.NDArray[np.floating]


def _as_square(A: npt.ArrayLike) -> Array:
    arr = np.array(A, dtype=float)
    if arr.ndim != 2:
        raise ValueError("Input must be a 2D matrix.")
    if arr.shape[0] != arr.shape[1]:
        raise ValueError("Matrix must be square.")
    return arr


def decomposicao_lu(A: npt.ArrayLike) -> tuple[Array, Array, Array]:
    """Compute the LU decomposition with permutation.

    Args:
        A: Square matrix.

    Returns:
        Tuple (P, L, U) such that P @ A = L @ U.

    Raises:
        ValueError: If A is not square.

    Example:
        >>> P, L, U = decomposicao_lu([[1, 2], [3, 4]])
        >>> np.allclose(P @ np.array([[1, 2], [3, 4]]), L @ U)
        True
    """
    arr = _as_square(A)
    P, L, U = lu(arr)
    np.testing.assert_allclose(P @ arr, L @ U, rtol=1e-7, atol=1e-9)
    return P, L, U


def resolver_lu(A: npt.ArrayLike, b: npt.ArrayLike) -> Array:
    """Solve Ax = b using LU factorization.

    Args:
        A: Square matrix.
        b: Right-hand side vector.

    Returns:
        Solution vector x.

    Raises:
        ValueError: If dimensions are incompatible.

    Example:
        >>> resolver_lu([[2, 0], [0, 3]], [4, 9])
        array([2., 3.])
    """
    arr = _as_square(A)
    b_arr = np.array(b, dtype=float).reshape(-1)
    if b_arr.shape[0] != arr.shape[0]:
        raise ValueError("Incompatible dimensions between A and b.")
    lu_fac = lu_factor(arr)
    x = lu_solve(lu_fac, b_arr)
    return x.astype(float)


def resolver_lu_multiplos_rhs(A: npt.ArrayLike, B: npt.ArrayLike) -> Array:
    """Solve AX = B with multiple right-hand sides using LU factorization.

    Args:
        A: Square matrix.
        B: Right-hand side matrix with multiple columns.

    Returns:
        Solution matrix X.

    Raises:
        ValueError: If dimensions are incompatible.

    Example:
        >>> resolver_lu_multiplos_rhs([[2, 0], [0, 3]], [[4, 8], [9, 12]])
        array([[2., 4.],
               [3., 4.]])
    """
    arr = _as_square(A)
    B_arr = np.array(B, dtype=float)
    if B_arr.ndim != 2 or B_arr.shape[0] != arr.shape[0]:
        raise ValueError("Incompatible dimensions between A and B.")
    lu_fac = lu_factor(arr)
    X = lu_solve(lu_fac, B_arr)
    return X.astype(float)


def det_via_lu(A: npt.ArrayLike) -> float:
    """Compute determinant using LU decomposition.

    Args:
        A: Square matrix.

    Returns:
        Determinant value.

    Raises:
        ValueError: If A is not square.

    Example:
        >>> det_via_lu([[1, 2], [3, 4]])
        -2.0
    """
    arr = _as_square(A)
    P, L, U = lu(arr)
    det_P = float(np.linalg.det(P))
    det_U = float(np.prod(np.diag(U)))
    return det_P * det_U
