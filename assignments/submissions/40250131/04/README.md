# Assignment 04: Sistemas Lineares - Eliminação Gaussiana e Classificação

# T1 - Algoritmo de Eliminação Gaussiana e Resolução Retroativa
- Implementação da função `escalonar(Ab)`, incorporando a pivotação parcial (procura do maior elemento absoluto na coluna de trabalho).
- Implementação da função `substituicao_retroativa(U, b)` encarregue de resolver sistemas triangulares superiores obtidos no escalonamento.
- Validação completa através da resolução passo a passo do sistema linear proposto.

# T2 - Sistemas Possíveis Indeterminados (SPI)
- Construção intencional de um sistema no qual a segunda linha é definida diretamente como um múltiplo linear da primeira linha.
- Demonstração visual de como a forma escalonada expõe a existência de uma variável livre (anulação completa de uma linha na matriz de coeficientes).
- Dedução da solução geral paramétrica e extração de três soluções particulares distintas através da atribuição de diferentes valores ao parâmetro livre.

# T3 - Sistemas Impossíveis (SI)
- Construção de um sistema com contradição linear evidente em que os coeficientes do plano dão origem a combinações lineares idênticas, mas os termos independentes impossibilitam a interseção.
- Evidência da linha de contradição obtida após o escalonamento.
- Explicação geométrica sobre a disposição espacial dos planos no espaço tridimensional.

# T4 - Classificação Automatizada (Rouché-Capelli)
- Desenvolvimento da função genérica `classificar_sistema(A, b)` baseada no cálculo e comparação da matriz simples e da matriz ampliada.
- Retorno estrito das tags de classificação: `'SPD'` (Sistema Possível Determinado), `'SPI'` (Sistema Possível Indeterminado) ou `'SI'` (Sistema Impossível).
- Criação de uma tabela comparativa testando, no mínimo, 5 sistemas distintos de dimensões variadas.

# T5 - Sistemas Subdeterminados
- Modelação de um sistema retangular com 3 incógnitas e apenas 2 equações lineares.
- Resolução e cálculo da solução paramétrica geral definindo uma variável livre como base de expansão para o conjunto solução.
- Teste e verificação algébrica pontual da validade de uma solução particular nas equações originais.

# T6 - Validação com Solver Nativo (NumPy)
- Confronto direto dos resultados numéricos da função de substituição retroativa contra o método nativo `np.linalg.solve(A, b)`.
- Implementação de um bloco seguro de tratamento de exceções (`try/except`).