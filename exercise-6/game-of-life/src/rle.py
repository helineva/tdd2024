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

def __decode_pattern(pattern):
    run_count = None
    decoded = []

    for c in pattern:
        if c in "bo":
            if run_count == None:
                run_count = 1
            decoded.extend([c == "o"]*run_count)
            run_count = None
        elif c in "0123456789":
            run_count = int(c) if run_count == None else 10*run_count + int(c)
        elif c == "!":
            break
    
    return decoded

def decode(s):
    lines = s.splitlines()
    
    width, height = __decode_header(lines[0])
    
    pattern = __decode_pattern(lines[1])

    return (pattern, width, height)