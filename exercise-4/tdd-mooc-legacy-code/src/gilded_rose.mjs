export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item.name == "Sulfuras, Hand of Ragnaros") continue;
      item.sellIn--;
      switch (item.name) {
        case "Aged Brie":
          if (item.quality >= 50) break;
          if (item.quality == 49) {
            item.quality = 50;
            break;
          }
          item.quality += (item.sellIn < 0) ? 2 : 1;
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          if (item.sellIn < 0) item.quality = 0;
          else {
            if (item.quality >= 50) break;
            if (item.quality == 49) {
              item.quality = 50;
              break;
            }
            if (item.quality == 48) {
              item.quality = item.sellIn >= 10 ? 49 : 50;
              break
            }
            if (item.sellIn >= 0 && item.sellIn <= 4) item.quality += 3;
            if (item.sellIn >= 5 && item.sellIn <= 9) item.quality += 2;
            if (item.sellIn >= 10) item.quality += 1;
            break;
          }
        default:
          if (item.quality <= 0) break;
          if (item.quality == 1) item.quality = 0;
          if (item.quality >= 2) item.quality -= item.sellIn < 0 ? 2 : 1;
          break;
      }
    }

    return this.items;
  }
}
