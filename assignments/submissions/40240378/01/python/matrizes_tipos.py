import numpy as np


def criar_matrizes():
    """
    Tarefa 1: Cria todas as matrizes especiais pedidas no enunciado.
    Devolve um dicionario com todas elas para usar nas tarefas seguintes.
    """
    zeros = np.zeros((3, 4))
    identidade = np.eye(4)
    diagonal = np.diag([2, 5, -1])

    base = np.array([[1, 2, 3],
                     [4, 5, 6],
                     [7, 8, 9]])

    triangular_superior = np.triu(base)
    triangular_inferior = np.tril(base)
    simetrica = base + base.T

    print("TAREFA 1 — Matrizes especiais\n")
    print("Zeros 3x4:\n", zeros)
    print("\nIdentidade 4x4:\n", identidade)
    print("\nDiagonal [2, 5, -1]:\n", diagonal)
    print("\nTriangular Superior:\n", triangular_superior)
    print("\nTriangular Inferior:\n", triangular_inferior)
    print("\nSimetrica (base + base transposta):\n", simetrica)

    return {
        "Zeros 3x4":          zeros,
        "Identidade 4x4":     identidade,
        "Diagonal 3x3":       diagonal,
        "Triang. Superior":   triangular_superior,
        "Triang. Inferior":   triangular_inferior,
        "Simetrica 3x3":      simetrica,
    }


def dimensoes_e_elementos(matrizes):
    """
    Tarefa 2: Para cada matriz mostra as dimensoes e o elemento na posicao [2,3].
    Linha 2, coluna 3 — a contagem comeca sempre em 0 no Python.
    """
    print("\n\nTAREFA 2 — Dimensoes e elementos\n")

    for nome, matriz in matrizes.items():
        numero_linhas, numero_colunas = matriz.shape

        if numero_linhas > 2 and numero_colunas > 3:
            elemento = matriz[2, 3]
        else:
            elemento = "fora dos limites"

        print(f"  {nome:20s} -> {numero_linhas}x{numero_colunas}   posicao [2,3] = {elemento}")


def classificar_matriz(matriz):
    """
    Tarefa 3: Recebe uma matriz e devolve uma lista com as suas classificacoes.
    Usamos np.allclose em vez de == porque com numeros decimais o == pode
    falhar por pequenos erros de arredondamento do computador.
    """
    classificacoes = []
    numero_linhas, numero_colunas = matriz.shape

    if numero_linhas == numero_colunas:
        classificacoes.append("square")
    else:
        classificacoes.append("rectangular")

    if np.allclose(matriz, 0):
        classificacoes.append("zero")

    if numero_linhas == numero_colunas:
    if np.allclose(matriz, np.eye(numero_linhas)):
        classificacoes.append("identity")

    if numero_linhas == numero_colunas:
        if np.allclose(matriz, np.diag(np.diag(matriz))):
            classificacoes.append("diagonal")
        if np.allclose(matriz, matriz.T):
            classificacoes.append("symmetric")
        if np.allclose(matriz, np.triu(matriz)):
            classificacoes.append("upper_triangular")
        if np.allclose(matriz, np.tril(matriz)):
            classificacoes.append("lower_triangular")

    return classificacoes


def testar_classificacao(matrizes):
    """Corre a funcao classificar_matriz em todas as matrizes da Tarefa 1."""
    print("\n\nTAREFA 3 — Classificacao das matrizes\n")

    for nome, matriz in matrizes.items():
        resultado = classificar_matriz(matriz)
        print(f"  {nome:20s} -> {resultado}")


def erros_dimensoes():
    """
    Tarefa 4: Mostra o que acontece quando tentamos operar com matrizes
    de tamanhos incompativeis. O try/except impede o programa de parar
    e permite mostrar uma mensagem de erro mais clara.
    """
    print("\n\nTAREFA 4 — Erros de dimensoes\n")

    print("Tentar somar 2x3 + 4x2:")
    try:
        np.ones((2, 3)) + np.ones((4, 2))
    except ValueError as erro:
        print(f"  ERRO: {erro}")
        print("  Para somar, as duas matrizes tem de ter as mesmas dimensoes.\n")

    print("Tentar multiplicar 3x2 @ 3x2:")
    try:
        np.ones((3, 2)) @ np.ones((3, 2))
    except ValueError as erro:
        print(f"  ERRO: {erro}")
        print("  Para multiplicar A@B: o numero de colunas de A tem de ser igual ao numero de linhas de B.")


if __name__ == "__main__":
    matrizes = criar_matrizes()
    dimensoes_e_elementos(matrizes)
    testar_classificacao(matrizes)
    erros_dimensoes()