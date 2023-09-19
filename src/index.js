// START //

import './style.css';
import { Ship } from './factories/ship';
import { Gameboard } from './factories/gameboard';
import { Player } from './factories/player';

// Set copyright year automatically
const copyrightSpan = document.querySelector('#copyright-span');
copyrightSpan.textContent = new Date().getFullYear();

// Show modal with page load

// window.addEventListener('load', () => {
//   const modal = document.querySelector('.modal');
//   const mainGame = document.querySelector('.main-game');
//   modal.showModal();
//   modal.classList.add('show');
//   mainGame.classList.add('hide');
// });

// END //
