// It is probably too time intensive to be calculated here.
// I will rewrite this in c++ or Rust and this Engine class will be just a proxy.

BIG_NUMBER = 100000000000; // infinity does not work here and I dont know why

function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
}

total_combinations = 0

class EngineBoard {
    constructor() {
        this.data = new Array(64);
        this.castleStatus = new CastleStatus();
    }

    fromBoard(board) {
        this.castleStatus.whiteLong = board.castleStatus.whiteLong;
        this.castleStatus.whiteShort = board.castleStatus.whiteShort;
        this.castleStatus.blackLong = board.castleStatus.blackLong;
        this.castleStatus.blackShort = board.castleStatus.blackShort;

        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                this.setPiece(i, j, board.getPiece(i, j));
            }
        }
    }

    move(x0, y0, x1, y1) {
        let newBoard = new EngineBoard();
        newBoard.fromBoard(this);

        let piece = this.getPiece(x0, y0);

        // handle castles
        if (piece == W_KING) {
            this.castleStatus.whiteLong = false;
            this.castleStatus.whiteShort = false;
        }
        else if (piece == B_KING) {
            this.castleStatus.blackLong = false;
            this.castleStatus.blackShort = false;
        }
        
        if (piece == W_ROOK) {
            if (x0 == 0) {
                this.castleStatus.whiteLong = false;
            }
            else if (x0 == 7) {
                this.castleStatus.whiteLong = false;
            }
        }
        else if (piece == B_ROOK) {
            if (x0 == 0) {
                this.castleStatus.blackLong = false;
            }
            else if (x0 == 7) {
                this.castleStatus.blackLong = false;
            }
        }
        
        newBoard.setPiece(x0, y0, "");
        newBoard.setPiece(x1, y1, piece);
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
            return WHITE;
        }
        else if (isBlack(piece)) {
            return BLACK;
        }
        return "";    
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

    pieceValue(piece) {
        switch (piece) {
            case W_KING:
                return BIG_NUMBER;
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

    evaluateStatic(color) {
        let score = 0;

        score += this.evaluatePieceValues();
        score += this.evaluateCenterDomination();
        
        if (color == WHITE) {
            return score;        
        }
        else {
            return -score;
        }
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
        let squareValue;

        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                color = this.getColor(i, j);
                squareValue = i*(7-i) + j*(7-j);
                
                if (color == WHITE) {
                    score += squareValue * 0.2;
                }
                else if (color == BLACK) {
                    score -= squareValue * 0.2;
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
        let engineBoard = new EngineBoard();
        engineBoard.fromBoard(board);
        let move = this.recursiveSelectMove(engineBoard, BLACK, 2);
        return move;
    }

    recursiveSelectMove(board, color, interations) {
        let bestMove = null;
        let bestScore;
        let tmpScore;

        let pieces = (color == WHITE) ? board.getWhitePieces() : board.getBlackPieces();
        let moves = this.allMoves(pieces, board);

        total_combinations += moves.length

        for (let move of moves) {
            tmpScore = this.recursiveEvaluatePosition(
                board.move(move.x0, move.y0, move.x1, move.y1), 
                color, 
                interations
            );

            if (bestMove === null || bestScore < tmpScore) {
                bestMove = move;
                bestScore = tmpScore;
            }
        }
        
        return bestMove;
    }

    recursiveEvaluatePosition(board, color, interations) {
        let staticScore = board.evaluateStatic(color);

        if (interations <= 0) {
            return staticScore;
        }

        let next_color = (color == WHITE) ? BLACK : WHITE;
        let enemyMove = this.recursiveSelectMove(board, next_color, interations-1);

        if (enemyMove === null) {
            return BIG_NUMBER;
        }

        let enemyScore = this.recursiveEvaluatePosition(
            board.move(enemyMove.x0, enemyMove.y0, enemyMove.x1, enemyMove.y1),
            next_color,
            interations-1            
        );

        return - enemyScore;
    }

    // selectBestMove(moves, board, color) {
    //     let bestMove = null;
    //     let bestScore;
    //     let tmpScore;

    //     let originalBoard = new EngineBoard();
    //     originalBoard.fromBoard(board);

    //     for (let move of moves) {
    //         tmpScore = originalBoard.move(move.x0, move.y0, move.x1, move.y1).evaluateStatic(color);

    //         if (bestMove === null 
    //             || bestScore < tmpScore 
    //             || (bestScore == tmpScore && Math.random() > 0.5)) 
    //         {
    //             bestMove = move;
    //             bestScore = tmpScore;
    //         }
    //     }

    //     return bestMove;
    // }
}