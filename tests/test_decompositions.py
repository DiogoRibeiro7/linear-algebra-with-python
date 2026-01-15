from __future__ import annotations

import numpy as np

from linalg_with_python.checks import is_orthonormal
from linalg_with_python.decompositions import qr_gram_schmidt


def test_qr_columns_orthonormal_and_reconstructs() -> None:
    rng = np.random.default_rng(1)
    A = rng.normal(size=(5, 3))
    result = qr_gram_schmidt(A, method="modified")
    assert is_orthonormal(result.Q)
    reconstruction = result.Q @ result.R
    assert np.linalg.norm(A - reconstruction) < 1e-10


def test_qr_return_full_shapes_and_orthonormal() -> None:
    rng = np.random.default_rng(2)
    A = rng.normal(size=(5, 3))
    result = qr_gram_schmidt(A, return_full=True)
    m, n = A.shape
    assert result.Q.shape == (m, m)
    assert result.R.shape == (m, n)
    assert is_orthonormal(result.Q)
    reconstruction = result.Q[:, :n] @ result.R[:n, :]
    assert np.linalg.norm(A - reconstruction) < 1e-10
