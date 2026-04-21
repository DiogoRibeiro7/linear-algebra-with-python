from __future__ import annotations

import numpy as np
import pytest

from linalg_utils.least_squares import least_squares_normal_eq, least_squares_qr


def _make_overdetermined_system() -> tuple[np.ndarray, np.ndarray]:
    rng = np.random.default_rng(0)
    x = np.linspace(0, 1, 20)
    A = np.column_stack([np.ones_like(x), x])
    b = 1.0 + 2.0 * x + rng.normal(scale=0.1, size=x.shape)
    return A, b


def test_normal_eq_fits_line() -> None:
    A, b = _make_overdetermined_system()
    result = least_squares_normal_eq(A, b)
    assert result.method == "normal_eq"
    assert result.x[0] == pytest.approx(1.0, abs=0.3)
    assert result.x[1] == pytest.approx(2.0, abs=0.3)


def test_qr_fits_line() -> None:
    A, b = _make_overdetermined_system()
    result = least_squares_qr(A, b)
    assert result.method == "qr"
    assert result.x[0] == pytest.approx(1.0, abs=0.3)
    assert result.x[1] == pytest.approx(2.0, abs=0.3)


def test_normal_eq_and_qr_agree() -> None:
    A, b = _make_overdetermined_system()
    r1 = least_squares_normal_eq(A, b)
    r2 = least_squares_qr(A, b)
    np.testing.assert_allclose(r1.x, r2.x, rtol=1e-7)


def test_residual_norm_matches() -> None:
    A, b = _make_overdetermined_system()
    result = least_squares_qr(A, b)
    expected_norm = np.linalg.norm(result.residual)
    assert result.residual_norm == pytest.approx(expected_norm, rel=1e-9)


def test_exact_system() -> None:
    A = np.array([[1.0, 0.0], [0.0, 1.0]])
    b = np.array([3.0, 4.0])
    result = least_squares_qr(A, b)
    np.testing.assert_allclose(result.x, b, atol=1e-12)
    assert result.residual_norm == pytest.approx(0.0, abs=1e-12)
