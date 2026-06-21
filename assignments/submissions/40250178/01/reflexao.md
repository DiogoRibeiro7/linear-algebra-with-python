# Reflexão A01

Uma coisa que achei interessante neste assignment foi perceber porque é que a matriz identidade aparece em tantas classificações ao mesmo tempo. Faz sentido quando pensas bem: ela é diagonal porque só tem valores na diagonal principal, o que automaticamente faz com que seja também triangular superior e inferior (não há nada acima nem abaixo da diagonal). E como os elementos fora da diagonal são todos zero, a[i][j] = a[j][i] sempre, logo também é simétrica.

Basicamente a identidade está na interseção de quase todos os conjuntos de matrizes especiais ao mesmo tempo.

Quanto à diferença entre Python e JavaScript: em Python tens np.triu e np.tril que fazem a extração das partes triangulares diretamente, mas em JS tive de fazer isso manualmente com ciclos. Não é difícil mas dá mais trabalho. A parte das comparações de floats também é mais chata em JS porque não há nenhum allclose, tive de usar um epsilon manualmente.
