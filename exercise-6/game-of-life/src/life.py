import grid
from pathlib import Path
import rle
import sys

def play(input_file, gen, output_file):
    if not input_file.is_file():
        raise Exception("input file does not exist")
    if output_file.is_file():
        raise Exception("output file already exists")

    with open(input_file, "r", encoding="utf-8") as f:
        input_rle = f.read()
    
    seed, width, height = rle.decode(input_rle)
    g = grid.Grid(seed, width, height)
    
    for _ in range(gen):
        g.tick()

    pattern = g.get_grid()
    width = g.get_width()
    height = g.get_height()
    output_rle = rle.encode(pattern, width, height)

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(output_rle)

if __name__ == "__main__":
    args = sys.argv
    if len(args) < 4:
        print("Usage: life.py <input file in RLE format> <number of generations to simulate> <output file>")
        sys.exit()
    
    input_file = Path(args[1])
    gen = int(args[2])
    output_file = Path(args[3])

    play(input_file, gen, output_file)
    