export class ShuffleBag {
    static mulberry32(a) {
        return function() {
          let t = a += 0x6D2B79F5;
          t = Math.imul(t ^ t >>> 15, t | 1);
          t ^= t + Math.imul(t ^ t >>> 7, t | 61);
          return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
    }
    
    prng;
    bag;
    currIndex;
    constructor(seed=0) {
        this.bag = [];
        this.currIndex = 0;
        this.prng = ShuffleBag.mulberry32(seed);
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
            let j = Math.floor(this.prng() * (i+1));
            [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
        }
    }   
}