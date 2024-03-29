import { describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs";
import { Scorer } from "../src/Scorer.mjs";

describe("Cleared lines", () => {

  test("can be increased by one in Scorer", () => {
    let scorer = new Scorer();
    scorer.addLines();
    expect(scorer.getLines()).to.equal(1);
  });

});