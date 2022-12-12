WHITE = 0
BLACK = 1

class Game {
    constructor() {
        this.color = BLACK;
        this.board = new Board();
        this.enemy = new Engine();
    }

    restart() {
        this.board.rearange();

        if (this.color == BLACK) {
            this.getEngineMove();
        }
    }

    move(x0, y0, x1, y1) {
        if (!this.validMovement(x0, y0, x1, y1)) {
            return;
        }

        this.board.move(x0, y0, x1, y1);   
    }

    letEngineMove() {
        let move = this.enemy.getMove(this.board);
        this.move(move.x0, move.y0, move.x1, move.y1);
    }

    validMovement(x0, y0, x1, y1) {
        return true;
    }
}

function pieceMoves(x, y, board) {
    return rookMoves(x, y, board);
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

    for (let i=(x+1), j=(y+1); i<8, j<8; i++, j++) {
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