
# passo 1 

def escalonar(Ab):
    Ab = [linha[:] for linha in Ab]  # copiar a matriz
    n = len(Ab)
    log = []

    for i in range(n):
        max_linha = i
        for k in range(i + 1, n):
            if abs(Ab[k][i]) > abs(Ab[max_linha][i]):
                max_linha = k

        if max_linha != i:
            Ab[i], Ab[max_linha] = Ab[max_linha], Ab[i]
            log.append(f"L{i+1} <-> L{max_linha+1}")

        pivo = Ab[i][i]

        if pivo == 0:
            raise ValueError("Sistema sem pivô único.")
        for j in range(i + 1, n):
            m = Ab[j][i] / pivo
            log.append(f"L{j+1} <- L{j+1} - ({m})L{i+1}")

            for col in range(i, n + 1):
                Ab[j][col] -= m * Ab[i][col]

    return Ab, log


def substituicao_retroativa(U, b):
    n = len(U)
    x = [0] * n

    for i in range(n - 1, -1, -1):
        soma = 0
        for j in range(i + 1, n):
            soma += U[i][j] * x[j]

        x[i] = (b[i] - soma) / U[i][i]

    return x

""" Sistema:
 2x + y - z = 8
 -3x - y + 2z = -11
 -2x + y + 2z = -3 """

Ab = [
    [2, 1, -1, 8],
    [-3, -1, 2, -11],
    [-2, 1, 2, -3]
]

Ab_escalonada, log = escalonar(Ab)

U = [linha[:-1] for linha in Ab_escalonada]
b = [linha[-1] for linha in Ab_escalonada]

solucao = substituicao_retroativa(U, b)

print("Matriz escalonada:")
for linha in Ab_escalonada:
    print(linha)

print("\nOperações:")
for op in log:
    print(op)

print("\nSolução:")
print(f"x = {round(solucao[0], 6)}")
print(f"y = {round(solucao[1], 6)}")
print(f"z = {round(solucao[2], 6)}")

# passo 2 

def escalonar(Ab):
    Ab = [linha[:] for linha in Ab]
    n_linhas = len(Ab)
    n_colunas = len(Ab[0]) - 1
    log = []

    linha_pivo = 0

    for col in range(n_colunas):
        maior_linha = linha_pivo

        for i in range(linha_pivo + 1, n_linhas):
            if abs(Ab[i][col]) > abs(Ab[maior_linha][col]):
                maior_linha = i

        if Ab[maior_linha][col] == 0:
            continue

        if maior_linha != linha_pivo:
            Ab[linha_pivo], Ab[maior_linha] = Ab[maior_linha], Ab[linha_pivo]
            log.append(f"L{linha_pivo+1} <-> L{maior_linha+1}")

        pivo = Ab[linha_pivo][col]

        for i in range(linha_pivo + 1, n_linhas):
            m = Ab[i][col] / pivo
            log.append(f"L{i+1} <- L{i+1} - ({m})L{linha_pivo+1}")

            for j in range(col, n_colunas + 1):
                Ab[i][j] -= m * Ab[linha_pivo][j]

        linha_pivo += 1

    return Ab, log


# Sistema SPI:
# x + y = 4
# 2x + 2y = 8

Ab = [
    [1, 1, 4],
    [2, 2, 8]
]

Ab_escalonada, log = escalonar(Ab)

print("Matriz escalonada:")
for linha in Ab_escalonada:
    print(linha)

print("\nOperações:")
for op in log:
    print(op)

print("\nForma escalonada mostra:")
print("x + y = 4")
print("0 = 0")
print("Logo, y é variável livre.")

print("\nSolução paramétrica:")
print("Se y = t, então x = 4 - t")
print("Logo, (x, y) = (4 - t, t), com t real")

print("\nSoluções particulares:")

for y in [0, 1, 4]:
    x = 4 - y
    print(f"Se y = {y}, então x = {x} -> solução: ({x}, {y})")


# 3 passo

# Sistema SI:
# x + y = 4
# 2x + 2y = 10

Ab = [
    [1, 1, 4],
    [2, 2, 10]
]

Ab_escalonada, log = escalonar(Ab)

print("Matriz escalonada:")
for linha in Ab_escalonada:
    print(linha)

print("\nOperações:")
for op in log:
    print(op)

print("\nForma escalonada mostra:")
print("x + y = 4")
print("0 = 2")
print("Logo, há uma contradição.")

print("\nConclusão:")
print("O sistema é impossível (SI), portanto não tem solução.")

print("\nExplicação geométrica:")
print("As equações representam duas retas paralelas.")
print("Como têm a mesma inclinação, mas termos independentes diferentes, nunca se intersectam.")
print("Logo, não existe nenhum ponto (x, y) que satisfaça as duas equações ao mesmo tempo.")

# 4 passo 

def posto(M):
    M = [linha[:] for linha in M]
    n_linhas = len(M)
    n_colunas = len(M[0])
    rank = 0

    for col in range(n_colunas):
        pivo = None

        for i in range(rank, n_linhas):
            if abs(M[i][col]) > 1e-10:
                pivo = i
                break

        if pivo is None:
            continue

        M[rank], M[pivo] = M[pivo], M[rank]

        valor_pivo = M[rank][col]

        for j in range(col, n_colunas):
            M[rank][j] /= valor_pivo

        for i in range(n_linhas):
            if i != rank:
                fator = M[i][col]
                for j in range(col, n_colunas):
                    M[i][j] -= fator * M[rank][j]

        rank += 1

    return rank


def classificar_sistema(A, b):
    Ab = [A[i] + [b[i]] for i in range(len(A))]

    rank_A = posto(A)
    rank_Ab = posto(Ab)
    n_incognitas = len(A[0])

    if rank_A < rank_Ab:
        return "SI"
    elif rank_A == rank_Ab == n_incognitas:
        return "SPD"
    else:
        return "SPI"


""" Testes """

sistemas = [
    # 2x2 SPD
    (
        [[1, 1],
         [1, -1]],
        [4, 2]
    ),

    # 2x2 SPI
    (
        [[1, 1],
         [2, 2]],
        [4, 8]
    ),

    # 2x2 SI
    (
        [[1, 1],
         [2, 2]],
        [4, 10]
    ),

    # 3x3 SPD
    (
        [[2, 1, -1],
         [-3, -1, 2],
         [-2, 1, 2]],
        [8, -11, -3]
    ),

    # 4x4 SPI
    (
        [[1, 1, 1, 1],
         [2, 2, 2, 2],
         [1, -1, 0, 0],
         [0, 0, 1, -1]],
        [4, 8, 0, 0]
    )
]

for i, (A, b) in enumerate(sistemas, start=1):
    resultado = classificar_sistema(A, b)
    print(f"Sistema {i}: {resultado}")


# passo 5 

""" Sistema SPI:
 x + y + z = 6
 2x + 2y + 2z = 12 """

print("Sistema:")
print("x + y + z = 6")
print("2x + 2y + 2z = 12")

print("\nComo a segunda equação é múltipla da primeira, existe SPI.")

print("\nSolução paramétrica geral:")
print("Se y = s e z = t, então:")
print("x = 6 - s - t")
print("Logo, (x, y, z) = (6 - s - t, s, t), com s,t reais")

print("\nVerificação com valores específicos:")

parametros = [
    (0, 0),
    (1, 2),
    (3, -1)
]

for s, t in parametros:
    x = 6 - s - t
    y = s
    z = t

    eq1 = x + y + z
    eq2 = 2*x + 2*y + 2*z

    print(f"\nPara s = {s}, t = {t}:")
    print(f"(x, y, z) = ({x}, {y}, {z})")
    print(f"Equação 1: x + y + z = {eq1}")
    print(f"Equação 2: 2x + 2y + 2z = {eq2}")

    if eq1 == 6 and eq2 == 12:
        print("Satisfaz as equações originais.")
    else:
        print("Não satisfaz.")


# passo 6 

import numpy as np

def escalonar(Ab):
    Ab = [linha[:] for linha in Ab]
    n = len(Ab)

    for i in range(n):
        max_linha = i
        for k in range(i + 1, n):
            if abs(Ab[k][i]) > abs(Ab[max_linha][i]):
                max_linha = k

        if max_linha != i:
            Ab[i], Ab[max_linha] = Ab[max_linha], Ab[i]

        pivo = Ab[i][i]

        if abs(pivo) < 1e-10:
            raise ValueError("Sistema singular ou sem solução única.")

        for j in range(i + 1, n):
            m = Ab[j][i] / pivo
            for col in range(i, n + 1):
                Ab[j][col] -= m * Ab[i][col]

    return Ab


def substituicao_retroativa(U, b):
    n = len(U)
    x = [0] * n

    for i in range(n - 1, -1, -1):
        soma = 0
        for j in range(i + 1, n):
            soma += U[i][j] * x[j]

        x[i] = (b[i] - soma) / U[i][i]

    return x


def gauss(A, b):
    Ab = [A[i] + [b[i]] for i in range(len(A))]

    Ab_escalonada = escalonar(Ab)

    U = [linha[:-1] for linha in Ab_escalonada]
    novo_b = [linha[-1] for linha in Ab_escalonada]

    return substituicao_retroativa(U, novo_b)


# Sistema SPD
A = [
    [2, 1, -1],
    [-3, -1, 2],
    [-2, 1, 2]
]

b = [8, -11, -3]

sol_gauss = gauss(A, b)
sol_numpy = np.linalg.solve(np.array(A, dtype=float), np.array(b, dtype=float))

print("Sistema SPD:")
print("Solução pela implementação de Gauss:")
print(sol_gauss)

print("\nSolução pelo solucionador integrado NumPy:")
print(sol_numpy)

print("\nProduzem o mesmo resultado?")
print(np.allclose(sol_gauss, sol_numpy))


# Sistema singular
A_singular = np.array([
    [1, 1],
    [2, 2]
], dtype=float)

b_singular = np.array([4, 8], dtype=float)

print("\nSistema singular:")

try:
    sol_singular = np.linalg.solve(A_singular, b_singular)
    print(sol_singular)
except np.linalg.LinAlgError as erro:
    print("Erro do NumPy:")
    print(erro)
    print("O solucionador integrado não resolve sistemas singulares.")



# passo 7 

import matplotlib.pyplot as plt
import os

desktop = "/Users/claramota/Desktop"

# -----------------------------
# (a) Sistemas 2D
# -----------------------------

x = np.linspace(-5, 5, 100)

# SPD - solução única
y1_spd = 4 - x
y2_spd = x - 2

plt.figure()
plt.plot(x, y1_spd, label="x + y = 4")
plt.plot(x, y2_spd, label="x - y = 2")
plt.scatter(3, 1)
plt.title("SPD - Solução Única")
plt.xlabel("x")
plt.ylabel("y")
plt.legend()
plt.grid(True)

plt.savefig(os.path.join(desktop, "SPD.png"),
            dpi=300,
            bbox_inches="tight")
plt.close()

# SPI - infinitas soluções
y1_spi = 4 - x
y2_spi = 4 - x

plt.figure()
plt.plot(x, y1_spi, label="x + y = 4")
plt.plot(x, y2_spi, "--", label="2x + 2y = 8")
plt.title("SPI - Infinitas Soluções")
plt.xlabel("x")
plt.ylabel("y")
plt.legend()
plt.grid(True)

plt.savefig(os.path.join(desktop, "SPI.png"),
            dpi=300,
            bbox_inches="tight")
plt.close()

# SI - nenhuma solução
y1_si = 4 - x
y2_si = 5 - x

plt.figure()
plt.plot(x, y1_si, label="x + y = 4")
plt.plot(x, y2_si, label="x + y = 5")
plt.title("SI - Nenhuma Solução")
plt.xlabel("x")
plt.ylabel("y")
plt.legend()
plt.grid(True)

plt.savefig(os.path.join(desktop, "SI.png"),
            dpi=300,
            bbox_inches="tight")
plt.close()

# -----------------------------
# (b) Sistema 3D
# -----------------------------

fig = plt.figure(figsize=(8, 6))
ax = fig.add_subplot(111, projection='3d')

x = np.linspace(-2, 4, 20)
y = np.linspace(-2, 4, 20)

X, Y = np.meshgrid(x, y)

# Três planos que se intersectam num ponto

# x + y + z = 6
Z1 = 6 - X - Y

# x - y + z = 2
Z2 = 2 - X + Y

# x + y - z = 0
Z3 = X + Y

ax.plot_surface(X, Y, Z1, alpha=0.5)
ax.plot_surface(X, Y, Z2, alpha=0.5)
ax.plot_surface(X, Y, Z3, alpha=0.5)

# ponto de interseção
ax.scatter(2, 2, 4, s=50)

ax.set_title("Três Planos Intersectam-se Num Ponto")
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.set_zlabel("z")

plt.savefig(os.path.join(desktop, "Planos3D.png"),
            dpi=300,
            bbox_inches="tight")
plt.close()

print("Imagens guardadas com sucesso em:")
print(desktop)

print("\nFicheiros criados:")
print("SPD.png")
print("SPI.png")
print("SI.png")
print("Planos3D.png")