import os
import sys
import numpy as np

def classificar_matriz(A):
    rows, cols = A.shape
    
    if rows != cols: 
        return "rectangular"
    
    if np.allclose(A, np.eye(rows)): 
        return "identity"
    
    if np.allclose(A, np.zeros((rows, cols))): 
        return "zero"
    
    if np.allclose(A, np.diag(np.diag(A))):
        return "diagonal"
    
    if np.allclose(A, np.triu(A)):
        return "upper triangular"
    
    if np.allclose(A, np.tril(A)):
        return "lower triangular"
    
    if np.allclose(A, A.T):
        return "symmetric"

    return "square"

def print_matrix_info(name: str, A: np.ndarray, matrix_type: str) -> None:
    print("=" * 60)
    print(f"{name} ({matrix_type})")
    print(np.array2string(A, precision=2, floatmode="fixed"))
    print(f"Dimension: {A.shape[0]} × {A.shape[1]}")
    print(f"Element a23 (index [1,2]): {A[1, 2]}")
    print(f"Classification: {classificar_matriz(A)}")


def main() -> None:
    print("SECTION 1 — Special Types of Matrices\n")

    zero_matrix = np.zeros((3, 4), dtype=int)
    identity_matrix = np.eye(4, dtype=int)
    diagonal_matrix = np.diag([2, 5, -1])
    upper_triangular = np.array([[3, 2, 1], [0, -1, 4], [0, 0, 5]])
    lower_triangular = np.array([[3, 0, 0], [2, -1, 0], [1, 4, 5]])
    M = np.array([[1, 2, 3], [0, -1, 4], [5, 2, 0]])
    symmetric_matrix = M + M.T

    print_matrix_info("Zero Matrix", zero_matrix, "zero")
    print_matrix_info("Identity Matrix", identity_matrix, "identity")
    print_matrix_info("Diagonal Matrix", diagonal_matrix, "diagonal")
    print_matrix_info("Upper Triangular Matrix", upper_triangular, "upper triangular")
    print_matrix_info("Lower Triangular Matrix", lower_triangular, "lower triangular")
    print_matrix_info("Symmetric Matrix", symmetric_matrix, "symmetric")

    print("\nSECTION 2 — Automatic Classification\n")
    test_matrices = {
        "Identity 3x3": np.eye(3),
        "Zero 2x4": np.zeros((2, 4)),
        "Random 3x3": np.array([[1.0, 2.0, 3.0], [4.0, 0.0, 5.0], [6.0, 7.0, 8.0]]),
        "Diagonal 4x4": np.diag([1.0, 2.0, 3.0, 4.0]),
        "Symmetric 3x3": symmetric_matrix,
    }

    print(f"{'Matrix':<20} | Classification")
    print("-" * 60)
    for name, A in test_matrices.items():
        print(f"{name:<20} | {classificar_matriz(A)}")

    print("\nSECTION 3 — Incompatible Dimensions Error\n")
    A = np.ones((2, 3))
    B = np.ones((4, 2))
    try:
        _ = A + B
    except ValueError as exc:
        print("Error when adding incompatible matrices:", exc)

    try:
        _ = A @ np.ones((5, 1))
    except ValueError as exc:
        print("Error when multiplying incompatible matrices:", exc)


if __name__ == "__main__":
    main()