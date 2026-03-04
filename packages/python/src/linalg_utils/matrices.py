from __future__ import annotations

import numpy as np
import numpy.typing as npt

Array = npt.NDArray[np.floating]


def _as_2d_array(A: npt.ArrayLike) -> Array:
    """Convert input to a 2D float array."""
    arr = np.array(A, dtype=float)
    if arr.ndim != 2:
        raise ValueError("Input must be a 2D matrix.")
    return arr


def criar_matriz_nula(m: int, n: int) -> Array:
    """Create a zero matrix with shape (m, n).

    Args:
        m: Number of rows (positive integer).
        n: Number of columns (positive integer).

    Returns:
        Zero matrix of shape (m, n).

    Raises:
        ValueError: If m or n is not a positive integer.

    Example:
        >>> criar_matriz_nula(2, 3)
        array([[0., 0., 0.],
               [0., 0., 0.]])
    """
    if m <= 0 or n <= 0:
        raise ValueError("Matrix dimensions must be positive integers.")
    return np.zeros((m, n), dtype=float)


def criar_identidade(n: int) -> Array:
    """Create an identity matrix of size n.

    Args:
        n: Size of the identity matrix (positive integer).

    Returns:
        Identity matrix of shape (n, n).

    Raises:
        ValueError: If n is not a positive integer.

    Example:
        >>> criar_identidade(3)
        array([[1., 0., 0.],
               [0., 1., 0.],
               [0., 0., 1.]])
    """
    if n <= 0:
        raise ValueError("Matrix size must be a positive integer.")
    return np.eye(n, dtype=float)


def criar_diagonal(valores: list[float]) -> Array:
    """Create a diagonal matrix from a list of values.

    Args:
        valores: List of diagonal values.

    Returns:
        Diagonal matrix with the given values.

    Raises:
        ValueError: If the list is empty.

    Example:
        >>> criar_diagonal([1.0, 2.0, 3.0])
        array([[1., 0., 0.],
               [0., 2., 0.],
               [0., 0., 3.]])
    """
    if not valores:
        raise ValueError("Diagonal values list cannot be empty.")
    return np.diag(np.array(valores, dtype=float))


def criar_triangular_superior(A: npt.ArrayLike) -> Array:
    """Extract the upper triangular part of a matrix.

    Args:
        A: Input matrix.

    Returns:
        Upper triangular matrix with the same shape as A.

    Raises:
        ValueError: If A is not a 2D matrix.

    Example:
        >>> criar_triangular_superior([[1, 2], [3, 4]])
        array([[1., 2.],
               [0., 4.]])
    """
    arr = _as_2d_array(A)
    return np.triu(arr)


def criar_triangular_inferior(A: npt.ArrayLike) -> Array:
    """Extract the lower triangular part of a matrix.

    Args:
        A: Input matrix.

    Returns:
        Lower triangular matrix with the same shape as A.

    Raises:
        ValueError: If A is not a 2D matrix.

    Example:
        >>> criar_triangular_inferior([[1, 2], [3, 4]])
        array([[1., 0.],
               [3., 4.]])
    """
    arr = _as_2d_array(A)
    return np.tril(arr)


def criar_simetrica(n: int, seed: int | None = None) -> Array:
    """Create a random symmetric matrix of size n.

    Args:
        n: Size of the square matrix (positive integer).
        seed: Optional random seed for reproducibility.

    Returns:
        Symmetric matrix of shape (n, n).

    Raises:
        ValueError: If n is not a positive integer.

    Example:
        >>> criar_simetrica(3, seed=0)
        array([[ 1.257...,  0.668...,  0.023...],
               [ 0.668...,  0.867..., -0.171...],
               [ 0.023..., -0.171..., -0.140...]])
    """
    if n <= 0:
        raise ValueError("Matrix size must be a positive integer.")
    rng = np.random.default_rng(seed)
    M = rng.normal(size=(n, n))
    return (M + M.T) / 2.0


def eh_quadrada(A: npt.ArrayLike) -> bool:
    """Check whether a matrix is square.

    Args:
        A: Input matrix.

    Returns:
        True if A is square, False otherwise.

    Raises:
        ValueError: If A is not a 2D matrix.

    Example:
        >>> eh_quadrada([[1, 2], [3, 4]])
        True
    """
    arr = _as_2d_array(A)
    return arr.shape[0] == arr.shape[1]


def dimensao(A: npt.ArrayLike) -> tuple[int, int]:
    """Return the dimensions of a matrix.

    Args:
        A: Input matrix.

    Returns:
        Tuple (m, n) with the number of rows and columns.

    Raises:
        ValueError: If A is not a 2D matrix.

    Example:
        >>> dimensao([[1, 2, 3], [4, 5, 6]])
        (2, 3)
    """
    arr = _as_2d_array(A)
    m, n = arr.shape
    return int(m), int(n)


def classificar_matriz(A: npt.ArrayLike) -> list[str]:
    """Classify a matrix by special types.

    Args:
        A: Input matrix.

    Returns:
        List of labels that apply to A.

    Raises:
        ValueError: If A is not a 2D matrix.

    Example:
        >>> classificar_matriz(np.eye(2))
        ['square', 'identity', 'diagonal', 'symmetric', 'upper_triangular', 'lower_triangular']
    """
    arr = _as_2d_array(A)
    m, n = arr.shape
    labels: list[str] = []
    is_square = m == n
    if is_square:
        labels.append("square")
    else:
        labels.append("rectangular")

    if np.allclose(arr, 0.0):
        labels.append("zero")

    if is_square:
        eye = np.eye(n, dtype=float)
        if np.allclose(arr, eye):
            labels.append("identity")

        diag_only = np.diag(np.diag(arr))
        if np.allclose(arr, diag_only):
            labels.append("diagonal")

        if np.allclose(arr, arr.T):
            labels.append("symmetric")

    if np.allclose(arr, np.triu(arr)):
        labels.append("upper_triangular")
    if np.allclose(arr, np.tril(arr)):
        labels.append("lower_triangular")

    return labels
