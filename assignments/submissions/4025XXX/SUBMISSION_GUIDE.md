# Submission Guide

Follow these steps to submit your assignments via GitHub.

## 1. Create your folder
Inside `assignments/submissions/`, create your folder using the pattern:

```
4025XXX
```

Replace `XXX` with exactly three digits.

## 2. Add your work
Place your assignment files and notebooks inside your folder. Keep the structure clear:

```
assignments/submissions/4025XXX/
  README.md
  .gitkeep
  SUBMISSION_GUIDE.md
  01/
  02/
  ...
```

## 3. Commit your changes
From the repository root:

```bash
git add assignments/submissions/4025XXX
git commit -m "submit: assignments for 4025XXX"
```

## 4. Push to your fork
```bash
git push origin main
```

## 5. Open a Pull Request
Open a PR against the main repository branch:

- Title: `Submission 4025XXX`
- Description: list which assignments are included

## 6. Update if requested
If changes are required, make new commits to the same branch and push again.
