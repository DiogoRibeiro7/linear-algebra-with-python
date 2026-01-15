from __future__ import annotations

import numpy as np
import pytest

from linalg_with_python.eigen import (
    Eigen2x2Result,
    eigen_2x2,
    power_iteration,
    rayleigh_quotient,
)


def test_eigen_2x2_known_matrix() -> None:
    mat = np.array([[2.0, 1.0], [1.0, 2.0]], dtype=np.float64)
    result = eigen_2x2(mat)
    assert isinstance(result, Eigen2x2Result)
    assert np.allclose(sorted(result.eigenvalues), [1.0, 3.0])
    # Check that each eigenvector is indeed an eigenvector.
    for lam, vec in zip(result.eigenvalues, result.eigenvectors.T):
        assert np.allclose(mat @ vec, lam * vec, atol=1e-10)


def test_eigen_2x2_complex_raises() -> None:
    rotation = np.array([[0.0, -1.0], [1.0, 0.0]])
    with pytest.raises(ValueError):
        eigen_2x2(rotation)


def test_rayleigh_quotient_matches_eigenvalue() -> None:
    mat = np.diag([2.0, 5.0])
    vec = np.array([0.0, 1.0])
    assert rayleigh_quotient(mat, vec) == 5.0


def test_rayleigh_quotient_shape_mismatch() -> None:
    mat = np.eye(2)
    with pytest.raises(ValueError):
        rayleigh_quotient(mat, np.array([1.0, 2.0, 3.0]))


def test_power_iteration_on_symmetric() -> None:
    mat = np.array([[4.0, 1.0], [1.0, 3.0]], dtype=np.float64)
    result = power_iteration(mat, tol=1e-12, max_iter=10_000)
    eigenvalues, _ = np.linalg.eig(mat)
    assert np.isclose(result.eigenvalue, max(eigenvalues), atol=1e-8)
    assert np.isclose(np.linalg.norm(result.eigenvector), 1.0)
