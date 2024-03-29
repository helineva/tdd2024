export class Scorer {

    lines;
    score;
    level;

    constructor() {
        this.lines = 0;
        this.score = 0;
        this.level = 1;
    }

    getLines() {
        return this.lines;
    }

    getScore() {
        return this.score;
    }

    getLevel() {
        return this.level;
    }
}