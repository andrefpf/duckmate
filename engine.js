// It is probably too time intensive to be calculated here.
// I will rewrite this in c++ or Rust and this Engine class will be just a proxy.

function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
}

class EngineBoard {
    constructor() {
        this.data = new Array(64);
    }

    fromBoard(board) {
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                this.setPiece(i, j, board.getPiece(i, j));
            }
        }
    }

    move(x0, y0, x1, y1) {
        let newBoard = new EngineBoard();
        newBoard.data = this.data.slice();
        newBoard.setPiece(x0, y0, "");
        newBoard.setPiece(x1, y1, this.getPiece(x0, y0));
        return newBoard;
    }

    setPiece(x, y, text) {
        return this.data[y*8 + x] = text;
    }

    getPiece(x, y) {
        return this.data[y*8 + x];
    }

    getColor(x, y) {
        let piece = this.getPiece(x, y);
        if (isWhite(piece)) {
            return "white";
        }
        else if (isBlack(piece)) {
            return "black";
        }
        return "";    
    }

    pieceValue(piece) {
        switch (piece) {
            case W_KING:
                return 10000;
            case W_QUEEN:
                return 9;
            case W_ROOK:
                return 5;
            case W_BISHOP:
            case W_KNIGHT:
                return 3
            case W_PAWN:
                return 1;

            case B_KING:
                return -10000;
            case B_QUEEN:
                return -9;
            case B_ROOK:
                return -5;
            case B_BISHOP:
            case B_KNIGHT:
                return -3
            case B_PAWN:
                return -1;
            
            default:
                return 0;
        }
    }

    evaluateStatic() {
        let score = 0;

        score += this.evaluatePieceValues();
        score += this.evaluateCenterDomination();
        
        return score;        
    }

    evaluatePieceValues() {
        let score = 0;
        let piece;

        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                piece = this.getPiece(i, j);
                score += this.pieceValue(piece);
            }
        }
        
        return score;        
    }

    evaluateCenterDomination() {
        let score = 0;
        let color;

        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                color = this.getColor(i, j);
                if (color == "white") {
                    score += i*(i-7) * 0.2;
                    score += j*(j-7) * 0.2;
                }
                else if (color == "black") {
                    score -= i*(i-7) * 0.2;
                    score -= j*(j-7) * 0.2;
                }
            }
        }
        
        return score;        
    }
}

class Engine {
    allMoves(pieces, board) {
        let moves = new Array();

        for (let piece of pieces) {
            for (let move of pieceMoves(piece.x, piece.y, board)) {
                moves.push({x0:piece.x, y0:piece.y, x1:move.x, y1:move.y});
            }
        }

        return moves;
    }

    getMove(board) {
        let pieces = board.getBlackPieces();
        let moves = this.allMoves(pieces, board);
        return this.selectBestMove(moves, board, "black");
    }
    
    recursiveMoveSelection(board, color, interation) {
        let pieces = (color == "white") ? board.getWhitePieces() : board.getBlackPieces();
        let moves = this.allMoves(pieces, board);
        let next_color = color == "white"? "black" : "white";

    }

    selectBestMove(moves, board, color) {
        let bestMove = null;
        let bestScore;
        let tmpScore;

        let originalBoard = new EngineBoard();
        originalBoard.fromBoard(board);

        for (let move of moves) {
            tmpScore = originalBoard.move(move.x0, move.y0, move.x1, move.y1).evaluateStatic();

            if (color == "white") {
                if (bestMove === null 
                    || bestScore > tmpScore 
                    || (bestScore == tmpScore && Math.random() > 0.5)) 
                {
                    bestMove = move;
                    bestScore = tmpScore;
                }
            }
            else if (color == "black") {
                if (bestMove === null 
                    || bestScore < tmpScore 
                    || (bestScore == tmpScore && Math.random() > 0.5)) 
                {
                    bestMove = move;
                    bestScore = tmpScore;
                }
            }
        }

        return bestMove;
    }
}