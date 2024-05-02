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
            if run_count == 0:
                raise Exception("invalid pattern")
            if run_count is None:
                run_count = 1
            decoded.extend([c == "o"]*run_count)
            cell_count += run_count
            if cell_count > width:
                raise Exception("invalid pattern")
            run_count = None
        elif c in "0123456789":
            run_count = int(c) if run_count is None else 10*run_count + int(c)
        elif c == "$":
            if run_count == 0:
                raise Exception("invalid pattern")
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
        else:
            raise Exception("invalid pattern")
    
    return decoded

def decode(s):
    lines = [line for line in s.splitlines() if not line.startswith("#")]

    width, height = __decode_header(lines[0])

    pattern = "".join([tag for line in lines[1:] for tag in line.split()])
    index_end_of_pattern = pattern.find("!")
    if index_end_of_pattern == -1:
        raise Exception("invalid pattern")
    
    decoded_pattern = __decode_pattern(pattern[:index_end_of_pattern+1], width)
    if len(decoded_pattern) != width * height:
        raise Exception("invalid pattern")
    
    return (decoded_pattern, width, height)
