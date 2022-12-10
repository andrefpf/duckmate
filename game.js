WHITE = 0
BLACK = 1

class Game {
    constructor(color) {
        this.color = color;
        this.board = Board();
        this.enemy = Engine();
    }

    restart() {
        this.board.rearange();

        if (this.color == BLACK) {
            let move = this.enemy.getMove();
            this.move(move.x0, move.y0, move.x1, move.y1);
        }
    }

    move(x0, y0, x1, y1) {
        if (!this.validMovement(x0, y0, x1, y1)) {
            return;
        }

        this.board.move(x0, y0, x1, y1);
    }

    validMovement(x0, y0, x1, y1) {
        return true;
    }
}