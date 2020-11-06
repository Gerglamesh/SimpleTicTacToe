var whosTurn;
var players = [
    { sign: 'X', playerType: '', score: 0 },
    { sign: 'O', playerType: '', score: 0 }
];
var boardState = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
var difficulty;


function setDifficulty(value) {
    if (value < 1) {
        difficulty = 1;
    } else {
        difficulty = value;
    }
}

function setPlayerType(typesArr) {
    players[0].playerType = typesArr[0];
    players[1].playerType = typesArr[1];
}

function getPlayerScores() {
    return [players[0].score, players[1].score];
}

function resetPlayerScores() {
    players[0].score = 0;
    players[1].score = 0;
}

function start() {
    whosTurn = players[0];

    //AI starts
    if (players[0].playerType === 'AI') {
        if (players[1].playerType === 'AI') {
            while (checkForWinner() == 'none' && emptyCells(boardState).length != 0) {
                turn(aiMove(boardState, players[0], players, difficulty).index, players[0]);
                if (checkForWinner() == 'none' && emptyCells(boardState).length != 0) {
                    turn(aiMove(boardState, players[1], players, difficulty).index, players[1]);
                }
            }
        } else if (players[1].playerType === 'Human') {
            turn(aiMove(boardState, players[0], players, difficulty).index, players[0]);
            whosTurn = players[1];
        }
    }
}

function stop() {
    for (let row = 0; row < boardState.length; row++) {
        for (let col = 0; col < boardState[row].length; col++) {
            boardState[row][col] = '';
        }
    }
    updateGameBoard(boardState);
}

function humanTurn() {
    if ($(this).text() == '') {
        turn((this.id).split(''), whosTurn);

        if (whosTurn === players[0]) {
            whosTurn = players[1];
        } else {
            whosTurn = players[0];
        }

        if (whosTurn.playerType === 'AI' && checkForWinner() == 'none' && emptyCells(boardState).length != 0) {
            turn(aiMove(boardState, whosTurn, players, difficulty).index, whosTurn);
            if (whosTurn === players[0]) {
                whosTurn = players[1];
            } else {
                whosTurn = players[0];
            }
        }
    }
}

function turn(coords, player) {
    if (checkForWinner() == 'none' && emptyCells(boardState).length != 0) {
        boardState[coords[0]][coords[1]] = player.sign;
        updateGameBoard(boardState);
        evaluateBoard();
    }
}

function checkForWinner() {
    //Check rows
    for (let row = 0; row < boardState.length; row++) {
        if (boardState[row][0] == boardState[row][1] && boardState[row][1] == boardState[row][2]) {
            if (boardState[row][0] === players[0].sign) { return players[0]; }
            else if (boardState[row][0] === players[1].sign) { return players[1]; }
        }
    }

    //Check cols
    for (let col = 0; col < boardState.length; col++) {
        if (boardState[0][col] == boardState[1][col] && boardState[1][col] == boardState[2][col]) {
            if (boardState[0][col] === players[0].sign) { return players[0]; }
            else if (boardState[0][col] === players[1].sign) { return players[1]; }
        }
    }

    //Check diagonals
    if (boardState[0][0] == boardState[1][1] && boardState[1][1] == boardState[2][2]) {
        if (boardState[0][0] === players[0].sign) { return players[0]; }
        else if (boardState[0][0] === players[1].sign) { return players[1]; }
    }
    if (boardState[0][2] == boardState[1][1] && boardState[1][1] == boardState[2][0]) {
        if (boardState[0][2] === players[0].sign) { return players[0]; }
        else if (boardState[0][2] === players[1].sign) { return players[1]; }
    }

    return 'none';
}

function evaluateBoard() {
    var winner = checkForWinner();
    if (winner !== 'none') {
        winner.score++;
        showGameOverDisplay(winner.sign + ' won!');
    } else if (emptyCells().length === 0) {
        showGameOverDisplay("It's a tie!");
    }
}

function emptyCells() {
    let emptyCells = [];
    for (let row = 0; row < boardState.length; row++) {
        for (let col = 0; col < boardState[row].length; col++) {
            if (boardState[row][col] === '') {
                emptyCells.push([row, col]);
            }
        }
    }
    return emptyCells;
}