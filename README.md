# Linear Algebra with Python

Course: Linear Algebra and Analytic Geometry (TSIW, ESMAD -- IPP)<br>
Instructor: Diogo Ribeiro (dfr@esmad.ipp.pt, ORCID: 0009-0001-2022-7072)

![Python 3.11+](https://img.shields.io/badge/python-3.11%2B-blue) ![License: MIT](https://img.shields.io/badge/license-MIT-green) [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21302974.svg)](https://doi.org/10.5281/zenodo.21302974)

## About

Seven practical assignments covering matrices, determinants, linear systems, and analytic geometry, with a Python reference implementation and a TypeScript port.

See [CHANGELOG.md](CHANGELOG.md) for release history and [ROADMAP.md](ROADMAP.md) for planned development.

Repository layout:

- `packages/python`: Python library (`linalg_utils`) and tests.
- `packages/js`: TypeScript port and tests.
- `assignments`: Assignment statements and starter files.
- `assignments/ASSIGNMENTS.tex`: Full assignment specification (2025/2026).
- `assignments/submissions`: Submission templates and grading rubric.
- `exercises` / `solutions`: Assignment-aligned exercise and solution notebooks.
- `notebooks`: Lesson notebooks.
- `scripts`: Demo scripts to regenerate figures in `assets/figures`.
- `shared/fixtures`: Cross-language fixtures (JSON) for parity testing.

## Prerequisites

- Python 3.11+
- Poetry
- Node.js 20+ (for the TypeScript port)

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
A2 | Matrix Operations and Property Verification | Operations, Transpose | Introductory
A3 | Determinants and Invertibility            | Determinants, Inverse | Intermediate
A4 | Linear Systems: Gauss and Classification  | Gaussian Elimination  | Intermediate
A5 | Cramer and LU Decomposition               | Cramer, LU            | Intermediate
A6 | Analytic Geometry: Lines and Planes       | Analytic Geometry     | Intermediate
A7 | Surfaces of Revolution                    | Surfaces              | Intermediate

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

Official PR-based submissions use the following format:

- Target branch: `main`
- Source branch example: `40250001-A01`
- PR title example: `Submission 40250001 --- A01`
- Submission path example: `assignments/submissions/40250001/01/`
- Supported assignments in automated submission control: `A01` to `A06` only

Each submission folder must contain:

- `README.md`
- `reflexao.md`
- Exactly one implementation track:
  - `python/` with at least one file
  - or `javascript/` with at least one file

`assignments/07_superficies_revolucao` remains available as teaching material, but `A07` is outside the submission-control workflow.

## License

MIT.

## Citation

If you use this material, please cite it via its DOI. The concept DOI below always resolves to the latest version:

> Ribeiro, D. *Linear Algebra with Python*. Zenodo. <https://doi.org/10.5281/zenodo.21302974>

- Concept DOI (all versions): [10.5281/zenodo.21302974](https://doi.org/10.5281/zenodo.21302974)
- Version DOI (v0.1.0): [10.5281/zenodo.21302975](https://doi.org/10.5281/zenodo.21302975)

A machine-readable `CITATION.cff` is included; GitHub's "Cite this repository" button uses it.

## Author

Diogo Ribeiro -- ORCID: <https://orcid.org/0009-0001-2022-7072>
