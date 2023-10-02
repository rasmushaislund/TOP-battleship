// START //

import './style.css';
import { Ship } from './factories/ship';
import { Gameboard } from './factories/gameboard';
import { Player } from './factories/player';
import { Game } from './controller/gameController';
import { Display } from './controller/displayController';

// Set copyright year automatically
const copyrightSpan = document.querySelector('#copyright-span');
copyrightSpan.textContent = new Date().getFullYear();

// Show modal with page load
const modal = document.querySelector('.modal-name');
const mainGame = document.querySelector('.main-game');

window.addEventListener('load', () => {
  mainGame.classList.add('hide');
  modal.showModal();
  modal.classList.add('show');
});

// Start game when player name has been entered
const startBtn = document.querySelector('#start-btn');
const alias = document.querySelector('#player-name');

startBtn.addEventListener('click', () => {
  modal.close();
  modal.classList.remove('show');
  mainGame.classList.remove('hide');

  Display(alias.value);
});

// ... or press 'enter'
alias.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) startBtn.click();
});

// Show confirmation modal when wanting a new game
const newGame = document.querySelector('#new-game-btn');
const modalConfirm = document.querySelector('.modal-confirm');

newGame.addEventListener('click', () => {
  const modalConfirm = document.querySelector('.modal-confirm');
  modalConfirm.showModal();
  modalConfirm.classList.add('show');
});

// When regretting to start a new game
const confirmNo = document.querySelector('#no-btn');

confirmNo.addEventListener('click', () => {
  modalConfirm.close();
  modalConfirm.classList.remove('show');
});

// END //
