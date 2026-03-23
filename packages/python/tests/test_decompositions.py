from __future__ import annotations

import numpy as np
import pytest

from linalg_utils.decompositions import qr_gram_schmidt


def test_qr_identity() -> None:
    A = np.eye(3)
    Q, R = qr_gram_schmidt(A)
    np.testing.assert_allclose(Q, np.eye(3), atol=1e-12)
    np.testing.assert_allclose(R, np.eye(3), atol=1e-12)


def test_qr_reconstructs_original() -> None:
    A = np.array([[1, 1], [0, 1], [1, 0]], dtype=np.float64)
    Q, R = qr_gram_schmidt(A)
    np.testing.assert_allclose(Q @ R, A, atol=1e-9)


def test_qr_q_orthonormal() -> None:
    rng = np.random.default_rng(42)
    A = rng.normal(size=(5, 3))
    Q, _ = qr_gram_schmidt(A)
    np.testing.assert_allclose(Q.T @ Q, np.eye(3), atol=1e-9)


def test_qr_r_upper_triangular() -> None:
    rng = np.random.default_rng(42)
    A = rng.normal(size=(4, 3))
    _, R = qr_gram_schmidt(A)
    for i in range(R.shape[0]):
        for j in range(i):
            assert R[i, j] == pytest.approx(0.0, abs=1e-9)


def test_qr_linearly_dependent_raises() -> None:
    A = np.array([[1, 2], [2, 4], [3, 6]], dtype=np.float64)
    with pytest.raises(ValueError):
        qr_gram_schmidt(A)


def test_qr_square_matrix() -> None:
    A = np.array([[1, 2], [3, 4]], dtype=np.float64)
    Q, R = qr_gram_schmidt(A)
    np.testing.assert_allclose(Q @ R, A, atol=1e-9)
    np.testing.assert_allclose(Q.T @ Q, np.eye(2), atol=1e-9)
