# Linear Algebra with Python

Course: Linear Algebra and Analytic Geometry (TSIW, ESMAD — IPP)  
Instructor: Diogo Ribeiro (dfr@esmad.ipp.pt, ORCID: 0009-0001-2022-7072)

![Python 3.11+](https://img.shields.io/badge/python-3.11%2B-blue)
![License: MIT](https://img.shields.io/badge/license-MIT-green)

## About
Eight practical assignments covering matrices, determinants, linear systems, and analytic geometry.

## Prerequisites
- Python 3.11+
- Poetry

## Installation
```bash
git clone https://github.com/diogoribeiro7/linear-algebra-with-python
cd linear-algebra-with-python
poetry install
```

## Assignments

| # | Title | Module | Difficulty |
|---|--------|--------|-------------|
| A1 | Matrices: Construction and Classification | Matrices | Introductory |
| A2 | Matrix Operations | Operations, Transpose | Introductory |
| A3 | Determinants and Invertibility | Determinants, Inverse | Intermediate |
| A4 | Linear Systems: Gauss | Gaussian Elimination | Intermediate |
| A5 | Cramer and LU Decomposition | Cramer, LU | Intermediate |
| A6 | Analytic Geometry: Lines and Planes | Analytic Geometry | Intermediate |
| A7 | Surfaces of Revolution | Surfaces | Intermediate |
| A8 | Integrative Project | All | Advanced |

## Run
```bash
poetry run python assignments/01_matrizes_tipos/matrizes_tipos.py
```

## Tests
```bash
poetry run pytest
```

## License
MIT.

## Author
Diogo Ribeiro — ORCID: https://orcid.org/0009-0001-2022-7072
