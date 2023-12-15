//your code here
const computer = ['ROCK', 'PAPER', 'SCISSOR'];
const computerChoicesList = [{
    choice: 'rock',
    defeats: 'scissors',
    defeatedBy: 'paper'
},
{
    choice: 'scissors',
    defeats: 'paper',
    defeatedBy: 'rock'
},
{
    choice: 'paper',
    defeats: 'rock',
    defeatedBy: 'scissors'
}];

let rounds = 0;
let userScore = 0;
let computerScore = 0;

const gameForm = document.querySelector("form#gameplay-form");
const userChoiceList = document.querySelectorAll(".user-choice-container > button");
const computerChoice = document.getElementById("computer-choice");

const displayComputerChoice = document.getElementById("computer-choice");
let displayComputerChoiceValue;

const gameDetailsContainer = document.querySelector(".general-details");
const gameResult = document.querySelector(".game-result");

gameForm.addEventListener("submit", startGame);

function startGame(event) {
    event.preventDefault();

    if (gameForm.gameNumber.value === '') {
        alert("Please select at least 1 round");
        gameForm.gameNumber.value = 1;
        return;
    }

    rounds = Number(gameForm.gameNumber.value);

    // make user choice buttons clickable, addEventListeners
    userChoiceList.forEach((button) => {
        button.removeAttribute("disabled");

        button.addEventListener("click", submitUserChoice)
    });

    // make sure game result is not displayed
    presetGame();

    // show default details
    showGameDetails();
}

function presetGame() {
    gameResult.textContent = '';
    gameResult.classList.add("hide");

    // show default scores and default values of round result and computer choice
    userScore = 0;
    computerScore = 0
    showGameDetails('', '');

}

function showGameDetails(roundResult, displayComputerChoiceValue) {
    console.info("displayed");
    gameDetailsContainer.classList.remove("hide");

    if (!(roundResult === undefined)) {
        document.getElementById("round-result").textContent = roundResult;
    }
    if (!(displayComputerChoiceValue === undefined)) {
        displayComputerChoice.value = displayComputerChoiceValue;
    }

    gameDetailsContainer.querySelector("#rounds-left-value").textContent = rounds;
    gameDetailsContainer.querySelector("#user-points-value").textContent = userScore;
    gameDetailsContainer.querySelector("#computer-points-value").textContent = computerScore;

}

function submitUserChoice(event) {
    const choiceButton = event.target;
    const userChoice = choiceButton.getAttribute("data-ns-test");

    const computerChoice = computerChoicesList[Math.floor(Math.random() * 3)];

    rounds--;

    showGameDetails(findRoundResult(userChoice, computerChoice), displayComputerChoiceValue);

    checkGameOver();
}

function findRoundResult(userChoice, computerChoice) {
    let roundResult;

    if (userChoice.toUpperCase() === computerChoice.choice.toUpperCase()) {
        // tie
        userScore++;
        computerScore++;
        roundResult = 'TIE';
    }
    else if (userChoice.toUpperCase() === computerChoice.defeatedBy.toUpperCase()) {
        // user won
        userScore++;
        roundResult = 'WON';
    }
    else if (userChoice.toUpperCase() === computerChoice.defeats.toUpperCase()) {
        // computer won
        computerScore++;
        roundResult = 'LOSE';
    }

    displayComputerChoiceValue = computerChoice.choice;

    return roundResult;
}
function checkGameOver() {
    let result;
    if (rounds === 0) {

        if (userScore > computerScore) {
            result = 'WON';
        }
        else if (userScore < computerScore) {
            result = 'LOSE'
        }
        else {
            result = 'TIE';
        }
        gameResult.setAttribute("data-ns-test", result);
        gameResult.textContent = result;
        gameResult.classList.remove("hide");


        // reset values
        resetGame();
    }
}
function resetGame() {
    userScore = 0;
    computerScore = 0;
    rounds = 0;

    userChoiceList.forEach((button) => {
        button.disabled = true;
    })
}