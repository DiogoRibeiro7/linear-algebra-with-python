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
    from linalg_utils.systems import solve

    # Well-conditioned matrix
    A_good = np.array([[2.0, 1.0], [1.0, 3.0]], dtype=np.float64)
    # Ill-conditioned matrix (nearly singular)
    A_bad = np.array([[1.0, 1.0], [1.0, 1.0 + 1e-8]], dtype=np.float64)

    b = np.array([3.0, 4.0], dtype=np.float64)
    x_good = solve(A_good, b).x
    x_bad = solve(A_bad, b).x

    perturbations = np.geomspace(1e-12, 1e-2, 50)
    rng = np.random.default_rng(0)

    changes_good = []
    changes_bad = []

    for eps in perturbations:
        db = rng.normal(size=b.shape)
        db = db / np.linalg.norm(db) * eps
        dx_good = np.linalg.norm(solve(A_good, b + db).x - x_good)
        dx_bad = np.linalg.norm(solve(A_bad, b + db).x - x_bad)
        changes_good.append(dx_good)
        changes_bad.append(dx_bad)

    cond_good = np.linalg.cond(A_good)
    cond_bad = np.linalg.cond(A_bad)

    fig, ax = plt.subplots()
    ax.loglog(perturbations, changes_good, label=f"well-cond (κ={cond_good:.1f})")
    ax.loglog(perturbations, changes_bad, label=f"ill-cond (κ={cond_bad:.1e})")
    ax.set_xlabel("‖δb‖")
    ax.set_ylabel("‖δx‖")
    ax.set_title("Conditioning sensitivity")
    ax.grid(True, which="both", ls="--", alpha=0.5)
    ax.legend()

    out_dir = _ROOT / "assets" / "figures"
    out_dir.mkdir(parents=True, exist_ok=True)
    fig.savefig(out_dir / "conditioning_sensitivity.png", dpi=160, bbox_inches="tight")
    plt.close(fig)

if __name__ == "__main__":
    main()
