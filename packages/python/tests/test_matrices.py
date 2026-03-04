from __future__ import annotations

import numpy as np

from linalg_utils.matrices import (
    classificar_matriz,
    criar_diagonal,
    criar_identidade,
    criar_matriz_nula,
    criar_simetrica,
    dimensao,
)


def test_criar_nula() -> None:
    A = criar_matriz_nula(3, 4)
    assert A.shape == (3, 4)
    assert np.allclose(A, 0.0)


def test_criar_identidade() -> None:
    identity = criar_identidade(4)
    assert identity.shape == (4, 4)
    assert np.allclose(identity, np.eye(4))


def test_classificar_identidade() -> None:
    labels = classificar_matriz(np.eye(3))
    assert labels == [
        "square",
        "identity",
        "diagonal",
        "symmetric",
        "upper_triangular",
        "lower_triangular",
    ]


def test_classificar_retangular() -> None:
    A = np.array([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]])
    assert classificar_matriz(A) == ["rectangular"]


def test_classificar_simetrica() -> None:
    S = criar_simetrica(4, seed=0)
    labels = classificar_matriz(S)
    assert "symmetric" in labels
    assert "square" in labels


def test_dimensao() -> None:
    A = criar_diagonal([1.0, 2.0, 3.0])
    assert dimensao(A) == (3, 3)
