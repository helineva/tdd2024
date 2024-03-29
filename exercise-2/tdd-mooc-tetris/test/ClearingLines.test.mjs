import { describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs";

describe("Lines", () => {

  test("can be cleared one at a time", () => {
    let board = new Board(8, 6);
    board.drop(ArikaTetromino.I_SHAPE);
    board.moveLeft();
    board.moveLeft();
    for (let i = 0; i < 6; i++) board.tick();

    board.drop(ArikaTetromino.I_SHAPE);
    board.moveRight();
    board.moveRight();
    for (let i = 0; i < 6; i++) board.tick();
    
    expect(board.toString()).to.equalShape(
        `........
         ........
         ........
         ........
         ........
         ........`
    );
  });

  test("can be cleared more than one at a time (consecutive lines)", () => {
    let board = new Board(9,6);
board.setBoard(
`........
........
........
........
TTTTTTT.
TTTTTTT.`
);
    board.drop(ArikaTetromino.I_SHAPE);
    board.tick();
    board.rotateRight();
    for (let i = 0; i < 4; i++) board.moveRight();
    for (let i = 0; i < 3; i++) board.tick();
    expect(board.toString()).to.equalShape(
        `........
         ........
         ........
         ........
         .......I
         .......I`
    );
  });

  test("can be cleared more than one at a time (not consecutive lines)", () => {
    let board = new Board(9,7);
board.setBoard(
`........
........
........
........
TTTTTTT.
TTTTTT..
TTTTTTT.`
);
    board.drop(ArikaTetromino.I_SHAPE);
    board.tick();
    board.rotateRight();
    for (let i = 0; i < 4; i++) board.moveRight();
    for (let i = 0; i < 4; i++) board.tick();
    expect(board.toString()).to.equalShape(
        `........
         ........
         ........
         ........
         ........
         .......I
         TTTTTT.I`
    );
  });

  test("can be cleared one at a time away from the bottom line", () => {
    let board = new Board(8,6);
board.setBoard(
`........
........
........
........
TTTT.TTT
T.TT.TTT`
);
    board.drop(ArikaTetromino.I_SHAPE);
    board.tick();
    board.rotateRight();
    for (let i = 0; i < 3; i++) board.tick();
    expect(board.toString()).to.equalShape(
        `........
         ........
         ........
         ....I...
         ....I...
         T.TTITTT`
    );
  });
});