"use strict";
(self["webpackChunktop_battleship"] = self["webpackChunktop_battleship"] || []).push([["index"],{

/***/ "./src/controller/displayController.js":
/*!*********************************************!*\
  !*** ./src/controller/displayController.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Display: function() { return /* binding */ Display; }
/* harmony export */ });
/* harmony import */ var _gameController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameController */ "./src/controller/gameController.js");
// START //


function Display(playerName) {
  const game = (0,_gameController__WEBPACK_IMPORTED_MODULE_0__.Game)();
  const player = playerName;
  const ai = 'Enemy';

  // Setting player and ai names on UI
  const setPlayerName = (player, ai) => {
    const playerId = document.querySelector('#your-board');
    const aiId = document.querySelector('#opponent-board');
    playerId.textContent = player;
    aiId.textContent = ai;
  };

  // Build board grids based on 2D-arrays
  const buildGrids = () => {
    // Build player grid
    const playerBoard = game.player2dArray;
    const playerBoardContainer = document.querySelector('.game-board-player');
    for (let i = 0; i < playerBoard.length; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
      for (let j = 0; j < playerBoard[i].length; j++) {
        const column = document.createElement('div');
        column.classList.add('column');
        row.appendChild(column);
      }
      playerBoardContainer.appendChild(row);
    }

    // Build ai grid
    const aiBoard = game.ai2dArray;
    const aiBoardContainer = document.querySelector('.game-board-opponent');
    for (let i = 0; i < aiBoard.length; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
      for (let j = 0; j < aiBoard[i].length; j++) {
        const column = document.createElement('div');
        column.classList.add('column');
        row.appendChild(column);
      }
      aiBoardContainer.appendChild(row);
    }
  };
  setPlayerName(player, ai);
  buildGrids();
}

// END //

/***/ }),

/***/ "./src/controller/gameController.js":
/*!******************************************!*\
  !*** ./src/controller/gameController.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Game: function() { return /* binding */ Game; }
/* harmony export */ });
/* harmony import */ var _factories_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/gameboard */ "./src/factories/gameboard.js");
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factories/player */ "./src/factories/player.js");
/* harmony import */ var _displayController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./displayController */ "./src/controller/displayController.js");
// START //




function Game() {
  const playerBoard = new _factories_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();
  const aiBoard = new _factories_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();
  const buildPlayerBoard = playerBoard.buildBoard();
  const buildAiBoard = aiBoard.buildBoard();
  console.log(playerBoard, aiBoard);
  return {
    gridSize: playerBoard.gridSize,
    player2dArray: playerBoard.board,
    ai2dArray: aiBoard.board
  };
}

// END //

/***/ }),

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
  length: 5,
  color: 'rgb(252, 4, 4, .9)'
}, {
  type: 'Battleship',
  length: 4,
  color: 'rgb(4, 140, 4, .9)'
}, {
  type: 'Destroyer',
  length: 3,
  color: 'rgb(4, 4, 252, .9)'
}, {
  type: 'Submarine',
  length: 3,
  color: 'rgb(252, 251, 32, .9)'
}, {
  type: 'Patrol Boat',
  length: 2,
  color: 'rgb(12, 4, 12)'
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
/* harmony import */ var _controller_gameController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/gameController */ "./src/controller/gameController.js");
// START //



class Player {
  playerOneName;
  playerTwoName;
  activePlayer = this.playerOneName;
  attacks;
  constructor(playerName) {
    this.playerName = playerName;
    this.attacks = [];
  }
  attackSquare(row, column) {
    const game = (0,_controller_gameController__WEBPACK_IMPORTED_MODULE_1__.Game)();
    // gameboard.buildBoard();

    if (!this.hasBeenAttacked(row, column)) {
      this.attacks.push([row, column]);
      gameboard.receiveAttack(row, column);
    } else {
      return;
    }
  }
  attackRandomSquare() {
    const game = (0,_controller_gameController__WEBPACK_IMPORTED_MODULE_1__.Game)();
    // gameboard.buildBoard();

    if (this.attacks.length >= 100) return;
    const randRow = Math.floor(Math.random() * game.gridSize);
    const randColumn = Math.floor(Math.random() * game.gridSize);
    if (!this.hasBeenAttacked(randRow, randColumn)) gameboard.receiveAttack(randRow, randColumn); // issue here
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
/* harmony import */ var _controller_gameController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controller/gameController */ "./src/controller/gameController.js");
/* harmony import */ var _controller_displayController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controller/displayController */ "./src/controller/displayController.js");
// START //








// Set copyright year automatically
const copyrightSpan = document.querySelector('#copyright-span');
copyrightSpan.textContent = new Date().getFullYear();

// Show modal with page load
const modal = document.querySelector('.modal-name');
const mainGame = document.querySelector('.main-game');
window.addEventListener('load', () => {
  mainGame.classList.add('hide');
  modal.showModal();
  modal.classList.add('show');
});

// Start game when player name has been entered
const startBtn = document.querySelector('#start-btn');
const alias = document.querySelector('#player-name');
startBtn.addEventListener('click', () => {
  modal.close();
  modal.classList.remove('show');
  mainGame.classList.remove('hide');
  (0,_controller_displayController__WEBPACK_IMPORTED_MODULE_5__.Display)(alias.value);
});

// ... or press 'enter'
alias.addEventListener('keypress', e => {
  if (e.keyCode === 13) startBtn.click();
});

// Show confirmation modal when wanting a new game
const newGame = document.querySelector('#new-game-btn');
const modalConfirm = document.querySelector('.modal-confirm');
newGame.addEventListener('click', () => {
  const modalConfirm = document.querySelector('.modal-confirm');
  modalConfirm.showModal();
  modalConfirm.classList.add('show');
});

// When regretting to start a new game
const confirmNo = document.querySelector('#no-btn');
confirmNo.addEventListener('click', () => {
  modalConfirm.close();
  modalConfirm.classList.remove('show');
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQzs7QUFFRjtBQUNBb0QsS0FBSyxDQUFDSCxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUdNLENBQUMsSUFBSztFQUN4QyxJQUFJQSxDQUFDLENBQUNDLE9BQU8sS0FBSyxFQUFFLEVBQUVMLFFBQVEsQ0FBQ00sS0FBSyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDOztBQUVGO0FBQ0EsTUFBTUMsT0FBTyxHQUFHOUYsUUFBUSxDQUFDQyxhQUFhLENBQUMsZUFBZSxDQUFDO0FBQ3ZELE1BQU04RixZQUFZLEdBQUcvRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztBQUU3RDZGLE9BQU8sQ0FBQ1QsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07RUFDdEMsTUFBTVUsWUFBWSxHQUFHL0YsUUFBUSxDQUFDQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7RUFDN0Q4RixZQUFZLENBQUNULFNBQVMsQ0FBQyxDQUFDO0VBQ3hCUyxZQUFZLENBQUNuRixTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDcEMsQ0FBQyxDQUFDOztBQUVGO0FBQ0EsTUFBTW1GLFNBQVMsR0FBR2hHLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFNBQVMsQ0FBQztBQUVuRCtGLFNBQVMsQ0FBQ1gsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07RUFDeENVLFlBQVksQ0FBQ04sS0FBSyxDQUFDLENBQUM7RUFDcEJNLFlBQVksQ0FBQ25GLFNBQVMsQ0FBQzhFLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDdkMsQ0FBQyxDQUFDOztBQUVGOzs7Ozs7Ozs7OztBQzFEQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2NvbnRyb2xsZXIvZGlzcGxheUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvY29udHJvbGxlci9nYW1lQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9kYXRhL3NoaXBQcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/ZTMyMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTVEFSVCAvL1xuXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi9nYW1lQ29udHJvbGxlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBEaXNwbGF5KHBsYXllck5hbWUpIHtcbiAgY29uc3QgZ2FtZSA9IEdhbWUoKTtcbiAgY29uc3QgcGxheWVyID0gcGxheWVyTmFtZTtcbiAgY29uc3QgYWkgPSAnRW5lbXknO1xuXG4gIC8vIFNldHRpbmcgcGxheWVyIGFuZCBhaSBuYW1lcyBvbiBVSVxuICBjb25zdCBzZXRQbGF5ZXJOYW1lID0gKHBsYXllciwgYWkpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5b3VyLWJvYXJkJyk7XG4gICAgY29uc3QgYWlJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcHBvbmVudC1ib2FyZCcpO1xuICAgIHBsYXllcklkLnRleHRDb250ZW50ID0gcGxheWVyO1xuICAgIGFpSWQudGV4dENvbnRlbnQgPSBhaTtcbiAgfTtcblxuICAvLyBCdWlsZCBib2FyZCBncmlkcyBiYXNlZCBvbiAyRC1hcnJheXNcbiAgY29uc3QgYnVpbGRHcmlkcyA9ICgpID0+IHtcbiAgICAvLyBCdWlsZCBwbGF5ZXIgZ3JpZFxuICAgIGNvbnN0IHBsYXllckJvYXJkID0gZ2FtZS5wbGF5ZXIyZEFycmF5O1xuICAgIGNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQtcGxheWVyJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJCb2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICByb3cuY2xhc3NMaXN0LmFkZCgncm93Jyk7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBsYXllckJvYXJkW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmFkZCgnY29sdW1uJyk7XG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZChjb2x1bW4pO1xuICAgICAgfVxuICAgICAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQocm93KTtcbiAgICB9XG5cbiAgICAvLyBCdWlsZCBhaSBncmlkXG4gICAgY29uc3QgYWlCb2FyZCA9IGdhbWUuYWkyZEFycmF5O1xuICAgIGNvbnN0IGFpQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1ib2FyZC1vcHBvbmVudCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWlCb2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICByb3cuY2xhc3NMaXN0LmFkZCgncm93Jyk7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFpQm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgY29sdW1uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuYWRkKCdjb2x1bW4nKTtcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKGNvbHVtbik7XG4gICAgICB9XG4gICAgICBhaUJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHJvdyk7XG4gICAgfVxuICB9O1xuXG4gIHNldFBsYXllck5hbWUocGxheWVyLCBhaSk7XG4gIGJ1aWxkR3JpZHMoKTtcbn1cblxuLy8gRU5EIC8vXG4iLCIvLyBTVEFSVCAvL1xuXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuLi9mYWN0b3JpZXMvZ2FtZWJvYXJkJztcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4uL2ZhY3Rvcmllcy9wbGF5ZXInO1xuaW1wb3J0IHsgRGlzcGxheSB9IGZyb20gJy4vZGlzcGxheUNvbnRyb2xsZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gR2FtZSgpIHtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGFpQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG5cbiAgY29uc3QgYnVpbGRQbGF5ZXJCb2FyZCA9IHBsYXllckJvYXJkLmJ1aWxkQm9hcmQoKTtcbiAgY29uc3QgYnVpbGRBaUJvYXJkID0gYWlCb2FyZC5idWlsZEJvYXJkKCk7XG5cbiAgY29uc29sZS5sb2cocGxheWVyQm9hcmQsIGFpQm9hcmQpO1xuXG4gIHJldHVybiB7XG4gICAgZ3JpZFNpemU6IHBsYXllckJvYXJkLmdyaWRTaXplLFxuICAgIHBsYXllcjJkQXJyYXk6IHBsYXllckJvYXJkLmJvYXJkLFxuICAgIGFpMmRBcnJheTogYWlCb2FyZC5ib2FyZCxcbiAgfTtcbn1cblxuLy8gRU5EIC8vXG4iLCIvLyBTVEFSVCAvL1xuXG5leHBvcnQgY29uc3Qgc2hpcFByb3BlcnRpZXMgPSBbXG4gIHtcbiAgICB0eXBlOiAnQ2FycmllcicsXG4gICAgbGVuZ3RoOiA1LFxuICAgIGNvbG9yOiAncmdiKDI1MiwgNCwgNCwgLjkpJyxcbiAgfSxcbiAge1xuICAgIHR5cGU6ICdCYXR0bGVzaGlwJyxcbiAgICBsZW5ndGg6IDQsXG4gICAgY29sb3I6ICdyZ2IoNCwgMTQwLCA0LCAuOSknLFxuICB9LFxuICB7XG4gICAgdHlwZTogJ0Rlc3Ryb3llcicsXG4gICAgbGVuZ3RoOiAzLFxuICAgIGNvbG9yOiAncmdiKDQsIDQsIDI1MiwgLjkpJyxcbiAgfSxcbiAge1xuICAgIHR5cGU6ICdTdWJtYXJpbmUnLFxuICAgIGxlbmd0aDogMyxcbiAgICBjb2xvcjogJ3JnYigyNTIsIDI1MSwgMzIsIC45KScsXG4gIH0sXG4gIHtcbiAgICB0eXBlOiAnUGF0cm9sIEJvYXQnLFxuICAgIGxlbmd0aDogMixcbiAgICBjb2xvcjogJ3JnYigxMiwgNCwgMTIpJyxcbiAgfSxcbl07XG4iLCIvLyBTVEFSVCAvL1xuXG5pbXBvcnQgeyBzaGlwUHJvcGVydGllcyB9IGZyb20gJy4uL2RhdGEvc2hpcFByb3BlcnRpZXMnO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5cbmV4cG9ydCBjbGFzcyBHYW1lYm9hcmQge1xuICBib2FyZDtcbiAgbWlzc2VkU2hvdHM7XG4gIHN1bmtlblNoaXBzO1xuICBncmlkU2l6ZSA9IDEwO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmQgPSBbXTsgLy8gSW50ZXJmYWNlXG4gICAgdGhpcy5taXNzZWRTaG90cyA9IFtdOyAvLyBJbnRlcmZhY2VcbiAgICB0aGlzLnN1bmtlblNoaXBzID0gW107IC8vIEludGVyZmFjZVxuICB9XG5cbiAgLy8gR2VuZXJhdGUgdGhlIGdhbWUgYm9hcmQgYXMgYSAyRC1hcnJheVxuICBidWlsZEJvYXJkKCkge1xuICAgIGxldCB2YWx1ZSA9IDE7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JpZFNpemU7IGkrKykge1xuICAgICAgdGhpcy5ib2FyZFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmdyaWRTaXplOyBqKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZFtpXVtqXSA9IHZhbHVlKys7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2FsY3VsYXRlIHRvdGFsIGZsZWV0IHNpemUgY291bnRlZCBhcyB0b3RhbCBudW1iZXIgb2Ygc3F1YXJlcyBvY2N1cGllZFxuICAvLyBieSB0aGUgc2hpcHMgb24gdGhlIGdhbWUtcmVhZHkgYm9hcmRcbiAgZmxlZXQoKSB7XG4gICAgbGV0IGZsZWV0U2l6ZSA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwUHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgZmxlZXRTaXplICs9IHNoaXBQcm9wZXJ0aWVzW2ldLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGZsZWV0U2l6ZTtcbiAgfVxuXG4gIC8vIENyZWF0ZSBzaGlwcyBieSBjYWxsaW5nIFNoaXAgY2xhc3NcbiAgY3JlYXRlU2hpcHMoKSB7XG4gICAgY29uc3QgcHJvcHMgPSBzaGlwUHJvcGVydGllcztcbiAgICBsZXQgc2hpcHNBcnJheSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaXNWZXJ0aWNhbCA9IFt0cnVlLCBmYWxzZV1bTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKV07XG4gICAgICBjb25zdCB2ZXNzZWwgPSBuZXcgU2hpcChwcm9wc1tpXS50eXBlLCBwcm9wc1tpXS5sZW5ndGgsIGlzVmVydGljYWwpO1xuICAgICAgc2hpcHNBcnJheS5wdXNoKHZlc3NlbCk7XG4gICAgfVxuICAgIHJldHVybiBzaGlwc0FycmF5O1xuICB9XG5cbiAgcGxhY2VTaGlwcyhzaGlwLCByb3csIGNvbHVtbiwgdmVydGljYWwpIHtcbiAgICBpZiAodmVydGljYWwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmJvYXJkW3JvdyArIGldW2NvbHVtbl0gPSBbaSwgc2hpcF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sdW1uICsgaV0gPSBbaSwgc2hpcF07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0UmFuZG9tUGxhY2VtZW50KCkge1xuICAgIC8vIEdldCByZXR1cm5lZCBhcnJheSBmcm9tICdjcmVhdGVTaGlwcygpJ1xuICAgIGNvbnN0IHNoaXBzID0gdGhpcy5jcmVhdGVTaGlwcygpO1xuXG4gICAgLy8gQ2hlY2sgdG8gc2VlIHRoYXQgYm9hcmQgaXMgZW1wdHkgKGkuZS4gcmVhZHkgZm9yIGEgbmV3IGdhbWUpXG4gICAgaWYgKCF0aGlzLmlzQm9hcmRFbXB0eSkgcmV0dXJuO1xuXG4gICAgLy8gRm9yIGV2ZXJ5IHNoaXAgaW4gYXJyYXlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBTZWxlY3QgcmFuZG9tIHN0YXJ0LWNvb3JkaW5hdGVcbiAgICAgIGNvbnN0IHJhbmRYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5ncmlkU2l6ZSk7XG4gICAgICBjb25zdCByYW5kWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZ3JpZFNpemUpO1xuICAgICAgLy8gUmVhZCBvcmllbnRhdGlvbiBvZiBzaGlwXG4gICAgICBjb25zdCB2ZXJ0aWNhbCA9IHNoaXBzW2ldLnZlcnRpY2FsO1xuXG4gICAgICAvLyBDaGVjayBpZiBwbGFjZW1lbnQgaXMgYWxsb3dlZCAtIG90aGVyd2lzZSByZS1zdGFydCBsb29wIGZyb20gY3VycmVudCBpbmRleCBhZ2FpblxuICAgICAgaWYgKCF0aGlzLnBsYWNlbWVudEFsbG93ZWQoc2hpcHNbaV0sIHJhbmRYLCByYW5kWSwgdmVydGljYWwpKSB7XG4gICAgICAgIGktLTtcbiAgICAgIH0gZWxzZSB0aGlzLnBsYWNlU2hpcHMoc2hpcHNbaV0sIHJhbmRYLCByYW5kWSwgdmVydGljYWwpO1xuICAgIH1cbiAgfVxuXG4gIHBsYWNlbWVudEFsbG93ZWQoc2hpcCwgcm93LCBjb2x1bW4sIHZlcnRpY2FsKSB7XG4gICAgLy8gQ2hlY2sgaWYgcGxhY2VtZW50IG9mIHNoaXAgaXMgZnVsbHkgb3IgcGFydGx5IG91dHNpZGUgZ3JpZCBwZXJpbWV0ZXJcbiAgICBpZiAoXG4gICAgICByb3cgPiB0aGlzLmdyaWRTaXplIHx8XG4gICAgICBjb2x1bW4gPiB0aGlzLmdyaWRTaXplIHx8XG4gICAgICByb3cgKyBzaGlwLmxlbmd0aCA+IHRoaXMuZ3JpZFNpemUgfHxcbiAgICAgIGNvbHVtbiArIHNoaXAubGVuZ3RoID4gdGhpcy5ncmlkU2l6ZVxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIC8vIENoZWNrIGlmIGEgZ2l2ZW4gY29vcmRpbmF0ZSBpcyBhbHJlYWR5IG9jY3VwaWVkXG4gICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW3JvdyArIGldW2NvbHVtbl0gIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbcm93XVtjb2x1bW4gKyBpXSAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSB7XG4gICAgbGV0IGlzSGl0O1xuICAgIGxldCBjb29yZGluYXRlID0gdGhpcy5ib2FyZFtyb3ddW2NvbHVtbl07XG5cbiAgICBpZiAodHlwZW9mIGNvb3JkaW5hdGUgIT09ICdudW1iZXInKSB7XG4gICAgICBjb29yZGluYXRlWzFdLmhpdChjb29yZGluYXRlWzBdKTtcbiAgICAgIGlzSGl0ID0gdHJ1ZTtcbiAgICAgIGlmIChjb29yZGluYXRlWzFdLmlzU3VuaygpKSB7XG4gICAgICAgIHRoaXMuc3Vua2VuU2hpcHMucHVzaChjb29yZGluYXRlWzFdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5taXNzZWRTaG90cy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgaXNIaXQgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzSGl0O1xuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGlmICghdGhpcy5zdW5rZW5TaGlwcy5sZW5ndGggPT09IHNoaXBQcm9wZXJ0aWVzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNCb2FyZEVtcHR5KCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ncmlkU2l6ZTsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuZ3JpZFNpemU7IGorKykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbaV1bal0gIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gVXNlIHRoaXMgdG8gdmVyaWZ5IGNvcnJlY3QgcGxhY2VtZW50IG9mIHNoaXBzXG4gIGNvdW50T2NjdXBpZWRTcXVhcmVzKCkge1xuICAgIGNvbnN0IGF2YWlsYWJsZVNxdWFyZXMgPSB0aGlzLmdyaWRTaXplICogdGhpcy5ncmlkU2l6ZTtcbiAgICBjb25zdCBmbGVldFNpemUgPSB0aGlzLmZsZWV0KCk7XG4gICAgcmV0dXJuIGF2YWlsYWJsZVNxdWFyZXMgLSAoYXZhaWxhYmxlU3F1YXJlcyAtIGZsZWV0U2l6ZSk7XG4gIH1cbn1cblxuLy8gRU5EIC8vXG4iLCIvLyBTVEFSVCAvL1xuXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi4vY29udHJvbGxlci9nYW1lQ29udHJvbGxlcic7XG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICBwbGF5ZXJPbmVOYW1lO1xuICBwbGF5ZXJUd29OYW1lO1xuICBhY3RpdmVQbGF5ZXIgPSB0aGlzLnBsYXllck9uZU5hbWU7XG4gIGF0dGFja3M7XG5cbiAgY29uc3RydWN0b3IocGxheWVyTmFtZSkge1xuICAgIHRoaXMucGxheWVyTmFtZSA9IHBsYXllck5hbWU7XG4gICAgdGhpcy5hdHRhY2tzID0gW107XG4gIH1cblxuICBhdHRhY2tTcXVhcmUocm93LCBjb2x1bW4pIHtcbiAgICBjb25zdCBnYW1lID0gR2FtZSgpO1xuICAgIC8vIGdhbWVib2FyZC5idWlsZEJvYXJkKCk7XG5cbiAgICBpZiAoIXRoaXMuaGFzQmVlbkF0dGFja2VkKHJvdywgY29sdW1uKSkge1xuICAgICAgdGhpcy5hdHRhY2tzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBhdHRhY2tSYW5kb21TcXVhcmUoKSB7XG4gICAgY29uc3QgZ2FtZSA9IEdhbWUoKTtcbiAgICAvLyBnYW1lYm9hcmQuYnVpbGRCb2FyZCgpO1xuXG4gICAgaWYgKHRoaXMuYXR0YWNrcy5sZW5ndGggPj0gMTAwKSByZXR1cm47XG4gICAgY29uc3QgcmFuZFJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdhbWUuZ3JpZFNpemUpO1xuICAgIGNvbnN0IHJhbmRDb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBnYW1lLmdyaWRTaXplKTtcblxuICAgIGlmICghdGhpcy5oYXNCZWVuQXR0YWNrZWQocmFuZFJvdywgcmFuZENvbHVtbikpXG4gICAgICBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kUm93LCByYW5kQ29sdW1uKTsgLy8gaXNzdWUgaGVyZVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGhhc0JlZW5BdHRhY2tlZChyb3csIGNvbHVtbikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hdHRhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5hdHRhY2tzW2ldWzBdID09PSByb3cgJiYgdGhpcy5hdHRhY2tzW2ldWzFdID09PSBjb2x1bW4pXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gRU5EIC8vXG4iLCIvLyBTVEFSVCAvL1xuXG5leHBvcnQgY2xhc3MgU2hpcCB7XG4gIHR5cGU7XG4gIGxlbmd0aDtcbiAgdmVydGljYWwgPSBmYWxzZTtcbiAgaGl0cztcblxuICBjb25zdHJ1Y3Rvcih0eXBlLCBsZW5ndGgsIHZlcnRpY2FsKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnZlcnRpY2FsID0gdmVydGljYWw7XG4gICAgdGhpcy5oaXRzID0gW107XG4gIH1cblxuICBoaXQocG9zaXRpb24pIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmhpdHMuaW5jbHVkZXMocG9zaXRpb24pIHx8XG4gICAgICBwb3NpdGlvbiA8IDAgfHxcbiAgICAgIHBvc2l0aW9uID4gdGhpcy5sZW5ndGggLSAxXG4gICAgKVxuICAgICAgcmV0dXJuO1xuICAgIHRoaXMuaGl0cy5wdXNoKHBvc2l0aW9uKTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRzLmxlbmd0aCA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vZmFjdG9yaWVzL3NoaXAnO1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9mYWN0b3JpZXMvZ2FtZWJvYXJkJztcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vZmFjdG9yaWVzL3BsYXllcic7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi9jb250cm9sbGVyL2dhbWVDb250cm9sbGVyJztcbmltcG9ydCB7IERpc3BsYXkgfSBmcm9tICcuL2NvbnRyb2xsZXIvZGlzcGxheUNvbnRyb2xsZXInO1xuXG4vLyBTZXQgY29weXJpZ2h0IHllYXIgYXV0b21hdGljYWxseVxuY29uc3QgY29weXJpZ2h0U3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb3B5cmlnaHQtc3BhbicpO1xuY29weXJpZ2h0U3Bhbi50ZXh0Q29udGVudCA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcblxuLy8gU2hvdyBtb2RhbCB3aXRoIHBhZ2UgbG9hZFxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtbmFtZScpO1xuY29uc3QgbWFpbkdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1nYW1lJyk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICBtYWluR2FtZS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIG1vZGFsLnNob3dNb2RhbCgpO1xuICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG59KTtcblxuLy8gU3RhcnQgZ2FtZSB3aGVuIHBsYXllciBuYW1lIGhhcyBiZWVuIGVudGVyZWRcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0LWJ0bicpO1xuY29uc3QgYWxpYXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLW5hbWUnKTtcblxuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIG1vZGFsLmNsb3NlKCk7XG4gIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgbWFpbkdhbWUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gIERpc3BsYXkoYWxpYXMudmFsdWUpO1xufSk7XG5cbi8vIC4uLiBvciBwcmVzcyAnZW50ZXInXG5hbGlhcy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gIGlmIChlLmtleUNvZGUgPT09IDEzKSBzdGFydEJ0bi5jbGljaygpO1xufSk7XG5cbi8vIFNob3cgY29uZmlybWF0aW9uIG1vZGFsIHdoZW4gd2FudGluZyBhIG5ldyBnYW1lXG5jb25zdCBuZXdHYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy1nYW1lLWJ0bicpO1xuY29uc3QgbW9kYWxDb25maXJtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWNvbmZpcm0nKTtcblxubmV3R2FtZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY29uc3QgbW9kYWxDb25maXJtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWNvbmZpcm0nKTtcbiAgbW9kYWxDb25maXJtLnNob3dNb2RhbCgpO1xuICBtb2RhbENvbmZpcm0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xufSk7XG5cbi8vIFdoZW4gcmVncmV0dGluZyB0byBzdGFydCBhIG5ldyBnYW1lXG5jb25zdCBjb25maXJtTm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm8tYnRuJyk7XG5cbmNvbmZpcm1Oby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbW9kYWxDb25maXJtLmNsb3NlKCk7XG4gIG1vZGFsQ29uZmlybS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG59KTtcblxuLy8gRU5EIC8vXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiR2FtZSIsIkRpc3BsYXkiLCJwbGF5ZXJOYW1lIiwiZ2FtZSIsInBsYXllciIsImFpIiwic2V0UGxheWVyTmFtZSIsInBsYXllcklkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWlJZCIsInRleHRDb250ZW50IiwiYnVpbGRHcmlkcyIsInBsYXllckJvYXJkIiwicGxheWVyMmRBcnJheSIsInBsYXllckJvYXJkQ29udGFpbmVyIiwiaSIsImxlbmd0aCIsInJvdyIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJqIiwiY29sdW1uIiwiYXBwZW5kQ2hpbGQiLCJhaUJvYXJkIiwiYWkyZEFycmF5IiwiYWlCb2FyZENvbnRhaW5lciIsIkdhbWVib2FyZCIsIlBsYXllciIsImJ1aWxkUGxheWVyQm9hcmQiLCJidWlsZEJvYXJkIiwiYnVpbGRBaUJvYXJkIiwiY29uc29sZSIsImxvZyIsImdyaWRTaXplIiwiYm9hcmQiLCJzaGlwUHJvcGVydGllcyIsInR5cGUiLCJjb2xvciIsIlNoaXAiLCJtaXNzZWRTaG90cyIsInN1bmtlblNoaXBzIiwiY29uc3RydWN0b3IiLCJ2YWx1ZSIsImZsZWV0IiwiZmxlZXRTaXplIiwiY3JlYXRlU2hpcHMiLCJwcm9wcyIsInNoaXBzQXJyYXkiLCJpc1ZlcnRpY2FsIiwiTWF0aCIsInJvdW5kIiwicmFuZG9tIiwidmVzc2VsIiwicHVzaCIsInBsYWNlU2hpcHMiLCJzaGlwIiwidmVydGljYWwiLCJnZXRSYW5kb21QbGFjZW1lbnQiLCJzaGlwcyIsImlzQm9hcmRFbXB0eSIsInJhbmRYIiwiZmxvb3IiLCJyYW5kWSIsInBsYWNlbWVudEFsbG93ZWQiLCJyZWNlaXZlQXR0YWNrIiwiaXNIaXQiLCJjb29yZGluYXRlIiwiaGl0IiwiaXNTdW5rIiwiYWxsU2hpcHNTdW5rIiwiY291bnRPY2N1cGllZFNxdWFyZXMiLCJhdmFpbGFibGVTcXVhcmVzIiwicGxheWVyT25lTmFtZSIsInBsYXllclR3b05hbWUiLCJhY3RpdmVQbGF5ZXIiLCJhdHRhY2tzIiwiYXR0YWNrU3F1YXJlIiwiaGFzQmVlbkF0dGFja2VkIiwiZ2FtZWJvYXJkIiwiYXR0YWNrUmFuZG9tU3F1YXJlIiwicmFuZFJvdyIsInJhbmRDb2x1bW4iLCJoaXRzIiwicG9zaXRpb24iLCJpbmNsdWRlcyIsImNvcHlyaWdodFNwYW4iLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJtb2RhbCIsIm1haW5HYW1lIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNob3dNb2RhbCIsInN0YXJ0QnRuIiwiYWxpYXMiLCJjbG9zZSIsInJlbW92ZSIsImUiLCJrZXlDb2RlIiwiY2xpY2siLCJuZXdHYW1lIiwibW9kYWxDb25maXJtIiwiY29uZmlybU5vIl0sInNvdXJjZVJvb3QiOiIifQ==