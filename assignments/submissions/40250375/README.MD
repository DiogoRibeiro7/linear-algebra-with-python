A matriz identidade é um bom exemplo de como uma mesma estrutura matemática pode encaixar em várias categorias ao mesmo tempo. Usando a linguagem da teoria dos conjuntos, podemos dizer que o conjunto das matrizes identidade está incluído na interseção de vários subconjuntos das matrizes quadradas. Ou seja, a matriz identidade pertence ao mesmo tempo aos conjuntos das matrizes diagonais, simétricas e triangulares (tanto superiores como inferiores).

Isto acontece porque, por definição, todos os elementos fora da diagonal principal são zero, o que faz dela uma matriz diagonal. E sempre que uma matriz é diagonal, acaba também por ser triangular superior e inferior, já que não há valores não nulos nem acima nem abaixo da diagonal.

Além disso, a matriz identidade é simétrica, porque é igual à sua transposta. Na prática, isto significa que trocar linhas por colunas não altera a matriz.

No fundo, podemos ver a matriz identidade como pertencente à interseção de vários conjuntos: diagonal, simétrica, triangular superior e triangular inferior. Isto mostra que estas classificações não são exclusivas — uma matriz pode ter várias propriedades ao mesmo tempo.

Quando fui implementar isto em JavaScript com a biblioteca math.js, deu para perceber que muitas destas propriedades precisam de ser verificadas manualmente, como testar se uma matriz é simétrica ou triangular. Já em Python, com o NumPy, existem funções mais diretas para esse tipo de operações. Mesmo assim, no essencial, ambas as ferramentas permitem trabalhar corretamente com estes conceitos matemáticos.
