import grid
import rle

def play(input_file, gen, output_file):
    if not input_file.is_file():
        raise Exception("input file does not exist")
    if output_file.is_file():
        raise Exception("output file already exists")

    with open(input_file, "r") as f:
        input_rle = f.read()
    
    seed, width, height = rle.decode(input_rle)
    g = grid.Grid(seed, width, height)
    
    for _ in range(gen):
        g.tick()

    pattern = g.get_grid()
    width = g.get_width()
    height = g.get_height()
    output_rle = rle.encode(pattern, width, height)

    with open(output_file, "w") as f:
        f.write(output_rle)