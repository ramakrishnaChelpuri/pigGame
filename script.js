'use strict';

//declaring variables
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const playerOne = document.getElementById('name--0');
const playerTwo = document.getElementById('name--1');
const diceEl = document.querySelector('.dice');

//Initializing buttons
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, playerScores;

//initializing function
const initializeGame = function () {
    //resetting all the scores to 0
    currentScore = 0;
    activePlayer = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    playerScores = [0, 0];
    current0El.textContent = 0;
    current1El.textContent = 0;
    //display buttons
    btnRoll.classList.remove('hidden');
    btnHold.classList.remove('hidden');
    diceEl.classList.add('hidden');
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
    // const player1=prompt('Enter Player-1 name:');
    // const player2=prompt('Enter Player-2 name:');
    document.getElementById(`name--0`).textContent = "player1";
    document.getElementById(`name--1`).textContent = "player2";
};


//switch player function
const switchPlayer = function () {
    //make current score to zero
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    //switch active player
    activePlayer = activePlayer === 0 ? 1 : 0;
    //3.chnage background to white for active player
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

//winning banner function
const winningBanner = function () {
    playerScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = playerScores[activePlayer];
    console.log(`congrats player-${activePlayer} won!`);
    //remove diceRoll and Hold buttons
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
    diceEl.classList.add('hidden');
    document.getElementById(`name--${activePlayer}`).textContent = ' You Won!';
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
};

//start game
initializeGame();


//on dice roll click
btnRoll.addEventListener('click', function () {
    //1.roll random dice btw 1 & 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2.Display dice picture
    diceEl.classList.remove('hidden');
    diceEl.src = (`dice-${dice}.png`);
    //3.check for 1
    if (dice != 1) {
        //add to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        if (currentScore >= 100) {
            winningBanner();
        }
    } else {
        //make current player score to 0 and switch player
        switchPlayer();
    };
});



    //on hold button click
    btnHold.addEventListener('click', function () {
        //1.add current score to players score
        playerScores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = playerScores[activePlayer];
        //2.check if score is >=100
        if (playerScores[activePlayer] >= 100) {
            //end the game & remove dice image and Hold buttons
            winningBanner();
        } else {
        //3.If not switch player
            switchPlayer();
        };
    });



//on New Game button click
btnNewGame.addEventListener('click', initializeGame);
