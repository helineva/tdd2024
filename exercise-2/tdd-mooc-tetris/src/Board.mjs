export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let rows = [];
    for (let row = 0; row < this.height; row++) {
      rows.push(".".repeat(this.width) + "\n");
    }
    return rows.join("");
  }
}
