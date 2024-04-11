import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/testable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("Christmas Day 00:00:00", () => {
    expect(daysUntilChristmas(new Date("2024-12-25T00:00:00"))).to.equal(0);
  });
  test("Christmas Day 23:59:59", () => {
    expect(daysUntilChristmas(new Date("2024-12-25T23:59:59"))).to.equal(0);
  });
  test("Christmas Eve 00:00:00", () => {
    expect(daysUntilChristmas(new Date("2024-12-24T00:00:00"))).to.equal(1);
  });
  test("Christmas Eve 23:59:59", () => {
    expect(daysUntilChristmas(new Date("2024-12-24T23:59:59"))).to.equal(1);
  });
  test("1st of December 00:00:00", () => {
    expect(daysUntilChristmas(new Date("2024-12-01T00:00:00"))).to.equal(24);
  });
  test("Boxing Day 00:00:00 (non leap year)", () => {
    expect(daysUntilChristmas(new Date("2024-12-26T00:00:00"))).to.equal(364);
  });
  test("Boxing Day 00:00:00 (leap year)", () => {
    expect(daysUntilChristmas(new Date("2023-12-26T00:00:00"))).to.equal(365);
  });
});
