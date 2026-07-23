# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

See [ROADMAP.md](ROADMAP.md) for planned work.

## [0.2.0] - 2026-07-23

### Added

- Rebuilt all eight lesson notebooks (`notebooks/01`–`08`) as rich, self-contained
  lessons: table of contents, LaTeX-annotated narrative, consistent colorblind-safe
  figure styling, numerical sanity checks, and executed outputs (figures render
  directly on GitHub).
- New applications in the lesson series: SVD image compression (05), Markov-chain
  steady state (06), 4-D hidden-factor PCA with scree plot (07), and static
  parameter sweeps in the interactive notebook (08) so it renders without a live
  kernel.
- `ROADMAP.md` describing the planned direction of the project.
- Explicit `version` field in the Zenodo metadata (`.zenodo.json`).

### Changed

- Default branch renamed from `develop` to `main`; CI, docs, the assignment
  submission-control workflow, and contributor documentation updated accordingly.
- `packages/js` standardized on Yarn 4 with a committed lockfile.
- Lesson notebooks bootstrap `linalg_utils` from `packages/python/src` when the
  package is not installed, so they run from a plain clone or the Poetry env.

### Fixed

- Lesson notebooks 04 and 05 called `qr_gram_schmidt` with a non-existent
  `method=` keyword and result attributes; they now use the real `(Q, R)` tuple
  API and execute end to end.
- Security updates in `packages/python/poetry.lock`: jupyterlab 4.5.9 → 4.6.2
  (two high-severity XSS advisories and three extension-manager advisories),
  Pygments 2.19.2 → 2.20.0 (ReDoS), and removal of the vulnerable setuptools
  pin from the dependency tree — resolving all open Dependabot alerts.

## [0.1.0] - 2026-07-16

### Added

- Initial public release: seven practical assignments, the `linalg_utils`
  Python library with tests, the TypeScript port, lesson/exercise/solution
  notebooks, demo scripts, cross-language fixtures, MkDocs documentation,
  and the PR-based assignment submission-control workflow.
- Zenodo archival and DOI badge, `CITATION.cff`, and contributor guidance.

[Unreleased]: https://github.com/DiogoRibeiro7/linear-algebra-with-python/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/DiogoRibeiro7/linear-algebra-with-python/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/DiogoRibeiro7/linear-algebra-with-python/releases/tag/v0.1.0
