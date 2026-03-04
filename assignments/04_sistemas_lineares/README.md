# Assignment 04 — Linear Systems: Gauss and Classification

## Objective
Solve and classify linear systems via Gaussian elimination and visualize solution geometry in both languages.

## Tasks
1. Implement `escalonar(Ab)` and `substituicao_retroativa(U, b)`; solve the provided 3x3 system with steps.
2. Construct an SPI system and show free variables with multiple particular solutions.
3. Construct an SI system and explain the contradiction geometrically.
4. Implement `classificar_sistema(A, b)` using rank analysis; test at least 5 systems.
5. Provide a parametric solution for an SPI system with 3 unknowns and 2 equations.
6. Compare your Gauss implementation with the built-in solver for SPD systems; show singular behavior.
7. Create visualizations for 2D line systems and a 3D plane intersection.
8. Write `reflexao.md` (200–300 words) on Rouché–Capelli and Gaussian elimination.

## Deliverables
```
assignments/submissions/4025XXX/04/
  README.md
  python/
    sistemas_lineares.ipynb
    *.png
  javascript/
    sistemas_lineares.js
    sistemas_lineares.html
  reflexao.md
```

## Submission
Follow `assignments/submissions/4025XXX/SUBMISSION_GUIDE.md`.
