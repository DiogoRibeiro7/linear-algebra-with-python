from __future__ import annotations
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from linalg_with_python.geometry2d import LinearMap2D, unit_circle

def main() -> None:
    A = np.array([[1.2, 0.8], [0.0, 0.9]], dtype=np.float64)
    pts = unit_circle(500)
    pts2 = LinearMap2D(A=A).apply(pts)

    fig, ax = plt.subplots()
    ax.plot(pts[:, 0], pts[:, 1], label="unit circle")
    ax.plot(pts2[:, 0], pts2[:, 1], label="A * unit circle", linestyle="--")
    ax.set_aspect("equal", adjustable="box")
    ax.set_title("2D linear map")
    ax.grid(True)
    ax.legend()

    out_dir = ROOT / "assets" / "figures"
    out_dir.mkdir(parents=True, exist_ok=True)
    fig.savefig(out_dir / "demo_linear_map_unit_circle.png", dpi=160, bbox_inches="tight")
    plt.close(fig)

if __name__ == "__main__":
    main()
