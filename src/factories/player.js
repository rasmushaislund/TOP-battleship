// START //

import { Gameboard } from './gameboard';

export class Player {
  playersTurn = 'human';
  attacks;

  constructor(player) {
    this.player = player;
  }

  changeTurn(playersTurn) {
    if (playersTurn === 'human') {
      playersTurn = 'computer';
    } else {
      playersTurn = 'human';
    }
  }

  attackSquare(row, column) {}
}
