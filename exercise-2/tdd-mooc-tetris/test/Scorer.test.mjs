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

    test("is 0 at the start", () => {
        expect(scorer.getLines()).to.equal(0);
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

    test("is 0 at the start", () => {
        expect(scorer.getScore()).to.equal(0);
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
    
    test("increases by 100 points when first two lines are cleared", () => {
        scorer.addLines(2);
        expect(scorer.getScore()).to.equal(100);
    });
});

describe("Level", () => {
    let scorer;
    beforeEach(() => {
      scorer = new Scorer();
    });

    test("is 0 at the start", () => {
        expect(scorer.getLevel()).to.equal(0);
    });

    test("increases to 1 when first 10 lines are cleared", () => {
        scorer.addLines(10);
        expect(scorer.getLevel()).to.equal(1);
    });

    test("increases to 2 when first 20 lines are cleared", () => {
        scorer.addLines(20);
        expect(scorer.getLevel()).to.equal(2);
    });

    test("increases to 9 (max level) when first 100 lines are cleared", () => {
        scorer.addLines(100);
        expect(scorer.getLevel()).to.equal(9);
    });
});