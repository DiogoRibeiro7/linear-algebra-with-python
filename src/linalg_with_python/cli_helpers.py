from __future__ import annotations

import argparse

import numpy as np
import numpy.typing as npt

FloatArray = npt.NDArray[np.floating]


def _parse_rows(raw: str) -> list[list[float]]:
    rows = [row.strip() for row in raw.split(";") if row.strip()]
    if not rows:
        raise ValueError("Matrix string is empty; include at least one row.")
    parsed = []
    for row in rows:
        raw_items = row.split(",")
        if any(item.strip() == "" for item in raw_items):
            raise ValueError("Empty entry detected in matrix row.")
        entries = [entry.strip() for entry in raw_items]
        parsed.append([float(entry) for entry in entries])
    lengths = {len(r) for r in parsed}
    if len(lengths) != 1:
        raise ValueError("All rows must have the same number of entries.")
    return parsed


def parse_matrix_string(value: str) -> FloatArray:
    """
    Convert a string like \"1,2;3,4\" into an ndarray.

    The helper avoids reused parsing logic inside `cli.py` and raises a clear
    `ValueError` when the format is wrong (which the CLI wraps as `ArgumentTypeError`).
    """
    rows = _parse_rows(value)
    return np.array(rows, dtype=np.float64)


def parse_vector_string(value: str) -> FloatArray:
    """
    Convert a comma-separated vector string into an ndarray.
    """
    entries = [entry.strip() for entry in value.split(",") if entry.strip()]
    if not entries:
        raise ValueError("Vector string is empty; provide comma-separated numbers.")
    return np.array([float(entry) for entry in entries], dtype=np.float64)


def arg_matrix(value: str) -> FloatArray:
    try:
        return parse_matrix_string(value)
    except ValueError as err:  # pragma: no cover - defensive
        raise argparse.ArgumentTypeError(f"{err} See `notebooks/02_matrices_and_linear_maps.ipynb` for examples.") from err


def arg_vector(value: str) -> FloatArray:
    try:
        return parse_vector_string(value)
    except ValueError as err:
        raise argparse.ArgumentTypeError(
            f"{err} Vectors appear in `notebooks/03_solving_linear_systems.ipynb` and CLI demos."
        ) from err
