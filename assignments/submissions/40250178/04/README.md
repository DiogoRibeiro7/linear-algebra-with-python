# Assignment 04 — Sistemas Lineares: Gauss e Classificação

**Aluno:** 40250178  
**Linguagem:** JavaScript com math.js

## Como correr

```bash
npm install mathjs
node javascript/sistemas_lineares.js
```

Para as visualizações abrir `javascript/sistemas_lineares.html` no browser.

## O que foi feito

- T1: escalonar() com pivotamento parcial + substituicao_retroativa(), resolução do sistema dado
- T2: sistema SPI — echelon revela variável livre, 3 soluções particulares
- T3: sistema SI — echelon revela contradição 0 = valor
- T4: classificar_sistema() via análise de rank (Rouché-Capelli), testado em 5 sistemas
- T5: solução paramétrica explícita com verificação
- T6: comparação com math.lusolve e teste com sistema singular
- T7: visualizações 2D (3 casos) e 3D (3 planos num ponto) no ficheiro HTML
- T8: reflexao.md
