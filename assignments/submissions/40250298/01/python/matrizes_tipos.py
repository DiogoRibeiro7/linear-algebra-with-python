import numpy as np

# T1: Create matrices

    #Matriz nula
matriz_nula = np.zeros((3, 4))
print("Matriz Nula:\n"+ str(matriz_nula))

    #Matriz identidade
matriz_identidade = np.eye(4)
print("Matriz Identidade:\n"+ str(matriz_identidade))

    #Matriz diagonal
matriz_diagonal = np.diag([2,-5,-1])
print("Matriz Diagonal:\n"+ str(matriz_diagonal))
    
    # Matriz triangular superior 3x3

matriz_triangular_superior = np.array(
    [[1,1,1],
     [0,1,1],
     [0,0,1]]
)
print("Matriz Triangular Superior:\n"+ str(matriz_triangular_superior))

    # Matriz triangular inferior 3x3
matriz_triangular_inferior = np.array(
    [[1,0,0],
     [1,1,0],
     [1,1,1]]
)
print("Matriz Triangular Inferior:\n"+ str(matriz_triangular_inferior))

    # Matriz simetrica (M = M^t)
matriz_normal = np.array(
    [[1,2,3],
     [2,4,5],
     [3,5,6]]
)
matriz_simetrica =  matriz_normal.T

print("Matriz Normal:\n"+ str(matriz_normal))
print("Matriz Simétrica:\n"+ str(matriz_simetrica))

#T2:values and dimensions

print("Dimensão da Matriz Nula:\n"+ str(matriz_nula.shape))
print("Dimensão da Matriz Identidade:\n"+ str(matriz_identidade.shape))
print("Dimensão da Matriz diagonal:\n"+ str(matriz_diagonal.shape))
print("Dimensão da Matriz Triangular Superior:\n"+ str(matriz_triangular_superior.shape))
print("Dimensão da Matriz Triangular Inferior:\n"+ str(matriz_triangular_inferior.shape))
print("Dimensão da Matriz Normal:\n"+ str(matriz_normal.shape))
print("Dimensão da Matriz simetrica:\n"+ str(matriz_simetrica.shape))
print("Valor do elemento (2,3) da Matriz Normal;\n"+ str(matriz_normal[1,2]))

#T3:Function code and test results
def classificar_matriz(a):
    tipos=[]
    linhas,colunas = a.shape
    if linhas == colunas:
        tipos.append("Quadrada")
        if np.allclose(a,a.T):
            tipos.append("Simétrica")
    else:
        tipos.append("Retangular")
    if np.allclose(a,0):
        tipos.append("Nula")
    if np.allclose(a,np.triu(a)):
        tipos.append("Triangular Superior")
    if np.allclose(a,np.tril(a)):
        tipos.append("Triangular Inferior")
    return tipos   
print("Classificação da Matriz:", classificar_matriz(matriz_diagonal))
print("Classificação da Matriz:", classificar_matriz(matriz_normal))
print("Classificação da Matriz:", classificar_matriz(matriz_nula))
print("Classificação da Matriz:", classificar_matriz(matriz_identidade))    
print("Classificação da Matriz:", classificar_matriz(matriz_triangular_superior))
print("Classificação da Matriz:", classificar_matriz(matriz_triangular_inferior))

#T4:Error messages with explanation

A1 = np.zeros((2, 3))
B1 = np.zeros((4, 2))

try:
    print(A1 + B1)
except ValueError as e:
    print("Erro na soma:", e)

# Tentativa de multiplicação com dimensões incompatíveis
try:
    print(np.dot(A1, B1))
except ValueError as e:
    print("Erro na multiplicação:", e)
