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

    move(origin, target) {
        if (origin == target) {
            return
        }
        this.data[target] = this.data[origin];
        this.data[origin] = null;
    }

    rearrange() {
        this.data[0] = new Piece("♜");
        this.data[7] = new Piece("♜");
        this.data[1] = new Piece("♞");
        this.data[6] = new Piece("♞");
        this.data[2] = new Piece("♝");
        this.data[5] = new Piece("♝");
        this.data[3] = new Piece("♛");
        this.data[4] = new Piece("♚");
        
        for (let i=8; i<16; i++) {
            this.data[i] = new Piece("♟︎");
        }
        
        this.data[8*4 + 4] = new Piece("🐥")
        
        this.data[56 + 0] = new Piece("♖");
        this.data[56 + 7] = new Piece("♖");
        this.data[56 + 1] = new Piece("♘");
        this.data[56 + 6] = new Piece("♘");
        this.data[56 + 2] = new Piece("♗");
        this.data[56 + 5] = new Piece("♗");
        this.data[56 + 3] = new Piece("♕");
        this.data[56 + 4] = new Piece("♔");

        for (let i=(40+8); i<(40+16); i++) {
            this.data[i] = new Piece("♙");
        }
    }
}

var x;
var y;
var board;
var table;
var draggablePiece;

function updateInterface(board) {
    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            let square =  board.data[i*8 + j];
            let data = (square !== null) ? square.text : "";
            table.rows[i].cells[j+1].innerText = data;
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

    if (e.type == "touchstart" ) {
        x = e.touches[0].pageX - rect.left;
        y = e.touches[0].pageY - rect.top;

    } else {
        x = e.pageX - rect.left;
        y = e.pageY - rect.top;
    }

    draggablePiece.style.top = `${rect.top}px`;
    draggablePiece.style.left = `${rect.left}px`;

    originIndex = [].slice.call(table.querySelectorAll('td')).indexOf(e.target);
    console.log("Origin:", originIndex);

    // Attach the listeners to `document`
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
    document.addEventListener("touchmove", mouseMoveHandler);
    document.addEventListener("touchend", mouseUpHandler);

};

const mouseMoveHandler = function (e) {
    // Set position for dragging element
    if (e.type == "touchmove" ) {
        draggablePiece.style.top = `${e.touches[0].pageY - y}px`;
        draggablePiece.style.left = `${e.touches[0].pageX - x}px`;

    } else {
        draggablePiece.style.top = `${e.pageY - y}px`;
        draggablePiece.style.left = `${e.pageX - x}px`;
    }
};

const mouseUpHandler = function (e) {
    // Remove the position styles
    draggablePiece.style.removeProperty("top");
    draggablePiece.style.removeProperty("left");
    draggablePiece.innerText = "";

    targetIndex = [].slice.call(table.querySelectorAll('td')).indexOf(e.target);

    board.move(originIndex, targetIndex);
    updateInterface(board);

    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener("mousemove", mouseMoveHandler);    
    document.removeEventListener("mouseup", mouseUpHandler);
    document.removeEventListener("touchmove", mouseMoveHandler);
    document.removeEventListener("touchend", mouseUpHandler);
};

window.onload = function main() {
    table = document.getElementById("chess-board");
    
    table.querySelectorAll("td").forEach(function (item) {
        item.addEventListener("mousedown", mouseDownHandler);
        item.addEventListener("touchstart", mouseDownHandler);
    });


    board = new Board();
    updateInterface(board);
}