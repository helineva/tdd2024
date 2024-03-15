export class RotatingShape {

    static fromString(str) {
        return new RotatingShape(str);
    }
    
    side;
    layout;
    
    constructor(str) {
        this.layout = str.split("\n").map(s => { return s.replace(/\s+/g, ""); })
        this.side = this.layout.length;
    }

    rotateLeft() {
        let str = [];

        for (let h = 0; h < this.side; h++) {

            for (let w = 0; w < this.side; w++) {
                str.push(this.layout[w][this.side - 1 - h]);
            }
            
            if (h < this.side - 1) str.push("\n");
        }
        
        return RotatingShape.fromString(str.join(""));
    }

    rotateRight() {
        let str = [];
 
        for (let h = 0; h < this.side; h++) {
        
            for (let w = 0; w < this.side; w++) {
                str.push(this.layout[this.side - 1 - w][h]);
            }
        
            if (h < this.side - 1) str.push("\n");
        }

        return RotatingShape.fromString(str.join(""));
    }

    toString() {
        return this.layout.join("\n") + "\n";
    }
}