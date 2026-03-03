from __future__ import annotations

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


def det_2x2(A: npt.ArrayLike) -> float:
    """Compute the determinant of a 2x2 matrix.

    Args:
        A: 2x2 matrix.

    Returns:
        Determinant value.

    Raises:
        ValueError: If A is not 2x2.

    Example:
        >>> det_2x2([[1, 2], [3, 4]])
        -2.0
    """
    arr = _as_square(A)
    if arr.shape != (2, 2):
        raise ValueError("Matrix must be 2x2.")
    return float(arr[0, 0] * arr[1, 1] - arr[0, 1] * arr[1, 0])


def det_3x3_sarrus(A: npt.ArrayLike) -> float:
    """Compute the determinant of a 3x3 matrix using Sarrus' rule.

    Args:
        A: 3x3 matrix.

    Returns:
        Determinant value.

    Raises:
        ValueError: If A is not 3x3.

    Example:
        >>> det_3x3_sarrus([[1, 2, 3], [0, 1, 4], [5, 6, 0]])
        1.0
    """
    arr = _as_square(A)
    if arr.shape != (3, 3):
        raise ValueError("Matrix must be 3x3.")
    a = arr
    pos = (
        a[0, 0] * a[1, 1] * a[2, 2]
        + a[0, 1] * a[1, 2] * a[2, 0]
        + a[0, 2] * a[1, 0] * a[2, 1]
    )
    neg = (
        a[0, 2] * a[1, 1] * a[2, 0]
        + a[0, 1] * a[1, 0] * a[2, 2]
        + a[0, 0] * a[1, 2] * a[2, 1]
    )
    return float(pos - neg)


def det_cofactor(A: npt.ArrayLike) -> float:
    """Compute the determinant by recursive cofactor expansion (first row).

    Args:
        A: Square matrix.

    Returns:
        Determinant value.

    Raises:
        ValueError: If A is not square.

    Example:
        >>> det_cofactor([[1, 2], [3, 4]])
        -2.0
    """
    arr = _as_square(A)
    n = arr.shape[0]
    if n == 1:
        return float(arr[0, 0])
    if n == 2:
        return det_2x2(arr)

    det_val = 0.0
    for j in range(n):
        minor = np.delete(np.delete(arr, 0, axis=0), j, axis=1)
        cofactor = ((-1) ** j) * arr[0, j] * det_cofactor(minor)
        det_val += cofactor
    return float(det_val)


def det_gauss(A: npt.ArrayLike, *, tol: float = 1e-12) -> tuple[float, list[Array]]:
    """Compute the determinant using Gaussian elimination with partial pivoting.

    Args:
        A: Square matrix.
        tol: Pivot tolerance for detecting singularity.

    Returns:
        Tuple (determinant_value, steps) where steps is a list of intermediate matrices.

    Raises:
        ValueError: If A is not square.

    Example:
        >>> det_gauss([[1, 2], [3, 4]])[0]
        -2.0
    """
    arr = _as_square(A).astype(float)
    n = arr.shape[0]
    det_sign = 1.0
    steps: list[Array] = []

    for i in range(n):
        pivot_row = i + int(np.argmax(np.abs(arr[i:, i])))
        pivot_val = arr[pivot_row, i]
        if abs(pivot_val) <= tol:
            steps.append(arr.copy())
            return 0.0, steps

        if pivot_row != i:
            arr[[i, pivot_row]] = arr[[pivot_row, i]]
            det_sign *= -1.0
            steps.append(arr.copy())

        for j in range(i + 1, n):
            factor = arr[j, i] / arr[i, i]
            arr[j, i:] = arr[j, i:] - factor * arr[i, i:]
            steps.append(arr.copy())

    det_val = det_sign * float(np.prod(np.diag(arr)))
    return det_val, steps


def eh_invertivel(A: npt.ArrayLike, *, tol: float = 1e-12) -> bool:
    """Check whether a matrix is invertible.

    Args:
        A: Square matrix.
        tol: Tolerance for determinant magnitude.

    Returns:
        True if invertible, False otherwise.

    Raises:
        ValueError: If A is not square.

    Example:
        >>> eh_invertivel([[1, 2], [3, 4]])
        True
    """
    arr = _as_square(A)
    det_val = float(np.linalg.det(arr))
    return abs(det_val) > tol


def inversa_2x2(A: npt.ArrayLike) -> Array:
    """Compute the inverse of a 2x2 matrix.

    Args:
        A: 2x2 matrix.

    Returns:
        Inverse matrix.

    Raises:
        ValueError: If A is not 2x2 or is singular.

    Example:
        >>> inversa_2x2([[1, 2], [3, 4]])
        array([[-2. ,  1. ],
               [ 1.5, -0.5]])
    """
    arr = _as_square(A)
    if arr.shape != (2, 2):
        raise ValueError("Matrix must be 2x2.")
    det_val = det_2x2(arr)
    if abs(det_val) <= 1e-12:
        raise ValueError("Matrix is singular; inverse does not exist.")
    a, b, c, d = arr[0, 0], arr[0, 1], arr[1, 0], arr[1, 1]
    inv = (1.0 / det_val) * np.array([[d, -b], [-c, a]], dtype=float)
    return inv


def inversa_gauss_jordan(A: npt.ArrayLike, *, tol: float = 1e-12) -> tuple[Array, list[Array]]:
    """Compute the inverse using Gauss-Jordan elimination.

    Args:
        A: Square matrix.
        tol: Pivot tolerance for detecting singularity.

    Returns:
        Tuple (inverse, steps) where steps is a list of augmented matrices.

    Raises:
        ValueError: If A is not square or is singular.

    Example:
        >>> inversa_gauss_jordan([[1, 2], [3, 4]])[0]
        array([[-2. ,  1. ],
               [ 1.5, -0.5]])
    """
    arr = _as_square(A).astype(float)
    n = arr.shape[0]
    aug = np.hstack([arr, np.eye(n, dtype=float)])
    steps: list[Array] = [aug.copy()]

    for i in range(n):
        pivot_row = i + int(np.argmax(np.abs(aug[i:, i])))
        if abs(aug[pivot_row, i]) <= tol:
            raise ValueError("Matrix is singular; inverse does not exist.")
        if pivot_row != i:
            aug[[i, pivot_row]] = aug[[pivot_row, i]]
            steps.append(aug.copy())

        pivot = aug[i, i]
        aug[i, :] = aug[i, :] / pivot
        steps.append(aug.copy())

        for j in range(n):
            if j == i:
                continue
            factor = aug[j, i]
            if abs(factor) <= tol:
                continue
            aug[j, :] = aug[j, :] - factor * aug[i, :]
            steps.append(aug.copy())

    inv = aug[:, n:]
    np.testing.assert_allclose(arr @ inv, np.eye(n), rtol=1e-7, atol=1e-9)
    return inv, steps
