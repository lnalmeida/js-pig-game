'use strict';

let roundScore = 0;
let activePlayer = 0;
let score = [0, 0];
let currentScore = 0;
let displayCurrent = HTMLElement;
let displayScore = HTMLElement;

// captura elementos
let buttonNewGame = document.querySelector('.btn--new');
let buttonRoll = document.querySelector('.btn--roll');
let buttonHold = document.querySelector('.btn--hold');
let imgDice = document.querySelector('.dice');
let elScore_0 = document.querySelector('#score--0');
let elScore_1 = document.querySelector('#score--1');
let elCurrent_0 = document.querySelector('#current--0');
let elCurrent_1 = document.querySelector('#current--1');
let sectionPlayer1 = document.querySelector('section.player--0');
let sectionPlayer2 = document.querySelector('section.player--1');

// zerando escores
elScore_0.textContent = 0;
elScore_1.textContent = 0;
elCurrent_0.textContent = 0;
elCurrent_1.textContent = 0;

// apagando o dado
imgDice.classList.add('hidden');


const setPlayer = (player) => {
    if (player === 0) {
        activePlayer = 0;
        displayCurrent = elCurrent_0;
        displayScore = elScore_0;
    } else {
        activePlayer = 1;
        displayCurrent = elCurrent_1;
        displayScore = elScore_1;
    }
}

const nextPlayer = () => {
    displayScore.textContent = score[activePlayer];
    roundScore = 0;
    if (activePlayer === 0) {
        setPlayer(1);
        sectionPlayer1.classList.remove('player--active');
        sectionPlayer2.classList.add('player--active');
        displayScore.textContent = score[activePlayer];
    } else {
        setPlayer(0);
        sectionPlayer2.classList.remove('player--active');
        sectionPlayer1.classList.add('player--active');
        displayScore.textContent = score[activePlayer];
    }
}

buttonRoll.addEventListener('click', () => {
   activePlayer === 0 ? setPlayer(0) : setPlayer(1);

   let dice = Math.trunc(Math.random() * 6) + 1;
   imgDice.classList.remove('hidden');
   imgDice.src = `./assets/dice-${dice}.png`;

   if (dice !== 1) {
       roundScore += dice;
       displayCurrent.textContent =roundScore;
   } else {
       roundScore = 0;
       displayCurrent.textContent = 0;
       nextPlayer();
   }
});

buttonHold.addEventListener('click', () => {
    console.log(score)
    displayScore.textContent = score[activePlayer];
    score[activePlayer] += roundScore;
    displayCurrent.textContent = 0;
    nextPlayer();
});
