from __future__ import annotations

import math

import numpy as np
import pytest

from linalg_utils.checks import (
    assert_close,
    is_orthonormal,
    is_upper_triangular,
    relative_error,
)


def test_assert_close_identical() -> None:
    assert_close("test", [1, 2, 3], [1, 2, 3])


def test_assert_close_within_tol() -> None:
    assert_close("test", [1.0, 2.0], [1.0 + 1e-10, 2.0 - 1e-10])


def test_assert_close_fails() -> None:
    with pytest.raises(AssertionError):
        assert_close("test", [1.0, 2.0], [3.0, 4.0])


def test_is_upper_triangular_true() -> None:
    R = np.array([[1, 2, 3], [0, 4, 5], [0, 0, 6]], dtype=np.float64)
    assert is_upper_triangular(R) is True


def test_is_upper_triangular_false() -> None:
    A = np.array([[1, 2], [3, 4]], dtype=np.float64)
    assert is_upper_triangular(A) is False


def test_is_upper_triangular_identity() -> None:
    assert is_upper_triangular(np.eye(3)) is True


def test_is_upper_triangular_not_2d_raises() -> None:
    with pytest.raises(ValueError):
        is_upper_triangular(np.array([1, 2, 3]))


def test_is_orthonormal_identity() -> None:
    assert is_orthonormal(np.eye(3)) is True


def test_is_orthonormal_rotation() -> None:
    theta = math.pi / 4
    Q = np.array([[math.cos(theta), -math.sin(theta)],
                   [math.sin(theta), math.cos(theta)]])
    assert is_orthonormal(Q) is True


def test_is_orthonormal_false() -> None:
    A = np.array([[1, 0], [0, 2]], dtype=np.float64)
    assert is_orthonormal(A) is False


def test_is_orthonormal_not_2d_raises() -> None:
    with pytest.raises(ValueError):
        is_orthonormal(np.array([1, 0, 0]))


def test_relative_error_zero() -> None:
    err = relative_error([1, 2, 3], [1, 2, 3])
    assert err.absolute == pytest.approx(0.0, abs=1e-12)
    assert err.relative == pytest.approx(0.0, abs=1e-12)


def test_relative_error_nonzero() -> None:
    err = relative_error([1.0, 0.0], [0.0, 1.0])
    assert err.absolute > 0
    assert err.relative > 0


def test_relative_error_zero_expected() -> None:
    err = relative_error([1.0, 0.0], [0.0, 0.0])
    assert err.relative == math.inf
