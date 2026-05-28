from __future__ import annotations

import sys
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

_ROOT = Path(__file__).resolve().parents[1]
_SRC_PATH = _ROOT / "packages" / "python" / "src"

def _ensure_src_in_path() -> None:
    src_str = str(_SRC_PATH)
    if src_str not in sys.path:
        sys.path.insert(0, src_str)

def main() -> None:
    _ensure_src_in_path()

    rng = np.random.default_rng(0)
    n = 120
    x = rng.normal(size=n)
    y = 2.0 * x + rng.normal(scale=0.5, size=n)
    data = np.column_stack([x, y])

    mean = data.mean(axis=0)
    centered = data - mean

    _, _, Vt = np.linalg.svd(centered, full_matrices=False)
    pc1 = Vt[0]

    scores = centered @ pc1
    projected = np.outer(scores, pc1)

    fig, ax = plt.subplots()
    ax.scatter(centered[:, 0], centered[:, 1], alpha=0.4, label="original")
    ax.scatter(projected[:, 0], projected[:, 1], alpha=0.7, label="projected")
    scale = 3.0 * np.std(scores)
    ax.plot(
        [-scale * pc1[0], scale * pc1[0]],
        [-scale * pc1[1], scale * pc1[1]],
        "k--",
        linewidth=1.5,
        label="PC1",
    )
    ax.set_aspect("equal", adjustable="box")
    ax.set_title("Projection onto PC1")
    ax.grid(True)
    ax.legend()

    out_dir = _ROOT / "assets" / "figures"
    out_dir.mkdir(parents=True, exist_ok=True)
    fig.savefig(out_dir / "demo_pca_projection.png", dpi=160, bbox_inches="tight")
    plt.close(fig)

if __name__ == "__main__":
    main()
