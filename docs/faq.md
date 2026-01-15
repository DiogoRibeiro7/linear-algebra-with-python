# FAQ

## Tests fail unexpectedly
- **Why did `poetry run pytest -q` fail after a refactor?** Inspect the failing test file under `tests/` to understand the missing behavior; rerun with `poetry run pytest tests/test_filename.py` for extra context.
- **Mypy errors about missing imports or `np.ndarray` shapes?** Check that the relevant module imports NumPy and exposes typed signatures; add `from __future__ import annotations` if needed.

## Notebook & asset issues
- **Figures are missing after rerunning a notebook.** Ensure the notebook saves images to `assets/figures/` using absolute paths relative to the repo root (e.g., `assets/figures/basis_rotation.png`) and rerun the companion script under `scripts/`.
- **Notebook execution stalls at a cell.** Restart the kernel, execute the notebook sequentially, and confirm dependencies like `matplotlib` are installed in the Poetry virtualenv.

## CLI quirks
- **`linalgpy map` parsing fails for matrix strings.** Use commas between entries and semicolons between rows (e.g., `"1,0;0,1"`); the CLI currently expects floats only.
- **`linalgpy solve` rejects a system.** Check that `A` is square (or tall) and that `b` has matching dimensions; the CLI shares parsing helpers with the demos, so mismatched lengths surface in descriptive errors.

## Working with demos
- **Demos fail because assets already exist.** Re-run the demo script (e.g., `python scripts/demo_linear_maps.py`) from the repo root; the script will overwrite assets if figures are regenerated.
- **New demos need to appear in README.** Describe how to run them (command, expected figures) and mention the related assets path so reviewers can locate them quickly.

## General tips
- Keep README, CONTRIBUTING, and docs/syllabus aligned whenever you add a lesson, demo, or CLI feature.
- When you add new helper modules or scripts, also update the tests under `tests/` and mention the new behaviour in the FAQ if it introduces a common stumbling block.
