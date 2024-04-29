import pytest
from rle import decode

def test_decode_correct_header_line():
    """decodes a correct header line"""
    s = "x = 4, y = 3"
    _, width, height = decode(s)
    assert width == 4
    assert height == 3

def test_decode_invalid_header_line():
    """raises an exception in case of an invalid header"""
    s = "abc"
    with pytest.raises(Exception) as exc_info:
        decode(s)
    assert exc_info.value.args[0] == "invalid header"

def test_decode_header_line_with_invalid_dimension_not_a_number():
    """raises an exception if width/height is not a number"""
    s = "x = a9, y = 3"
    with pytest.raises(Exception) as exc_info:
        decode(s)
    assert exc_info.value.args[0] == "invalid header"
    s = "x = 4, y = b4"
    with pytest.raises(Exception) as exc_info:
        decode(s)
    assert exc_info.value.args[0] == "invalid header"

def test_decode_header_line_with_invalid_dimension_decimal_point():
    """raises an exception if width/height contains a decimal point"""
    s = "x = 2.0, y = 3"
    with pytest.raises(Exception) as exc_info:
        decode(s)
    assert exc_info.value.args[0] == "invalid header"
    s = "x = 4, y = 1.5"
    with pytest.raises(Exception) as exc_info:
        decode(s)
    assert exc_info.value.args[0] == "invalid header"

def test_decode_header_line_with_invalid_dimension_negative_number():
    """raises an exception if width/height contains a negative number"""
    s = "x = -1, y = 3"
    with pytest.raises(Exception) as exc_info:
        decode(s)
    assert exc_info.value.args[0] == "invalid header"
    s = "x = 4, y = -5"
    with pytest.raises(Exception) as exc_info:
        decode(s)
    assert exc_info.value.args[0] == "invalid header"

def test_decode_header_line_with_invalid_dimension_zero():
    """raises an exception if width/height contains a zero"""
    s = "x = 0, y = 3"
    with pytest.raises(Exception) as exc_info:
        decode(s)
    assert exc_info.value.args[0] == "invalid header"
    s = "x = 4, y = 0"
    with pytest.raises(Exception) as exc_info:
        decode(s)
    assert exc_info.value.args[0] == "invalid header"