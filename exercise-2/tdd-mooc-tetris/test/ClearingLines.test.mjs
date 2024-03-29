import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs";

describe("Lines", () => {

  test.skip("can be cleared one at a time", () => {
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
});