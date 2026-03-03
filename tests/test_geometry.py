from __future__ import annotations

import numpy as np

from linalg_utils.geometry import (
    intersecao_reta_plano,
    posicao_relativa_planos,
    posicao_relativa_retas_2d,
    posicao_relativa_retas_3d,
)


def test_posicao_retas_2d_intersecting() -> None:
    assert posicao_relativa_retas_2d([0, 0], [1, 1], [0, 1], [1, -1]) == "intersecting"


def test_posicao_retas_2d_parallel() -> None:
    assert posicao_relativa_retas_2d([0, 0], [1, 0], [0, 1], [1, 0]) == "parallel"


def test_posicao_retas_2d_coincident() -> None:
    assert posicao_relativa_retas_2d([0, 0], [1, 1], [1, 1], [2, 2]) == "coincident"


def test_posicao_retas_3d_skew() -> None:
    result = posicao_relativa_retas_3d([0, 0, 0], [1, 0, 0], [0, 1, 1], [0, 1, 0])
    assert result == "skew"


def test_intersecao_reta_plano_known() -> None:
    p = intersecao_reta_plano([0, 0, 0], [1, 0, 0], [1, 0, 0], 2)
    assert p is not None
    np.testing.assert_allclose(p, np.array([2.0, 0.0, 0.0]))


def test_intersecao_reta_plano_parallel() -> None:
    p = intersecao_reta_plano([0, 0, 1], [1, 0, 0], [0, 0, 1], 0)
    assert p is None


def test_posicao_planos() -> None:
    assert posicao_relativa_planos([1, 0, 0], 1, [1, 0, 0], 2) == "parallel"
