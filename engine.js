// It is probably too time intensive to be calculated here.
// I will rewrite this in c++ or Rust and this Engine class will be just a proxy.

function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
}

class Engine {
    getMove(board) {
        let move;

        let pieces = board.getBlackPieces();
        let targets;
        let randomOrigin;
        let randomTarget;
        
        while (true) {
            randomOrigin = pickRandom(pieces);
            targets = pieceMoves(randomOrigin.x, randomOrigin.y, board);
            
            if (targets.length == 0) {
                // Can't move, try again
                continue;
            }
            
            randomTarget = pickRandom(targets);
            move = {
                x0: randomOrigin.x,
                y0: randomOrigin.y,
                x1: randomTarget.x,
                y1: randomTarget.y,
            };
    
            return move;
        }
    }
}