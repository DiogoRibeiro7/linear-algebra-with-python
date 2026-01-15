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
