# Submission System Dry Run

Use these dry-run examples to test `.github/workflows/assignment-pr-control.yml` safely.

All examples below assume PR target branch `main`.

## Scenario 1: Valid submission PR

- Branch name: `40250001-A01`
- PR title: `Submission 40250001 --- A01`
- Changed path: `assignments/submissions/40250001/01/README.md` (plus `reflexao.md` and `python/main.py`)
- Expected label: `submitted`
- Expected workflow outcome: pass

## Scenario 2: Invalid branch name

- Branch name: `40250001_A01`
- PR title: `Submission 40250001 --- A01`
- Changed path: `assignments/submissions/40250001/01/python/main.py`
- Expected label: `invalid`
- Expected workflow outcome: fail (`branch format` validation)

## Scenario 3: Invalid PR title

- Branch name: `40250001-A01`
- PR title: `Submission 40250001 -- A01`
- Changed path: `assignments/submissions/40250001/01/python/main.py`
- Expected label: `invalid`
- Expected workflow outcome: fail (`title format` validation)

## Scenario 4: Changes outside student folder

- Branch name: `40250001-A02`
- PR title: `Submission 40250001 --- A02`
- Changed path: `README.md` (outside submission folder)
- Expected label: `invalid`
- Expected workflow outcome: fail (`path restriction` validation)

## Scenario 5: Both language tracks present

- Branch name: `40250002-A03`
- PR title: `Submission 40250002 --- A03`
- Changed path: `assignments/submissions/40250002/03/python/main.py` and `assignments/submissions/40250002/03/javascript/main.js`
- Expected label: `invalid`
- Expected workflow outcome: fail (`exactly one language track` validation)

## Scenario 6: Missing `reflexao.md`

- Branch name: `40250002-A04`
- PR title: `Submission 40250002 --- A04`
- Changed path: `assignments/submissions/40250002/04/README.md` and `assignments/submissions/40250002/04/python/main.py`
- Expected label: `invalid`
- Expected workflow outcome: fail (`required file reflexao.md missing`)

## Scenario 7: Late submission

- Branch name: `40250003-A05`
- PR title: `Submission 40250003 --- A05`
- Changed path: `assignments/submissions/40250003/05/javascript/main.js` (plus required files)
- Expected label: `submitted`, `late`
- Expected workflow outcome: pass with late flag when PR creation timestamp is after the `05` deadline in `course/config/deadlines.yml`

## Scenario 8: Duplicate open PR

- Branch name: `40250123-A06`
- PR title: `Submission 40250123 --- A06`
- Changed path: `assignments/submissions/40250123/06/python/main.py` (plus required files)
- Expected label: `invalid`, `duplicate-submission`
- Expected workflow outcome: fail when another open PR already exists for the same student and assignment

## Scenario 9: Unsupported assignment (`A07`)

- Branch name: `40250345-A07`
- PR title: `Submission 40250345 --- A07`
- Changed path: `assignments/submissions/40250345/07/python/main.py`
- Expected label: `invalid`
- Expected workflow outcome: fail (`unsupported assignment`; only `A01` to `A06` are valid)

## Maintainer note

Assignment `07` may remain in `assignments/07_superficies_revolucao` as course material, but it is intentionally outside the scope of this submission-control system.
