export class ShuffleBag {
    bag;
    currIndex;
    constructor() {
        this.bag = [];
        this.currIndex = 0;
    }
    fill(block) { this.bag.push(block); }
    get() {
        if (this.currIndex === 0) this.shuffle();
        if (this.currIndex === this.bag.length-1) {
            this.currIndex = 0;
            return this.bag[this.bag.length-1];
        }
        this.currIndex++;
        return this.bag[this.currIndex-1];
    }

    shuffle() {
        for (let i = this.bag.length-1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
        }
    }
}