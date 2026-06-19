# Reflexão A05

O que mais me surpreendeu neste assignment foi ver na prática a diferença de desempenho entre a Regra de Cramer e o LU. Para n=2 ou n=3 funciona bem, mas a partir de n=10 o Cramer torna-se impraticável porque precisa de calcular um determinante por variável, e o cálculo de determinantes é pesado.

A decomposição LU faz sentido do ponto de vista prático: pagas o custo da fatorização uma vez e depois resolver para vários vetores b fica muito mais barato. Isto é útil por exemplo em simulações onde a matriz não muda mas os segundos membros variam.

Uma coisa que não sabia era que o determinante pode ser lido diretamente da diagonal de U (com atenção ao sinal das trocas de pivot). Achei isso bastante elegante.

Em JavaScript não há uma função direta equivalente ao scipy.linalg.lu_factor do Python, mas o math.lup() faz o mesmo. A sintaxe é diferente mas o resultado é o mesmo.
