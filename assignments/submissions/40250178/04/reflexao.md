# Reflexão A04

O que ficou mais claro neste assignment foi a ligação entre o Teorema de Rouché-Capelli e a eliminação de Gauss. Na prática, depois de escalonar a matriz aumentada [A|b], basta contar as linhas não nulas de A e de [A|b] para saber o tipo de sistema — não é preciso calcular mais nada.

A parte do sistema impossível foi a que fez mais sentido geometricamente: duas equações com os mesmos coeficientes mas segundos membros diferentes são duas retas paralelas. Nunca se cruzam, logo não há solução. Em 3D seria dois planos paralelos.

A substituição retroativa também foi interessante de implementar — partimos da última linha (que já tem só uma incógnita) e vamos subindo, substituindo os valores já conhecidos. É exatamente o que fazemos à mão nos testes.

Quanto à comparação com o math.lusolve: os resultados são iguais para sistemas SPD, mas o solver lança erro em sistemas singulares em vez de identificar o tipo — para isso é preciso a análise de rank.
