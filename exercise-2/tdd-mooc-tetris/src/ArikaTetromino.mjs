export class ArikaTetromino {

    static fromString(strArray) {
        return new ArikaTetromino(strArray.map(s => { return s.split("\n").replace(/\s+/g, ""); }));
    }

    static get T_SHAPE() {
        return ArikaTetromino.fromString([
            "....\nTTT.\n.T..\n....",
            ".T..\nTT..\n.T..\n....",
            ".T..\n.TT.\n.T..\n....",
            "....\nTTT.\n.T..\n...."
        ]);
    }

    orientations;
    state;
    sideLength;
    
    constructor(orientations, state=0) {
        this.orientations = orientations;
        this.state = state;
        this.sideLength = this.orientations.length;
    }

    rotateLeft() {
        return new ArikaTetromino(this.orientations, (state + 1) % this.orientations.length);
    }

    rotateRight() {
        return new ArikaTetromino(this.orientations, (state + this.orientations - 1) % this.orientations.length);
    }
    
    toString() {
        return this.orientations.join("\n");
    }
}