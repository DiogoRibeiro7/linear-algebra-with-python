ex6

Comparando os métodos de acordo obtive as seguintes conclusões.

Complexidade: o método de Cramer requer o cálculo de determinantes
para cada incógnita; usando uma rotina de determinante baseada em
eliminação, cada determinante custa O(n^3), e como são necessários n
determinantes, o custo total tende a O(n^4) na prática, tornando
Cramer impraticável para matrizes de dimensão média/grande. A
eliminação de Gauss (com pivoteamento parcial) tem custo O(n^3)
para resolver um sistema e é a escolha padrão para sistemas únicos.
A fatoração LU também custa O(n^3) para fatorar, mas cada resolução
com um lado direito adicional custa apenas O(n^2), o que a torna
eficiente quando se resolvem várias instâncias com a mesma matriz A.

Casos de uso: Cramer é útil em contextos teóricos ou para dimensões
muito pequenas (n = 2, 3) ou quando se trabalha simbolicamente.
Eliminação de Gauss é simples e versátil para resolver sistemas
isolados. LU é preferível quando se vai reutilizar a fatoração
(várias b), para inversão aproximada de A ou para análises de sensibilidade.

Estabilidade: Cramer é numericamente frágil porque envolve
determinantes e cancelamentos; seus erros crescem em matrizes
mal condicionadas. Gauss com pivoteamento parcial geralmente é
estável na prática; a fatoração LU com pivoteamento (LUP) herda
essa robustez. Em suma: evite Cramer em problemas numéricos reais,
use Gauss/ LU com pivoteamento; prefira LU quando houver múltiplos
vetores de termo independente.


