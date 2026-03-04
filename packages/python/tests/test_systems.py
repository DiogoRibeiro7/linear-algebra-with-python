from __future__ import annotations

import numpy as np
import pytest

from linalg_utils.systems import (
    classificar_sistema,
    cramer,
    cramer_2x2,
    cramer_3x3,
    resolver_gauss,
)


def test_spd_system() -> None:
    A = np.array([[2.0, 1.0], [1.0, 3.0]])
    b = np.array([5.0, 7.0])
    x, classification, _ = resolver_gauss(A, b)
    assert classification == "SPD"
    assert x is not None
    np.testing.assert_allclose(A @ x, b, rtol=1e-7, atol=1e-9)


def test_spi_system() -> None:
    A = np.array([[1.0, 2.0], [2.0, 4.0]])
    b = np.array([3.0, 6.0])
    assert classificar_sistema(A, b) == "SPI"


def test_si_system() -> None:
    A = np.array([[1.0, 2.0], [2.0, 4.0]])
    b = np.array([3.0, 7.0])
    assert classificar_sistema(A, b) == "SI"


def test_cramer_2x2() -> None:
    A = np.array([[1.0, 2.0], [3.0, 4.0]])
    b = np.array([5.0, 6.0])
    x = cramer_2x2(A, b)
    np.testing.assert_allclose(A @ x, b, rtol=1e-7, atol=1e-9)


def test_cramer_3x3() -> None:
    A = np.array([[2.0, 1.0, -1.0], [1.0, 2.0, 3.0], [3.0, -1.0, 2.0]])
    b = np.array([3.0, 9.0, 4.0])
    x = cramer_3x3(A, b)
    np.testing.assert_allclose(A @ x, b, rtol=1e-7, atol=1e-9)


def test_cramer_matches_numpy() -> None:
    rng = np.random.default_rng(0)
    A = rng.normal(size=(3, 3))
    b = rng.normal(size=(3,))
    x = cramer(A, b)
    np.testing.assert_allclose(x, np.linalg.solve(A, b), rtol=1e-7, atol=1e-9)


def test_cramer_singular_raises() -> None:
    A = np.array([[1.0, 2.0], [2.0, 4.0]])
    b = np.array([1.0, 2.0])
    with pytest.raises(ValueError):
        cramer(A, b)
