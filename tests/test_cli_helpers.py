import numpy as np
import pytest

from linalg_with_python import cli_helpers


def test_parse_matrix_string_valid():
    matrix = cli_helpers.parse_matrix_string("1,2;3,4")
    np.testing.assert_allclose(matrix, np.array([[1.0, 2.0], [3.0, 4.0]]))


@pytest.mark.parametrize(
    "value, error_msg",
    [
    ("", "Matrix string is empty"),
    ("1,2;3", "All rows must have the same number of entries"),
    ("1,,2", "Empty entry detected"),
    ],
)
def test_parse_matrix_string_invalid(value, error_msg):
    with pytest.raises(ValueError) as exc:
        cli_helpers.parse_matrix_string(value)
    assert error_msg.lower() in str(exc.value).lower()


def test_parse_vector_string_valid():
    vector = cli_helpers.parse_vector_string("5, 6 ")
    np.testing.assert_allclose(vector, np.array([5.0, 6.0]))


def test_parse_vector_string_empty():
    with pytest.raises(ValueError) as exc:
        cli_helpers.parse_vector_string("")
    assert "Vector string is empty" in str(exc.value)
