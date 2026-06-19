import time
import numpy as np
import matplotlib.pyplot as plt
from scipy.linalg import lu, lu_factor, lu_solve


# T1 — Regra de Cramer

def cramer(A, b):
    det_A = np.linalg.det(A)

    if np.isclose(det_A, 0):
        raise ValueError("A matriz não é invertível.")

    n = len(b)
    x = np.zeros(n)

    for i in range(n):
        Ai = A.copy()
        Ai[:, i] = b
        x[i] = np.linalg.det(Ai) / det_A

    return x


A = np.array([
    [2, -1, 5],
    [1, 1, -3],
    [2, 4, 1]
], dtype=float)

b = np.array([8, -4, 10], dtype=float)

print("Cramer:", cramer(A, b))
print("NumPy:", np.linalg.solve(A, b))


# T2 — Decomposição LU

P, L, U = lu(A)

print("\nP:")
print(P)

print("\nL:")
print(L)

print("\nU:")
print(U)

print("\nPA = LU ?",
      np.allclose(P @ A, L @ U))

det_A = np.prod(np.diag(U))
print("det(A):", det_A)


# T3 — Benchmark

tamanhos = [2, 3, 5, 10, 20]
tempo_cramer = []
tempo_numpy = []

for n in tamanhos:

    M = np.random.rand(n, n)

    while np.isclose(np.linalg.det(M), 0):
        M = np.random.rand(n, n)

    v = np.random.rand(n)

    inicio = time.perf_counter()

    if n <= 10:
        cramer(M, v)

    fim = time.perf_counter()
    tempo_cramer.append(fim - inicio)

    inicio = time.perf_counter()
    np.linalg.solve(M, v)
    fim = time.perf_counter()

    tempo_numpy.append(fim - inicio)


# T4 — Múltiplos vetores independentes

A_multi = np.random.rand(100, 100)

b1 = np.random.rand(100)
b2 = np.random.rand(100)
b3 = np.random.rand(100)

lu_fac = lu_factor(A_multi)

x1 = lu_solve(lu_fac, b1)
x2 = lu_solve(lu_fac, b2)
x3 = lu_solve(lu_fac, b3)

print("\nSistemas resolvidos com uma única fatorização LU.")


# T5 — Heatmap

fig, axes = plt.subplots(1, 3, figsize=(12, 4))

for ax, matriz, titulo in zip(
    axes,
    [A, L, U],
    ["A", "L", "U"]
):
    img = ax.imshow(matriz)

    for i in range(matriz.shape[0]):
        for j in range(matriz.shape[1]):
            ax.text(
                j, i,
                f"{matriz[i, j]:.2f}",
                ha="center",
                va="center",
                color="white"
            )

    ax.set_title(titulo)

plt.tight_layout()
plt.savefig("lu_heatmap.png")
plt.show()


# Gráfico de desempenho

plt.figure(figsize=(8, 5))

plt.plot(tamanhos, tempo_cramer, marker="o", label="Cramer")
plt.plot(tamanhos, tempo_numpy, marker="o", label="NumPy")

plt.xlabel("Dimensão da matriz")
plt.ylabel("Tempo (s)")
plt.legend()
plt.grid(True)

plt.show()