from grid import Grid

def test_create_grid():
    """can create a grid"""
    grid = Grid(".")
    assert str(grid) == ".\n"

def test_create_grid_described_by_string():
    """can create a grid described by a string"""
    seed = ("...." +
         ".X.." +
         "....")
    grid = Grid(seed, width=4, height=3)
    assert str(grid) == ("....\n" +
                         ".X..\n" +
                         "....\n")
    
def test_create_grid_described_by_boolean_array():
    """can create a grid described by a boolean array"""
    seed = ([False, False, False] +
         [False, True, False] +
         [False, False, True])
    grid = Grid(seed, width=3, height=3)
    assert str(grid) == ("...\n" +
                         ".X.\n" +
                         "..X\n")

def test_grid_without_live_cells_does_not_change():
    """a grid with no live cells remains that way"""
    seed = ("...." +
            "...." +
            "....")
    grid = Grid(seed, width=4, height=3)
    grid.tick()
    assert str(grid) == ("....\n" +
                         "....\n" +
                         "....\n")

def test_live_cell_without_live_neighbours_dies_corner():
    """a live cell without live neighbours dies, at the corner"""
    seed = ("X..." +
            "...." +
            "....")
    grid = Grid(seed, width=4, height=3)
    grid.tick()
    assert str(grid) == ("....\n" +
                         "....\n" +
                         "....\n")
    
def test_live_cell_without_live_neighbours_dies_edge():
    """a live cell without live neighbours dies, on the edge"""
    seed = (".X.." +
            "...." +
            "....")
    grid = Grid(seed, width=4, height=3)
    grid.tick()
    assert str(grid) == ("....\n" +
                         "....\n" +
                         "....\n")
    
def test_live_cell_without_live_neighbours_dies_inside():
    """a live cell without live neighbours dies, on the inside"""
    seed = ("...." +
            ".X.." +
            "....")
    grid = Grid(seed, width=4, height=3)
    grid.tick()
    assert str(grid) == ("....\n" +
                         "....\n" +
                         "....\n")