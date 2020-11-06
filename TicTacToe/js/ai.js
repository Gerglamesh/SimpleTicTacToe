var origDepth;

function miniMax(boardState, player, allPlayers, depth) {

    //First check if depth's been reached or if game is over
    if (depth == 0) {
        return { score: 0 };
    } else if (checkForWinner() === allPlayers[1]) {
        return { score: -10 };
    } else if (checkForWinner() === allPlayers[0]) {
        return { score: 10 };
    } else if (emptyCells(boardState).length === 0) {
        return { score: 0 };
    }


    //Go through board recursively and score all possible moves (until depth is reached)
    var moves = [];
    for (let row = 0; row < boardState.length; row++) {
        for (let col = 0; col < boardState[row].length; col++) {
            if (boardState[row][col] === '') {
                var move = {};

                move.index = `${row}${col}`;         //Store current move
                boardState[row][col] = player.sign;  //Make current move

                if (player === players[0]) {
                    var result = miniMax(boardState, allPlayers[1], allPlayers, depth - 1);      //Evaluate current move
                    move.score = result.score;                                                   //Store moves score
                } else {
                    var result = miniMax(boardState, allPlayers[0], allPlayers, depth - 1);      //Evaluate current move
                    move.score = result.score;                                                   //Store moves score
                }

                //Undo move
                boardState[row][col] = '';

                //Store move in moves collection
                moves.push(move);
            }
        }
    }

    //Find the best move and return it
    var highestScoreMove;
    if (player === allPlayers[0]) {
        var bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                highestScoreMove = i;
            }
        }
    } else {
        var bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                highestScoreMove = i;
            }
        }
    }

    if (depth === origDepth) {
        //return both best move and whole movelist to give the ability
        //to chooose between the best move or randomizing move among all 
        //equally good (best) moves.
        return { movesList: moves, bestMove: moves[highestScoreMove] };
    }
    else {
        return moves[highestScoreMove];
    }
}


function aiMove(boardState, player, allPlayers, depth) {

    origDepth = depth;
    var moves = miniMax(boardState, player, allPlayers, depth);

    //if more than one move are equally scored, randomize between them
    var allBestMoves = $.grep(moves.movesList, function (move) {
        return move.score === moves.bestMove.score;
    });

    return allBestMoves[Math.floor(Math.random() * allBestMoves.length)];
}