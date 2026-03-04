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
    from linalg_utils.least_squares import least_squares_qr

    rng = np.random.default_rng(0)
    x = np.linspace(-2.0, 2.0, 40)
    y = 1.0 + 2.0 * x + rng.normal(scale=0.6, size=x.shape)

    A = np.column_stack([np.ones_like(x), x])
    result = least_squares_qr(A, y)
    y_hat = A @ result.x

    fig, ax = plt.subplots()
    ax.scatter(x, y, label="data")
    ax.plot(x, y_hat, label="LS fit")
    ax.set_title("Least squares via QR (modified GS)")
    ax.grid(True)
    ax.legend()

    out_dir = _ROOT / "assets" / "figures"
    out_dir.mkdir(parents=True, exist_ok=True)
    fig.savefig(out_dir / "demo_least_squares_line_fit.png", dpi=160, bbox_inches="tight")
    plt.close(fig)

if __name__ == "__main__":
    main()
