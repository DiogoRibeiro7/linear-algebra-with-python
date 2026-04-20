import numpy as np


#T1
A_zero = np.zeros((3, 4))

A_identity = np.eye(4)

A_diag = np.diag([2, 5, -1])

A_upper = np.triu([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

A_lower = np.tril([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

M = np.array([[1, 2, 3],
              [0, 4, 5],
              [1, 0, 6]])

A_symmetric = M + M.T

matrices = {
    "Zero": A_zero,
    "Identity": A_identity,
    "Diagonal": A_diag,
    "Upper Triangular": A_upper,
    "Lower Triangular": A_lower,
    "Symmetric": A_symmetric
}

print("\n T1 ")
for name, mat in matrices.items():
    print(f"\n{name}:\n{mat}")




#T2
print("\n T2 ")

for name, mat in matrices.items():
    shape = mat.shape
    value = None
    if shape[0] > 2 and shape[1] > 3:
        value = mat[2, 3]
    else:
        value = "not applicable"

    print(f"\n{name}:")
    print(f"Dimensions: {shape}")
    print(f"Element [2,3]: {value}")



#T3
print("\n T3 ")
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

    if rows == cols and np.allclose(A, np.diag(np.diag(A))):
        labels.append("diagonal")

    if rows == cols and np.allclose(A, A.T):
        labels.append("symmetric")

    if rows == cols and np.allclose(A, np.triu(A)):
        labels.append("upper_triangular")

    if rows == cols and np.allclose(A, np.tril(A)):
        labels.append("lower_triangular")

    return labels


for name, mat in matrices.items():
    print(f"{name}: {classificar_matriz(mat)}")



#T4
print("\n T4 ")

A = np.zeros((2, 3))
B = np.zeros((4, 2))

try:
    print(A + B)
except Exception as e:
    print("Addition error:", e)

try:
    print(A @ A)
except Exception as e:
    print("Multiplication error:", e)