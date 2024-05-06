import life

def test_play_l_shape(tmp_path):
    """correctly simulates life of the L-shape for one generation"""
    input_file = tmp_path / "l_shape.rle"
    input_file.write_text("x = 2, y = 2\no$2o!")
    output_file = tmp_path / "l_shape_gen_1.rle"
    life.play(input_file, 1, str(output_file))
    assert output_file.read_text() == "x = 2, y = 2\n2o$2o!"