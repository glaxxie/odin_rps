console.log("Hello and welcome to RPS!");

function getCpuChoice() {
    let numChoice = Math.floor(Math.random() * 3);
    let cpuSelection
    switch (numChoice) {
        case 0:
            cpuSelection = "Rock"
            break;
        case 1:
            cpuSelection = "Paper"
            break;
        case 2:
            cpuSelection = "Scissors"
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
    let numericPlayerSelection = choices[playerSelection.toLowerCase()]
    let numericCpuSelection    = choices[cpuSelection.toLowerCase()]
    return [numericPlayerSelection, numericCpuSelection]
}

function playRound(playerSelection, cpuSelection) {
    // let playerPrompt = prompt("Rock/Paper/Scissors")
    let [numericCpuSelection , numericPlayerSelection] = stringToNumeric(playerSelection, cpuSelection)
    let result = numericCpuSelection - numericPlayerSelection
    // reformat playerSelection to capitalize it
    playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)
    return [playerSelection, cpuSelection, result]
}


function game() {
    // setting up variables
    let userScore = cpuScore = tries = 0
    let keepGoing = true

    while (keepGoing) {
        tries++
        let playerPick = prompt("Rock/Paper/Scissors?")
        let [player, cpu, result] = playRound(playerPick, getCpuChoice());

        if (result == 0) {
            console.log(`It's a tie. ${player} tie with ${cpu}`)
        } else if (result == -1 || result == 2) {
            console.log(`You win. ${player} beats ${cpu}`)
            userScore++
        } else  {
            console.log(`CPU wins. ${cpu} beats ${player}`)
            cpuScore++
        }
        if (tries>=5) {
            keepGoing = false
        }
    }
    // final tally
    let finalScore = userScore - cpuScore
    if (finalScore > 0) {
        console.log(`User won with result ${userScore}-${cpuScore}`)
    } else if (finalScore < 0) {
        console.log(`CPU won with result ${cpuScore}-${userScore}`)
    } else {
        console.log(`It is a tie with result ${userScore}-${cpuScore}`)
    }
}

game()