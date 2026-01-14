# linear-algebra-with-python

Educational repo to learn linear algebra with Python + NumPy.
Focus: intuition (plots), small reference implementations, and tests.

## What you’ll learn
- Vectors: dot product, norms, angles, projections
- Matrices: linear maps, composition
- Solving systems: Ax=b, residuals, conditioning
- Least squares: projection view and QR
- Eigenvalues: geometric meaning, power iteration (intro)

## Repo layout
- `notebooks/`: guided lessons
- `src/`: reference implementation
- `scripts/`: demos that generate figures into `assets/figures/`
- `tests/`: correctness tests

## Setup (Poetry)
```bash
poetry install
poetry run pytest -q
```

## Run demos
```bash
python scripts/demo_linear_maps.py
python scripts/demo_least_squares.py
python scripts/demo_eigen_2d.py
```

## License
MIT.
