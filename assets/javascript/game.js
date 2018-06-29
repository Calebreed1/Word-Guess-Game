
var genreArray = [
    {
        word: "peaches",
        image2: "assets/images/peaches.jpg"
    },
    {
        word: "queen",
        image2: "assets/images/queen.jpg"
    },
    {
        word: "garden",
        image2: "assets/images/garden.jpeg"
    },
    {
        word: "guitar",
        image2: "assets/images/guitar.jpg"
    },
    {
        word: "sun",
        image2: "assets/images/sun.jpeg"
    },
    {
        word: "mustang",
        image2: "assets/images/mustang.jpg"
    }]


var gameStatus = false;

var randomNumber = Math.floor(Math.random() * genreArray.length);

var things = genreArray[randomNumber].word;
var myImage1 = genreArray[randomNumber].image1
var myImage2 = genreArray[randomNumber].image2

var lettersRemaining = things.length;

var answerArray = [];


document.addEventListener("keyup", function (event) {
    if (gameStatus) {
        letterCheck(event);
    } else {
        init();
    }
});

var alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function letterCheck(guess) {
    if (alphabetArray.indexOf(guess.key) > -1) {
        correctGuessCheck(guess);
    }
}

var winScore = 0;
function correctGuessCheck(guess) {
    if (things.indexOf(guess.key) > -1) {
        correctGuess(guess);
    } else {
        incorrectGuess(guess);
    }
}

function correctGuess(guess) {
    if (answerArray.indexOf(guess.key.toUpperCase()) < 0) {
        addCorrectLetter(guess);
    }
}

function addCorrectLetter(guess) {
    for (var j = 0; j < things.length; j++) {
        if (guess.key === things[j]) {
            answerArray[j] = guess.key.toUpperCase();
            displayCurrentWord();
            lettersRemaining--;
            if (lettersRemaining === 0) {
                winScore++;
                displayWins();
                changeImage();
                addCorrect();
                displayCurrentWord();
            }
        }
    }
}

var incorrectGuessesMade = [];
var guessesLeft = 9;

function incorrectGuess(guess) {
    if (incorrectGuessesMade.indexOf(guess.key.toUpperCase()) < 0) {
        addIncorrectLetter(guess);
    }
}

function addIncorrectLetter(guess) {
    incorrectGuessesMade.push(guess.key.toUpperCase());
    displayGuessesMade();
    guessesLeft--;
    displayGuessesLeft();
    if (guessesLeft === 0) {
        changeImage();
        displayAnswer();
    }
}
function displayWins() {
    var winsDisplay = document.querySelector("#winsDisplay");
    winsDisplay.textContent = winScore;
}
function displayGuessesMade() {
    var guessesMadeDisplay = document.querySelector("#guessesMadeDisplay");
    guessesMadeDisplay.textContent = incorrectGuessesMade.join(", ");
}
function displayGuessesLeft() {
    var guessesLeftDisplay = document.querySelector("#guessesLeftDisplay");
    guessesLeftDisplay.textContent = guessesLeft;
}
function displayCurrentWord() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.innerHTML = answerArray.join(" ");
}
function displayImage() {
    var pictureDisplay = document.querySelector("#pictureDisplay");
    pictureDisplay.src = myImage1;
}

function changeImage() {
    var pictureDisplay = document.querySelector("#pictureDisplay");
    pictureDisplay.src = myImage2;
    gameStatus = false;
}

function displayAnswer() {
    var revealedAnswerDisplay = document.querySelector("#revealedAnswerDisplay");
    revealedAnswerDisplay.textContent = things.toUpperCase();
}

function addCorrect() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.classList.add('correct');
}

function removeCorrect() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.classList.remove('correct');
}



function init() {
    gameStatus = true;

    randomNumber = Math.floor(Math.random() * genreArray.length);

    things = genreArray[randomNumber].word;
    myImage1 = genreArray[randomNumber].image1
    myImage2 = genreArray[randomNumber].image2

    lettersRemaining = things.length;

    answerArray = [];

    for (var i = 0; i < things.length; i++) {
        if (things[i] === "+") {
            answerArray[i] = "&nbsp;";
        } else {
            answerArray[i] = "_";
        }
    }

    lettersRemaining = things.length;

    guessesLeft = 9;
    displayGuessesLeft()

    incorrectGuessesMade = [];
    displayGuessesMade()

    displayCurrentWord();

    displayImage();
    removeCorrect();
}