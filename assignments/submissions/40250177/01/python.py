import numpy as np

def criar_matrizes():
    """
    T1: Criação de matrizes especiais conforme o enunciado.
    """
    # 3x4 zero matrix
    m_zero = np.zeros((3, 4))
    
    # 4x4 identity matrix
    m_identidade = np.eye(4)
    
    # 3x3 diagonal matrix com entradas [2, 5, -1]
    m_diagonal = np.diag([2, 5, -1])
    
    # Matriz base para as triangulares
    base = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    m_u_triangular = np.triu(base) # Upper
    m_l_triangular = np.tril(base) # Lower
    
    # Matriz Simétrica construída a partir de M + M.T
    M = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    m_simetrica = M + M.T
    
    return {
        "Zero (3x4)": m_zero,
        "Identidade (4x4)": m_identidade,
        "Diagonal (3x3)": m_diagonal,
        "Upper Triangular (3x3)": m_u_triangular,
        "Lower Triangular (3x3)": m_l_triangular,
        "Simétrica (3x3)": m_simetrica
    }

def classificar_matriz(A):
    """
    T3: Função que recebe uma matriz e retorna uma lista de labels (classificações).
    """
    labels = []
    r, c = A.shape
    
    # Formato básico
    if r == c:
        labels.append("square")
    else:
        labels.append("rectangular")
    
    # Verificação de matriz nula (zero)
    if np.allclose(A, 0):
        labels.append("zero")
    
    # Propriedades de matrizes quadradas
    if r == c:
        # Identidade
        if np.allclose(A, np.eye(r)):
            labels.append("identity")
        
        # Diagonal (todos os elementos fora da diagonal principal são zero)
        if np.allclose(A, np.diag(np.diag(A))):
            labels.append("diagonal")
            
        # Simétrica (A é igual à sua transposta)
        if np.allclose(A, A.T):
            labels.append("symmetric")
            
        # Triangular Superior (elementos abaixo da diagonal são zero)
        if np.allclose(A, np.triu(A)):
            labels.append("upper_triangular")
            
        # Triangular Inferior (elementos acima da diagonal são zero)
        if np.allclose(A, np.tril(A)):
            labels.append("lower_triangular")
            
    return labels

def executar_trabalho():
    # Obter o dicionário de matrizes da T1
    matrizes = criar_matrizes()
    
    print("="*50)
    print("TRABALHO COMPUTACIONAL - MATEMÁTICA II")
    print("="*50)

    for nome, m in matrizes.items():
        print(f"\n>>> ANALISANDO: {nome}")
        print(m)
        
        # T2: Dimensões e acesso ao elemento a_2,3 (index 2,3)
        rows, cols = m.shape
        print(f"Dimensões: {rows} x {cols}")
        
        try:
            # Tentar aceder ao elemento na linha index 2, coluna index 3
            valor = m[2, 3]
            print(f"Elemento a_2,3 (index [2,3]): {valor}")
            # Verificação lógica simples
            if valor == 0:
                print("Verificação: O valor 0 faz sentido nesta estrutura.")
        except IndexError:
            print("Elemento a_2,3 (index [2,3]): Não existe (dimensões insuficientes).")
            print("Verificação: Faz sentido, a matriz não tem 4 colunas.")

        # T3: Testar a função de classificação
        classificacoes = classificar_matriz(m)
        print(f"Classificações: {classificacoes}")

    # T4: Demonstração de Erros
    print("\n" + "="*50)
    print("T4: DEMONSTRAÇÃO DE ERROS DE DIMENSÃO")
    print("="*50)
    
    m2x3 = np.ones((2, 3))
    m4x2 = np.ones((4, 2))
    
    # Erro de Soma (Incompatível)
    try:
        print("\nTentando somar (2x3) com (4x2)...")
        soma = m2x3 + m4x2
    except ValueError as e:
        print(f"ERRO CAPTURADO: {e}")
        
    # Erro de Multiplicação (Inner dimensions mismatch)
    try:
        print("\nTentando multiplicar (2x3) por (4x2)...")
        # Multiplicação matricial (dot product) requer colunas de A == linhas de B
        produto = np.dot(m2x3, m4x2) 
    except ValueError as e:
        print(f"ERRO CAPTURADO: {e}")

if __name__ == "__main__":
    executar_trabalho()