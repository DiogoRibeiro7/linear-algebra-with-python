import numpy as np
import matplotlib.pyplot as plt

# T1 — Eliminação de Gauss

A = np.array([
    [2, 1, -1],
    [-3, -1, 2],
    [-2, 1, 2]
], dtype=float)

b = np.array([8, -11, -3], dtype=float)


def escalonar(A, b):
    A = A.copy()
    b = b.copy()
    n = len(b)

    for i in range(n):
        pivot = np.argmax(np.abs(A[i:, i])) + i

        A[[i, pivot]] = A[[pivot, i]]
        b[[i, pivot]] = b[[pivot, i]]

        for j in range(i + 1, n):
            fator = A[j, i] / A[i, i]
            A[j] -= fator * A[i]
            b[j] -= fator * b[i]

    return A, b


def substituicao_retroativa(U, b):
    n = len(b)
    x = np.zeros(n)

    for i in range(n - 1, -1, -1):
        x[i] = (b[i] - np.dot(U[i, i + 1:], x[i + 1:])) / U[i, i]

    return x


U, b_mod = escalonar(A, b)
x = substituicao_retroativa(U, b_mod)

print("Solução:", x)


# T2 e T3 — SPI e SI

A_spi = np.array([
    [1, 2, 3],
    [2, 4, 6]
], dtype=float)

b_spi = np.array([4, 8], dtype=float)

A_si = np.array([
    [1, 2],
    [2, 4]
], dtype=float)

b_si = np.array([3, 8], dtype=float)


# T4 — Classificação

def classificar_sistema(A, b):
    posto_A = np.linalg.matrix_rank(A)

    Ab = np.column_stack((A, b))
    posto_Ab = np.linalg.matrix_rank(Ab)

    n = A.shape[1]

    if posto_A == posto_Ab == n:
        return "SPD"

    if posto_A == posto_Ab < n:
        return "SPI"

    return "SI"


print("Sistema principal:", classificar_sistema(A, b))
print("SPI:", classificar_sistema(A_spi, b_spi))
print("SI:", classificar_sistema(A_si, b_si))


# T5 — Solução paramétrica

print("\nExemplo SPI:")
print("x = 4 - 2y - 3z")
print("y e z são variáveis livres")


# T6 — Comparação com NumPy

sol_numpy = np.linalg.solve(A, b)

print("\nGauss:", x)
print("NumPy:", sol_numpy)

print(
    "Resultados iguais?",
    np.allclose(x, sol_numpy)
)


# T7a — Visualização 2D

x_vals = np.linspace(-10, 10, 100)

plt.figure(figsize=(12, 4))

# SPD
plt.subplot(1, 3, 1)
plt.plot(x_vals, 2 - x_vals)
plt.plot(x_vals, x_vals)
plt.title("SPD")

# SPI
plt.subplot(1, 3, 2)
plt.plot(x_vals, 2 * x_vals + 1)
plt.plot(x_vals, 2 * x_vals + 1)
plt.title("SPI")

# SI
plt.subplot(1, 3, 3)
plt.plot(x_vals, x_vals)
plt.plot(x_vals, x_vals + 2)
plt.title("SI")

plt.tight_layout()
plt.savefig("sistemas_2d.png")
plt.show()


# T7b — Visualização 3D

fig = plt.figure(figsize=(8, 6))
ax = fig.add_subplot(111, projection="3d")

xg = np.linspace(-5, 5, 10)
yg = np.linspace(-5, 5, 10)

X, Y = np.meshgrid(xg, yg)

Z1 = 5 - X - Y
Z2 = 3 + X - Y
Z3 = 2 - X + Y

ax.plot_surface(X, Y, Z1, alpha=0.4)
ax.plot_surface(X, Y, Z2, alpha=0.4)
ax.plot_surface(X, Y, Z3, alpha=0.4)

ax.set_title("Interseção de planos")

plt.savefig("planos_3d.png")
plt.show()