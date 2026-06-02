import numpy as np

# Task 1
print("\nTarefa 1")

# Matriz de zeros (3x4)
zero_matrix = np.zeros((3, 4))

# Matriz identidade (4x4)
identity_matrix = np.eye(4)

# Matriz diagonal (3x3) com os valores 2, 5 e -1
diagonal_matrix = np.diag([2, 5, -1])

# Matriz triangular superior (3x3)
upper_triangular = np.array([
    [3, 1, 6],
    [0, 2, 9],
    [0, 0, 9]
], dtype=float)

# Matriz triangular inferior (3x3)
lower_triangular = np.array([
    [3, 0, 0],
    [6, 2, 0],
    [7, 7, 9]
], dtype=float)


# Matriz simétrica, a partir da fórmula M + M^T
M = np.array ([
    [3, 1, 6],    
    [6, 2, 9],
    [7, 7, 9]
], dtype=float)

symmetric_matrix = M + M.T


print("Matriz de Zeros:")
print(zero_matrix)

print("\nMatriz Identidade:")
print(identity_matrix)

print("\nMatriz Diagonal:")
print(diagonal_matrix)

print("\nMatriz Triangular Superior:")
print(upper_triangular)

print("\nMatriz Triangular Inferior:")
print(lower_triangular)

print("\nMatriz Simétrica (M + M^T):")
print(symmetric_matrix)



# Task 2
print("\nTarefa 2")

print("\nMatriz de Zeros:")
print(f"Dimensões: {zero_matrix.shape[0]} x  {zero_matrix.shape[1]}")
print(f"a23 = {zero_matrix[1, 2]}")

print("\nMatriz Identidade:")
print(f"Dimensões: {identity_matrix.shape[0]} x  {identity_matrix.shape[1]}")
print(f"a23 = {identity_matrix[1, 2]}")

print("\nMatriz Diagonal:")
print(f"Dimensões: {diagonal_matrix.shape[0]} x  {diagonal_matrix.shape[1]}")
print(f"a23 = {diagonal_matrix[1, 2]}")

print("\nMatriz Triangular Superior:")
print(f"Dimensões: {upper_triangular.shape[0]} x  {upper_triangular.shape[1]}")
print(f"a23 = {upper_triangular[1, 2]}")

print("\nMatriz Triangular Inferior:")
print(f"Dimensões: {lower_triangular.shape[0]} x  {lower_triangular.shape[1]}")
print(f"a23 = {lower_triangular[1, 2]}")

print("\nMatriz Simétrica:")
print(f"Dimensões: {symmetric_matrix.shape[0]} x  {symmetric_matrix.shape[1]}")
print(f"a23 = {symmetric_matrix[1, 2]}")



# Task 3
print("\nTarefa 3")

def classificar_matriz(A):
    classificacoes = []
    linhas, colunas = A.shape

    # Quadrada e Retangular
    if linhas == colunas:
        classificacoes.append("quadrada")
    else:
        classificacoes.append("retangular")

    # Nula
    if np.all(A == 0):
        classificacoes.append("nula")

    # Identidade
    if linhas == colunas and np.allclose(A, np.eye(linhas)):
        classificacoes.append("identidade")

    # Diagonal
    if linhas == colunas and np.allclose(A, np.diag(np.diag(A))):
        classificacoes.append("diagonal")

    # Triangular Superior
    if linhas == colunas and np.allclose(A, np.triu(A)):
        classificacoes.append("triangular_superior")    

    # Triangular Inferior
    if linhas == colunas and np.allclose(A, np.tril(A)):
        classificacoes.append("triangular_inferior")    

    return classificacoes

print(f"Matriz de Zeros: {classificar_matriz(zero_matrix)}")

print(f"Matriz Identidade: {classificar_matriz(identity_matrix)}")

print(f"Matriz Diagonal: {classificar_matriz(diagonal_matrix)}")

print(f"Matriz Triangular Superior: {classificar_matriz(upper_triangular)}")

print(f"Matriz Triangular Inferior: {classificar_matriz(lower_triangular)}")

print(f"Matriz Simétrica (M + M^T): {classificar_matriz(symmetric_matrix)}")



# Task 4
print("\nTarefa 4")

# Soma de matrizes incompatíveis
A = np.ones((6, 2))
B = np.ones((3, 5))

try:
    resultado = A + B
except ValueError as erro:
    print("Erro ao somar matrizes incompatíveis:")
    print(erro)

# Multiplicação de matrizes incompatíveis
    C = np.ones((2, 7))
    D = np.ones((4, 3))

try:
    resultado = C @ D
except ValueError as erro:
    print("\nErro ao multiplicar matrizes incompatíveis:")
    print(erro)