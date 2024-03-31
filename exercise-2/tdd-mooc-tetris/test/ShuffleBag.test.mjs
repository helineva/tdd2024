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

});
