import pytest
from rle import __encode_header, __encode_pattern, encode

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

def test_encode_pattern_one_live_cell():
    """encodes correctly a pattern consisting of one live cell"""
    pattern = [True]
    width = 1
    rle = __encode_pattern(pattern, width)
    assert rle == "o!"

def test_encode_pattern_dead_live_cell():
    """encodes correctly a 2x1 pattern consisting of one dead and one live cell"""
    pattern = [False, True]
    width = 2
    rle = __encode_pattern(pattern, width)
    assert rle == "bo!"

def test_encode_pattern_two_live_cells():
    """encodes correctly a pattern consisting of two live cells"""
    pattern = [True, True]
    width = 2
    rle = __encode_pattern(pattern, width)
    assert rle == "2o!"

def test_encode_one_line_patterns_ending_with_live_cells():
    """encodes correctly one-line patterns ending with live cells"""
    pattern = [False] + [True]*2 + [False]*3 + [True] + [False]*10 + [True]*2
    width = 19
    rle = __encode_pattern(pattern, width)
    assert rle == "b2o3bo10b2o!"

def test_encode_pattern_one_dead_cell():
    """encodes correctly a pattern consisting of one dead cell"""
    pattern = [False]
    width = 1
    rle = __encode_pattern(pattern, width)
    assert rle == "!"

def test_encode_pattern_two_dead_cells():
    """encodes correctly a pattern consisting of two dead cells"""
    pattern = [False, False]
    width = 2
    rle = __encode_pattern(pattern, width)
    assert rle == "!"

def test_encode_one_line_patterns_ending_with_dead_cells():
    """encodes correctly one-line patterns ending with live cells"""
    pattern = [False] + [True]*2 + [False]*3 + [True] + [False]*10
    width = 17
    rle = __encode_pattern(pattern, width)
    assert rle == "b2o3bo!"

def test_encode_two_line_patterns_lines_ending_with_live_cells():
    """encodes correctly two-line patterns, lines ending with live cells"""
    pattern = [False] + [True]*3 + [False] + [True]
    width = 3
    rle = __encode_pattern(pattern, width)
    assert rle == "b2o$obo!"

    pattern = [False]*2 + [True]*2 + [False] + [True]
    width = 3
    rle = __encode_pattern(pattern, width)
    assert rle == "2bo$obo!"

def test_encode_two_line_patterns_lines_ending_with_dead_cells():
    """encodes correctly two-line patterns, lines ending with live cells"""
    pattern = [True] + [False]*2 + [True]*2 + [False]
    width = 3
    rle = __encode_pattern(pattern, width)
    assert rle == "o$2o!"

def test_encode_dead_lines():
    """encodes correctly dead lines (multiple successive $'s)"""
    s = ("..." +
         "...")
    pattern = [c == "X" for c in s]
    width = 3
    rle = __encode_pattern(pattern, width)
    assert rle == "2$!"

    s = ("XXX" +
         "...")
    pattern = [c == "X" for c in s]
    width = 3
    rle = __encode_pattern(pattern, width)
    assert rle == "3o2$!"

    s = ("XX." +
         "...")
    pattern = [c == "X" for c in s]
    width = 3
    rle = __encode_pattern(pattern, width)
    assert rle == "2o2$!"

    s = ("X.." +
         "...")
    pattern = [c == "X" for c in s]
    width = 3
    rle = __encode_pattern(pattern, width)
    assert rle == "o2$!"

    s = ("XXX" +
         "..." +
         "XXX")
    pattern = [c == "X" for c in s]
    width = 3
    rle = __encode_pattern(pattern, width)
    assert rle == "3o2$3o!"

    s = ("XXX" +
         "..." +
         ".XX")
    pattern = [c == "X" for c in s]
    width = 3
    rle = __encode_pattern(pattern, width)
    assert rle == "3o2$b2o!"

    s = ("XXX" +
         "..." +
         "..X")
    pattern = [c == "X" for c in s]
    width = 3
    rle = __encode_pattern(pattern, width)
    assert rle == "3o2$2bo!"
    
    s = ("XX." +
         "..." +
         "XXX")
    pattern = [c == "X" for c in s]
    width = 3
    rle = __encode_pattern(pattern, width)
    assert rle == "2o2$3o!"

    s = ("X.." +
         "..." +
         "XXX")
    pattern = [c == "X" for c in s]
    width = 3
    rle = __encode_pattern(pattern, width)
    assert rle == "o2$3o!"

    s = ("XX." +
         "..." +
         ".XX")
    pattern = [c == "X" for c in s]
    width = 3
    rle = __encode_pattern(pattern, width)
    assert rle == "2o2$b2o!"
 
    s = ("X.." +
         "..." +
         "..X")
    pattern = [c == "X" for c in s]
    width = 3
    rle = __encode_pattern(pattern, width)
    assert rle == "o2$2bo!"

def test_encode_glider():
    """correctly encodes the 'glider'"""
    s = (".X." +
         "..X" +
         "XXX")
    pattern = [c == "X" for c in s]
    width = 3
    height = 3
    rle = encode(pattern, width, height)
    assert rle == ("x = 3, y = 3\n" +
                   "bo$2bo$3o!\n")