// tic tac toe game

// Game board function

function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (i=0; i<rows; i++){
        board[i] = [];
        for (j=0; j<columns; j++){
            board[i].push(Cell());
        }
    }

    // method for getting the board
    const getBoard = () => board;

    // method for dropping the token
    const dropToken = (row, column, player) => {
        // method to check if the cell already has a token
        if (board[row][column].getValue() !== 0) {
            return false;
        }

        // add the token to the cell
        board[row][column].addToken(player);
    }

    // method to print the board
    const printBoard = () => {
        const boardWithCellValues = board.map(row => row.map(cell => cell.getValue()));
        console.log(boardWithCellValues);
    }

    // provide an interface for the rest of the application
    return {
        getBoard,
        dropToken,
        printBoard
    };
}

// Cell factory function
function Cell() {
    let value = 0;

    // accept players token
    const addToken = (player) => {
        value = player;
    };

    // return the value of the cell
    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}

// Game controller
function gameController(
    player1 = "Player 1",
    player2 = "Player 2"
    ) {
    const board = Gameboard();
    const players = [
        {
            name: player1,
            token: 1
        },
        {
            name: player2,
            token: 2
        }
    ]
    let currentPlayer = players[0];

    // switch players turn

    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    }
    
    const getActivePlayer = () => currentPlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };

    const playRound = (row, column) => {
        console.log(`dropping ${getActivePlayer().name}'s token at row ${row}, column ${column}`);
        board.dropToken(row, column, getActivePlayer().token);

        // check for winner
        // check for winner in rows
        function checkHorizontal() {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board.getBoard()[i][j].getValue() !== getActivePlayer().token) {
                        break;
                    }
                    if (j === 2) {
                        return true;
                    }
                }
            }
            return false;
        }

        // check for winner in columns
        function checkVertical() {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board.getBoard()[j][i].getValue() !== getActivePlayer().token) {
                        break;
                    }
                    if (j === 2) {
                        return true;
                    }
                }
            }
            return false;
        }

        // check for winner in diagonals
        function checkDiagonal() {
            if (
                (board.getBoard()[0][0].getValue() === getActivePlayer().token &&
                    board.getBoard()[1][1].getValue() === getActivePlayer().token &&
                    board.getBoard()[2][2].getValue() === getActivePlayer().token) ||
                (board.getBoard()[0][2].getValue() === getActivePlayer().token &&
                    board.getBoard()[1][1].getValue() === getActivePlayer().token &&
                    board.getBoard()[2][0].getValue() === getActivePlayer().token)
            ) {
                return true;
            }
            return false;
        }

        // check for a draw
        function checkDraw() {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board.getBoard()[i][j].getValue() === 0) {
                        return false;
                    }
                }
            }
            return true;
        }

        // check for end of game
        if (checkHorizontal() || checkVertical() || checkDiagonal()) {
            console.log(`${getActivePlayer().name} wins!`);
            return;
        }

        // switch player turn
        switchPlayerTurn();
        printNewRound();
    };



    // Initial play game message
    printNewRound();

    return {
        playRound,
        getActivePlayer,
    };
}

game = gameController()