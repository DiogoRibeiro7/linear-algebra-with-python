import numpy as np

# ---------- T1: Create matrices ----------

zero_3x4 = np.zeros((3, 4))

identity_4x4 = np.eye(4)

diagonal_3x3 = np.diag([2, 5, -1])

upper_triangular = np.triu(np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]))

lower_triangular = np.tril(np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]))

M = np.array([
    [1, 2, 3],
    [0, 1, 4],
    [5, 6, 0]
])

symmetric_matrix = M + M.T

matrices = {
    "Zero 3x4": zero_3x4,
    "Identity 4x4": identity_4x4,
    "Diagonal 3x3": diagonal_3x3,
    "Upper Triangular": upper_triangular,
    "Lower Triangular": lower_triangular,
    "Symmetric": symmetric_matrix
}

# ---------- T2: Dimensions and element access ----------

print("=== T2: Dimensions and element A[2,3] ===\n")

for name, A in matrices.items():
    rows, cols = A.shape
    print(f"{name}:")
    print(A)
    print(f"Dimensions: {rows} x {cols}")

    try:
        print(f"A[2,3] = {A[2,3]}")
    except IndexError:
        print("A[2,3] does not exist (out of bounds)")

    print("-" * 40)


# ---------- T3: Classification function ----------

def classificar_matriz(A):
    labels = []

    rows, cols = A.shape

    if rows == cols:
        labels.append("square")
    else:
        labels.append("rectangular")

    if np.allclose(A, 0):
        labels.append("zero")

    if rows == cols and np.allclose(A, np.eye(rows)):
        labels.append("identity")

    if rows == cols and np.allclose(A, np.diag(np.diagonal(A))):
        labels.append("diagonal")

    if rows == cols and np.allclose(A, A.T):
        labels.append("symmetric")

    if rows == cols and np.allclose(A, np.triu(A)):
        labels.append("upper_triangular")

    if rows == cols and np.allclose(A, np.tril(A)):
        labels.append("lower_triangular")

    return labels


print("\n=== T3: Classification ===\n")

for name, A in matrices.items():
    print(f"{name}: {classificar_matriz(A)}")


# ---------- T4: Error handling ----------

print("\n=== T4: Error Handling ===\n")

A = np.zeros((2, 3))
B = np.zeros((4, 2))

# Addition error
try:
    print("Trying A + B...")
    C = A + B
except ValueError as e:
    print("Addition Error:", e)

# Multiplication error
try:
    print("\nTrying A @ B...")
    C = A @ B
except ValueError as e:
    print("Multiplication Error:", e)