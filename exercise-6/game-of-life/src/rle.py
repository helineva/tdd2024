import re

def decode(s):

    lines = s.splitlines()
    header = lines[0]

    m = re.match(r'x = (\d+), y = (\d+)(?:$|,)', header)

    if not m:
        raise Exception("invalid header")

    width = int(m.group(1))
    if width == 0:
        raise Exception("invalid header")

    height = int(m.group(2))
    if height == 0:
        raise Exception("invalid header")

    pattern = lines[1]
    decoded = []
    run_count = None
    for c in pattern:
        if c == "b":
            if not run_count:
                run_count = 1
            decoded.extend([False]*run_count)
        elif c == "o":
            if not run_count:
                run_count = 1
            decoded.extend([True]*run_count)
        elif c in "0123456789":
            run_count = int(c)
        elif c == "!":
            break

    return (decoded, width, height)