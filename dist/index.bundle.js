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
    const coordinate = this.board[row][column];
    if (typeof coordinate !== 'number') {
      coordinate[1].hit(coordinate[0]);
      isHit = true;
      if (coordinate[1].isSunk()) {
        this.sunkenShips.push(coordinate[1]);
        console.log(this.sunkenShips);
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
console.log(boards.countOccupiedSquares());

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
// START //





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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHO0lBQ1AsSUFBSSxJQUFJLENBQUNhLElBQUksQ0FBQ3JELE1BQU0sS0FBSyxJQUFJLENBQUNBLE1BQU0sRUFBRSxPQUFPLElBQUk7SUFDakQsT0FBTyxLQUFLO0VBQ2Q7QUFDRjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUMvQkE7O0FBRXFCO0FBQ21COzs7Ozs7Ozs7Ozs7QUNIeEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9kYXRhL3NoaXBQcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/ZTMyMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTVEFSVCAvL1xuXG5leHBvcnQgY29uc3Qgc2hpcFByb3BlcnRpZXMgPSBbXG4gIHtcbiAgICB0eXBlOiAnQ2FycmllcicsXG4gICAgbGVuZ3RoOiA1LFxuICB9LFxuICB7XG4gICAgdHlwZTogJ0JhdHRsZXNoaXAnLFxuICAgIGxlbmd0aDogNCxcbiAgfSxcbiAge1xuICAgIHR5cGU6ICdEZXN0cm95ZXInLFxuICAgIGxlbmd0aDogMyxcbiAgfSxcbiAge1xuICAgIHR5cGU6ICdTdWJtYXJpbmUnLFxuICAgIGxlbmd0aDogMyxcbiAgfSxcbiAge1xuICAgIHR5cGU6ICdQYXRyb2wgQm9hdCcsXG4gICAgbGVuZ3RoOiAyLFxuICB9LFxuXTtcbiIsIi8vIFNUQVJUIC8vXG5cbmltcG9ydCB7IHNoaXBQcm9wZXJ0aWVzIH0gZnJvbSAnLi4vZGF0YS9zaGlwUHJvcGVydGllcyc7XG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJztcblxuZXhwb3J0IGNsYXNzIEdhbWVib2FyZCB7XG4gIGJvYXJkO1xuICBtaXNzZWRTaG90cztcbiAgc3Vua2VuU2hpcHM7XG4gIGdyaWRTaXplID0gMTA7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IFtdOyAvLyBJbnRlcmZhY2VcbiAgICB0aGlzLm1pc3NlZFNob3RzID0gW107IC8vIEludGVyZmFjZVxuICAgIHRoaXMuc3Vua2VuU2hpcHMgPSBbXTsgLy8gSW50ZXJmYWNlXG4gIH1cblxuICAvLyBHZW5lcmF0ZSB0aGUgZ2FtZSBib2FyZCBhcyBhIDJELWFycmF5XG4gIGJ1aWxkQm9hcmQoKSB7XG4gICAgbGV0IHZhbHVlID0gMTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ncmlkU2l6ZTsgaSsrKSB7XG4gICAgICB0aGlzLmJvYXJkW2ldID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuZ3JpZFNpemU7IGorKykge1xuICAgICAgICB0aGlzLmJvYXJkW2ldW2pdID0gdmFsdWUrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDYWxjdWxhdGUgdG90YWwgZmxlZXQgc2l6ZSBjb3VudGVkIGFzIHRvdGFsIG51bWJlciBvZiBzcXVhcmVzIG9jY3VwaWVkXG4gIC8vIGJ5IHRoZSBzaGlwcyBvbiB0aGUgZ2FtZS1yZWFkeSBib2FyZFxuICBmbGVldCgpIHtcbiAgICBsZXQgZmxlZXRTaXplID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBQcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmbGVldFNpemUgKz0gc2hpcFByb3BlcnRpZXNbaV0ubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gZmxlZXRTaXplO1xuICB9XG5cbiAgLy8gQ3JlYXRlIHNoaXBzIGJ5IGNhbGxpbmcgU2hpcCBjbGFzc1xuICBjcmVhdGVTaGlwcygpIHtcbiAgICBjb25zdCBwcm9wcyA9IHNoaXBQcm9wZXJ0aWVzO1xuICAgIGxldCBzaGlwc0FycmF5ID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpc1ZlcnRpY2FsID0gW3RydWUsIGZhbHNlXVtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpXTtcbiAgICAgIGNvbnN0IHZlc3NlbCA9IG5ldyBTaGlwKHByb3BzW2ldLnR5cGUsIHByb3BzW2ldLmxlbmd0aCwgaXNWZXJ0aWNhbCk7XG4gICAgICBzaGlwc0FycmF5LnB1c2godmVzc2VsKTtcbiAgICB9XG4gICAgcmV0dXJuIHNoaXBzQXJyYXk7XG4gIH1cblxuICBwbGFjZVNoaXBzKHNoaXAsIHJvdywgY29sdW1uLCB2ZXJ0aWNhbCkge1xuICAgIGlmICh2ZXJ0aWNhbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbcm93ICsgaV1bY29sdW1uXSA9IFtpLCBzaGlwXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2x1bW4gKyBpXSA9IFtpLCBzaGlwXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRSYW5kb21QbGFjZW1lbnQoKSB7XG4gICAgLy8gR2V0IHJldHVybmVkIGFycmF5IGZyb20gJ2NyZWF0ZVNoaXBzKCknXG4gICAgY29uc3Qgc2hpcHMgPSB0aGlzLmNyZWF0ZVNoaXBzKCk7XG5cbiAgICAvLyBDaGVjayB0byBzZWUgdGhhdCBib2FyZCBpcyBlbXB0eSAoaS5lLiByZWFkeSBmb3IgYSBuZXcgZ2FtZSlcbiAgICBpZiAoIXRoaXMuaXNCb2FyZEVtcHR5KSByZXR1cm47XG5cbiAgICAvLyBGb3IgZXZlcnkgc2hpcCBpbiBhcnJheVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIFNlbGVjdCByYW5kb20gc3RhcnQtY29vcmRpbmF0ZVxuICAgICAgY29uc3QgcmFuZFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmdyaWRTaXplKTtcbiAgICAgIGNvbnN0IHJhbmRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5ncmlkU2l6ZSk7XG4gICAgICAvLyBSZWFkIG9yaWVudGF0aW9uIG9mIHNoaXBcbiAgICAgIGNvbnN0IHZlcnRpY2FsID0gc2hpcHNbaV0udmVydGljYWw7XG5cbiAgICAgIC8vIENoZWNrIGlmIHBsYWNlbWVudCBpcyBhbGxvd2VkIC0gb3RoZXJ3aXNlIHJlLXN0YXJ0IGxvb3AgZnJvbSBjdXJyZW50IGluZGV4IGFnYWluXG4gICAgICBpZiAoIXRoaXMucGxhY2VtZW50QWxsb3dlZChzaGlwc1tpXSwgcmFuZFgsIHJhbmRZLCB2ZXJ0aWNhbCkpIHtcbiAgICAgICAgaS0tO1xuICAgICAgfSBlbHNlIHRoaXMucGxhY2VTaGlwcyhzaGlwc1tpXSwgcmFuZFgsIHJhbmRZLCB2ZXJ0aWNhbCk7XG4gICAgfVxuICB9XG5cbiAgcGxhY2VtZW50QWxsb3dlZChzaGlwLCByb3csIGNvbHVtbiwgdmVydGljYWwpIHtcbiAgICAvLyBDaGVjayBpZiBwbGFjZW1lbnQgb2Ygc2hpcCBpcyBmdWxseSBvciBwYXJ0bHkgb3V0c2lkZSBncmlkIHBlcmltZXRlclxuICAgIGlmIChcbiAgICAgIHJvdyA+IHRoaXMuZ3JpZFNpemUgfHxcbiAgICAgIGNvbHVtbiA+IHRoaXMuZ3JpZFNpemUgfHxcbiAgICAgIHJvdyArIHNoaXAubGVuZ3RoID4gdGhpcy5ncmlkU2l6ZSB8fFxuICAgICAgY29sdW1uICsgc2hpcC5sZW5ndGggPiB0aGlzLmdyaWRTaXplXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gQ2hlY2sgaWYgYSBnaXZlbiBjb29yZGluYXRlIGlzIGFscmVhZHkgb2NjdXBpZWRcbiAgICBpZiAodmVydGljYWwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbcm93ICsgaV1bY29sdW1uXSAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFtyb3ddW2NvbHVtbiArIGldICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pIHtcbiAgICBsZXQgaXNIaXQ7XG4gICAgY29uc3QgY29vcmRpbmF0ZSA9IHRoaXMuYm9hcmRbcm93XVtjb2x1bW5dO1xuXG4gICAgaWYgKHR5cGVvZiBjb29yZGluYXRlICE9PSAnbnVtYmVyJykge1xuICAgICAgY29vcmRpbmF0ZVsxXS5oaXQoY29vcmRpbmF0ZVswXSk7XG4gICAgICBpc0hpdCA9IHRydWU7XG4gICAgICBpZiAoY29vcmRpbmF0ZVsxXS5pc1N1bmsoKSkge1xuICAgICAgICB0aGlzLnN1bmtlblNoaXBzLnB1c2goY29vcmRpbmF0ZVsxXSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3Vua2VuU2hpcHMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pc3NlZFNob3RzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICBpc0hpdCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNIaXQ7XG4gIH1cblxuICBhbGxTaGlwc1N1bmsoKSB7XG4gICAgaWYgKCF0aGlzLnN1bmtlblNoaXBzLmxlbmd0aCA9PT0gc2hpcFByb3BlcnRpZXMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0JvYXJkRW1wdHkoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdyaWRTaXplOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ncmlkU2l6ZTsgaisrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFtpXVtqXSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBVc2UgdGhpcyB0byB2ZXJpZnkgY29ycmVjdCBwbGFjZW1lbnQgb2Ygc2hpcHNcbiAgY291bnRPY2N1cGllZFNxdWFyZXMoKSB7XG4gICAgY29uc3QgYXZhaWxhYmxlU3F1YXJlcyA9IHRoaXMuZ3JpZFNpemUgKiB0aGlzLmdyaWRTaXplO1xuICAgIGNvbnN0IGZsZWV0U2l6ZSA9IHRoaXMuZmxlZXQoKTtcbiAgICByZXR1cm4gYXZhaWxhYmxlU3F1YXJlcyAtIChhdmFpbGFibGVTcXVhcmVzIC0gZmxlZXRTaXplKTtcbiAgfVxufVxuXG5jb25zdCBib2FyZHMgPSBuZXcgR2FtZWJvYXJkKCk7XG5ib2FyZHMuYnVpbGRCb2FyZCgpO1xuY29uc3Qgc2hvd0JvYXJkID0gYm9hcmRzLmJvYXJkO1xuY29uc29sZS5sb2coc2hvd0JvYXJkKTtcblxuYm9hcmRzLmdldFJhbmRvbVBsYWNlbWVudCgpO1xuXG5ib2FyZHMucmVjZWl2ZUF0dGFjaygyLCA2KTtcbmJvYXJkcy5yZWNlaXZlQXR0YWNrKDMsIDYpO1xuYm9hcmRzLnJlY2VpdmVBdHRhY2soNCwgNik7XG5ib2FyZHMucmVjZWl2ZUF0dGFjaygyLCAyKTtcbmJvYXJkcy5yZWNlaXZlQXR0YWNrKDIsIDMpO1xuYm9hcmRzLnJlY2VpdmVBdHRhY2soMiwgNCk7XG5ib2FyZHMucmVjZWl2ZUF0dGFjaygyLCA1KTtcblxuY29uc29sZS5sb2coYm9hcmRzLmNvdW50T2NjdXBpZWRTcXVhcmVzKCkpO1xuIiwiLy8gU1RBUlQgLy9cblxuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgcGxheWVyc1R1cm4gPSAnaHVtYW4nO1xuICBhdHRhY2tzO1xuXG4gIGNvbnN0cnVjdG9yKHBsYXllcikge1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICB9XG5cbiAgY2hhbmdlVHVybihwbGF5ZXJzVHVybikge1xuICAgIGlmIChwbGF5ZXJzVHVybiA9PT0gJ2h1bWFuJykge1xuICAgICAgcGxheWVyc1R1cm4gPSAnY29tcHV0ZXInO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbGF5ZXJzVHVybiA9ICdodW1hbic7XG4gICAgfVxuICB9XG5cbiAgYXR0YWNrU3F1YXJlKHJvdywgY29sdW1uKSB7fVxufVxuIiwiLy8gU1RBUlQgLy9cblxuZXhwb3J0IGNsYXNzIFNoaXAge1xuICB0eXBlO1xuICBsZW5ndGg7XG4gIHZlcnRpY2FsID0gZmFsc2U7XG4gIGhpdHM7XG5cbiAgY29uc3RydWN0b3IodHlwZSwgbGVuZ3RoLCB2ZXJ0aWNhbCkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy52ZXJ0aWNhbCA9IHZlcnRpY2FsO1xuICAgIHRoaXMuaGl0cyA9IFtdO1xuICB9XG5cbiAgaGl0KHBvc2l0aW9uKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5oaXRzLmluY2x1ZGVzKHBvc2l0aW9uKSB8fFxuICAgICAgcG9zaXRpb24gPCAwIHx8XG4gICAgICBwb3NpdGlvbiA+IHRoaXMubGVuZ3RoIC0gMVxuICAgIClcbiAgICAgIHJldHVybjtcbiAgICB0aGlzLmhpdHMucHVzaChwb3NpdGlvbik7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0cy5sZW5ndGggPT09IHRoaXMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gRU5EIC8vXG4iLCIvLyBTVEFSVCAvL1xuXG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL2ZhY3Rvcmllcy9zaGlwJztcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZmFjdG9yaWVzL2dhbWVib2FyZCc7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsic2hpcFByb3BlcnRpZXMiLCJ0eXBlIiwibGVuZ3RoIiwiU2hpcCIsIlBsYXllciIsIkdhbWVib2FyZCIsImJvYXJkIiwibWlzc2VkU2hvdHMiLCJzdW5rZW5TaGlwcyIsImdyaWRTaXplIiwiY29uc3RydWN0b3IiLCJidWlsZEJvYXJkIiwidmFsdWUiLCJpIiwiaiIsImZsZWV0IiwiZmxlZXRTaXplIiwiY3JlYXRlU2hpcHMiLCJwcm9wcyIsInNoaXBzQXJyYXkiLCJpc1ZlcnRpY2FsIiwiTWF0aCIsInJvdW5kIiwicmFuZG9tIiwidmVzc2VsIiwicHVzaCIsInBsYWNlU2hpcHMiLCJzaGlwIiwicm93IiwiY29sdW1uIiwidmVydGljYWwiLCJnZXRSYW5kb21QbGFjZW1lbnQiLCJzaGlwcyIsImlzQm9hcmRFbXB0eSIsInJhbmRYIiwiZmxvb3IiLCJyYW5kWSIsInBsYWNlbWVudEFsbG93ZWQiLCJyZWNlaXZlQXR0YWNrIiwiaXNIaXQiLCJjb29yZGluYXRlIiwiaGl0IiwiaXNTdW5rIiwiY29uc29sZSIsImxvZyIsImFsbFNoaXBzU3VuayIsImNvdW50T2NjdXBpZWRTcXVhcmVzIiwiYXZhaWxhYmxlU3F1YXJlcyIsImJvYXJkcyIsInNob3dCb2FyZCIsInBsYXllcnNUdXJuIiwiYXR0YWNrcyIsInBsYXllciIsImNoYW5nZVR1cm4iLCJhdHRhY2tTcXVhcmUiLCJoaXRzIiwicG9zaXRpb24iLCJpbmNsdWRlcyJdLCJzb3VyY2VSb290IjoiIn0=