import numpy as np
import pytest

from linalg_with_python import matrices


def test_matvec_identity():
    x = np.array([1.0, 2.5])
    result = matrices.matvec(np.eye(2), x)
    np.testing.assert_allclose(result, x)


def test_matvec_shape_mismatch_raises():
    with pytest.raises(ValueError):
        matrices.matvec(np.eye(2), np.ones(3))


def test_matvec_matrix_finite_check():
    with pytest.raises(ValueError):
        matrices.matvec(np.array([[1.0, np.nan], [0.0, 1.0]]), np.array([1.0, 2.0]))


def test_matvec_vector_finite_check():
    with pytest.raises(ValueError):
        matrices.matvec(np.eye(2), np.array([np.inf, 0.0]))
