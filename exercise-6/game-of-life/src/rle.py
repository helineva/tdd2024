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
    for c in pattern:
        if c == "b":
            decoded.append(False)
        elif c == "!":
            break

    return (decoded, width, height)