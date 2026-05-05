import numpy as np

def resolver_tarefas():
    # --- T1: Operações Básicas ---
    print("--- T1: Somas e Subtrações ---")
    A = np.array([[1, 2, 3], [4, 5, 6]])
    B = np.array([[7, 8, 9], [10, 11, 12]])
    
    soma = A + B
    subtracao = A - B
    escalar = 3 * A
    
    print(f"A+B:\n{soma}\nSoma preserva dimensões? {soma.shape == A.shape}")
    print(f"3A:\n{escalar}")

    # --- T2: Dimensões Incompatíveis ---
    print("\n--- T2: Não-comutatividade de Dimensões ---")
    C = np.array([[1, 2], [3, 4], [5, 6]]) # 3x2
    AC = A @ C # (2x3) * (3x2) -> 2x2
    print(f"A @ C (2x2):\n{AC}")
    try:
        CA = C @ A # (3x2) * (2x3) -> 3x3
        print(f"C @ A (3x3):\n{CA}")
        print("São diferentes porque as dimensões resultantes não coincidem.")
    except ValueError as e:
        print(f"Erro no produto CA: {e}")

    # --- T3: Comutador [P, Q] ---
    print("\n--- T3: Comutador [P, Q] ---")
    P = np.array([[1, 2], [3, 4]])
    Q = np.array([[5, 6], [7, 8]])
    PQ = P @ Q
    QP = Q @ P
    comutador = PQ - QP
    I = np.eye(2)
    
    print(f"PQ == QP? {np.allclose(PQ, QP)}")
    print(f"Comutador [P,Q]:\n{comutador}")
    print(f"PI == P? {np.allclose(P @ I, P)}")

    # --- T4: Propriedades da Transposta ---
    print("\n--- T4: Propriedades da Transposta ---")
    # (A+B)T = AT + BT
    prop_b = np.allclose((A + B).T, A.T + B.T)
    # (AC)T = CT @ AT
    prop_c = np.allclose((A @ C).T, C.T @ A.T)
    print(f"(A+B)T == AT + BT: {prop_b}")
    print(f"(AC)T == CT @ AT: {prop_c}")

    # --- T5: Combinação Linear ---
    print("\n--- T5: Combinação Linear Ax ---")
    M_rand = np.random.randint(1, 10, (3, 3))
    S = M_rand + M_rand.T # Construir simétrica
    
    sys_A = np.array([[1, 2, 3], [0, 1, 4], [5, 6, 0]])
    x = np.array([1, 2, 3])
    Ax = sys_A @ x
    
    # Verificação: x1*a1 + x2*a2 + x3*a3
    comb_linear = x[0]*sys_A[:,0] + x[1]*sys_A[:,1] + x[2]*sys_A[:,2]
    print(f"Ax: {Ax}")
    print(f"Combinação Linear de Colunas: {comb_linear}")
    print(f"Ax é igual à combinação linear? {np.allclose(Ax, comb_linear)}")

if __name__ == "__main__":
    resolver_tarefas()