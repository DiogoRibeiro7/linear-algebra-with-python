# Submission System Migration Plan

## Current Repository Structure Summary

The repository already contains:

- educational assignment content in `assignments/01_matrizes_tipos` through `assignments/07_superficies_revolucao`
- a submission area at `assignments/submissions/`
- active GitHub workflows:
  - `.github/workflows/ci.yml`
  - `.github/workflows/docs.yml`
  - `.github/workflows/lint.yml`
- a PR template at `.github/PULL_REQUEST_TEMPLATE.md`
- contributor/student documentation across `README.md`, `CONTRIBUTING.md`, and `docs/`

Current automation (`ci.yml`, `docs.yml`, `lint.yml`) triggers on `main` for push and pull_request events.

The existing submissions documentation (`assignments/submissions/README.md`, `assignments/submissions/40XXXXXX/SUBMISSION_GUIDE.md`) currently describes a model that expects both `python/` and `javascript/` inside assignment folders and includes assignments `01` through `07`.

## What Already Matches the Target Model

- a dedicated `assignments/submissions/` area already exists
- students can already submit via assignment-specific branches (example branch naming exists)
- PR-based collaboration is already possible in the same repository
- `main` branch already exists and is already used by workflows

## Gaps vs Desired Submission Workflow

1. Missing submission-control workflow
- No workflow currently validates branch name/title format, submission paths, required files, language-track exclusivity, duplicate submissions, or deadlines.

2. Missing course config files
- `course/config/students.yml` does not exist.
- `course/config/deadlines.yml` does not exist.

3. Current submission docs conflict with new rules
- Existing docs require both `python/` and `javascript/`.
- New rule requires exactly one track (`python/` OR `javascript/`).
- Existing examples include assignment `07`; new control scope must be only `A01` to `A06`.
- Existing PR title example uses `--`; new required format is `Submission <student_number> --- A<nn>`.

4. PR template not aligned with submission checks
- Current template is generic and does not guide students through submission-specific constraints.

5. Label setup not documented for submission control
- Required labels (`submitted`, `late`, `invalid`, `duplicate-submission`) are not documented as setup prerequisites.

## Coexistence Decision: Educational Content and Submission Folders

The existing assignment content folders (`assignments/01_...` through `assignments/07_...`) should remain unchanged as teaching materials.

They can coexist with `assignments/submissions/...` because they serve different purposes:

- `assignments/0X_*`: assignment statement/starter/reference materials
- `assignments/submissions/...`: student PR deliverables

No renaming or removal of `assignments/01_...` through `assignments/07_...` is required.

## Scope Decision (Explicit)

The submission-control system will validate only assignments `A01` to `A06`.

`assignments/07_superficies_revolucao` may remain in the repository as teaching material, but assignment `A07` must be excluded from:

- deadline configuration
- supported-assignment validation logic
- accepted submission workflow outcomes

## Required New Files

- `.github/workflows/assignment-pr-control.yml`
- `course/config/students.yml`
- `course/config/deadlines.yml`
- `docs/submission-system-setup.md`
- `docs/submission-system-docs-summary.md`
- `docs/github-submission-integration-notes.md`
- `docs/submission-system-dry-run.md`
- `docs/submission-system-final-review.md`

## Required Workflow Changes

1. Add a dedicated submission-control workflow
- Trigger: pull requests targeting `main`
- Enforce naming/title/path/content/deadline/duplicate constraints
- Apply labels (`submitted`, `late`, `invalid`, `duplicate-submission`)

2. Keep existing workflows intact
- `ci.yml`, `docs.yml`, and `lint.yml` should continue to run as currently configured unless a specific conflict is found.
- Submission-control logic must stay isolated in its own workflow file.

## Documentation Updates Needed

- `README.md`: add concise official submission procedure
- `CONTRIBUTING.md`: include submission-specific contributor guidance
- `.github/PULL_REQUEST_TEMPLATE.md`: add student submission checklist
- `docs/index.md`, `docs/faq.md`, `docs/syllabus.md`, `docs/curriculum.md`: align references with PR workflow and A01-A06 scope
- Existing `assignments/submissions` guidance should be reconciled with the new validation rules

## Step-by-Step Implementation Plan

1. Add submission-control workflow and config files
- Create `assignment-pr-control.yml`, `students.yml`, and `deadlines.yml`.
- Implement robust validation for branch, title, student/assignment matching, changed-path restrictions, required files, exactly-one-track rule, duplicate PRs, and late detection.
- Restrict supported assignments to `01` through `06`.

2. Add instructor setup guide
- Create `docs/submission-system-setup.md` documenting naming/path rules, labels, and config maintenance.

3. Align repository documentation
- Apply minimal edits to existing docs and PR template so students/instructors follow the enforced rules.
- Include troubleshooting for common validation failures.

4. Add dry-run examples
- Create `docs/submission-system-dry-run.md` with valid/invalid PR scenarios and expected labels/outcomes.

5. Perform final hardening pass
- Re-check syntax and logic, ensure `main` targeting, and ensure A07 exclusion.
- Publish `docs/submission-system-final-review.md` with implementation status and limitations.

## Risk Controls and Minimal-Disruption Notes

- Keep all existing educational material paths unchanged.
- Introduce submission controls as additive changes.
- Avoid altering existing CI/docs/lint behavior unless necessary.
- Keep docs edits focused on submission workflow sections only.
