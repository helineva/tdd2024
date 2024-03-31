export class ShuffleBag {
    bag;
    constructor() {
        this.bag = [];
    }
    fill(block) { this.bag.push(block); }
    get() { return this.bag.pop(); }
}