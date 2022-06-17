'use strict';

let roundScore = 0;
let activePlayer = 0;
let score = [0, 0];
let currentScore = 0;
let displayCurrent = HTMLElement;
let displayScore = HTMLElement;
let playing = true;

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

const startGame = () => {
    //zerando as variáveis
    roundScore = 0;
    activePlayer = 0;
    score = [0, 0];
    currentScore = 0;
    // zerando escores
    elScore_0.textContent = 0;
    elScore_1.textContent = 0;
    elCurrent_0.textContent = 0;
    elCurrent_1.textContent = 0;
    
    // apagando o dado
    imgDice.classList.add('hidden');
    
    // resetando as classes
    sectionPlayer1.classList.add('player--active');
    sectionPlayer2.classList.remove('player--active');
    sectionPlayer1.classList.remove('player--winner');
    sectionPlayer2.classList.remove('player--winner');

    // setando plauing como true
    playing = true;
}


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

const playerWins = () => {
        let winner = activePlayer === 0 ? sectionPlayer1 : sectionPlayer2;
        winner.classList.add('player--winner');
        winner.classList.remove('player--active');
        console.log(`Player ${activePlayer} wins!`);
        imgDice.classList.add('hidden');
        displayScore.textContent = score[activePlayer];
        playing = false;

}


buttonRoll.addEventListener('click', () => {
   if(playing) {
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
   }
});

buttonHold.addEventListener('click', () => {
    if(playing) {
        score[activePlayer] += roundScore;
        if (!(score[activePlayer] >= 20)) {
            displayCurrent.textContent = 0;
            displayScore.textContent = score[activePlayer];
            console.log(score, score[activePlayer]);
            nextPlayer();
        } else {
            playerWins();
        }
    }
});

buttonNewGame.addEventListener('click', () => {
    startGame();
})

startGame();