import numpy as np

def classificar_matriz(A):
    """
    Classificação de cada matriz de acordo com o nº de linhas, nº de colunas e elementos
    """
    classificacoes = [] 
    lin, col = A.shape

    if lin == col:
        classificacoes.append("quadrada")

        if np.allclose(A, np.eye(lin)): 
            classificacoes.append("identidade")

        if np.allclose(A, np.diag(np.diag(A))):
            classificacoes.append("diagonal")

        if np.allclose(A, np.triu(A)):
            classificacoes.append("triangular superior")
        
        if np.allclose(A, np.tril(A)):
            classificacoes.append("triangular inferior")
        
        if np.allclose(A, A.T):
            classificacoes.append("simetrica")
    else:
        classificacoes.append("retangular")

    if np.allclose(A, 0):
        classificacoes.append("zero")

    return classificacoes


def main():
    """
    Matrizes
    """
    zero = np.zeros((3, 4), dtype=int)
    identidade = np.eye(4, dtype=int)
    diagonal = np.diag([2, 5, -1])
    sup_triangular = np.array(
        [[3, 2, 1], 
         [0, -1, 4], 
         [0, 0, 5]])
    inf_triangular = np.array(
        [[3, 0, 0], 
         [2, -1, 0], 
         [1, 4, 5]])
    M = np.array([[1, 2, 3], 
                  [0, -1, 4], [
                      5, 2, 0]])
    simetrica = M + M.T

    """
    Print das classificações e matrizes na consola
    """
    matrizes = [zero, identidade, diagonal, sup_triangular, inf_triangular, simetrica]
    nomes = ["Matriz Zero", "Matriz Identidade", "Matriz Diagonal", "Matriz Triangular Superior", "Matriz Triangular Inferior", "Matriz Simétrica"]

    for i in range(len(matrizes)):
        print(f"\n{nomes[i]}: {classificar_matriz(matrizes[i])}")
        print(matrizes[i])
        print(f"Dimensão: {matrizes[i].shape[0]} × {matrizes[i].shape[1]}")
        print(f"Elemento(2,3): {matrizes[i][1, 2]}")

    A = np.zeros((2, 3))
    B = np.zeros((4, 2))

    """
    Verificação de erros para soma e multiplicação
    """
    try:
        print(A + B)
    except ValueError as e:
        print("\nErro ao somar matrizes incompatíveis:", e)

    try:
        print(A @ B)
    except ValueError as e:
        print("\nErro ao multiplicar matrizes incompatíveis:", e)

if __name__ == "__main__":
    main()