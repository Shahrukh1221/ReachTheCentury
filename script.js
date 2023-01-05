'use strict';
//Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');

score0El.textContent = 0;
score1El.textContent = 0;

let currentScore = 0;
let activePlayer = 0;
let playing = true;
//Roll Dice functionality

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

//Switch the player
const switchPlayer = function () {
  //Switching the players css change
  // if (activePlayer === 0) {
  //   player0.classList.remove('player--active');
  //   player1.classList.add('player--active');
  // } else {
  //   player0.classList.add('player--active');
  //   player1.classList.remove('player--active');
  // }

  //Toggle approach :- It adds the class if its not present and removes it if its present
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //If game is not ended
    let dice = Math.trunc(Math.random() * 6 + 1);

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //   console.log(dice.src);
    //   if (dice === 1) {
    //     dice.src = 'dice-1.png';
    //     console.log('switch the player');
    //   } else if (dice === 2) {
    //     dice.src = 'dice-2.png';
    //   } else if (dice === 3) {
    //     dice.src = 'dice-3.png';
    //   } else if (dice === 4) {
    //     dice.src = 'dice-4.png';
    //   } else if (dice === 5) {
    //     dice.src = 'dice-5.png';
    //   } else if (dice === 6) {
    //     dice.src = 'dice-6.png';
    //   }

    //Check if dice is not one adding the current score to active player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    //if dice is one switch player
    else {
      //Switch the player
      switchPlayer();
    }
  }
});

//Holding Score
let scores = [0, 0];

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check if score >=100 finsish the game
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
    } else {
      //Switch the player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', function () {
  diceEl.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  //Set player 1 as active player and two as non active
  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];
});
