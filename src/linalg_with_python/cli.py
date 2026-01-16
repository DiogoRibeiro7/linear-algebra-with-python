from __future__ import annotations

import argparse
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np

from .cli_helpers import arg_matrix, arg_vector
from .geometry2d import LinearMap2D, unit_circle
from .least_squares import least_squares_qr
from .systems import solve

FIGURES_DIR = Path.cwd() / "assets" / "figures"
FIGURES_DIR.mkdir(parents=True, exist_ok=True)
def plot_linear_map(A: np.ndarray) -> Path:
    if A.shape != (2, 2):
        raise ValueError("Matrix A must be 2×2 for map command.")
    circle = unit_circle()
    mapped = LinearMap2D(A=A).apply(circle)
    fig, ax = plt.subplots(figsize=(6, 6))
    ax.plot(circle[:, 0], circle[:, 1], linestyle=":", color="gray", label="unit circle")
    ax.plot(mapped[:, 0], mapped[:, 1], color="tab:blue", label="A · circle")
    ax.set_aspect("equal", "box")
    ax.set_title("Linear map acting on the unit circle")
    ax.grid(True, linestyle=":")
    ax.legend()
    path = FIGURES_DIR / "cli_map.png"
    fig.savefig(path, dpi=150, bbox_inches="tight")
    plt.close(fig)
    return path


def run_map(args: argparse.Namespace) -> None:
    A = args.A
    path = plot_linear_map(A)
    print(f"Saved unit circle transformation to {path}")


def run_solve(args: argparse.Namespace) -> None:
    A = args.A
    b = args.b
    if A.shape[0] != b.shape[0]:
        raise ValueError("Number of rows in A must equal length of b.")
    result = solve(A, b)
    print("Solution x:", result.x)
    print("Residual norm:", np.linalg.norm(A @ result.x - b))


def run_lsq(args: argparse.Namespace) -> None:
    x = args.xdata
    y = args.ydata
    if x.shape != y.shape:
        raise ValueError("xdata and ydata must have the same length.")
    A = np.column_stack([np.ones_like(x), x])
    result = least_squares_qr(A, y)
    print("Coefficients:", result.x)
    print("Residual norm:", result.residual_norm)


def main() -> None:
    parser = argparse.ArgumentParser(
        prog="linalgpy",
        description="Minimal CLI for visualizing linear maps, solving systems, and fitting lines.",
        epilog=(
            "map -> notebooks/02_matrices_and_linear_maps.ipynb\n"
            "solve -> notebooks/03_solving_linear_systems.ipynb\n"
            "lsq  -> notebooks/04_least_squares_and_projections.ipynb"
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    map_parser = subparsers.add_parser("map", help="Plot how a matrix maps the unit circle.")
    map_parser.add_argument("--A", required=True, type=arg_matrix, help="Matrix entries as 'a,b;c,d'.")
    map_parser.set_defaults(func=run_map)

    solve_parser = subparsers.add_parser("solve", help="Solve Ax = b.")
    solve_parser.add_argument("--A", required=True, type=arg_matrix, help="Matrix entries as 'a,b;c,d'.")
    solve_parser.add_argument("--b", required=True, type=arg_vector, help="Right-hand side as 'x,y'.")
    solve_parser.set_defaults(func=run_solve)

    lsq_parser = subparsers.add_parser("lsq", help="Fit a line via QR least squares.")
    lsq_parser.add_argument("--xdata", required=True, type=arg_vector, help="Comma-separated x values.")
    lsq_parser.add_argument("--ydata", required=True, type=arg_vector, help="Comma-separated y values.")
    lsq_parser.set_defaults(func=run_lsq)

    args = parser.parse_args()
    args.func(args)
