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
    playerSelection = playerSelection.toLowerCase().trim();
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
function game() {
    let wins = 0;
    let losses = 0;
    for (let i = 0; i < 5; i++) {
        let playerSelection = prompt("Rock, paper, or scissors?");
        computerSelection = computerPlay();
        let roundOutcome = interpretSelections(playerSelection,computerSelection);
        console.log(roundOutcome);
        if (roundOutcome.includes("win")) {
            wins += 1;
        }
        else {
            losses += 1;
        }
    }
    if (wins > losses) {
        console.log("You beat the computer!");
    }
    else if (losses > wins) {
        console.log("You lost to the computer.");
    }
    else if (wins === losses) {
        console.log("You tied with the computer.");
    }
    else {
        console.log("Something went very wrong.")
    }
}
game();