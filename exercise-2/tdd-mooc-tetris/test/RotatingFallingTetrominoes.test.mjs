
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
    board.moveRight();
    board.moveRight();
    for (let i = 0; i < 5; i++) board.tick();
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    for (let i = 0; i < 3; i++) board.tick();
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 4; i++) board.moveRight();
    board.rotateRight();
    board.tick();
    board.tick();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ......T.T.
       .....TTTTT
       ......T.T.
       .....TTT..`
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

  test("will move away from the left wall when rotated left next to it", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    for (let i = 0; i < 4; i++) board.moveLeft();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("will move away from the left wall when rotated right next to it", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    for (let i = 0; i < 4; i++) board.moveLeft();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       TTT.......
       .T........
       ..........
       ..........
       ..........`
    );
  });

  test("will move away from the right wall when rotated left next to it", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    for (let i = 0; i < 5; i++) board.moveRight();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       .......TTT
       ........T.
       ..........
       ..........
       ..........`
    );
  });

  test("will move away from the right wall when rotated right next to it", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    for (let i = 0; i < 5; i++) board.moveRight();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("will move two steps away (I-shape) from the left wall when rotated next to it", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    for (let i = 0; i < 4; i++) board.moveLeft();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       IIII......
       ..........
       ..........
       ..........`
    );
  });

  test("will move two steps away (I-shape) from the right wall when rotated next to it", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    for (let i = 0; i < 5; i++) board.moveRight();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ......IIII
       ..........
       ..........
       ..........`
    );
  });

  test("will move away from a block to the right when rotated left next to it", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    for (let i = 0; i < 3; i++) board.tick();
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.rotateRight();
    board.tick();
    board.rotateLeft();
    
    expect(board.toString()).to.equalShape(
      `..........
       ......T...
       ....ITTT..
       ....I.....
       ....I.....
       ....I.....`
    );
  });

  test("will move away from a block to the right when rotated right next to it", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    for (let i = 0; i < 3; i++) board.tick();
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.rotateRight();
    board.tick();
    board.rotateRight();
    
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....ITTT..
       ....I.T...
       ....I.....
       ....I.....`
    );
  });

  test("will move away from a block to the left when rotated left next to it", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    for (let i = 0; i < 3; i++) board.tick();
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.rotateLeft();
    board.tick();
    board.rotateLeft();
    
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .TTTI.....
       ..T.I.....
       ....I.....
       ....I.....`
    );
  });

  test("will move away from a block to the left when rotated right next to it", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    for (let i = 0; i < 3; i++) board.tick();
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.rotateLeft();
    board.tick();
    board.rotateRight();
    
    expect(board.toString()).to.equalShape(
      `..........
       ..T.......
       .TTTI.....
       ....I.....
       ....I.....
       ....I.....`
    );
  });
});

