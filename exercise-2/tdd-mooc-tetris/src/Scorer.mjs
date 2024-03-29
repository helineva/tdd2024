export class Scorer {
    static SCORE = { 1: 40, 2: 100, 3: 300, 4: 400, "other": 400 };
    static LINESPERLEVEL = 10;
    static MAXLEVEL = 9;

    lines;
    score;
    level;

    constructor() {
        this.lines = 0;
        this.score = 0;
        this.level = 0;
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

    addLines(lines=1) {
        this.lines += lines;
        if (Scorer.SCORE.hasOwnProperty(lines)) {
            this.score += Scorer.SCORE[lines];
        } else {
            this.score += Scorer.SCORE["other"];
        }
        this.level = Math.min(Scorer.MAXLEVEL, Math.floor(this.lines / Scorer.LINESPERLEVEL));
    }
}