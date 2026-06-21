# Reflexão — Assignment 01

A matriz identidade pertence simultaneamente a vários conjuntos de matrizes especiais. Em primeiro lugar, pertence ao conjunto das matrizes quadradas, porque tem o mesmo número de linhas e colunas. Também pertence ao conjunto das matrizes diagonais, pois todos os elementos fora da diagonal principal são iguais a zero.

Além disso, a matriz identidade pertence ao conjunto das matrizes simétricas, porque é igual à sua transposta. Isto acontece porque os valores acima e abaixo da diagonal principal são iguais. A identidade também pertence ao conjunto das matrizes triangulares superiores e inferiores, visto que todos os elementos abaixo e acima da diagonal principal são zero.

Usando linguagem de conjuntos, podemos dizer que a matriz identidade está na interseção entre os conjuntos das matrizes diagonais, simétricas, triangulares superiores e triangulares inferiores. Em Python, o NumPy facilita bastante estas verificações, usando funções como np.eye, np.diag, np.triu, np.tril e np.allclose. Estas funções tornam a classificação das matrizes mais simples e direta.
