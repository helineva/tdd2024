from grid import Grid

def test_create_grid():
    """can create a grid"""
    grid = Grid()
    assert str(grid) == "."
