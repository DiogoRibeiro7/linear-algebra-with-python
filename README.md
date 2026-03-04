# Linear Algebra with Python

Course: Linear Algebra and Analytic Geometry (TSIW, ESMAD -- IPP)<br>
Instructor: Diogo Ribeiro (dfr@esmad.ipp.pt, ORCID: 0009-0001-2022-7072)

![Python 3.11+](https://img.shields.io/badge/python-3.11%2B-blue) ![License: MIT](https://img.shields.io/badge/license-MIT-green)

## About

Eight practical assignments covering matrices, determinants, linear systems, and analytic geometry, with a Python reference implementation and a TypeScript port.

Repository layout:

- `packages/python`: Python library (`linalg_utils`) and tests.
- `packages/js`: TypeScript port and tests.
- `assignments`: Assignment statements and starter files.
- `assignments/submissions`: Submission templates and grading rubric.
- `exercises` / `solutions`: Practice notebooks and reference solutions.
- `notebooks`: Lesson notebooks.
- `scripts`: Demo scripts to regenerate figures in `assets/figures`.
- `shared/fixtures`: Cross-language fixtures (JSON) for parity testing.

## Prerequisites

- Python 3.11+
- Poetry
- Node.js 18+ (for the TypeScript port)

## Installation (Python)

```bash
git clone https://github.com/diogoribeiro7/linear-algebra-with-python
cd linear-algebra-with-python/packages/python
poetry install
```

## Installation (TypeScript)

```bash
cd packages/js
yarn install
```

Yarn is used for the TypeScript package (Berry/PnP by default).

## Assignments

#  | Title                                     | Module                | Difficulty
-- | ----------------------------------------- | --------------------- | ------------
A1 | Matrices: Construction and Classification | Matrices              | Introductory
A2 | Matrix Operations                         | Operations, Transpose | Introductory
A3 | Determinants and Invertibility            | Determinants, Inverse | Intermediate
A4 | Linear Systems: Gauss                     | Gaussian Elimination  | Intermediate
A5 | Cramer and LU Decomposition               | Cramer, LU            | Intermediate
A6 | Analytic Geometry: Lines and Planes       | Analytic Geometry     | Intermediate
A7 | Surfaces of Revolution                    | Surfaces              | Intermediate
A8 | Integrative Project                       | All                   | Advanced

## Run (Python)

```bash
cd packages/python
poetry run python ../../assignments/01_matrizes_tipos/matrizes_tipos.py
```

## Demos (Python)

```bash
cd packages/python
poetry run python ../../scripts/run_all_demos.py
```

## Tests

```bash
cd packages/python
poetry run pytest
```

## Tests (TypeScript)

```bash
cd packages/js
yarn test
```

## Submissions

Start with the submission index at `assignments/submissions/README.md`, then follow the guide in `assignments/submissions/4025XXX/SUBMISSION_GUIDE.md`. These documents define naming conventions, required deliverables, and the grading checklist.

## License

MIT.

## Author

Diogo Ribeiro -- ORCID: <https://orcid.org/0009-0001-2022-7072>
