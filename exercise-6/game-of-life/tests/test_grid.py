from grid import Grid

def test_create_grid():
    """can create a grid"""
    grid = Grid(".")
    assert str(grid) == ".\n"

def test_create_grid_described_by_string():
    """can create a grid described by a string"""
    s = ("...." +
         ".X.." +
         "....")
    grid = Grid(s, width=4, height=3)
    assert str(grid) == ("....\n" +
                         ".X..\n" +
                         "....\n")
    
def test_create_grid_described_by_boolean_array():
    """can create a grid described by a boolean array"""
    s = ([False, False, False] +
         [False, True, False] +
         [False, False, True])
    grid = Grid(s, width=3, height=3)
    assert str(grid) == ("...\n" +
                         ".X.\n" +
                         "..X\n")
