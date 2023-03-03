let cells = document.querySelectorAll(".cells");
const status = document.querySelector("#statusText");
let reset = document.querySelector("#resetBtn");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];

let running = false;
let currentPlayer = "X";
startGame();


function startGame() {
    running = true;
    status.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    reset.addEventListener("click", resetGame);

}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) {
        return;
    }

    cellUpdate(this, cellIndex);
    checkWinner();
}
function cellUpdate(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    status.textContent = `${currentPlayer}'s turn`;
}

function resetGame() {
    currentPlayer="X";
    options = ["", "", "", "", "", "", "", "", ""];
    status.textContent=`${currentPlayer}'s turn`;
    cells.forEach(cell=>cell.textContent="");
    running=true;

}
function checkWinner() {
    let winner = false;
    for (let i = 0; i < winConditions.length; i++) {
        const conditions = winConditions[i];
        const cellA = options[conditions[0]];
        const cellB = options[conditions[1]];
        const cellC = options[conditions[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            winner = true;
            break;
        }
    }
    if (winner) {
        status.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if (!options.includes("")) {
        status.textContent = `Draw!`;
        running = false;
    }
    else {
        changePlayer();
    }
}