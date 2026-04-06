import numpy as np

zeroMatrix3x4 = np.matrix([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]])
diagonalMatrix3x3 = np.matrix([[2, 0, 0], [0, 5, 0], [0, 0, -1]])
identityMatrix4x4 = np.matrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]])
upperTriangularMatrix3x3 = np.matrix([[1, 2, 3], [0, 4, 5], [0, 0, 6]])
lowerTriangularMatrix3x3 = np.matrix([[1, 0, 0], [2, 3, 0], [4, 5, 6]])
symmetricMatrix2x2 = np.matrix([[2, 5], [5, 8]])


print("Zero Matrix:")
print("número de linhas:", zeroMatrix3x4.shape[0]) # 3
print("número de colunas:", zeroMatrix3x4.shape[1]) # 4
print("Elemento a(2, 3):", zeroMatrix3x4[1, 2])
for x in zeroMatrix3x4:
    print(x)

print("\nDiagonal Matrix:")
print("número de linhas:", diagonalMatrix3x3.shape[0]) # 3
print("número de colunas:", diagonalMatrix3x3.shape[1]) # 3
print("Elemento a(2, 3): " + str(diagonalMatrix3x3[1, 2]))
for x in diagonalMatrix3x3:
    print(x)

print("\nIdentity Matrix:")
print("número de linhas:", identityMatrix4x4.shape[0]) # 4
print("número de colunas:", identityMatrix4x4.shape[1]) # 4
print("Elemento a(2, 3): " + str(identityMatrix4x4[1, 2])) 
for x in identityMatrix4x4:
    print(x)

print("\nUpper Triangular Matrix:")
print("número de linhas:", upperTriangularMatrix3x3.shape[0]) # 3
print("número de colunas:", upperTriangularMatrix3x3.shape[1]) # 3
print("Elemento a(2, 3): " + str(upperTriangularMatrix3x3[1, 2])) 
for x in upperTriangularMatrix3x3:
    print(x)

print("\nLower Triangular Matrix:")
print("número de linhas:", lowerTriangularMatrix3x3.shape[0]) # 3
print("número de colunas:", lowerTriangularMatrix3x3.shape[1]) # 3
print("Elemento a(2, 3): " + str(lowerTriangularMatrix3x3[1, 2])) 
for x in lowerTriangularMatrix3x3:
    print(x)

print("\nSymmetric Matrix:")
print("número de linhas:", symmetricMatrix2x2.shape[0]) # 2
print("número de colunas:", symmetricMatrix2x2.shape[1]) # 2
print("Elemento a(2, 2): " + str(symmetricMatrix2x2[1, 1])) 
for x in symmetricMatrix2x2:
    print(x)

def classificar_matriz(matriz):
    rows, cols = matriz.shape
    # Zero matrix
    if all(matriz[i, j] == 0 for i in range(rows) for j in range(cols)):
        return "Zero Matrix"
    # Only defined for square matrices
    if rows == cols:
        off_diag_zero = all(matriz[i, j] == 0 for i in range(rows) for j in range(cols) if i != j)
        diag_all_nonzero = all(matriz[i, i] != 0 for i in range(rows))
        diag_all_one = all(matriz[i, i] == 1 for i in range(rows))
        if off_diag_zero and diag_all_nonzero:
            return "Diagonal Matrix"
        if off_diag_zero and diag_all_one:
            return "Identity Matrix"
        # Lower triangular: elements above diagonal are zero
        if all(matriz[i, j] == 0 for i in range(rows) for j in range(i+1, cols)):
            return "Lower Triangular Matrix"
        # Upper triangular: elements below diagonal are zero
        if all(matriz[i, j] == 0 for i in range(rows) for j in range(0, i)):
            return "Upper Triangular Matrix"
        # Symmetric
        if all(matriz[i, j] == matriz[j, i] for i in range(rows) for j in range(cols)):
            return "Symmetric Matrix"
    return "Matriz não classificada"
    

# Testando a função de classificação
matrizes = [zeroMatrix3x4, diagonalMatrix3x3, identityMatrix4x4, upperTriangularMatrix3x3, lowerTriangularMatrix3x3, symmetricMatrix2x2]
for matriz in matrizes:
    print(f"\nClassificação da matriz: {classificar_matriz(matriz)}")


try:
    sumDiferentSizesMatrix = upperTriangularMatrix3x3 + identityMatrix4x4
    print(sumDiferentSizesMatrix)
except ValueError as e:
    print("Não é possível somar matrizes de tamanhos diferentes:", e)