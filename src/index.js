// START //

import './style.css';
import './html/index.html';
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
  modalConfirm.showModal();
  modalConfirm.classList.add('show');
});

// Show info modal on hover
const infoIcon = document.querySelector('.info-icon');
const infoModal = document.querySelector('.modal-info');

infoIcon.addEventListener('mouseover', () => {
  infoModal.classList.remove('hide');
});

infoIcon.addEventListener('mouseout', () => {
  infoModal.classList.add('hide');
});

infoIcon.addEventListener('focus', () => {
  infoModal.classList.toggle('hide');
});

// END //
