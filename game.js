WHITE = 0
BLACK = 1

class Game {
    constructor() {
        this.board = new Board();
        this.enemy = new Engine();
        this.current_color = "white";
    }

    restart() {
        this.board.rearange();
    }

    move(x0, y0, x1, y1) {
        if (!this.validMovement(x0, y0, x1, y1)) {
            return false;
        }

        if (x0 == x1 && y0 == y1) {
            return false;
        }

        if (this.board.getColor(x0, y0) != this.current_color) {
            return false;
        }

        this.board.move(x0, y0, x1, y1);
        
        let piece = this.board.getPiece(x1, y1);
        if (piece == W_PAWN && y1 == 7) {
            this.board.setPiece(x1, y1, W_QUEEN);
        }

        if (piece == B_PAWN && y1 == 0) {
            this.board.setPiece(x1, y1, B_QUEEN);
        }

        this.current_color = (this.current_color == "white") ? "black" : "white"

        return true;
    }

    letEngineMove() {
        let move = this.enemy.getMove(this.board);
        this.move(move.x0, move.y0, move.x1, move.y1);
    }

    validMovement(x0, y0, x1, y1) {
        let validMoves = pieceMoves(x0, y0, this.board)
        return validMoves.some(e => (e.x == x1 && e.y == y1))
        
        // includes({x:x1, y:y1})
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

function kingMoves(x, y, board) {
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
        moves.push({x:x, y:(y+2)})
    }

    if (board.getColor(x, y+1) == "") {
        moves.push({x:x, y:(y+1)})
    }

    if (x > 0) {
        if (board.getColor(x-1, y+1) == "black") {
            moves.push({x:(x-1), y:(y+1)})
        }
    }

    if (x < 7) {
        if (board.getColor(x+1, y+1) == "black") {
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
        moves.push({x:x, y:(y-2)})
    }

    if (board.getColor(x, y-1) == "") {
        moves.push({x:x, y:(y-1)})
    }

    if (x > 0) {
        if (board.getColor(x-1, y-1) == "white") {
            moves.push({x:(x-1), y:(y-1)})
        }
    }
    
    if (x < 7) {
        if (board.getColor(x+1, y-1) == "white") {
            moves.push({x:(x+1), y:(y-1)})
        }
    }

    return moves;
}