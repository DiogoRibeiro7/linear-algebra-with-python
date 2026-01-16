# Linear Algebra with Python site

Welcome to the static site that mirrors the `README.md` learning path with richer navigation for instructors.

## Navigation
- **Curriculum**: Review module order, exercises, demos, and figures at `docs/curriculum.md`.
- **Syllabus**: Find lesson titles, outcomes, and supporting modules at `docs/syllabus.md`.
- **FAQ**: Common issues when running demos, notebooks, or the CLI.
- **Contributing**: Follow `CONTRIBUTING.md` (link included below) if you want to add new lessons, demos, or CLI helpers.

## Building the site

Make sure the Poetry environment is installed (`poetry install`), then:

```bash
poetry run mkdocs serve
```

Or create a production build:

```bash
poetry run mkdocs build
```

The generated site lives in `site/` (ignored by Git). Use `mkdocs serve` during development to preview the notebooks/demos alongside the curriculum.

## Resources

- README.md at the repo root
- CONTRIBUTING.md at the repo root
- Curriculum page above
