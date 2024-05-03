import pytest
from rle import __encode_header

def test_encode_header():
    """encodes correctly header line given dimensions"""
    header = __encode_header(4, 3)
    assert header == "x = 4, y = 3"

def test_encode_header_nonpositive_width():
    """reports error when trying to encode header with nonpositive width"""
    with pytest.raises(Exception) as exc_info:
        __encode_header(-2, 3)
    assert exc_info.value.args[0] == "invalid width"

    with pytest.raises(Exception) as exc_info:
        __encode_header(0, 3)
    assert exc_info.value.args[0] == "invalid width"

def test_encode_header_nonpositive_height():
    """reports error when trying to encode header with nonpositive height"""
    with pytest.raises(Exception) as exc_info:
        __encode_header(4, -2)
    assert exc_info.value.args[0] == "invalid height"

    with pytest.raises(Exception) as exc_info:
        __encode_header(4, 0)
    assert exc_info.value.args[0] == "invalid height"