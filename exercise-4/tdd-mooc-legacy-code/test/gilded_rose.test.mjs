import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("items other than Brie, Backstage passes and Sulfuras with positive quality and nonnegative sellIn decrease in quality by one", () => {
    const gildedRose = new Shop([new Item("Jar of vatniksoup", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  test("Aged Brie with quality < 50 and sellIn > 0 increases in quality by one", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 1), new Item("Aged Brie", 3, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(2);
    expect(items[1].quality).to.equal(6);
  });

  test("Aged Brie with quality < 50 and sellIn <= 0 increases in quality by two", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 1), new Item("Aged Brie", -3, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(3);
    expect(items[1].quality).to.equal(7);
  });
});
