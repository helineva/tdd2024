import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs";
import { ShuffleBag } from "../src/ShuffleBag.mjs";

describe("ShuffleBag", () => {
    let bag;
    beforeEach(() => {
      bag = new ShuffleBag();
    });

    test("returns the block it was filled with", () => {
        let block = ArikaTetromino.T_SHAPE;
        bag.fill(block);
        expect(bag.get()).to.equal(block);
    });

    test("returns the block it was filled with many times", () => {
        let block = ArikaTetromino.T_SHAPE;
        bag.fill(block);
        expect(bag.get()).to.equal(block);
        expect(bag.get()).to.equal(block);
    });

    test("returns the blocks it was filled with", () => {
        let blocks = [];
        for (let i = 0; i < 10; i++) {
            let block = ArikaTetromino.T_SHAPE;
            blocks.push(block);
            bag.fill(block);
        }
        for (let i = 0; i < 10; i++) {
            let block = bag.get();
            let index = blocks.findIndex((x) => x === block);
            expect(index).to.not.equal(-1);
            blocks.splice(index, 1);
        }
    });

});
