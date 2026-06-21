
import numpy as np


def classificar_matriz(A):
    labels = []
    rows, cols = A.shape

    if rows == cols:
        labels.append("square")
    else:
        labels.append("rectangular")

    if np.allclose(A, np.zeros_like(A)):
        labels.append("zero")

    if rows == cols:
        if np.allclose(A, np.eye(rows)):
            labels.append("identity")

        if np.allclose(A, np.diag(np.diag(A))):
            labels.append("diagonal")

        if np.allclose(A, A.T):
            labels.append("symmetric")

        if np.allclose(A, np.triu(A)):
            labels.append("upper_triangular")

        if np.allclose(A, np.tril(A)):
            labels.append("lower_triangular")

    return labels


def mostrar_info(nome, A):
    print(f"\n--- {nome} ---")
    print(A)

    linhas, colunas = A.shape
    print(f"Dimensões: {linhas} x {colunas}")

    if linhas > 2 and colunas > 3:
        print(f"Elemento a[2,3]: {A[2, 3]}")
    else:
        print("Elemento a[2,3]: não existe nesta matriz")

    print("Classificação:", classificar_matriz(A))


zero = np.zeros((3, 4))
identidade = np.eye(4)
diagonal = np.diag([2, 5, -1])

triangular_superior = np.array([
    [1, 2, 3],
    [0, 4, 5],
    [0, 0, 6]
])

triangular_inferior = np.array([
    [1, 0, 0],
    [2, 3, 0],
    [4, 5, 6]
])

M = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])

simetrica = M + M.T

matrizes = {
    "Matriz zero 3x4": zero,
    "Matriz identidade 4x4": identidade,
    "Matriz diagonal 3x3": diagonal,
    "Matriz triangular superior 3x3": triangular_superior,
    "Matriz triangular inferior 3x3": triangular_inferior,
    "Matriz simétrica M + M.T": simetrica,
}

for nome, matriz in matrizes.items():
    mostrar_info(nome, matriz)


print("\n--- Erros com dimensões incompatíveis ---")

A = np.ones((2, 3))
B = np.ones((4, 2))

try:
    soma = A + B
except ValueError as erro:
    print("Erro ao somar matriz 2x3 com matriz 4x2:")
    print(erro)

C = np.ones((2, 3))
D = np.ones((4, 2))

try:
    produto = C @ D
except ValueError as erro:
    print("\nErro ao multiplicar matriz 2x3 com matriz 4x2:")
    print(erro)