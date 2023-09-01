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
// START //



class Gameboard {
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
      this.allShipsSunk();
    } else {
      this.missedShots.push([row, column]);
      isHit = false;
    }
    return isHit;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxDQUFDQSxNQUFNLEVBQUUsT0FBTyxJQUFJO0lBQ2pELE9BQU8sS0FBSztFQUNkO0FBQ0Y7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDL0JBOztBQUVxQjtBQUNtQjs7Ozs7Ozs7Ozs7O0FDSHhDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZGF0YS9zaGlwUHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz9lMzIwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFNUQVJUIC8vXG5cbmV4cG9ydCBjb25zdCBzaGlwUHJvcGVydGllcyA9IFtcbiAge1xuICAgIHR5cGU6ICdDYXJyaWVyJyxcbiAgICBsZW5ndGg6IDUsXG4gIH0sXG4gIHtcbiAgICB0eXBlOiAnQmF0dGxlc2hpcCcsXG4gICAgbGVuZ3RoOiA0LFxuICB9LFxuICB7XG4gICAgdHlwZTogJ0Rlc3Ryb3llcicsXG4gICAgbGVuZ3RoOiAzLFxuICB9LFxuICB7XG4gICAgdHlwZTogJ1N1Ym1hcmluZScsXG4gICAgbGVuZ3RoOiAzLFxuICB9LFxuICB7XG4gICAgdHlwZTogJ1BhdHJvbCBCb2F0JyxcbiAgICBsZW5ndGg6IDIsXG4gIH0sXG5dO1xuIiwiLy8gU1RBUlQgLy9cblxuaW1wb3J0IHsgc2hpcFByb3BlcnRpZXMgfSBmcm9tICcuLi9kYXRhL3NoaXBQcm9wZXJ0aWVzJztcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuXG5leHBvcnQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgYm9hcmQ7XG4gIG1pc3NlZFNob3RzO1xuICBncmlkU2l6ZSA9IDEwO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICB0aGlzLm1pc3NlZFNob3RzID0gW107XG4gIH1cblxuICAvLyBHZW5lcmF0ZSB0aGUgZ2FtZSBib2FyZCBhcyBhIDJELWFycmF5XG4gIGJ1aWxkQm9hcmQoKSB7XG4gICAgbGV0IHZhbHVlID0gMTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ncmlkU2l6ZTsgaSsrKSB7XG4gICAgICB0aGlzLmJvYXJkW2ldID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuZ3JpZFNpemU7IGorKykge1xuICAgICAgICB0aGlzLmJvYXJkW2ldW2pdID0gdmFsdWUrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDYWxjdWxhdGUgdG90YWwgZmxlZXQgc2l6ZSBjb3VudGVkIGFzIHRvdGFsIG51bWJlciBvZiBzcXVhcmVzIG9jY3VwaWVkXG4gIC8vIGJ5IHRoZSBzaGlwcyBvbiB0aGUgZ2FtZS1yZWFkeSBib2FyZFxuICBmbGVldCgpIHtcbiAgICBsZXQgZmxlZXRTaXplID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBQcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmbGVldFNpemUgKz0gc2hpcFByb3BlcnRpZXNbaV0ubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gZmxlZXRTaXplO1xuICB9XG5cbiAgLy8gQ3JlYXRlIHNoaXBzIGJ5IGNhbGxpbmcgU2hpcCBjbGFzc1xuICBjcmVhdGVTaGlwcygpIHtcbiAgICBjb25zdCBwcm9wcyA9IHNoaXBQcm9wZXJ0aWVzO1xuICAgIGxldCBzaGlwc0FycmF5ID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpc1ZlcnRpY2FsID0gW3RydWUsIGZhbHNlXVtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpXTtcbiAgICAgIGNvbnN0IHZlc3NlbCA9IG5ldyBTaGlwKHByb3BzW2ldLnR5cGUsIHByb3BzW2ldLmxlbmd0aCwgaXNWZXJ0aWNhbCk7XG4gICAgICBzaGlwc0FycmF5LnB1c2godmVzc2VsKTtcbiAgICB9XG4gICAgcmV0dXJuIHNoaXBzQXJyYXk7XG4gIH1cblxuICBwbGFjZVNoaXBzKHNoaXAsIHJvdywgY29sdW1uLCB2ZXJ0aWNhbCkge1xuICAgIGlmICh2ZXJ0aWNhbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbcm93ICsgaV1bY29sdW1uXSA9IFtpLCBzaGlwXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2x1bW4gKyBpXSA9IFtpLCBzaGlwXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRSYW5kb21QbGFjZW1lbnQoKSB7XG4gICAgLy8gR2V0IHJldHVybmVkIGFycmF5IGZyb20gJ2NyZWF0ZVNoaXBzKCknXG4gICAgY29uc3Qgc2hpcHMgPSB0aGlzLmNyZWF0ZVNoaXBzKCk7XG5cbiAgICAvLyBDaGVjayB0byBzZWUgdGhhdCBib2FyZCBpcyBlbXB0eSAoaS5lLiByZWFkeSBmb3IgYSBuZXcgZ2FtZSlcbiAgICBpZiAoIXRoaXMuaXNCb2FyZEVtcHR5KSByZXR1cm47XG5cbiAgICAvLyBGb3IgZXZlcnkgc2hpcCBpbiBhcnJheVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIFNlbGVjdCByYW5kb20gc3RhcnQtY29vcmRpbmF0ZVxuICAgICAgY29uc3QgcmFuZFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmdyaWRTaXplKTtcbiAgICAgIGNvbnN0IHJhbmRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5ncmlkU2l6ZSk7XG4gICAgICAvLyBSZWFkIG9yaWVudGF0aW9uIG9mIHNoaXBcbiAgICAgIGNvbnN0IHZlcnRpY2FsID0gc2hpcHNbaV0udmVydGljYWw7XG5cbiAgICAgIC8vIENoZWNrIGlmIHBsYWNlbWVudCBpcyBhbGxvd2VkIC0gb3RoZXJ3aXNlIHJlLXN0YXJ0IGxvb3AgZnJvbSBjdXJyZW50IGluZGV4IGFnYWluXG4gICAgICBpZiAoIXRoaXMucGxhY2VtZW50QWxsb3dlZChzaGlwc1tpXSwgcmFuZFgsIHJhbmRZLCB2ZXJ0aWNhbCkpIHtcbiAgICAgICAgaS0tO1xuICAgICAgfSBlbHNlIHRoaXMucGxhY2VTaGlwcyhzaGlwc1tpXSwgcmFuZFgsIHJhbmRZLCB2ZXJ0aWNhbCk7XG4gICAgfVxuICB9XG5cbiAgcGxhY2VtZW50QWxsb3dlZChzaGlwLCByb3csIGNvbHVtbiwgdmVydGljYWwpIHtcbiAgICAvLyBDaGVjayBpZiBwbGFjZW1lbnQgb2Ygc2hpcCBpcyBmdWxseSBvciBwYXJ0bHkgb3V0c2lkZSBncmlkIHBlcmltZXRlclxuICAgIGlmIChcbiAgICAgIHJvdyA+IHRoaXMuZ3JpZFNpemUgfHxcbiAgICAgIGNvbHVtbiA+IHRoaXMuZ3JpZFNpemUgfHxcbiAgICAgIHJvdyArIHNoaXAubGVuZ3RoID4gdGhpcy5ncmlkU2l6ZSB8fFxuICAgICAgY29sdW1uICsgc2hpcC5sZW5ndGggPiB0aGlzLmdyaWRTaXplXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gQ2hlY2sgaWYgYSBnaXZlbiBjb29yZGluYXRlIGlzIGFscmVhZHkgb2NjdXBpZWRcbiAgICBpZiAodmVydGljYWwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbcm93ICsgaV1bY29sdW1uXSAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFtyb3ddW2NvbHVtbiArIGldICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pIHtcbiAgICBsZXQgaXNIaXQ7XG4gICAgY29uc3QgY29vcmRpbmF0ZSA9IHRoaXMuYm9hcmRbcm93XVtjb2x1bW5dO1xuXG4gICAgaWYgKHR5cGVvZiBjb29yZGluYXRlICE9PSAnbnVtYmVyJykge1xuICAgICAgY29vcmRpbmF0ZVsxXS5oaXQoY29vcmRpbmF0ZVswXSk7XG4gICAgICBpc0hpdCA9IHRydWU7XG4gICAgICB0aGlzLmFsbFNoaXBzU3VuaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pc3NlZFNob3RzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICBpc0hpdCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNIaXQ7XG4gIH1cblxuICBpc0JvYXJkRW1wdHkoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdyaWRTaXplOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ncmlkU2l6ZTsgaisrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFtpXVtqXSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuY29uc3QgYm9hcmRzID0gbmV3IEdhbWVib2FyZCgpO1xuYm9hcmRzLmJ1aWxkQm9hcmQoKTtcbmNvbnN0IHNob3dCb2FyZCA9IGJvYXJkcy5ib2FyZDtcbmNvbnNvbGUubG9nKHNob3dCb2FyZCk7XG5cbmJvYXJkcy5nZXRSYW5kb21QbGFjZW1lbnQoKTtcblxuYm9hcmRzLnJlY2VpdmVBdHRhY2soMiwgNik7XG5ib2FyZHMucmVjZWl2ZUF0dGFjaygzLCA2KTtcbmJvYXJkcy5yZWNlaXZlQXR0YWNrKDQsIDYpO1xuYm9hcmRzLnJlY2VpdmVBdHRhY2soMiwgMik7XG5ib2FyZHMucmVjZWl2ZUF0dGFjaygyLCAzKTtcbmJvYXJkcy5yZWNlaXZlQXR0YWNrKDIsIDQpO1xuYm9hcmRzLnJlY2VpdmVBdHRhY2soMiwgNSk7XG4iLCIvLyBTVEFSVCAvL1xuXG5leHBvcnQgY2xhc3MgU2hpcCB7XG4gIHR5cGU7XG4gIGxlbmd0aDtcbiAgdmVydGljYWwgPSBmYWxzZTtcbiAgaGl0cztcblxuICBjb25zdHJ1Y3Rvcih0eXBlLCBsZW5ndGgsIHZlcnRpY2FsKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnZlcnRpY2FsID0gdmVydGljYWw7XG4gICAgdGhpcy5oaXRzID0gW107XG4gIH1cblxuICBoaXQocG9zaXRpb24pIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmhpdHMuaW5jbHVkZXMocG9zaXRpb24pIHx8XG4gICAgICBwb3NpdGlvbiA8IDAgfHxcbiAgICAgIHBvc2l0aW9uID4gdGhpcy5sZW5ndGggLSAxXG4gICAgKVxuICAgICAgcmV0dXJuO1xuICAgIHRoaXMuaGl0cy5wdXNoKHBvc2l0aW9uKTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRzLmxlbmd0aCA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vZmFjdG9yaWVzL3NoaXAnO1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9mYWN0b3JpZXMvZ2FtZWJvYXJkJztcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJzaGlwUHJvcGVydGllcyIsInR5cGUiLCJsZW5ndGgiLCJTaGlwIiwiR2FtZWJvYXJkIiwiYm9hcmQiLCJtaXNzZWRTaG90cyIsImdyaWRTaXplIiwiY29uc3RydWN0b3IiLCJidWlsZEJvYXJkIiwidmFsdWUiLCJpIiwiaiIsImZsZWV0IiwiZmxlZXRTaXplIiwiY3JlYXRlU2hpcHMiLCJwcm9wcyIsInNoaXBzQXJyYXkiLCJpc1ZlcnRpY2FsIiwiTWF0aCIsInJvdW5kIiwicmFuZG9tIiwidmVzc2VsIiwicHVzaCIsInBsYWNlU2hpcHMiLCJzaGlwIiwicm93IiwiY29sdW1uIiwidmVydGljYWwiLCJnZXRSYW5kb21QbGFjZW1lbnQiLCJzaGlwcyIsImlzQm9hcmRFbXB0eSIsInJhbmRYIiwiZmxvb3IiLCJyYW5kWSIsInBsYWNlbWVudEFsbG93ZWQiLCJyZWNlaXZlQXR0YWNrIiwiaXNIaXQiLCJjb29yZGluYXRlIiwiaGl0IiwiYWxsU2hpcHNTdW5rIiwiYm9hcmRzIiwic2hvd0JvYXJkIiwiY29uc29sZSIsImxvZyIsImhpdHMiLCJwb3NpdGlvbiIsImluY2x1ZGVzIiwiaXNTdW5rIl0sInNvdXJjZVJvb3QiOiIifQ==