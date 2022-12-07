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

let x = 0;
let y = 0;

function updateInterface(board) {
    var table = document.getElementById("chess-board");

    if (table === null) {
        return;
    }

    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            let square =  board.data[i*8 + j];
            if (square !== null) {
                table.rows[7-i].cells[j+1].innerText = square.text;
            }
        }
    }
}

const mouseDownHandler = function (e) {
    draggablePiece = document.getElementById("draggable-piece");
    draggablePiece.innerText = e.target.innerText;
    
    // Calculate the mouse position
    const rect = e.target.getBoundingClientRect();
    x = e.pageX - rect.left;
    y = e.pageY - rect.top;

    draggablePiece.style.top = `${e.pageY - y}px`;
    draggablePiece.style.left = `${e.pageX - x}px`;

    // Attach the listeners to `document`
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
};

const mouseMoveHandler = function (e) {
    console.log(e.target.innerText);

    // Set position for dragging element
    draggablePiece.style.top = `${e.pageY - y}px`;
    draggablePiece.style.left = `${e.pageX - x}px`;
};

const mouseUpHandler = function () {
    // Remove the position styles
    draggablePiece.style.removeProperty("top");
    draggablePiece.style.removeProperty("left");
    draggablePiece.innerText = "";

    x = null;
    y = null;
    draggablePiece = null;

    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener("mousemove", mouseMoveHandler);    
    document.removeEventListener("mouseup", mouseUpHandler);
};

window.onload = function main() {
    var table = document.getElementById("chess-board");

    [].slice.call(table.querySelectorAll(".dark, .light")).forEach(function (item) {
        item.addEventListener("mousedown", mouseDownHandler);
    });


    let b = new Board()
    updateInterface(b)
}