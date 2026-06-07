# Assignment 04 – Sistemas Lineares: Eliminação de Gauss e Classificação

## Descrição

Este trabalho tem como objetivo resolver e classificar sistemas de equações lineares utilizando o método da eliminação de Gauss com pivotamento parcial, substituição retroativa e o teorema de Rouché–Capelli.

Foram também implementadas funções para classificação de sistemas (SPD, SPI, SI), verificação de resultados com NumPy e visualização geométrica dos sistemas.

---

## Tarefas Realizadas

### T1 – Eliminação de Gauss

Foi implementada a função:

- `escalonar(Ab, debug=True)`

Esta função transforma uma matriz aumentada na sua forma escalonada utilizando eliminação de Gauss com pivotamento parcial.

Durante o processo:
- São realizadas operações elementares sobre as linhas
- É feita a eliminação dos elementos abaixo do pivô
- (Opcional) São mostrados os passos intermédios

---

### T2 – Sistema SPI (Infinitas soluções)

Foi construído um sistema indeterminado onde uma linha é múltipla de outra.

Após a eliminação de Gauss:
- Surge uma variável livre
- O sistema apresenta infinitas soluções

Foram também obtidas soluções paramétricas.

---

### T3 – Sistema SI (Sem solução)

Foi construído um sistema inconsistente.

Após a escalonização:
- Surge uma contradição do tipo 0 = k (k ≠ 0)
- O sistema não possui solução

---

### T4 – Classificação de Sistemas

Foi implementada a função:

- `classificar_sistema(A, b)`

Esta função utiliza o teorema de Rouché–Capelli para classificar sistemas como:

- **SPD** – solução única
- **SPI** – infinitas soluções
- **SI** – sem solução

A função compara o rank da matriz A com o rank da matriz aumentada [A|b].

---

### T5 – Solução Paramétrica

Foram obtidas soluções paramétricas em sistemas SPI, utilizando variáveis livres após a eliminação de Gauss.

---

### T6 – Comparação com NumPy

Foram comparadas as soluções obtidas pelo método de Gauss com:

- `numpy.linalg.solve`

Verificou-se que ambos os métodos produzem os mesmos resultados para sistemas SPD.

---

### T7 – Visualizações

Foram criadas representações gráficas para:

- Sistemas SPD (interseção num ponto)
- Sistemas SPI (retas coincidentes)
- Sistemas SI (retas paralelas)

As imagens foram guardadas em ficheiros `.png`.

---

## Conclusão

Este trabalho permitiu consolidar a aplicação prática da eliminação de Gauss e compreender a relação entre álgebra linear e programação.

Foi possível perceber como a classificação de sistemas depende diretamente do conceito de rank de matrizes e como isso se traduz geometricamente.