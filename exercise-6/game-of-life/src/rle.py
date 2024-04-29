import re

def decode(s):
    m = re.match(r'x = (\d+), y = (\d+)$', s)

    if not m:
        raise Exception("invalid header")

    width = int(m.group(1))
    if width == 0:
        raise Exception("invalid header")

    height = int(m.group(2))
    if height == 0:
        raise Exception("invalid header")

    return (None, width, height)