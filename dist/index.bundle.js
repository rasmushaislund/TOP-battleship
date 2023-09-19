"use strict";
(self["webpackChunktop_battleship"] = self["webpackChunktop_battleship"] || []).push([["index"],{

/***/ "./src/data/shipProperties.js":
/*!************************************!*\
  !*** ./src/data/shipProperties.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   shipProperties: function() { return /* binding */ shipProperties; }
/* harmony export */ });
// START //

const shipProperties = [{
  type: 'Carrier',
  length: 5
}, {
  type: 'Battleship',
  length: 4
}, {
  type: 'Destroyer',
  length: 3
}, {
  type: 'Submarine',
  length: 3
}, {
  type: 'Patrol Boat',
  length: 2
}];

/***/ }),

/***/ "./src/factories/gameboard.js":
/*!************************************!*\
  !*** ./src/factories/gameboard.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gameboard: function() { return /* binding */ Gameboard; }
/* harmony export */ });
/* harmony import */ var _data_shipProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/shipProperties */ "./src/data/shipProperties.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/factories/ship.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/factories/player.js");
// START //




class Gameboard {
  board;
  missedShots;
  sunkenShips;
  gridSize = 10;
  constructor() {
    this.board = []; // Interface
    this.missedShots = []; // Interface
    this.sunkenShips = []; // Interface
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

  // Calculate total fleet size counted as total number of squares occupied
  // by the ships on the game-ready board
  fleet() {
    let fleetSize = 0;
    for (let i = 0; i < _data_shipProperties__WEBPACK_IMPORTED_MODULE_0__.shipProperties.length; i++) {
      fleetSize += _data_shipProperties__WEBPACK_IMPORTED_MODULE_0__.shipProperties[i].length;
    }
    return fleetSize;
  }

  // Create ships by calling Ship class
  createShips() {
    const props = _data_shipProperties__WEBPACK_IMPORTED_MODULE_0__.shipProperties;
    let shipsArray = [];
    for (let i = 0; i < props.length; i++) {
      const isVertical = [true, false][Math.round(Math.random())];
      const vessel = new _ship__WEBPACK_IMPORTED_MODULE_1__.Ship(props[i].type, props[i].length, isVertical);
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

    // Check to see that board is empty (i.e. ready for a new game)
    if (!this.isBoardEmpty) return;

    // For every ship in array
    for (let i = 0; i < ships.length; i++) {
      // Select random start-coordinate
      const randX = Math.floor(Math.random() * this.gridSize);
      const randY = Math.floor(Math.random() * this.gridSize);
      // Read orientation of ship
      const vertical = ships[i].vertical;

      // Check if placement is allowed - otherwise re-start loop from current index again
      if (!this.placementAllowed(ships[i], randX, randY, vertical)) {
        i--;
      } else this.placeShips(ships[i], randX, randY, vertical);
    }
  }
  placementAllowed(ship, row, column, vertical) {
    // Check if placement of ship is fully or partly outside grid perimeter
    if (row > this.gridSize || column > this.gridSize || row + ship.length > this.gridSize || column + ship.length > this.gridSize) return false;

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
    let isHit;
    let coordinate = this.board[row][column];
    if (typeof coordinate !== 'number') {
      coordinate[1].hit(coordinate[0]);
      isHit = true;
      if (coordinate[1].isSunk()) {
        this.sunkenShips.push(coordinate[1]);
      }
    } else {
      this.missedShots.push([row, column]);
      isHit = false;
    }
    return isHit;
  }
  allShipsSunk() {
    if (!this.sunkenShips.length === _data_shipProperties__WEBPACK_IMPORTED_MODULE_0__.shipProperties.length) return false;
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

  // Use this to verify correct placement of ships
  countOccupiedSquares() {
    const availableSquares = this.gridSize * this.gridSize;
    const fleetSize = this.fleet();
    return availableSquares - (availableSquares - fleetSize);
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
console.log(boards.missedShots);

// END //

/***/ }),

/***/ "./src/factories/player.js":
/*!*********************************!*\
  !*** ./src/factories/player.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: function() { return /* binding */ Player; }
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/factories/gameboard.js");
// START //


class Player {
  playerOneName;
  playerTwoName = 'computer';
  activePlayer = this.playerOneName;
  attacks;
  constructor(playerName) {
    this.playerName = playerName;
    this.attacks = [];
  }
  attackSquare(row, column) {
    const gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();
    // gameboard.buildBoard();

    if (!this.hasBeenAttacked(row, column)) {
      this.attacks.push([row, column]);
      gameboard.receiveAttack(row, column);
    } else {
      return;
    }
  }
  attackRandomSquare() {
    const gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();
    // gameboard.buildBoard();

    if (this.attacks.length >= 100) return;
    const randRow = Math.floor(Math.random() * gameboard.gridSize);
    const randColumn = Math.floor(Math.random() * gameboard.gridSize);
    if (!this.hasBeenAttacked(randRow, randColumn)) gameboard.receiveAttack(randRow, randColumn);
    return;
  }
  hasBeenAttacked(row, column) {
    for (let i = 0; i < this.attacks.length; i++) {
      if (this.attacks[i][0] === row && this.attacks[i][1] === column) return true;
    }
    return false;
  }
}

// END //

/***/ }),

/***/ "./src/factories/ship.js":
/*!*******************************!*\
  !*** ./src/factories/ship.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: function() { return /* binding */ Ship; }
/* harmony export */ });
// START //

class Ship {
  type;
  length;
  vertical = false;
  hits;
  constructor(type, length, vertical) {
    this.type = type;
    this.length = length;
    this.vertical = vertical;
    this.hits = [];
  }
  hit(position) {
    if (this.hits.includes(position) || position < 0 || position > this.length - 1) return;
    this.hits.push(position);
  }
  isSunk() {
    if (this.hits.length === this.length) return true;
    return false;
  }
}

// END //

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _factories_ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/ship */ "./src/factories/ship.js");
/* harmony import */ var _factories_gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/gameboard */ "./src/factories/gameboard.js");
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factories/player */ "./src/factories/player.js");
// START //






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

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNxQyxRQUFRLENBQUM7RUFDMUI7RUFFQXBCLE1BQU1BLENBQUEsRUFBRztJQUNQLElBQUksSUFBSSxDQUFDbUIsSUFBSSxDQUFDM0QsTUFBTSxLQUFLLElBQUksQ0FBQ0EsTUFBTSxFQUFFLE9BQU8sSUFBSTtJQUNqRCxPQUFPLEtBQUs7RUFDZDtBQUNGOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUMvQkE7O0FBRXFCO0FBQ21CO0FBQ1U7QUFDTjs7QUFFNUM7QUFDQSxNQUFNOEQsYUFBYSxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztBQUMvREYsYUFBYSxDQUFDRyxXQUFXLEdBQUcsSUFBSUMsSUFBSSxDQUFDLENBQUMsQ0FBQ0MsV0FBVyxDQUFDLENBQUM7O0FBRXBEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ3JCQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2RhdGEvc2hpcFByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz9lMzIwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFNUQVJUIC8vXG5cbmV4cG9ydCBjb25zdCBzaGlwUHJvcGVydGllcyA9IFtcbiAge1xuICAgIHR5cGU6ICdDYXJyaWVyJyxcbiAgICBsZW5ndGg6IDUsXG4gIH0sXG4gIHtcbiAgICB0eXBlOiAnQmF0dGxlc2hpcCcsXG4gICAgbGVuZ3RoOiA0LFxuICB9LFxuICB7XG4gICAgdHlwZTogJ0Rlc3Ryb3llcicsXG4gICAgbGVuZ3RoOiAzLFxuICB9LFxuICB7XG4gICAgdHlwZTogJ1N1Ym1hcmluZScsXG4gICAgbGVuZ3RoOiAzLFxuICB9LFxuICB7XG4gICAgdHlwZTogJ1BhdHJvbCBCb2F0JyxcbiAgICBsZW5ndGg6IDIsXG4gIH0sXG5dO1xuIiwiLy8gU1RBUlQgLy9cblxuaW1wb3J0IHsgc2hpcFByb3BlcnRpZXMgfSBmcm9tICcuLi9kYXRhL3NoaXBQcm9wZXJ0aWVzJztcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuXG5leHBvcnQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgYm9hcmQ7XG4gIG1pc3NlZFNob3RzO1xuICBzdW5rZW5TaGlwcztcbiAgZ3JpZFNpemUgPSAxMDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJvYXJkID0gW107IC8vIEludGVyZmFjZVxuICAgIHRoaXMubWlzc2VkU2hvdHMgPSBbXTsgLy8gSW50ZXJmYWNlXG4gICAgdGhpcy5zdW5rZW5TaGlwcyA9IFtdOyAvLyBJbnRlcmZhY2VcbiAgfVxuXG4gIC8vIEdlbmVyYXRlIHRoZSBnYW1lIGJvYXJkIGFzIGEgMkQtYXJyYXlcbiAgYnVpbGRCb2FyZCgpIHtcbiAgICBsZXQgdmFsdWUgPSAxO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdyaWRTaXplOyBpKyspIHtcbiAgICAgIHRoaXMuYm9hcmRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ncmlkU2l6ZTsgaisrKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbaV1bal0gPSB2YWx1ZSsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSB0b3RhbCBmbGVldCBzaXplIGNvdW50ZWQgYXMgdG90YWwgbnVtYmVyIG9mIHNxdWFyZXMgb2NjdXBpZWRcbiAgLy8gYnkgdGhlIHNoaXBzIG9uIHRoZSBnYW1lLXJlYWR5IGJvYXJkXG4gIGZsZWV0KCkge1xuICAgIGxldCBmbGVldFNpemUgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZsZWV0U2l6ZSArPSBzaGlwUHJvcGVydGllc1tpXS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBmbGVldFNpemU7XG4gIH1cblxuICAvLyBDcmVhdGUgc2hpcHMgYnkgY2FsbGluZyBTaGlwIGNsYXNzXG4gIGNyZWF0ZVNoaXBzKCkge1xuICAgIGNvbnN0IHByb3BzID0gc2hpcFByb3BlcnRpZXM7XG4gICAgbGV0IHNoaXBzQXJyYXkgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGlzVmVydGljYWwgPSBbdHJ1ZSwgZmFsc2VdW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSldO1xuICAgICAgY29uc3QgdmVzc2VsID0gbmV3IFNoaXAocHJvcHNbaV0udHlwZSwgcHJvcHNbaV0ubGVuZ3RoLCBpc1ZlcnRpY2FsKTtcbiAgICAgIHNoaXBzQXJyYXkucHVzaCh2ZXNzZWwpO1xuICAgIH1cbiAgICByZXR1cm4gc2hpcHNBcnJheTtcbiAgfVxuXG4gIHBsYWNlU2hpcHMoc2hpcCwgcm93LCBjb2x1bW4sIHZlcnRpY2FsKSB7XG4gICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZFtyb3cgKyBpXVtjb2x1bW5dID0gW2ksIHNoaXBdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbHVtbiArIGldID0gW2ksIHNoaXBdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFJhbmRvbVBsYWNlbWVudCgpIHtcbiAgICAvLyBHZXQgcmV0dXJuZWQgYXJyYXkgZnJvbSAnY3JlYXRlU2hpcHMoKSdcbiAgICBjb25zdCBzaGlwcyA9IHRoaXMuY3JlYXRlU2hpcHMoKTtcblxuICAgIC8vIENoZWNrIHRvIHNlZSB0aGF0IGJvYXJkIGlzIGVtcHR5IChpLmUuIHJlYWR5IGZvciBhIG5ldyBnYW1lKVxuICAgIGlmICghdGhpcy5pc0JvYXJkRW1wdHkpIHJldHVybjtcblxuICAgIC8vIEZvciBldmVyeSBzaGlwIGluIGFycmF5XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gU2VsZWN0IHJhbmRvbSBzdGFydC1jb29yZGluYXRlXG4gICAgICBjb25zdCByYW5kWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZ3JpZFNpemUpO1xuICAgICAgY29uc3QgcmFuZFkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmdyaWRTaXplKTtcbiAgICAgIC8vIFJlYWQgb3JpZW50YXRpb24gb2Ygc2hpcFxuICAgICAgY29uc3QgdmVydGljYWwgPSBzaGlwc1tpXS52ZXJ0aWNhbDtcblxuICAgICAgLy8gQ2hlY2sgaWYgcGxhY2VtZW50IGlzIGFsbG93ZWQgLSBvdGhlcndpc2UgcmUtc3RhcnQgbG9vcCBmcm9tIGN1cnJlbnQgaW5kZXggYWdhaW5cbiAgICAgIGlmICghdGhpcy5wbGFjZW1lbnRBbGxvd2VkKHNoaXBzW2ldLCByYW5kWCwgcmFuZFksIHZlcnRpY2FsKSkge1xuICAgICAgICBpLS07XG4gICAgICB9IGVsc2UgdGhpcy5wbGFjZVNoaXBzKHNoaXBzW2ldLCByYW5kWCwgcmFuZFksIHZlcnRpY2FsKTtcbiAgICB9XG4gIH1cblxuICBwbGFjZW1lbnRBbGxvd2VkKHNoaXAsIHJvdywgY29sdW1uLCB2ZXJ0aWNhbCkge1xuICAgIC8vIENoZWNrIGlmIHBsYWNlbWVudCBvZiBzaGlwIGlzIGZ1bGx5IG9yIHBhcnRseSBvdXRzaWRlIGdyaWQgcGVyaW1ldGVyXG4gICAgaWYgKFxuICAgICAgcm93ID4gdGhpcy5ncmlkU2l6ZSB8fFxuICAgICAgY29sdW1uID4gdGhpcy5ncmlkU2l6ZSB8fFxuICAgICAgcm93ICsgc2hpcC5sZW5ndGggPiB0aGlzLmdyaWRTaXplIHx8XG4gICAgICBjb2x1bW4gKyBzaGlwLmxlbmd0aCA+IHRoaXMuZ3JpZFNpemVcbiAgICApXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBDaGVjayBpZiBhIGdpdmVuIGNvb3JkaW5hdGUgaXMgYWxyZWFkeSBvY2N1cGllZFxuICAgIGlmICh2ZXJ0aWNhbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFtyb3cgKyBpXVtjb2x1bW5dICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW3Jvd11bY29sdW1uICsgaV0gIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbikge1xuICAgIGxldCBpc0hpdDtcbiAgICBsZXQgY29vcmRpbmF0ZSA9IHRoaXMuYm9hcmRbcm93XVtjb2x1bW5dO1xuXG4gICAgaWYgKHR5cGVvZiBjb29yZGluYXRlICE9PSAnbnVtYmVyJykge1xuICAgICAgY29vcmRpbmF0ZVsxXS5oaXQoY29vcmRpbmF0ZVswXSk7XG4gICAgICBpc0hpdCA9IHRydWU7XG4gICAgICBpZiAoY29vcmRpbmF0ZVsxXS5pc1N1bmsoKSkge1xuICAgICAgICB0aGlzLnN1bmtlblNoaXBzLnB1c2goY29vcmRpbmF0ZVsxXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWlzc2VkU2hvdHMucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIGlzSGl0ID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc0hpdDtcbiAgfVxuXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICBpZiAoIXRoaXMuc3Vua2VuU2hpcHMubGVuZ3RoID09PSBzaGlwUHJvcGVydGllcy5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzQm9hcmRFbXB0eSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JpZFNpemU7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmdyaWRTaXplOyBqKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW2ldW2pdICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIFVzZSB0aGlzIHRvIHZlcmlmeSBjb3JyZWN0IHBsYWNlbWVudCBvZiBzaGlwc1xuICBjb3VudE9jY3VwaWVkU3F1YXJlcygpIHtcbiAgICBjb25zdCBhdmFpbGFibGVTcXVhcmVzID0gdGhpcy5ncmlkU2l6ZSAqIHRoaXMuZ3JpZFNpemU7XG4gICAgY29uc3QgZmxlZXRTaXplID0gdGhpcy5mbGVldCgpO1xuICAgIHJldHVybiBhdmFpbGFibGVTcXVhcmVzIC0gKGF2YWlsYWJsZVNxdWFyZXMgLSBmbGVldFNpemUpO1xuICB9XG59XG5cbmNvbnN0IGJvYXJkcyA9IG5ldyBHYW1lYm9hcmQoKTtcbmJvYXJkcy5idWlsZEJvYXJkKCk7XG5jb25zdCBzaG93Qm9hcmQgPSBib2FyZHMuYm9hcmQ7XG5jb25zb2xlLmxvZyhzaG93Qm9hcmQpO1xuXG5ib2FyZHMuZ2V0UmFuZG9tUGxhY2VtZW50KCk7XG5cbmJvYXJkcy5yZWNlaXZlQXR0YWNrKDIsIDYpO1xuYm9hcmRzLnJlY2VpdmVBdHRhY2soMywgNik7XG5ib2FyZHMucmVjZWl2ZUF0dGFjayg0LCA2KTtcbmJvYXJkcy5yZWNlaXZlQXR0YWNrKDIsIDIpO1xuYm9hcmRzLnJlY2VpdmVBdHRhY2soMiwgMyk7XG5ib2FyZHMucmVjZWl2ZUF0dGFjaygyLCA0KTtcbmJvYXJkcy5yZWNlaXZlQXR0YWNrKDIsIDUpO1xuXG5jb25zb2xlLmxvZyhib2FyZHMubWlzc2VkU2hvdHMpO1xuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcblxuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gIHBsYXllck9uZU5hbWU7XG4gIHBsYXllclR3b05hbWUgPSAnY29tcHV0ZXInO1xuICBhY3RpdmVQbGF5ZXIgPSB0aGlzLnBsYXllck9uZU5hbWU7XG4gIGF0dGFja3M7XG5cbiAgY29uc3RydWN0b3IocGxheWVyTmFtZSkge1xuICAgIHRoaXMucGxheWVyTmFtZSA9IHBsYXllck5hbWU7XG4gICAgdGhpcy5hdHRhY2tzID0gW107XG4gIH1cblxuICBhdHRhY2tTcXVhcmUocm93LCBjb2x1bW4pIHtcbiAgICBjb25zdCBnYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gICAgLy8gZ2FtZWJvYXJkLmJ1aWxkQm9hcmQoKTtcblxuICAgIGlmICghdGhpcy5oYXNCZWVuQXR0YWNrZWQocm93LCBjb2x1bW4pKSB7XG4gICAgICB0aGlzLmF0dGFja3MucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGF0dGFja1JhbmRvbVNxdWFyZSgpIHtcbiAgICBjb25zdCBnYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gICAgLy8gZ2FtZWJvYXJkLmJ1aWxkQm9hcmQoKTtcblxuICAgIGlmICh0aGlzLmF0dGFja3MubGVuZ3RoID49IDEwMCkgcmV0dXJuO1xuICAgIGNvbnN0IHJhbmRSb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBnYW1lYm9hcmQuZ3JpZFNpemUpO1xuICAgIGNvbnN0IHJhbmRDb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBnYW1lYm9hcmQuZ3JpZFNpemUpO1xuXG4gICAgaWYgKCF0aGlzLmhhc0JlZW5BdHRhY2tlZChyYW5kUm93LCByYW5kQ29sdW1uKSlcbiAgICAgIGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRSb3csIHJhbmRDb2x1bW4pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGhhc0JlZW5BdHRhY2tlZChyb3csIGNvbHVtbikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hdHRhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5hdHRhY2tzW2ldWzBdID09PSByb3cgJiYgdGhpcy5hdHRhY2tzW2ldWzFdID09PSBjb2x1bW4pXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gRU5EIC8vXG4iLCIvLyBTVEFSVCAvL1xuXG5leHBvcnQgY2xhc3MgU2hpcCB7XG4gIHR5cGU7XG4gIGxlbmd0aDtcbiAgdmVydGljYWwgPSBmYWxzZTtcbiAgaGl0cztcblxuICBjb25zdHJ1Y3Rvcih0eXBlLCBsZW5ndGgsIHZlcnRpY2FsKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnZlcnRpY2FsID0gdmVydGljYWw7XG4gICAgdGhpcy5oaXRzID0gW107XG4gIH1cblxuICBoaXQocG9zaXRpb24pIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmhpdHMuaW5jbHVkZXMocG9zaXRpb24pIHx8XG4gICAgICBwb3NpdGlvbiA8IDAgfHxcbiAgICAgIHBvc2l0aW9uID4gdGhpcy5sZW5ndGggLSAxXG4gICAgKVxuICAgICAgcmV0dXJuO1xuICAgIHRoaXMuaGl0cy5wdXNoKHBvc2l0aW9uKTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRzLmxlbmd0aCA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vZmFjdG9yaWVzL3NoaXAnO1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9mYWN0b3JpZXMvZ2FtZWJvYXJkJztcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vZmFjdG9yaWVzL3BsYXllcic7XG5cbi8vIFNldCBjb3B5cmlnaHQgeWVhciBhdXRvbWF0aWNhbGx5XG5jb25zdCBjb3B5cmlnaHRTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvcHlyaWdodC1zcGFuJyk7XG5jb3B5cmlnaHRTcGFuLnRleHRDb250ZW50ID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXG4vLyBTaG93IG1vZGFsIHdpdGggcGFnZSBsb2FkXG5cbi8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuLy8gICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpO1xuLy8gICBjb25zdCBtYWluR2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLWdhbWUnKTtcbi8vICAgbW9kYWwuc2hvd01vZGFsKCk7XG4vLyAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbi8vICAgbWFpbkdhbWUuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuLy8gfSk7XG5cbi8vIEVORCAvL1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbInNoaXBQcm9wZXJ0aWVzIiwidHlwZSIsImxlbmd0aCIsIlNoaXAiLCJQbGF5ZXIiLCJHYW1lYm9hcmQiLCJib2FyZCIsIm1pc3NlZFNob3RzIiwic3Vua2VuU2hpcHMiLCJncmlkU2l6ZSIsImNvbnN0cnVjdG9yIiwiYnVpbGRCb2FyZCIsInZhbHVlIiwiaSIsImoiLCJmbGVldCIsImZsZWV0U2l6ZSIsImNyZWF0ZVNoaXBzIiwicHJvcHMiLCJzaGlwc0FycmF5IiwiaXNWZXJ0aWNhbCIsIk1hdGgiLCJyb3VuZCIsInJhbmRvbSIsInZlc3NlbCIsInB1c2giLCJwbGFjZVNoaXBzIiwic2hpcCIsInJvdyIsImNvbHVtbiIsInZlcnRpY2FsIiwiZ2V0UmFuZG9tUGxhY2VtZW50Iiwic2hpcHMiLCJpc0JvYXJkRW1wdHkiLCJyYW5kWCIsImZsb29yIiwicmFuZFkiLCJwbGFjZW1lbnRBbGxvd2VkIiwicmVjZWl2ZUF0dGFjayIsImlzSGl0IiwiY29vcmRpbmF0ZSIsImhpdCIsImlzU3VuayIsImFsbFNoaXBzU3VuayIsImNvdW50T2NjdXBpZWRTcXVhcmVzIiwiYXZhaWxhYmxlU3F1YXJlcyIsImJvYXJkcyIsInNob3dCb2FyZCIsImNvbnNvbGUiLCJsb2ciLCJwbGF5ZXJPbmVOYW1lIiwicGxheWVyVHdvTmFtZSIsImFjdGl2ZVBsYXllciIsImF0dGFja3MiLCJwbGF5ZXJOYW1lIiwiYXR0YWNrU3F1YXJlIiwiZ2FtZWJvYXJkIiwiaGFzQmVlbkF0dGFja2VkIiwiYXR0YWNrUmFuZG9tU3F1YXJlIiwicmFuZFJvdyIsInJhbmRDb2x1bW4iLCJoaXRzIiwicG9zaXRpb24iLCJpbmNsdWRlcyIsImNvcHlyaWdodFNwYW4iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsIkRhdGUiLCJnZXRGdWxsWWVhciJdLCJzb3VyY2VSb290IjoiIn0=