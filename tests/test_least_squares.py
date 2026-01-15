from __future__ import annotations

import numpy as np
import pytest

from linalg_with_python.checks import assert_close
from linalg_with_python.least_squares import (
    least_squares_normal_eq,
    least_squares_qr,
)


def test_qr_matches_numpy_lstsq() -> None:
    A = np.array([[1.0, 2.0], [0.5, 1.0], [2.0, 0.5]], dtype=np.float64)
    b = np.array([3.0, 1.5, 2.5], dtype=np.float64)
    result = least_squares_qr(A, b)
    sol, *_ = np.linalg.lstsq(A, b, rcond=None)
    assert np.allclose(result.x, sol, atol=1e-10)
    assert_close("QR vs lstsq coefficients", result.x, sol, tol=1e-9)
    assert result.method == "qr"


def test_normal_eq_less_stable_on_ill_conditioned() -> None:
    A = np.array([[1.0, 1.0], [1.0 + 1e-7, 1.0], [1.0, 1.0 + 1e-7]], dtype=np.float64)
    true = np.array([1.0, 2.0], dtype=np.float64)
    b = A @ true
    noise = np.array([1e-5, -1e-5, 2e-5], dtype=np.float64)
    result_normal = least_squares_normal_eq(A, b + noise)
    result_qr = least_squares_qr(A, b + noise)
    err_normal = np.linalg.norm(result_normal.x - true)
    err_qr = np.linalg.norm(result_qr.x - true)
    assert err_normal > err_qr


def test_normal_eq_requires_tall_matrix() -> None:
    with pytest.raises(ValueError):
        least_squares_normal_eq(np.ones((2, 3)), np.ones(2))


def test_qr_requires_tall_matrix() -> None:
    with pytest.raises(ValueError):
        least_squares_qr(np.ones((1, 2)), np.ones(1))
