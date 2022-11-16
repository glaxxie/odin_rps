console.log("Hello and welcome to RPS!");

function getCpuChoice() {
    let numChoice = Math.floor(Math.random() * 3);
    let cpuSelection;
    switch (numChoice) {
        case 0:
            cpuSelection = "Rock";
            break;
        case 1:
            cpuSelection = "Paper";
            break;
        case 2:
            cpuSelection = "Scissors";
            break;
    }
    return cpuSelection;
}

// smarter way to solve this is take cpuselection - player selection.
//  if it is 0, tie. if it is 1 || -2 cpu win . user win with -1 and 2
function stringToNumeric(playerSelection, cpuSelection) {
    const choices =  {
        "rock":0, "paper":1, "scissors":2
    };
    let numericPlayerSelection = choices[playerSelection.toLowerCase()];
    let numericCpuSelection    = choices[cpuSelection.toLowerCase()];
    return [numericPlayerSelection, numericCpuSelection];
}

function playRound(playerSelection, cpuSelection) {
    let [ numericPlayerSelection, numericCpuSelection] = stringToNumeric(playerSelection, cpuSelection);
    let result = numericCpuSelection - numericPlayerSelection;
    // reformat playerSelection to capitalize it
    playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1);
    return [playerSelection, cpuSelection, result];
}

const buttons = document.querySelectorAll('button');
const body = document.querySelector('body');
const textResult = document.querySelector('#text');
const playerScore = document.querySelector('#player');
const cpuScore = document.querySelector('#cpu');

let userPoint = cpuPoint = 0;

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let playerChoice = button.id;
        let [player, cpu, result] = playRound(playerChoice, getCpuChoice());
        if (result == 0) {
            textResult.textContent = `It's a tie. ${player} tie with ${cpu}`;
            // text = `It's a tie. ${player} tie with ${cpu}`;
        } else if (result == -1 || result == 2) {;
            textResult.textContent = `You win. ${player} beats ${cpu}`;
            playerScore.textContent = ++userPoint
            endGame();
        } else  {
            textResult.textContent = `CPU wins. ${cpu} beats ${player}`;
            cpuScore.textContent = ++cpuPoint
            endGame();
        }
    });
});

// end the game
const finalDiv = document.createElement("div");
const newGame = document.createElement("button");
// finalDiv.classList.add('result')
// newGame.classList.add('newgame_btn')
newGame.textContent = "New Game"
function endGame() {
    if (userPoint == 5 || cpuPoint == 5) {
        finalDiv.textContent = userPoint == 5 ? "You won!" : "CPU won!";
        buttons.forEach( (button) => {
            button.disabled = true;
        });
        body.appendChild(finalDiv);
        body.appendChild(newGame);
    };
};

// new game
newGame.addEventListener('click', () => rePlay());
function rePlay() {
    userPoint = cpuPoint = playerScore.textContent = cpuScore.textContent = 0
    body.removeChild(finalDiv);
    body.removeChild(newGame);
    buttons.forEach( (button) => {
        button.disabled = false
    });
}
