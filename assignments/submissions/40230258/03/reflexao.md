7.Write reflexao.md (200 to 300 words) explaining the geometric
meaning of the determinant and why det(A) = 0 implies non-
invertibility.

O significado geométrico do determinante é o fator de escala de volume (ou área) de uma transformação linear. Ele mede o quanto uma transformação (matriz) altera o volume de um corpo geométrico: o valor absoluto representa a área (no caso de matrizes 2x2) ou volume (3x3), etc gerado pelos vetores coluna/linha, enquanto o sinal indica a orientação.

-se det(A) > 0, A transformação preserva a orientação (o "lado" que os vetores estão);

-se det(A) < 0, A transformação inverte a orientação (como um espelho).

-se det(A) = 0, A transformação comprime o objeto, resultando em volume zero. Isso indica que os vetores são linearmente dependentes (colineares ou coplanares).

Uma das razões que det(A) = 0 implica não invertibilidade é essa, não ddá para inverter algo que não tem volume.
No caso de um sistema, o determinante ser 0, implica que não alguma das linhas traz informação nova, não tendo solução ou sendo impossível, logo, não nos permite tirar uma conclusão, sendo impossível desfazer a transformação.

O mesmo linearmente, dado que pelo menos uma das linhas é dependente de outra, há uma repetição de informação que não nos permite tirar conclusões.

Mesmo de acordo com a formula da inversa A^(−1)=1/det(A)​⋅adj(A), se det(A) = 0, teremos de dividir por 0.
