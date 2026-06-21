# Assignment 02 – Matrix Operations and Property Verification

## Descrição

Este trabalho teve como objetivo praticar operações matriciais utilizando Python e a biblioteca NumPy, bem como verificar propriedades importantes da álgebra matricial.

Foram realizadas operações entre matrizes, produtos matriciais, verificações de propriedades da transposta e demonstrações da não comutatividade da multiplicação de matrizes.

---

## Tarefas Realizadas

### T1 – Operações Básicas com Matrizes

Foram definidas duas matrizes 2×3, A e B.

Com essas matrizes foram realizadas as seguintes operações:

* Soma de matrizes (A + B)
* Subtração de matrizes (A − B)
* Multiplicação escalar (3A)

Também foi utilizada uma verificação para confirmar que a soma preserva as dimensões das matrizes.

---

## T2 – Produtos Matriciais

Foi definida uma matriz C de dimensão 3×2.

Foram calculados os produtos:

* AC (2×3 · 3×2)
* CA (3×2 · 2×3)

Os resultados foram apresentados juntamente com as respetivas dimensões, demonstrando que a multiplicação de matrizes depende da ordem das operações.

---

## T3 – Não Comutatividade e Comutador

Foram utilizadas duas matrizes quadradas P e Q para calcular:

* PQ
* QP
* O comutador [P,Q] = PQ − QP

Os resultados mostraram que, em geral, PQ ≠ QP.

Também foi verificada a propriedade da matriz identidade:

* PI = IP = P

---

## T4 – Propriedades da Transposta

Foram verificadas computacionalmente as seguintes propriedades:

* (Aᵀ)ᵀ = A
* (A + B)ᵀ = Aᵀ + Bᵀ
* (AC)ᵀ = CᵀAᵀ

As verificações foram realizadas utilizando `np.allclose()` para garantir comparações corretas entre valores numéricos.

---

## T5 – Matrizes Simétricas e Combinação Linear

Foi gerada uma matriz aleatória M e construída a matriz:

* S = M + Mᵀ

Posteriormente foi verificado que S é simétrica.

Também foi demonstrado que o produto matriz-vetor Ax pode ser interpretado como uma combinação linear das colunas da matriz A.

---

## Conclusão

Este assignment permitiu aprofundar o conhecimento sobre operações matriciais e propriedades fundamentais da álgebra linear. A utilização do NumPy tornou os cálculos mais simples e ajudou a compreender melhor a relação entre os conceitos matemáticos e a sua implementação computacional.