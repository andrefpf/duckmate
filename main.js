var startX, startY;
var startElement;
var originIndex, targetIndex;
var game;
var x, y;

const grabHandler = function (e) {
    if (e.target.innerText == "") {
        return;
    }

    let draggablePiece = document.getElementById("draggable-piece");
    draggablePiece.innerText = e.target.innerText;
    startElement = e.target;

    const rect = e.target.getBoundingClientRect();
    x = rect.left;
    y = rect.top;

    if (e.type == "touchstart" ) {
        startX = e.touches[0].pageX - x;
        startY = e.touches[0].pageY - y;

    } else {
        startX = e.pageX - x;
        startY = e.pageY - y;
    }

    originIndex = [].slice.call(game.board.table.querySelectorAll('td')).indexOf(e.target);

    draggablePiece.style.left = `${x}px`;
    draggablePiece.style.top = `${y}px`;

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", releaseHandler);
    document.addEventListener("touchmove", moveHandler);
    document.addEventListener("touchend", releaseHandler);
}

const moveHandler = function (e) {
    if (e.type == "touchmove" ) {
        x = e.touches[0].pageX - startX;
        y = e.touches[0].pageY - startY;
    } else {
        x = e.pageX - startX;
        y = e.pageY - startY;   
    }
    
    let draggablePiece = document.getElementById("draggable-piece");
    draggablePiece.style.left = `${x}px`;
    draggablePiece.style.top = `${y}px`;
}

const releaseHandler = function (e) {
    let draggablePiece = document.getElementById("draggable-piece");
    draggablePiece.style.removeProperty("top");
    draggablePiece.style.removeProperty("left");
    draggablePiece.innerText = "";
    
    let target = document.elementFromPoint(x + startX, y + startY);
    targetIndex = [].slice.call(game.board.table.querySelectorAll('td')).indexOf(target);

    game.move(
        originIndex % 8,
        7 - Math.floor(originIndex / 8), 
        targetIndex % 8,
        7 - Math.floor(targetIndex / 8), 
    )
    game.letEngineMove();

    document.removeEventListener("mousemove", moveHandler);    
    document.removeEventListener("mouseup", releaseHandler);
    document.removeEventListener("touchmove", moveHandler);
    document.removeEventListener("touchend", releaseHandler);
}

window.onload = function main() {
    game = new Game();
    game.board.table.querySelectorAll("td").forEach(function (item) {
        item.addEventListener("mousedown", grabHandler);
        item.addEventListener("touchstart", grabHandler);
    });
}