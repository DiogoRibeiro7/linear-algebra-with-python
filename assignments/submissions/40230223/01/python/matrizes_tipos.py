import numpy as np

t1_matrices = []


def append_mat(matrix):
    t1_matrices.append(matrix)
    return matrix


def print_matrix(name, matrix):
    print(f"------- {name} -------")
    print(matrix)
    print("\n")


print("----------- T1 -----------\n")
print_matrix("3x4 Zero Matrix", append_mat(np.zeros((3, 4))))
print_matrix("4x4 Identity Matrix", append_mat(np.eye(4)))
print_matrix("3x3 Diagonal Matrix", append_mat(np.diag([2, 5, -1])))
temp = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print_matrix("3x3 Upper Triangular Matrix", append_mat(np.triu(temp)))
print_matrix("3x3 Lower Triangular Matrix", append_mat(np.tril(temp)))

print("----------- T2 -----------\n")
for mat in t1_matrices:
    print("The following matrix:")
    print(mat)
    print(f"Has the size: {mat.shape} and the element at (2,3) is: {mat[1][2]}")
    print("\n")


print("----------- T3 -----------\n")


def check_diagonal(matrix):
    for i in range(matrix.shape[0]):
        for j in range(matrix.shape[1]):
            if i == j:
                if matrix[i][j] == 0:
                    return False
            else:
                if matrix[i][j] != 0:
                    return False
    return True


def check_identity(matrix):
    for i in range(matrix.shape[0]):
        for j in range(matrix.shape[1]):
            if i == j:
                if matrix[i][j] != 1:
                    return False
    return True


def check_lower_triangular(matrix):
    for i in range(matrix.shape[0]):
        for j in range(matrix.shape[1]):
            if i < j:
                if matrix[i][j] != 0:
                    return False
    return True


def check_upper_triangular(matrix):
    for i in range(matrix.shape[0]):
        for j in range(matrix.shape[1]):
            if i > j:
                if matrix[i][j] != 0:
                    return False
    return True


# square, rectangular, zero, identity, diagonal, symmetric,
# upper_triangular, lower_triangular
def classificar_matriz(matrix):
    labels = []

    if matrix.shape[0] == matrix.shape[1]:
        labels.append("square")
        if check_diagonal(matrix):
            labels.append("diagonal")
            if check_identity(matrix):
                labels.append("identity")
        if check_lower_triangular(matrix):
            labels.append("lower_triangular")
        if check_upper_triangular(matrix):
            labels.append("upper_triangular")
    else:
        labels.append("rectangular")

    if np.all(matrix == 0):
        labels.append("zero")

    # pesquisei na net a função porque não sabia como é
    # que ia fazer manualmente
    if np.array_equal(matrix, matrix.T):
        labels.append("symmetric")

    return labels


for mat in t1_matrices:
    labels = classificar_matriz(mat)
    if not len(labels) == 0:
        print("The following matrix:")
        print(mat)
        print("Has the following labels:")
        for label in labels:
            print(label)
        print("\n")

print("----------- T4 -----------\n")

mat1 = np.array([[1, 1], [1, 1], [1, 1], [1, 1]])
mat2 = np.array([[1, 1, 1], [1, 1, 1]])

try:
    print("Trying to sum together the following matrices: ")
    print("--- Matrix 1 ---")
    print(mat1)
    print("\n--- Matrix 2 ---")
    print(mat2)
    print("\n")
    s = mat1 + mat2
except ValueError:
    print(
        f"These matrices cannot be summed because their dimensions are not equal {mat1.shape} compared to {mat2.shape}"
    )

print("\n")
mat1 = np.array([[1, 1, 1], [1, 1, 1]])
mat2 = np.array([[1, 1], [1, 1]])

try:
    print("Trying to multiply together the following matrices: ")
    print("--- Matrix 1 ---")
    print(mat1)
    print("\n--- Matrix 2 ---")
    print(mat2)
    print("\n")
    p = np.matmul(mat1, mat2)
except ValueError:
    print(
        f"These matrices cannot be multiplied because the number of columns of the first matrix ({mat1.shape[1]}) is not equal to the number of rows in the second matrix ({mat2.shape[0]})"
    )
