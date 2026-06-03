
# passo 1 

import numpy as np 

def cramer_2x2(A, b):
    A = np.array(A, dtype=float)
    b = np.array(b, dtype=float)

    detA = np.linalg.det(A)
    if abs(detA) < 1e-12:
        raise ValueError("Sistema sem solução única: determinante zero.")

    Ax = A.copy()
    Ay = A.copy()

    Ax[:, 0] = b
    Ay[:, 1] = b

    x = np.linalg.det(Ax) / detA
    y = np.linalg.det(Ay) / detA

    return np.array([x, y])


def cramer_3x3(A, b):
    A = np.array(A, dtype=float)
    b = np.array(b, dtype=float)

    detA = np.linalg.det(A)
    if abs(detA) < 1e-12:
        raise ValueError("Sistema sem solução única: determinante zero.")

    A1 = A.copy()
    A2 = A.copy()
    A3 = A.copy()

    A1[:, 0] = b
    A2[:, 1] = b
    A3[:, 2] = b

    x = np.linalg.det(A1) / detA
    y = np.linalg.det(A2) / detA
    z = np.linalg.det(A3) / detA

    return np.array([x, y, z])


print("Soluções de Cramer")
print("com verificação\n")

# Sistema 2x2
A2 = [[2, 1],
      [5, 3]]
b2 = [5, 13]

sol_cramer_2 = cramer_2x2(A2, b2)
sol_numpy_2 = np.linalg.solve(A2, b2)

print("Sistema 2x2:")
print("Cramer:", sol_cramer_2)
print("NumPy: ", sol_numpy_2)
print("Verificação:", np.allclose(sol_cramer_2, sol_numpy_2))
print()

# Sistema 3x3
A3 = [[1, 2, -1],
      [3, -1, 2],
      [2, 1, 1]]
b3 = [3, 13, 8]

sol_cramer_3 = cramer_3x3(A3, b3)
sol_numpy_3 = np.linalg.solve(A3, b3)

print("Sistema 3x3:")
print("Cramer:", sol_cramer_3)
print("NumPy: ", sol_numpy_3)
print("Verificação:", np.allclose(sol_cramer_3, sol_numpy_3))

# 2 passo 

def lu_decomposition(A):
    A = np.array(A, dtype=float)
    n = A.shape[0]

    P = np.eye(n)
    L = np.zeros((n, n))
    U = A.copy()

    for i in range(n):
        # Pivotação: encontrar a linha com maior valor na coluna i
        pivot = np.argmax(abs(U[i:, i])) + i

        if pivot != i:
            U[[i, pivot]] = U[[pivot, i]]
            P[[i, pivot]] = P[[pivot, i]]
            L[[i, pivot], :i] = L[[pivot, i], :i]

        L[i, i] = 1

        for j in range(i + 1, n):
            fator = U[j, i] / U[i, i]
            L[j, i] = fator
            U[j] = U[j] - fator * U[i]

    return P, L, U


print("Fatores LU com verificação\n")

A = np.array([
    [2, 1, 1],
    [4, -6, 0],
    [-2, 7, 2]
], dtype=float)

P, L, U = lu_decomposition(A)

print("Matriz A:")
print(A)

print("\nP:")
print(P)

print("\nL:")
print(L)

print("\nU:")
print(U)

print("\nVerificação P A = L U:")
print("P A:")
print(P @ A)

print("\nL U:")
print(L @ U)

print("\nVerificação:", np.allclose(P @ A, L @ U))

det_A = np.linalg.det(P) * np.prod(np.diag(U))

print("\ndet(A) pela diagonal de U:")
print(det_A)

print("\ndet(A) pelo NumPy:")
print(np.linalg.det(A))

# 3 passo 

import time
import matplotlib.pyplot as plt


# -----------------------------
# Método de Cramer
# -----------------------------
def cramer(A, b):
    A = np.array(A, dtype=float)
    b = np.array(b, dtype=float)

    n = A.shape[0]
    detA = np.linalg.det(A)

    if abs(detA) < 1e-12:
        raise ValueError("Sistema sem solução única.")

    x = np.zeros(n)

    for i in range(n):
        Ai = A.copy()
        Ai[:, i] = b
        x[i] = np.linalg.det(Ai) / detA

    return x


# -----------------------------
# Eliminação de Gauss
# -----------------------------
def gauss(A, b):
    A = np.array(A, dtype=float)
    b = np.array(b, dtype=float)

    n = len(b)

    # Eliminação
    for i in range(n):

        pivot = np.argmax(np.abs(A[i:, i])) + i

        if pivot != i:
            A[[i, pivot]] = A[[pivot, i]]
            b[[i, pivot]] = b[[pivot, i]]

        for j in range(i + 1, n):
            fator = A[j, i] / A[i, i]

            A[j, i:] = A[j, i:] - fator * A[i, i:]
            b[j] = b[j] - fator * b[i]

    # Substituição regressiva
    x = np.zeros(n)

    for i in range(n - 1, -1, -1):
        x[i] = (
            b[i]
            - np.dot(A[i, i + 1:], x[i + 1:])
        ) / A[i, i]

    return x


# -----------------------------
# Medição de tempo
# -----------------------------
def medir_tempo(func, A, b):
    inicio = time.perf_counter()

    func(A.copy(), b.copy())

    fim = time.perf_counter()

    return fim - inicio


print("Tabela de referência")
print()

tamanhos = [2, 3, 5, 10, 20, 50, 100]

tempos_cramer = []
tempos_gauss = []
tempos_numpy = []

np.random.seed(42)

for n in tamanhos:

    A = np.random.rand(n, n)

    # evita matrizes singulares
    A += n * np.eye(n)

    b = np.random.rand(n)

    # Cramer só até n=10
    if n <= 10:
        tempo_c = medir_tempo(cramer, A, b)
    else:
        tempo_c = np.nan

    tempo_g = medir_tempo(gauss, A, b)
    tempo_np = medir_tempo(np.linalg.solve, A, b)

    tempos_cramer.append(tempo_c)
    tempos_gauss.append(tempo_g)
    tempos_numpy.append(tempo_np)


# -----------------------------
# Tabela
# -----------------------------
print(f"{'n':<8}{'Cramer(s)':<15}{'Gauss(s)':<15}{'NumPy(s)':<15}")
print("-" * 53)

for i, n in enumerate(tamanhos):

    cramer_txt = (
        "N/A"
        if np.isnan(tempos_cramer[i])
        else f"{tempos_cramer[i]:.8f}"
    )

    print(
        f"{n:<8}"
        f"{cramer_txt:<15}"
        f"{tempos_gauss[i]:<15.8f}"
        f"{tempos_numpy[i]:<15.8f}"
    )


# -----------------------------
# Gráfico
# -----------------------------
x = np.arange(len(tamanhos))
largura = 0.25

plt.figure(figsize=(10, 6))

plt.bar(
    x - largura,
    tempos_cramer,
    largura,
    label="Cramer"
)

plt.bar(
    x,
    tempos_gauss,
    largura,
    label="Gauss"
)

plt.bar(
    x + largura,
    tempos_numpy,
    largura,
    label="NumPy"
)

plt.xticks(x, tamanhos)

plt.xlabel("Tamanho da matriz (n)")
plt.ylabel("Tempo (segundos)")
plt.title("Comparação de desempenho")

plt.legend()
plt.grid(axis="y")

plt.tight_layout()

plt.savefig(
    "/Users/claramota/Desktop/benchmark.png",
    dpi=300
)

print("\nFigura guardada em:")
print("/Users/claramota/Desktop/benchmark.png")

plt.show()

# passo 4 

from scipy.linalg import lu_factor, lu_solve

print("Solução Multi-RHS")
print("com temporização\n")


# -----------------------------
# Matriz fixa A
# -----------------------------
A = np.array([
    [4, 2, 1],
    [3, 5, 2],
    [1, 2, 4]
], dtype=float)


# Três lados direitos diferentes
b1 = np.array([7, 8, 7], dtype=float)
b2 = np.array([1, 2, 3], dtype=float)
b3 = np.array([10, 5, 6], dtype=float)


# -----------------------------
# Método 1: uma única fatorização LU
# -----------------------------
inicio_lu = time.perf_counter()

lu, piv = lu_factor(A)

x1_lu = lu_solve((lu, piv), b1)
x2_lu = lu_solve((lu, piv), b2)
x3_lu = lu_solve((lu, piv), b3)

fim_lu = time.perf_counter()

tempo_lu = fim_lu - inicio_lu


# -----------------------------
# Método 2: resolver do zero cada sistema
# -----------------------------
inicio_scratch = time.perf_counter()

x1_np = np.linalg.solve(A, b1)
x2_np = np.linalg.solve(A, b2)
x3_np = np.linalg.solve(A, b3)

fim_scratch = time.perf_counter()

tempo_scratch = fim_scratch - inicio_scratch


# -----------------------------
# Resultados
# -----------------------------
print("Soluções usando uma única fatorização LU:")
print("x1 =", x1_lu)
print("x2 =", x2_lu)
print("x3 =", x3_lu)

print("\nSoluções resolvendo cada sistema do zero:")
print("x1 =", x1_np)
print("x2 =", x2_np)
print("x3 =", x3_np)


# -----------------------------
# Verificação
# -----------------------------
print("\nVerificação:")
print("x1 coincide:", np.allclose(x1_lu, x1_np))
print("x2 coincide:", np.allclose(x2_lu, x2_np))
print("x3 coincide:", np.allclose(x3_lu, x3_np))


""""""
# Temporização
""""""
print("\nTempos:")
print(f"Tempo com uma única LU:       {tempo_lu:.8f} s")
print(f"Tempo resolvendo do zero:     {tempo_scratch:.8f} s")

# passo 5 

print("Mapa de calor LU")
print("Salvo lu_heatmap.png na Secretária\n")


# Matriz A
A = np.array([
    [4, 2, 1],
    [3, 5, 2],
    [1, 2, 4]
], dtype=float)


# Fatoração LU
P, L, U = lu_decomposition(A)

# Função para desenhar heatmap
def desenhar_heatmap(ax, matriz, titulo):

    imagem = ax.imshow(matriz, cmap="viridis")

    ax.set_title(titulo)

    ax.set_xticks(range(matriz.shape[1]))
    ax.set_yticks(range(matriz.shape[0]))

    for i in range(matriz.shape[0]):
        for j in range(matriz.shape[1]):

            ax.text(
                j,
                i,
                f"{matriz[i, j]:.2f}",
                ha="center",
                va="center",
                color="white"
            )

    return imagem


# Criar figura
fig, axs = plt.subplots(1, 3, figsize=(12, 4))

desenhar_heatmap(axs[0], A, "A")
desenhar_heatmap(axs[1], L, "L")
desenhar_heatmap(axs[2], U, "U")

plt.suptitle("Estrutura das matrizes A, L e U")

plt.tight_layout()

plt.savefig(
    "/Users/claramota/Desktop/lu_heatmap.png",
    dpi=300
)

print("Figura guardada em:")
print("/Users/claramota/Desktop/lu_heatmap.png")

plt.show()


    