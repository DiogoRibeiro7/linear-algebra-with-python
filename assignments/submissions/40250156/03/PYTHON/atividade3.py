import numpy as np
import matplotlib.pyplot as plt

# T1 — Determinantes 2x2 e 3x3

def det_2x2(A):
    return A[0, 0] * A[1, 1] - A[0, 1] * A[1, 0]


def det_3x3_sarrus(A):
    return (
        A[0,0]*A[1,1]*A[2,2]
        + A[0,1]*A[1,2]*A[2,0]
        + A[0,2]*A[1,0]*A[2,1]
        - A[0,2]*A[1,1]*A[2,0]
        - A[0,0]*A[1,2]*A[2,1]
        - A[0,1]*A[1,0]*A[2,2]
    )


A = np.array([[2, 1], [3, 4]])
B = np.array([[1, 2], [2, 4]])

print(det_2x2(A), np.linalg.det(A))
print(det_2x2(B), np.linalg.det(B))


C = np.array([[1, 2, 3], [0, 1, 4], [5, 6, 0]])
D = np.array([[1, 2, 3], [2, 4, 6], [1, 1, 1]])

print(det_3x3_sarrus(C), np.linalg.det(C))
print(det_3x3_sarrus(D), np.linalg.det(D))


# T2 — Determinante por eliminação de Gauss

def det_gauss(A):
    A = A.astype(float).copy()
    n = len(A)
    det = 1

    for i in range(n):
        pivot = np.argmax(np.abs(A[i:, i])) + i

        if A[pivot, i] == 0:
            return 0

        if pivot != i:
            A[[i, pivot]] = A[[pivot, i]]
            det *= -1

        det *= A[i, i]

        for j in range(i + 1, n):
            fator = A[j, i] / A[i, i]
            A[j] -= fator * A[i]

    return det


E = np.array([
    [1, 2, 3, 1],
    [0, 1, 4, 2],
    [5, 6, 0, 3],
    [1, 0, 2, 1]
])

print(det_gauss(E))
print(np.linalg.det(E))


# T3 — Propriedades

R1 = np.random.randint(1, 5, (3, 3))
R2 = np.random.randint(1, 5, (3, 3))

print(np.allclose(
    np.linalg.det(R1 @ R2),
    np.linalg.det(R1) * np.linalg.det(R2)
))

print(np.allclose(
    np.linalg.det(R1.T),
    np.linalg.det(R1)
))


# T4 — Invertibilidade

def eh_invertivel(A):
    return not np.isclose(np.linalg.det(A), 0)


for matriz in [C, D, E]:
    print(eh_invertivel(matriz))
    print(np.linalg.cond(matriz))


# T5 — Gauss-Jordan

def inversa_gauss_jordan(A):
    n = len(A)
    AI = np.hstack((A.astype(float), np.eye(n)))

    for i in range(n):
        AI[i] = AI[i] / AI[i, i]

        for j in range(n):
            if i != j:
                AI[j] -= AI[j, i] * AI[i]

    return AI[:, n:]


inv = inversa_gauss_jordan(C)

print(inv)
print(np.allclose(C @ inv, np.eye(3)))


# T6 — Visualização

T = np.array([[2, 1], [1, 3]])

quadrado = np.array([
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0]
])

transformado = quadrado @ T.T

plt.figure(figsize=(6, 6))

plt.plot(quadrado[:, 0], quadrado[:, 1], label="Quadrado unitário")
plt.plot(transformado[:, 0], transformado[:, 1],
         label="Transformação")

plt.axis("equal")
plt.grid(True)

plt.title(
    f"Escala da área = |det(A)| = {abs(np.linalg.det(T)):.2f}"
)

plt.legend()

plt.savefig("determinante_area.png")
plt.show()