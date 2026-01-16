from __future__ import annotations

from typing import Iterable

import numpy as np
import numpy.typing as npt

FloatArray = npt.NDArray[np.floating]


def block_diag(*matrices: npt.ArrayLike) -> FloatArray:
    """
    Construct the block diagonal matrix from the provided matrices.

    Each block is placed along the diagonal; the off-diagonal blocks are zero.
    Useful for combining independent linear maps into one larger transform.
    """
    blocks = [np.asarray(mat, dtype=np.float64) for mat in matrices]
    total_rows = sum(b.shape[0] for b in blocks)
    total_cols = sum(b.shape[1] for b in blocks)
    result = np.zeros((total_rows, total_cols), dtype=np.float64)
    row = col = 0
    for block in blocks:
        rows, cols = block.shape
        result[row : row + rows, col : col + cols] = block
        row += rows
        col += cols
    return result


def block_matrix_multiply(
    A_blocks: Iterable[Iterable[npt.ArrayLike]],
    B_blocks: Iterable[Iterable[npt.ArrayLike]],
) -> FloatArray:
    """
    Multiply block matrices by assembling them into dense matrices.

    Blocks are stacked to form the full matrices before multiplication, keeping the geometric structure explicit.
    """
    def assemble(block_rows: Iterable[Iterable[npt.ArrayLike]]) -> FloatArray:
        rows = [
            np.hstack([np.asarray(block, dtype=np.float64) for block in row])
            for row in block_rows
        ]
        return np.vstack(rows)

    A_full = assemble(A_blocks)
    B_full = assemble(B_blocks)
    return A_full @ B_full
