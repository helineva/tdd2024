import re

MAX_LINE_LENGTH = 70

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

def __encode_header(width, height):
    if width <= 0:
        raise Exception("invalid width")
    if height <= 0:
        raise Exception("invalid height")
    
    return f"x = {width}, y = {height}"

def __encode_pattern(pattern, width):
    rle = []
    run_count = 0
    line_break_count = 0
    previous = None
    
    for i, current in enumerate(pattern):
        if previous is None:
            run_count = 1
        elif current == previous:
            run_count += 1
        else:
            if line_break_count >= 1:
                rle.append(str(line_break_count) + "$" if line_break_count > 1 else "$")
                line_break_count = 0
            if run_count > 1:
                rle.append(str(run_count))
            rle.append("o" if previous else "b")
            run_count = 1
        
        previous = current
        
        if (i+1) % width == 0:
            if previous:
                if line_break_count >= 1:
                    rle.append(str(line_break_count) + "$" if line_break_count > 1 else "$")
                    line_break_count = 0
                if run_count > 1:
                    rle.append(str(run_count))
                rle.append("o")   
            line_break_count += 1
            run_count = 0
            previous = None
    
    rle.append(str(line_break_count) + "$!" if line_break_count > 1 else "!")

    return "".join(rle)

def encode(pattern, width, height):
    if len(pattern) != width*height:
        raise Exception("invalid pattern")
    
    header = __encode_header(width, height)
    rle = __encode_pattern(pattern, width)

    lines = [header]
    s = rle
    while len(s) > MAX_LINE_LENGTH:
        i = MAX_LINE_LENGTH - 1
        while s[i] not in "bo$":
            i -= 1
        lines.append(s[:i+1])
        s = s[i+1:]
    lines.append(s)
    
    return "\n".join(lines)