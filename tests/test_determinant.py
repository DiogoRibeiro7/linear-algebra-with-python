from __future__ import annotations

import numpy as np
import pytest

from linalg_with_python.determinant import det_2x2, inv_2x2, is_invertible


def test_det_2x2_known() -> None:
    mat = np.array([[3.0, 4.0], [2.0, 5.0]])
    assert det_2x2(mat) == 7.0


def test_det_2x2_wrong_shape() -> None:
    with pytest.raises(ValueError):
        det_2x2(np.ones((3, 3)))


def test_inv_2x2_correct() -> None:
    mat = np.array([[4.0, 7.0], [2.0, 6.0]])
    inv_mat = inv_2x2(mat)
    identity = np.eye(2)
    assert np.allclose(mat @ inv_mat, identity)


def test_inv_2x2_singular() -> None:
    singular = np.array([[1.0, 2.0], [2.0, 4.0]])
    with pytest.raises(ValueError):
        inv_2x2(singular)


def test_is_invertible_identity() -> None:
    assert is_invertible(np.eye(3))


def test_is_invertible_singular() -> None:
    singular = np.array([[1.0, 2.0], [2.0, 4.0]])
    assert not is_invertible(singular)


def test_is_invertible_bad_shape() -> None:
    with pytest.raises(ValueError):
        is_invertible(np.ones((2, 3)))
