import numpy as np

print("=" * 60)
print("T1 — Soma, subtração e multiplicação por escalar")
print("=" * 60)

# T1
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
escalar = 3 * A

print("Matriz A:\n", A)
print("\nMatriz B:\n", B)
print("\nA + B:\n", soma)
print("\nA - B:\n", subtracao)
print("\n3A:\n", escalar)

# Verificação das dimensões
assert soma.shape == A.shape
print("\n✔ A soma preserva as dimensões:", soma.shape)


print("\n" + "=" * 60)
print("T2 — Produtos AC e CA")
print("=" * 60)

# T2
C = np.array([
    [1, 2],
    [3, 4],
    [5, 6]
])

AC = A @ C
CA = C @ A

print("Matriz C:\n", C)
print("\nAC:\n", AC)
print("Dimensão de AC:", AC.shape)

print("\nCA:\n", CA)
print("Dimensão de CA:", CA.shape)

print("""
Explicação:
- A é 2x3 e C é 3x2
- AC resulta numa matriz 2x2
- CA resulta numa matriz 3x3
- Como têm dimensões diferentes, não podem ser iguais
""")

print("\n✔ Verificação concluída")