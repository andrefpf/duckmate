class Board {
    constructor() {
        this.table = document.getElementById("chess-board");
        this.rearrange();
    }

    move(x0, y0, x1, y1) {
        console.log(x0, y0);
        console.log(x1, y1);
        let data = this.getPiece(x0, y0);
        this.setPiece(x0, y0, "");
        this.setPiece(x1, y1, data);
    }

    setPiece(x, y, text) {
        this.table.rows[7 - y].cells[1 + x].innerText = text;
    }

    getPiece(x, y) {
        return this.table.rows[7 - y].cells[1 + x].innerText
    }

    rearrange() {
        this.setPiece(0, 7, "♜");
        this.setPiece(1, 7, "♞");
        this.setPiece(2, 7, "♝");
        this.setPiece(3, 7, "♛");
        this.setPiece(4, 7, "♚");
        this.setPiece(5, 7, "♝");
        this.setPiece(6, 7, "♞");
        this.setPiece(7, 7, "♜");

        this.setPiece(4, 4, "🐥");
        for (let i=0; i<8; i++) {
            this.setPiece(i, 6, "♟︎");
            this.setPiece(i, 1, "♙");
        }

        this.setPiece(0, 0, "♖");
        this.setPiece(1, 0, "♘");
        this.setPiece(2, 0, "♗");
        this.setPiece(3, 0, "♕");
        this.setPiece(4, 0, "♔");
        this.setPiece(5, 0, "♗");
        this.setPiece(6, 0, "♘");
        this.setPiece(7, 0, "♖");
    }
}

var startX, startY;
var startElement;
var originIndex, targetIndex;
var board;
var x, y;

const grabHandler = function (e) {
    let draggablePiece = document.getElementById("draggable-piece");
    draggablePiece.innerText = e.target.innerText;
    startElement = e.target;

    const rect = e.target.getBoundingClientRect();
    x = rect.left;
    y = rect.top;

    if (e.type == "touchstart" ) {
        startX = e.touches[0].pageX - x;
        startY = e.touches[0].pageY - y;

    } else {
        startX = e.pageX - x;
        startY = e.pageY - y;
    }

    table = document.getElementById("chess-board");
    originIndex = [].slice.call(board.table.querySelectorAll('td')).indexOf(e.target);

    draggablePiece.style.left = `${x}px`;
    draggablePiece.style.top = `${y}px`;

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", releaseHandler);
    document.addEventListener("touchmove", moveHandler);
    document.addEventListener("touchend", releaseHandler);
}

const moveHandler = function (e) {
    if (e.type == "touchmove" ) {
        x = e.touches[0].pageX - startX;
        y = e.touches[0].pageY - startY;
    } else {
        x = e.pageX - startX;
        y = e.pageY - startY;   
    }
    
    let draggablePiece = document.getElementById("draggable-piece");
    draggablePiece.style.left = `${x}px`;
    draggablePiece.style.top = `${y}px`;
}

const releaseHandler = function (e) {
    let draggablePiece = document.getElementById("draggable-piece");
    draggablePiece.style.removeProperty("top");
    draggablePiece.style.removeProperty("left");
    draggablePiece.innerText = "";
    
    let target = document.elementFromPoint(x + startX, y + startY);
    targetIndex = [].slice.call(board.table.querySelectorAll('td')).indexOf(target);

    board.move(
        originIndex % 8,
        7 - Math.floor(originIndex / 8), 
        targetIndex % 8,
        7 - Math.floor(targetIndex / 8), 
    )

    document.removeEventListener("mousemove", moveHandler);    
    document.removeEventListener("mouseup", releaseHandler);
    document.removeEventListener("touchmove", moveHandler);
    document.removeEventListener("touchend", releaseHandler);
}

window.onload = function main() {
    board = new Board();    
    board.table.querySelectorAll("td").forEach(function (item) {
        item.addEventListener("mousedown", grabHandler);
        item.addEventListener("touchstart", grabHandler);
    });
}