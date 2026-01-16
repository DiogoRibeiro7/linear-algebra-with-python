import numpy as np

from linalg_with_python import blocks


def test_block_diag():
    A = np.array([[1.0, 2.0], [3.0, 4.0]])
    B = np.array([[5.0]])
    diag = blocks.block_diag(A, B)
    assert diag.shape == (3, 3)
    expected = np.array([[1.0, 2.0, 0.0], [3.0, 4.0, 0.0], [0.0, 0.0, 5.0]])
    np.testing.assert_allclose(diag, expected)


def test_block_matrix_multiply():
    A = np.array([[2.0, 0.0], [0.0, 3.0]])
    B = np.array([[1.0, 1.0], [1.0, 1.0]])
    diag = blocks.block_diag(A, B)
    zeros = np.zeros_like(A)

    result = blocks.block_matrix_multiply(
        [[A, zeros], [zeros, B]],
        [[np.eye(2), zeros], [zeros, np.eye(2)]],
    )
    expected = diag @ np.eye(diag.shape[0])
    np.testing.assert_allclose(result, expected)
