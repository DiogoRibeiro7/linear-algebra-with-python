from __future__ import annotations

import numpy as np
import pytest

from linalg_utils.eigen import eigen_2x2, power_iteration, rayleigh_quotient


def test_rayleigh_quotient_eigenpair() -> None:
    A = np.array([[2, 0], [0, 3]], dtype=np.float64)
    v = np.array([0, 1], dtype=np.float64)
    assert rayleigh_quotient(A, v) == pytest.approx(3.0)


def test_rayleigh_quotient_non_square_raises() -> None:
    A = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.float64)
    with pytest.raises(ValueError):
        rayleigh_quotient(A, [1, 2])


def test_rayleigh_quotient_zero_vector_raises() -> None:
    A = np.eye(2)
    with pytest.raises(ValueError):
        rayleigh_quotient(A, [0, 0])


def test_eigen_2x2_diagonal() -> None:
    A = np.array([[3, 0], [0, 5]], dtype=np.float64)
    result = eigen_2x2(A)
    eigenvalues = sorted(result.eigenvalues)
    assert eigenvalues[0] == pytest.approx(3.0)
    assert eigenvalues[1] == pytest.approx(5.0)


def test_eigen_2x2_symmetric() -> None:
    A = np.array([[2, 1], [1, 2]], dtype=np.float64)
    result = eigen_2x2(A)
    eigenvalues = sorted(result.eigenvalues)
    assert eigenvalues[0] == pytest.approx(1.0)
    assert eigenvalues[1] == pytest.approx(3.0)


def test_eigen_2x2_wrong_size_raises() -> None:
    with pytest.raises(ValueError):
        eigen_2x2(np.eye(3))


def test_power_iteration_dominant() -> None:
    A = np.array([[2, 0], [0, 1]], dtype=np.float64)
    result = power_iteration(A, seed=42)
    assert result.eigenvalue == pytest.approx(2.0, rel=1e-6)
    assert abs(result.eigenvector[0]) == pytest.approx(1.0, abs=1e-6)


def test_power_iteration_converges() -> None:
    A = np.array([[4, 1], [1, 3]], dtype=np.float64)
    result = power_iteration(A, seed=0)
    expected = max(np.linalg.eigvals(A).real)
    assert result.eigenvalue == pytest.approx(expected, rel=1e-6)
    assert result.iterations < 1000
