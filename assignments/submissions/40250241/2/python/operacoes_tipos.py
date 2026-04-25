from dbm import error
import numpy as np
import scipy as sp
import matplotlib.pyplot as plt

# Define two 2×3 matrices A and B. Compute
# and print A+B, A−B, and 3A. Verify that the sum preserves
# dimensions using an assertion.

A = np.array([[1, 6, 3], [9, 2, 7]])

B = np.array([[6, 2, 3], [9, 4, 9]])

soma = A + B
print("soma matrizes A + B:")
print(soma,"\n")


subtração = A - B
print("subtração matrizes A - B:")
print(subtração,"\n")


escalar = 3 * A
print("3A:")
print(escalar,"\n")

#  Verify that the sum preserves
# dimensions using an assertion.

assert soma.shape == A.shape
assert subtração.shape == A.shape
assert escalar.shape == A.shape

print(soma.shape)
print(subtração.shape)
print(escalar.shape,"\n")

print("###################################\n\n")

# Define a 3 × 2 matrix C. Compute AC (2 × 3
# times 3×2) and CA (3×2 times 2×3). Print both results and
# explain why they have different dimensions and are not equal.

C = np.array([[1, 5], [3, 9], [7, 6]])

multiplicacaoAC = A @ C 
multiplicacaoCA = C @ A

print("resultado de AC")
print(multiplicacaoAC,"\n")
print("resultado de CA")
print(multiplicacaoCA,"\n")

print("Dimensões de AC:", multiplicacaoAC.shape,"\n")
print("Dimensões de CA:", multiplicacaoCA.shape,"\n")

print(f"""
AC tem dimensões 2x2, enquanto CA tem dimensões 3x3. 
Isso ocorre porque a multiplicação de matrizes não é comutativa. 
AC é o produto de uma matriz 2x3 por uma matriz 3x2, resultando em uma matriz 2x2. 
Já CA é o produto de uma matriz 3x2 por uma matriz 2x3, resultando em uma matriz 3x3.
O resultado das matrizes vêem dos números de suas extremidades. 
""")

print("###################################\n\n")

# For two 2 × 2 matrices P and Q, compute
# P Q, QP, and the commutator [P, Q] = P Q − QP. Show that
# P Q ̸= QP in general, but that P I = IP = P for the identity
# matrix.

P = np.array([[1, 5], [8, 4]])

Q = np.array([[3, 2], [9, 8]])

PQ = P @ Q

QP = Q @ P

comutador = PQ - QP

I = np.eye(2)

PI = P @ I

IP = I @ P


print("Resultado de PQ:\n")

print(PQ)

print("\nResultado de QP:\n")

print(QP)

print("\nComutador [P, Q]:\n")

print(comutador,"\n")

print("o comutador é uma matriz diferente de zero, logo PQ é realmente diferente de QP.\n")

print("Resultado de PI:\n")

print(PI)

print("\nResultado de IP:\n")

print(IP)

print("Pi = IP = P, a multiplicação da matriz por uma matriz de identidade resulta na mesma matriz.\n")

print("###################################\n\n")

# Verify the three transpose properties computationally: (a) (A⊤)
# ⊤ = A; (b) (A + B)
# ⊤ = A⊤ + B⊤;
# (c) (AC)
# ⊤ = C
# ⊤A⊤. Use approximate comparison for each.

prop1 = np.allclose((A.T).T, A)

prop2 = np.allclose((A + B).T, A.T + B.T)

prop3 = np.allclose((A @ C).T, C.T @ A.T)

print("Propriedade 1: transposta da transposta")
print(prop1)

print("Propriedade 2: transposta da soma")
print(prop2)

print("Propriedade 3: transposta do produto")
print(prop3)

print("###################################\n\n")

# Generate a random 3 × 3 matrix M and construct S = M + M⊤. Verify that S is symmetric. Then define
# a 3 × 3 system matrix and a vector x, compute Ax, and show
# that Ax equals the linear combination x1a1+x2a2+x3a3 where
# ai are the columns of A.

M = np.array([[1, 5, 2], [8, 4, 6], [3, 9, 1]])

S = M + M.T

simetria = np.allclose(S, S.T)

print("Matriz S é simétrica?:\n")
print(simetria)

Amatrix = np.array([[1, 9, 5], [1, 3, 6], [3, 7, 2]])

x = np.array([2, 4, 6])

Ax = Amatrix @ x
print("\nResultado de Ax:\n")
print(Ax)

a1 = Amatrix[:, 0]
a2 = Amatrix[:, 1]
a3 = Amatrix[:, 2]

combinacao_linear = x[0] * a1 + x[1] * a2 + x[2] * a3
print("\nCombinação linear:\n")
print(combinacao_linear)    

print("\nAx é igual a combinação linear\n")