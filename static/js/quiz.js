let round = 1;
let score = 0; //score will be used in display 0/10 and to track result
let startTime = ' 60s'; //Used for display only, cn probably be replaced in HTML        CS -> The user has 1 minute to answer the question right? I think it's easier to make it 60seconds 
let round1Score = 0; //store result from round
let round2Score = 0; //store result from round
let round3Score = 0; //store result from round
let time = 60000; //estimated starting time of 60s for 10 questions. may be too long
let totalScore = 0;
let roundQuestionNumber = 0;
let levelComplete = false;
let objectQuestions;

let questionBlock = document.querySelector("#question")  //CS --> On line 70 you are telling the pc to append "question" to questionBlock but you didn't define it so here it is.

$(window).on('load', function () {
    $('#welcomeModal').modal({ backdrop: 'static', keyboard: false }); //Triggers welcome modal on page load
    $("#timer").html(startTime); //sets start time display before timer() function is called
});

document.getElementById("startGame").onclick = function () {
    startGame(roundOneQuestions);
};
document.getElementById("roundTwoStart").onclick = function () {
    updateScoreAndOutOf();
    startGame(roundTwoQuestions);
};
document.getElementById("roundThreeStart").onclick = function () {
    updateScoreAndOutOf();
    startGame(roundThreeQuestions);
};
document.getElementById("restartGame").onclick = function () {
    updateScoreAndOutOf();
    startGame(roundOneQuestions);
};

//when the start game button on welcomeModal is clicked it calls game function
//CS --> Passed the question array and included the questionSelector function so it runs when the button is clicked. That will gives us the "levelQuestion" to pass in startGame                                                                                        

//This function clears all elements children of the main question display spans
function clearBlock() {
    questionBlock.innerHTML = "";
}

function startGame(questions) {
    levelComplete = false;
    timer(time);
    randomiseQuestions(questions);

    //Need to trigger first question load in here
};

function randomiseQuestions(arr) {
    objectQuestions = arr.sort(function () { return 0.5 - Math.random(); });
    displayQuestions(objectQuestions);
}

//This function displays the questions and answers ********** Lot's to do!
function displayQuestions(arr) {
    clearBlock();

    //This part of the function displays the question inside #questionBlock
    let currentObject = arr[roundQuestionNumber];
    let currentQuestion = currentObject.question;

    let question = document.createElement("h1");
    question.setAttribute("id", "questionText");
    question.textContent = currentQuestion;
    questionBlock.append(question);

    //This part of the function displays the answer options inside #questionBlock
    let answerBlock = document.createElement("ul");
    questionBlock.append(answerBlock);

    for (let i = 0; i < currentObject.options.length; i++) {
        let answerOptions = document.createElement("li");
        answerOptions.setAttribute("class", "answersList");
        answerOptions.setAttribute("choice-value", currentObject.options[i]);
        answerOptions.setAttribute("id", "questionNum-" + i);
        answerOptions.textContent = currentObject.options[i];
        answerBlock.append(answerOptions);
    }

    answerBlock.addEventListener("click", function () {
        scoreAnswer(currentObject);
    });
}

//This function shows if the selected answer is correct or not and acts accordingly. 
function scoreAnswer(answerSelected) {
    var e = event.target;

    if (e.matches("li")) {
        let selectedItem = e.textContent;
        roundQuestionNumber++;

        if (selectedItem === answerSelected.answer) {
            if (roundQuestionNumber == 10) {
                e.setAttribute("style", "background-color: green");
                score++;
                updateScoreAndOutOf();
                round++;
                levelComplete = true;
                gameStatus();
            } else {
                e.setAttribute("style", "background-color: green");
                score++;
                setTimeout(function () { displayQuestions(objectQuestions); }, 500);
                updateScoreAndOutOf();
            }
        } else if (roundQuestionNumber == 10) {
            e.setAttribute("style", "background-color: red");
            updateScoreAndOutOf();
            round++;
            levelComplete = true;
            gameStatus();
        } else {
            e.setAttribute("style", "background-color: red");
            setTimeout(function () { displayQuestions(objectQuestions); }, 500);
            updateScoreAndOutOf();
        }
    }
}


function gameStatus() {
    if (round == 2) {
        round1Score = score;
        $('#roundTwoModal').modal('show'); //Triggers roundTwoModal
        $("#round1Score").html(" " + round1Score + " / 10");
        resetRoundAndScore();
    } else if (round == 3) {
        round2Score = score;
        $('#roundThreeModal').modal('show'); //Triggers roundTwoModal
        $("#round2Score").html(" " + round2Score + " / 10");
        resetRoundAndScore();
    } else {
        round3Score = score;
        $('#gameCompleteModal').modal('show'); //Triggers gameCompleteModal
        totalScore = (round1Score + round2Score + round3Score);
        $("#total-score").html(" " + totalScore + " / 30");
        $("#score-to-pass").html(totalScore);
        $("#score-to-pass").val(totalScore);
        resetRoundAndScore();
    }
}

function updateScoreAndOutOf() {
    $("#score").html(" " + score + " / " + roundQuestionNumber); //updates score display html
}

function resetRoundAndScore() {
    roundQuestionNumber = 0;
    score = 0;
}

/*
Display functions for time and highscores.......
influenced by stackoverflow: https://stackoverflow.com/questions/23025867/game-timer-javascript
*/
// Game timer
function timer(time) { //time value taken from game setting difficulty
    time = new Date().getTime() + (time); //sets time countdown
    gameTime = setInterval(function () { //uses interval to refresh display
        let now = new Date().getTime(); //sets current time
        timeDiff = time - now; //calcs time difference in correct format
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000); //works out seconds
        timeRemaining = seconds;
        $("#timer").html(" " + seconds + "s "); //updates timer display html
        if (levelComplete) {
            $("#timer").html("Finished");
            clearInterval(gameTime);
        }
        else if (timeDiff < 1000) { //when timer finishes calls outOfTime()
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
    resetRoundAndScore();
    updateScoreAndOutOf();
}
