import numpy as np
import pytest

from linalg_with_python import geometry2d


def test_unit_circle_shape_and_finite():
    circle = geometry2d.unit_circle(60)
    assert circle.shape == (60, 2)
    assert np.all(np.isfinite(circle))
    norms = np.linalg.norm(circle, axis=1)
    assert np.allclose(norms, 1.0, atol=1e-12)


def test_unit_square_closed_and_finite():
    square = geometry2d.unit_square(80)
    assert square.shape == (80, 2)
    assert np.all(np.isfinite(square))
    assert np.allclose(square[0], square[-1])
    assert np.all((square >= 0) & (square <= 1))


def test_unit_square_requires_enough_points():
    with pytest.raises(ValueError):
        geometry2d.unit_square(3)


def test_apply_linear_map_identity_preserves_points():
    pts = geometry2d.unit_square(20)
    mapped = geometry2d.apply_linear_map(np.eye(2), pts)
    np.testing.assert_allclose(mapped, pts)


def test_apply_linear_map_matches_manual_convention():
    pts = geometry2d.unit_square(16)
    A = np.array([[2.0, -0.5], [0.5, 1.5]])
    expected = (A @ pts.T).T
    result = geometry2d.apply_linear_map(A, pts)
    np.testing.assert_allclose(result, expected)


def test_apply_linear_map_validates_point_shape():
    with pytest.raises(ValueError):
        geometry2d.apply_linear_map(np.eye(2), np.ones((3,)))
