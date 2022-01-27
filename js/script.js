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
imgDice.style.display = 'none';

// função pra rolar o dado
const rollDice = () => {
  let dice = Math.floor(Math.random() * 6) + 1;
  imgDice.style.display = 'block';
  imgDice.src = `./assets/dice-${dice}.png`;
  return dice;
};

const setPlayer = (player) => {
    if (player === 0) {
        displayCurrent = elCurrent_0;
        displayScore = elScore_0;
    } else {
        displayCurrent = elCurrent_1;
        displayScore = elScore_1;
    }
}

const nextPlayer = () => {
    displayScore.textContent = score[activePlayer];
    roundScore = 0;
    if (activePlayer === 0) {
        activePlayer = 1;
        sectionPlayer1.classList.toggle('player--active');
        sectionPlayer2.classList.toggle('player--active');
    } else {
        activePlayer = 0;
        sectionPlayer2.classList.toggle('player--active');
        sectionPlayer1.classList.toggle('player--active');
    }
}

buttonRoll.addEventListener('click', () => {
    if (activePlayer === 0) {
        setPlayer(0);
    } else {
        setPlayer(1);
    }
    
    let dice = rollDice();
    if (dice !== 1) {
        roundScore += dice;
        score[activePlayer] += dice;
        displayCurrent.textContent = roundScore;
    } else {
        roundScore = 0;
        displayCurrent.textContent = 0;
        nextPlayer();
        displayScore.textContent = score[activePlayer];
    }
});

buttonHold.addEventListener('click', () => {
    roundScore = activePlayer === 0 ? score[0] : score[1];
    displayCurrent.textContent = 0;
    nextPlayer();
    score[activePlayer] += roundScore;

});
