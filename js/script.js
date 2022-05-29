// Draw a random value from an array
function computerPlay(options) {
    if (Array.isArray(options)) {
        return options[Math.floor(Math.random() * options.length)];
    } else {
        return "Please use an array as input.";
    }
}

// User makes a play
function userPlay(e) {
    const play = e.target.getAttribute("value").toLowerCase();
    return play;
}

// Determine outcome for comparisons from perspective of "ego"
function getWinner(ego_choice, alter_choice) {
    let outcome;

    if (ego_choice === alter_choice) {
        outcome = "tie";
    } else if (ego_choice === "rock" && alter_choice === "scissors" || ego_choice === "paper" && alter_choice === "rock" || ego_choice === "scissors" && alter_choice === "paper") {
        outcome = "win";
    } else {
        outcome = "lose"
    }

    return outcome;
}

// Update running tally
function updateDisplayedTally() {
    document.querySelector(".user-tally").textContent = `Your tally: ${userTally}`;
    document.querySelector(".computer-tally").textContent = `Computer tally: ${computerTally}`;
}

// Check if game over (user or computer with 5 wins)
function gameOver(user, computer, roundsToWin = 5) {
    if (user === roundsToWin) {
        document.querySelector(".result").textContent = "You win!";
        return true;
    } else if (computer === roundsToWin) {
        document.querySelector(".result").textContent = "Computer wins!";
        return true;
    } else {
        return false;
    }
}

// Play game
const choices = ['rock', 'paper', 'scissors'];

let userTally = 0;
let computerTally = 0;

const userOptions = document.querySelectorAll(".rps");
userOptions.forEach(btn => btn.addEventListener('click', (el) => {
    document.querySelector(".result").textContent = ""; // remove message from prior game before first click of a new game

    const user = userPlay(el);
    const computer = computerPlay(choices);
    const outcome = getWinner(user, computer);

    const display = `You play ${user}, computer plays ${computer} - you ${outcome}!`;
    document.querySelector(".round").textContent = display;

    if (outcome === "win") {
        userTally += 1;
    } else if (outcome === "lose") {
        computerTally += 1;
    } else {
        userTally += 0;
        computerTally += 0;
    }

    updateDisplayedTally();

    if (gameOver(userTally, computerTally, 5)) {
        userTally = 0;
        computerTally = 0;
    }
}));