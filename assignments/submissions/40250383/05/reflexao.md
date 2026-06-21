# Reflexão

Neste trabalho explorei diferentes métodos para resolver sistemas lineares. Comecei por implementar a regra de Cramer para sistemas 2x2 e 3x3, verificando os resultados através da função solve do NumPy. Depois utilizei a decomposição LU para fatorizar matrizes e verificar a relação PA = LU.
Também realizei um pequeno benchmark para observar o tempo de execução do método utilizado pelo NumPy em matrizes de diferentes dimensões. Foi possível verificar que a resolução continua bastante rápida mesmo para matrizes maiores.
Por fim, utilizei a fatorização LU para resolver vários sistemas com a mesma matriz de coeficientes e visualizei as matrizes A, L e U através de heatmaps.

Este trabalho permitiu compreender melhor as vantagens da decomposição LU e a sua utilidade na resolução eficiente de sistemas lineares.