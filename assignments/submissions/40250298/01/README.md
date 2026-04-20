# Assignment 01 – Matrizes: Construção e Classificação

##  Descrição
Este trabalho tem como objetivo praticar a criação, análise e classificação de matrizes utilizando Python e a biblioteca NumPy.

Foram implementadas várias matrizes especiais, bem como funções para analisar as suas propriedades e lidar com erros em operações inválidas.

##  Tarefas Realizadas

###  T1 – Criação de Matrizes
Foram criadas as seguintes matrizes:

- Matriz nula (3x4)
- Matriz identidade (4x4)
- Matriz diagonal com valores [2, -5, -1]
- Matriz triangular superior (3x3)
- Matriz triangular inferior (3x3)
- Matriz simétrica (obtida a partir da transposta)

Todas as matrizes são apresentadas no terminal com identificação.


###  T2 – Dimensões e Elementos
Para cada matriz:

- Foi apresentada a sua dimensão (linhas × colunas)
- Foi acedido o elemento na posição (2,3) da matriz normal


###  T3 – Classificação de Matrizes
Foi implementada a função:
- classificar_matriz(a)

Esta função analisa a matriz e classifica-a como:

- Quadrada ou Retangular
- Nula
- Simétrica
- Triangular Superior
- Triangular Inferior

A função foi testada com todas as matrizes criadas.


###  T4 – Tratamento de Erros
Foram testadas operações inválidas:
- Soma de matrizes com dimensões diferentes
- Multiplicação de matrizes incompatíveis

Os erros foram tratados com try...except e apresentados no terminal.