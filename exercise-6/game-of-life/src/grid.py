class Grid:
    def __init__(self, s, width=1, height=1):
        self.width = width
        self.height = height
        self.grid = [c not in (False, ".") for c in s]

    def __str__(self):
        s = []
        for row in range(self.height):
            for col in range(self.width):
                s.append("." if not self.grid[row*self.width+col] else "X")
            s.append("\n")
        return "".join(s)