# GitHub Submission Integration Notes

## What changed

- Added dedicated workflow: `.github/workflows/assignment-pr-control.yml`
- Updated `.github/PULL_REQUEST_TEMPLATE.md` with student submission metadata and checklist for A01-A06 PRs

## Workflow separation

The submission-control workflow is intentionally isolated from existing automation:

- `assignment-pr-control.yml` handles submission policy checks (branch/title/path/required files/tracks/deadlines/duplicates)
- `ci.yml` continues to run Python and JavaScript tests
- `docs.yml` continues to build documentation
- `lint.yml` continues static checks

This separation avoids coupling course-submission rules to general code-quality pipelines.

## Trigger alignment

- Submission-control workflow listens to pull requests targeting `main`.
- Existing CI/docs/lint workflows already include pull requests to `main` and remain unchanged.
- `main` remains available for unrelated release workflows already present in the repository.

## Conflict avoidance

- Submission-control labels (`submitted`, `late`, `invalid`, `duplicate-submission`) are managed only by `assignment-pr-control.yml`.
- CI/docs/lint workflows do not add or remove submission labels.
- Failure in submission-control does not modify CI/docs/lint definitions.

## Scope reminder

Submission-control automation accepts only assignments `A01` through `A06`.

Assignment `A07` may remain in repository teaching materials, but is intentionally excluded from submission deadlines and validation scope.
