from __future__ import annotations

import numpy as np
import pytest

from linalg_with_python.vectors import (
    cosine_similarity,
    distance,
    dot,
    gram_schmidt,
    is_orthogonal,
    norm,
    projection,
)


def test_dot_basic() -> None:
    assert dot([1, 2, 3], [4, 5, 6]) == 32.0


def test_norm_basic() -> None:
    assert abs(norm([3, 4]) - 5.0) < 1e-12


def test_projection_parallel_component() -> None:
    u = np.array([2.0, 0.0])
    v = np.array([1.0, 0.0])
    p = projection(u, v)
    assert np.allclose(p, np.array([2.0, 0.0]))


def test_distance_basic() -> None:
    assert np.isclose(distance([0.0, 0.0, 0.0], [1.0, 2.0, 2.0]), 3.0)


def test_distance_shape_mismatch() -> None:
    with pytest.raises(ValueError):
        distance([1.0, 2.0], [1.0, 2.0, 3.0])


def test_is_orthogonal_true_and_false() -> None:
    assert is_orthogonal([1.0, 0.0], [0.0, 1.0])
    assert not is_orthogonal([1.0, 0.0], [1.0, 1.0])
    with pytest.raises(ValueError):
        is_orthogonal([1.0, 0.0], [1.0, 0.0, 0.0])


def test_cosine_similarity_basic() -> None:
    assert cosine_similarity([1.0, 0.0], [0.0, 1.0]) == 0.0


def test_cosine_similarity_zero_vector() -> None:
    with pytest.raises(ValueError):
        cosine_similarity([1.0, 2.0], [0.0, 0.0])


def test_cosine_similarity_shape_mismatch() -> None:
    with pytest.raises(ValueError):
        cosine_similarity([1.0, 2.0], [1.0, 2.0, 3.0])


def test_gram_schmidt_orthonormalizes() -> None:
    vectors = [
        np.array([1.0, 1.0, 0.0]),
        np.array([1.0, -1.0, 0.0]),
        np.array([0.0, 0.0, 1.0]),
    ]
    basis = gram_schmidt(vectors)
    assert basis.shape == (3, 3)
    assert np.allclose(basis.T @ basis, np.eye(3), atol=1e-12)


def test_gram_schmidt_linear_dependence() -> None:
    with pytest.raises(ValueError):
        gram_schmidt([np.array([1.0, 0.0]), np.array([2.0, 0.0])])


def test_gram_schmidt_shape_mismatch() -> None:
    with pytest.raises(ValueError):
        gram_schmidt([np.array([1.0, 0.0]), np.array([1.0, 0.0, 0.0])])
