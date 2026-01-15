from __future__ import annotations

import numpy as np
import pytest

from linalg_with_python.checks import (
    assert_close,
    is_upper_triangular,
    is_orthonormal,
    relative_error,
)


def test_is_orthonormal_true() -> None:
    identity = np.eye(3)
    assert is_orthonormal(identity)


def test_is_orthonormal_false() -> None:
    assert not is_orthonormal(np.array([[1.0, 1.0], [0.0, 1.0]]))


def test_is_upper_triangular_true() -> None:
    assert is_upper_triangular(np.array([[1.0, 2.0], [0.0, 3.0]]))


def test_is_upper_triangular_false() -> None:
    assert not is_upper_triangular(np.array([[1.0, 0.0], [1e-5, 2.0]]), tol=1e-6)


def test_relative_error_nonzero() -> None:
    assert relative_error(np.array([1.0, 2.0]), np.array([1.0, 2.0 + 1e-8])) < 1e-7


def test_assert_close_raises() -> None:
    with pytest.raises(AssertionError, match="relative error"):
        assert_close("test", np.array([1.0]), np.array([2.0]), tol=1e-12)
