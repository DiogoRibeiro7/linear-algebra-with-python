from __future__ import annotations
import numpy as np
from linalg_with_python.vectors import dot, norm, projection

def test_dot_basic() -> None:
    assert dot([1, 2, 3], [4, 5, 6]) == 32.0

def test_norm_basic() -> None:
    assert abs(norm([3, 4]) - 5.0) < 1e-12

def test_projection_parallel_component() -> None:
    u = np.array([2.0, 0.0])
    v = np.array([1.0, 0.0])
    p = projection(u, v)
    assert np.allclose(p, np.array([2.0, 0.0]))
