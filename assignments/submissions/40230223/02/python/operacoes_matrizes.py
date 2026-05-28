import numpy as np


def print_section(title):
    print(f"\n----------- {title} -----------\n")


def show_matrix(name, matrix):
    print(f"{name}:")
    print(matrix)
    print("\n")


# ------------------ T1 ------------------
print_section("T1")

# definição das matrizes
A = np.array([[1, 2, 3], [4, 5, 6]])
B = np.array([[6, 5, 4], [3, 2, 1]])

show_matrix("Matrix A", A)
show_matrix("Matrix B", B)

# operações básicas
sum_ab = A + B
diff_ab = A - B
scalar_a = 3 * A

show_matrix("A + B", sum_ab)
show_matrix("A - B", diff_ab)
show_matrix("3 * A", scalar_a)

assert sum_ab.shape == A.shape == B.shape
print("Depois da soma, a dimensão mantém-se igual.\n")


# ------------------ T2 ------------------
print_section("T2")

C = np.array([[1, 2], [3, 4], [5, 6]])
show_matrix("Matrix C", C)

# multiplicação
AC = A @ C
show_matrix("A @ C", AC)
print(f"Dimensão de AC: {AC.shape}\n")

CA = C @ A
show_matrix("C @ A", CA)
print(f"Dimensão de CA: {CA.shape}\n")

print("multiplicação de matrizes não é comutativa.\n")


# ------------------ T3 ------------------
print_section("T3")

P = np.array([[1, 2], [3, 4]])
Q = np.array([[2, 0], [1, 2]])

PQ = P @ Q
QP = Q @ P

show_matrix("P @ Q", PQ)
show_matrix("Q @ P", QP)

# commutator
comm = PQ - QP
show_matrix("[P, Q] = PQ - QP", comm)

print("PQ == QP ?", np.allclose(PQ, QP), "\n")

# matriz identidade
I = np.eye(2)

print("P @ I == P ?", np.allclose(P @ I, P))
print("I @ P == P ?", np.allclose(I @ P, P), "\n")


# ------------------ T4 ------------------
print_section("T4")

prop_a = np.allclose((A.T).T, A)
prop_b = np.allclose((A + B).T, A.T + B.T)
prop_c = np.allclose((A @ C).T, C.T @ A.T)

print("(A^T)^T = A ->", prop_a)
print("(A + B)^T = A^T + B^T ->", prop_b)
print("(AC)^T = C^T A^T ->", prop_c)

# ------------------ T5 ------------------
print_section("T5")

M = np.random.rand(3, 3)
S = M + M.T

show_matrix("M", M)
show_matrix("S = M + M^T", S)

print("S simétrico - ", np.allclose(S, S.T), "\n")

# sistema 3x3
A_3 = np.array([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
x = np.array([2, -1, 3])

Ax = A_3 @ x

# combinação linear das colunas
a1 = A_3[:, 0]
a2 = A_3[:, 1]
a3 = A_3[:, 2]

lin_comb = x[0] * a1 + x[1] * a2 + x[2] * a3

show_matrix("A * x", Ax)
show_matrix("x1*a1 + x2*a2 + x3*a3", lin_comb)

print("Ax == combinação linear ?", np.allclose(Ax, lin_comb))
