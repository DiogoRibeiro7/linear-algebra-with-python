from pathlib import Path

__all__ = ["contrib_template_path"]

contrib_template_path = Path(__file__).resolve().parent / "contributing_template.md"
