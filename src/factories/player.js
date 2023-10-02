// START //

import { Gameboard } from './gameboard';
import { Game } from '../controller/gameController';

export class Player {
  playerOneName;
  playerTwoName;
  activePlayer = this.playerOneName;
  attacks;

  constructor(playerName) {
    this.playerName = playerName;
    this.attacks = [];
  }

  attackSquare(row, column) {
    const game = Game();
    // gameboard.buildBoard();

    if (!this.hasBeenAttacked(row, column)) {
      this.attacks.push([row, column]);
      gameboard.receiveAttack(row, column);
    } else {
      return;
    }
  }

  attackRandomSquare() {
    const game = Game();
    // gameboard.buildBoard();

    if (this.attacks.length >= 100) return;
    const randRow = Math.floor(Math.random() * game.gridSize);
    const randColumn = Math.floor(Math.random() * game.gridSize);

    if (!this.hasBeenAttacked(randRow, randColumn))
      gameboard.receiveAttack(randRow, randColumn); // issue here
    return;
  }

  hasBeenAttacked(row, column) {
    for (let i = 0; i < this.attacks.length; i++) {
      if (this.attacks[i][0] === row && this.attacks[i][1] === column)
        return true;
    }
    return false;
  }
}

// END //
