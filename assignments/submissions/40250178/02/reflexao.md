# Reflexão A02

A parte que me fez mais sentido neste assignment foi perceber porque é que a multiplicação de matrizes não é comutativa. Em números normais 3*5 = 5*3, mas com matrizes PQ e QP dão resultados completamente diferentes, e às vezes nem têm as mesmas dimensões para comparar.

Geometricamente faz sentido: aplicar primeiro uma rotação e depois uma projeção não é a mesma coisa que fazer o contrário. A ordem importa porque cada matriz transforma o espaço de uma maneira diferente.

A parte da combinação linear de Ax também foi interessante. No fundo Ax não é só "multiplicar", é uma combinação dos vetores coluna de A pesados pelos elementos de x. Ajuda a perceber o que uma matriz realmente faz a um vetor.

Em termos de linguagem, o JavaScript com math.js obriga a ser mais explícito: para aceder a colunas uso math.column(), e para comparar floats tenho de usar math.round com epsilon manualmente. Em Python seria mais direto com @ e np.allclose, mas no fundo fazem a mesma coisa.
