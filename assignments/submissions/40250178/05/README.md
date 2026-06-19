# Assignment 05 — Cramer e Decomposição LU

**Aluno:** 40250178  
**Linguagem:** JavaScript com math.js

## Como correr

```bash
npm install mathjs
node javascript/cramer_lu.js
```

Para o heatmap e benchmark visual abrir `javascript/cramer_lu.html` no browser.

## O que foi feito

- T1: cramer_2x2 e cramer_3x3 com verificação via lusolve
- T2: decomposição LU manual com pivotamento, verificação PA=LU e det via diagonal de U
- T3: benchmark Cramer vs lusolve para n = 2,3,5,10,20,50,100
- T4: resolução multi-RHS com LU reutilizado vs do zero
- T5: heatmap das matrizes A, L, U no ficheiro HTML
- T6: reflexao.md
