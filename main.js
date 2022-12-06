class Piece {
    constructor(text) {
        this.text = "♕";
    }
}

class Board {
    constructor() {
        this.data = Array(8*8).fill(null);
    }

    rearrange() {
        for (i=8; i<16; i++) {
            this.data[8 + i] = Piece("♟︎");
        }

        for (i=64-8; i<64; i++) {
            this.data[i] = Piece("♙");
        }
    }
}

function update_interface(board) {
    var table = document.getElementById("chess-board");
    console.log(table.rows[0].cols[0])
}