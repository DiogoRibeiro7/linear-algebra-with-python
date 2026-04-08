# Contributing

Thanks for helping expand this learning repo! Follow the steps below so your changes stay consistent.

## Local setup
1. poetry install and activate the venv: Poetry will create a compatible Python 3.12 environment.
2. poetry run pytest -q verifies reference implementations and demos.
3. poetry run ruff check . enforces styling rules.
4. poetry run mypy src keeps type safety tight.

Run those commands before creating a patch, especially if you touched src/ or notebooks/.

## Notebooks & figures
- Keep lesson notebooks under notebooks/ in numerical order (e.g., 01_, 02_)..
- Each notebook should save its figures into assets/figures/ so scripts/demos can reuse them.
- To preview a notebook manually, run jupyter nbconvert --to html notebooks/05_qr_and_svd.ipynb or open it in your editor.
- If you add a new figure-generating step, include or update a script in scripts/ so CI can regenerate assets easily.

## New lessons/exercises
- Lessons belong in `notebooks/` (lessons) or `exercises/` (student practice); add matching `solutions/` notebooks for each exercise set.
- Every notebook should include a “check your work” section with expected shapes or invariants instead of full answers.
- Give new notebooks/figures a script under `scripts/` so contributors can regenerate assets with `python scripts/demo_*.py`.

## CLI and demos
- The `linalgpy` CLI is exposed via Poetry; run `poetry run linalgpy --help` to explore subcommands (map, solve, lsq, etc.).
- Keep CLI arguments simple (comma-separated lists for matrices/vectors) and document parser updates in README or docs/faq.md.
- Always run demo scripts from the repo root so figures are saved consistently into `assets/figures/`.

## Testing & validation
- `poetry run pytest -q` exercises the unit tests and demos.
- `poetry run ruff check .` enforces style conventions.
- `poetry run mypy src` keeps the reference implementations typed.
- After editing notebooks or scripts, rerun the relevant demos to ensure figures still match the assets.

## Documentation & README
- Keep `README.md` aligned with the learning path table, featured figures, CLI usage, and demo commands.
- Update `docs/syllabus.md` and `docs/faq.md` whenever you add lessons, exercises, or CLI helpers so contributors can find the story.

## Reporting issues
- File a GitHub issue for bugs or missing content; include commands to reproduce and any offending figure/notebook names.
- If a notebook or script fails to run, paste the error along with the asset path so reviewers can rerun the same steps.

## Student submission PRs
- Target branch must be `develop`.
- Source branch format: `<student_number>-A<nn>` (example: `40250001-A01`).
- PR title format: `Submission <student_number> --- A<nn>` (example: `Submission 40250001 --- A01`).
- Submission files must stay under `assignments/submissions/<student_number>/<nn>/`.
- Required files in the submission folder: `README.md` and `reflexao.md`.
- Include exactly one language track: `python/` or `javascript/`.
- Automated submission control accepts only assignments `A01` through `A06`.
- Assignment `A07` can exist in teaching materials but is excluded from submission-control validation.
