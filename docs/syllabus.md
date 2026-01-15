# Linear Algebra with Python — Syllabus

## Lesson flow
| Module | Notebook | Outcomes |
| --- | --- | --- |
| 01 | `notebooks/01_vectors.ipynb` | Understand vector norms, dot products, and projections; practice with `src/linalg_with_python/vectors.py`. |
| 02 | `notebooks/02_matrices_and_linear_maps.ipynb` | Visualize how matrices map basis vectors, unit squares, and unit circles through rotation, scaling, shear, and reflection; link to `scripts/demo_linear_maps.py`. |
| 03 | `notebooks/03_solving_linear_systems.ipynb` | Solve `Ax=b`, reason about residuals, explore conditioning via perturbations and `scripts/demo_conditioning.py`. |
| 04 | `notebooks/04_least_squares_and_projections.ipynb` | Project vectors onto subspaces, fit noisy data, compare normal equations vs QR using `src/linalg_with_python/least_squares.py`. |
| 05 | `notebooks/05_qr_and_svd.ipynb` | Decompose matrices into QR and SVD factors, interpret singular values as axis stretches; tie to `src/linalg_with_python/decompositions.py`. |
| 06 | `notebooks/06_eigenvalues_and_diagonalization.ipynb` | Relate eigenpairs to geometric stretch, use `power_iteration` and `eigen_2x2` von insight. |
| 07 | `notebooks/07_pca_mini_project.ipynb` | Practice PCA with a noisy 2D dataset, project onto the dominant mode, and link to `scripts/demo_pca_2d.py`. |

## Exercises & solutions
- `exercises/02_matrices_exercises.ipynb` + `solutions/02_matrices_exercises.ipynb`: Tasks about linear maps, verifying invariants.
- `exercises/03_systems_exercises.ipynb` + `solutions/03_systems_exercises.ipynb`: Practice solving systems, residuals, and conditioning labs.
- `exercises/04_least_squares_exercises.ipynb` + `solutions/04_least_squares_exercises.ipynb`: Hands-on least squares fitting, normal equations vs QR evaluation.

## Supporting modules
- `src/linalg_with_python/checks.py`: Math invariants helpers (`is_orthonormal`, `relative_error`, etc.).
- `src/linalg_with_python/least_squares.py`: Normal equation and QR-based solvers plus result dataclass.
- `src/linalg_with_python/determinant.py`: Determinant/inverse utilities with geometric docstrings.
- `src/linalg_with_python/eigen.py`: Rayleigh quotient, eigen_2x2, and power iteration details.
- `src/linalg_with_python/decompositions.py`: QR/SVD helpers that feed notebooks and demos.

## Workflow reminders
- Run `poetry run pytest -q`, `poetry run ruff check .`, and `poetry run mypy src` after touching code.
- Regenerate figures via the `scripts/demo_*.py` helpers and save outputs to `assets/figures/`.
- Keep CLI examples and notebook narratives aligned with the README and FAQ.
