let round = 1;
let score = 0; //score will be used in display 0/10 and to track result
let startTime = '1m : 00s'; //Used for display only, cn probably be replaced in HTML        CS -> The user has 1 minute to answer the question right? I think it's easier to make it 60seconds 
let round1Score = 0; //store result from round
let round2Score = 0; //store result from round
let round3Score = 0; //store result from round
let time = 60000; //estimated starting time of 60s for 10 questions. may be too long
let roundQuestionNumber = 0;

let questionBlock = document.querySelector("#question")  //CS --> On line 70 you are telling the pc to append "question" to questionBlock but you didn't define it so here it is.

$(window).on('load', function () {
    $('#welcomeModal').modal('show'); //Triggers welcome modal on page load
    $("#timer").html(startTime); //sets start time display before timer() function is called
});

//This function selects the question object to access depending on the level
//Stolen from Claudio's MS2
function questionSelector(round) {
    if (round === 1) {
        levelQuestion = roundOneQuestions;
    } else if (round === 2) {
        levelQuestion = roundTwoQuestions;
    } else if (round === 3) {
        levelQuestion = roundThreeQuestions;
    }
};

document.getElementById("startGame").onclick = function () {
    questionSelector(round)
    startGame(levelQuestion)
};
document.getElementById("roundTwoStart").onclick = function () {
    questionSelector(round)
    startGame(levelQuestion)
};
document.getElementById("roundThreeStart").onclick = function () {
    questionSelector(round)
    startGame(levelQuestion)
};

//when the start game button on welcomeModal is clicked it calls game function
//CS --> Passed the question array and included the questionSelector function so it runs when the button is clicked. That will gives us the "levelQuestion" to pass in startGame                                                                                        

//This function clears all elements children of the main question display spans
function clearBlock() {
    questionBlock.innerHTML = "";
}

function startGame(questions) {
    timer(time); //starts timer() countdown from time variable              // CS --> Commented out this function so it doesn't run whiel we are building the quiz. Once it's dow we need to bring it back to life
    displayQuestions(questions)
    //Need to trigger first question load in here
};

//This function displays the questions and answers ********** Lot's to do!
function displayQuestions(arr) {
    clearBlock();

    //This part of the function displays the question inside #questionBlock
    let randomIndex = Math.floor(Math.random() * arr.length);

    let objectQuestion = arr[randomIndex];

    let currentQuestion = arr[randomIndex].question;

    let question = document.createElement("h1");
    question.setAttribute("id", "questionText");
    question.textContent = currentQuestion;
    questionBlock.append(question);

    //This part of the function displays the answer options inside #questionBlock
    let answerBlock = document.createElement("ul");
    questionBlock.append(answerBlock);

    for (let i = 0; i < objectQuestion.options.length; i++) {
        let answerOptions = document.createElement("li");
        answerOptions.setAttribute("class", "answersList");
        answerOptions.setAttribute("choice-value", objectQuestion.options[i]);
        answerOptions.setAttribute("id", "questionNum-" + i);
        answerOptions.textContent = objectQuestion.options[i];
        answerBlock.append(answerOptions);
    }

    answerBlock.addEventListener("click", function () {
        scoreAnswer(objectQuestion);
    });
}


//This function shows if the selected answer is correct or not and acts accordingly. 
function scoreAnswer(answerSelected) {
    var e = event.target;

    if (e.matches("li")) {
        let selectedItem = e.textContent;

        if (selectedItem === answerSelected.answer && roundQuestionNumber < 9) {
            e.setAttribute("style", "background-color: green");
            setTimeout(function () {
                displayQuestions(levelQuestion);
            }, 500);
            roundQuestionNumber++;
            score++;
            $("#score").html(score); //updates score display html
            $("#out-of").html("/" + roundQuestionNumber); //updates out-of display html
        } else if (selectedItem === answerSelected.answer && roundQuestionNumber == 9) {
            e.setAttribute("style", "background-color: green");
            setTimeout(function () {
            }, 500);
            score++;
            $("#score").html(score); //updates score display html
            $("#out-of").html("/" + roundQuestionNumber); //updates out-of display html
            round++;
            gameStatus();
            roundQuestionNumber = 0;
        } else if (selectedItem !== answerSelected.answer && roundQuestionNumber < 9) {
            e.setAttribute("style", "background-color: red");
            setTimeout(function () {
                displayQuestions(levelQuestion);
            }, 500);
            roundQuestionNumber++;
            $("#score").html(score); //updates score display html
            $("#out-of").html("/" + roundQuestionNumber); //updates out-of display html
        } else if (selectedItem !== answerSelected.answer && roundQuestionNumber == 9) {
            e.setAttribute("style", "background-color: red");
            setTimeout(function () {
            }, 500);
            $("#score").html(score); //updates score display html
            $("#out-of").html("/" + roundQuestionNumber); //updates out-of display html
            round++;
            gameStatus();
            roundQuestionNumber = 0;
        }
    }
}

function gameStatus() {
    if (round == 2) {
        $('#roundTwoModal').modal('show'); //Triggers roundTwoModal
    } else if (round == 3) {
        $('#roundThreeModal').modal('show'); //Triggers roundTwoModal
    } else {
        $('#gameCompleteModal').modal('show'); //Triggers gameCompleteModal
    }
}

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