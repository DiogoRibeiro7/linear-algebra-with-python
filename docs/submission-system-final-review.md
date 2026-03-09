# Submission System Final Review

## What was implemented

- Added a dedicated submission-control workflow at `.github/workflows/assignment-pr-control.yml`.
- Enforced PR submission rules:
  - base branch must be `develop`
  - branch format `NNNNNNN-Axx`
  - PR title format `Submission NNNNNNN --- Axx`
  - student and assignment consistency between branch and title
  - changed files restricted to `assignments/submissions/<student>/<nn>/...`
  - required files `README.md` and `reflexao.md`
  - exactly one implementation track (`python/` or `javascript/`)
  - duplicate open PR detection for same student/assignment
  - late detection from deadline config
- Added/maintained config files:
  - `course/config/students.yml`
  - `course/config/deadlines.yml`
- Updated documentation and PR guidance:
  - setup guide, integration notes, dry-run examples, docs summary
  - PR template checklist aligned with submission workflow

## Hardening actions in this final pass

- Added per-PR workflow concurrency to avoid race conditions during rapid updates:
  - `concurrency.group: assignment-pr-control-${{ github.event.pull_request.number }}`
- Revalidated YAML syntax for:
  - `assignment-pr-control.yml`
  - existing `ci.yml`, `docs.yml`, `lint.yml`
  - `students.yml` and `deadlines.yml`

## What was intentionally left unchanged

- Existing educational assignment material folders:
  - `assignments/01_*` through `assignments/07_*`
- Existing CI/docs/lint workflow triggers on `develop` and `main`
- Current repository pedagogical content beyond submission workflow guidance

## A01-A06 scope confirmation

Submission-control validation and deadlines support only assignments:

- `A01`
- `A02`
- `A03`
- `A04`
- `A05`
- `A06`

`A07` is intentionally excluded from submission-control behavior and deadline config.

## Known limitations

- Duplicate detection currently checks up to the first 100 open PRs (single-page API request).
- Student number mismatches against `students.yml` are warnings, not hard failures.
- Validation checks structure and policy only; it does not grade assignment correctness.

## Follow-up improvements

- Add assignment-specific autograding jobs for A01-A06 (language-aware).
- Paginate duplicate detection for very large PR volumes.
- Optionally make unknown student numbers a configurable hard failure.
- Add structured PR comments that summarize exact failed checks for students.
