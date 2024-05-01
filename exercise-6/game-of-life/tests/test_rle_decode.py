import pytest
from rle import decode, __decode_header, __decode_pattern

def test_decode_correct_header_line():
    """decodes a correct header line"""
    header = "x = 4, y = 3"
    width, height = __decode_header(header)
    assert width == 4
    assert height == 3

def test_decode_invalid_header_line():
    """raises an exception in case of an invalid header"""
    header = "abc"
    with pytest.raises(Exception) as exc_info:
        __decode_header(header)
    assert exc_info.value.args[0] == "invalid header"

def test_decode_header_line_with_invalid_dimension_not_a_number():
    """raises an exception if width/height is not a number"""
    header = "x = a9, y = 3"
    with pytest.raises(Exception) as exc_info:
        __decode_header(header)
    assert exc_info.value.args[0] == "invalid header"
    header = "x = 4, y = b4"
    with pytest.raises(Exception) as exc_info:
        __decode_header(header)
    assert exc_info.value.args[0] == "invalid header"

def test_decode_header_line_with_invalid_dimension_decimal_point():
    """raises an exception if width/height contains a decimal point"""
    header = "x = 2.0, y = 3"
    with pytest.raises(Exception) as exc_info:
        __decode_header(header)
    assert exc_info.value.args[0] == "invalid header"
    header = "x = 4, y = 1.5"
    with pytest.raises(Exception) as exc_info:
        __decode_header(header)
    assert exc_info.value.args[0] == "invalid header"

def test_decode_header_line_with_invalid_dimension_negative_number():
    """raises an exception if width/height contains a negative number"""
    header = "x = -1, y = 3"
    with pytest.raises(Exception) as exc_info:
        __decode_header(header)
    assert exc_info.value.args[0] == "invalid header"
    header = "x = 4, y = -5"
    with pytest.raises(Exception) as exc_info:
        __decode_header(header)
    assert exc_info.value.args[0] == "invalid header"

def test_decode_header_line_with_invalid_dimension_zero():
    """raises an exception if width/height contains a zero"""
    header = "x = 0, y = 3"
    with pytest.raises(Exception) as exc_info:
        __decode_header(header)
    assert exc_info.value.args[0] == "invalid header"
    header = "x = 4, y = 0"
    with pytest.raises(Exception) as exc_info:
        __decode_header(header)
    assert exc_info.value.args[0] == "invalid header"

def test_decode_extended_header_line():
    """decodes an extended header line correctly"""
    header = "x = 3, y = 4, rule = abc"
    width, height = __decode_header(header)
    assert width == 3
    assert height == 4

def test_decode_1x1_dead_cell_pattern_without_run_count():
    """decodes correctly a pattern consisting of one dead cell without explicit run count"""
    rle = "b!"
    pattern = __decode_pattern(rle, 1)
    assert pattern == [False]

def test_decode_1x1_live_cell_pattern_without_run_count():
    """decodes correctly a pattern consisting of one dead cell without explicit run count"""
    rle = "o!"
    pattern = __decode_pattern(rle, 1)
    assert pattern == [True]

def test_decode_2x1_pattern_without_run_counts():
    """decodes correctly a 1x2-pattern consisting of one live and one dead cell without explicit run counts"""
    rle = "ob!"
    pattern = __decode_pattern(rle, 2)
    assert pattern == [True, False]

def test_decode_1x1_dead_cell_pattern_with_run_count():
    """decodes correctly a pattern consisting of one dead cell with run count"""
    rle = "1b!"
    pattern = __decode_pattern(rle, 1)
    assert pattern == [False]

def test_decode_1x1_live_cell_pattern_with_run_count():
    """decodes correctly a pattern consisting of one live cell with run count"""
    rle = "1o!"
    pattern = __decode_pattern(rle, 1)
    assert pattern == [True]

def test_decode_2x1_dead_cells_pattern_with_run_count():
    """decodes correctly a pattern consisting of two dead cells with run count"""
    rle = "2b!"
    pattern = __decode_pattern(rle, 2)
    assert pattern == [False, False]

def test_decode_2x1_live_cells_pattern_with_run_count():
    """decodes correctly a pattern consisting of two live cells with run count"""
    rle = "2o!"
    pattern = __decode_pattern(rle, 2)
    assert pattern == [True, True]

def test_decode_run_of_more_than_nine_cells():
    """decodes correctly a run of more than nine cells"""
    rle = "10o!"
    pattern = __decode_pattern(rle, 10)
    assert pattern == [True]*10

def test_decode_pattern_of_height_one_without_eol_symbols():
    """decodes correctly patterns of height one without end-of-line symbols"""
    rle = "b2o3o5b12obob10o!"
    pattern = __decode_pattern(rle, 36)
    assert pattern == [False] + [True]*5 + [False]*5 + [True]*12 + [False, True, False] + [True]*10

def test_decode_fill_end_of_lines_with_dead_cells():
    """fill end-of-lines with a correct number of dead cells"""
    rle = "b$!"
    pattern = __decode_pattern(rle, 1)
    assert pattern == [False]
    
    rle = "o$!"
    pattern = __decode_pattern(rle, 2)
    assert pattern == [True, False]
    