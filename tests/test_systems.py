from __future__ import annotations
import numpy as np
from linalg_with_python.systems import solve

def test_solve_exact() -> None:
    A = np.array([[3.0, 1.0], [1.0, 2.0]])
    b = np.array([9.0, 8.0])
    out = solve(A, b)
    assert np.allclose(A @ out.x, b)
    assert out.residual_norm < 1e-10

def test_cond_positive() -> None:
    A = np.array([[2.0, 0.0], [0.0, 0.5]])
    b = np.array([1.0, 1.0])
    out = solve(A, b)
    assert out.cond_A >= 1.0
