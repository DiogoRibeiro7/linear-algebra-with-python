# Assignment 03: Determinantes e Invertibilidade

# T1 - Determinantes Básicos
- Criação de duas funções que calculam o determinante através da fórmula (ad-bc) para matrizes 2x2 e da Regra de Sarrus para matrizes 3x3.
- Validação do return destas funções com a fórmula np.linalg.det(A).

# T2 - Eliminação Gaussiana
Implementação de uma função que calcula o determinante através do método de Gauss, retorna o determinante e os passos no fim.

# T3 - Verificação de Propriedades
Criação de duas matrizes 4x4 com elementos aleatórios e validação das seguintes propriedades:
- det(M1 * M2) = det(M1) * det(M2)
- det(M1.T) = det(M1)
- det(k * M1) = (k^n) * det(M1)
- Troca de linhas altera o sinal

# T4 - Análise de Invertibilidade
Implementação uma função que recebe uma matriz quadrada qualquer e calcula:
- O Determinante (det): Para verificar a invertibilidade (se for igual a 0, a matriz não é invertível).
- O Número de Condição (cond): Para medir a sensibilidade da matriz a erros de arredondamento.

# T5 - Inversa por Gauss-Jordan
Implementação uma função que calcula a inversa pelo método Gauss-Jordan.

# T6 - Visualização Geométrica da Transformação
Gráfico que demonstra o determinante como escala de área, definindo a transformação de um quadrado.