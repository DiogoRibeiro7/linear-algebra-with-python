# Teaching curriculum

This document bundles the notebooks, exercises, and assets into a coherent teaching path for instructors or self-guided learners. Treat it as the “static site” version of the README: each module links to the lesson notebook, the matched exercises/solutions, and the key figures that illustrate the concepts.

## Module flow

| Module | Notebook & exercises | Key figures | Demos |
| --- | --- | --- | --- |
| 01 — Vectors | `notebooks/01_vectors_and_dot_products.ipynb` <br> Exercises: `exercises/02_matrices_exercises.ipynb` (practice) | `assets/figures/line_fit_qr.png` (Gram-Schmidt projection) | — |
| 02 — Matrices as maps | `notebooks/02_matrices_and_linear_maps.ipynb` (basis/unit square/circle) <br> Exercises: `exercises/02_matrices_exercises.ipynb` | `assets/figures/nb02_basis_vectors.png` <br> `assets/figures/nb02_unit_circle.png` | `scripts/demo_nb02_mappings.py` |
| 03 — Solving systems | `notebooks/03_solving_linear_systems.ipynb` <br> Exercises: `exercises/03_systems_exercises.ipynb` | `assets/figures/solution_sensitivity.png` | `scripts/demo_conditioning.py` |
| 04 — Least squares & projections | `notebooks/04_least_squares_and_projections.ipynb` <br> Exercises: `exercises/04_least_squares_exercises.ipynb` | `assets/figures/normal_vs_qr_residuals.png` | `scripts/demo_least_squares.py` |
| 05 — QR & SVD | `notebooks/05_qr_and_svd.ipynb` | `assets/figures/qr_basis.png` <br> `assets/figures/svd_circle.png` | `scripts/demo_nb02_mappings.py` (reuse) |
| 06 — Eigenvalues | `notebooks/06_eigenvalues_and_diagonalization.ipynb` | `assets/figures/eigen_stretch.png` | `scripts/demo_eigen_2d.py` |
| 07 — PCA | `notebooks/07_pca_mini_project.ipynb` | `assets/figures/demo_pca_projection.png` | `scripts/demo_pca_2d.py` |
| 08 — Interactive maps | `notebooks/08_interactive_linear_maps.ipynb` (widgets) | `Add widgets to experience rotations + scaling in real time.` | Requires `ipywidgets`, `ipympl` |

## Curriculum deliverables

- **Capstone**: `capstone/starter.ipynb` and `capstone/solution.ipynb` provide Track A (least squares + geometry) and Track B (PCA/SVD) templates. Pair them with the exercises for a final assessment.
- **CLI + demos**: from `packages/python`, run `poetry run linalgpy --help` (maps, solve, lsq) plus the `scripts/demo_*.py` set keep the figures reproducible. Run `scripts/run_all_demos.py` when you need to regenerate every asset before publishing.
- **Exercises/solutions**: each exercise notebook (modules 02–04) includes 8–8 tasks plus a “Check your work” section that reminds learners what shapes or invariants to confirm; the solution notebooks show complete code and printed metrics.
- **Figures**: keep each figure in `assets/figures/` so notebooks and README can embed them consistently.

## Exporting a PDF or static site

1. Install any missing requirements in the Poetry environment: `cd packages/python` then `poetry install`.
2. Run `jupyter nbconvert --to pdf notebooks/02_matrices_and_linear_maps.ipynb` (repeat for other notebooks) to produce shareable PDFs.
3. Use a static site generator (e.g., MkDocs) that can render Markdown + images from this repo if you want a more formal “site”; the links above already match the published order.

For a quick instructor guide, share `docs/curriculum.md` with learners alongside the notebooks and exercises—it summarizes the path and references the key figures they will encounter.
