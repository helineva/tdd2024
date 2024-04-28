class Grid:
    def __init__(self, seed, width=1, height=1):
        self.width = width
        self.height = height
        self.curr_grid = [c not in (False, ".") for c in seed]
        self.next_grid = [False]*(width*height)
 
    def __generate_neighbours(self, row, col):
        dx = [1, 1, 1, 0, 0, -1, -1, -1]
        dy = [1, 0, -1, 1, -1, 1, 0, -1]
        for i in range(8):
            if 0 <= row+dy[i] < self.height and 0 <= col+dx[i] < self.width:
                yield (row+dy[i], col+dx[i])

    def tick(self):
        for row in range(self.height):
            for col in range(self.width):
                live_cell_count = 0
                for nb_row, nb_col in self.__generate_neighbours(row, col):
                    if self.curr_grid[nb_row*self.width + nb_col]:
                        live_cell_count += 1
                if live_cell_count in (0, 1):
                    self.next_grid[row*self.width + col] = False
                elif live_cell_count == 3:
                    self.next_grid[row*self.width + col] = True
                elif live_cell_count == 4:
                    self.next_grid[row*self.width + col] = False
                else:
                    self.next_grid[row*self.width + col] = self.curr_grid[row*self.width + col]
        self.curr_grid, self.next_grid = self.next_grid, self.curr_grid
        
    
    def __str__(self):
        s = []
        for row in range(self.height):
            for col in range(self.width):
                s.append("." if not self.curr_grid[row*self.width+col] else "X")
            s.append("\n")
        return "".join(s)