let playerScore = 0;
let computerScore = 0;
const maxScore = 3;

function computerChoices() {
    const allChoices = ['rock', 'paper', 'scissor'];
    const randomChoice = Math.floor(Math.random() * 3);
    return allChoices[randomChoice];
}

function mappingChoices(playerChoice, computerChoice) {
    const iconsMap = {
        rock: 'fa-hand-fist',
        paper: 'fa-hand',
        scissor: 'fa-hand-peace',
        unknown: 'fa-question'
    };

    const namesMap = {
        rock: 'Rock',
        paper: 'Paper',
        scissor: 'Scissor',
        unknown: '???'
    };

    const playerIcon = document.getElementById('player-icon');
    const playerName = document.getElementById('player-name');
    playerIcon.className = `fa-solid ${iconsMap[playerChoice]}`;
    playerName.textContent = namesMap[playerChoice];

    const computerIcon = document.getElementById('computer-icon');
    const computerName = document.getElementById('computer-name');
    computerIcon.className = `fa-solid ${iconsMap[computerChoice]}`;
    computerName.textContent = namesMap[computerChoice];
}

function possibilitiesResults(playerChoice, computerChoice) {
    const rulesGame = {
        rock: 'scissor',
        paper: 'rock',
        scissor: 'paper'
    };

    if (playerChoice === computerChoice) {
        return 'Draw!!!';
    }

    if (rulesGame[playerChoice] === computerChoice) {
        playerScore++;
        return 'You win!!!';
    } else {
        computerScore++;
        return 'You lose!!!';
    }
}

function updateScore() {
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('computer-score').textContent = computerScore;
}

function showPopup(message, isFinish) {
    const popupGameover = document.getElementById('popup-gameover');
    const popupMessage = document.getElementById('popup-message');
    const popupButton = document.getElementById('popup-button');

    popupMessage.textContent = message;
    popupButton.textContent = isFinish ? 'Restart' : 'Continue';
    popupGameover.classList.remove('hidden');
    popupGameover.classList.add('show');
}

function hidePopup() {
    const popupGameover = document.getElementById('popup-gameover');
    popupGameover.classList.add('hidden');
    popupGameover.classList.remove('show');
}

function finishGame() {
    if (playerScore === maxScore || computerScore === maxScore) {
        const popupMessage = playerScore === maxScore ? 'You won the game!' : 'The computer won!';
        showPopup(popupMessage, true);
        return true;
    }
    return false;
}

function restartGame() {
    playerScore = 0;
    computerScore = 0;
    updateScore();

    mappingChoices('unknown', 'unknown');
}

function playerChoices(playerChoice) {
    const computerChoice = computerChoices();

    mappingChoices(playerChoice, computerChoice);

    setTimeout(() => {
        const winner = possibilitiesResults(playerChoice, computerChoice);

        updateScore();

        const isFinish = finishGame();

        if (!isFinish) {
            showPopup(winner, false);
        }
    }, 500);
}

document.querySelectorAll('.jankenpon__buttons--button').forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.getAttribute('data-choice');
        playerChoices(playerChoice);
    });
});

document.getElementById('popup-button').addEventListener('click', () => {
    const popupButton = document.getElementById('popup-button');

    if (popupButton.textContent === 'Restart') {
        restartGame();
    }

    hidePopup();
});
