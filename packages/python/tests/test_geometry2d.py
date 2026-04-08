from __future__ import annotations

import numpy as np
import pytest

from linalg_utils.geometry2d import (
    LinearMap2D,
    apply_linear_map,
    unit_circle,
    unit_square,
)


def test_unit_circle_shape() -> None:
    pts = unit_circle(100)
    assert pts.shape == (100, 2)


def test_unit_circle_radius() -> None:
    pts = unit_circle(200)
    radii = np.linalg.norm(pts, axis=1)
    np.testing.assert_allclose(radii, 1.0, atol=1e-12)


def test_unit_square_shape() -> None:
    pts = unit_square(50)
    assert pts.shape == (200, 2)


def test_unit_square_bounds() -> None:
    pts = unit_square(100)
    assert pts[:, 0].min() >= -1e-12
    assert pts[:, 0].max() <= 1.0 + 1e-12
    assert pts[:, 1].min() >= -1e-12
    assert pts[:, 1].max() <= 1.0 + 1e-12


def test_apply_linear_map_identity() -> None:
    pts = unit_circle(50)
    result = apply_linear_map(np.eye(2), pts)
    np.testing.assert_allclose(result, pts, atol=1e-12)


def test_apply_linear_map_scaling() -> None:
    pts = np.array([[1.0, 0.0], [0.0, 1.0]])
    A = np.array([[2.0, 0.0], [0.0, 3.0]])
    result = apply_linear_map(A, pts)
    expected = np.array([[2.0, 0.0], [0.0, 3.0]])
    np.testing.assert_allclose(result, expected, atol=1e-12)


def test_apply_linear_map_single_point() -> None:
    A = np.array([[0, -1], [1, 0]], dtype=np.float64)
    result = apply_linear_map(A, [1, 0])
    np.testing.assert_allclose(result.flatten(), [0, 1], atol=1e-12)


def test_apply_linear_map_dimension_mismatch_raises() -> None:
    A = np.array([[1, 0], [0, 1]], dtype=np.float64)
    with pytest.raises(ValueError):
        apply_linear_map(A, [[1, 0, 0]])


def test_linear_map_2d_apply() -> None:
    A = np.array([[2, 0], [0, 2]], dtype=np.float64)
    lm = LinearMap2D(A=A)
    pts = np.array([[1.0, 0.0], [0.0, 1.0]])
    result = lm.apply(pts)
    np.testing.assert_allclose(result, [[2, 0], [0, 2]], atol=1e-12)


def test_linear_map_2d_wrong_size_raises() -> None:
    with pytest.raises(ValueError):
        LinearMap2D(A=np.eye(3))
