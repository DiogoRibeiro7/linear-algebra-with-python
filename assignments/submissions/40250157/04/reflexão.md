
# Reflexão

O teorema de Rouché-Capelli é um resultado fundamental da Álgebra Linear que permite classificar sistemas de equações lineares através da comparação entre o posto da matriz dos coeficientes e o posto da matriz aumentada. Segundo este teorema, um sistema é possível se os dois postos forem iguais. Quando esse valor também é igual ao número de incógnitas, o sistema possui uma solução única (SPD). Quando os postos são iguais, mas menores que o número de incógnitas, o sistema possui infinitas soluções (SPI). Por outro lado, se o posto da matriz aumentada for maior do que o posto da matriz dos coeficientes, o sistema é impossível (SI), não possuindo qualquer solução.

A eliminação gaussiana está diretamente relacionada com este teorema, pois é um método que transforma a matriz aumentada do sistema numa forma escalonada através de operações elementares de linha. Esta forma facilita a determinação do posto das matrizes e permite identificar rapidamente a existência de pivôs, variáveis livres ou contradições.

Durante a realização deste trabalho, foi possível observar na prática os três tipos de sistemas. Nos sistemas SPD, a eliminação gaussiana conduz a uma matriz triangular que permite obter uma solução única através da substituição retroativa. Nos sistemas SPI, surgem linhas nulas que revelam a existência de variáveis livres e de soluções paramétricas. Já nos sistemas SI, aparece uma linha do tipo 0 = c, com c diferente de zero, evidenciando uma contradição e a inexistência de solução.

Assim, a eliminação gaussiana fornece uma forma computacional eficiente de aplicar o teorema de Rouché-Capelli e compreender a estrutura dos sistemas lineares.
