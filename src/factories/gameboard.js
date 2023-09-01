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
      const isVertical = [true, false][Math.round(Math.random())];
      const vessel = new Ship(props[i].type, props[i].length, isVertical);
      shipsArray.push(vessel);
    }
    return shipsArray;
  }

  placeShips(ship, row, column, vertical) {
    if (vertical) {
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][column] = [i, ship];
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[row][column + i] = [i, ship];
      }
    }
  }

  getRandomPlacement() {
    // Get returned array from 'createShips()'
    const ships = this.createShips();
    console.log(ships);

    // Check to see that board is empty (i.e. ready for a new game)
    if (!this.isBoardEmpty) return;

    // For every ship in array
    for (let i = 0; i < ships.length; i++) {
      // Select random start-coordinate
      const randX = Math.floor(Math.random() * this.gridSize);
      const randY = Math.floor(Math.random() * this.gridSize);
      // Read orientation of ship
      const vertical = ships[i].vertical;

      // Check if placement is allowed - otherwise start loop from current index again
      if (!this.placementAllowed(ships[i], randX, randY, vertical)) {
        i--;
      } else this.placeShips(ships[i], randX, randY, vertical);
    }
  }

  placementAllowed(ship, row, column, vertical) {
    // Check if placement of ship is fully or partly outside grid perimeter
    if (
      row > this.gridSize ||
      column > this.gridSize ||
      row + ship.length > this.gridSize ||
      column + ship.length > this.gridSize
    )
      return false;

    // Check if a given coordinate is already occupied
    if (vertical) {
      for (let i = 0; i < ship.length; i++) {
        if (typeof this.board[row + i][column] !== 'number') return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (typeof this.board[row][column + i] !== 'number') return false;
      }
    }
    return true;
  }

  receiveAttack(row, column) {
    const ships = this.createShips();
    console.log(ships);

    const coordinate = this.board[row][column];

    if (typeof coordinate !== 'number') {
      // const type = coordinate[1];
      // const findIndex = ships.indexOf(type);
      coordinate[1].hit(coordinate[0]);
    } else {
      this.missedShots.push([row, column]);
    }
    console.log(ships);
    console.log(this.missedShots);
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

boards.getRandomPlacement();

boards.receiveAttack(2, 6);
boards.receiveAttack(3, 6);
boards.receiveAttack(4, 6);
boards.receiveAttack(2, 2);
boards.receiveAttack(2, 3);
boards.receiveAttack(2, 4);
boards.receiveAttack(2, 5);
