// It is probably too time intensive to be calculated here.
// I will rewrite this in c++ or Rust and this Engine class will be just a proxy.

class Engine {
    getMove(board) {
        let move;
        let targetSquare;

        let pieces = board.getBlackPieces();
        let randomPiece = pieces[Math.floor(Math.random() * pieces.length)];

        while (true) {
            move = {
                x0: randomPiece.x,
                y0: randomPiece.y,
                x1: Math.floor(Math.random() * 8),
                y1: Math.floor(Math.random() * 8),
            };

            targetSquare = board.getPiece(move.x1, move.y1);
            if (!isBlack(targetSquare)) {
                break;
            }
        }

        return move;
    }
}