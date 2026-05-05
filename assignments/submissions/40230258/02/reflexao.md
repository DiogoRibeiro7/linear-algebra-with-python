6:Write a reflexao.md (150-250 words) explaining the geometric
or algebraic significance of non-commutativity in matrix mul-
tiplication. Compare how the two languages express these op-
erations

A multiplicação de matrizes em geral não é comutativa: isto é, A·B pode ser diferente de B·A. Geometricamente, isso significa que aplicar a transformação associada a A antes da transformação associada a B pode produzir um resultado diferente de aplicar B antes de A. Por exemplo, duas rotações no plano em torno de eixos diferentes ou a composição de uma rotação e uma dilatação não necessariamente comutam. A ordem em que as transformações são aplicadas importa e altera o vetor final.

Algébricamente e geometricamente, essa propriedade é importante porque as matrizes representam operadores lineares, e operadores lineares compõem-se seguindo a ordem de aplicação. Quando A e B não comutam, a diferença A·B − B·A revela a existência de uma “não compatibilidade” entre as transformações. Em física, isso aparece em rotações tridimensionais e no cálculo de momentos angulares. No contexto de sistemas lineares, o fato de A·B ≠ B·A também mostra que não podemos sempre rearranjar fatores livremente, como fazemos com números reais.

Portanto, a não comutatividade das matrizes destaca que a multiplicação de transformações depende da sequência de operações. Esse conceito é central para entender transformações geométricas, mudanças de base e estruturas algébricas mais avançadas, como álgebras de Lie, onde o comutador [A,B] = A·B − B·A mede exatamente essa diferença.

Dado que apenas fiz a track de javascript, não consigo comparar as duas linguagens.