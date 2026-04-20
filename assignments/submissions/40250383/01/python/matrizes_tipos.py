import numpy as np

zero = np.zeros((3,4))
identity = np.eye(4)
diag = np.diag([2,5,-1])

A = np.array([[1,2,3],
              [4,5,6],
              [7,8,9]])

upper = np.triu(A)
lower = np.tril(A)

M = np.array([[1,2,3],
              [0,1,4],
              [5,6,0]])

symmetric = M + M.T

matrizes = {
    "zero": zero,
    "identity": identity,
    "diagonal": diag,
    "triangular_superior": upper,
    "triangular_inferior": lower,
    "simetrica": symmetric
}

for nome in matrizes:
    matriz = matrizes[nome]

    print("\nMatriz:", nome)
    print(matriz)
    print("Dimensões:", matriz.shape)

    if matriz.shape[0] > 2 and matriz.shape[1] > 3:
        print("Elemento [2,3]:", matriz[2,3])
    else:
        print("Elemento [2,3]: não existe")


def classificar_matriz(A):
    tipos = []

    if A.shape[0] == A.shape[1]:
        tipos.append("quadrada")
    else:
        tipos.append("retangular")

    if (A == 0).all():
        tipos.append("nula")

    if A.shape[0] == A.shape[1]:
        if (A == np.eye(A.shape[0])).all():
            tipos.append("identidade")

    if A.shape[0] == A.shape[1]:
        if (A == np.diag(np.diag(A))).all():
            tipos.append("diagonal")

    if A.shape[0] == A.shape[1]:
        if (A == A.T).all():
            tipos.append("simetrica")

    if A.shape[0] == A.shape[1]:
        if (A == np.triu(A)).all():
            tipos.append("triangular_superior")

        if (A == np.tril(A)).all():
            tipos.append("triangular_inferior")

    return tipos


print("\nClassificação:")
for nome in matrizes:
    print(nome, "->", classificar_matriz(matrizes[nome]))


print("\nTestar erros:")

A = np.zeros((2,3))
B = np.zeros((4,2))

try:
    print(A + B)
except:
    print("Erro ao somar matrizes")

try:
    print(A @ B)
except:
    print("Erro ao multiplicar matrizes")