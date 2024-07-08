document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.getElementById("restart");
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

        if (board[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            gameActive = false;
            return;
        }

        if (!board.includes("")) {
            alert("It's a draw!");
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
    };

    const checkWin = () => {
        for (let condition of winningConditions) {
            let [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    };

    const restartGame = () => {
        currentPlayer = "X";
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        cells.forEach(cell => cell.textContent = "");
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", restartGame);
});
