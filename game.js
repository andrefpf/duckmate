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