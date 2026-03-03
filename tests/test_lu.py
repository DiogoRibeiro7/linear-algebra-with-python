from __future__ import annotations

import numpy as np
import pytest

from linalg_utils.lu import (
    decomposicao_lu,
    det_via_lu,
    resolver_lu,
    resolver_lu_multiplos_rhs,
)


def test_lu_decomposition() -> None:
    A = np.array([[2.0, 1.0], [3.0, 4.0]])
    P, L, U = decomposicao_lu(A)
    np.testing.assert_allclose(P @ A, L @ U, rtol=1e-7, atol=1e-9)


def test_resolver_lu() -> None:
    A = np.array([[2.0, 1.0], [1.0, 3.0]])
    b = np.array([5.0, 7.0])
    x = resolver_lu(A, b)
    np.testing.assert_allclose(A @ x, b, rtol=1e-7, atol=1e-9)


def test_multiple_rhs() -> None:
    A = np.array([[4.0, 1.0], [2.0, 3.0]])
    B = np.array([[1.0, 2.0], [3.0, 4.0]])
    X = resolver_lu_multiplos_rhs(A, B)
    np.testing.assert_allclose(A @ X, B, rtol=1e-7, atol=1e-9)


def test_det_via_lu() -> None:
    A = np.array([[1.0, 2.0], [3.0, 4.0]])
    assert det_via_lu(A) == pytest.approx(np.linalg.det(A), rel=1e-9, abs=1e-9)


def test_det_via_lu_random() -> None:
    rng = np.random.default_rng(1)
    A = rng.normal(size=(4, 4))
    assert det_via_lu(A) == pytest.approx(np.linalg.det(A), rel=1e-9, abs=1e-9)
