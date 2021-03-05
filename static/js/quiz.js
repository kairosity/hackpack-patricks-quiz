let score = 0;
let Round1Score = 0;
let Round2Score = 0;
let Round3Score = 0;
const time = 60000;

$('document').ready(function () {
    // grab the query parameter from the url and pass it to game setup
    mode = new URLSearchParams(window.location.search).get('mode');
    gameSetup(mode);
    if (mode === "highScores") { // check if highscores has been selected first
        displayHighScores(highScores);
    } else {  //if not highscores then call buildLayout
        buildLayout();
    }
});

/*
Display functions for time and highscores.......
influenced by stackoverflow: https://stackoverflow.com/questions/23025867/game-timer-javascript
*/
// Game timer
function timer() { //time value taken from game setting difficulty
    time = new Date().getTime() + (time); //sets time countdown
    gameTime = setInterval(function () { //uses interval to refresh display
        let now = new Date().getTime(); //sets current time
        timeDiff = time - now; //calcs time difference in correct format
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); //works out minutes
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000); //works out seconds
        timeRemaining = (minutes * 60) + seconds;
        $("#timer").html(minutes + "m : " + seconds + "s "); //updates timer display html
        if (timeDiff < 1000) { //when timer finishes calls outOfTime()
            clearInterval(gameTime);
            $("#timer").html("Time's Up!");
            outOfTime();
        }
    }, 1000); //refresh every second
}

/*
out of time triggers gameLostModal
*/
function outOfTime() {
    $('#gameLostModal').modal('toggle');
}