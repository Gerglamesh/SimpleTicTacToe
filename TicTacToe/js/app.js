//Main
$(() => {
    //Because of documented trouble when using jQuery with range ordinary js is used instead
    document.getElementById("difficulty-slider").addEventListener('input', function () { updateDifficulty(this.value) });
    $("#start-button").on('click', startClick);
    $(".player-select").change(updatePlayerSettings);
    $("#reset-button").on('click', resetScoreBoard);

    updateDifficulty(5);
    updatePlayerSettings();
    gameBoardEnabled(false);
    pSettingsAccess(true);
    updateScoreBoard();
});

function updateDifficulty(sliderValue) {
    $("#slider-value").text('ai difficulty: ' + sliderValue);
    setDifficulty(sliderValue);

    if (sliderValue <= 2) {
        $("#difficulty-image").attr('src', 'images/Baby.png');
        $("#slider-value").css('color', 'ivory');
    } else if (sliderValue >= 3 && sliderValue <= 4) {
        $("#difficulty-image").attr('src', 'images/Normal.png');
        $("#slider-value").css('color', 'yellow');
    } else if (sliderValue >= 5 && sliderValue <= 6) {
        $("#difficulty-image").attr('src', 'images/Hard.png');
        $("#slider-value").css('color', 'orange');
    } else {
        $("#difficulty-image").attr('src', 'images/Insane.png');
        $("#slider-value").css('color', 'red');
    }
}

function updatePlayerSettings() {
    setPlayerType(
        [$("#player1-select option:selected").val(),
        $("#player2-select option:selected").val()]
    );
}

function startClick() {
    if ($("#start-button").text() === "start game") {
        $("#start-button").text("stop game");
        gameBoardEnabled(true);
        start();
    } else {
        $("#start-button").text("start game");
        gameBoardEnabled(false);
        $("#game-over-display").hide();
        stop();
    }
}

function gameBoardEnabled(bool) {
    if (bool) {
        $(".cell").css("border-color", "ivory");
        $(".cell").on('click', humanTurn);
        pSettingsAccess(false);
    } else {
        $(".cell").css("border-color", "grey");
        $(".cell").unbind();
        pSettingsAccess(true);
    }
}

function pSettingsAccess(bool) {
    if (bool) {
        $(".droplist").prop("disabled", false);
        $(".droplist").css('color', 'ivory');
    } else {
        $(".droplist").prop("disabled", true);
        $(".droplist").css('color', 'grey');
    }
}

function updateGameBoard(boardState) {
    for (let row = 0; row < boardState.length; row++) {
        for (let col = 0; col < boardState[row].length; col++) {
            $("#game-board div:nth-child(" + (row + 1) + ") \
            div:nth-child(" + (col + 1) + ")").text(boardState[row][col]);
        }
    }
}

function updateScoreBoard() {
    var scores = getPlayerScores();
    $("#x-score").text('x: ' + scores[0]);
    $("#o-score").text('o: ' + scores[1]);
}

function resetScoreBoard() {
    resetPlayerScores();
    updateScoreBoard();
}

function showGameOverDisplay(message) {
    $("#game-over-display > p").text(message);
    $("#game-over-display").show();
    updateScoreBoard();
    $("#start-button").text("reset game");
}
