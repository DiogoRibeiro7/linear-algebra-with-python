# Capstone project: Linear algebra in action

This capstone invitation lets students apply the linear-algebra-with-python modules, demos, and CLI to a meaningful dataset. Choose one track and follow the rubric below.

## Track A — Least squares & geometry (recommended)
1. Fit a model to noisy data points (e.g., affine line or quadratic curve).
2. Justify why QR (e.g., `least_squares_qr`) is preferred over the normal equations for your dataset.
3. Interpret the residual vector: show its norm, projection onto the column space, and why it matters for prediction.
4. Visualize the data, model, and projection onto the subspace (reuse `assets/figures/` for output).

## Track B — Eigen/SVD application
1. Choose a simple 2D dataset with correlated features.
2. Use SVD (or `eigen_2x2`) to extract principal directions or eigenvectors.
3. Visualize the dataset before/after projection onto dominant modes.
4. Explain how the singular values/eigenvalues relate to variance/stretch of the data.

## Rubric
| Criteria | Excellent | Acceptable |
| --- | --- | --- |
| Analysis | Clear storyline, references to modules, and justifies method choice with geometric language. | Describes operations but may lack rigor in justification. |
| Code | Uses `src` helpers (`least_squares`, `eigen`, `checks`), demos/scripts regenerate figures, CLI optionally demonstrated. | Code runs, is well structured, but may skip CLI or helper modules. |
| Figures | Figures saved to `assets/figures/`, labeled, and referenced from the write-up. | Figures saved and referenced but missing labels or context. |
| Reflection | Includes a conclusion section (notebook cell) summarizing residuals or variance interpretation. | Has a short textual summary without deep interpretation. |

## Getting started
1. Copy `capstone/starter.ipynb` and work inside it (or edit directly).
2. Keep saving plots into `assets/figures/` with descriptive filenames.
3. When ready, compare your solution to `capstone/solution.ipynb` for guidance or grading.
4. Mention in your submission the notebook path, figures created, and CLI/demo commands you used.
