import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs";
import { Scorer } from "../src/Scorer.mjs";

describe("Lines", () => {
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

    test("increases by 80 points when 11th line is cleared (level 1)", () => {
        scorer.addLines(10);
        let scoreBefore = scorer.getScore();
        scorer.addLines(1);
        expect(scorer.getScore()-scoreBefore).to.equal(80);
    });

    test("increases according to the Original Nintendo Scoring System up to level 9 (one-line clears)", () => {
        for (let i = 0; i < 100; i++) {
            let scoreBefore = scorer.getScore();
            let levelBefore = scorer.getLevel();
            scorer.addLines(1);
            expect(scorer.getScore()-scoreBefore).to.equal(40 * (levelBefore + 1));
        }
    });

    test("increases according to the Original Nintendo Scoring System up to level 9 (two-line clears)", () => {
        for (let i = 0; i < 50; i++) {
            let scoreBefore = scorer.getScore();
            let levelBefore = scorer.getLevel();
            scorer.addLines(2);
            expect(scorer.getScore()-scoreBefore).to.equal(100 * (levelBefore + 1));
        }
    });

    test("increases according to the Original Nintendo Scoring System up to level 9 (three-line clears)", () => {
        for (let i = 0; i < 33; i++) {
            let scoreBefore = scorer.getScore();
            let levelBefore = scorer.getLevel();
            scorer.addLines(3);
            expect(scorer.getScore()-scoreBefore).to.equal(300 * (levelBefore + 1));
        }
    });

    test("increases according to the Original Nintendo Scoring System up to level 9 (four-line clears)", () => {
        for (let i = 0; i < 25; i++) {
            let scoreBefore = scorer.getScore();
            let levelBefore = scorer.getLevel();
            scorer.addLines(4);
            expect(scorer.getScore()-scoreBefore).to.equal(1200 * (levelBefore + 1));
        }
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

describe("Clearing lines on the board", () => {
    let board;
    let scorer;
    beforeEach(() => {
        board = new Board(9, 6);
        scorer = new Scorer();
        board.registerScorer(scorer);
    });

    test("increases cleared lines", () => {
        board.setBoard(
`.........
.........
.........
.........
.........
TTTTTTTT.`
);
        board.drop(ArikaTetromino.I_SHAPE);
        board.tick();
        board.rotateRight();
        for (let i = 0; i < 4; i++) board.moveRight();
        for (let i = 0; i < 3; i++) board.tick();
        expect(scorer.getLines()).to.equal(1);
    });

    test("increases score", () => {
        board.setBoard(
`.........
.........
.........
.........
.........
TTTTTTTT.`
);
        board.drop(ArikaTetromino.I_SHAPE);
        board.tick();
        board.rotateRight();
        for (let i = 0; i < 4; i++) board.moveRight();
        for (let i = 0; i < 3; i++) board.tick();
        expect(scorer.getScore()).to.equal(40);
    });

    test("increases score (double-clear)", () => {
        board.setBoard(
`.........
.........
.........
.........
TTTTTTTT.
TTTTTTTT.`
);
        board.drop(ArikaTetromino.I_SHAPE);
        board.tick();
        board.rotateRight();
        for (let i = 0; i < 4; i++) board.moveRight();
        for (let i = 0; i < 3; i++) board.tick();
        expect(scorer.getScore()).to.equal(100);
    });
});