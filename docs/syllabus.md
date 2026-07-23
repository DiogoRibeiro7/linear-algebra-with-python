# Linear Algebra with Python — Syllabus

## Lesson flow
| Module | Notebook | Outcomes |
| --- | --- | --- |
| 01 | `notebooks/01_vectors_and_dot_products.ipynb` | Understand vector norms, dot products, and projections; practice with `packages/python/src/linalg_utils/vectors.py` (supplemental). |
| 02 | `notebooks/02_matrices_and_linear_maps.ipynb` | Visualize how matrices map basis vectors, unit squares, and unit circles through rotation, scaling, shear, and reflection; link to `scripts/demo_linear_maps.py` (supports A1–A2). |
| 03 | `notebooks/03_solving_linear_systems.ipynb` | Solve `Ax=b`, reason about residuals, explore conditioning (supports A4). |
| 04 | `notebooks/04_least_squares_and_projections.ipynb` | Project vectors onto subspaces and compare methods (supplemental). |
| 05 | `notebooks/05_qr_and_svd.ipynb` | Decompose matrices into QR and SVD factors (supplemental). |
| 06 | `notebooks/06_eigenvalues_and_diagonalization.ipynb` | Relate eigenpairs to geometric stretch (supplemental). |
| 07 | `notebooks/07_pca_mini_project.ipynb` | Practice PCA on a noisy dataset (optional capstone). |

## Exercises
Assignment-aligned exercise notebooks (see `assignments/ASSIGNMENTS.tex` for the full spec):
- `exercises/01_assignment_exercises.ipynb`
- `exercises/02_assignment_exercises.ipynb`
- `exercises/03_assignment_exercises.ipynb`
- `exercises/04_assignment_exercises.ipynb`
- `exercises/05_assignment_exercises.ipynb`
- `exercises/06_assignment_exercises.ipynb`
- `exercises/07_assignment_exercises.ipynb`

## Solutions
Assignment-aligned solution notebooks:
- `solutions/01_assignment_solutions.ipynb`
- `solutions/02_assignment_solutions.ipynb`
- `solutions/03_assignment_solutions.ipynb`
- `solutions/04_assignment_solutions.ipynb`
- `solutions/05_assignment_solutions.ipynb`
- `solutions/06_assignment_solutions.ipynb`
- `solutions/07_assignment_solutions.ipynb`

## Supporting modules
- `packages/python/src/linalg_utils/checks.py`: Math invariants helpers (`is_orthonormal`, `relative_error`, etc.).
- `packages/python/src/linalg_utils/least_squares.py`: Normal equation and QR-based solvers plus result dataclass.
- `packages/python/src/linalg_utils/determinants.py`: Determinant/inverse utilities with geometric docstrings.
- `packages/python/src/linalg_utils/eigen.py`: Rayleigh quotient, eigen_2x2, and power iteration details.
- `packages/python/src/linalg_utils/decompositions.py`: QR/SVD helpers that feed notebooks and demos.

## Workflow reminders
- Run `poetry run pytest -q`, `poetry run ruff check .`, and `poetry run mypy src` from `packages/python` after touching code.
- Regenerate figures via the `scripts/demo_*.py` helpers and save outputs to `assets/figures/`.
- Keep CLI examples and notebook narratives aligned with the README and FAQ.
- Student submission-control workflow validates PRs targeting `main` for assignments `A01` through `A06` only.
- Submission convention example: branch `40250001-A01`, PR title `Submission 40250001 --- A01`, path `assignments/submissions/40250001/01/`.
