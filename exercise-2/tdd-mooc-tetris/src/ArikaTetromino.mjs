export class ArikaTetromino {

    static fromString(strArray) {
        return new ArikaTetromino(strArray.map(s => { return s.trim().split("\n").map(t => { return t.replace(/\s+/g, ""); }); }));
    }

    static fromTetromino(tetromino) {
        let strArray = [];
        let n = tetromino.valid_orientations.filter(x => x === true).length;
        for (let i = 0; i < n; i++) {
            strArray.push(tetromino.toString());
            tetromino = tetromino.rotateRight();
        }
        return ArikaTetromino.fromString(strArray);
    }

    static get T_SHAPE() {
        return ArikaTetromino.fromString([
            "....\nTTT.\n.T..\n....",
            ".T..\nTT..\n.T..\n....",
            "....\n.T..\nTTT.\n....",
            ".T..\n.TT.\n.T..\n...."
        ]);
    }

    static get I_SHAPE() {
        return ArikaTetromino.fromString([
            "....\nIIII\n....\n....",
            "..I.\n..I.\n..I.\n..I."
        ]);
    }

    static get O_SHAPE() {
        return ArikaTetromino.fromString([
            "....\n.OO.\n.OO.\n...."
        ]);
    }

    orientations;
    state;
    sideLength;
    
    constructor(orientations, state=0) {
        this.orientations = orientations;
        this.state = state;
        this.sideLength = this.orientations[0].length;
    }

    rotateLeft() {
        return new ArikaTetromino(this.orientations, (this.state + this.orientations.length - 1) % this.orientations.length);
    }

    rotateRight() {
        return new ArikaTetromino(this.orientations, (this.state + 1) % this.orientations.length);
    }
    
    layout() {
        return this.orientations[this.state];
    }

    toString() {
        return this.layout().join("\n") + "\n";
    }
}