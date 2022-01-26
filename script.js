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
const buttons = document.querySelectorAll('.game-buttons button');
const output = document.querySelector('.output');
const buttonContainer = document.querySelector('.game-buttons');
const playerContainer = document.querySelector('.player-choice');
const computerContainer = document.querySelector('.computer-choice');
const outputContainer = document.querySelector('.output');
const outputTextContainer = document.querySelector('.output-text');
const playerScore = document.querySelector('.player-choice .choice-text .score');
const computerScore = document.querySelector('.computer-choice .choice-text .score');
const buttonDesc = document.querySelector('.button-desc');
const restartButton = document.querySelector('.restart');

launchButton.addEventListener("click", launch, { once: true });

function launch () {
    gameContainer.classList.toggle('soft-hidden');
    gameContainer.classList.toggle('hidden');
    gameContainer.classList.add('transition');
    setTimeout (() => gameContainer.classList.toggle('soft-hidden'), 1) // required for transition to occur; not sure why
    launchButton.remove();
}

let roundCount = 0;
let wins = 0;
let losses = 0;

buttons.forEach(button => button.addEventListener('click', handleButtonClick));

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
        restartButton.classList.toggle('hidden');
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
            case undefined:
                node.firstElementChild.innerHTML = "<b>?</b>";
                break;
        }
    })
}

function gameOver() {
    buttonContainer.classList.toggle('hidden');
    if (wins > losses) buttonDesc.textContent = "You win! You beat the computer!";
    else if (losses > wins) buttonDesc.textContent = "You lost! The computer beat you."
    else buttonDesc.textContent = "Something very wrong happened.";
    buttonDesc.classList.toggle('bold-buttonDesc');
}

restartButton.addEventListener('click', restart);

function restart (e) {
    wins = 0;
    losses = 0;
    showEmojiChoices();
    buttonContainer.classList.toggle('hidden');
    document.querySelectorAll('.score').forEach(element => element.textContent = "0");
    outputTextContainer.textContent = "First to five!";
    buttonDesc.classList.toggle('bold-buttonDesc');
    buttonDesc.textContent = 'Choose rock, paper, or scissors:';
    restartButton.classList.toggle('hidden');
}