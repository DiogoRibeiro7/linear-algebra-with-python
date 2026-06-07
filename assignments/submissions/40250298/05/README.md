# Assignment 05 – Regra de Cramer e Decomposição LU

## Descrição

Este trabalho tem como objetivo comparar diferentes métodos de resolução de sistemas de equações lineares, nomeadamente a Regra de Cramer, a eliminação de Gauss (via `numpy.linalg.solve`) e a decomposição LU.

Foi também analisada a eficiência computacional de cada método, especialmente quando existem vários vetores independentes (multiple right-hand sides).

---

## Tarefas Realizadas

### T1 – Regra de Cramer

Foram implementadas as funções:

- `cramer_2x2(A, b)`
- `cramer_3x3(A, b)`

Estas funções resolvem sistemas lineares utilizando determinantes, substituindo colunas da matriz A pelo vetor b.

Os resultados foram comparados com o método `numpy.linalg.solve` para verificação.

---

### T2 – Decomposição LU

Foi implementada a decomposição LU manualmente:

- `lu_decomposition(A)`
- `lu_solve(A, b)`

A matriz A foi decomposta em:
- P (permutação)
- L (matriz triangular inferior)
- U (matriz triangular superior)

Foi verificado que PA = LU.

Também foi calculado o determinante de A através da diagonal de U.

---

### T3 – Benchmark dos métodos

Foram comparados os tempos de execução dos métodos:
- Cramer
- Gauss (numpy)
- LU

para diferentes tamanhos de matriz (2, 3, 5, 10, 20, 50).

Os resultados foram apresentados num gráfico para análise visual.

---

### T4 – Múltiplos vetores b

Foi testada a eficiência da decomposição LU quando aplicada a vários vetores b diferentes.

Em vez de recalcular a decomposição várias vezes, foi usada a mesma fatorização para resolver múltiplos sistemas, reduzindo o custo computacional.

---

### T5 – Visualização (Heatmap)

Foi criada uma visualização das matrizes:

- A
- L
- U

utilizando heatmaps com matplotlib para observar a estrutura das matrizes.

---

## Conclusão

Este trabalho permitiu comparar diferentes métodos de resolução de sistemas lineares.

Foi possível concluir que:
- O método de Cramer é simples mas pouco eficiente
- A eliminação de Gauss é mais eficiente para sistemas gerais
- A decomposição LU é a mais eficiente quando existem vários sistemas com a mesma matriz A

A análise experimental confirmou a importância da escolha do método dependendo do tipo de problema.