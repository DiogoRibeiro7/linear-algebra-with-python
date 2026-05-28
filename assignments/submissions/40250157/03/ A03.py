
import numpy as np 
import matplotlib.pyplot as plt

""" Determinante de matriz 2x2
Fórmula:
  |a b|
  |c d| = ad - bc """

def det_2x2(A):
    return A[0][0] * A[1][1] - A[0][1] * A[1][0]


""" Determinante de matriz 3x3 usando Regra de Sarrus """

def det_3x3_sarrus(A):

    # diagonais principais
    d1 = A[0][0] * A[1][1] * A[2][2]
    d2 = A[0][1] * A[1][2] * A[2][0]
    d3 = A[0][2] * A[1][0] * A[2][1]

    # diagonais secundárias
    d4 = A[0][2] * A[1][1] * A[2][0]
    d5 = A[0][0] * A[1][2] * A[2][1]
    d6 = A[0][1] * A[1][0] * A[2][2]

    return (d1 + d2 + d3) - (d4 + d5 + d6)


# TESTES 2x2 jj

A1 = np.array([
    [1, 2],
    [3, 4]
])

A2 = np.array([
    [2, 4],
    [1, 2]
])  # singular (det = 0)

print("========== MATRIZES 2x2 ==========")

print("\nMatriz A1:")
print(A1)

print("Determinante manual:", det_2x2(A1))
print("Determinante numpy :", np.linalg.det(A1))

print("\nMatriz A2:")
print(A2)

print("Determinante manual:", det_2x2(A2))
print("Determinante numpy :", np.linalg.det(A2))


# TESTES 3x3


B1 = np.array([
    [1, 2, 3],
    [0, 1, 4],
    [5, 6, 0]
])

B2 = np.array([
    [1, 2, 3],
    [2, 4, 6],
    [1, 1, 1]
])  # singular

print("\n========== MATRIZES 3x3 ==========")

print("\nMatriz B1:")
print(B1)

print("Determinante manual:", det_3x3_sarrus(B1))
print("Determinante numpy :", np.linalg.det(B1))

print("\nMatriz B2:")
print(B2)

print("Determinante manual:", det_3x3_sarrus(B2))
print("Determinante numpy :", np.linalg.det(B2))

""" Determinante usando Eliminação de Gauss """

def det_gauss(A):

    # converter para float
    A = A.astype(float)

    # tamanho da matriz
    n = len(A)

    # determinante inicial
    det = 1

    # contador de trocas de linha
    trocas = 0

    print("Matriz inicial:\n")
    print(A)
    print("\n=====================================\n")

    # eliminação de Gauss
    for i in range(n):

        # verificar pivô zero
        if A[i][i] == 0:

            # procurar linha para trocar
            for j in range(i + 1, n):

                if A[j][i] != 0:
                    A[[i, j]] = A[[j, i]]
                    trocas += 1

                    print(f"Troca de linhas {i} <-> {j}")
                    print(A)
                    print("\n-------------------------------------\n")

                    break

        # se continuar zero => determinante = 0
        if A[i][i] == 0:
            return 0

        # eliminação abaixo do pivô
        for j in range(i + 1, n):

            fator = A[j][i] / A[i][i]

            A[j] = A[j] - fator * A[i]

            print(f"L{j} = L{j} - ({fator:.2f}) * L{i}")
            print(A)
            print("\n-------------------------------------\n")

    # produto da diagonal principal
    for i in range(n):
        det *= A[i][i]

    # ajustar sinal se houve trocas
    if trocas % 2 != 0:
        det *= -1

    return det

# TESTE COM MATRIZ 4x4

A = np.array([
    [2, 1, 3, 4],
    [1, 0, 2, 1],
    [4, 1, 8, 2],
    [3, 2, 1, 5]
])

print("========== TESTE ==========\n")

determinante = det_gauss(A)

print("\n=====================================")
print("Determinante final:", determinante)

# comparação com numpy
print("Determinante numpy:", np.linalg.det(A))


""" Gerar matrizes aleatórias 3x3 """

A = np.random.randint(1, 10, (3, 3))
B = np.random.randint(1, 10, (3, 3))

# Escalar k
k = 3
n = A.shape[0]

print("Matriz A:")
print(A)

print("\nMatriz B:")
print(B)

# 1. det(AB) = det(A) det(B)
det_AB = np.linalg.det(A @ B)
det_A_det_B = np.linalg.det(A) * np.linalg.det(B)

print("\n1) det(AB) = det(A)det(B)")
print("det(AB) =", det_AB)
print("det(A)det(B) =", det_A_det_B)
print("Verificação:", np.isclose(det_AB, det_A_det_B))

# 2. det(A^T) = det(A)
det_AT = np.linalg.det(A.T)
det_A = np.linalg.det(A)

print("\n2) det(A^T) = det(A)")
print("det(A^T) =", det_AT)
print("det(A) =", det_A)
print("Verificação:", np.isclose(det_AT, det_A))

# 3. det(kA) = k^n det(A)
det_kA = np.linalg.det(k * A)
k_n_det_A = (k ** n) * det_A

print("\n3) det(kA) = k^n det(A)")
print("det(kA) =", det_kA)
print("k^n det(A) =", k_n_det_A)
print("Verificação:", np.isclose(det_kA, k_n_det_A))

# 4. Trocar duas linhas muda o sinal do determinante
A_troca = A.copy()
A_troca[[0, 1]] = A_troca[[1, 0]]

det_A_troca = np.linalg.det(A_troca)

print("\n4) Trocar duas linhas muda o sinal")
print("det(A) =", det_A)
print("det(A com linhas trocadas) =", det_A_troca)
print("Verificação:", np.isclose(det_A_troca, -det_A))

# 5. Adicionar múltiplo de uma linha a outra preserva o determinante
A_mult = A.copy()
A_mult[1] = A_mult[1] + 2 * A_mult[0]

det_A_mult = np.linalg.det(A_mult)

print("\n5) Adicionar múltiplo de uma linha a outra preserva o determinante")
print("det(A) =", det_A)
print("det(A modificada) =", det_A_mult)
print("Verificação:", np.isclose(det_A_mult, det_A))



def eh_invertivel(A):
    det = np.linalg.det(A)
    cond = np.linalg.cond(A)

    invertivel = not np.isclose(det, 0)

    return invertivel, det, cond


# 1. Matriz claramente invertível
A = np.array([
    [1, 2],
    [3, 4]
], dtype=float)

# 2. Matriz singular
B = np.array([
    [1, 2],
    [2, 4]
], dtype=float)

# 3. Matriz mal condicionada
C = np.array([
    [1, 1],
    [1, 1.000000001]
], dtype=float)


matrizes = {
    "A - invertível": A,
    "B - singular": B,
    "C - mal condicionada": C
}

for nome, matriz in matrizes.items():
    invertivel, det, cond = eh_invertivel(matriz)

    print("\n", nome)
    print(matriz)
    print("Determinante:", det)
    print("Número de condição:", cond)
    print("É invertível?", invertivel)

    if cond > 10**8:
        print("Aviso: matriz mal condicionada")


def inversa_gauss_jordan(A):
    A = A.astype(float)
    n = A.shape[0]

    # Criar matriz aumentada [A | I]
    I = np.eye(n)
    AI = np.hstack((A, I))

    print("Matriz aumentada inicial [A | I]:")
    print(AI)

    # Gauss-Jordan
    for i in range(n):
        # Se o pivô for zero, trocar linhas
        if AI[i, i] == 0:
            for j in range(i + 1, n):
                if AI[j, i] != 0:
                    AI[[i, j]] = AI[[j, i]]
                    print(f"\nTroca L{i} <-> L{j}")
                    print(AI)
                    break

        # Normalizar a linha do pivô
        pivo = AI[i, i]

        if pivo == 0:
            raise ValueError("A matriz não é invertível.")

        AI[i] = AI[i] / pivo

        print(f"\nL{i} = L{i} / {pivo}")
        print(AI)

        # Zerar os outros elementos da coluna
        for j in range(n):
            if j != i:
                fator = AI[j, i]
                AI[j] = AI[j] - fator * AI[i]

                print(f"\nL{j} = L{j} - ({fator}) * L{i}")
                print(AI)

    # A inversa está na metade direita
    inversa = AI[:, n:]

    return inversa


# =========================
# Teste com matriz 3x3
# =========================

A3 = np.array([
    [2, 1, 1],
    [1, 3, 2],
    [1, 0, 0]
], dtype=float)

print("========== MATRIZ 3x3 ==========")
inv_A3 = inversa_gauss_jordan(A3)

print("\nInversa de A3:")
print(inv_A3)

print("\nVerificação A3 * A3^-1:")
print(A3 @ inv_A3)


# =========================
# Teste com matriz 4x4
# =========================

A4 = np.array([
    [1, 2, 0, 1],
    [3, 1, 1, 0],
    [2, 0, 1, 3],
    [1, 1, 2, 1]
], dtype=float)

print("\n========== MATRIZ 4x4 ==========")
inv_A4 = inversa_gauss_jordan(A4)

print("\nInversa de A4:")
print(inv_A4)

print("\nVerificação A4 * A4^-1:")
print(A4 @ inv_A4)


# Matriz 2x2
A = np.array([
    [2, 1],
    [1, 2]
])

# Quadrado unitário
quadrado = np.array([
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0]
])

# Aplicar transformação A ao quadrado
transformado = quadrado @ A.T

# Determinante
det_A = np.linalg.det(A)
area_scale = abs(det_A)

# Gráfico
plt.figure()

plt.plot(quadrado[:, 0], quadrado[:, 1], label="Quadrado unitário")
plt.plot(transformado[:, 0], transformado[:, 1], label="Transformado")

plt.axhline(0)
plt.axvline(0)

plt.gca().set_aspect("equal", adjustable="box")
plt.title(f"Fator de escala da área = |det(A)| = {area_scale:.2f}")
plt.xlabel("x")
plt.ylabel("y")
plt.legend()
plt.grid(True)

# Guardar figura
plt.savefig("determinante_area.png")

plt.show()

