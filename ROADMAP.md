# Roadmap

Planned direction for **Linear Algebra with Python**. Dates are indicative and
follow the academic calendar (course runs in the winter semester); items may
move between milestones as teaching priorities shift. Suggestions are welcome —
open an issue with the `enhancement` label.

## 0.3.0 — Course-material consolidation (target: before 2026/27 semester)

**Theme: bring every student-facing notebook up to the standard of the lesson series.**

- [ ] Upgrade `exercises/` and `solutions/` notebooks to the same narrative,
      styling, and executed-output standard as `notebooks/01`–`08`.
- [ ] Refresh the `capstone/` starter and solution notebooks, linking them
      explicitly to the lesson-series toolkit.
- [ ] Execute lesson notebooks in CI (`nbconvert --execute` smoke job) so
      broken notebooks can never ship again.
- [ ] Publish executed notebooks in the MkDocs site (e.g. `mkdocs-jupyter`)
      instead of linking to raw `.ipynb` files.
- [ ] Add Binder / Google Colab launch badges so students can run lessons
      without a local setup.

## 0.4.0 — Library parity and packaging

**Theme: one API, two languages, modern packaging.**

- [ ] Close the TypeScript ↔ Python gap: port `vectors`, `least_squares`,
      `decompositions`, `eigen`, `geometry2d`, and `checks` to `packages/js`
      (currently only `matrices`, `determinants`, `systems`, `lu`, `geometry`
      are ported).
- [ ] Extend `shared/fixtures` parity tests to cover the newly ported modules.
- [ ] Migrate `packages/python/pyproject.toml` metadata from `[tool.poetry.*]`
      to PEP 621 `[project.*]` (Poetry 2 already warns about this).
- [ ] Evaluate publishing `linalg_utils` to PyPI and `linalg-utils` to npm for
      easier student installation.

## 0.5.0 — Assignments and autograding

**Theme: richer assessment with less manual grading.**

- [ ] Add an eighth assignment (candidate topics: eigenvalues in 2×2 geometry,
      or least squares as applied analytic geometry) with statements, starters,
      fixtures, and rubric.
- [ ] Extend the submission-control workflow with automated smoke-grading:
      run the student's code against the shared fixtures and post results as a
      PR comment.
- [ ] Anonymized grade-export tooling to replace the manual
      `pr_grades.*` artifacts.

## Ideas / unscheduled

- Interactive web demos (compiled from the TypeScript port) embedded in the
  MkDocs site — sliders for linear maps without a Jupyter kernel.
- English translations of the assignment statements (currently Portuguese).
- Property-based tests (Hypothesis / fast-check) for both libraries.
- A short "numerics pitfalls" appendix notebook: floating point, cancellation,
  and why `assert_close` exists.

## Release process

1. Update `CHANGELOG.md` and bump the version in `packages/python/pyproject.toml`,
   `packages/js/package.json`, `CITATION.cff` (with `date-released`), and
   `.zenodo.json` — all four must agree.
2. Tag `vX.Y.Z` on `main` and publish a GitHub release; Zenodo archives the
   release and mints the version DOI automatically.
3. Add the new version DOI to `CITATION.cff` `identifiers` once minted.
