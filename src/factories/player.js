// START //

import { Gameboard } from './gameboard';
import { Game } from '../controller/gameController';

export class Player {
  attacks;
  alreadyAttacked;

  constructor(playerName) {
    this.playerName = playerName;
    this.attacks = [];
  }

  reset() {
    this.attacks = [];
  }

  attackSquare(row, column, enemyBoard) {
    if (!this.hasBeenAttacked(row, column)) {
      this.attacks.push([row, column]);
      enemyBoard.receiveAttack(row, column);
    } else {
      return false;
    }
  }

  attackRandomSquare(playerBoard) {
    if (this.attacks.length >= 100) return;
    const randRow = Math.floor(Math.random() * playerBoard.gridSize);
    const randColumn = Math.floor(Math.random() * playerBoard.gridSize);

    if (!this.hasBeenAttacked(randRow, randColumn)) {
      this.attacks.push([randRow, randColumn]);
      playerBoard.receiveAttack(randRow, randColumn);
      this.alreadyAttacked = false;
    } else {
      this.alreadyAttacked = true;
    }
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
