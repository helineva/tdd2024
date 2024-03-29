import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs";
import { Scorer } from "../src/Scorer.mjs";

describe("Cleared lines", () => {
    let scorer;
    beforeEach(() => {
      scorer = new Scorer();
    });

  test("can be increased by one", () => {
    scorer.addLines();
    expect(scorer.getLines()).to.equal(1);
  });

  test("can be increased by more than one", () => {
    scorer.addLines(2);
    expect(scorer.getLines()).to.equal(2);
  });
});

describe("Score", () => {
    let scorer;
    beforeEach(() => {
      scorer = new Scorer();
    });

    test("increases by 40 points when the first line is cleared", () => {
      scorer.addLines(1);
      expect(scorer.getScore()).to.equal(40);
    });

    test("increases by 40 points when the second line is cleared", () => {
        scorer.addLines(1);
        let scoreBefore = scorer.getScore();
        scorer.addLines(1);
        expect(scorer.getScore()-scoreBefore).to.equal(40);
      });
});