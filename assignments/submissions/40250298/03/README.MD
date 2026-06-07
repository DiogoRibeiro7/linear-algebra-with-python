# Assignment 03 – Determinants and Invertibility

## Descrição

Este trabalho teve como objetivo praticar o cálculo de determinantes utilizando vários métodos, analisar a invertibilidade de matrizes e implementar algoritmos para obter a inversa. Também foi feita uma visualização geométrica para compreender o significado do determinante como fator de escala de área.

Foram utilizadas funções implementadas em Python e comparadas com os resultados do NumPy.



## T1 – Determinantes 2×2 e 3×3

Foram implementadas duas funções:

- determinante de matrizes 2×2 usando a fórmula direta  
- determinante de matrizes 3×3 usando a Regra de Sarrus  

Os resultados foram testados em matrizes invertíveis e singulares e comparados com `np.linalg.det()`.


## T2 – Determinante por Eliminação de Gauss

Foi criada uma função que calcula o determinante através da eliminação de Gauss.  
O algoritmo regista os passos intermédios e calcula o determinante como o produto dos pivots, ajustado por trocas de linhas.  
O método foi testado numa matriz 4×4.


## T3 – Verificação de Propriedades do Determinante

Foram verificadas computacionalmente as seguintes propriedades:

- det(AB) = det(A) det(B)  
- det(Aᵀ) = det(A)  
- det(kA) = kⁿ det(A)  
- trocar duas linhas muda o sinal do determinante  
- adicionar múltiplos de uma linha a outra não altera o determinante  

As verificações foram feitas com `np.isclose()` devido a pequenas diferenças numéricas.


## T4 – Invertibilidade e Número de Condição

Foi implementada a função `eh_invertivel(A)` que devolve:

- se a matriz é invertível  
- o determinante  
- o número de condição  

Foram testadas três matrizes: uma invertível, uma singular e uma mal condicionada.


## T5 – Inversa por Gauss‑Jordan

Foi implementado o método de Gauss‑Jordan para calcular a inversa através da matriz aumentada [A | I].  
As inversas obtidas foram verificadas multiplicando A · A⁻¹ e confirmando que o resultado é aproximadamente a identidade.


## T6 – Visualização da Transformação do Quadrado Unitário

Foi criada uma visualização que mostra como uma matriz 2×2 transforma o quadrado unitário num paralelogramo.  
O valor de |det(A)| aparece no título como fator de escala da área.  
A imagem foi guardada como **determinante_area.png**.


## T7 – Reflexão

Foi escrita uma reflexão sobre o significado geométrico do determinante e a relação entre det(A) = 0 e a não invertibilidade.

