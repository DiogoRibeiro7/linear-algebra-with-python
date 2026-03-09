# Linear Algebra with Python site

Welcome to the static site that mirrors the `README.md` learning path with richer navigation for instructors.

## Navigation
- **Curriculum**: Review module order, exercises, demos, and figures at `docs/curriculum.md`.
- **Syllabus**: Find lesson titles, outcomes, and supporting modules at `docs/syllabus.md`.
- **FAQ**: Common issues when running demos, notebooks, or the CLI.
- **Submission setup**: Instructor setup and labels for PR-based assignments at `docs/submission-system-setup.md`.
- **Contributing**: Follow `CONTRIBUTING.md` (link included below) if you want to add new lessons, demos, or CLI helpers.

## Assignment submission procedure (A01-A06)
- Target branch: `develop`
- Source branch example: `4025001-A01`
- PR title example: `Submission 4025001 --- A01`
- Submission path example: `assignments/submissions/4025001/01/`
- Required files: `README.md` and `reflexao.md`
- Include only one track: `python/` or `javascript/`
- Submission-control scope is limited to assignments `A01` through `A06`; `A07` is excluded from this automation.

## Building the site

Make sure the Poetry environment is installed in `packages/python` (`poetry install`), then:

```bash
cd packages/python
poetry run mkdocs serve -f ../../mkdocs.yml
```

Or create a production build:

```bash
cd packages/python
poetry run mkdocs build -f ../../mkdocs.yml
```

The generated site lives in `site/` (ignored by Git). Use `mkdocs serve` during development to preview the notebooks/demos alongside the curriculum.

## Resources

- README.md at the repo root
- CONTRIBUTING.md at the repo root
- Curriculum page above
