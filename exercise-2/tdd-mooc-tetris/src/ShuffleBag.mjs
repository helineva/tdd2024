export class ShuffleBag {
    bag;
    currIndex;
    constructor() {
        this.bag = [];
        this.currIndex = 0;
    }
    fill(block) { this.bag.push(block); }
    get() {
        if (this.currIndex === this.bag.length-1) {
            this.currIndex = 0;
            return this.bag[this.bag.length-1];
        }
        this.currIndex++;
        return this.bag[this.currIndex-1];
    }
}