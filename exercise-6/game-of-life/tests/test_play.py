import life
import pytest

def test_play_l_shape(tmp_path):
    """correctly simulates life of the L-shape for one generation"""
    input_file = tmp_path / "l_shape.rle"
    input_file.write_text("x = 2, y = 2\no$2o!")
    output_file = tmp_path / "l_shape_gen_1.rle"
    life.play(input_file, 1, output_file)
    assert output_file.read_text() == "x = 2, y = 2\n2o$2o!"

def test_play_nonexisting_input_file(tmp_path):
    """reports error if the input file does not exist"""
    input_file = tmp_path / "input.rle"
    output_file = tmp_path / "output.rle"
    with pytest.raises(Exception) as exc_info:
        life.play(input_file, 0, output_file)
    assert exc_info.value.args[0] == "input file does not exist"

def test_play_existing_output_file(tmp_path):
    """reports error if the output file exists"""
    input_file = tmp_path / "input.rle"
    input_file.write_text("x = 2, y = 2\no$2o!")
    output_file = tmp_path / "output.rle"
    output_file.write_text("x = 2, y = 2\no$2o!")
    with pytest.raises(Exception) as exc_info:
        life.play(input_file, 0, output_file)
    assert exc_info.value.args[0] == "output file already exists"