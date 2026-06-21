import numpy as np
import matplotlib.pyplot as plt


# T1 — Retas em 2D

def cruz_2d(u, v):
    return u[0] * v[1] - u[1] * v[0]


def posicao_relativa_retas_2d(p1, v1, p2, v2):
    if not np.isclose(cruz_2d(v1, v2), 0):
        return "intersectantes"

    if np.isclose(cruz_2d(p2 - p1, v1), 0):
        return "coincidentes"

    return "paralelas"


p1 = np.array([0, 0])
v1 = np.array([1, 1])

p2 = np.array([0, 1])
v2 = np.array([1, -1])

p3 = np.array([0, 1])
v3 = np.array([1, 1])

p4 = np.array([2, 2])
v4 = np.array([1, 1])

print("Retas 2D:")
print("Caso 1:", posicao_relativa_retas_2d(p1, v1, p2, v2))
print("Caso 2:", posicao_relativa_retas_2d(p1, v1, p3, v3))
print("Caso 3:", posicao_relativa_retas_2d(p1, v1, p4, v4))


t = np.linspace(-5, 5, 100)

fig, axes = plt.subplots(1, 3, figsize=(12, 4))

casos_2d = [
    (p1, v1, p2, v2, "Intersectantes"),
    (p1, v1, p3, v3, "Paralelas"),
    (p1, v1, p4, v4, "Coincidentes")
]

for ax, (a, va, b, vb, titulo) in zip(axes, casos_2d):
    r1 = a[:, None] + va[:, None] * t
    r2 = b[:, None] + vb[:, None] * t

    ax.plot(r1[0], r1[1], label="Reta 1")
    ax.plot(r2[0], r2[1], label="Reta 2")
    ax.set_title(titulo)
    ax.grid(True)
    ax.legend()

plt.tight_layout()
plt.savefig("retas_2d.png")
plt.show()


# T2 — Retas em 3D

def posicao_relativa_retas_3d(p1, v1, p2, v2):
    cruz = np.cross(v1, v2)

    if np.allclose(cruz, 0):
        if np.allclose(np.cross(p2 - p1, v1), 0):
            return "coincidentes"
        return "paralelas"

    matriz = np.column_stack((v1, -v2, p2 - p1))

    if np.isclose(np.linalg.det(matriz), 0):
        return "intersectantes"

    return "enviesadas"


a = np.array([0, 0, 0])
va = np.array([1, 1, 1])

b = np.array([1, 0, 0])
vb = np.array([-1, 1, 1])

c = np.array([0, 1, 0])
vc = np.array([1, 1, 1])

d = np.array([2, 2, 2])
vd = np.array([1, 1, 1])

e = np.array([0, 1, 0])
ve = np.array([1, 0, 0])

print("\nRetas 3D:")
print("Intersectantes:", posicao_relativa_retas_3d(a, va, b, vb))
print("Paralelas:", posicao_relativa_retas_3d(a, va, c, vc))
print("Coincidentes:", posicao_relativa_retas_3d(a, va, d, vd))
print("Enviesadas:", posicao_relativa_retas_3d(a, va, e, ve))


fig = plt.figure(figsize=(10, 8))

casos_3d = [
    (a, va, b, vb, "Intersectantes"),
    (a, va, c, vc, "Paralelas"),
    (a, va, d, vd, "Coincidentes"),
    (a, va, e, ve, "Enviesadas")
]

for i, (p, v, q, w, titulo) in enumerate(casos_3d, 1):
    ax = fig.add_subplot(2, 2, i, projection="3d")

    r1 = p[:, None] + v[:, None] * t
    r2 = q[:, None] + w[:, None] * t

    ax.plot(r1[0], r1[1], r1[2])
    ax.plot(r2[0], r2[1], r2[2])
    ax.set_title(titulo)

plt.tight_layout()
plt.savefig("retas_3d.png")
plt.show()


# T3 — Plano cartesiano para paramétrico

def plano_cartesiano_para_parametrico(a, b, c, d):
    normal = np.array([a, b, c], dtype=float)

    if not np.isclose(c, 0):
        ponto = np.array([0, 0, d / c])
    elif not np.isclose(b, 0):
        ponto = np.array([0, d / b, 0])
    else:
        ponto = np.array([d / a, 0, 0])

    if not np.isclose(a, 0) or not np.isclose(b, 0):
        v1 = np.array([b, -a, 0], dtype=float)
    else:
        v1 = np.array([1, 0, 0], dtype=float)

    v2 = np.cross(normal, v1)

    return ponto, v1, v2


ponto, u, v = plano_cartesiano_para_parametrico(1, 2, 3, 6)

print("\nPlano cartesiano para paramétrico:")
print("Ponto:", ponto)
print("Vetor 1:", u)
print("Vetor 2:", v)


# T4 — Posição relativa entre planos

def posicao_relativa_planos(n1, d1, n2, d2):
    if np.allclose(np.cross(n1, n2), 0):
        razao = None

        for i in range(3):
            if not np.isclose(n2[i], 0):
                razao = n1[i] / n2[i]
                break

        if razao is not None and np.isclose(d1, razao * d2):
            return "coincidentes"

        return "paralelos"

    return "secantes"


print("\nPlanos:")
print(posicao_relativa_planos(
    np.array([1, 2, 3]), 6,
    np.array([2, 4, 6]), 12
))

print(posicao_relativa_planos(
    np.array([1, 2, 3]), 6,
    np.array([2, 4, 6]), 10
))

print(posicao_relativa_planos(
    np.array([1, 0, 0]), 1,
    np.array([0, 1, 0]), 2
))


# T5 — Interseção reta-plano

def intersecao_reta_plano(p, v, n, d):
    denominador = np.dot(n, v)

    if np.isclose(denominador, 0):
        if np.isclose(np.dot(n, p), d):
            return "reta contida no plano"
        return "reta paralela ao plano"

    t = (d - np.dot(n, p)) / denominador

    return p + t * v


print("\nInterseção reta-plano:")
print(intersecao_reta_plano(
    np.array([0, 0, 0]),
    np.array([1, 1, 1]),
    np.array([1, 1, 1]),
    3
))


# T6 — Produto escalar

print("\nProduto escalar:")
print("Retas perpendiculares:", np.dot([1, 0, 0], [0, 1, 0]) == 0)
print("Reta paralela a plano:", np.dot([1, 0, 0], [0, 0, 1]) == 0)
print("Planos perpendiculares:", np.dot([1, 0, 0], [0, 1, 0]) == 0)


# T7 — Visualização 3D resumo

fig = plt.figure(figsize=(8, 6))
ax = fig.add_subplot(111, projection="3d")

x = np.linspace(-3, 3, 20)
y = np.linspace(-3, 3, 20)
X, Y = np.meshgrid(x, y)
Z = (3 - X - Y)

ax.plot_surface(X, Y, Z, alpha=0.4)

linha_inter = np.array([0, 0, 0])[:, None] + np.array([1, 1, 1])[:, None] * t
linha_paralela = np.array([0, 0, 2])[:, None] + np.array([1, -1, 0])[:, None] * t

ax.plot(linha_inter[0], linha_inter[1], linha_inter[2], label="Reta intersectante")
ax.plot(linha_paralela[0], linha_paralela[1], linha_paralela[2], label="Reta paralela")

ponto_inter = np.array([1, 1, 1])
ax.scatter(ponto_inter[0], ponto_inter[1], ponto_inter[2], s=50, label="Interseção")

ax.quiver(0, 0, 3, 1, 1, 1, length=1, label="Normal")

ax.set_title("Plano, retas, normal e ponto de interseção")
ax.legend()

plt.savefig("geometria_resumo.png")
plt.show()

