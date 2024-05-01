import re

def __decode_header(header):
    m = re.match(r'x = (\d+), y = (\d+)(?:$|,)', header)

    if not m:
        raise Exception("invalid header")

    width = int(m.group(1))
    if width == 0:
        raise Exception("invalid header")

    height = int(m.group(2))
    if height == 0:
        raise Exception("invalid header")
    
    return (width, height)

def __decode_pattern(pattern, width):
    run_count = None
    decoded = []
    cell_count = 0

    for c in pattern:
        if c in "bo":
            if run_count is None:
                run_count = 1
            decoded.extend([c == "o"]*run_count)
            cell_count += run_count
            run_count = None
        elif c in "0123456789":
            run_count = int(c) if run_count == None else 10*run_count + int(c)
        elif c == "$":
            if run_count is None:
                run_count = 1
            for _ in range(run_count):
                decoded.extend([False]*(width-cell_count))
                cell_count = 0
            run_count = None
        elif c == "!":
            if cell_count > 0:
                decoded.extend([False]*(width-cell_count))
            break
    
    return decoded

def decode(s):
    lines = s.splitlines()
    
    width, height = __decode_header(lines[0])
    
    pattern = __decode_pattern(lines[1], width)

    return (pattern, width, height)