import numpy as np

def verificar_propriedades(A, B, C):
    """
    Classifica condições com Matrizes Transpostas com valores booleanos
    """
    a = np.allclose((A.T).T, A)

    b = np.allclose((A + B).T, A.T + B.T)
    
    c = np.allclose((A @ C).T, C.T @ A.T)
    
    print(f"\n a:{a} \n b:{b} \n c:{c}")

def main():
    """
    Matrizes
    """
    A = np.array(
        [[3, 2, 1], 
         [7, 3, 5]])
    B = np.array(
        [[3, 6, 9], 
         [2, -1, 9]])
    C = np.array(
        [[1, 5], 
         [2, 6],
         [3, 9]])
    P = np.array(
        [[2,6],
         [4,8]])
    Q = np.array(
        [[5,1],
         [2,3]])
    I = np.eye(2, dtype=int)
    
    """
    Soma e multiplicação das matrizes
    """
    adicao = A + B
    subtracao = A - B
    multiplicacao = 3 * A

    print("\nAdição: A+B")
    print(adicao)
    print("\nSubtração: A-B")
    print(subtracao)
    print("\nMultiplicação: 3xA")
    print(multiplicacao)

    assert adicao.shape == A.shape
    assert subtracao.shape == A.shape
    assert multiplicacao.shape == A.shape

    print("\nMultiplicação: AxC")
    print(A@C)
    print("\nMultiplicação: CxA")
    print(C@A)
    """
    Para multiplicar duas matrizes, o número de colunas da primeira deve ser igual ao número de linhas da segunda. Com isso, concluímos que AxC e CxA são possíveis.
    No caso das dimensões, são diferentes porque a multiplicação de matrizes depende da ordem:
    - Em AxC, estamos a combinar as 2 linhas de A com as 2 colunas de C, resultando numa matriz 2x2.
    - Em CxA, combinamos as 3 linhas de C com as 3 colunas de A, gerando uma matriz 3x3.
    """
    PQ = P@Q
    QP = Q@P
    PI = P@I
    IP = I@P
    comutador = PQ - QP

    print("\n", np.allclose(PQ, QP))
    print("\n", np.allclose(PI, IP, P))

    """
    Matrizes Transpostas
    """
    verificar_propriedades(A, B, C)

    """
    Matriz Simétrica
    """
    M = np.array(
        [[1, 7, 3], 
         [7, 4, -5],
         [3, -5, 6]])
    S = M+M.T
    
    if np.allclose(S, S.T):
        print(f"\n{S}\nA matriz é simétrica")
    else:
        print(f"\n{S}\nA matriz não é simétrica")

    """
    Combinação Linear
    """
    D = np.array(
        [[8, 3, 5], 
         [1, 9, 2],
         [4, 7, 6]])
    x = np.array(
        [[6], 
         [2],
         [4]])
    
    Dx = D @ x

    d1 = D[:, [0]]
    d2 = D[:, [1]]
    d3 = D[:, [2]]
    x1 = x[0, 0]
    x2 = x[1, 0]
    x3 = x[2, 0]

    combinacao_linear = x1*d1 + x2*d2 + x3*d3

    print("\nCombinação Linear:\n",combinacao_linear,"\nDx:\n",Dx)

if __name__ == "__main__":
    main()