import numpy as np

def escalonar(Ab):
    """
    Executa a eliminação gaussiana numa matriz ampliada com pivotação parcial.
    Retorna a matriz escalonada e imprime o log das operações efetuadas.
    """
    Ab = np.array(Ab, dtype=float)
    n, m = Ab.shape

    print("\n--- Início do Escalonamento ---")
    for i in range(n):
        # Encontrar a linha com o maior pivô absoluto na coluna atual
        max_row = np.argmax(np.abs(Ab[i:n, i])) + i
        
        # Se o maior elemento for nulo, saltar a coluna (variável livre ou contradição)
        if np.abs(Ab[max_row, i]) < 1e-9:
            continue
            
        # Troca de linhas se necessário (pivotação parcial)
        if max_row != i:
            Ab[[i, max_row]] = Ab[[max_row, i]]
            print(f"Linha {i} trocada com Linha {max_row}")
            
        # Eliminação para as linhas abaixo
        for j in range(i + 1, n):
            factor = Ab[j, i] / Ab[i, i]
            if np.abs(factor) > 1e-9:
                Ab[j, i:] -= factor * Ab[i, i:]
                print(f"Linha {j} <- Linha {j} - ({factor:.4f}) * Linha {i}")
    
    print("Matriz resultante em forma escalonada:")
    print(np.round(Ab, 4))
    return Ab

def substituicao_retroativa(U, b):
    """
    Resolve um sistema triangular superior Ux = b (para sistemas SPD).
    """
    n = len(b)
    x = np.zeros(n)
    
    for i in range(n - 1, -1, -1):
        if np.abs(U[i, i]) < 1e-9:
            raise ValueError("A matriz possui um zero na diagonal. Não é possível efetuar a substituição direta.")
        
        soma = np.dot(U[i, i+1:], x[i+1:])
        x[i] = (b[i] - soma) / U[i, i]
        
    return x

def classificar_sistema(A, b):
    """
    T4: Classifica o sistema recorrendo ao Teorema de Rouché-Capelli.
    Retorna 'SPD', 'SPI' ou 'SI'.
    """
    A = np.array(A, dtype=float)
    b = np.array(b, dtype=float)
    Ab = np.column_stack((A, b))
    
    posto_A = np.linalg.matrix_rank(A)
    posto_Ab = np.linalg.matrix_rank(Ab)
    n = A.shape[1] # Número de incógnitas
    
    if posto_A < posto_Ab:
        return 'SI'
    else:
        if posto_A == n:
            return 'SPD'
        else:
            return 'SPI'

def main():
    # =========================================================================
    # T1 - Sistema Determinado (SPD)
    # =========================================================================
    print("=================================================================")
    print("T1 - RESOLUÇÃO DE SISTEMA SPD")
    print("=================================================================")
    A_spd = np.array([[2, 1, -1],
                      [-3, -1, 2],
                      [-2, 1, 2]], dtype=float)
    b_spd = np.array([8, -11, -3], dtype=float)

    Ab_spd = np.column_stack((A_spd, b_spd))
    Ab_spd_esc = escalonar(Ab_spd)
    
    U_spd = Ab_spd_esc[:, :-1]
    b_spd_red = Ab_spd_esc[:, -1]
    
    solucao_spd = substituicao_retroativa(U_spd, b_spd_red)
    print("\nSolução do sistema T1 [x, y, z]:", np.round(solucao_spd, 4))

    # =========================================================================
    # T2 - Sistema Indeterminado (SPI)
    # =========================================================================
    print("\n=================================================================")
    print("T2 - SISTEMA INDETERMINADO (SPI)")
    print("=================================================================")
    # Segunda linha é um múltiplo exato da primeira
    A_spi = np.array([[1, -2, 1],
                      [2, -4, 2],
                      [1, 1, -1]], dtype=float)
    b_spi = np.array([3, 6, 3], dtype=float)
    
    Ab_spi = np.column_stack((A_spi, b_spi))
    Ab_spi_esc = escalonar(Ab_spi)
    
    print("\nDemonstração de Soluções Particulares (Variável Livre z):")
    # Solução geral paramétrica calculada à mão e aplicada:
    # Da Linha 2 (pós-escalonamento): 3y - 2z = 0 => y = (2/3)z
    # Da Linha 1: x = 3 + 2y - z = 3 + 4/3z - z = 3 + (1/3)z
    valores_z = [0, 3, -3]
    for z in valores_z:
        x = 3 + (1/3) * z
        y = (2/3) * z
        print(f"Para z = {z:2d} -> Solução Particular: [x={x:.2f}, y={y:.2f}, z={z:.2f}]")

    # =========================================================================
    # T3 - Sistema Impossível (SI)
    # =========================================================================
    print("\n=================================================================")
    print("T3 - SISTEMA IMPOSSÍVEL (SI)")
    print("=================================================================")
    # Mesma combinação à esquerda, mas com termos independentes contraditórios
    A_si = np.array([[1, -2, 1],
                     [2, -4, 2],
                     [3, -6, 3]], dtype=float)
    b_si = np.array([2, 5, 9], dtype=float)
    
    Ab_si = np.column_stack((A_si, b_si))
    _ = escalonar(Ab_si)
    print("\nNota Geométrica: Os planos são paralelos e não se intersetam em simultâneo,")
    print("gerando uma linha na matriz escalonada com a forma [0, 0, 0 | b] onde b != 0.")

    # =========================================================================
    # T4 - Classificação Automatizada (Teorema de Rouché-Capelli)
    # =========================================================================
    print("\n=================================================================")
    print("T4 - TESTE DA FUNÇÃO DE CLASSIFICAÇÃO")
    print("=================================================================")
    sistemas = [
        ("Sist. 1 (T1 SPD 3x3)", A_spd, b_spd),
        ("Sist. 2 (T2 SPI 3x3)", A_spi, b_spi),
        ("Sist. 3 (T3 SI  3x3)", A_si, b_si),
        ("Sist. 4 (2x2 Determinado)", [[1, 2], [3, 4]], [5, 11]),
        ("Sist. 5 (4x4 Determinado)", np.eye(4), [1, 2, 3, 4])
    ]
    
    print(f"{'Nome do Sistema':<25} | {'Classificação':<12}")
    print("-" * 43)
    for nome, A, b in sistemas:
        classe = classificar_sistema(A, b)
        print(f"{nome:<25} | {classe:<12}")

    # =========================================================================
    # T5 - SPI com 3 Incógnitas e 2 Equações (Subdeterminado)
    # =========================================================================
    print("\n=================================================================")
    print("T5 - SPI (3 INCÓGNITAS, 2 EQUAÇÕES)")
    print("=================================================================")
    A_sub = np.array([[1, 1, 1],
                      [0, 1, -2]], dtype=float)
    b_sub = np.array([6, 1], dtype=float)
    
    Ab_sub = np.column_stack((A_sub, b_sub))
    _ = escalonar(Ab_sub)
    print("\nSolução Geral Paramétrica:")
    print("  z é a variável livre (parâmetro t)")
    print("  y = 1 + 2t")
    print("  x = 6 - y - z = 6 - (1 + 2t) - t = 5 - 3t")
    
    # Testando com t = 1 => [x=2, y=3, z=1]
    t = 1
    x_p, y_p, z_p = 5 - 3*t, 1 + 2*t, t
    print(f"Verificação para t={t}: [x={x_p}, y={y_p}, z={z_p}]")
    print("Substituição na Eq1:", x_p + y_p + z_p, " (Esperado: 6)")
    print("Substituição na Eq2:", y_p - 2*z_p, " (Esperado: 1)")

    # =========================================================================
    # T6 - Comparação com o Solver do NumPy (np.linalg.solve)
    # =========================================================================
    print("\n=================================================================")
    print("T6 - COMPARAÇÃO COM SOLVER NATIVO (NUMPY)")
    print("=================================================================")
    # Comparação no sistema SPD
    sol_numpy = np.linalg.solve(A_spd, b_spd)
    print("Solução do nosso método (Gauss):", np.round(solucao_spd, 4))
    print("Solução do NumPy (linalg.solve):", np.round(sol_numpy, 4))
    print("Os resultados são idênticos?", np.allclose(solucao_spd, sol_numpy))
    
    # Demonstração do comportamento com matriz singular (SPI)
    print("\nTentativa de executar np.linalg.solve() numa matriz singular (SPI):")
    try:
        np.linalg.solve(A_spi, b_spi)
    except np.linalg.LinAlgError as e:
        print(f"Erro capturado com sucesso! Tipo: LinAlgError | Mensagem: {e}")

if __name__ == "__main__":
    main()