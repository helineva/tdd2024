import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("creating a shop without a parameter results in an empty shop", () => {
    const gildedRose = new Shop();
    expect(gildedRose.items.length).to.equal(0);
  });

  test("Aged Brie; sellIn <= 0; quality <= 48; quality increases by two", () => {
    const gildedRose = new Shop([
      new Item("Aged Brie", 0, 48),
      new Item("Aged Brie", -1, 48),
      new Item("Aged Brie", 0, 47),
      new Item("Aged Brie", -1, 47)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(50);
    expect(items[2].quality).to.equal(49);
    expect(items[3].quality).to.equal(49);
  });

  test("Aged Brie; sellIn >= 1; quality <= 48; quality increases by one", () => {
    const gildedRose = new Shop([
      new Item("Aged Brie", 1, 48),
      new Item("Aged Brie", 2, 48),
      new Item("Aged Brie", 1, 47),
      new Item("Aged Brie", 2, 47)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(49);
    expect(items[1].quality).to.equal(49);
    expect(items[2].quality).to.equal(48);
    expect(items[3].quality).to.equal(48);
  });

  test("Aged Brie; sellIn <= 0; quality == 49; quality increases by one", () => {
    const gildedRose = new Shop([
      new Item("Aged Brie", 0, 49),
      new Item("Aged Brie", -1, 49)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(50);
  });

  test("Aged Brie; sellIn >= 1; quality == 49; quality increases by one", () => {
    const gildedRose = new Shop([
      new Item("Aged Brie", 1, 49),
      new Item("Aged Brie", 2, 49)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(50);
  });

  test("Aged Brie; sellIn <= 0; quality >= 50; quality does not change", () => {
    const gildedRose = new Shop([
      new Item("Aged Brie", 0, 50),
      new Item("Aged Brie", -1, 50),
      new Item("Aged Brie", 0, 51),
      new Item("Aged Brie", -1, 51)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(50);
    expect(items[2].quality).to.equal(51);
    expect(items[3].quality).to.equal(51);
  });

  test("Aged Brie; sellIn >= 1; quality >= 50; quality does not change", () => {
    const gildedRose = new Shop([
      new Item("Aged Brie", 1, 50),
      new Item("Aged Brie", 2, 50),
      new Item("Aged Brie", 1, 51),
      new Item("Aged Brie", 2, 51)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(50);
    expect(items[2].quality).to.equal(51);
    expect(items[3].quality).to.equal(51);
  });

  test("Backstage passes; sellIn <= 0; any quality; quality resets to zero", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 46),
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 46),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 47),
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 47),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 48),
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 48),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 51),
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 51)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[1].quality).to.equal(0);
    expect(items[2].quality).to.equal(0);
    expect(items[3].quality).to.equal(0);
    expect(items[4].quality).to.equal(0);
    expect(items[5].quality).to.equal(0);
    expect(items[6].quality).to.equal(0);
    expect(items[7].quality).to.equal(0);
    expect(items[8].quality).to.equal(0);
    expect(items[9].quality).to.equal(0);
    expect(items[10].quality).to.equal(0);
    expect(items[11].quality).to.equal(0);
  });

  test("Backstage passes; 1 <= sellIn <= 5; quality <= 47; quality increases by three", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 47),
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 47),
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 46),
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 46),
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 47),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 47),
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 46),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 46)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(50);
    expect(items[2].quality).to.equal(49);
    expect(items[3].quality).to.equal(49);
    expect(items[4].quality).to.equal(50);
    expect(items[5].quality).to.equal(50);
    expect(items[6].quality).to.equal(49);
    expect(items[7].quality).to.equal(49);
  });

  test("Backstage passes; 6 <= sellIn <= 10; quality <= 47; quality increases by two", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 47),
      new Item("Backstage passes to a TAFKAL80ETC concert", 7, 47),
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 47),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 47),
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 46),
      new Item("Backstage passes to a TAFKAL80ETC concert", 7, 46),
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 46),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 46)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(49);
    expect(items[1].quality).to.equal(49);
    expect(items[2].quality).to.equal(49);
    expect(items[3].quality).to.equal(49);
    expect(items[4].quality).to.equal(48);
    expect(items[5].quality).to.equal(48);
    expect(items[6].quality).to.equal(48);
    expect(items[7].quality).to.equal(48);
  });

  test("Backstage passes; sellIn >= 11; quality <= 47; quality increases by one", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 47),
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 47),
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 46),
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 46)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(48);
    expect(items[1].quality).to.equal(48);
    expect(items[2].quality).to.equal(47);
    expect(items[3].quality).to.equal(47);
  });

  test("Backstage passes; 1 <= sellIn <= 5; quality == 48; quality increases by two", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 48),
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 48),
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 48),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(50);
    expect(items[2].quality).to.equal(50);
    expect(items[3].quality).to.equal(50);
  });

  test("Backstage passes; 6 <= sellIn <= 10; quality == 48; quality increases by two", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 48),
      new Item("Backstage passes to a TAFKAL80ETC concert", 7, 48),
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 48),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 48)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(50);
    expect(items[2].quality).to.equal(50);
    expect(items[3].quality).to.equal(50);
  });

  test("Backstage passes; sellIn >= 11; quality == 48; quality increases by one", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 48),
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 48)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(49);
    expect(items[1].quality).to.equal(49);
  });

  test("Backstage passes; 1 <= sellIn <= 5; quality == 49; quality increases by one", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(50);
    expect(items[2].quality).to.equal(50);
    expect(items[3].quality).to.equal(50);
  });

  test("Backstage passes; 6 <= sellIn <= 10; quality == 49; quality increases by one", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 7, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(50);
    expect(items[2].quality).to.equal(50);
    expect(items[3].quality).to.equal(50);
  });

  test("Backstage passes; sellIn >= 11; quality == 49; quality increases by one", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 49)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(50);
  });

  test("Backstage passes; sellIn >= 1; quality >= 50; quality does not change", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 7, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 51),
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 51),
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 51),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 51),
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 51),
      new Item("Backstage passes to a TAFKAL80ETC concert", 7, 51),
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 51),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 51),
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 51),
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 51),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(50);
    expect(items[2].quality).to.equal(50);
    expect(items[3].quality).to.equal(50);
    expect(items[4].quality).to.equal(50);
    expect(items[5].quality).to.equal(50);
    expect(items[6].quality).to.equal(50);
    expect(items[7].quality).to.equal(50);
    expect(items[8].quality).to.equal(50);
    expect(items[9].quality).to.equal(50);
    expect(items[10].quality).to.equal(51);
    expect(items[11].quality).to.equal(51);
    expect(items[12].quality).to.equal(51);
    expect(items[13].quality).to.equal(51);
    expect(items[14].quality).to.equal(51);
    expect(items[15].quality).to.equal(51);
    expect(items[16].quality).to.equal(51);
    expect(items[17].quality).to.equal(51);
    expect(items[18].quality).to.equal(51);
    expect(items[19].quality).to.equal(51);
  });

  test("Sulfuras; any sellIn; any quality; quality does not change", () => {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", -1, 0),
      new Item("Sulfuras, Hand of Ragnaros", -1, 1),
      new Item("Sulfuras, Hand of Ragnaros", 0, 0),
      new Item("Sulfuras, Hand of Ragnaros", 1, 0),
      new Item("Sulfuras, Hand of Ragnaros", 0, 1),
      new Item("Sulfuras, Hand of Ragnaros", 1, 1)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[1].quality).to.equal(1);
    expect(items[2].quality).to.equal(0);
    expect(items[3].quality).to.equal(0);
    expect(items[4].quality).to.equal(1);
    expect(items[5].quality).to.equal(1);
  });

  test("Sulfuras; any sellIn; any quality; sellIn does not change", () => {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 0, 0),
      new Item("Sulfuras, Hand of Ragnaros", 1, 0),
      new Item("Sulfuras, Hand of Ragnaros", 0, 1),
      new Item("Sulfuras, Hand of Ragnaros", 1, 1)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[1].sellIn).to.equal(1);
    expect(items[2].sellIn).to.equal(0);
    expect(items[3].sellIn).to.equal(1);
  });

  test("item other than Sulfuras; any sellIn; any quality; sellIn decreases by one", () => {
    const gildedRose = new Shop([
      new Item("Jar of vatniksoup", 0, 0),
      new Item("Jar of vatniksoup", 1, 0),
      new Item("Jar of vatniksoup", 0, 1),
      new Item("Jar of vatniksoup", 1, 1),
      new Item("Aged Brie", 0, 0),
      new Item("Aged Brie", 1, 0),
      new Item("Aged Brie", 0, 1),
      new Item("Aged Brie", 1, 1),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0),
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 0),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 1),
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 1)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[1].sellIn).to.equal(0);
    expect(items[2].sellIn).to.equal(-1);
    expect(items[3].sellIn).to.equal(0);
    expect(items[4].sellIn).to.equal(-1);
    expect(items[5].sellIn).to.equal(0);
    expect(items[6].sellIn).to.equal(-1);
    expect(items[7].sellIn).to.equal(0);
    expect(items[8].sellIn).to.equal(-1);
    expect(items[9].sellIn).to.equal(0);
    expect(items[10].sellIn).to.equal(-1);
    expect(items[11].sellIn).to.equal(0);
  });

  test("item other than Brie, Backstage passes or Sulfuras; sellIn <= 0; quality <= 0; quality does not change", () => {
    const gildedRose = new Shop([
      new Item("Jar of vatniksoup", 0, 0),
      new Item("Jar of vatniksoup", -1, 0),
      new Item("Jar of vatniksoup", 0, -1),
      new Item("Jar of vatniksoup", -1, -1)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[1].quality).to.equal(0);
    expect(items[2].quality).to.equal(-1);
    expect(items[3].quality).to.equal(-1);
  });

  test("item other than Brie, Backstage passes or Sulfuras; sellIn >= 1; quality <= 0; quality does not change", () => {
    const gildedRose = new Shop([
      new Item("Jar of vatniksoup", 1, 0),
      new Item("Jar of vatniksoup", 2, 0),
      new Item("Jar of vatniksoup", 1, -1),
      new Item("Jar of vatniksoup", 2, -1)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[1].quality).to.equal(0);
    expect(items[2].quality).to.equal(-1);
    expect(items[3].quality).to.equal(-1);
  });

  test("item other than Brie, Backstage passes or Sulfuras; sellIn <= 0; quality == 1; quality decreases by one (i.e. is equal to 0)", () => {
    const gildedRose = new Shop([
      new Item("Jar of vatniksoup", 0, 1),
      new Item("Jar of vatniksoup", -1, 1)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[1].quality).to.equal(0);
  });

  test("item other than Brie, Backstage passes or Sulfuras; sellIn >= 1; quality == 1; quality decreases by one (i.e. is equal to 0)", () => {
    const gildedRose = new Shop([
      new Item("Jar of vatniksoup", 1, 1),
      new Item("Jar of vatniksoup", 2, 1)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[1].quality).to.equal(0);
  });

  test("item other than Brie, Backstage passes or Sulfuras; sellIn <= 0; quality >= 2; quality decreases by two", () => {
    const gildedRose = new Shop([
      new Item("Jar of vatniksoup", 0, 2),
      new Item("Jar of vatniksoup", -1, 2),
      new Item("Jar of vatniksoup", 0, 3),
      new Item("Jar of vatniksoup", -1, 3)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[1].quality).to.equal(0);
    expect(items[2].quality).to.equal(1);
    expect(items[3].quality).to.equal(1);
  });

  test("item other than Brie, Backstage passes or Sulfuras; sellIn >= 1; quality >= 2; quality decreases by one", () => {
    const gildedRose = new Shop([
      new Item("Jar of vatniksoup", 1, 2),
      new Item("Jar of vatniksoup", 2, 2),
      new Item("Jar of vatniksoup", 1, 3),
      new Item("Jar of vatniksoup", 2, 3)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(1);
    expect(items[1].quality).to.equal(1);
    expect(items[2].quality).to.equal(2);
    expect(items[3].quality).to.equal(2);
  });  
});
