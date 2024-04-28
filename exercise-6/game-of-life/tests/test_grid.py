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
    
def test_live_cell_with_one_live_neighbour_dies():
    """a live cell with exactly one live neighbour dies"""
    seed = ("...." +
            ".XX." +
            "....")
    grid = Grid(seed, width=4, height=3)
    grid.tick()
    assert str(grid) == ("....\n" +
                         "....\n" +
                         "....\n")

def test_cell_with_two_live_neighbours_retains_its_state():
    """a cell with exactly two live neighbours retains its state"""
    seed = ("X..." +
            ".X.." +
            "..X.")
    grid = Grid(seed, width=4, height=3)
    grid.tick()
    assert str(grid) == ("....\n" +
                         ".X..\n" +
                         "....\n")
    
def test_cell_with_three_live_neighbours_will_be_alive():
    """a cell with exactly three live neighbours will be alive"""
    seed = (".X.." +
            "XXX." +
            "....")
    grid = Grid(seed, width=4, height=3)
    grid.tick()
    assert str(grid) == ("XXX.\n" +
                         "XXX.\n" +
                         ".X..\n")

def test_live_cell_with_four_live_neighbours_dies():
    """a live cell with exactly four live neighbours dies"""
    seed = (".X.." +
            "XXX." +
            ".X..")
    grid = Grid(seed, width=4, height=3)
    grid.tick()
    assert str(grid) == ("XXX.\n" +
                         "X.X.\n" +
                         "XXX.\n")
    
def test_dead_cell_with_four_live_neighbours_stays_dead():
    """a dead cell with exactly four live neighbours stays dead"""
    seed = (".X.." +
            "X.X." +
            ".X..")
    grid = Grid(seed, width=4, height=3)
    grid.tick()
    assert str(grid) == (".X..\n" +
                         "X.X.\n" +
                         ".X..\n")

def test_cell_with_five_live_neighbours_will_be_dead():
    """a live cell with exactly five live neighbours dies
       a dead cell with exactly five live neighbours stays dead"""
    seed = ("X.X." +
            "XXX." +
            ".X..")
    grid = Grid(seed, width=4, height=3)
    grid.tick()
    assert str(grid) == ("X.X.\n" +
                         "X.X.\n" +
                         "XXX.\n")

def test_live_cell_with_six_live_neighbours_dies():
    """a live cell with exactly six live neighbours dies"""
    seed = ("XXX." +
            "XXX." +
            ".X..")
    grid = Grid(seed, width=4, height=3)
    grid.tick()
    assert str(grid) == ("X.X.\n" +
                         "....\n" +
                         "XXX.\n")

def test_dead_cell_with_six_live_neighbours_stays_dead():
    """a dead cell with exactly six live neighbours stays dead"""
    seed = ("XXX." +
            "X.X." +
            ".X..")
    grid = Grid(seed, width=4, height=3)
    grid.tick()
    assert str(grid) == ("X.X.\n" +
                         "X.X.\n" +
                         ".X..\n")
    
def test_live_cell_with_seven_live_neighbours_dies():
    """a live cell with exactly seven live neighbours dies"""
    seed = ("XXX." +
            "XXX." +
            "XX..")
    grid = Grid(seed, width=4, height=3)
    grid.tick()
    assert str(grid) == ("X.X.\n" +
                         "....\n" +
                         "X.X.\n")
    
def test_dead_cell_with_seven_live_neighbours_stays_dead():
    """a dead cell with exactly seven live neighbours stays dead"""
    seed = ("XXX." +
            "X.X." +
            "XX..")
    grid = Grid(seed, width=4, height=3)
    grid.tick()
    assert str(grid) == ("X.X.\n" +
                         "..X.\n" +
                         "XX..\n")
    
def test_live_cell_with_eight_live_neighbours_dies():
    """a live cell with exactly eight live neighbours dies"""
    seed = ("XXX." +
            "XXX." +
            "XXX.")
    grid = Grid(seed, width=4, height=3)
    grid.tick()
    assert str(grid) == ("X.X.\n" +
                         "...X\n" +
                         "X.X.\n")
    
def test_dead_cell_with_eight_live_neighbours_stays_dead():
    """a dead cell with exactly eight live neighbours stays dead"""
    seed = ("XXX." +
            "X.X." +
            "XXX.")
    grid = Grid(seed, width=4, height=3)
    grid.tick()
    assert str(grid) == ("X.X.\n" +
                         "...X\n" +
                         "X.X.\n")

def test_2x2_block_does_not_change():
    """a 2x2 block does not change"""
    seed = ("...." +
            ".XX." +
            ".XX." +
            "....")
    grid = Grid(seed, width=4, height=4)
    grid.tick()
    assert str(grid) == ("....\n" +
                         ".XX.\n" +
                         ".XX.\n" +
                         "....\n")
    
def test_beehive_does_not_change():
    """a 'beehive' does not change"""
    seed = ("......" +
            "..XX.." +
            ".X..X." +
            "..XX.." +
            "......")
    grid = Grid(seed, width=6, height=5)
    grid.tick()
    assert str(grid) == ("......\n" +
                         "..XX..\n" +
                         ".X..X.\n" +
                         "..XX..\n" +
                         "......\n")
    
def test_loaf_does_not_change():
    """a 'loaf' does not change"""
    seed = ("......" +
            "..XX.." +
            ".X..X." +
            "..X.X." +
            "...X.." +
            "......")
    grid = Grid(seed, width=6, height=6)
    grid.tick()
    assert str(grid) == ("......\n" +
                         "..XX..\n" +
                         ".X..X.\n" +
                         "..X.X.\n" +
                         "...X..\n" +
                         "......\n")
    
def test_blinker_has_period_of_two():
    """a 'blinker' has a period of two"""
    seed = ("....." +
            "..X.." +
            "..X.." +
            "..X.." +
            ".....")
    grid = Grid(seed, width=5, height=5)
    for i in range(10):
        grid.tick()
        if i % 2 == 0:
            assert str(grid) == (".....\n" +
                                 ".....\n" +
                                 ".XXX.\n" +
                                 ".....\n" +
                                 ".....\n")
        else:
            assert str(grid) == (".....\n" +
                                 "..X..\n" +
                                 "..X..\n" +
                                 "..X..\n" +
                                 ".....\n")

def test_toad_has_period_of_two():
    """a 'toad' has a periof of two"""
    seed = ("......" +
            "...X.." +
            ".X..X." +
            ".X..X." +
            "..X..." +
            "......")
    grid = Grid(seed, width=6, height=6)
    for i in range(10):
        grid.tick()
        if i % 2 == 0:
            assert str(grid) == ("......\n" +
                                 "......\n" +
                                 "..XXX.\n" +
                                 ".XXX..\n" +
                                 "......\n" +
                                 "......\n")
        else:
            assert str(grid) == ("......\n" +
                                 "...X..\n" +
                                 ".X..X.\n" +
                                 ".X..X.\n" +
                                 "..X...\n" +
                                 "......\n")
