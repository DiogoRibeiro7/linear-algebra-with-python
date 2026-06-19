import numpy as np

np.set_printoptions(precision=2, suppress=True)

print("===== T1 — Operações básicas =====")

A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

B = np.array([
    [6, 5, 4],
    [3, 2, 1]
])

soma = A + B
subtracao = A - B
multiplicacao_escalar = 3 * A

print("A:")
print(A)

print("\nB:")
print(B)

print("\nA + B:")
print(soma)

print("\nA - B:")
print(subtracao)

print("\n3A:")
print(multiplicacao_escalar)

assert soma.shape == A.shape
print("\nA soma preserva as dimensões:", soma.shape)


print("\n\n===== T2 — Produtos AC e CA =====")

C = np.array([
    [1, 2],
    [3, 4],
    [5, 6]
])

AC = A @ C
CA = C @ A

print("C:")
print(C)

print("\nAC:")
print(AC)
print("Dimensão de AC:", AC.shape)

print("\nCA:")
print(CA)
print("Dimensão de CA:", CA.shape)

print("\nExplicação:")
print("A tem dimensão 2x3 e C tem dimensão 3x2.")
print("Por isso, AC tem dimensão 2x2.")
print("Já CA tem dimensão 3x3.")
print("Como os resultados têm dimensões diferentes, não podem ser iguais.")


print("\n\n===== T3 — Não comutatividade =====")

P = np.array([
    [1, 2],
    [3, 4]
])

Q = np.array([
    [0, 1],
    [2, 3]
])

PQ = P @ Q
QP = Q @ P
comutador = PQ - QP

print("P:")
print(P)

print("\nQ:")
print(Q)

print("\nPQ:")
print(PQ)

print("\nQP:")
print(QP)

print("\nComutador [P,Q] = PQ - QP:")
print(comutador)

print("\nPQ é igual a QP?", np.allclose(PQ, QP))

I = np.eye(2)

print("\nMatriz identidade I:")
print(I)

print("\nPI:")
print(P @ I)

print("\nIP:")
print(I @ P)

print("\nPI = P?", np.allclose(P @ I, P))
print("IP = P?", np.allclose(I @ P, P))


print("\n\n===== T4 — Propriedades da transposta =====")

prop1 = np.allclose((A.T).T, A)
prop2 = np.allclose((A + B).T, A.T + B.T)
prop3 = np.allclose((A @ C).T, C.T @ A.T)

print("(A.T).T = A ?", prop1)
print("(A + B).T = A.T + B.T ?", prop2)
print("(AC).T = C.T @ A.T ?", prop3)


print("\n\n===== T5 — Matriz simétrica e combinação linear =====")

M = np.random.randint(1, 10, size=(3, 3))
S = M + M.T

print("M:")
print(M)

print("\nS = M + M.T:")
print(S)

print("\nS é simétrica?", np.allclose(S, S.T))

A3 = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 10]
])

x = np.array([2, -1, 3])

Ax = A3 @ x

a1 = A3[:, 0]
a2 = A3[:, 1]
a3 = A3[:, 2]

combinacao_linear = x[0] * a1 + x[1] * a2 + x[2] * a3

print("\nA3:")
print(A3)

print("\nx:")
print(x)

print("\nAx:")
print(Ax)

print("\nColunas de A3:")
print("a1 =", a1)
print("a2 =", a2)
print("a3 =", a3)

print("\nCombinação linear x1*a1 + x2*a2 + x3*a3:")
print(combinacao_linear)

print("\nAx é igual à combinação linear?", np.allclose(Ax, combinacao_linear))