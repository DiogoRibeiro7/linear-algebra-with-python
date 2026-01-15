from __future__ import annotations

import subprocess
import sys
from pathlib import Path

DEMOS = [
    ("demo_linear_maps.py", "demo_linear_map_unit_circle.png"),
    ("demo_least_squares.py", "demo_least_squares_line_fit.png"),
    ("demo_eigen_2d.py", "demo_eigen_power_iteration.png"),
]


def main() -> None:
    repo_root = Path(__file__).resolve().parents[1]
    figures_dir = repo_root / "assets" / "figures"
    figures_dir.mkdir(parents=True, exist_ok=True)

    generated_files: list[Path] = []
    for script_name, expected_png in DEMOS:
        script_path = repo_root / "scripts" / script_name
        print(f"Running {script_name} ...")
        subprocess.run([sys.executable, str(script_path)], cwd=repo_root, check=True)
        generated_files.append(figures_dir / expected_png)

    print("\nGenerated figure files:")
    for path in generated_files:
        print(f"  {path}")


if __name__ == "__main__":
    main()
