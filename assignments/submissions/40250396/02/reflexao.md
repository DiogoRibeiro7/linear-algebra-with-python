A multiplicação de matrizes não é comutativa, ou seja, em geral AB != BA.
Isto é muito diferente da multiplicação de números normais onde 2 * 3 = 3 * 2.

Geometricamente, cada matriz representa uma transformação no espaço
(rotação, escala, reflexão, etc). A ordem importa porque aplicar
primeiro uma rotação e depois uma escala dá um resultado diferente
de aplicar primeiro a escala e depois a rotação.

O comutador [A, B] = AB - BA mede o quanto duas matrizes não comutam.
Se [A, B] = 0, as duas transformações são independentes da ordem.

Em Python usa-se o operador @ para multiplicar (A @ B),
enquanto em JavaScript é necessário implementar a função manualmente
pois JS não tem suporte nativo a operações matriciais.
