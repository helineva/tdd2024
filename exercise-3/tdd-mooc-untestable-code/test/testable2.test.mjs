import { describe, test } from "vitest";
import { expect } from "chai";
import { diceRoll, diceHandValue } from "../src/testable2.mjs";

describe("Untestable 2: a dice game", () => {
  test("dice value is always in {1,2,3,4,5,6}", () => {
    for (let i = 0; i < 100; i++) {
      expect(diceRoll()).to.be.oneOf([1, 2, 3, 4, 5, 6]);
    }
  });
  
  test("every value in {1,2,3,4,5,6} appears as a dice value in the long run", () => {
    let values = [false, false, false, false, false, false];
    for (let i = 0; i < 100; i++) {
      values[diceRoll()-1] = true;
    }
    for (let i = 0; i < 6; i++) {
        expect(values[i]).to.be.true;
    }
  });
  
  test("long dice value sequences are different from each other", () => {
    let run1 = [];
    let run2 = [];
    for (let i = 0; i < 100; i++) {
        run1.push(diceRoll());
    }
    for (let i = 0; i < 100; i++) {
        run2.push(diceRoll());
    }
    expect(run1).to.not.eql(run2);
  });

  test("a pair gives 100+(value of dice) points", () => {
    for (let value = 1; value <= 6; value++) {
      expect(diceHandValue(value, value)).to.equal(100+value);
    }
  });

  test("1 and 2 gives 2 points", () => {
    expect(diceHandValue(1, 2)).to.equal(2);
    expect(diceHandValue(2, 1)).to.equal(2);
  });

  test("2 and 5 gives 5 points", () => {
    expect(diceHandValue(2, 5)).to.equal(5);
    expect(diceHandValue(5, 2)).to.equal(5);
  });
});
