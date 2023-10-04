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
/* harmony import */ var _data_shipProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/shipProperties */ "./src/data/shipProperties.js");
// START //



function Display(playerName) {
  const player = playerName;
  const ai = 'Pirate AI';
  const game = (0,_gameController__WEBPACK_IMPORTED_MODULE_0__.Game)(player, ai);

  // Setting player and ai names on UI
  const setPlayerName = (player, ai) => {
    const playerId = document.querySelector('#your-board');
    const aiId = document.querySelector('#opponent-board');
    playerId.textContent = player;
    aiId.textContent = ai;
  };

  // Color cells occupied by ships on the player board
  const colorShipCells = (row, column, type) => {
    const selectCell = document.querySelector(`[data-index-number='${row}-${column}']`);
    for (let i = 0; i < _data_shipProperties__WEBPACK_IMPORTED_MODULE_1__.shipProperties.length; i++) {
      if (type === _data_shipProperties__WEBPACK_IMPORTED_MODULE_1__.shipProperties[i].type) {
        selectCell.style.backgroundColor = `${_data_shipProperties__WEBPACK_IMPORTED_MODULE_1__.shipProperties[i].color}`;
      }
    }
  };

  // Build board grids based on 2D-arrays
  const buildGrids = () => {
    // Build player grid
    const playerBoard = game.player2dArray;
    const playerBoardContainer = document.querySelector('.game-board-player');
    for (let i = 0; i < playerBoard.length; i++) {
      for (let j = 0; j < playerBoard[i].length; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', 'cell-player');
        cell.dataset.indexNumber = `${[i]}-${[j]}`;
        playerBoardContainer.appendChild(cell);

        // If array-index is a ship then add ship-name as class on grid-cell
        if (typeof playerBoard[i][j] !== 'number') {
          const row = i;
          const column = j;
          const shipType = playerBoard[i][j][1].type;
          colorShipCells(row, column, shipType);
        }
      }
    }

    // Build ai grid
    const aiBoard = game.ai2dArray;
    const aiBoardContainer = document.querySelector('.game-board-opponent');
    for (let i = 0; i < aiBoard.length; i++) {
      for (let j = 0; j < aiBoard[i].length; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', 'cell-opponent');
        cell.dataset.indexNumber = `${[i]}-${[j]}`;
        aiBoardContainer.appendChild(cell);
      }
    }
  };

  // Set initial name in "waiting for player"
  const setInitialNameWaiting = () => {
    const waitingForPlayer = document.querySelector('#player-id');
    const loader = document.querySelector('.loader');
    waitingForPlayer.textContent = game.getActivePlayer().name;

    // Show loader while waiting for player to make a move
    loader.classList.remove('invisible');
  };
  setPlayerName(player, ai);
  buildGrids();
  setInitialNameWaiting();
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
// START //



function Game(playerName, aiName) {
  // Initialize gameboard and place ships
  const playerBoard = new _factories_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();
  const aiBoard = new _factories_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();
  const buildPlayerBoard = playerBoard.buildBoard();
  const buildAiBoard = aiBoard.buildBoard();
  const placeShipsPlayer = playerBoard.getRandomPlacement();
  const placeShipsAi = aiBoard.getRandomPlacement();

  // Initialize players and handle player's turn
  const players = [{
    name: playerName
  }, {
    name: aiName
  }];
  const player = new _factories_player__WEBPACK_IMPORTED_MODULE_1__.Player(players[0].name);
  const ai = new _factories_player__WEBPACK_IMPORTED_MODULE_1__.Player(players[1].name);
  let activePlayer = players[0];
  const switchPlayerTurn = () => {
    if (activePlayer === players[0]) {
      activePlayer = players[1];
    }
    activePlayer = players[0];
  };
  const getActivePlayer = () => activePlayer;

  // Play a round of the game
  let winner;
  const playRound = (row, column) => {
    if (getActivePlayer() === players[0]) {
      player.attackSquare(row, column);
    }
    ai.attackRandomSquare();

    // Check for a winner
    if (playerBoard.allShipsSunk) {
      winner = players[0].name;
    } else if (aiBoard.allShipsSunk) {
      winner = players[1].name;
    }
    switchPlayerTurn();
  };
  console.log(playerBoard.board, aiBoard.board, getActivePlayer, players, player, ai);
  return {
    playerBoard,
    aiBoard,
    gridSize: playerBoard.gridSize,
    player2dArray: playerBoard.board,
    ai2dArray: aiBoard.board,
    getActivePlayer,
    playRound,
    winner
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
  color: 'rgb(252, 4, 4, .4)'
}, {
  type: 'Battleship',
  length: 4,
  color: 'rgb(4, 140, 4, .4)'
}, {
  type: 'Destroyer',
  length: 3,
  color: 'rgb(4, 4, 252, .4)'
}, {
  type: 'Submarine',
  length: 3,
  color: 'rgb(252, 251, 32, .4)'
}, {
  type: 'Patrol Boat',
  length: 2,
  color: 'rgb(12, 4, 12, .4)'
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
  attacks;
  constructor(playerName) {
    this.playerName = playerName;
    this.attacks = [];
  }
  attackSquare(row, column) {
    const aiBoard = (0,_controller_gameController__WEBPACK_IMPORTED_MODULE_1__.Game)().aiBoard;
    if (!this.hasBeenAttacked(row, column)) {
      this.attacks.push([row, column]);
      aiBoard.receiveAttack(row, column);
    } else {
      return;
    }
  }
  attackRandomSquare() {
    const playerBoard = (0,_controller_gameController__WEBPACK_IMPORTED_MODULE_1__.Game)().playerBoard;
    if (this.attacks.length >= 100) return;
    const randRow = Math.floor(Math.random() * playerBoard.gridSize);
    const randColumn = Math.floor(Math.random() * playerBoard.gridSize);
    if (!this.hasBeenAttacked(randRow, randColumn)) playerBoard.receiveAttack(randRow, randColumn);
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
/* harmony import */ var _html_index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./html/index.html */ "./src/html/index.html");
/* harmony import */ var _factories_ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/ship */ "./src/factories/ship.js");
/* harmony import */ var _factories_gameboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factories/gameboard */ "./src/factories/gameboard.js");
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./factories/player */ "./src/factories/player.js");
/* harmony import */ var _controller_gameController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controller/gameController */ "./src/controller/gameController.js");
/* harmony import */ var _controller_displayController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./controller/displayController */ "./src/controller/displayController.js");
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
  (0,_controller_displayController__WEBPACK_IMPORTED_MODULE_6__.Display)(alias.value);
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

// Show info modal on hover
const infoIcon = document.querySelector('.info-icon');
const infoModal = document.querySelector('.modal-info');
infoIcon.addEventListener('mouseover', () => {
  infoModal.classList.remove('hide');
});
infoIcon.addEventListener('mouseout', () => {
  infoModal.classList.add('hide');
});
infoIcon.addEventListener('focus', () => {
  infoModal.classList.toggle('hide');
});

// END //

/***/ }),

/***/ "./src/html/index.html":
/*!*****************************!*\
  !*** ./src/html/index.html ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/html-loader/dist/runtime/getUrl.js */ "./node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/img/github-logo.svg */ "./src/assets/img/github-logo.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/img/sailor.svg */ "./src/assets/img/sailor.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/img/info.svg */ "./src/assets/img/info.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/img/hit.svg */ "./src/assets/img/hit.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/img/miss.svg */ "./src/assets/img/miss.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/img/pirate.svg */ "./src/assets/img/pirate.svg"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var ___HTML_LOADER_REPLACEMENT_1___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_1___);
var ___HTML_LOADER_REPLACEMENT_2___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_2___);
var ___HTML_LOADER_REPLACEMENT_3___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_3___);
var ___HTML_LOADER_REPLACEMENT_4___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_4___);
var ___HTML_LOADER_REPLACEMENT_5___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_5___);
var code = "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Battleship</title>\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=Orbitron&display=swap\"\n      rel=\"stylesheet\"\n    />\n    <link\n      rel=\"stylesheet\"\n      href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"\n    />\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=Inter&family=Playfair+Display&display=swap\"\n      rel=\"stylesheet\"\n    />\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=Caveat&display=swap\"\n      rel=\"stylesheet\"\n    />\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap\"\n      rel=\"stylesheet\"\n    />\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=Monoton&display=swap\"\n      rel=\"stylesheet\"\n    />\n  </head>\n  <body>\n    <div class=\"developer\">\n      <p class=\"copyright\">&copy<span id=\"copyright-span\"> 2023</span></p>\n      <a\n        class=\"github-link\"\n        href=\"https://github.com/rasmushaislund\"\n        target=\"_blank\"\n        >Rasmus H.\n        <img\n          src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\"\n          class=\"github-logo\"\n          alt=\"github logo\"\n      /></a>\n    </div>\n    <div class=\"header\">\n      <p class=\"title\">BATTLESHIP</p>\n    </div>\n    <dialog class=\"modal-name\">\n      <label class=\"modal-label\" for=\"player-name\">Enter your game alias</label>\n      <input\n        id=\"player-name\"\n        type=\"text\"\n        name=\"player_name\"\n        maxlength=\"20\"\n        minlength=\"1\"\n        placeholder=\"Enter alias\"\n        required\n      />\n      <button class=\"btn\" id=\"start-btn\" type=\"submit\">START</button>\n    </dialog>\n    <div class=\"main-game\">\n      <div class=\"game-container\">\n        <div class=\"player-turn\">\n          <p class=\"game-text\" id=\"player-turn\">\n            Waiting for <span id=\"player-id\">\"PLAYER\"</span>\n          </p>\n          <div class=\"loader invisible\"></div>\n        </div>\n        <p class=\"game-text invisible\" id=\"player-won\">\n          <span id=\"winner-id\">\"PLAYER\"</span> wins!\n        </p>\n        <div class=\"board-container\">\n          <div class=\"board\">\n            <div class=\"board-info\">\n              <img\n                class=\"icon player-icon\"\n                src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\"\n                alt=\"player icon\"\n              />\n              <p id=\"your-board\"></p>\n              <img\n                class=\"icon info-icon\"\n                src=\"" + ___HTML_LOADER_REPLACEMENT_2___ + "\"\n                alt=\"information\"\n              />\n              <div class=\"modal-info hide\">\n                <div class=\"legend\">\n                  <div class=\"square square-5\"></div>\n                  <p class=\"legend-text\">&times5</p>\n                  <p class=\"legend-text-1\">Carrier</p>\n                </div>\n                <div class=\"legend\">\n                  <div class=\"square square-4\"></div>\n                  <p class=\"legend-text\">&times4</p>\n                  <p class=\"legend-text\">Battleship</p>\n                </div>\n                <div class=\"legend\">\n                  <div class=\"square square-3-1\"></div>\n                  <p class=\"legend-text\">&times3</p>\n                  <p class=\"legend-text\">Destroyer</p>\n                </div>\n                <div class=\"legend\">\n                  <div class=\"square square-3-2\"></div>\n                  <p class=\"legend-text\">&times3</p>\n                  <p class=\"legend-text\">Submarine</p>\n                </div>\n                <div class=\"legend\">\n                  <div class=\"square square-2\"></div>\n                  <p class=\"legend-text\">&times2</p>\n                  <p class=\"legend-text\">Patrol Boat</p>\n                </div>\n                <div class=\"legend\">\n                  <img\n                    class=\"legend-icon\"\n                    src=\"" + ___HTML_LOADER_REPLACEMENT_3___ + "\"\n                    alt=\"explosion\"\n                  />\n                  <p class=\"legend-text\">Hit</p>\n                </div>\n                <div class=\"legend\">\n                  <img\n                    class=\"legend-icon\"\n                    src=\"" + ___HTML_LOADER_REPLACEMENT_4___ + "\"\n                    alt=\"waves\"\n                  />\n                  <p class=\"legend-text\">Miss</p>\n                </div>\n              </div>\n            </div>\n            <div class=\"game-board game-board-player\"></div>\n          </div>\n          <div class=\"board\">\n            <div class=\"board-info\">\n              <img\n                class=\"icon opponent-icon\"\n                src=\"" + ___HTML_LOADER_REPLACEMENT_5___ + "\"\n                alt=\"opponent icon\"\n              />\n              <p id=\"opponent-board\"></p>\n            </div>\n            <div class=\"game-board game-board-opponent\"></div>\n          </div>\n        </div>\n        <button class=\"btn\" id=\"new-game-btn\" type=\"button\">NEW GAME</button>\n      </div>\n    </div>\n    <dialog class=\"modal-confirm\">\n      <h3>Are you sure you want to start a new game?</h3>\n      <div class=\"buttons\">\n        <button class=\"btn\" id=\"yes-btn\" type=\"button\">YES</button>\n        <button class=\"btn\" id=\"no-btn\" type=\"button\">NO</button>\n      </div>\n    </dialog>\n  </body>\n</html>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ (function(module) {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = String(url.__esModule ? url.default : url);

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }

  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }

  return url;
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/img/github-logo.svg":
/*!****************************************!*\
  !*** ./src/assets/img/github-logo.svg ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/img/github-logo.4914d57c6be0c41264d6.svg";

/***/ }),

/***/ "./src/assets/img/hit.svg":
/*!********************************!*\
  !*** ./src/assets/img/hit.svg ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/img/hit.5ed2ed320195e3023b96.svg";

/***/ }),

/***/ "./src/assets/img/info.svg":
/*!*********************************!*\
  !*** ./src/assets/img/info.svg ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/img/info.c8211ecd492e7628ee23.svg";

/***/ }),

/***/ "./src/assets/img/miss.svg":
/*!*********************************!*\
  !*** ./src/assets/img/miss.svg ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/img/miss.8c23780bc3989658d738.svg";

/***/ }),

/***/ "./src/assets/img/pirate.svg":
/*!***********************************!*\
  !*** ./src/assets/img/pirate.svg ***!
  \***********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/img/pirate.1bd763419f3b2835c5fd.svg";

/***/ }),

/***/ "./src/assets/img/sailor.svg":
/*!***********************************!*\
  !*** ./src/assets/img/sailor.svg ***!
  \***********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/img/sailor.cfde3097b9ededef65eb.svg";

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLElBQUk7OztBQUdKOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ3pCQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2NvbnRyb2xsZXIvZGlzcGxheUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvY29udHJvbGxlci9nYW1lQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9kYXRhL3NoaXBQcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9odG1sL2luZGV4Lmh0bWwiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvaHRtbC1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/ZTMyMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTVEFSVCAvL1xuXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi9nYW1lQ29udHJvbGxlcic7XG5pbXBvcnQgeyBzaGlwUHJvcGVydGllcyB9IGZyb20gJy4uL2RhdGEvc2hpcFByb3BlcnRpZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gRGlzcGxheShwbGF5ZXJOYW1lKSB7XG4gIGNvbnN0IHBsYXllciA9IHBsYXllck5hbWU7XG4gIGNvbnN0IGFpID0gJ1BpcmF0ZSBBSSc7XG4gIGNvbnN0IGdhbWUgPSBHYW1lKHBsYXllciwgYWkpO1xuXG4gIC8vIFNldHRpbmcgcGxheWVyIGFuZCBhaSBuYW1lcyBvbiBVSVxuICBjb25zdCBzZXRQbGF5ZXJOYW1lID0gKHBsYXllciwgYWkpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5b3VyLWJvYXJkJyk7XG4gICAgY29uc3QgYWlJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcHBvbmVudC1ib2FyZCcpO1xuICAgIHBsYXllcklkLnRleHRDb250ZW50ID0gcGxheWVyO1xuICAgIGFpSWQudGV4dENvbnRlbnQgPSBhaTtcbiAgfTtcblxuICAvLyBDb2xvciBjZWxscyBvY2N1cGllZCBieSBzaGlwcyBvbiB0aGUgcGxheWVyIGJvYXJkXG4gIGNvbnN0IGNvbG9yU2hpcENlbGxzID0gKHJvdywgY29sdW1uLCB0eXBlKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0Q2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgW2RhdGEtaW5kZXgtbnVtYmVyPScke3Jvd30tJHtjb2x1bW59J11gLFxuICAgICk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwUHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHR5cGUgPT09IHNoaXBQcm9wZXJ0aWVzW2ldLnR5cGUpIHtcbiAgICAgICAgc2VsZWN0Q2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgJHtzaGlwUHJvcGVydGllc1tpXS5jb2xvcn1gO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBCdWlsZCBib2FyZCBncmlkcyBiYXNlZCBvbiAyRC1hcnJheXNcbiAgY29uc3QgYnVpbGRHcmlkcyA9ICgpID0+IHtcbiAgICAvLyBCdWlsZCBwbGF5ZXIgZ3JpZFxuICAgIGNvbnN0IHBsYXllckJvYXJkID0gZ2FtZS5wbGF5ZXIyZEFycmF5O1xuICAgIGNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQtcGxheWVyJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJCb2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwbGF5ZXJCb2FyZFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcsICdjZWxsLXBsYXllcicpO1xuICAgICAgICBjZWxsLmRhdGFzZXQuaW5kZXhOdW1iZXIgPSBgJHtbaV19LSR7W2pdfWA7XG4gICAgICAgIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNlbGwpO1xuXG4gICAgICAgIC8vIElmIGFycmF5LWluZGV4IGlzIGEgc2hpcCB0aGVuIGFkZCBzaGlwLW5hbWUgYXMgY2xhc3Mgb24gZ3JpZC1jZWxsXG4gICAgICAgIGlmICh0eXBlb2YgcGxheWVyQm9hcmRbaV1bal0gIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgY29uc3Qgcm93ID0gaTtcbiAgICAgICAgICBjb25zdCBjb2x1bW4gPSBqO1xuICAgICAgICAgIGNvbnN0IHNoaXBUeXBlID0gcGxheWVyQm9hcmRbaV1bal1bMV0udHlwZTtcbiAgICAgICAgICBjb2xvclNoaXBDZWxscyhyb3csIGNvbHVtbiwgc2hpcFR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQnVpbGQgYWkgZ3JpZFxuICAgIGNvbnN0IGFpQm9hcmQgPSBnYW1lLmFpMmRBcnJheTtcbiAgICBjb25zdCBhaUJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQtb3Bwb25lbnQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFpQm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWlCb2FyZFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcsICdjZWxsLW9wcG9uZW50Jyk7XG4gICAgICAgIGNlbGwuZGF0YXNldC5pbmRleE51bWJlciA9IGAke1tpXX0tJHtbal19YDtcbiAgICAgICAgYWlCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gU2V0IGluaXRpYWwgbmFtZSBpbiBcIndhaXRpbmcgZm9yIHBsYXllclwiXG4gIGNvbnN0IHNldEluaXRpYWxOYW1lV2FpdGluZyA9ICgpID0+IHtcbiAgICBjb25zdCB3YWl0aW5nRm9yUGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1pZCcpO1xuICAgIGNvbnN0IGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkZXInKTtcbiAgICB3YWl0aW5nRm9yUGxheWVyLnRleHRDb250ZW50ID0gZ2FtZS5nZXRBY3RpdmVQbGF5ZXIoKS5uYW1lO1xuXG4gICAgLy8gU2hvdyBsb2FkZXIgd2hpbGUgd2FpdGluZyBmb3IgcGxheWVyIHRvIG1ha2UgYSBtb3ZlXG4gICAgbG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xuICB9O1xuXG4gIHNldFBsYXllck5hbWUocGxheWVyLCBhaSk7XG4gIGJ1aWxkR3JpZHMoKTtcbiAgc2V0SW5pdGlhbE5hbWVXYWl0aW5nKCk7XG59XG5cbi8vIEVORCAvL1xuIiwiLy8gU1RBUlQgLy9cblxuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi4vZmFjdG9yaWVzL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuLi9mYWN0b3JpZXMvcGxheWVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIEdhbWUocGxheWVyTmFtZSwgYWlOYW1lKSB7XG4gIC8vIEluaXRpYWxpemUgZ2FtZWJvYXJkIGFuZCBwbGFjZSBzaGlwc1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgY29uc3QgYWlCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcblxuICBjb25zdCBidWlsZFBsYXllckJvYXJkID0gcGxheWVyQm9hcmQuYnVpbGRCb2FyZCgpO1xuICBjb25zdCBidWlsZEFpQm9hcmQgPSBhaUJvYXJkLmJ1aWxkQm9hcmQoKTtcblxuICBjb25zdCBwbGFjZVNoaXBzUGxheWVyID0gcGxheWVyQm9hcmQuZ2V0UmFuZG9tUGxhY2VtZW50KCk7XG4gIGNvbnN0IHBsYWNlU2hpcHNBaSA9IGFpQm9hcmQuZ2V0UmFuZG9tUGxhY2VtZW50KCk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBwbGF5ZXJzIGFuZCBoYW5kbGUgcGxheWVyJ3MgdHVyblxuICBjb25zdCBwbGF5ZXJzID0gW1xuICAgIHtcbiAgICAgIG5hbWU6IHBsYXllck5hbWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBhaU5hbWUsXG4gICAgfSxcbiAgXTtcblxuICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKHBsYXllcnNbMF0ubmFtZSk7XG4gIGNvbnN0IGFpID0gbmV3IFBsYXllcihwbGF5ZXJzWzFdLm5hbWUpO1xuXG4gIGxldCBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXJzWzBdO1xuICBjb25zdCBzd2l0Y2hQbGF5ZXJUdXJuID0gKCkgPT4ge1xuICAgIGlmIChhY3RpdmVQbGF5ZXIgPT09IHBsYXllcnNbMF0pIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcnNbMV07XG4gICAgfVxuICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcnNbMF07XG4gIH07XG5cbiAgY29uc3QgZ2V0QWN0aXZlUGxheWVyID0gKCkgPT4gYWN0aXZlUGxheWVyO1xuXG4gIC8vIFBsYXkgYSByb3VuZCBvZiB0aGUgZ2FtZVxuICBsZXQgd2lubmVyO1xuICBjb25zdCBwbGF5Um91bmQgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICBpZiAoZ2V0QWN0aXZlUGxheWVyKCkgPT09IHBsYXllcnNbMF0pIHtcbiAgICAgIHBsYXllci5hdHRhY2tTcXVhcmUocm93LCBjb2x1bW4pO1xuICAgIH1cbiAgICBhaS5hdHRhY2tSYW5kb21TcXVhcmUoKTtcblxuICAgIC8vIENoZWNrIGZvciBhIHdpbm5lclxuICAgIGlmIChwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmspIHtcbiAgICAgIHdpbm5lciA9IHBsYXllcnNbMF0ubmFtZTtcbiAgICB9IGVsc2UgaWYgKGFpQm9hcmQuYWxsU2hpcHNTdW5rKSB7XG4gICAgICB3aW5uZXIgPSBwbGF5ZXJzWzFdLm5hbWU7XG4gICAgfVxuXG4gICAgc3dpdGNoUGxheWVyVHVybigpO1xuICB9O1xuXG4gIGNvbnNvbGUubG9nKFxuICAgIHBsYXllckJvYXJkLmJvYXJkLFxuICAgIGFpQm9hcmQuYm9hcmQsXG4gICAgZ2V0QWN0aXZlUGxheWVyLFxuICAgIHBsYXllcnMsXG4gICAgcGxheWVyLFxuICAgIGFpLFxuICApO1xuXG4gIHJldHVybiB7XG4gICAgcGxheWVyQm9hcmQsXG4gICAgYWlCb2FyZCxcbiAgICBncmlkU2l6ZTogcGxheWVyQm9hcmQuZ3JpZFNpemUsXG4gICAgcGxheWVyMmRBcnJheTogcGxheWVyQm9hcmQuYm9hcmQsXG4gICAgYWkyZEFycmF5OiBhaUJvYXJkLmJvYXJkLFxuICAgIGdldEFjdGl2ZVBsYXllcixcbiAgICBwbGF5Um91bmQsXG4gICAgd2lubmVyLFxuICB9O1xufVxuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmV4cG9ydCBjb25zdCBzaGlwUHJvcGVydGllcyA9IFtcbiAge1xuICAgIHR5cGU6ICdDYXJyaWVyJyxcbiAgICBsZW5ndGg6IDUsXG4gICAgY29sb3I6ICdyZ2IoMjUyLCA0LCA0LCAuNCknLFxuICB9LFxuICB7XG4gICAgdHlwZTogJ0JhdHRsZXNoaXAnLFxuICAgIGxlbmd0aDogNCxcbiAgICBjb2xvcjogJ3JnYig0LCAxNDAsIDQsIC40KScsXG4gIH0sXG4gIHtcbiAgICB0eXBlOiAnRGVzdHJveWVyJyxcbiAgICBsZW5ndGg6IDMsXG4gICAgY29sb3I6ICdyZ2IoNCwgNCwgMjUyLCAuNCknLFxuICB9LFxuICB7XG4gICAgdHlwZTogJ1N1Ym1hcmluZScsXG4gICAgbGVuZ3RoOiAzLFxuICAgIGNvbG9yOiAncmdiKDI1MiwgMjUxLCAzMiwgLjQpJyxcbiAgfSxcbiAge1xuICAgIHR5cGU6ICdQYXRyb2wgQm9hdCcsXG4gICAgbGVuZ3RoOiAyLFxuICAgIGNvbG9yOiAncmdiKDEyLCA0LCAxMiwgLjQpJyxcbiAgfSxcbl07XG4iLCIvLyBTVEFSVCAvL1xuXG5pbXBvcnQgeyBzaGlwUHJvcGVydGllcyB9IGZyb20gJy4uL2RhdGEvc2hpcFByb3BlcnRpZXMnO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5cbmV4cG9ydCBjbGFzcyBHYW1lYm9hcmQge1xuICBib2FyZDtcbiAgbWlzc2VkU2hvdHM7XG4gIHN1bmtlblNoaXBzO1xuICBncmlkU2l6ZSA9IDEwO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmQgPSBbXTsgLy8gSW50ZXJmYWNlXG4gICAgdGhpcy5taXNzZWRTaG90cyA9IFtdOyAvLyBJbnRlcmZhY2VcbiAgICB0aGlzLnN1bmtlblNoaXBzID0gW107IC8vIEludGVyZmFjZVxuICB9XG5cbiAgLy8gR2VuZXJhdGUgdGhlIGdhbWUgYm9hcmQgYXMgYSAyRC1hcnJheVxuICBidWlsZEJvYXJkKCkge1xuICAgIGxldCB2YWx1ZSA9IDE7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JpZFNpemU7IGkrKykge1xuICAgICAgdGhpcy5ib2FyZFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmdyaWRTaXplOyBqKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZFtpXVtqXSA9IHZhbHVlKys7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2FsY3VsYXRlIHRvdGFsIGZsZWV0IHNpemUgY291bnRlZCBhcyB0b3RhbCBudW1iZXIgb2Ygc3F1YXJlcyBvY2N1cGllZFxuICAvLyBieSB0aGUgc2hpcHMgb24gdGhlIGdhbWUtcmVhZHkgYm9hcmRcbiAgZmxlZXQoKSB7XG4gICAgbGV0IGZsZWV0U2l6ZSA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwUHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgZmxlZXRTaXplICs9IHNoaXBQcm9wZXJ0aWVzW2ldLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGZsZWV0U2l6ZTtcbiAgfVxuXG4gIC8vIENyZWF0ZSBzaGlwcyBieSBjYWxsaW5nIFNoaXAgY2xhc3NcbiAgY3JlYXRlU2hpcHMoKSB7XG4gICAgY29uc3QgcHJvcHMgPSBzaGlwUHJvcGVydGllcztcbiAgICBsZXQgc2hpcHNBcnJheSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaXNWZXJ0aWNhbCA9IFt0cnVlLCBmYWxzZV1bTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKV07XG4gICAgICBjb25zdCB2ZXNzZWwgPSBuZXcgU2hpcChwcm9wc1tpXS50eXBlLCBwcm9wc1tpXS5sZW5ndGgsIGlzVmVydGljYWwpO1xuICAgICAgc2hpcHNBcnJheS5wdXNoKHZlc3NlbCk7XG4gICAgfVxuICAgIHJldHVybiBzaGlwc0FycmF5O1xuICB9XG5cbiAgcGxhY2VTaGlwcyhzaGlwLCByb3csIGNvbHVtbiwgdmVydGljYWwpIHtcbiAgICBpZiAodmVydGljYWwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmJvYXJkW3JvdyArIGldW2NvbHVtbl0gPSBbaSwgc2hpcF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sdW1uICsgaV0gPSBbaSwgc2hpcF07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0UmFuZG9tUGxhY2VtZW50KCkge1xuICAgIC8vIEdldCByZXR1cm5lZCBhcnJheSBmcm9tICdjcmVhdGVTaGlwcygpJ1xuICAgIGNvbnN0IHNoaXBzID0gdGhpcy5jcmVhdGVTaGlwcygpO1xuXG4gICAgLy8gQ2hlY2sgdG8gc2VlIHRoYXQgYm9hcmQgaXMgZW1wdHkgKGkuZS4gcmVhZHkgZm9yIGEgbmV3IGdhbWUpXG4gICAgaWYgKCF0aGlzLmlzQm9hcmRFbXB0eSkgcmV0dXJuO1xuXG4gICAgLy8gRm9yIGV2ZXJ5IHNoaXAgaW4gYXJyYXlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBTZWxlY3QgcmFuZG9tIHN0YXJ0LWNvb3JkaW5hdGVcbiAgICAgIGNvbnN0IHJhbmRYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5ncmlkU2l6ZSk7XG4gICAgICBjb25zdCByYW5kWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZ3JpZFNpemUpO1xuICAgICAgLy8gUmVhZCBvcmllbnRhdGlvbiBvZiBzaGlwXG4gICAgICBjb25zdCB2ZXJ0aWNhbCA9IHNoaXBzW2ldLnZlcnRpY2FsO1xuXG4gICAgICAvLyBDaGVjayBpZiBwbGFjZW1lbnQgaXMgYWxsb3dlZCAtIG90aGVyd2lzZSByZS1zdGFydCBsb29wIGZyb20gY3VycmVudCBpbmRleCBhZ2FpblxuICAgICAgaWYgKCF0aGlzLnBsYWNlbWVudEFsbG93ZWQoc2hpcHNbaV0sIHJhbmRYLCByYW5kWSwgdmVydGljYWwpKSB7XG4gICAgICAgIGktLTtcbiAgICAgIH0gZWxzZSB0aGlzLnBsYWNlU2hpcHMoc2hpcHNbaV0sIHJhbmRYLCByYW5kWSwgdmVydGljYWwpO1xuICAgIH1cbiAgfVxuXG4gIHBsYWNlbWVudEFsbG93ZWQoc2hpcCwgcm93LCBjb2x1bW4sIHZlcnRpY2FsKSB7XG4gICAgLy8gQ2hlY2sgaWYgcGxhY2VtZW50IG9mIHNoaXAgaXMgZnVsbHkgb3IgcGFydGx5IG91dHNpZGUgZ3JpZCBwZXJpbWV0ZXJcbiAgICBpZiAoXG4gICAgICByb3cgPiB0aGlzLmdyaWRTaXplIHx8XG4gICAgICBjb2x1bW4gPiB0aGlzLmdyaWRTaXplIHx8XG4gICAgICByb3cgKyBzaGlwLmxlbmd0aCA+IHRoaXMuZ3JpZFNpemUgfHxcbiAgICAgIGNvbHVtbiArIHNoaXAubGVuZ3RoID4gdGhpcy5ncmlkU2l6ZVxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIC8vIENoZWNrIGlmIGEgZ2l2ZW4gY29vcmRpbmF0ZSBpcyBhbHJlYWR5IG9jY3VwaWVkXG4gICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW3JvdyArIGldW2NvbHVtbl0gIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbcm93XVtjb2x1bW4gKyBpXSAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSB7XG4gICAgbGV0IGlzSGl0O1xuICAgIGxldCBjb29yZGluYXRlID0gdGhpcy5ib2FyZFtyb3ddW2NvbHVtbl07XG5cbiAgICBpZiAodHlwZW9mIGNvb3JkaW5hdGUgIT09ICdudW1iZXInKSB7XG4gICAgICBjb29yZGluYXRlWzFdLmhpdChjb29yZGluYXRlWzBdKTtcbiAgICAgIGlzSGl0ID0gdHJ1ZTtcbiAgICAgIGlmIChjb29yZGluYXRlWzFdLmlzU3VuaygpKSB7XG4gICAgICAgIHRoaXMuc3Vua2VuU2hpcHMucHVzaChjb29yZGluYXRlWzFdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5taXNzZWRTaG90cy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgaXNIaXQgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzSGl0O1xuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGlmICghdGhpcy5zdW5rZW5TaGlwcy5sZW5ndGggPT09IHNoaXBQcm9wZXJ0aWVzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNCb2FyZEVtcHR5KCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ncmlkU2l6ZTsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuZ3JpZFNpemU7IGorKykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbaV1bal0gIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gVXNlIHRoaXMgdG8gdmVyaWZ5IGNvcnJlY3QgcGxhY2VtZW50IG9mIHNoaXBzXG4gIGNvdW50T2NjdXBpZWRTcXVhcmVzKCkge1xuICAgIGNvbnN0IGF2YWlsYWJsZVNxdWFyZXMgPSB0aGlzLmdyaWRTaXplICogdGhpcy5ncmlkU2l6ZTtcbiAgICBjb25zdCBmbGVldFNpemUgPSB0aGlzLmZsZWV0KCk7XG4gICAgcmV0dXJuIGF2YWlsYWJsZVNxdWFyZXMgLSAoYXZhaWxhYmxlU3F1YXJlcyAtIGZsZWV0U2l6ZSk7XG4gIH1cbn1cblxuLy8gRU5EIC8vXG4iLCIvLyBTVEFSVCAvL1xuXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi4vY29udHJvbGxlci9nYW1lQ29udHJvbGxlcic7XG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICBhdHRhY2tzO1xuXG4gIGNvbnN0cnVjdG9yKHBsYXllck5hbWUpIHtcbiAgICB0aGlzLnBsYXllck5hbWUgPSBwbGF5ZXJOYW1lO1xuICAgIHRoaXMuYXR0YWNrcyA9IFtdO1xuICB9XG5cbiAgYXR0YWNrU3F1YXJlKHJvdywgY29sdW1uKSB7XG4gICAgY29uc3QgYWlCb2FyZCA9IEdhbWUoKS5haUJvYXJkO1xuXG4gICAgaWYgKCF0aGlzLmhhc0JlZW5BdHRhY2tlZChyb3csIGNvbHVtbikpIHtcbiAgICAgIHRoaXMuYXR0YWNrcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgYWlCb2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGF0dGFja1JhbmRvbVNxdWFyZSgpIHtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IEdhbWUoKS5wbGF5ZXJCb2FyZDtcblxuICAgIGlmICh0aGlzLmF0dGFja3MubGVuZ3RoID49IDEwMCkgcmV0dXJuO1xuICAgIGNvbnN0IHJhbmRSb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwbGF5ZXJCb2FyZC5ncmlkU2l6ZSk7XG4gICAgY29uc3QgcmFuZENvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBsYXllckJvYXJkLmdyaWRTaXplKTtcblxuICAgIGlmICghdGhpcy5oYXNCZWVuQXR0YWNrZWQocmFuZFJvdywgcmFuZENvbHVtbikpXG4gICAgICBwbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRSb3csIHJhbmRDb2x1bW4pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGhhc0JlZW5BdHRhY2tlZChyb3csIGNvbHVtbikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hdHRhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5hdHRhY2tzW2ldWzBdID09PSByb3cgJiYgdGhpcy5hdHRhY2tzW2ldWzFdID09PSBjb2x1bW4pXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gRU5EIC8vXG4iLCIvLyBTVEFSVCAvL1xuXG5leHBvcnQgY2xhc3MgU2hpcCB7XG4gIHR5cGU7XG4gIGxlbmd0aDtcbiAgdmVydGljYWwgPSBmYWxzZTtcbiAgaGl0cztcblxuICBjb25zdHJ1Y3Rvcih0eXBlLCBsZW5ndGgsIHZlcnRpY2FsKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnZlcnRpY2FsID0gdmVydGljYWw7XG4gICAgdGhpcy5oaXRzID0gW107XG4gIH1cblxuICBoaXQocG9zaXRpb24pIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmhpdHMuaW5jbHVkZXMocG9zaXRpb24pIHx8XG4gICAgICBwb3NpdGlvbiA8IDAgfHxcbiAgICAgIHBvc2l0aW9uID4gdGhpcy5sZW5ndGggLSAxXG4gICAgKVxuICAgICAgcmV0dXJuO1xuICAgIHRoaXMuaGl0cy5wdXNoKHBvc2l0aW9uKTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRzLmxlbmd0aCA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0ICcuL2h0bWwvaW5kZXguaHRtbCc7XG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9mYWN0b3JpZXMvc2hpcCc7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2ZhY3Rvcmllcy9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9mYWN0b3JpZXMvcGxheWVyJztcbmltcG9ydCB7IEdhbWUgfSBmcm9tICcuL2NvbnRyb2xsZXIvZ2FtZUNvbnRyb2xsZXInO1xuaW1wb3J0IHsgRGlzcGxheSB9IGZyb20gJy4vY29udHJvbGxlci9kaXNwbGF5Q29udHJvbGxlcic7XG5cbi8vIFNldCBjb3B5cmlnaHQgeWVhciBhdXRvbWF0aWNhbGx5XG5jb25zdCBjb3B5cmlnaHRTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvcHlyaWdodC1zcGFuJyk7XG5jb3B5cmlnaHRTcGFuLnRleHRDb250ZW50ID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXG4vLyBTaG93IG1vZGFsIHdpdGggcGFnZSBsb2FkXG5jb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1uYW1lJyk7XG5jb25zdCBtYWluR2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLWdhbWUnKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIG1haW5HYW1lLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgbW9kYWwuc2hvd01vZGFsKCk7XG4gIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbn0pO1xuXG4vLyBTdGFydCBnYW1lIHdoZW4gcGxheWVyIG5hbWUgaGFzIGJlZW4gZW50ZXJlZFxuY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtYnRuJyk7XG5jb25zdCBhbGlhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItbmFtZScpO1xuXG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbW9kYWwuY2xvc2UoKTtcbiAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICBtYWluR2FtZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cbiAgRGlzcGxheShhbGlhcy52YWx1ZSk7XG59KTtcblxuLy8gLi4uIG9yIHByZXNzICdlbnRlcidcbmFsaWFzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHN0YXJ0QnRuLmNsaWNrKCk7XG59KTtcblxuLy8gU2hvdyBjb25maXJtYXRpb24gbW9kYWwgd2hlbiB3YW50aW5nIGEgbmV3IGdhbWVcbmNvbnN0IG5ld0dhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LWdhbWUtYnRuJyk7XG5jb25zdCBtb2RhbENvbmZpcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY29uZmlybScpO1xuXG5uZXdHYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb25zdCBtb2RhbENvbmZpcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY29uZmlybScpO1xuICBtb2RhbENvbmZpcm0uc2hvd01vZGFsKCk7XG4gIG1vZGFsQ29uZmlybS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG59KTtcblxuLy8gV2hlbiByZWdyZXR0aW5nIHRvIHN0YXJ0IGEgbmV3IGdhbWVcbmNvbnN0IGNvbmZpcm1ObyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuby1idG4nKTtcblxuY29uZmlybU5vLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBtb2RhbENvbmZpcm0uY2xvc2UoKTtcbiAgbW9kYWxDb25maXJtLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbn0pO1xuXG4vLyBTaG93IGluZm8gbW9kYWwgb24gaG92ZXJcbmNvbnN0IGluZm9JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8taWNvbicpO1xuY29uc3QgaW5mb01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWluZm8nKTtcblxuaW5mb0ljb24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICBpbmZvTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xufSk7XG5cbmluZm9JY29uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICBpbmZvTW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xufSk7XG5cbmluZm9JY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4ge1xuICBpbmZvTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xufSk7XG5cbi8vIEVORCAvL1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9odG1sLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltZy9naXRodWItbG9nby5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1nL3NhaWxvci5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1nL2luZm8uc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltZy9oaXQuc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzRfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltZy9taXNzLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0hUTUxfTE9BREVSX0lNUE9SVF81X19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWcvcGlyYXRlLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xuLy8gTW9kdWxlXG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzBfX18pO1xudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzFfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF8xX19fKTtcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8yX19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfMl9fXyk7XG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzNfX18pO1xudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzRfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF80X19fKTtcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF81X19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfNV9fXyk7XG52YXIgY29kZSA9IFwiPCFkb2N0eXBlIGh0bWw+XFxuPGh0bWwgbGFuZz1cXFwiZW5cXFwiPlxcbiAgPGhlYWQ+XFxuICAgIDxtZXRhIGNoYXJzZXQ9XFxcIlVURi04XFxcIiAvPlxcbiAgICA8bWV0YSBuYW1lPVxcXCJ2aWV3cG9ydFxcXCIgY29udGVudD1cXFwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFxcXCIgLz5cXG4gICAgPHRpdGxlPkJhdHRsZXNoaXA8L3RpdGxlPlxcbiAgICA8bGlua1xcbiAgICAgIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9T3JiaXRyb24mZGlzcGxheT1zd2FwXFxcIlxcbiAgICAgIHJlbD1cXFwic3R5bGVzaGVldFxcXCJcXG4gICAgLz5cXG4gICAgPGxpbmtcXG4gICAgICByZWw9XFxcInN0eWxlc2hlZXRcXFwiXFxuICAgICAgaHJlZj1cXFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzQuNy4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzc1xcXCJcXG4gICAgLz5cXG4gICAgPGxpbmtcXG4gICAgICBocmVmPVxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUludGVyJmZhbWlseT1QbGF5ZmFpcitEaXNwbGF5JmRpc3BsYXk9c3dhcFxcXCJcXG4gICAgICByZWw9XFxcInN0eWxlc2hlZXRcXFwiXFxuICAgIC8+XFxuICAgIDxsaW5rXFxuICAgICAgaHJlZj1cXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1DYXZlYXQmZGlzcGxheT1zd2FwXFxcIlxcbiAgICAgIHJlbD1cXFwic3R5bGVzaGVldFxcXCJcXG4gICAgLz5cXG4gICAgPGxpbmtcXG4gICAgICBocmVmPVxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUx1Y2tpZXN0K0d1eSZkaXNwbGF5PXN3YXBcXFwiXFxuICAgICAgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIlxcbiAgICAvPlxcbiAgICA8bGlua1xcbiAgICAgIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TW9ub3RvbiZkaXNwbGF5PXN3YXBcXFwiXFxuICAgICAgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIlxcbiAgICAvPlxcbiAgPC9oZWFkPlxcbiAgPGJvZHk+XFxuICAgIDxkaXYgY2xhc3M9XFxcImRldmVsb3BlclxcXCI+XFxuICAgICAgPHAgY2xhc3M9XFxcImNvcHlyaWdodFxcXCI+JmNvcHk8c3BhbiBpZD1cXFwiY29weXJpZ2h0LXNwYW5cXFwiPiAyMDIzPC9zcGFuPjwvcD5cXG4gICAgICA8YVxcbiAgICAgICAgY2xhc3M9XFxcImdpdGh1Yi1saW5rXFxcIlxcbiAgICAgICAgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL3Jhc211c2hhaXNsdW5kXFxcIlxcbiAgICAgICAgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiXFxuICAgICAgICA+UmFzbXVzIEguXFxuICAgICAgICA8aW1nXFxuICAgICAgICAgIHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8wX19fICsgXCJcXFwiXFxuICAgICAgICAgIGNsYXNzPVxcXCJnaXRodWItbG9nb1xcXCJcXG4gICAgICAgICAgYWx0PVxcXCJnaXRodWIgbG9nb1xcXCJcXG4gICAgICAvPjwvYT5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImhlYWRlclxcXCI+XFxuICAgICAgPHAgY2xhc3M9XFxcInRpdGxlXFxcIj5CQVRUTEVTSElQPC9wPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpYWxvZyBjbGFzcz1cXFwibW9kYWwtbmFtZVxcXCI+XFxuICAgICAgPGxhYmVsIGNsYXNzPVxcXCJtb2RhbC1sYWJlbFxcXCIgZm9yPVxcXCJwbGF5ZXItbmFtZVxcXCI+RW50ZXIgeW91ciBnYW1lIGFsaWFzPC9sYWJlbD5cXG4gICAgICA8aW5wdXRcXG4gICAgICAgIGlkPVxcXCJwbGF5ZXItbmFtZVxcXCJcXG4gICAgICAgIHR5cGU9XFxcInRleHRcXFwiXFxuICAgICAgICBuYW1lPVxcXCJwbGF5ZXJfbmFtZVxcXCJcXG4gICAgICAgIG1heGxlbmd0aD1cXFwiMjBcXFwiXFxuICAgICAgICBtaW5sZW5ndGg9XFxcIjFcXFwiXFxuICAgICAgICBwbGFjZWhvbGRlcj1cXFwiRW50ZXIgYWxpYXNcXFwiXFxuICAgICAgICByZXF1aXJlZFxcbiAgICAgIC8+XFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuXFxcIiBpZD1cXFwic3RhcnQtYnRuXFxcIiB0eXBlPVxcXCJzdWJtaXRcXFwiPlNUQVJUPC9idXR0b24+XFxuICAgIDwvZGlhbG9nPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtYWluLWdhbWVcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImdhbWUtY29udGFpbmVyXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInBsYXllci10dXJuXFxcIj5cXG4gICAgICAgICAgPHAgY2xhc3M9XFxcImdhbWUtdGV4dFxcXCIgaWQ9XFxcInBsYXllci10dXJuXFxcIj5cXG4gICAgICAgICAgICBXYWl0aW5nIGZvciA8c3BhbiBpZD1cXFwicGxheWVyLWlkXFxcIj5cXFwiUExBWUVSXFxcIjwvc3Bhbj5cXG4gICAgICAgICAgPC9wPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsb2FkZXIgaW52aXNpYmxlXFxcIj48L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPHAgY2xhc3M9XFxcImdhbWUtdGV4dCBpbnZpc2libGVcXFwiIGlkPVxcXCJwbGF5ZXItd29uXFxcIj5cXG4gICAgICAgICAgPHNwYW4gaWQ9XFxcIndpbm5lci1pZFxcXCI+XFxcIlBMQVlFUlxcXCI8L3NwYW4+IHdpbnMhXFxuICAgICAgICA8L3A+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJib2FyZC1jb250YWluZXJcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJib2FyZFxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYm9hcmQtaW5mb1xcXCI+XFxuICAgICAgICAgICAgICA8aW1nXFxuICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJpY29uIHBsYXllci1pY29uXFxcIlxcbiAgICAgICAgICAgICAgICBzcmM9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMV9fXyArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICBhbHQ9XFxcInBsYXllciBpY29uXFxcIlxcbiAgICAgICAgICAgICAgLz5cXG4gICAgICAgICAgICAgIDxwIGlkPVxcXCJ5b3VyLWJvYXJkXFxcIj48L3A+XFxuICAgICAgICAgICAgICA8aW1nXFxuICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJpY29uIGluZm8taWNvblxcXCJcXG4gICAgICAgICAgICAgICAgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzJfX18gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgYWx0PVxcXCJpbmZvcm1hdGlvblxcXCJcXG4gICAgICAgICAgICAgIC8+XFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1pbmZvIGhpZGVcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNxdWFyZSBzcXVhcmUtNVxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj4mdGltZXM1PC9wPlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dC0xXFxcIj5DYXJyaWVyPC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibGVnZW5kXFxcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzcXVhcmUgc3F1YXJlLTRcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+JnRpbWVzNDwvcD5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPkJhdHRsZXNoaXA8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNxdWFyZSBzcXVhcmUtMy0xXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPiZ0aW1lczM8L3A+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj5EZXN0cm95ZXI8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNxdWFyZSBzcXVhcmUtMy0yXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPiZ0aW1lczM8L3A+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj5TdWJtYXJpbmU8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNxdWFyZSBzcXVhcmUtMlxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj4mdGltZXMyPC9wPlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+UGF0cm9sIEJvYXQ8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxpbWdcXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJsZWdlbmQtaWNvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8zX19fICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgICAgICBhbHQ9XFxcImV4cGxvc2lvblxcXCJcXG4gICAgICAgICAgICAgICAgICAvPlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+SGl0PC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibGVnZW5kXFxcIj5cXG4gICAgICAgICAgICAgICAgICA8aW1nXFxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwibGVnZW5kLWljb25cXFwiXFxuICAgICAgICAgICAgICAgICAgICBzcmM9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfNF9fXyArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgYWx0PVxcXCJ3YXZlc1xcXCJcXG4gICAgICAgICAgICAgICAgICAvPlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+TWlzczwvcD5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJnYW1lLWJvYXJkIGdhbWUtYm9hcmQtcGxheWVyXFxcIj48L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImJvYXJkXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJib2FyZC1pbmZvXFxcIj5cXG4gICAgICAgICAgICAgIDxpbWdcXG4gICAgICAgICAgICAgICAgY2xhc3M9XFxcImljb24gb3Bwb25lbnQtaWNvblxcXCJcXG4gICAgICAgICAgICAgICAgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzVfX18gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgYWx0PVxcXCJvcHBvbmVudCBpY29uXFxcIlxcbiAgICAgICAgICAgICAgLz5cXG4gICAgICAgICAgICAgIDxwIGlkPVxcXCJvcHBvbmVudC1ib2FyZFxcXCI+PC9wPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdhbWUtYm9hcmQgZ2FtZS1ib2FyZC1vcHBvbmVudFxcXCI+PC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG5cXFwiIGlkPVxcXCJuZXctZ2FtZS1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+TkVXIEdBTUU8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaWFsb2cgY2xhc3M9XFxcIm1vZGFsLWNvbmZpcm1cXFwiPlxcbiAgICAgIDxoMz5BcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gc3RhcnQgYSBuZXcgZ2FtZT88L2gzPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ1dHRvbnNcXFwiPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuXFxcIiBpZD1cXFwieWVzLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIj5ZRVM8L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XFxcImJ0blxcXCIgaWQ9XFxcIm5vLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIj5OTzwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2RpYWxvZz5cXG4gIDwvYm9keT5cXG48L2h0bWw+XFxuXCI7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBjb2RlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZSwgbm8tcGFyYW0tcmVhc3NpZ25cblxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLm1heWJlTmVlZFF1b3RlcyAmJiAvW1xcdFxcblxcZlxcciBcIic9PD5gXS8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwsIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJHYW1lIiwic2hpcFByb3BlcnRpZXMiLCJEaXNwbGF5IiwicGxheWVyTmFtZSIsInBsYXllciIsImFpIiwiZ2FtZSIsInNldFBsYXllck5hbWUiLCJwbGF5ZXJJZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFpSWQiLCJ0ZXh0Q29udGVudCIsImNvbG9yU2hpcENlbGxzIiwicm93IiwiY29sdW1uIiwidHlwZSIsInNlbGVjdENlbGwiLCJpIiwibGVuZ3RoIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsImJ1aWxkR3JpZHMiLCJwbGF5ZXJCb2FyZCIsInBsYXllcjJkQXJyYXkiLCJwbGF5ZXJCb2FyZENvbnRhaW5lciIsImoiLCJjZWxsIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImRhdGFzZXQiLCJpbmRleE51bWJlciIsImFwcGVuZENoaWxkIiwic2hpcFR5cGUiLCJhaUJvYXJkIiwiYWkyZEFycmF5IiwiYWlCb2FyZENvbnRhaW5lciIsInNldEluaXRpYWxOYW1lV2FpdGluZyIsIndhaXRpbmdGb3JQbGF5ZXIiLCJsb2FkZXIiLCJnZXRBY3RpdmVQbGF5ZXIiLCJuYW1lIiwicmVtb3ZlIiwiR2FtZWJvYXJkIiwiUGxheWVyIiwiYWlOYW1lIiwiYnVpbGRQbGF5ZXJCb2FyZCIsImJ1aWxkQm9hcmQiLCJidWlsZEFpQm9hcmQiLCJwbGFjZVNoaXBzUGxheWVyIiwiZ2V0UmFuZG9tUGxhY2VtZW50IiwicGxhY2VTaGlwc0FpIiwicGxheWVycyIsImFjdGl2ZVBsYXllciIsInN3aXRjaFBsYXllclR1cm4iLCJ3aW5uZXIiLCJwbGF5Um91bmQiLCJhdHRhY2tTcXVhcmUiLCJhdHRhY2tSYW5kb21TcXVhcmUiLCJhbGxTaGlwc1N1bmsiLCJjb25zb2xlIiwibG9nIiwiYm9hcmQiLCJncmlkU2l6ZSIsIlNoaXAiLCJtaXNzZWRTaG90cyIsInN1bmtlblNoaXBzIiwiY29uc3RydWN0b3IiLCJ2YWx1ZSIsImZsZWV0IiwiZmxlZXRTaXplIiwiY3JlYXRlU2hpcHMiLCJwcm9wcyIsInNoaXBzQXJyYXkiLCJpc1ZlcnRpY2FsIiwiTWF0aCIsInJvdW5kIiwicmFuZG9tIiwidmVzc2VsIiwicHVzaCIsInBsYWNlU2hpcHMiLCJzaGlwIiwidmVydGljYWwiLCJzaGlwcyIsImlzQm9hcmRFbXB0eSIsInJhbmRYIiwiZmxvb3IiLCJyYW5kWSIsInBsYWNlbWVudEFsbG93ZWQiLCJyZWNlaXZlQXR0YWNrIiwiaXNIaXQiLCJjb29yZGluYXRlIiwiaGl0IiwiaXNTdW5rIiwiY291bnRPY2N1cGllZFNxdWFyZXMiLCJhdmFpbGFibGVTcXVhcmVzIiwiYXR0YWNrcyIsImhhc0JlZW5BdHRhY2tlZCIsInJhbmRSb3ciLCJyYW5kQ29sdW1uIiwiaGl0cyIsInBvc2l0aW9uIiwiaW5jbHVkZXMiLCJjb3B5cmlnaHRTcGFuIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwibW9kYWwiLCJtYWluR2FtZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzaG93TW9kYWwiLCJzdGFydEJ0biIsImFsaWFzIiwiY2xvc2UiLCJlIiwia2V5Q29kZSIsImNsaWNrIiwibmV3R2FtZSIsIm1vZGFsQ29uZmlybSIsImNvbmZpcm1ObyIsImluZm9JY29uIiwiaW5mb01vZGFsIiwidG9nZ2xlIl0sInNvdXJjZVJvb3QiOiIifQ==