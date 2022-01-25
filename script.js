function computerPlay() {
    let randomNumber = Math.random();
    if (randomNumber < 0.333) {
        return "scissors";
    }
    else if (randomNumber < 0.666) {
        return "paper";
    }
    else {
        return "rock";
    }
}
function interpretSelections(playerSelection, computerSelection) {
    if (playerSelection === "rock") {
        if (computerSelection === "scissors") {
            return "You win! Rock beats scissors.";
        }
        else if (computerSelection === "paper") {
            return "You lose! Paper beats scissors.";
        }
        else if (computerSelection === "rock") {
            return "Tie! Rock ties rock.";
        }
    }
    else if (playerSelection === "paper") {
        if (computerSelection === "scissors") {
            return "You lose! Scissors beats rock.";
        }
        else if (computerSelection === "paper") {
            return "Tie! Paper ties paper.";
        }
        else if (computerSelection === "rock") {
            return "You win! Paper beats rock.";
        }
    }
    else if (playerSelection === "scissors") {
        if (computerSelection === "scissors") {
            return "Tie! Scissors ties scissors.";
        }
        else if (computerSelection === "paper") {
            return "You win! Scissors beats paper.";
        }
        else if (computerSelection === "rock") {
            return "You lose! Rock beats scissors.";
        }
    }
    else {
        return "Invalid input.";
    }
}

const h1 = document.querySelector('.header');
const launchButton = document.querySelector('.launch');
const gameContainer = document.querySelector('.game-container');

window.onload = () => gameContainer.classList.add('transition');

function launch () {
    gameContainer.classList.toggle('hidden');
    launchButton.remove();
}

launchButton.addEventListener("click", launch, { once: true });

const buttons = document.querySelectorAll('.game-buttons button');

const output = document.querySelector('.output');
const buttonContainer = document.querySelector('.game-buttons');
const playerContainer = document.querySelector('.player-choice');
const computerContainer = document.querySelector('.computer-choice');
const outputContainer = document.querySelector('.output');
const outputTextContainer = document.querySelector('.output-text');

let roundCount = 0;
let wins = 0;
let losses = 0;

const playerScore = document.querySelector('.player-choice .choice-text .score');
const computerScore = document.querySelector('.computer-choice .choice-text .score');
const buttonDesc = document.querySelector(".button-desc");

function gameOver() {
    buttonContainer.style.display = "none";
    if (wins > losses) buttonDesc.textContent = "You win! You beat the computer!";
    else if (losses > wins) buttonDesc.textContent = "You lost! The computer beat you."
    else buttonDesc.textContent = "Something very wrong happened.";
    buttonDesc.style.fontWeight = 'bold';
    buttonDesc.style.fontSize = '31px';
}

function handleButtonClick (e) {
    id = this.id;
    let playerSelection;
    id === "rock-button" ? playerSelection = "rock": id === "paper-button" ? playerSelection = "paper" : 
            id === "scissors-button" ? playerSelection = "scissors" : playerSelection = null; 
            // probably not proper conventions
    computerSelection = computerPlay();
    showEmojiChoices(playerSelection, computerSelection);
    let roundOutcome = interpretSelections(playerSelection, computerSelection);
    outputTextContainer.textContent = roundOutcome;
    roundCount++;
    if (roundOutcome.includes("win")) {
        wins += 1;
    }
    else if (roundOutcome.includes('lose')) {
        losses += 1;
    }

    playerScore.textContent = wins;
    computerScore.textContent = losses;

    if (wins === 5 || losses == 5) {
        gameOver();
    }
}

function showEmojiChoices (playerSelection, computerSelection) {
    let i = 0;
    outputContainer.childNodes.forEach(node => {
        if (node.nodeType !== 1 || i > 3) {
            i++;
            return;
        }
        switch (i++ === 1 ? playerSelection : computerSelection) {
            case 'rock':
                node.firstElementChild.textContent = "✊"
                break;
            case 'paper':
                node.firstElementChild.textContent = "✋"
                break;
            case 'scissors':
                node.firstElementChild.textContent = "✌️";
                break;
        }
    })
}

buttons.forEach(button => button.addEventListener('click', handleButtonClick));

// launch(); // temporary so launch button doesn't have to be clicked after every reload