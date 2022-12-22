class Game {
    constructor() {
        this.board = new Board();
        this.engine = new Engine();
        this.currentColor = WHITE;
        this.running = true;
    }

    restart() {
        this.running = true;
        this.currentColor = WHITE;
        this.board.restart();
    }

    move(x0, y0, x1, y1) {
        if (!this.validMovement(x0, y0, x1, y1)) {
            return false;
        }

        if (x0 == x1 && y0 == y1) {
            return false;
        }

        if (this.board.getColor(x0, y0) != this.currentColor) {
            return false;
        }

        let piece = this.board.getPiece(x0, y0);

        // Castle
        if (piece == W_KING && x0 == 4 && x1 == 6) {
            this.board.move(7, 0, 5, 0);
        }
        else if (piece == W_KING && x0 == 4 && x1 == 2) {
            this.board.move(0, 0, 3, 0);
        }
        else if (piece == B_KING && x0 == 4 && x1 == 6) {
            this.board.move(7, 7, 5, 7);
        }
        else if (piece == B_KING && x0 == 4 && x1 == 2) {
            this.board.move(0, 7, 3, 7);
        }        

        this.board.move(x0, y0, x1, y1);
        
        // Pawn promotion
        if (piece == W_PAWN && y1 == 7) {
            this.board.setPiece(x1, y1, W_QUEEN);
        }
        if (piece == B_PAWN && y1 == 0) {
            this.board.setPiece(x1, y1, B_QUEEN);
        }
        
        let engineBoard = new EngineBoard();
        engineBoard.fromBoard(this.board);

        this.currentColor = (this.currentColor == WHITE) ? BLACK : WHITE
        this.handleGameOver();
        return true;
    }

    handleGameOver() {
        if (!this.board.getWhitePieces().some(element => element.piece == W_KING)) {
            this.running = false;
            return this.board.gameOver("Pretas vencem!")
        }
        
        if (!this.board.getBlackPieces().some(element => element.piece == B_KING)) {
            this.running = false;
            return this.board.gameOver("Brancas vencem!")
        }
    }

    letEngineMove() {
        let move = this.engine.getMove(this.board);
        this.move(move.x0, move.y0, move.x1, move.y1);
    }

    validMovement(x0, y0, x1, y1) {
        let validMoves = pieceMoves(x0, y0, this.board);
        return validMoves.some(e => (e.x == x1 && e.y == y1));
    }
}

function pieceMoves(x, y, board) {
    let piece = board.getPiece(x, y);
    switch (piece) {
        case W_ROOK:
        case B_ROOK:
            return rookMoves(x, y, board);
        case W_BISHOP:
        case B_BISHOP:
            return bishopMoves(x, y, board);
        case W_QUEEN:
        case B_QUEEN:
            return queenMoves(x, y, board);
        case W_KING:
        case B_KING:
            return kingMoves(x, y, board);
        case W_KNIGHT:
        case B_KNIGHT:
            return knightMoves(x, y, board);
        case W_PAWN:
            return whitePawnMoves(x, y, board);
        case B_PAWN:
            return blackPawnMoves(x, y, board);
        default:
            return [];
        }
}

function rookMoves(x, y, board) {
    let moves = new Array();
    let origin_color = board.getColor(x, y);
    let target_color;

    if (origin_color == "") {
        return moves;
    }

    for (let i=(x+1); i<8; i++) {
        target_color = board.getColor(i, y);
        
        if (target_color == "") {
            moves.push({x:i, y:y});
        }
        else if (target_color == origin_color) {
            break;
        } 
        else {
            moves.push({x:i, y:y});
            break;
        }
    }
    
    for (let i=(x-1); i>=0; i--) {
        target_color = board.getColor(i, y);

        if (target_color == "") {
            moves.push({x:i, y:y})
        }
        else if (target_color == origin_color) {
            break;
        } 
        else {
            moves.push({x:i, y:y})
            break;
        }
    }

    for (let i=(y+1); i<8; i++) {
        target_color = board.getColor(x, i);
        
        if (target_color == "") {
            moves.push({x:x, y:i})
        }
        else if (target_color == origin_color) {
            break;
        } 
        else {
            moves.push({x:x, y:i})
            break;
        }
    }
    
    for (let i=(y-1); i>=0; i--) {
        target_color = board.getColor(x, i);

        if (target_color == "") {
            moves.push({x:x, y:i})
        }
        else if (target_color == origin_color) {
            break;
        } 
        else {
            moves.push({x:x, y:i})
            break;
        }
    }

    return moves;
}

function bishopMoves(x, y, board) {
    let moves = new Array();
    let origin_color = board.getColor(x, y);
    let target_color;

    if (origin_color == "") {
        return moves;
    }

    for (let i=(x+1), j=(y+1); i<8 && j<8; i++, j++) {
        target_color = board.getColor(i, j);
        
        if (target_color == "") {
            moves.push({x:i, y:j});
        }
        else if (target_color == origin_color) {
            break;
        } 
        else {
            moves.push({x:i, y:j});
            break;
        }
    }

    for (let i=(x+1), j=(y-1); i<8 && j>=0; i++, j--) {
        target_color = board.getColor(i, j);
        
        if (target_color == "") {
            moves.push({x:i, y:j});
        }
        else if (target_color == origin_color) {
            break;
        } 
        else {
            moves.push({x:i, y:j});
            break;
        }
    }

    for (let i=(x-1), j=(y+1); i>=0 && j<8; i--, j++) {
        target_color = board.getColor(i, j);
        
        if (target_color == "") {
            moves.push({x:i, y:j});
        }
        else if (target_color == origin_color) {
            break;
        } 
        else {
            moves.push({x:i, y:j});
            break;
        }
    }

    for (let i=(x-1), j=(y-1); i>=0 && j>=0; i--, j--) {
        target_color = board.getColor(i, j);
        
        if (target_color == "") {
            moves.push({x:i, y:j});
        }
        else if (target_color == origin_color) {
            break;
        } 
        else {
            moves.push({x:i, y:j});
            break;
        }
    }

    return moves;
}

function queenMoves(x, y, board) {
    let rook = rookMoves(x, y, board);
    let bishop = bishopMoves(x, y, board);
    return rook.concat(bishop);
}

function kingMoves(x, y, board, castleStatus) {
    let moves = new Array();
    let existing_moves = [
        {x:(x-1), y:(y-1)},
        {x:(x-1), y:y},
        {x:(x-1), y:(y+1)},

        {x:x, y:(y-1)},
        {x:x, y:(y+1)},

        {x:(x+1), y:(y-1)},
        {x:(x+1), y:y},
        {x:(x+1), y:(y+1)},
    ]

    for (const move of existing_moves) {
        if (move.x < 0 || move.x >= 8 || move.y < 0 || move.y >= 8) {
            continue;
        }

        if (board.getColor(move.x, move.y) == board.getColor(x, y)) {
            continue;
        }

        moves.push(move);
    }

    moves = moves.concat(castleMoves(x, y, board));
    return moves;
}

function castleMoves(x, y, board) {
    let moves = new Array();

    if (board.getColor(x, y) == WHITE) {
        if (board.castleStatus.whiteShort 
            && board.getColor(5, 0) == "" 
            && board.getColor(6, 0) == "") 
        {
            moves.push({x:6, y:0})
        }
    
        if (board.castleStatus.whiteLong
            && board.getColor(1, 0) == "" 
            && board.getColor(2, 0) == "" 
            && board.getColor(3, 0) == "")
        {
            moves.push({x:2, y:0})
        }
    }
    else if (board.getColor(x, y) == BLACK) {
        if (board.castleStatus.blackShort 
            && board.getColor(5, 7) == "" 
            && board.getColor(6, 7) == "") 
        {
            moves.push({x:6, y:7})
        }
    
        if (board.castleStatus.blackLong
            && board.getColor(1, 7) == "" 
            && board.getColor(2, 7) == "" 
            && board.getColor(3, 7) == "")
        {
            moves.push({x:2, y:7})
        }
    }

    return moves;
}

function knightMoves(x, y, board) {
    let moves = new Array();
    let existing_moves = [
        {x:(x-1), y:(y-2)},
        {x:(x-1), y:(y+2)},

        {x:(x-2), y:(y-1)},
        {x:(x-2), y:(y+1)},

        {x:(x+1), y:(y-2)},
        {x:(x+1), y:(y+2)},

        {x:(x+2), y:(y-1)},
        {x:(x+2), y:(y+1)},
    ]

    for (const move of existing_moves) {
        if (move.x < 0 || move.x >= 8 || move.y < 0 || move.y >= 8) {
            continue;
        }

        if (board.getColor(move.x, move.y) == board.getColor(x, y)) {
            continue;
        }

        moves.push(move);
    }

    return moves;
}

function whitePawnMoves(x, y, board) {
    let moves = new Array();

    if (y >= 7) {
        return moves;
    }
    
    if (y == 1) {
        if (board.getColor(x, y+1) == "" && board.getColor(x, y+2) == "") {
            moves.push({x:x, y:(y+2)})
        }
    }

    if (board.getColor(x, y+1) == "") {
        moves.push({x:x, y:(y+1)})
    }

    if (x > 0) {
        if (board.getColor(x-1, y+1) == BLACK) {
            moves.push({x:(x-1), y:(y+1)})
        }
    }

    if (x < 7) {
        if (board.getColor(x+1, y+1) == BLACK) {
            moves.push({x:(x+1), y:(y+1)})
        }
    }

    return moves;
}

function blackPawnMoves(x, y, board) {
    let moves = new Array();

    if (y <= 0) {
        return moves;
    }

    if (y == 6) {
        if (board.getColor(x, y-1) == "" && board.getColor(x, y-2) == "") {
            moves.push({x:x, y:(y-2)})
        }
    }

    if (board.getColor(x, y-1) == "") {
        moves.push({x:x, y:(y-1)})
    }

    if (x > 0) {
        if (board.getColor(x-1, y-1) == WHITE) {
            moves.push({x:(x-1), y:(y-1)})
        }
    }
    
    if (x < 7) {
        if (board.getColor(x+1, y-1) == WHITE) {
            moves.push({x:(x+1), y:(y-1)})
        }
    }

    return moves;
}