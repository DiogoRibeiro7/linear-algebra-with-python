import json
from pathlib import Path


def write_notebook(path: Path, cells: list[dict]) -> None:
    notebook = {
        "cells": cells,
        "metadata": {
            "kernelspec": {"display_name": "Python 3", "language": "python", "name": "python3"},
            "language_info": {"name": "python"},
        },
        "nbformat": 4,
        "nbformat_minor": 5,
    }
    path.write_text(json.dumps(notebook, indent=2), encoding="utf-8")


def build_matrices_exercise() -> list[dict]:
    return [
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "# Matrices exercises\n",
                "Tackle each task by filling in the `TODO` sections. Keep your answers short and save any figures under `assets/figures/`. "
                "You can reuse `linalg_with_python.geometry2d` helpers to stay consistent with the lessons.\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 1 — build and apply a transform\n",
                "Create a matrix that rotates by 30° and scales the x-axis by 1.2. Apply it to `[1, 0.5]` and print both vectors.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "import numpy as np\n",
                "from linalg_with_python import geometry2d\n",
                "\n",
                "# TODO: define your transformation matrix\n",
                "transform = np.eye(2)\n",
                "v = np.array([1.0, 0.5])\n",
                "mapped = transform @ v\n",
                "print('Original:', v)\n",
                "print('Mapped:', mapped)\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 2 — basis vectors\n",
                "Use `LinearMap2D` to map `e1` and `e2`. Explain whether the transformed basis is still orthogonal.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "lm = geometry2d.LinearMap2D(transform)\n",
                "basis = np.eye(2)\n",
                "# TODO: map each basis vector and inspect dot products\n",
                "mapped_basis = geometry2d.apply_linear_map(transform, basis)\n",
                "print('DOT product between mapped e1 and e2:', np.dot(mapped_basis[0], mapped_basis[1]))\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 3 — unit square boundary\n",
                "Generate `unit_square(120)` and plot both the original and transformed polygons.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "square = geometry2d.unit_square(120)\n",
                "# TODO: apply `geometry2d.apply_linear_map` and visualize the polygons\n",
                "square_mapped = geometry2d.apply_linear_map(transform, square)\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 4 — unit circle\n",
                "Map the `unit_circle()` through your matrix and report the max distance between transformed points.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "circle = geometry2d.unit_circle()\n",
                "circle_mapped = geometry2d.apply_linear_map(transform, circle)\n",
                "# TODO: compute how far transformed points stray from the origin\n",
                "distances = np.linalg.norm(circle_mapped, axis=1)\n",
                "print('Max radius:', distances.max())\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 5 — composition\n",
                "Compose your matrix with a shear (k=0.5) and invert the result. What happens to the unit square?\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "shear = np.array([[1.0, 0.5], [0.0, 1.0]])\n",
                "composed = shear @ transform\n",
                "# TODO: invert `composed` and apply to the mapped square\n",
                "inv_composed = np.linalg.inv(composed)\n",
                "recovered = geometry2d.apply_linear_map(inv_composed, square_mapped)\n",
                "print('Recovered first vertex:', recovered[0])\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 6 — eigen-direction\n",
                "Guess a vector that might be stretched the most, apply the transform, and compare length ratios.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "candidate = np.array([1.0, 1.0])\n",
                "mapped_candidate = geometry2d.apply_linear_map(transform, candidate[np.newaxis, :])[0]\n",
                "# TODO: compute stretching factor\n",
                "print('Stretch factor:', np.linalg.norm(mapped_candidate) / np.linalg.norm(candidate))\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 7 — manual convention\n",
                "Recompute the map manually using `(A @ pts.T).T` and compare with `apply_linear_map`.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "manual = (transform @ square.T).T\n",
                "# TODO: confirm manual equals helper\n",
                "print('Difference:', np.max(np.abs(manual - square_mapped)))\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 8 — reflection comparison\n",
                "Construct a reflection matrix across the x-axis and check how it affects the unit circle.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "reflection = np.diag([1.0, -1.0])\n",
                "reflected = geometry2d.apply_linear_map(reflection, circle)\n",
                "# TODO: verify circle closes and the y-coordinates flip\n",
                "print('Y min before:', circle[:, 1].min(), 'after:', reflected[:, 1].min())\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Check your work\n",
                "- The transformed basis should remain linearly independent with a small dot product between mapped vectors.\n",
                "- The unit square should stay closed; `square[0] == square[-1]` after mapping.\n",
                "- The circle search radius should fluctuate but remain finite and sensible.\n",
                "- Inversion of the composed map should recover the original polygon to numerical precision.\n",
            ],
        },
    ]


def build_systems_exercise() -> list[dict]:
    return [
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "# Solving linear systems exercises\n",
                "Work through each task, comment on conditioning, and document the shape of residuals or solution norms in the final section.\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 1 — simple solve\n",
                "Solve `A x = b` for a well-conditioned `A` and print the solution.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "import numpy as np\n",
                "A = np.array([[3.0, 1.0], [1.0, 2.0]])\n",
                "b = np.array([9.0, 8.0])\n",
                "# TODO: solve and print\n",
                "x = np.linalg.solve(A, b)\n",
                "print('Solution:', x)\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 2 — residual\n",
                "Compute the residual `Ax - b` and describe its norm.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "residual = A @ x - b\n",
                "# TODO: report norm\n",
                "print('Residual norm:', np.linalg.norm(residual))\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 3 — conditioning check\n",
                "Use `np.linalg.cond` to inspect the matrix's condition number and note whether it's well-conditioned.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "# TODO: compute condition number\n",
                "print('Condition number:', np.linalg.cond(A))\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 4 — perturbed RHS\n",
                "Perturb `b` slightly and solve again. Compare the change in solution to the perturbation size.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "delta = 1e-3\n",
                "b_perturbed = b + np.array([delta, -delta])\n",
                "# TODO: solve and compare\n",
                "x_pert = np.linalg.solve(A, b_perturbed)\n",
                "print('Perturbed change:', np.linalg.norm(x_pert - x))\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 5 — nearly singular matrix\n",
                "Create a matrix with rows nearly parallel and observe solver warnings or residuals.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "A_bad = np.array([[1.0, 1.0], [1.0, 1.001]])\n",
                "b_bad = np.array([2.0, 2.001])\n",
                "# TODO: solve with `np.linalg.lstsq` as fallback\n",
                "x_bad, *_ = np.linalg.lstsq(A_bad, b_bad, rcond=None)\n",
                "print('Ill-conditioned solution:', x_bad)\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 6 — residual sensitivity plot\n",
                "Plot solution change vs `delta` by sweeping perturbation magnitude.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "deltas = np.logspace(-6, -1, 5)\n",
                "errors = []\n",
                "for eps in deltas:\n",
                "    b_eps = b + np.array([eps, -eps])\n",
                "    x_eps = np.linalg.solve(A, b_eps)\n",
                "    errors.append(np.linalg.norm(x_eps - x))\n",
                "# TODO: plot `errors` vs `deltas`\n",
                "print('Deltas:', deltas)\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 7 — matrix and residual norms\n",
                "Compute `||A||_2`, `||A^{-1}||_2` (if available), and compare to the solution change.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "A_norm = np.linalg.norm(A, 2)\n",
                "A_inv_norm = np.linalg.norm(np.linalg.inv(A), 2)\n",
                "print('Matrix norm:', A_norm)\n",
                "print('Inverse norm:', A_inv_norm)\n",
                "# TODO: interpret how these relate to the residual\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 8 — reflect on conditioning\n",
                "Summarize how residuals and condition numbers guided your intuition.\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Check your work\n",
                "- Solutions should stay bounded for small perturbations when the matrix is well-conditioned.\n",
                "- Ill-conditioned matrices produce large residuals/resolution errors even for tiny `delta`.\n",
                "- Residual vectors `Ax - b` should be nearly zero for accurate solvers.\n",
                "- Norm comparisons clarify why `np.linalg.cond(A)` is useful for predicting sensitivity.\n",
            ],
        },
    ]


def build_least_squares_exercise() -> list[dict]:
    return [
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "# Least squares exercises\n",
                "Apply both normal equations and QR/Gram-Schmidt solvers, compare residuals, and plot the fits.\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 1 — design matrix\n",
                "Create a Vandermonde-style design matrix for data `x = [0, 1, 2, 3]` and `y = [1, 3, 7, 13]`.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "import numpy as np\n",
                "from linalg_with_python import least_squares\n",
                "\n",
                "x = np.array([0.0, 1.0, 2.0, 3.0])\n",
                "y = np.array([1.0, 3.0, 7.0, 13.0])\n",
                "# TODO: build matrix [x, ones(x)]\n",
                "A = np.vstack([x, np.ones_like(x)]).T\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 2 — normal equations\n",
                "Use `(A.T @ A) @ x = A.T @ y` to fit and note residual norm.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "normal_x = np.linalg.inv(A.T @ A) @ A.T @ y\n",
                "# TODO: compute residual\n",
                "residual_normal = np.linalg.norm(A @ normal_x - y)\n",
                "print('Normal residual:', residual_normal)\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 3 — QR solver\n",
                "Use `least_squares.least_squares_qr` and compare the `residual_norm` to the normal equation.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "qr_result = least_squares.least_squares_qr(A, y)\n",
                "# TODO: report result\n",
                "print('QR residual:', qr_result.residual_norm)\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 4 — compare coefficients\n",
                "Print out the fitted coefficients from both methods and look for subtle differences.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "print('Normal coeffs:', normal_x)\n",
                "print('QR coeffs:', qr_result.x)\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 5 — plot data + fit\n",
                "Use matplotlib to plot the points plus the QR fit line.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "import matplotlib.pyplot as plt\n",
                "plt.plot(x, y, 'o', label='data')\n",
                "plt.plot(x, A @ qr_result.x, '-', label='QR fit')\n",
                "# TODO: add labels/title\n",
                "plt.title('Least squares fit')\n",
                "plt.legend()\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 6 — projection residual\n",
                "Compute `projected = A @ qr_result.x` and inspect whether `y - projected` is orthogonal to `A`'s columns.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "proj = A @ qr_result.x\n",
                "res = y - proj\n",
                "# TODO: check orthogonality with columns\n",
                "print('Dot with first col:', np.dot(res, A[:, 0]))\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 7 — relative error\n",
                "Use `least_squares.RelativeError` (or compute manually) to compare normal vs QR results.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "relative_error = np.linalg.norm(normal_x - qr_result.x) / np.linalg.norm(qr_result.x)\n",
                "# TODO: interpret this number\n",
                "print('Relative diff:', relative_error)\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Task 8 — reflection\n",
                "What happens if you reflect the data across the vertical axis before fitting? Does QR still win?\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "A_reflect = A.copy()\n",
                "A_reflect[:, 0] *= -1\n",
                "qr_reflect = least_squares.least_squares_qr(A_reflect, y)\n",
                "# TODO: compare residuals to previous ones\n",
                "print('Reflected residual:', qr_reflect.residual_norm)\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Check your work\n",
                "- Residuals should shrink after QR compared to the normal equations on ill-conditioned data.\n",
                "- The projection residual should be orthogonal to each column of `A`.\n",
                "- Relative differences near machine tolerance indicate consistent results.\n",
                "- Reflection should only affect the sign/drop of coefficients, not the residual magnitude.\n",
            ],
        },
    ]


def build_matrices_solution() -> list[dict]:
    return [
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "# Matrices exercises — solutions\n",
                "Filled answers for each task with explanations and expected behavior.\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "import numpy as np\n",
                "from linalg_with_python import geometry2d\n",
                "\n",
                "transform = (\n",
                "    np.array([[np.cos(np.pi / 6), -np.sin(np.pi / 6)], [np.sin(np.pi / 6), np.cos(np.pi / 6)]])\n",
                "    @ np.diag([1.2, 1.0])\n",
                ")\n",
                "v = np.array([1.0, 0.5])\n",
                "mapped = transform @ v\n",
                "print('Original:', v)\n",
                "print('Mapped:', mapped)\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "basis = np.eye(2)\n",
                "mapped_basis = geometry2d.apply_linear_map(transform, basis)\n",
                "print('Dot product between mapped basis:', np.dot(mapped_basis[0], mapped_basis[1]))\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "square = geometry2d.unit_square(120)\n",
                "square_mapped = geometry2d.apply_linear_map(transform, square)\n",
                "print('First corner map:', square[0], '->', square_mapped[0])\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "circle = geometry2d.unit_circle()\n",
                "circle_mapped = geometry2d.apply_linear_map(transform, circle)\n",
                "print('Max radius after map:', np.max(np.linalg.norm(circle_mapped, axis=1)))\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "shear = np.array([[1.0, 0.5], [0.0, 1.0]])\n",
                "composed = shear @ transform\n",
                "inv_composed = np.linalg.inv(composed)\n",
                "recovered = geometry2d.apply_linear_map(inv_composed, square_mapped)\n",
                "print('Recovered first vertex close to original:', np.allclose(recovered[0], square[0]))\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "candidate = np.array([1.0, 1.0])\n",
                "mapped_candidate = geometry2d.apply_linear_map(transform, candidate[np.newaxis, :])[0]\n",
                "print('Stretch factor:', np.linalg.norm(mapped_candidate) / np.linalg.norm(candidate))\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "square = geometry2d.unit_square(120)\n",
                "mapped_square = geometry2d.apply_linear_map(transform, square)\n",
                "manual = (transform @ square.T).T\n",
                "print('Manual difference:', np.max(np.abs(manual - mapped_square)))\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "reflection = np.diag([1.0, -1.0])\n",
                "circle = geometry2d.unit_circle()\n",
                "reflected = geometry2d.apply_linear_map(reflection, circle)\n",
                "print('Y min before vs after:', circle[:, 1].min(), reflected[:, 1].min())\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Check your work\n",
                "- Mapped basis dot product should stay near zero to confirm linear independence.\n",
                "- The square is closed and recovers under inversion, meaning composed maps behave geometrically.\n",
                "- Stretch factors show which directions dominate the map.\n",
            ],
        },
    ]


def build_systems_solution() -> list[dict]:
    cells = [
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": ["# Systems exercises — solutions\n", "Answers and commentary for each task.\n"],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": ["import numpy as np\n", "A = np.array([[3.0, 1.0], [1.0, 2.0]])\n", "b = np.array([9.0, 8.0])\n", "x = np.linalg.solve(A, b)\n", "print('Solution:', x)\n"],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": ["residual = A @ x - b\n", "print('Residual norm:', np.linalg.norm(residual))\n"],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": ["print('Condition number:', np.linalg.cond(A))\n"],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": ["delta = 1e-3\n", "b_perturbed = b + np.array([delta, -delta])\n", "x_pert = np.linalg.solve(A, b_perturbed)\n", "print('Perturbed change:', np.linalg.norm(x_pert - x))\n"],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": ["A_bad = np.array([[1.0, 1.0], [1.0, 1.001]])\n", "b_bad = np.array([2.0, 2.001])\n", "x_bad, *_ = np.linalg.lstsq(A_bad, b_bad, rcond=None)\n", "print('Ill-conditioned solution:', x_bad)\n"],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "deltas = np.logspace(-6, -1, 5)\n",
                "errors = []\n",
                "for eps in deltas:\n",
                "    b_eps = b + np.array([eps, -eps])\n",
                "    x_eps = np.linalg.solve(A, b_eps)\n",
                "    errors.append(np.linalg.norm(x_eps - x))\n",
                "print('Errors:', errors)\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "A_norm = np.linalg.norm(A, 2)\n",
                "A_inv_norm = np.linalg.norm(np.linalg.inv(A), 2)\n",
                "print('Matrix norm:', A_norm)\n",
                "print('Inverse norm:', A_inv_norm)\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Check your work\n",
                "- Residuals should be tiny for well-conditioned systems.\n",
                "- Perturbation sweeps show solution sensitivity increases with ill-conditioning.\n",
            ],
        },
    ]
    return cells


def build_least_squares_solution() -> list[dict]:
    cells = [
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": ["# Least squares solutions\n", "Completed tasks for each prompt.\n"],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "import numpy as np\n",
                "import matplotlib.pyplot as plt\n",
                "from linalg_with_python import least_squares\n",
                "\n",
                "x = np.array([0.0, 1.0, 2.0, 3.0])\n",
                "y = np.array([1.0, 3.0, 7.0, 13.0])\n",
                "A = np.vstack([x, np.ones_like(x)]).T\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "normal_x = np.linalg.inv(A.T @ A) @ A.T @ y\n",
                "print('Normal residual:', np.linalg.norm(A @ normal_x - y))\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": ["qr_result = least_squares.least_squares_qr(A, y)\n", "print('QR residual:', qr_result.residual_norm)\n"],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "print('Coefficients normal:', normal_x)\n",
                "print('Coefficients QR:', qr_result.x)\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "plt.plot(x, y, 'o', label='data')\n",
                "plt.plot(x, A @ qr_result.x, '-', label='QR fit')\n",
                "plt.title('Least squares fit')\n",
                "plt.legend()\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "residual = y - A @ qr_result.x\n",
                "print('Dot with first column:', np.dot(residual, A[:, 0]))\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "relative_error = np.linalg.norm(normal_x - qr_result.x) / np.linalg.norm(qr_result.x)\n",
                "print('Relative diff:', relative_error)\n",
            ],
        },
        {
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                "A_reflect = A.copy()\n",
                "A_reflect[:, 0] *= -1\n",
                "qr_reflect = least_squares.least_squares_qr(A_reflect, y)\n",
                "print('Reflected residual:', qr_reflect.residual_norm)\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## Check your work\n",
                "- QR residual should be equal or smaller than normal equations on stable data.\n",
                "- Projection residual dot products should be near zero.\n",
            ],
        },
    ]
    return cells


def main() -> None:
    base = Path("exercises")
    sol_base = Path("solutions")
    write_notebook(base / "02_matrices_exercises.ipynb", build_matrices_exercise())
    write_notebook(base / "03_systems_exercises.ipynb", build_systems_exercise())
    write_notebook(base / "04_least_squares_exercises.ipynb", build_least_squares_exercise())

    write_notebook(sol_base / "02_matrices_exercises.ipynb", build_matrices_solution())
    write_notebook(sol_base / "03_systems_exercises.ipynb", build_systems_solution())
    write_notebook(sol_base / "04_least_squares_exercises.ipynb", build_least_squares_solution())


if __name__ == "__main__":
    main()
