from __future__ import annotations
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from linalg_with_python.decompositions import qr_gram_schmidt

def main() -> None:
    rng = np.random.default_rng(0)
    x = np.linspace(-2.0, 2.0, 40)
    y = 1.0 + 2.0 * x + rng.normal(scale=0.6, size=x.shape)

    A = np.column_stack([np.ones_like(x), x])
    qr = qr_gram_schmidt(A, method="modified")
    coef = np.linalg.solve(qr.R, qr.Q.T @ y)
    y_hat = A @ coef

    fig, ax = plt.subplots()
    ax.scatter(x, y, label="data")
    ax.plot(x, y_hat, label="LS fit")
    ax.set_title("Least squares via QR (modified GS)")
    ax.grid(True)
    ax.legend()

    out_dir = ROOT / "assets" / "figures"
    out_dir.mkdir(parents=True, exist_ok=True)
    fig.savefig(out_dir / "demo_least_squares_line_fit.png", dpi=160, bbox_inches="tight")
    plt.close(fig)

if __name__ == "__main__":
    main()
