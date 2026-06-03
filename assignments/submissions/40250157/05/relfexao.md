
# Reflexão

Ao realizar este trabalho, tive a oportunidade de comparar três métodos diferentes para resolver sistemas de equações lineares: a Regra de Cramer, a Eliminação de Gauss e a Decomposição LU. Apesar de todos permitirem obter a solução correta, percebi que existem diferenças importantes entre eles.

A Regra de Cramer foi a mais simples de compreender, porque se baseia diretamente no cálculo de determinantes. No entanto, também foi fácil perceber que não é um método eficiente para matrizes maiores. Nos testes realizados, o tempo de execução aumentou rapidamente com a dimensão do sistema, o que mostra que este método é mais adequado para exemplos pequenos e para fins de aprendizagem.

A Eliminação de Gauss revelou-se muito mais eficiente. Além de ser relativamente simples de implementar, conseguiu resolver sistemas maiores num tempo bastante reduzido. Foi também interessante perceber a importância da pivotação para evitar problemas numéricos e obter resultados mais estáveis.

A Decomposição LU foi o método que considerei mais interessante. Inicialmente parece mais complexa, mas tornou-se evidente a sua vantagem quando é necessário resolver vários sistemas com a mesma matriz e diferentes vetores de termos independentes. Depois de calcular a fatorização uma única vez, as soluções seguintes são obtidas de forma muito rápida.

De uma forma geral, concluo que a Regra de Cramer é útil para compreender os conceitos teóricos, enquanto a Eliminação de Gauss e a Decomposição LU são muito mais adequadas para aplicações práticas. Entre estas duas, a LU destaca-se quando a mesma matriz é utilizada repetidamente, permitindo poupar tempo de cálculo e melhorar a eficiência.
