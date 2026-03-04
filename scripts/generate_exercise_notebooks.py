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


ASSIGNMENTS = [
    ("01", "Matrices: Construction and Classification", [
        "Create zero, identity, diagonal, triangular, and symmetric matrices.",
        "Print dimensions and selected elements; verify structure.",
        "Implement classificar_matriz(A) with the specified labels.",
        "Demonstrate incompatible addition/multiplication errors.",
        "Write reflexao.md (150–250 words).",
    ]),
    ("02", "Matrix Operations and Property Verification", [
        "Compute A+B, A-B, 3A; verify dimensions.",
        "Compute AC and CA; explain dimension mismatch.",
        "Compute commutator [P,Q] and verify identity behavior.",
        "Verify transpose properties computationally.",
        "Show Ax as linear combination of A's columns.",
        "Write reflexao.md (150–250 words).",
    ]),
    ("03", "Determinants and Invertibility", [
        "Implement det_2x2 and det_3x3_sarrus; test invertible/singular.",
        "Implement det_gauss(A) with steps; test 4x4.",
        "Verify determinant properties (product, transpose, scalar, row ops).",
        "Implement eh_invertivel(A); report condition numbers.",
        "Implement inversa_gauss_jordan(A) and verify A*A^-1=I.",
        "Visualize unit square transform with |det(A)| in title.",
        "Write reflexao.md (200–300 words).",
    ]),
    ("04", "Linear Systems: Gauss and Classification", [
        "Implement escalonar(Ab) and substituicao_retroativa(U,b); solve system.",
        "Construct SPI system and show free variable solutions.",
        "Construct SI system and explain contradiction.",
        "Implement classificar_sistema(A,b) using rank analysis; test 5 systems.",
        "Give a parametric solution for a 3-unknowns SPI system.",
        "Compare with built-in solver; show singular behavior.",
        "Create 2D and 3D visualizations of systems.",
        "Write reflexao.md (200–300 words).",
    ]),
    ("05", "Cramer and LU Decomposition", [
        "Implement cramer_2x2 and cramer_3x3; compare with built-in solver.",
        "Compute LU decomposition; verify PA=LU and det(A).",
        "Benchmark Cramer, Gauss, and built-in solver for multiple sizes.",
        "Solve multiple RHS with one LU factorization.",
        "Create heatmap of A, L, U.",
        "Write reflexao.md (200–300 words).",
    ]),
    ("06", "Analytic Geometry: Lines and Planes", [
        "Implement posicao_relativa_retas_2d; visualize 3 cases.",
        "Implement posicao_relativa_retas_3d; visualize 4 cases.",
        "Implement plano_cartesiano_para_parametrico; test 2 planes.",
        "Implement posicao_relativa_planos; test 3 pairs.",
        "Implement intersecao_reta_plano; test 3 cases.",
        "Demonstrate dot product tests for parallelism/perpendicularity.",
        "Create a comprehensive 3D visualization.",
        "Write reflexao.md (200–300 words).",
    ]),
    ("07", "Surfaces of Revolution", [
        "Implement superficie_cilindro, superficie_cone, superficie_esfera; visualize.",
        "Create summary table of standard surfaces.",
        "Visualize sphere cross-sections for radius 2.",
        "Implement superficie_revolucao(curva, eixo, t_range, n); test wavy vase and paraboloid.",
        "Create gallery with cylinder, cone, sphere, wavy vase, paraboloid, hyperboloid.",
        "Write reflexao.md (200–300 words).",
    ]),
]


def build_assignment_notebook(num: str, title: str, tasks: list[str]) -> list[dict]:
    cells: list[dict] = [
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                f"# Assignment {num} Exercises — {title}\n",
                "\n",
                "These exercises mirror the assignment specification in `assignments/ASSIGNMENTS.tex`.\n",
                "Use this notebook to draft your solution steps before submitting to `assignments/submissions/4025XXX/`.\n",
            ],
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": ["## Tasks\n"] + [f"- {task}\n" for task in tasks],
        },
    ]

    for idx, _task in enumerate(tasks, start=1):
        cells.append({
            "cell_type": "code",
            "metadata": {},
            "execution_count": None,
            "outputs": [],
            "source": [
                f"# Task {idx}\n",
                "# TODO: implement this task here.\n",
            ],
        })

    return cells


def main() -> None:
    base = Path("exercises")
    base.mkdir(parents=True, exist_ok=True)
    for num, title, tasks in ASSIGNMENTS:
        cells = build_assignment_notebook(num, title, tasks)
        write_notebook(base / f"{num}_assignment_exercises.ipynb", cells)


if __name__ == "__main__":
    main()
