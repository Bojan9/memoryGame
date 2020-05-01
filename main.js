var cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let flips = 0;
let counter = document.getElementById("flips");

var second = 0;
var minute = 0;
var timer = document.getElementById("time");
var interval;

var correctCard = 0;
let modal = document.getElementById("popup1");

(function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

//flips cards, add calss first, second
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.toggle('flip')
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

//checks for match, add moves, starts time
function checkForMatch() {
    moveCounter();
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        correctCard++;
        congratulations();
    } else {
        unflipCards();
    }
}

//disable cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

//unflip cards, remove class
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

//reset board
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//flip count
function moveCounter() {
    flips++;
    counter.innerHTML = parseInt(flips);
    if (flips == 1) {
        second = 0;
        minute = 0;
        startTimer();
    }
}

//timer
function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
    }, 1000);
}

//end
function congratulations() {
    if (correctCard == 6) {
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        //showing move and time on modal
        document.getElementById("finalMove").innerHTML = flips;
        document.getElementById("totalTime").innerHTML = finalTime;
    };
}

//start game
function startGame() {
    cards.classList.add("flip2");
    shuffle();
    moves = 0;
    second = 0;
    minute = 0;
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

//play again
function playAgain() {
    modal.classList.remove("show");
    startGame();
}

cards.forEach(card => card.addEventListener('click', flipCard));
