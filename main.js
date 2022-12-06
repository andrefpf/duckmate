class Piece {
    constructor(text) {
        this.text = text;
    }
}

class Board {
    constructor() {
        this.data = Array(8*8).fill(null);
        this.rearrange();
    }

    rearrange() {
        this.data[0] = new Piece("♖")
        this.data[7] = new Piece("♖")
        this.data[1] = new Piece("♘")
        this.data[6] = new Piece("♘")
        this.data[2] = new Piece("♗")
        this.data[5] = new Piece("♗")
        this.data[3] = new Piece("♕")
        this.data[4] = new Piece("♔")
        
        for (let i=8; i<16; i++) {
            this.data[i] = new Piece("♙");
        }

        this.data[8*4 + 4] = new Piece("🐥")
        
        this.data[56 + 0] = new Piece("♜")
        this.data[56 + 7] = new Piece("♜")
        this.data[56 + 1] = new Piece("♞")
        this.data[56 + 6] = new Piece("♞")
        this.data[56 + 2] = new Piece("♝")
        this.data[56 + 5] = new Piece("♝")
        this.data[56 + 3] = new Piece("♛")
        this.data[56 + 4] = new Piece("♚")

        for (let i=(40+8); i<(40+16); i++) {
            this.data[i] = new Piece("♟︎");
        }
    }
}

function update_interface(board) {
    var table = document.getElementById("chess-board");

    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            let square =  board.data[i*8 + j];
            if (square !== null) {
                console.log(square);
                table.rows[7-i].cells[j+1].innerText = square.text;
            }
        }
    }
}

function main() {
    let b = new Board()
    update_interface(b)
}