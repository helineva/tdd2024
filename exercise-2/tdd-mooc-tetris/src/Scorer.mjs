export class Scorer {

    lines;
    score;
    level;

    constructor() {
        this.lines = 0;
        this.score = 0;
        this.level = 1;
    }

    setLines(lines) {
        this.lines = lines;
    }

    setScore(score) {
        this.score = score;
    }

    setLevel(level) {
        this.level = level;
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

    addLines() {
        this.lines++;
    }
}