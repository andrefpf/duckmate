const W_ROOK = "r";
const W_KNIGHT = "n";
const W_BISHOP = "b";
const W_QUEEN = "q";
const W_KING = "k";
const W_PAWN = "p";

const B_ROOK = "t";
const B_KNIGHT = "m";
const B_BISHOP = "v";
const B_QUEEN = "w";
const B_KING = "l";
const B_PAWN = "o";
const DUCK = "🐥";

white_pieces = [W_ROOK, W_KNIGHT, W_BISHOP, W_QUEEN, W_KING, W_PAWN];
black_pieces = [B_ROOK, B_KNIGHT, B_BISHOP, B_QUEEN, B_KING, B_PAWN];

function isWhite(piece) {
    return white_pieces.includes(piece);
}

function isBlack(piece) {
    return black_pieces.includes(piece);
}    


class Board {
    constructor() {
        this.table = document.getElementById("chess-board");
        this.rearrange();
    }

    move(x0, y0, x1, y1) {
        let data = this.getPiece(x0, y0);

        if (data == "") {
            return
        }

        this.setPiece(x0, y0, "");
        this.setPiece(x1, y1, data);
    }

    setPiece(x, y, text) {
        this.table.rows[7 - y].cells[1 + x].innerText = text;
    }

    getPiece(x, y) {
        return this.table.rows[7 - y].cells[1 + x].innerText
    }

    getWhitePieces() {
        let piece;
        let pieces = new Array();

        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                piece = this.getPiece(i, j);
                if (isWhite(piece)) {
                    pieces.push({x:i, y:j, piece:piece});
                }
            }
        }

        return pieces;
    }

    getBlackPieces() {
        let piece;
        let pieces = new Array();

        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                piece = this.getPiece(i, j);
                if (isBlack(piece)) {
                    pieces.push({x:i, y:j, piece:piece});
                }
            }
        }

        return pieces;
    }

    rearrange() {
        this.setPiece(0, 7, B_ROOK);
        this.setPiece(1, 7, B_KNIGHT);
        this.setPiece(2, 7, B_BISHOP);
        this.setPiece(3, 7, B_QUEEN);
        this.setPiece(4, 7, B_KING);
        this.setPiece(5, 7, B_BISHOP);
        this.setPiece(6, 7, B_KNIGHT);
        this.setPiece(7, 7, B_ROOK);

        for (let i=0; i<8; i++) {
            this.setPiece(i, 6, B_PAWN);
            this.setPiece(i, 1, W_PAWN);
        }

        this.setPiece(0, 0, W_ROOK);
        this.setPiece(1, 0, W_KNIGHT);
        this.setPiece(2, 0, W_BISHOP);
        this.setPiece(3, 0, W_QUEEN);
        this.setPiece(4, 0, W_KING);
        this.setPiece(5, 0, W_BISHOP);
        this.setPiece(6, 0, W_KNIGHT);
        this.setPiece(7, 0, W_ROOK);
    }
}
