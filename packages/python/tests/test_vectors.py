from __future__ import annotations

import math

import numpy as np
import pytest

from linalg_utils.vectors import RelativeError, angle, dot, norm, projection


def test_dot_basic() -> None:
    assert dot([1, 2, 3], [4, 5, 6]) == pytest.approx(32.0)


def test_dot_orthogonal() -> None:
    assert dot([1, 0], [0, 1]) == pytest.approx(0.0)


def test_dot_mismatched_shapes() -> None:
    with pytest.raises(ValueError):
        dot([1, 2], [1, 2, 3])


def test_norm_unit_vector() -> None:
    assert norm([1, 0, 0]) == pytest.approx(1.0)


def test_norm_general() -> None:
    assert norm([3, 4]) == pytest.approx(5.0)


def test_norm_zero() -> None:
    assert norm([0, 0, 0]) == pytest.approx(0.0)


def test_angle_orthogonal() -> None:
    assert angle([1, 0], [0, 1]) == pytest.approx(math.pi / 2)


def test_angle_parallel() -> None:
    assert angle([1, 0], [2, 0]) == pytest.approx(0.0)


def test_angle_antiparallel() -> None:
    assert angle([1, 0], [-1, 0]) == pytest.approx(math.pi)


def test_angle_zero_vector_raises() -> None:
    with pytest.raises(ValueError):
        angle([0, 0], [1, 0])


def test_projection_onto_axis() -> None:
    result = projection([3, 4], [1, 0])
    np.testing.assert_allclose(result, [3, 0], atol=1e-12)


def test_projection_same_direction() -> None:
    result = projection([2, 0], [4, 0])
    np.testing.assert_allclose(result, [2, 0], atol=1e-12)


def test_projection_orthogonal() -> None:
    result = projection([0, 5], [1, 0])
    np.testing.assert_allclose(result, [0, 0], atol=1e-12)


def test_projection_zero_base_raises() -> None:
    with pytest.raises(ValueError):
        projection([1, 2], [0, 0])


def test_relative_error_identical() -> None:
    err = RelativeError.from_vectors([1, 2, 3], [1, 2, 3])
    assert err.absolute == pytest.approx(0.0, abs=1e-12)
    assert err.relative == pytest.approx(0.0, abs=1e-12)


def test_relative_error_nonzero() -> None:
    err = RelativeError.from_vectors([1.1, 2.0], [1.0, 2.0])
    assert err.absolute > 0
    assert err.relative > 0
