import numpy as np
import matplotlib.pyplot as plt

def det_2x2(M):
    """
    Aplica a fórmula: ad - bc e retorna o determinante de matrizes 2x2
    """

    return (M[0,0] * M[1,1]) - (M[0,1] * M[1,0])

def det_3x3_sarrus(M):
    """
    Aplica a regra de Sarrus e retorna o determinante de matrizes 3x3
    """
    diagonal_pos = (M[0,0]*M[1,1]*M[2,2]) + (M[0,1]*M[1,2]*M[2,0]) + (M[0,2]*M[1,0]*M[2,1])
    diagonal_neg = (M[0,2]*M[1,1]*M[2,0]) + (M[0,0]*M[1,2]*M[2,1]) + (M[0,1]*M[1,0]*M[2,2])

    return diagonal_pos - diagonal_neg

def det_gauss(M):
    """
    Aplica o método de Gauss e retorna o determinante de matrizes 4x4
    """
    n_linhas, n_colunas = M.shape
    passos = []

    passos.append(M.copy()) # .copy() guarda o estado atual da matriz, e não recorre a matriz inicial

    for i in range(min(n_linhas, n_colunas)):

        if M[i, i] == 0:
            continue

        for j in range(i + 1, n_linhas):
            multiplicador = M[j, i] / M[i, i]

            M[j, i:] = M[j, i:] - multiplicador * M[i, i:]
        
        passos.append(M.copy())

    return np.prod(np.diag(M)), passos

def eh_invertivel(A):
    """
    Recebe uma matriz quadrada e calcula o determinante e o número de condição
    """
    det = np.linalg.det(A)
    cond = np.linalg.cond(A)

    tolerancia = 1e-12
    invertivel = abs(det) > tolerancia
    
    print(f"Matriz:\n{A}")
    print(f"\tDeterminante: {det:.6e}")
    print(f"\tNúmero de Condição: {cond:.6e}")
    
    if not invertivel:
        print("Não invertível (Singular).")
    elif cond > 1e8:
        print("Invertível, mas mal condicionada.")
    else:
        print("Invertível e bem condicionada.")

    return invertivel

def inversa_gauss_jordan(A):
    """
    Calcula a inversa pelo método Gauss-Jordan
    """
    A = A.astype(float)
    n = A.shape[0]
    
    # Matriz aumentada [A|I]
    I = np.eye(n)
    aum = np.hstack((A, I))
    
    for i in range(n):
        max_row = np.argmax(abs(aum[i:, i])) + i
        if abs(aum[max_row, i]) < 1e-12:
            raise ValueError("A matriz é singular e não pode ser invertida.")
            
        if max_row != i:
            aum[[i, max_row]] = aum[[max_row, i]]
            
        pivo = aum[i, i]
        aum[i] = aum[i] / pivo
        
        for j in range(n):
            if i != j:
                fator = aum[j, i]
                aum[j] = aum[j] - fator * aum[i]
                
    A_inv = aum[:, n:]

    return A_inv

def main():
    """
    Matrizes
    """
    A = np.array(
        [[3, 5], 
        [2, -1]])
    B = np.array(
        [[2, 4], 
        [3, 6]])
    C = np.array([
        [1, 0, 2],
        [-1, 3, 0],
        [2, 1, 4]])
    D = np.array([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]])
    E = np.array([
        [1, 2, 3, 2],
        [4, 5, 6, 5],
        [7, 8, 10, 7],
        [7, 8, 9, 10]])
    # 1. Matriz Bem Condicionada
    M_bc = np.array([
        [4, 7], 
        [2, 6]])
    # 2. Matriz Singular
    M_sing = np.array([
        [1, 2, 3], 
        [4, 5, 6], 
        [2, 4, 6]])
    # 3. Matriz Mal Condicionada
    M_mc = np.array([
        [1, 1/2, 1/3], 
        [1/2, 1/3, 1/4], 
        [1/3, 1/4, 1/5]])
    
    """
    Validação dos determinantes
    """
    assert int(np.linalg.det(A)) == det_2x2(A)
    assert int(np.linalg.det(B)) == det_2x2(B)
    assert int(np.linalg.det(C)) == det_3x3_sarrus(C)
    assert int(np.linalg.det(D)) == det_3x3_sarrus(D)

    """
    Determinante da matriz 4x4 e passos
    """
    determinante_final, lista_de_passos = det_gauss(E)

    print(f"Determinante: {determinante_final}\n")
    
    for index, passo in enumerate(lista_de_passos):
        print(f"Passo {index}:\n{passo}\n")

    """
    Validação de Propriedades
    """
    n = 4
    M1 = np.random.rand(n, n)
    M2 = np.random.rand(n, n)
    k = 2.5

    # det(M1 * M2) = det(M1) * det(M2)
    det_M1_M2 = np.linalg.det(M1 @ M2)
    det_M1_det_M2 = np.linalg.det(M1) * np.linalg.det(M2)

    assert np.allclose(det_M1_M2, det_M1_det_M2)
    print("Propriedade det(M1 * M2) = det(M1)det(M2) validada.")

    # det(M1.T) = det(M1)
    assert np.allclose(np.linalg.det(M1.T), np.linalg.det(M1))
    print("Propriedade det(M1.T) = det(M1) validada.")

    # det(k * M1) = (k^n) * det(M1)
    det_kM1 = np.linalg.det(k * M1)
    det_formula_k = (k**n) * np.linalg.det(M1)

    assert np.allclose(det_kM1, det_formula_k)
    print("Propriedade det(kM1) = k^n * det(M1) validada.")

    # Troca de linhas altera o sinal
    M1_trocada = M1.copy()
    M1_trocada[[0, 1]] = M1_trocada[[1, 0]]

    assert np.allclose(np.linalg.det(M1_trocada), -np.linalg.det(M1))
    print("Propriedade de troca de linhas validada.")

    """
    Invertibilidade
    """
    eh_invertivel(M_bc)
    eh_invertivel(M_sing)
    eh_invertivel(M_mc)

    """
    Inversa por Gauss-Jordan
    """
    C_inv = inversa_gauss_jordan(C)
    print("Matriz Inversa:\n", C_inv)

    identidade_obtida = np.dot(C, C_inv)
    sucesso = np.allclose(identidade_obtida, np.eye(3))
    print(f"\nValidação (A * A_inv == I): {sucesso}")

    """
    Visualização Geométrica da Transformação
    """
    A = np.array([[2.0, 1.0], 
                [0.5, 1.5]])
    det_A = np.linalg.det(A)

    quadrado = np.array([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]).T

    paralelogramo = np.dot(A, quadrado)

    plt.figure(figsize=(8, 8))
    plt.grid(True, linestyle='--', alpha=0.6)

    plt.plot(quadrado[0], quadrado[1], 'b-', label='Quadrado Original (Área = 1)', linewidth=2)
    plt.fill(quadrado[0], quadrado[1], 'b', alpha=0.2)

    plt.plot(paralelogramo[0], paralelogramo[1], 'r-', label=f'Transformado (Área = {abs(det_A):.2f})', linewidth=2)
    plt.fill(paralelogramo[0], paralelogramo[1], 'r', alpha=0.2)

    plt.quiver(0, 0, A[0,0], A[1,0], angles='xy', scale_units='xy', scale=1, color='darkred', label='Vetor Transformado i')
    plt.quiver(0, 0, A[0,1], A[1,1], angles='xy', scale_units='xy', scale=1, color='orangered', label='Vetor Transformado j')

    lim = max(np.max(abs(quadrado)), np.max(abs(paralelogramo))) + 0.5
    plt.xlim(-0.5, lim)
    plt.ylim(-0.5, lim)
    plt.axhline(0, color='black',linewidth=1)
    plt.axvline(0, color='black',linewidth=1)
    plt.gca().set_aspect('equal', adjustable='box')

    plt.title(f"Transformação Espacial Linear\nFator de Escala da Área: |det(A)| = {abs(det_A):.4f}", fontsize=12, fontweight='bold')
    plt.legend(loc='upper left')

    plt.savefig('assignments/submissions/40250131/03/python/determinante_area.png', dpi=300, bbox_inches='tight')
    plt.show()

if __name__ == "__main__":
    main()