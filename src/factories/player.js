// START //

import { Gameboard } from './gameboard';

export class Player {
  playerOneName;
  playerTwoName = 'computer';
  activePlayer = this.playerOneName;

  constructor(playerOneName) {
    this.playerOneName = playerOneName;
  }

  attackSquare(row, column) {}
}
