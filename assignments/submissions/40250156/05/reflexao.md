# Reflexão — Assignment 05

A Regra de Cramer, a eliminação de Gauss e a decomposição LU são métodos distintos para resolver sistemas lineares, apresentando vantagens e limitações próprias.

A Regra de Cramer é simples e elegante do ponto de vista teórico, mas possui um custo computacional elevado, tornando-se impraticável para matrizes de grandes dimensões. Por este motivo, a sua utilização limita-se geralmente a sistemas pequenos.

A eliminação de Gauss é um método mais eficiente e amplamente utilizado, permitindo obter soluções de forma sistemática através da redução da matriz a uma forma escalonada.

A decomposição LU separa a matriz original no produto de uma matriz triangular inferior e de uma matriz triangular superior. Embora exista um custo inicial associado à fatorização, este método é particularmente vantajoso quando é necessário resolver vários sistemas com a mesma matriz dos coeficientes e diferentes vetores independentes.

Os testes realizados demonstram que, à medida que a dimensão da matriz aumenta, os métodos baseados em fatorizações matriciais tornam-se significativamente mais rápidos e eficientes do que a Regra de Cramer.

Além disso, a decomposição LU apresenta maior estabilidade numérica e constitui a base de muitos algoritmos utilizados em aplicações científicas e de engenharia.
