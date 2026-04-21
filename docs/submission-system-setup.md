# Submission System Setup

This guide explains how to configure and operate the PR-based assignment submission workflow.

## Scope

The submission-control system accepts only assignments `A01` through `A06`.

Assignment 07 (`assignments/07_superficies_revolucao`) may stay in the repository as teaching material, but `A07` is intentionally out of scope for automated submission validation.

## Submission conventions

Students must follow these conventions:

- PR target branch: `develop`
- source branch format: `<student_number>-A<nn>`
- source branch example: `40250001-A01`
- PR title format: `Submission <student_number> --- A<nn>`
- PR title example: `Submission 40250001 --- A01`
- submission path format: `assignments/submissions/<student_number>/<nn>/`
- submission path example: `assignments/submissions/40250001/01/`

Each submission folder must contain:

- `README.md`
- `reflexao.md`
- exactly one implementation track:
  - `python/` with at least one file
  - or `javascript/` with at least one file

## Workflow file

Submission validation is implemented in:

- `.github/workflows/assignment-pr-control.yml`

The workflow validates:

- base branch (`develop`)
- branch and title formats
- branch/title student and assignment consistency
- changed-file scope inside `assignments/submissions/<student>/<nn>/`
- required files (`README.md`, `reflexao.md`)
- exactly one language track
- duplicate open PRs for the same student/assignment
- late submissions using `course/config/deadlines.yml`

## Required labels

Create these repository labels before enabling the workflow in production:

- `submitted`
- `late`
- `invalid`
- `duplicate-submission`

Example commands (GitHub CLI):

```bash
gh label create submitted --color 0e8a16 --description "Valid submission received"
gh label create late --color fbca04 --description "Submission created after deadline"
gh label create invalid --color b60205 --description "Submission failed validation"
gh label create duplicate-submission --color d93f0b --description "Another open PR exists for same student/assignment"
```

## Maintaining students.yml

File: `course/config/students.yml`

- Keep one student number per entry under `students:`.
- Student numbers must match the 8-digit format used in branch and PR title.
- Update this list at the start of each term and whenever enrollment changes.

## Maintaining deadlines.yml

File: `course/config/deadlines.yml`

- Keep `supported_assignments` exactly as `01` to `06`.
- Set each assignment deadline in UTC ISO 8601 format (`YYYY-MM-DDTHH:MM:SSZ`).
- Do not add `07` to this file; unsupported assignments (such as `A07`) are rejected by design.

## Instructor operating notes

- Review PR labels first:
  - `submitted` means valid structure/rules passed.
  - `late` means valid but submitted after configured deadline.
  - `invalid` means one or more validation checks failed.
  - `duplicate-submission` means another open PR already exists for that student/assignment.
- Ask students to push fixes to the same PR branch when possible.
