// Define the cell factory to represent a single cell on the board
function Cell(){
    let value = '';

    // Method to update the cell's value with the player's token
    const addToken = (token) => {
    value = token;
    };

    // Method to retrieve the current value of the cell
    const getValue = () => value;
    return {
        addToken,
        getValue
    };

}

// Define the gameboard factory to represent the game board
function Gameboard() {
    const board = [];
    const rows = 3;
    const columns = 3;

    for (let i=0; i<rows; i++){
        board[i] = [];
        for (let j=0; j<columns; j++){
            board[i].push(Cell());
        }
    }

    // Method to get the cirrent state of the board
    const getBoard = () => board;

    // Method to drop the player's token into a specific cell
    const dropToken = (row, column, token) => {
        board[row][column].addToken(token);
    };

    // Method to print the current state of the board
    const printBoard = () => {
        board.forEach(row => {
            console.log(row.map(cell => cell.getValue()).join(''));
        });
    };

    // Method to check for a winner
    const checkForWinner = () => {
    
    };
    // Method to check if the board is full
    const isBoardFull = () => {
    
    };
    // Method to reset board
    const resetBoard = () => {
    
    };

    return {
        getBoard,
        dropToken,
        printBoard,
        checkForWinner,
        isBoardFull,
        resetBoard
    };
}

// Define the player factory function to represent a player
function Player(name, token) {
    return {
        name,
        token
    };
}

const GameController = (() => {
    const player1 = Player('Player One', 'X');
    const player2 = Player('Player Two', 'O');
    let activePlayer = player1;
    const board = Gameboard();

    // Method to switch the active player
    const switchPlayerTurn = () => {
     activePlayer = activePlayer === player1 ? player2: player1
    };

    // Method to switch the player's move
    const handleMove = (row, column) => {
        if (board.getBoard()[row][column].getValue() == ''){
            board.dropToken(row, column, activePlayer.token);
            switchPlayerTurn();
            board.printBoard();

        } else {
            console.log('This cell is already occupied. Please choose another cell.')
        }
    };

    // Method to reset the game
    const resetGame = () => {
        board.resetBoard();
        activePlayer = player1;
        console.log('Game reset. Player one starts.');
        board.printBoard();
    };

    console.log('Game starts. Player one starts');
    board.printBoard();

    return {
        handleMove,
        resetGame
    };
})();