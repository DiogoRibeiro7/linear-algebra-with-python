from dbm import error
import numpy as np
import scipy as sp
import matplotlib.pyplot as plt

# Create the following matrices: 

# a 3 × 4 zero matrix,

matrizNula = np.zeros((3, 4))
print("Matriz nula 3x4:" )
print(matrizNula, "\n")
print("tamanho da matriz:" )
print(matrizNula.shape, "\n")
print("elemento na posição a2,3:" )
print(matrizNula[1,2], "\n")  

# a 4 × 4 identity matrix, 

MatrizIdentidade = np.eye(4)
print("Matriz identidade 4x4:" )
print(MatrizIdentidade, "\n")
print("tamanho da matriz:" )
print(MatrizIdentidade.shape, "\n")
print("elemento na posição a2,3:" )
print(MatrizIdentidade[1,2], "\n")

# a 3 × 3 diagonal matrix with entries [2, 5, −1],

matrizDiagonal = np.diag([2, 5, -1])
print("Matriz diagonal 3x3 com entradas [2, 5, -1]:" )
print(matrizDiagonal, "\n")
print("tamanho da matriz:" )
print(matrizDiagonal.shape, "\n")
print("elemento na posição a2,3:" )
print(matrizDiagonal[1,2], "\n")

# an upper triangular 3 × 3 matrix, 

matrizTriangularSuperior = np.triu([[1, 2, 6], [8, 4, 9], [10, 9, 6]])
print("Matriz triangular superior 3x3:" )
print(matrizTriangularSuperior, "\n")
print("tamanho da matriz:" )
print(matrizTriangularSuperior.shape, "\n")
print("elemento na posição a2,3:" )
print(matrizTriangularSuperior[1,2], "\n")


# a lower triangular 3 × 3 matrix, 

matrizTriangularInferior = np.tril([[1, 2, 6], [8, 4, 9], [10, 9, 6]])
print("Matriz triangular inferior 3x3:" )
print(matrizTriangularInferior, "\n")
print("tamanho da matriz:" )
print(matrizTriangularInferior.shape, "\n")
print("elemento na posição a2,3:" )
print(matrizTriangularInferior[1,2], "\n")

# and a symmetric matrix built from M + M⊤ for a matrix M of your choice.

mMatriz = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
matrizSimetrica = mMatriz + mMatriz.T
print("Matriz simétrica 3x3:" )
print(matrizSimetrica, "\n")
print("tamanho da matriz:" )
print(matrizSimetrica.shape, "\n")
print("elemento na posição a2,3:" )
print(matrizSimetrica[1,2], "\n")

# For each matrix created in T1, print its dimensions (rows × columns)
# and the element at position a2,3 (row 2, column 3, using 0-based indexing)

# Write a function classificar_matriz(A)
# that receives a matrix and returns a list of labels from:
# square, rectangular, zero, identity, diagonal, symmetric,
# upper_triangular, lower_triangular.

def classificar_matriz(matriz):

    matriz = np.array(matriz)
    linhas, colunas = matriz.shape
    resultado = []

    if linhas == colunas:
        resultado.append("quadrática")
    else:
        resultado.append("retangular")

    if np.all(matriz == 0):
        resultado.append("Matriz nula")
    
    if linhas == colunas:

        diagonal = linhas
        if np.array_equal(matriz, np.eye(diagonal)):
            resultado.append("identidade")
        
        if np.array_equal(matriz, np.diag(np.diag(matriz))):
            resultado.append("diagonal")
            
        if np.array_equal(matriz, matriz.T):
            resultado.append("simetrica")
            
        if np.array_equal(matriz, np.triu(matriz)):
            resultado.append("triangular superior")
            
        if np.array_equal(matriz, np.tril(matriz)):
            resultado.append("triangular inferior")

    print(f"""
    {'-'*40}
    📌 ANÁLISE DA MATRIZ:
    {'-'*40}

    A Matriz:
    {matriz}

    Dimensões: {matriz.shape[0]} × {matriz.shape[1]}
    Classificação: {', '.join(resultado)}

    {'-'*40}
    """)

classificar_matriz(matrizNula)

classificar_matriz(MatrizIdentidade)

classificar_matriz(matrizDiagonal)

classificar_matriz(matrizTriangularSuperior)

classificar_matriz(matrizTriangularInferior)

classificar_matriz(matrizSimetrica)

print("Tentando somar matrizes de dimensões diferentes: \n")

try:
    resultadoSoma = matrizNula + MatrizIdentidade
except ValueError as errorSoma:
    print(f"Erro ao somar matrizes: {errorSoma}, \n")

print("Tentando multiplicar matrizes de dimensões diferentes: \n")

try:
    resultadoMultiplicacao = matrizNula @ matrizDiagonal
except ValueError as errorMultiplicacao:
    print(f"Erro ao multiplicar matrizes: {errorMultiplicacao}")