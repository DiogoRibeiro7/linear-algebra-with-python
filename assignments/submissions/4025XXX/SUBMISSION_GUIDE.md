# Submission Guide

Follow these steps to submit your assignments via GitHub.

Reference: `assignments/ASSIGNMENTS.tex` contains the full assignment specification.

## 1\. Create your folder

Inside `assignments/submissions/`, create your folder using the pattern:

```
4025XXX
```

Replace `XXX` with exactly three digits.

## 2\. Add your work

Place your assignment files and notebooks inside your folder. Keep the structure clear and include both languages (assignments 01–07):

```
assignments/submissions/4025XXX/
  README.md
  .gitkeep
  SUBMISSION_GUIDE.md
  01/
    README.md
    python/
    javascript/
    reflexao.md
  02/
    README.md
    python/
    javascript/
    reflexao.md
  ...
```

## 3\. Create a branch

Create a branch per assignment (example for assignment 01):

```bash
git checkout -b 4025XXX-A01
```

## 4\. Commit your changes

From the repository root:

```bash
git add assignments/submissions/4025XXX/01
git commit -m "submit: 4025XXX A01"
```

## 5\. Push your branch

```bash
git push origin 4025XXX-A01
```

## 6\. Open a Pull Request

Open a PR against the main repository branch:

- Title: `Submission 4025XXX -- A01`
- Description: confirm both Python and JavaScript deliverables are included

## 7\. Update if requested

If changes are required, make new commits to the same branch and push again.

## Tooling reminders

- Python: run from `packages/python` with `poetry run ...`.
- JavaScript: run from `packages/js` with Yarn (Node.js 20+).
