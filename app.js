setTimeout(() => {
    document.body.classList.remove('preload');
}, 500);
const choiceButtons = document.querySelectorAll('.choice-btn');
const gameDiv = document.querySelector('.game');
const resultsDiv = document.querySelector('.results')
const resultDivs = document.querySelectorAll('.results_result ');

const resultWinner = document.querySelector('.results_winner');
const resulttext = document.querySelector('.results_text');
const playAgainBtn = document.querySelector('.play-again');
const ScoreNo = document.querySelector('.score_number');

const btnRules = document.querySelector('.rules-btn')
const btnClose = document.querySelector('.close-btn')
const modalRules = document.querySelector('.modal')


const CHOICES = [{
        name: "paper",
        beats: "rock"
    },

    {
        name: "scissors",
        beats: "paper"
    },
    {
        name: "rock",
        beats: "scissors"
    },
]


let score = 0;

choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find(choice => choice.name == choiceName)
        choose(choice)
    })
})

function choose(choice) {
    const aichoice = aichoose()
    displayResults([choice, aichoice])
    displayWinner([choice, aichoice])
}

function aichoose() {
    const rand = Math.floor(Math.random() * CHOICES.length)
    console.log(rand)
    return CHOICES[rand]
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
        setTimeout(() => {

            resultDiv.innerHTML =
                '<div class="choice ' + results[idx].name + '"> <img src= "./images/icon-' + results[idx].name + '.svg " alt="${results[idx].name}" /> </div>'
        }, idx * 1000);
    })
    gameDiv.classList.toggle('hidden')
    resultsDiv.classList.toggle('hidden')
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results);
        const aiWins = isWinner(results.reverse());

        if (userWins) {
            resulttext.innerText = "You win";
            resultDivs[0].classList.toggle('winner');
            keepscore(1);
        } else if (aiWins) {
            resulttext.innerText = "You Lose";
            resultDivs[1].classList.toggle('winner');
            keepscore(-1);
        } else {
            resulttext.innerText = "Draw ";
        }
        resultWinner.classList.toggle("hidden")
        resultsDiv.classList.toggle("show-winner")
    }, 1000);

}

function isWinner(results) {
    return (results[0].beats == results[1].name);
}

function keepscore(point) {
    score += point
    ScoreNo.innerText = score
}

playAgainBtn.addEventListener('click', () => {
        gameDiv.classList.toggle('hidden')
        resultsDiv.classList.toggle('hidden')

        resultDivs.forEach(resultDiv => {
            resultDiv.innerHTML = ""
            resultDiv.classList.remove('winner')
        })
        resulttext.innerText = ""
        resultWinner.classList.toggle('hidden')
        resultsDiv.classList.toggle('show-winner')
    }


)
btnRules.addEventListener('click', () => {
    modalRules.classList.toggle('show-modal')
});

btnClose.addEventListener('click', () => {
    modalRules.classList.toggle('show-modal')
});