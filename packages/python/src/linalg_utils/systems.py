from __future__ import annotations

import numpy as np
import numpy.typing as npt

Array = npt.NDArray[np.floating]


def _as_2d(A: npt.ArrayLike) -> Array:
    arr = np.array(A, dtype=float)
    if arr.ndim != 2:
        raise ValueError("Input must be a 2D matrix.")
    return arr


def escalonar(A_aumentada: npt.ArrayLike, *, tol: float = 1e-12) -> tuple[Array, list[str]]:
    """Compute the row echelon form with partial pivoting.

    Args:
        A_aumentada: Augmented matrix [A|b].
        tol: Pivot tolerance for detecting zeros.

    Returns:
        Tuple (echelon_form, step_descriptions).

    Raises:
        ValueError: If input is not a 2D matrix.

    Example:
        >>> escalonar([[1, 2, 3], [4, 5, 6]])[0]
        array([[ 4.,  5.,  6.],
               [ 0.,  0.75, 1.5 ]])
    """
    aug = _as_2d(A_aumentada).astype(float)
    m, n = aug.shape
    steps: list[str] = []
    row = 0
    for col in range(n - 1):
        if row >= m:
            break
        pivot_row = row + int(np.argmax(np.abs(aug[row:, col])))
        if abs(aug[pivot_row, col]) <= tol:
            continue
        if pivot_row != row:
            aug[[row, pivot_row]] = aug[[pivot_row, row]]
            steps.append(f"R{row + 1} <-> R{pivot_row + 1}")
        pivot = aug[row, col]
        for r in range(row + 1, m):
            factor = aug[r, col] / pivot
            if abs(factor) <= tol:
                continue
            aug[r, col:] = aug[r, col:] - factor * aug[row, col:]
            steps.append(f"R{r + 1} <- R{r + 1} - ({factor:.6g})*R{row + 1}")
        row += 1
    return aug, steps


def substituicao_retroativa(U: npt.ArrayLike, b: npt.ArrayLike, *, tol: float = 1e-12) -> Array:
    """Solve an upper triangular system by back substitution.

    Args:
        U: Upper triangular matrix.
        b: Right-hand side vector.
        tol: Tolerance for detecting zeros on the diagonal.

    Returns:
        Solution vector x.

    Raises:
        ValueError: If dimensions are incompatible or U is singular.

    Example:
        >>> substituicao_retroativa([[2, 1], [0, 3]], [5, 6])
        array([2., 2.])
    """
    U_arr = _as_2d(U)
    b_arr = np.array(b, dtype=float).reshape(-1)
    n = U_arr.shape[0]
    if U_arr.shape[1] != n or b_arr.shape[0] != n:
        raise ValueError("Incompatible dimensions for back substitution.")

    x = np.zeros(n, dtype=float)
    for i in range(n - 1, -1, -1):
        if abs(U_arr[i, i]) <= tol:
            raise ValueError("Matrix is singular; back substitution failed.")
        x[i] = (b_arr[i] - np.dot(U_arr[i, i + 1 :], x[i + 1 :])) / U_arr[i, i]
    return x


def classificar_sistema(A: npt.ArrayLike, b: npt.ArrayLike, *, tol: float = 1e-12) -> str:
    """Classify a linear system using ranks.

    Args:
        A: Coefficient matrix.
        b: Right-hand side vector.
        tol: Tolerance for rank computation.

    Returns:
        "SPD" (unique), "SPI" (infinitely many), or "SI" (inconsistent).

    Raises:
        ValueError: If dimensions are incompatible.

    Example:
        >>> classificar_sistema([[1, 0], [0, 1]], [1, 2])
        'SPD'
    """
    A_arr = _as_2d(A)
    b_arr = np.array(b, dtype=float).reshape(-1, 1)
    if A_arr.shape[0] != b_arr.shape[0]:
        raise ValueError("Incompatible dimensions between A and b.")

    rank_A = np.linalg.matrix_rank(A_arr, tol=tol)
    rank_aug = np.linalg.matrix_rank(np.hstack([A_arr, b_arr]), tol=tol)
    n_vars = A_arr.shape[1]

    if rank_A < rank_aug:
        return "SI"
    if rank_A == n_vars:
        return "SPD"
    return "SPI"


def resolver_gauss(
    A: npt.ArrayLike, b: npt.ArrayLike, *, tol: float = 1e-12
) -> tuple[Array | None, str, list[str]]:
    """Solve a linear system using Gaussian elimination.

    Args:
        A: Coefficient matrix.
        b: Right-hand side vector.
        tol: Tolerance for pivot detection.

    Returns:
        Tuple (solution_or_None, classification, steps).

    Raises:
        ValueError: If dimensions are incompatible.

    Example:
        >>> resolver_gauss([[1, 0], [0, 1]], [1, 2])[1]
        'SPD'
    """
    A_arr = _as_2d(A)
    b_arr = np.array(b, dtype=float).reshape(-1, 1)
    if A_arr.shape[0] != b_arr.shape[0]:
        raise ValueError("Incompatible dimensions between A and b.")
    aug = np.hstack([A_arr, b_arr])
    echelon, steps = escalonar(aug, tol=tol)
    classification = classificar_sistema(A_arr, b_arr, tol=tol)
    if classification != "SPD":
        return None, classification, steps
    U = echelon[:, :-1]
    rhs = echelon[:, -1]
    x = substituicao_retroativa(U, rhs, tol=tol)
    return x, classification, steps


class SolveResult:
    """Container for linear system solutions."""

    def __init__(self, x: Array, residual: Array, residual_norm: float) -> None:
        self.x = x
        self.residual = residual
        self.residual_norm = residual_norm


def solve(A: npt.ArrayLike, b: npt.ArrayLike) -> SolveResult:
    """Solve Ax = b using a direct solver (square) or least squares (rectangular)."""
    A_arr = _as_2d(A)
    b_arr = np.array(b, dtype=float).reshape(-1)
    if A_arr.shape[0] != b_arr.shape[0]:
        raise ValueError("Incompatible dimensions between A and b.")
    if A_arr.shape[0] == A_arr.shape[1]:
        x = np.linalg.solve(A_arr, b_arr)
    else:
        x, *_ = np.linalg.lstsq(A_arr, b_arr, rcond=None)
    residual = A_arr @ x - b_arr
    residual_norm = float(np.linalg.norm(residual))
    return SolveResult(x=x, residual=residual, residual_norm=residual_norm)


def cramer_2x2(A: npt.ArrayLike, b: npt.ArrayLike, *, tol: float = 1e-12) -> Array:
    """Solve a 2x2 system using Cramer's rule.

    Args:
        A: 2x2 coefficient matrix.
        b: Right-hand side vector of length 2.
        tol: Tolerance for singularity detection.

    Returns:
        Solution vector x.

    Raises:
        ValueError: If dimensions are incompatible or det(A) is zero.

    Example:
        >>> cramer_2x2([[1, 2], [3, 4]], [5, 6])
        array([-4.,  4.5])
    """
    A_arr = _as_2d(A)
    b_arr = np.array(b, dtype=float).reshape(-1)
    if A_arr.shape != (2, 2) or b_arr.shape != (2,):
        raise ValueError("Cramer's rule (2x2) requires a 2x2 matrix and length-2 vector.")
    det_A = np.linalg.det(A_arr)
    if abs(det_A) <= tol:
        raise ValueError("Matrix is singular; Cramer's rule cannot be applied.")
    A1 = A_arr.copy()
    A2 = A_arr.copy()
    A1[:, 0] = b_arr
    A2[:, 1] = b_arr
    x1 = np.linalg.det(A1) / det_A
    x2 = np.linalg.det(A2) / det_A
    return np.array([x1, x2], dtype=float)


def cramer_3x3(A: npt.ArrayLike, b: npt.ArrayLike, *, tol: float = 1e-12) -> Array:
    """Solve a 3x3 system using Cramer's rule.

    Args:
        A: 3x3 coefficient matrix.
        b: Right-hand side vector of length 3.
        tol: Tolerance for singularity detection.

    Returns:
        Solution vector x.

    Raises:
        ValueError: If dimensions are incompatible or det(A) is zero.

    Example:
        >>> cramer_3x3([[1,0,0],[0,1,0],[0,0,1]], [1,2,3])
        array([1., 2., 3.])
    """
    A_arr = _as_2d(A)
    b_arr = np.array(b, dtype=float).reshape(-1)
    if A_arr.shape != (3, 3) or b_arr.shape != (3,):
        raise ValueError("Cramer's rule (3x3) requires a 3x3 matrix and length-3 vector.")
    det_A = np.linalg.det(A_arr)
    if abs(det_A) <= tol:
        raise ValueError("Matrix is singular; Cramer's rule cannot be applied.")
    sol = np.zeros(3, dtype=float)
    for i in range(3):
        Ai = A_arr.copy()
        Ai[:, i] = b_arr
        sol[i] = np.linalg.det(Ai) / det_A
    return sol


def cramer(A: npt.ArrayLike, b: npt.ArrayLike, *, tol: float = 1e-12) -> Array:
    """Solve an nxn system using Cramer's rule.

    Args:
        A: nxn coefficient matrix.
        b: Right-hand side vector of length n.
        tol: Tolerance for singularity detection.

    Returns:
        Solution vector x.

    Raises:
        ValueError: If dimensions are incompatible or det(A) is zero.

    Example:
        >>> cramer([[2, 0], [0, 3]], [4, 9])
        array([2., 3.])
    """
    A_arr = _as_2d(A)
    b_arr = np.array(b, dtype=float).reshape(-1)
    n = A_arr.shape[0]
    if A_arr.shape[1] != n or b_arr.shape[0] != n:
        raise ValueError("Cramer's rule requires an nxn matrix and length-n vector.")
    det_A = np.linalg.det(A_arr)
    if abs(det_A) <= tol:
        raise ValueError("Matrix is singular; Cramer's rule cannot be applied.")
    sol = np.zeros(n, dtype=float)
    for i in range(n):
        Ai = A_arr.copy()
        Ai[:, i] = b_arr
        sol[i] = np.linalg.det(Ai) / det_A
    return sol
