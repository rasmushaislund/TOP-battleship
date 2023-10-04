// START //

import { Gameboard } from './gameboard';
import { Game } from '../controller/gameController';

export class Player {
  attacks;

  constructor(playerName) {
    this.playerName = playerName;
    this.attacks = [];
  }

  attackSquare(row, column) {
    const aiBoard = Game().aiBoard;

    if (!this.hasBeenAttacked(row, column)) {
      this.attacks.push([row, column]);
      aiBoard.receiveAttack(row, column);
    } else {
      return;
    }
  }

  attackRandomSquare() {
    const playerBoard = Game().playerBoard;

    if (this.attacks.length >= 100) return;
    const randRow = Math.floor(Math.random() * playerBoard.gridSize);
    const randColumn = Math.floor(Math.random() * playerBoard.gridSize);

    if (!this.hasBeenAttacked(randRow, randColumn))
      playerBoard.receiveAttack(randRow, randColumn);
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
