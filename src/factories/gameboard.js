// START //

import { shipProperties } from '../data/shipProperties';
import { Ship } from './ship';

export class Gameboard {
  board;
  missedShots;
  gridSize = 10;

  constructor() {
    this.board = [];
    this.missedShots = [];
  }

  // Generate the game board as a 2D-array
  buildBoard() {
    let value = 1;

    for (let i = 0; i < this.gridSize; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.gridSize; j++) {
        this.board[i][j] = value++;
      }
    }
  }

  // Create ships by calling Ship class
  createShips() {
    const props = shipProperties;
    let shipsArray = [];

    for (let i = 0; i < props.length; i++) {
      const vessel = new Ship(
        props[i].type,
        props[i].length,
        props[i].vertical,
      );
      shipsArray.push(vessel);
    }
    return shipsArray;
  }

  placeShips() {
    // Get returned array from 'createShips()'
    const ships = this.createShips();
    console.log(ships);

    // Check to see that board is empty (i.e. ready for a new game)
    if (!this.isBoardEmpty) return;

    // Select random coordinate
    const randX = Math.floor(Math.random() * this.gridSize);
    const randY = Math.floor(Math.random() * this.gridSize);

    // Deny placement if conditions for placement are not fulfilled.
    // Else, place ships accordingly.
    for (let i = 0; i < ships.length; i++) {
      if (!this.placementAllowed(ships[i], randX, randY)) {
        continue;
      } else {
        if (ships[i].vertical === true) {
          for (let j = 0; j < ships[i].length; j++) {
            this.board[randX][randY + j] = ships[i].type;
          }
        } else {
          for (let j = 0; j < ships[i].length; j++) {
            this.board[randX + j][randY] = ships[i].type;
          }
        }
      }
    }
    console.log(this.board);
  }

  placementAllowed(shipIndex, randX, randY) {
    // Placement of ship fully or partly outside grid perimeter
    if (
      randX > this.gridSize ||
      randY > this.gridSize ||
      randX + shipIndex.length > this.gridSize ||
      randY + shipIndex.length > this.gridSize
    )
      return false;

    if (typeof this.board[randX][randY] !== 'number') return false;
    return true;
  }

  isBoardEmpty() {
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        if (typeof this.board[i][j] !== 'number') {
          return false;
        }
      }
    }
    return true;
  }
}

const boards = new Gameboard();
boards.buildBoard();
const showBoard = boards.board;
console.log(showBoard);

boards.placeShips();
