# Submission System Docs Summary

This update aligned repository documentation with the PR-based submission workflow.

## Files updated

- `README.md`
- `CONTRIBUTING.md`
- `docs/index.md`
- `docs/faq.md`
- `docs/syllabus.md`
- `docs/curriculum.md`

## What changed

- Added official submission conventions:
  - target branch `develop`
  - branch pattern `<student_number>-A<nn>`
  - PR title pattern `Submission <student_number> --- A<nn>`
  - submission path `assignments/submissions/<student_number>/<nn>/`
- Documented required submission contents:
  - `README.md`
  - `reflexao.md`
  - exactly one language track (`python/` or `javascript/`)
- Added troubleshooting guidance for common validation failures:
  - branch/title format
  - wrong base branch
  - out-of-scope changed files
  - missing files
  - language-track conflicts
  - duplicate open PR
  - unsupported assignments (including `A07`)
- Clarified scope in docs: submission-control automation supports only `A01` to `A06`.
- Clarified that assignment 07 may remain as teaching material while excluded from submission-control validation.
