from __future__ import annotations

import numpy as np
import pytest

from linalg_utils.determinants import (
    det_2x2,
    det_3x3_sarrus,
    det_cofactor,
    det_gauss,
    inversa_2x2,
    inversa_gauss_jordan,
)


def test_det_2x2_known() -> None:
    A = np.array([[1, 2], [3, 4]], dtype=float)
    assert det_2x2(A) == -2.0


def test_det_3x3_sarrus() -> None:
    A = np.array([[1, 2, 3], [0, 1, 4], [5, 6, 0]], dtype=float)
    assert det_3x3_sarrus(A) == pytest.approx(1.0)


def test_det_cofactor_matches_numpy() -> None:
    rng = np.random.default_rng(0)
    A = rng.normal(size=(4, 4))
    assert det_cofactor(A) == pytest.approx(np.linalg.det(A), rel=1e-9, abs=1e-9)


def test_det_gauss_matches_numpy() -> None:
    rng = np.random.default_rng(1)
    A = rng.normal(size=(5, 5))
    det_val, _ = det_gauss(A)
    assert det_val == pytest.approx(np.linalg.det(A), rel=1e-7, abs=1e-7)


def test_inversa_2x2() -> None:
    A = np.array([[2, 1], [5, 3]], dtype=float)
    inv = inversa_2x2(A)
    np.testing.assert_allclose(A @ inv, np.eye(2), rtol=1e-7, atol=1e-9)


def test_inversa_gauss_jordan() -> None:
    rng = np.random.default_rng(2)
    A = rng.normal(size=(3, 3))
    inv, _ = inversa_gauss_jordan(A)
    np.testing.assert_allclose(A @ inv, np.eye(3), rtol=1e-7, atol=1e-9)


def test_singular_raises() -> None:
    A = np.array([[1, 2], [2, 4]], dtype=float)
    with pytest.raises(ValueError):
        inversa_2x2(A)
