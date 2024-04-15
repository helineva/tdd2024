export class Item {
  constructor(name, sellIn, quality, conjured=false) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.conjured = conjured;
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
      let coeff = item.conjured ? 2 : 1;
      switch (item.name) {
        case "Aged Brie":
          if (item.quality >= 50) break;
          item.quality += (item.sellIn < 0) ? coeff * 2 : coeff * 1;
          if (item.quality > 50) item.quality = 50;
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          if (item.sellIn < 0) item.quality = 0;
          else {
            if (item.quality >= 50) break;
            item.quality += item.sellIn >= 10 ? coeff * 1 : item.sellIn >= 5 ? coeff * 2 : coeff * 3;
            if (item.quality > 50) item.quality = 50;
            break;
          }
        default:
          if (item.quality <= 0) break;
          item.quality -= item.sellIn < 0 ? coeff * 2 : coeff * 1;
          if (item.quality < 0) item.quality = 0;
          break;
      }
    }

    return this.items;
  }
}
