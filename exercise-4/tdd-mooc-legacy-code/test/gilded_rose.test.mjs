import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("items other than Brie, Backstage passes and Sulfuras with positive quality and nonnegative sellIn decrease in quality by one", () => {
    const gildedRose = new Shop([new Item("Jar of vatniksoup", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });
});
