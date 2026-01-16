"""Generate figures for Notebook 02: Matrices and linear maps."""

import numpy as np
import matplotlib.pyplot as plt


def unit_circle(num=200):
    theta = np.linspace(0, 2 * np.pi, num)
    return np.column_stack((np.cos(theta), np.sin(theta)))


def rotation(theta):
    return np.array([[np.cos(theta), -np.sin(theta)], [np.sin(theta), np.cos(theta)]])


def scaling(sx, sy):
    return np.diag([sx, sy])


def shear(k):
    return np.array([[1, k], [0, 1]])


def reflection(theta):
    R = rotation(theta)
    return R @ np.diag([1, -1]) @ R.T


def main():
    A = np.array([[1.5, 0.5], [-0.5, 1.2]])
    x = np.array([1.0, 2.0])
    Ax = A @ x

    fig, ax = plt.subplots(figsize=(5, 5))
    ax.quiver(0, 0, x[0], x[1], angles="xy", scale_units="xy", scale=1, color="tab:blue", label="x")
    ax.quiver(0, 0, Ax[0], Ax[1], angles="xy", scale_units="xy", scale=1, color="tab:orange", label="Ax")
    ax.set_xlim(-1, 3)
    ax.set_ylim(-1, 3)
    ax.set_aspect("equal")
    ax.set_title("Matrix action on a vector")
    ax.grid(True)
    ax.legend()
    fig.savefig("assets/figures/nb02_matrix_action.png")

    E = np.eye(2)
    mapped = (A @ E.T).T
    fig, ax = plt.subplots(figsize=(5, 5))
    colors = ["tab:blue", "tab:orange"]
    for i, (basis, mapped_vec) in enumerate(zip(E, mapped)):
        ax.quiver(
            0, 0, basis[0], basis[1], angles="xy", scale_units="xy", scale=1, color=colors[i], label=f"e{i+1}"
        )
        ax.quiver(
            0, 0, mapped_vec[0], mapped_vec[1], angles="xy", scale_units="xy", scale=1, color=colors[i], label=f"Ae{i+1}"
        )
    ax.set_xlim(-1, 2)
    ax.set_ylim(-1, 2)
    ax.set_aspect("equal")
    ax.set_title("Basis vectors under the linear map")
    ax.grid(True)
    ax.legend()
    fig.savefig("assets/figures/nb02_basis_vectors.png")

    square = np.array([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]])
    mapped_square = (A @ square.T).T
    fig, ax = plt.subplots(figsize=(6, 4))
    ax.plot(square[:, 0], square[:, 1], "-o", label="unit square", color="tab:gray")
    ax.plot(mapped_square[:, 0], mapped_square[:, 1], "-o", label="A applied", color="tab:green")
    ax.set_aspect("equal")
    ax.set_title("Unit square and its image")
    ax.grid(True)
    ax.legend()
    fig.savefig("assets/figures/nb02_unit_square.png")

    circle = unit_circle()
    mapped_circle = (A @ circle.T).T
    fig, ax = plt.subplots(figsize=(5, 5))
    ax.plot(circle[:, 0], circle[:, 1], label="unit circle", color="tab:gray")
    ax.plot(mapped_circle[:, 0], mapped_circle[:, 1], label="A circle", color="tab:purple")
    ax.set_aspect("equal")
    ax.set_title("Unit circle under A")
    ax.grid(True)
    ax.legend()
    fig.savefig("assets/figures/nb02_unit_circle.png")

    examples = [
        ("Rotation (30 deg)", rotation(np.pi / 6)),
        ("Anisotropic scaling", scaling(1.5, 0.5)),
        ("Shear (k=1)", shear(1)),
        ("Reflection (45 deg)", reflection(np.pi / 4)),
    ]
    fig, axes = plt.subplots(2, 2, figsize=(10, 8))
    circle = unit_circle()
    for ax, (title, M) in zip(axes.ravel(), examples):
        transformed = (M @ circle.T).T
        ax.plot(circle[:, 0], circle[:, 1], color="tab:gray", label="unit circle")
        ax.plot(transformed[:, 0], transformed[:, 1], color="tab:cyan", label="transformed")
        ax.set_aspect("equal")
        ax.set_title(title)
        ax.grid(True)
        ax.legend()
    fig.tight_layout()
    fig.savefig("assets/figures/nb02_examples_rotation_scaling_shear_reflection.png")


if (__name__ == "__main__"):
    main()
