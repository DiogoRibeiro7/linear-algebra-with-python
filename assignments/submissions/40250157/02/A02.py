

""" Exercício 2: Operações com Matrizes"""

import numpy as np

""" DEFINIR AS MATRIZES A E B : """

A = np.array([[1, 2, 3],
              [4, 5, 6]])

B = np.array([[6, 5, 4],
              [3, 2, 1]])

# Matriz C (3x2)
C = np.array([[1, 0],
              [0, 1],
              [1, 1]])

""" DEFINIR MATRIZES P E Q (2x2) """

P = np.array([[1, 2],
              [3, 4]])

Q = np.array([[0, 1],
              [1, 0]])

""" REALIZAR AS OPERAÇÕES : """
soma = A + B
subtracao = A - B
multiplicacao = 3 * A

AC = np.dot(A, C)  # (2x3) · (3x2) = (2x2)
CA = np.dot(C, A)  # (3x2) · (2x3) = (3x3)

PQ = np.dot(P, Q)
QP = np.dot(Q, P)

""" COMUTADOR [P, Q] = PQ - QP """
comutador = PQ - QP

""" MATRIZ IDENTIDADE """
I = np.eye(2)
PI = np.dot(P, I)
IP = np.dot(I, P)

""" VERIFICAR SE AS DIMENSÕES SÃO RESERVADAS : """
assert soma.shape == A.shape == B.shape

""" VERIFICAR PROPRIEDADES DA TRANSPOSTA : """

transposta_dupla = np.allclose(A.T.T, A)
soma_transposta = np.allclose((A + B).T, A.T + B.T)
produto_transposta = np.allclose((AC).T, np.dot(C.T, A.T))

""" MATRIZ ALEATÓRIA E SIMETRIA """

""" gerar matriz aleatória 3x3 """
M = np.random.rand(3, 3)

""" construir matriz simétrica """
S = M + M.T

""" verificar se é simétrica (S = S^T) """
simetrica = np.allclose(S, S.T)

print("\nMatriz S:\n", S)
print("S é simétrica:", simetrica)


""" COMBINAÇÃO LINEAR Ax """

""" matriz A (3x3) e vetor x """
A3 = np.array([[1, 2, 3],
               [0, 1, 4],
               [5, 6, 0]])

x = np.array([2, 3, 4])

""" produto Ax """
Ax = np.dot(A3, x)

""" colunas de A """
a1 = A3[:, 0]
a2 = A3[:, 1]
a3 = A3[:, 2]

""" combinação linear """
comb_linear = x[0]*a1 + x[1]*a2 + x[2]*a3


""" IMPRIMIR RESULTADOS : """

print("A + B:\n", soma)
print("A - B:\n", subtracao)
print("3A:\n", multiplicacao)

print("\nA x C:\n", AC)
print("Dimensão de AC:", AC.shape)

print("\nC x A:\n", CA)
print("Dimensão de CA:", CA.shape)

print("\nP x Q:\n", PQ)
print("Q x P:\n", QP)

print("\nComutador [P, Q] = PQ - QP:\n", comutador)

print("\nP x I:\n", PI)
print("I x P:\n", IP)
print("\n(Aᵀ)ᵀ = A:", transposta_dupla)
print("(A + B)ᵀ = Aᵀ + Bᵀ:", soma_transposta)
print("(AC)ᵀ = CᵀAᵀ:", produto_transposta)

print("\nAx:\n", Ax)
print("Combinação linear x1a1 + x2a2 + x3a3:\n", comb_linear)

# verificação
print("São iguais:", np.allclose(Ax, comb_linear))


print("\nDimensões preservadas.")