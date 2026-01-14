from __future__ import annotations
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from linalg_with_python.eigen import power_iteration
from linalg_with_python.geometry2d import LinearMap2D, unit_circle

def main() -> None:
    A = np.array([[1.1, 0.2], [0.1, 0.9]], dtype=np.float64)
    res = power_iteration(A, seed=1)
    v = res.eigenvector

    pts = unit_circle(500)
    pts2 = LinearMap2D(A=A).apply(pts)

    fig, ax = plt.subplots()
    ax.plot(pts[:, 0], pts[:, 1], label="unit circle")
    ax.plot(pts2[:, 0], pts2[:, 1], label="A * unit circle", linestyle="--")
    ax.arrow(0.0, 0.0, v[0], v[1], head_width=0.05, length_includes_head=True)
    ax.set_aspect("equal", adjustable="box")
    ax.set_title(f"Power iteration: λ≈{res.eigenvalue:.4f}")
    ax.grid(True)
    ax.legend()

    out_dir = ROOT / "assets" / "figures"
    out_dir.mkdir(parents=True, exist_ok=True)
    fig.savefig(out_dir / "demo_eigen_power_iteration.png", dpi=160, bbox_inches="tight")
    plt.close(fig)

if __name__ == "__main__":
    main()
