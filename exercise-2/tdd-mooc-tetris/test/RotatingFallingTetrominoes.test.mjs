
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("can be rotated left/counterclockwise", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can be rotated right/clockwise", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can be rotated left/counterclockwise twice", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can be rotated right/clockwise twice", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can not be rotated if there is no room", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 5; i++) board.tick();
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 3; i++) board.tick();
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });

  test("can be rotated next to another block", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 5; i++) board.tick();
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 3; i++) board.tick();
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `.....T....
       ....TT....
       ....TT....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });
});

