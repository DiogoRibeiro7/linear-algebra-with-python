# Assignment 05 — Cramer and LU Decomposition

## Objective
Compare Cramer's rule, Gauss, and LU decomposition, including multi-RHS efficiency and visualizations.

## Tasks
1. Implement `cramer_2x2(A, b)` and `cramer_3x3(A, b)`; compare with built-in solver.
2. Compute LU decomposition for a 3x3 matrix; verify PA = LU and det(A).
3. Benchmark Cramer, Gauss, and the built-in solver for multiple sizes; present table and chart.
4. Solve multiple RHS with a single LU factorization and compare total time.
5. Create a heatmap visualization of A, L, and U side by side.
6. Write `reflexao.md` (200–300 words) comparing methods and numerical stability.

## Deliverables
```
assignments/submissions/4025XXX/05/
  README.md
  python/
    cramer_lu.ipynb
    lu_heatmap.png
  javascript/
    cramer_lu.js
    cramer_lu.html
  reflexao.md
```

## Submission
Follow `assignments/submissions/4025XXX/SUBMISSION_GUIDE.md`.
