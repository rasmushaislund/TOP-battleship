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

  // Set name in "waiting for player"
  const setNameWaiting = () => {
    const waitingForPlayer = document.querySelector('#player-id');
    const loader = document.querySelector('.loader');
    waitingForPlayer.textContent = game.getActivePlayer().name;

    // Show loader while waiting for player to make a move
    loader.classList.remove('invisible');
  };

  // Check which player turn it is

  setPlayerName(player, ai);
  buildGrids();
  setNameWaiting();

  // Event listener for player attack on enemy
  const opponentBoard = document.querySelector('.game-board-opponent');
  opponentBoard.addEventListener('mouseup', e => {
    e.preventDefault();
    const target = e.target;

    // Convert cell indexNumber to coordinates
    const indexNumber = target.dataset.indexNumber;
    const indexToArray = indexNumber.split('-');
    const row = Number(indexToArray[0]);
    const column = Number(indexToArray[1]);

    // Initiate attack from player
    game.playRound(row, column);

    // Show a winner
    if (game.winner) {
      const winner = document.querySelector('#player-won');
      const winnerId = document.querySelector('#winner-id');
      const playerTurn = document.querySelector('.player-turn');
      winnerId.textContent = game.winner;
      winner.classList.remove('invisible');
      playerTurn.classList.add('invisible');

      // Disable board for further input
      const gameBoards = document.querySelectorAll('.game-board');
      const cells = document.querySelectorAll('.cell');
      gameBoards.forEach(board => {
        board.classList.add('disabled-board');
      });
      cells.forEach(cell => {
        cell.classList.add('disabled-cell');
      });
    }
  });
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
    } else {
      activePlayer = players[0];
    }
  };
  const getActivePlayer = () => activePlayer;

  // Play a round of the game
  let winner = players[0].name;
  const playRound = (row, column) => {
    // Check for a winner
    const checkWinner = () => {
      if (playerBoard.allShipsSunk) {
        winner = players[1].name;
      } else if (aiBoard.allShipsSunk) {
        winner = players[0].name;
      }
    };
    if (getActivePlayer() === players[0]) {
      player.attackSquare(row, column, aiBoard);
      checkWinner();
    }
    switchPlayerTurn();

    // Let AI attack player board with "thinking" delay
    if (getActivePlayer() === players[1]) {
      const delayAttack = Math.floor(Math.random() * 5000);
      console.log(delayAttack);
      const aiAttack = ai.attackRandomSquare(playerBoard);
      setTimeout(aiAttack, delayAttack);
      checkWinner();
    }
    switchPlayerTurn();
    console.log(playerBoard, aiBoard, player, ai);
  };
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
  attackSquare(row, column, enemyBoard) {
    if (!this.hasBeenAttacked(row, column)) {
      this.attacks.push([row, column]);
      enemyBoard.receiveAttack(row, column);
    } else {
      return;
    }
  }
  attackRandomSquare(playerBoard) {
    if (this.attacks.length >= 100) return;
    const randRow = Math.floor(Math.random() * playerBoard.gridSize);
    const randColumn = Math.floor(Math.random() * playerBoard.gridSize);
    if (!this.hasBeenAttacked(randRow, randColumn)) {
      this.attacks.push([randRow, randColumn]);
      playerBoard.receiveAttack(randRow, randColumn);
    } else {
      return;
    }
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
var code = "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Battleship</title>\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=Orbitron&display=swap\"\n      rel=\"stylesheet\"\n    />\n    <link\n      rel=\"stylesheet\"\n      href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"\n    />\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=Inter&family=Playfair+Display&display=swap\"\n      rel=\"stylesheet\"\n    />\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=Caveat&display=swap\"\n      rel=\"stylesheet\"\n    />\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap\"\n      rel=\"stylesheet\"\n    />\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=Monoton&display=swap\"\n      rel=\"stylesheet\"\n    />\n  </head>\n  <body>\n    <div class=\"developer\">\n      <p class=\"copyright\">&copy<span id=\"copyright-span\"> 2023</span></p>\n      <a\n        class=\"github-link\"\n        href=\"https://github.com/rasmushaislund\"\n        target=\"_blank\"\n        >Rasmus H.\n        <img\n          src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\"\n          class=\"github-logo\"\n          alt=\"github logo\"\n      /></a>\n    </div>\n    <div class=\"header\">\n      <p class=\"title\">BATTLESHIP</p>\n    </div>\n    <dialog class=\"modal-name\">\n      <label class=\"modal-label\" for=\"player-name\">Enter your game alias</label>\n      <input\n        id=\"player-name\"\n        type=\"text\"\n        name=\"player_name\"\n        maxlength=\"20\"\n        minlength=\"1\"\n        placeholder=\"Enter alias\"\n        required\n      />\n      <button class=\"btn\" id=\"start-btn\" type=\"submit\">START</button>\n    </dialog>\n    <div class=\"main-game\">\n      <div class=\"game-container\">\n        <div class=\"player-turn\">\n          <p class=\"game-text\" id=\"player-turn\">\n            Waiting for <span id=\"player-id\"></span>\n          </p>\n          <div class=\"loader invisible\"></div>\n        </div>\n        <p class=\"game-text invisible\" id=\"player-won\">\n          <span id=\"winner-id\"></span> wins!\n        </p>\n        <div class=\"board-container\">\n          <div class=\"board\">\n            <div class=\"board-info\">\n              <img\n                class=\"icon player-icon\"\n                src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\"\n                alt=\"player icon\"\n              />\n              <p id=\"your-board\"></p>\n              <img\n                class=\"icon info-icon\"\n                src=\"" + ___HTML_LOADER_REPLACEMENT_2___ + "\"\n                alt=\"information\"\n              />\n              <div class=\"modal-info hide\">\n                <div class=\"legend\">\n                  <div class=\"square square-5\"></div>\n                  <p class=\"legend-text\">&times5</p>\n                  <p class=\"legend-text-1\">Carrier</p>\n                </div>\n                <div class=\"legend\">\n                  <div class=\"square square-4\"></div>\n                  <p class=\"legend-text\">&times4</p>\n                  <p class=\"legend-text\">Battleship</p>\n                </div>\n                <div class=\"legend\">\n                  <div class=\"square square-3-1\"></div>\n                  <p class=\"legend-text\">&times3</p>\n                  <p class=\"legend-text\">Destroyer</p>\n                </div>\n                <div class=\"legend\">\n                  <div class=\"square square-3-2\"></div>\n                  <p class=\"legend-text\">&times3</p>\n                  <p class=\"legend-text\">Submarine</p>\n                </div>\n                <div class=\"legend\">\n                  <div class=\"square square-2\"></div>\n                  <p class=\"legend-text\">&times2</p>\n                  <p class=\"legend-text\">Patrol Boat</p>\n                </div>\n                <div class=\"legend\">\n                  <img\n                    class=\"legend-icon\"\n                    src=\"" + ___HTML_LOADER_REPLACEMENT_3___ + "\"\n                    alt=\"explosion\"\n                  />\n                  <p class=\"legend-text\">Hit</p>\n                </div>\n                <div class=\"legend\">\n                  <img\n                    class=\"legend-icon\"\n                    src=\"" + ___HTML_LOADER_REPLACEMENT_4___ + "\"\n                    alt=\"waves\"\n                  />\n                  <p class=\"legend-text\">Miss</p>\n                </div>\n              </div>\n            </div>\n            <div class=\"game-board game-board-player\"></div>\n          </div>\n          <div class=\"board\">\n            <div class=\"board-info\">\n              <img\n                class=\"icon opponent-icon\"\n                src=\"" + ___HTML_LOADER_REPLACEMENT_5___ + "\"\n                alt=\"opponent icon\"\n              />\n              <p id=\"opponent-board\"></p>\n            </div>\n            <div class=\"game-board game-board-opponent\"></div>\n          </div>\n        </div>\n        <button class=\"btn\" id=\"new-game-btn\" type=\"button\">NEW GAME</button>\n      </div>\n    </div>\n    <dialog class=\"modal-confirm\">\n      <h3>Are you sure you want to start a new game?</h3>\n      <div class=\"buttons\">\n        <button class=\"btn\" id=\"yes-btn\" type=\"button\">YES</button>\n        <button class=\"btn\" id=\"no-btn\" type=\"button\">NO</button>\n      </div>\n    </dialog>\n  </body>\n</html>\n";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHbkksUUFBUSxDQUFDQyxhQUFhLENBQUMsYUFBYSxDQUFDO0FBRXZEaUksUUFBUSxDQUFDN0YsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU07RUFDM0M4RixTQUFTLENBQUM5RyxTQUFTLENBQUNjLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDcEMsQ0FBQyxDQUFDO0FBRUYrRixRQUFRLENBQUM3RixnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsTUFBTTtFQUMxQzhGLFNBQVMsQ0FBQzlHLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUNqQyxDQUFDLENBQUM7QUFFRjRHLFFBQVEsQ0FBQzdGLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0VBQ3ZDOEYsU0FBUyxDQUFDOUcsU0FBUyxDQUFDK0csTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNwQyxDQUFDLENBQUM7O0FBRUY7Ozs7Ozs7Ozs7Ozs7QUMzRUE7QUFDNkc7QUFDN0cseUNBQXlDLHNJQUFnRDtBQUN6Rix5Q0FBeUMsNEhBQTJDO0FBQ3BGLHlDQUF5Qyx3SEFBeUM7QUFDbEYseUNBQXlDLHNIQUF3QztBQUNqRix5Q0FBeUMsd0hBQXlDO0FBQ2xGLHlDQUF5Qyw0SEFBMkM7QUFDcEY7QUFDQSxzQ0FBc0MsdUZBQXdDO0FBQzlFLHNDQUFzQyx1RkFBd0M7QUFDOUUsc0NBQXNDLHVGQUF3QztBQUM5RSxzQ0FBc0MsdUZBQXdDO0FBQzlFLHNDQUFzQyx1RkFBd0M7QUFDOUUsc0NBQXNDLHVGQUF3QztBQUM5RTtBQUNBO0FBQ0EsK0RBQWUsSUFBSTs7Ozs7Ozs7OztBQ2pCTjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJOzs7QUFHSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUN6QkEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9jb250cm9sbGVyL2Rpc3BsYXlDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2NvbnRyb2xsZXIvZ2FtZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZGF0YS9zaGlwUHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvaHRtbC9pbmRleC5odG1sIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2h0bWwtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzP2UzMjAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gU1RBUlQgLy9cblxuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4vZ2FtZUNvbnRyb2xsZXInO1xuaW1wb3J0IHsgc2hpcFByb3BlcnRpZXMgfSBmcm9tICcuLi9kYXRhL3NoaXBQcm9wZXJ0aWVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIERpc3BsYXkocGxheWVyTmFtZSkge1xuICBjb25zdCBwbGF5ZXIgPSBwbGF5ZXJOYW1lO1xuICBjb25zdCBhaSA9ICdQaXJhdGUgQUknO1xuICBjb25zdCBnYW1lID0gR2FtZShwbGF5ZXIsIGFpKTtcblxuICAvLyBTZXR0aW5nIHBsYXllciBhbmQgYWkgbmFtZXMgb24gVUlcbiAgY29uc3Qgc2V0UGxheWVyTmFtZSA9IChwbGF5ZXIsIGFpKSA9PiB7XG4gICAgY29uc3QgcGxheWVySWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeW91ci1ib2FyZCcpO1xuICAgIGNvbnN0IGFpSWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3Bwb25lbnQtYm9hcmQnKTtcbiAgICBwbGF5ZXJJZC50ZXh0Q29udGVudCA9IHBsYXllcjtcbiAgICBhaUlkLnRleHRDb250ZW50ID0gYWk7XG4gIH07XG5cbiAgLy8gQ29sb3IgY2VsbHMgb2NjdXBpZWQgYnkgc2hpcHMgb24gdGhlIHBsYXllciBib2FyZFxuICBjb25zdCBjb2xvclNoaXBDZWxscyA9IChyb3csIGNvbHVtbiwgdHlwZSkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFtkYXRhLWluZGV4LW51bWJlcj0nJHtyb3d9LSR7Y29sdW1ufSddYCxcbiAgICApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0eXBlID09PSBzaGlwUHJvcGVydGllc1tpXS50eXBlKSB7XG4gICAgICAgIHNlbGVjdENlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYCR7c2hpcFByb3BlcnRpZXNbaV0uY29sb3J9YDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gQnVpbGQgYm9hcmQgZ3JpZHMgYmFzZWQgb24gMkQtYXJyYXlzXG4gIGNvbnN0IGJ1aWxkR3JpZHMgPSAoKSA9PiB7XG4gICAgLy8gQnVpbGQgcGxheWVyIGdyaWRcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGdhbWUucGxheWVyMmRBcnJheTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWJvYXJkLXBsYXllcicpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyQm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGxheWVyQm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnLCAnY2VsbC1wbGF5ZXInKTtcbiAgICAgICAgY2VsbC5kYXRhc2V0LmluZGV4TnVtYmVyID0gYCR7W2ldfS0ke1tqXX1gO1xuICAgICAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjZWxsKTtcblxuICAgICAgICAvLyBJZiBhcnJheS1pbmRleCBpcyBhIHNoaXAgdGhlbiBhZGQgc2hpcC1uYW1lIGFzIGNsYXNzIG9uIGdyaWQtY2VsbFxuICAgICAgICBpZiAodHlwZW9mIHBsYXllckJvYXJkW2ldW2pdICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgIGNvbnN0IHJvdyA9IGk7XG4gICAgICAgICAgY29uc3QgY29sdW1uID0gajtcbiAgICAgICAgICBjb25zdCBzaGlwVHlwZSA9IHBsYXllckJvYXJkW2ldW2pdWzFdLnR5cGU7XG4gICAgICAgICAgY29sb3JTaGlwQ2VsbHMocm93LCBjb2x1bW4sIHNoaXBUeXBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEJ1aWxkIGFpIGdyaWRcbiAgICBjb25zdCBhaUJvYXJkID0gZ2FtZS5haTJkQXJyYXk7XG4gICAgY29uc3QgYWlCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWJvYXJkLW9wcG9uZW50Jyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhaUJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFpQm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnLCAnY2VsbC1vcHBvbmVudCcpO1xuICAgICAgICBjZWxsLmRhdGFzZXQuaW5kZXhOdW1iZXIgPSBgJHtbaV19LSR7W2pdfWA7XG4gICAgICAgIGFpQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIFNldCBuYW1lIGluIFwid2FpdGluZyBmb3IgcGxheWVyXCJcbiAgY29uc3Qgc2V0TmFtZVdhaXRpbmcgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2FpdGluZ0ZvclBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItaWQnKTtcbiAgICBjb25zdCBsb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGVyJyk7XG4gICAgd2FpdGluZ0ZvclBsYXllci50ZXh0Q29udGVudCA9IGdhbWUuZ2V0QWN0aXZlUGxheWVyKCkubmFtZTtcblxuICAgIC8vIFNob3cgbG9hZGVyIHdoaWxlIHdhaXRpbmcgZm9yIHBsYXllciB0byBtYWtlIGEgbW92ZVxuICAgIGxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcbiAgfTtcblxuICAvLyBDaGVjayB3aGljaCBwbGF5ZXIgdHVybiBpdCBpc1xuXG4gIHNldFBsYXllck5hbWUocGxheWVyLCBhaSk7XG4gIGJ1aWxkR3JpZHMoKTtcbiAgc2V0TmFtZVdhaXRpbmcoKTtcblxuICAvLyBFdmVudCBsaXN0ZW5lciBmb3IgcGxheWVyIGF0dGFjayBvbiBlbmVteVxuICBjb25zdCBvcHBvbmVudEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQtb3Bwb25lbnQnKTtcblxuICBvcHBvbmVudEJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcblxuICAgIC8vIENvbnZlcnQgY2VsbCBpbmRleE51bWJlciB0byBjb29yZGluYXRlc1xuICAgIGNvbnN0IGluZGV4TnVtYmVyID0gdGFyZ2V0LmRhdGFzZXQuaW5kZXhOdW1iZXI7XG4gICAgY29uc3QgaW5kZXhUb0FycmF5ID0gaW5kZXhOdW1iZXIuc3BsaXQoJy0nKTtcbiAgICBjb25zdCByb3cgPSBOdW1iZXIoaW5kZXhUb0FycmF5WzBdKTtcbiAgICBjb25zdCBjb2x1bW4gPSBOdW1iZXIoaW5kZXhUb0FycmF5WzFdKTtcblxuICAgIC8vIEluaXRpYXRlIGF0dGFjayBmcm9tIHBsYXllclxuICAgIGdhbWUucGxheVJvdW5kKHJvdywgY29sdW1uKTtcblxuICAgIC8vIFNob3cgYSB3aW5uZXJcbiAgICBpZiAoZ2FtZS53aW5uZXIpIHtcbiAgICAgIGNvbnN0IHdpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItd29uJyk7XG4gICAgICBjb25zdCB3aW5uZXJJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3aW5uZXItaWQnKTtcbiAgICAgIGNvbnN0IHBsYXllclR1cm4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXR1cm4nKTtcblxuICAgICAgd2lubmVySWQudGV4dENvbnRlbnQgPSBnYW1lLndpbm5lcjtcbiAgICAgIHdpbm5lci5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcbiAgICAgIHBsYXllclR1cm4uY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XG5cbiAgICAgIC8vIERpc2FibGUgYm9hcmQgZm9yIGZ1cnRoZXIgaW5wdXRcbiAgICAgIGNvbnN0IGdhbWVCb2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FtZS1ib2FyZCcpO1xuICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuXG4gICAgICBnYW1lQm9hcmRzLmZvckVhY2goKGJvYXJkKSA9PiB7XG4gICAgICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkLWJvYXJkJyk7XG4gICAgICB9KTtcblxuICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkLWNlbGwnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIEVORCAvL1xuIiwiLy8gU1RBUlQgLy9cblxuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi4vZmFjdG9yaWVzL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuLi9mYWN0b3JpZXMvcGxheWVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIEdhbWUocGxheWVyTmFtZSwgYWlOYW1lKSB7XG4gIC8vIEluaXRpYWxpemUgZ2FtZWJvYXJkIGFuZCBwbGFjZSBzaGlwc1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgY29uc3QgYWlCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcblxuICBjb25zdCBidWlsZFBsYXllckJvYXJkID0gcGxheWVyQm9hcmQuYnVpbGRCb2FyZCgpO1xuICBjb25zdCBidWlsZEFpQm9hcmQgPSBhaUJvYXJkLmJ1aWxkQm9hcmQoKTtcblxuICBjb25zdCBwbGFjZVNoaXBzUGxheWVyID0gcGxheWVyQm9hcmQuZ2V0UmFuZG9tUGxhY2VtZW50KCk7XG4gIGNvbnN0IHBsYWNlU2hpcHNBaSA9IGFpQm9hcmQuZ2V0UmFuZG9tUGxhY2VtZW50KCk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBwbGF5ZXJzIGFuZCBoYW5kbGUgcGxheWVyJ3MgdHVyblxuICBjb25zdCBwbGF5ZXJzID0gW1xuICAgIHtcbiAgICAgIG5hbWU6IHBsYXllck5hbWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBhaU5hbWUsXG4gICAgfSxcbiAgXTtcblxuICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKHBsYXllcnNbMF0ubmFtZSk7XG4gIGNvbnN0IGFpID0gbmV3IFBsYXllcihwbGF5ZXJzWzFdLm5hbWUpO1xuXG4gIGxldCBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXJzWzBdO1xuICBjb25zdCBzd2l0Y2hQbGF5ZXJUdXJuID0gKCkgPT4ge1xuICAgIGlmIChhY3RpdmVQbGF5ZXIgPT09IHBsYXllcnNbMF0pIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcnNbMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcnNbMF07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEFjdGl2ZVBsYXllciA9ICgpID0+IGFjdGl2ZVBsYXllcjtcblxuICAvLyBQbGF5IGEgcm91bmQgb2YgdGhlIGdhbWVcbiAgbGV0IHdpbm5lciA9IHBsYXllcnNbMF0ubmFtZTtcbiAgY29uc3QgcGxheVJvdW5kID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgLy8gQ2hlY2sgZm9yIGEgd2lubmVyXG4gICAgY29uc3QgY2hlY2tXaW5uZXIgPSAoKSA9PiB7XG4gICAgICBpZiAocGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKSB7XG4gICAgICAgIHdpbm5lciA9IHBsYXllcnNbMV0ubmFtZTtcbiAgICAgIH0gZWxzZSBpZiAoYWlCb2FyZC5hbGxTaGlwc1N1bmspIHtcbiAgICAgICAgd2lubmVyID0gcGxheWVyc1swXS5uYW1lO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoZ2V0QWN0aXZlUGxheWVyKCkgPT09IHBsYXllcnNbMF0pIHtcbiAgICAgIHBsYXllci5hdHRhY2tTcXVhcmUocm93LCBjb2x1bW4sIGFpQm9hcmQpO1xuICAgICAgY2hlY2tXaW5uZXIoKTtcbiAgICB9XG5cbiAgICBzd2l0Y2hQbGF5ZXJUdXJuKCk7XG5cbiAgICAvLyBMZXQgQUkgYXR0YWNrIHBsYXllciBib2FyZCB3aXRoIFwidGhpbmtpbmdcIiBkZWxheVxuICAgIGlmIChnZXRBY3RpdmVQbGF5ZXIoKSA9PT0gcGxheWVyc1sxXSkge1xuICAgICAgY29uc3QgZGVsYXlBdHRhY2sgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1MDAwKTtcbiAgICAgIGNvbnNvbGUubG9nKGRlbGF5QXR0YWNrKTtcbiAgICAgIGNvbnN0IGFpQXR0YWNrID0gYWkuYXR0YWNrUmFuZG9tU3F1YXJlKHBsYXllckJvYXJkKTtcbiAgICAgIHNldFRpbWVvdXQoYWlBdHRhY2ssIGRlbGF5QXR0YWNrKTtcbiAgICAgIGNoZWNrV2lubmVyKCk7XG4gICAgfVxuXG4gICAgc3dpdGNoUGxheWVyVHVybigpO1xuXG4gICAgY29uc29sZS5sb2cocGxheWVyQm9hcmQsIGFpQm9hcmQsIHBsYXllciwgYWkpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxheWVyQm9hcmQsXG4gICAgYWlCb2FyZCxcbiAgICBncmlkU2l6ZTogcGxheWVyQm9hcmQuZ3JpZFNpemUsXG4gICAgcGxheWVyMmRBcnJheTogcGxheWVyQm9hcmQuYm9hcmQsXG4gICAgYWkyZEFycmF5OiBhaUJvYXJkLmJvYXJkLFxuICAgIGdldEFjdGl2ZVBsYXllcixcbiAgICBwbGF5Um91bmQsXG4gICAgd2lubmVyLFxuICB9O1xufVxuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmV4cG9ydCBjb25zdCBzaGlwUHJvcGVydGllcyA9IFtcbiAge1xuICAgIHR5cGU6ICdDYXJyaWVyJyxcbiAgICBsZW5ndGg6IDUsXG4gICAgY29sb3I6ICdyZ2IoMjUyLCA0LCA0LCAuNCknLFxuICB9LFxuICB7XG4gICAgdHlwZTogJ0JhdHRsZXNoaXAnLFxuICAgIGxlbmd0aDogNCxcbiAgICBjb2xvcjogJ3JnYig0LCAxNDAsIDQsIC40KScsXG4gIH0sXG4gIHtcbiAgICB0eXBlOiAnRGVzdHJveWVyJyxcbiAgICBsZW5ndGg6IDMsXG4gICAgY29sb3I6ICdyZ2IoNCwgNCwgMjUyLCAuNCknLFxuICB9LFxuICB7XG4gICAgdHlwZTogJ1N1Ym1hcmluZScsXG4gICAgbGVuZ3RoOiAzLFxuICAgIGNvbG9yOiAncmdiKDI1MiwgMjUxLCAzMiwgLjQpJyxcbiAgfSxcbiAge1xuICAgIHR5cGU6ICdQYXRyb2wgQm9hdCcsXG4gICAgbGVuZ3RoOiAyLFxuICAgIGNvbG9yOiAncmdiKDEyLCA0LCAxMiwgLjQpJyxcbiAgfSxcbl07XG4iLCIvLyBTVEFSVCAvL1xuXG5pbXBvcnQgeyBzaGlwUHJvcGVydGllcyB9IGZyb20gJy4uL2RhdGEvc2hpcFByb3BlcnRpZXMnO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5cbmV4cG9ydCBjbGFzcyBHYW1lYm9hcmQge1xuICBib2FyZDtcbiAgbWlzc2VkU2hvdHM7XG4gIHN1bmtlblNoaXBzO1xuICBncmlkU2l6ZSA9IDEwO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmQgPSBbXTsgLy8gSW50ZXJmYWNlXG4gICAgdGhpcy5taXNzZWRTaG90cyA9IFtdOyAvLyBJbnRlcmZhY2VcbiAgICB0aGlzLnN1bmtlblNoaXBzID0gW107IC8vIEludGVyZmFjZVxuICB9XG5cbiAgLy8gR2VuZXJhdGUgdGhlIGdhbWUgYm9hcmQgYXMgYSAyRC1hcnJheVxuICBidWlsZEJvYXJkKCkge1xuICAgIGxldCB2YWx1ZSA9IDE7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JpZFNpemU7IGkrKykge1xuICAgICAgdGhpcy5ib2FyZFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmdyaWRTaXplOyBqKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZFtpXVtqXSA9IHZhbHVlKys7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2FsY3VsYXRlIHRvdGFsIGZsZWV0IHNpemUgY291bnRlZCBhcyB0b3RhbCBudW1iZXIgb2Ygc3F1YXJlcyBvY2N1cGllZFxuICAvLyBieSB0aGUgc2hpcHMgb24gdGhlIGdhbWUtcmVhZHkgYm9hcmRcbiAgZmxlZXQoKSB7XG4gICAgbGV0IGZsZWV0U2l6ZSA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwUHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgZmxlZXRTaXplICs9IHNoaXBQcm9wZXJ0aWVzW2ldLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGZsZWV0U2l6ZTtcbiAgfVxuXG4gIC8vIENyZWF0ZSBzaGlwcyBieSBjYWxsaW5nIFNoaXAgY2xhc3NcbiAgY3JlYXRlU2hpcHMoKSB7XG4gICAgY29uc3QgcHJvcHMgPSBzaGlwUHJvcGVydGllcztcbiAgICBsZXQgc2hpcHNBcnJheSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaXNWZXJ0aWNhbCA9IFt0cnVlLCBmYWxzZV1bTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKV07XG4gICAgICBjb25zdCB2ZXNzZWwgPSBuZXcgU2hpcChwcm9wc1tpXS50eXBlLCBwcm9wc1tpXS5sZW5ndGgsIGlzVmVydGljYWwpO1xuICAgICAgc2hpcHNBcnJheS5wdXNoKHZlc3NlbCk7XG4gICAgfVxuICAgIHJldHVybiBzaGlwc0FycmF5O1xuICB9XG5cbiAgcGxhY2VTaGlwcyhzaGlwLCByb3csIGNvbHVtbiwgdmVydGljYWwpIHtcbiAgICBpZiAodmVydGljYWwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmJvYXJkW3JvdyArIGldW2NvbHVtbl0gPSBbaSwgc2hpcF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sdW1uICsgaV0gPSBbaSwgc2hpcF07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0UmFuZG9tUGxhY2VtZW50KCkge1xuICAgIC8vIEdldCByZXR1cm5lZCBhcnJheSBmcm9tICdjcmVhdGVTaGlwcygpJ1xuICAgIGNvbnN0IHNoaXBzID0gdGhpcy5jcmVhdGVTaGlwcygpO1xuXG4gICAgLy8gQ2hlY2sgdG8gc2VlIHRoYXQgYm9hcmQgaXMgZW1wdHkgKGkuZS4gcmVhZHkgZm9yIGEgbmV3IGdhbWUpXG4gICAgaWYgKCF0aGlzLmlzQm9hcmRFbXB0eSkgcmV0dXJuO1xuXG4gICAgLy8gRm9yIGV2ZXJ5IHNoaXAgaW4gYXJyYXlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBTZWxlY3QgcmFuZG9tIHN0YXJ0LWNvb3JkaW5hdGVcbiAgICAgIGNvbnN0IHJhbmRYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5ncmlkU2l6ZSk7XG4gICAgICBjb25zdCByYW5kWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZ3JpZFNpemUpO1xuICAgICAgLy8gUmVhZCBvcmllbnRhdGlvbiBvZiBzaGlwXG4gICAgICBjb25zdCB2ZXJ0aWNhbCA9IHNoaXBzW2ldLnZlcnRpY2FsO1xuXG4gICAgICAvLyBDaGVjayBpZiBwbGFjZW1lbnQgaXMgYWxsb3dlZCAtIG90aGVyd2lzZSByZS1zdGFydCBsb29wIGZyb20gY3VycmVudCBpbmRleCBhZ2FpblxuICAgICAgaWYgKCF0aGlzLnBsYWNlbWVudEFsbG93ZWQoc2hpcHNbaV0sIHJhbmRYLCByYW5kWSwgdmVydGljYWwpKSB7XG4gICAgICAgIGktLTtcbiAgICAgIH0gZWxzZSB0aGlzLnBsYWNlU2hpcHMoc2hpcHNbaV0sIHJhbmRYLCByYW5kWSwgdmVydGljYWwpO1xuICAgIH1cbiAgfVxuXG4gIHBsYWNlbWVudEFsbG93ZWQoc2hpcCwgcm93LCBjb2x1bW4sIHZlcnRpY2FsKSB7XG4gICAgLy8gQ2hlY2sgaWYgcGxhY2VtZW50IG9mIHNoaXAgaXMgZnVsbHkgb3IgcGFydGx5IG91dHNpZGUgZ3JpZCBwZXJpbWV0ZXJcbiAgICBpZiAoXG4gICAgICByb3cgPiB0aGlzLmdyaWRTaXplIHx8XG4gICAgICBjb2x1bW4gPiB0aGlzLmdyaWRTaXplIHx8XG4gICAgICByb3cgKyBzaGlwLmxlbmd0aCA+IHRoaXMuZ3JpZFNpemUgfHxcbiAgICAgIGNvbHVtbiArIHNoaXAubGVuZ3RoID4gdGhpcy5ncmlkU2l6ZVxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIC8vIENoZWNrIGlmIGEgZ2l2ZW4gY29vcmRpbmF0ZSBpcyBhbHJlYWR5IG9jY3VwaWVkXG4gICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW3JvdyArIGldW2NvbHVtbl0gIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbcm93XVtjb2x1bW4gKyBpXSAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSB7XG4gICAgbGV0IGlzSGl0O1xuICAgIGxldCBjb29yZGluYXRlID0gdGhpcy5ib2FyZFtyb3ddW2NvbHVtbl07XG5cbiAgICBpZiAodHlwZW9mIGNvb3JkaW5hdGUgIT09ICdudW1iZXInKSB7XG4gICAgICBjb29yZGluYXRlWzFdLmhpdChjb29yZGluYXRlWzBdKTtcbiAgICAgIGlzSGl0ID0gdHJ1ZTtcbiAgICAgIGlmIChjb29yZGluYXRlWzFdLmlzU3VuaygpKSB7XG4gICAgICAgIHRoaXMuc3Vua2VuU2hpcHMucHVzaChjb29yZGluYXRlWzFdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5taXNzZWRTaG90cy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgaXNIaXQgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzSGl0O1xuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGlmICghdGhpcy5zdW5rZW5TaGlwcy5sZW5ndGggPT09IHNoaXBQcm9wZXJ0aWVzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNCb2FyZEVtcHR5KCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ncmlkU2l6ZTsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuZ3JpZFNpemU7IGorKykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbaV1bal0gIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gVXNlIHRoaXMgdG8gdmVyaWZ5IGNvcnJlY3QgcGxhY2VtZW50IG9mIHNoaXBzXG4gIGNvdW50T2NjdXBpZWRTcXVhcmVzKCkge1xuICAgIGNvbnN0IGF2YWlsYWJsZVNxdWFyZXMgPSB0aGlzLmdyaWRTaXplICogdGhpcy5ncmlkU2l6ZTtcbiAgICBjb25zdCBmbGVldFNpemUgPSB0aGlzLmZsZWV0KCk7XG4gICAgcmV0dXJuIGF2YWlsYWJsZVNxdWFyZXMgLSAoYXZhaWxhYmxlU3F1YXJlcyAtIGZsZWV0U2l6ZSk7XG4gIH1cbn1cblxuLy8gRU5EIC8vXG4iLCIvLyBTVEFSVCAvL1xuXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi4vY29udHJvbGxlci9nYW1lQ29udHJvbGxlcic7XG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICBhdHRhY2tzO1xuXG4gIGNvbnN0cnVjdG9yKHBsYXllck5hbWUpIHtcbiAgICB0aGlzLnBsYXllck5hbWUgPSBwbGF5ZXJOYW1lO1xuICAgIHRoaXMuYXR0YWNrcyA9IFtdO1xuICB9XG5cbiAgYXR0YWNrU3F1YXJlKHJvdywgY29sdW1uLCBlbmVteUJvYXJkKSB7XG4gICAgaWYgKCF0aGlzLmhhc0JlZW5BdHRhY2tlZChyb3csIGNvbHVtbikpIHtcbiAgICAgIHRoaXMuYXR0YWNrcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGF0dGFja1JhbmRvbVNxdWFyZShwbGF5ZXJCb2FyZCkge1xuICAgIGlmICh0aGlzLmF0dGFja3MubGVuZ3RoID49IDEwMCkgcmV0dXJuO1xuICAgIGNvbnN0IHJhbmRSb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwbGF5ZXJCb2FyZC5ncmlkU2l6ZSk7XG4gICAgY29uc3QgcmFuZENvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBsYXllckJvYXJkLmdyaWRTaXplKTtcblxuICAgIGlmICghdGhpcy5oYXNCZWVuQXR0YWNrZWQocmFuZFJvdywgcmFuZENvbHVtbikpIHtcbiAgICAgIHRoaXMuYXR0YWNrcy5wdXNoKFtyYW5kUm93LCByYW5kQ29sdW1uXSk7XG4gICAgICBwbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRSb3csIHJhbmRDb2x1bW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgaGFzQmVlbkF0dGFja2VkKHJvdywgY29sdW1uKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmF0dGFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmF0dGFja3NbaV1bMF0gPT09IHJvdyAmJiB0aGlzLmF0dGFja3NbaV1bMV0gPT09IGNvbHVtbilcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgdHlwZTtcbiAgbGVuZ3RoO1xuICB2ZXJ0aWNhbCA9IGZhbHNlO1xuICBoaXRzO1xuXG4gIGNvbnN0cnVjdG9yKHR5cGUsIGxlbmd0aCwgdmVydGljYWwpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMudmVydGljYWwgPSB2ZXJ0aWNhbDtcbiAgICB0aGlzLmhpdHMgPSBbXTtcbiAgfVxuXG4gIGhpdChwb3NpdGlvbikge1xuICAgIGlmIChcbiAgICAgIHRoaXMuaGl0cy5pbmNsdWRlcyhwb3NpdGlvbikgfHxcbiAgICAgIHBvc2l0aW9uIDwgMCB8fFxuICAgICAgcG9zaXRpb24gPiB0aGlzLmxlbmd0aCAtIDFcbiAgICApXG4gICAgICByZXR1cm47XG4gICAgdGhpcy5oaXRzLnB1c2gocG9zaXRpb24pO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdHMubGVuZ3RoID09PSB0aGlzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIEVORCAvL1xuIiwiLy8gU1RBUlQgLy9cblxuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgJy4vaHRtbC9pbmRleC5odG1sJztcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL2ZhY3Rvcmllcy9zaGlwJztcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZmFjdG9yaWVzL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL2ZhY3Rvcmllcy9wbGF5ZXInO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4vY29udHJvbGxlci9nYW1lQ29udHJvbGxlcic7XG5pbXBvcnQgeyBEaXNwbGF5IH0gZnJvbSAnLi9jb250cm9sbGVyL2Rpc3BsYXlDb250cm9sbGVyJztcblxuLy8gU2V0IGNvcHlyaWdodCB5ZWFyIGF1dG9tYXRpY2FsbHlcbmNvbnN0IGNvcHlyaWdodFNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29weXJpZ2h0LXNwYW4nKTtcbmNvcHlyaWdodFNwYW4udGV4dENvbnRlbnQgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cbi8vIFNob3cgbW9kYWwgd2l0aCBwYWdlIGxvYWRcbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLW5hbWUnKTtcbmNvbnN0IG1haW5HYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tZ2FtZScpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgbWFpbkdhbWUuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICBtb2RhbC5zaG93TW9kYWwoKTtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xufSk7XG5cbi8vIFN0YXJ0IGdhbWUgd2hlbiBwbGF5ZXIgbmFtZSBoYXMgYmVlbiBlbnRlcmVkXG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1idG4nKTtcbmNvbnN0IGFsaWFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1uYW1lJyk7XG5cbnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBtb2RhbC5jbG9zZSgpO1xuICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gIG1haW5HYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblxuICBEaXNwbGF5KGFsaWFzLnZhbHVlKTtcbn0pO1xuXG4vLyAuLi4gb3IgcHJlc3MgJ2VudGVyJ1xuYWxpYXMuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICBpZiAoZS5rZXlDb2RlID09PSAxMykgc3RhcnRCdG4uY2xpY2soKTtcbn0pO1xuXG4vLyBTaG93IGNvbmZpcm1hdGlvbiBtb2RhbCB3aGVuIHdhbnRpbmcgYSBuZXcgZ2FtZVxuY29uc3QgbmV3R2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctZ2FtZS1idG4nKTtcbmNvbnN0IG1vZGFsQ29uZmlybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jb25maXJtJyk7XG5cbm5ld0dhbWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGNvbnN0IG1vZGFsQ29uZmlybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jb25maXJtJyk7XG4gIG1vZGFsQ29uZmlybS5zaG93TW9kYWwoKTtcbiAgbW9kYWxDb25maXJtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbn0pO1xuXG4vLyBXaGVuIHJlZ3JldHRpbmcgdG8gc3RhcnQgYSBuZXcgZ2FtZVxuY29uc3QgY29uZmlybU5vID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vLWJ0bicpO1xuXG5jb25maXJtTm8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIG1vZGFsQ29uZmlybS5jbG9zZSgpO1xuICBtb2RhbENvbmZpcm0uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xufSk7XG5cbi8vIFNob3cgaW5mbyBtb2RhbCBvbiBob3ZlclxuY29uc3QgaW5mb0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby1pY29uJyk7XG5jb25zdCBpbmZvTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtaW5mbycpO1xuXG5pbmZvSWNvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gIGluZm9Nb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG59KTtcblxuaW5mb0ljb24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gIGluZm9Nb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG59KTtcblxuaW5mb0ljb24uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiB7XG4gIGluZm9Nb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG59KTtcblxuLy8gRU5EIC8vXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2h0bWwtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1nL2dpdGh1Yi1sb2dvLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0hUTUxfTE9BREVSX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWcvc2FpbG9yLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0hUTUxfTE9BREVSX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWcvaW5mby5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfM19fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1nL2hpdC5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1nL21pc3Muc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzVfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltZy9waXJhdGUuc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG4vLyBNb2R1bGVcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8wX19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfMF9fXyk7XG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzFfX18pO1xudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzJfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF8yX19fKTtcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8zX19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfM19fXyk7XG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfNF9fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzRfX18pO1xudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzVfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF81X19fKTtcbnZhciBjb2RlID0gXCI8IWRvY3R5cGUgaHRtbD5cXG48aHRtbCBsYW5nPVxcXCJlblxcXCI+XFxuICA8aGVhZD5cXG4gICAgPG1ldGEgY2hhcnNldD1cXFwiVVRGLThcXFwiIC8+XFxuICAgIDxtZXRhIG5hbWU9XFxcInZpZXdwb3J0XFxcIiBjb250ZW50PVxcXCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wXFxcIiAvPlxcbiAgICA8dGl0bGU+QmF0dGxlc2hpcDwvdGl0bGU+XFxuICAgIDxsaW5rXFxuICAgICAgaHJlZj1cXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1PcmJpdHJvbiZkaXNwbGF5PXN3YXBcXFwiXFxuICAgICAgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIlxcbiAgICAvPlxcbiAgICA8bGlua1xcbiAgICAgIHJlbD1cXFwic3R5bGVzaGVldFxcXCJcXG4gICAgICBocmVmPVxcXCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9mb250LWF3ZXNvbWUvNC43LjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzXFxcIlxcbiAgICAvPlxcbiAgICA8bGlua1xcbiAgICAgIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9SW50ZXImZmFtaWx5PVBsYXlmYWlyK0Rpc3BsYXkmZGlzcGxheT1zd2FwXFxcIlxcbiAgICAgIHJlbD1cXFwic3R5bGVzaGVldFxcXCJcXG4gICAgLz5cXG4gICAgPGxpbmtcXG4gICAgICBocmVmPVxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUNhdmVhdCZkaXNwbGF5PXN3YXBcXFwiXFxuICAgICAgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIlxcbiAgICAvPlxcbiAgICA8bGlua1xcbiAgICAgIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9THVja2llc3QrR3V5JmRpc3BsYXk9c3dhcFxcXCJcXG4gICAgICByZWw9XFxcInN0eWxlc2hlZXRcXFwiXFxuICAgIC8+XFxuICAgIDxsaW5rXFxuICAgICAgaHJlZj1cXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Nb25vdG9uJmRpc3BsYXk9c3dhcFxcXCJcXG4gICAgICByZWw9XFxcInN0eWxlc2hlZXRcXFwiXFxuICAgIC8+XFxuICA8L2hlYWQ+XFxuICA8Ym9keT5cXG4gICAgPGRpdiBjbGFzcz1cXFwiZGV2ZWxvcGVyXFxcIj5cXG4gICAgICA8cCBjbGFzcz1cXFwiY29weXJpZ2h0XFxcIj4mY29weTxzcGFuIGlkPVxcXCJjb3B5cmlnaHQtc3BhblxcXCI+IDIwMjM8L3NwYW4+PC9wPlxcbiAgICAgIDxhXFxuICAgICAgICBjbGFzcz1cXFwiZ2l0aHViLWxpbmtcXFwiXFxuICAgICAgICBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vcmFzbXVzaGFpc2x1bmRcXFwiXFxuICAgICAgICB0YXJnZXQ9XFxcIl9ibGFua1xcXCJcXG4gICAgICAgID5SYXNtdXMgSC5cXG4gICAgICAgIDxpbWdcXG4gICAgICAgICAgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzBfX18gKyBcIlxcXCJcXG4gICAgICAgICAgY2xhc3M9XFxcImdpdGh1Yi1sb2dvXFxcIlxcbiAgICAgICAgICBhbHQ9XFxcImdpdGh1YiBsb2dvXFxcIlxcbiAgICAgIC8+PC9hPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiaGVhZGVyXFxcIj5cXG4gICAgICA8cCBjbGFzcz1cXFwidGl0bGVcXFwiPkJBVFRMRVNISVA8L3A+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGlhbG9nIGNsYXNzPVxcXCJtb2RhbC1uYW1lXFxcIj5cXG4gICAgICA8bGFiZWwgY2xhc3M9XFxcIm1vZGFsLWxhYmVsXFxcIiBmb3I9XFxcInBsYXllci1uYW1lXFxcIj5FbnRlciB5b3VyIGdhbWUgYWxpYXM8L2xhYmVsPlxcbiAgICAgIDxpbnB1dFxcbiAgICAgICAgaWQ9XFxcInBsYXllci1uYW1lXFxcIlxcbiAgICAgICAgdHlwZT1cXFwidGV4dFxcXCJcXG4gICAgICAgIG5hbWU9XFxcInBsYXllcl9uYW1lXFxcIlxcbiAgICAgICAgbWF4bGVuZ3RoPVxcXCIyMFxcXCJcXG4gICAgICAgIG1pbmxlbmd0aD1cXFwiMVxcXCJcXG4gICAgICAgIHBsYWNlaG9sZGVyPVxcXCJFbnRlciBhbGlhc1xcXCJcXG4gICAgICAgIHJlcXVpcmVkXFxuICAgICAgLz5cXG4gICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG5cXFwiIGlkPVxcXCJzdGFydC1idG5cXFwiIHR5cGU9XFxcInN1Ym1pdFxcXCI+U1RBUlQ8L2J1dHRvbj5cXG4gICAgPC9kaWFsb2c+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1haW4tZ2FtZVxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiZ2FtZS1jb250YWluZXJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwicGxheWVyLXR1cm5cXFwiPlxcbiAgICAgICAgICA8cCBjbGFzcz1cXFwiZ2FtZS10ZXh0XFxcIiBpZD1cXFwicGxheWVyLXR1cm5cXFwiPlxcbiAgICAgICAgICAgIFdhaXRpbmcgZm9yIDxzcGFuIGlkPVxcXCJwbGF5ZXItaWRcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgPC9wPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsb2FkZXIgaW52aXNpYmxlXFxcIj48L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPHAgY2xhc3M9XFxcImdhbWUtdGV4dCBpbnZpc2libGVcXFwiIGlkPVxcXCJwbGF5ZXItd29uXFxcIj5cXG4gICAgICAgICAgPHNwYW4gaWQ9XFxcIndpbm5lci1pZFxcXCI+PC9zcGFuPiB3aW5zIVxcbiAgICAgICAgPC9wPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYm9hcmQtY29udGFpbmVyXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYm9hcmRcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImJvYXJkLWluZm9cXFwiPlxcbiAgICAgICAgICAgICAgPGltZ1xcbiAgICAgICAgICAgICAgICBjbGFzcz1cXFwiaWNvbiBwbGF5ZXItaWNvblxcXCJcXG4gICAgICAgICAgICAgICAgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzFfX18gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgYWx0PVxcXCJwbGF5ZXIgaWNvblxcXCJcXG4gICAgICAgICAgICAgIC8+XFxuICAgICAgICAgICAgICA8cCBpZD1cXFwieW91ci1ib2FyZFxcXCI+PC9wPlxcbiAgICAgICAgICAgICAgPGltZ1xcbiAgICAgICAgICAgICAgICBjbGFzcz1cXFwiaWNvbiBpbmZvLWljb25cXFwiXFxuICAgICAgICAgICAgICAgIHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8yX19fICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgIGFsdD1cXFwiaW5mb3JtYXRpb25cXFwiXFxuICAgICAgICAgICAgICAvPlxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtaW5mbyBoaWRlXFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibGVnZW5kXFxcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzcXVhcmUgc3F1YXJlLTVcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+JnRpbWVzNTwvcD5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHQtMVxcXCI+Q2FycmllcjwvcD5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxlZ2VuZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic3F1YXJlIHNxdWFyZS00XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPiZ0aW1lczQ8L3A+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj5CYXR0bGVzaGlwPC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibGVnZW5kXFxcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzcXVhcmUgc3F1YXJlLTMtMVxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj4mdGltZXMzPC9wPlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+RGVzdHJveWVyPC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibGVnZW5kXFxcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzcXVhcmUgc3F1YXJlLTMtMlxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj4mdGltZXMzPC9wPlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+U3VibWFyaW5lPC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibGVnZW5kXFxcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzcXVhcmUgc3F1YXJlLTJcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+JnRpbWVzMjwvcD5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPlBhdHJvbCBCb2F0PC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibGVnZW5kXFxcIj5cXG4gICAgICAgICAgICAgICAgICA8aW1nXFxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwibGVnZW5kLWljb25cXFwiXFxuICAgICAgICAgICAgICAgICAgICBzcmM9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfM19fXyArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgYWx0PVxcXCJleHBsb3Npb25cXFwiXFxuICAgICAgICAgICAgICAgICAgLz5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPkhpdDwvcD5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxlZ2VuZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgPGltZ1xcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcImxlZ2VuZC1pY29uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzRfX18gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cXFwid2F2ZXNcXFwiXFxuICAgICAgICAgICAgICAgICAgLz5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPk1pc3M8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ2FtZS1ib2FyZCBnYW1lLWJvYXJkLXBsYXllclxcXCI+PC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJib2FyZFxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYm9hcmQtaW5mb1xcXCI+XFxuICAgICAgICAgICAgICA8aW1nXFxuICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJpY29uIG9wcG9uZW50LWljb25cXFwiXFxuICAgICAgICAgICAgICAgIHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF81X19fICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgIGFsdD1cXFwib3Bwb25lbnQgaWNvblxcXCJcXG4gICAgICAgICAgICAgIC8+XFxuICAgICAgICAgICAgICA8cCBpZD1cXFwib3Bwb25lbnQtYm9hcmRcXFwiPjwvcD5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJnYW1lLWJvYXJkIGdhbWUtYm9hcmQtb3Bwb25lbnRcXFwiPjwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuXFxcIiBpZD1cXFwibmV3LWdhbWUtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiPk5FVyBHQU1FPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGlhbG9nIGNsYXNzPVxcXCJtb2RhbC1jb25maXJtXFxcIj5cXG4gICAgICA8aDM+QXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHN0YXJ0IGEgbmV3IGdhbWU/PC9oMz5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidXR0b25zXFxcIj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XFxcImJ0blxcXCIgaWQ9XFxcInllcy1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+WUVTPC9idXR0b24+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG5cXFwiIGlkPVxcXCJuby1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+Tk88L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaWFsb2c+XFxuICA8L2JvZHk+XFxuPC9odG1sPlxcblwiO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgY29kZTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZXJzY29yZS1kYW5nbGUsIG5vLXBhcmFtLXJlYXNzaWduXG5cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICBpZiAob3B0aW9ucy5tYXliZU5lZWRRdW90ZXMgJiYgL1tcXHRcXG5cXGZcXHIgXCInPTw+YF0vLnRlc3QodXJsKSkge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiR2FtZSIsInNoaXBQcm9wZXJ0aWVzIiwiRGlzcGxheSIsInBsYXllck5hbWUiLCJwbGF5ZXIiLCJhaSIsImdhbWUiLCJzZXRQbGF5ZXJOYW1lIiwicGxheWVySWQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhaUlkIiwidGV4dENvbnRlbnQiLCJjb2xvclNoaXBDZWxscyIsInJvdyIsImNvbHVtbiIsInR5cGUiLCJzZWxlY3RDZWxsIiwiaSIsImxlbmd0aCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJidWlsZEdyaWRzIiwicGxheWVyQm9hcmQiLCJwbGF5ZXIyZEFycmF5IiwicGxheWVyQm9hcmRDb250YWluZXIiLCJqIiwiY2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkYXRhc2V0IiwiaW5kZXhOdW1iZXIiLCJhcHBlbmRDaGlsZCIsInNoaXBUeXBlIiwiYWlCb2FyZCIsImFpMmRBcnJheSIsImFpQm9hcmRDb250YWluZXIiLCJzZXROYW1lV2FpdGluZyIsIndhaXRpbmdGb3JQbGF5ZXIiLCJsb2FkZXIiLCJnZXRBY3RpdmVQbGF5ZXIiLCJuYW1lIiwicmVtb3ZlIiwib3Bwb25lbnRCb2FyZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJpbmRleFRvQXJyYXkiLCJzcGxpdCIsIk51bWJlciIsInBsYXlSb3VuZCIsIndpbm5lciIsIndpbm5lcklkIiwicGxheWVyVHVybiIsImdhbWVCb2FyZHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2VsbHMiLCJmb3JFYWNoIiwiYm9hcmQiLCJHYW1lYm9hcmQiLCJQbGF5ZXIiLCJhaU5hbWUiLCJidWlsZFBsYXllckJvYXJkIiwiYnVpbGRCb2FyZCIsImJ1aWxkQWlCb2FyZCIsInBsYWNlU2hpcHNQbGF5ZXIiLCJnZXRSYW5kb21QbGFjZW1lbnQiLCJwbGFjZVNoaXBzQWkiLCJwbGF5ZXJzIiwiYWN0aXZlUGxheWVyIiwic3dpdGNoUGxheWVyVHVybiIsImNoZWNrV2lubmVyIiwiYWxsU2hpcHNTdW5rIiwiYXR0YWNrU3F1YXJlIiwiZGVsYXlBdHRhY2siLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb25zb2xlIiwibG9nIiwiYWlBdHRhY2siLCJhdHRhY2tSYW5kb21TcXVhcmUiLCJzZXRUaW1lb3V0IiwiZ3JpZFNpemUiLCJTaGlwIiwibWlzc2VkU2hvdHMiLCJzdW5rZW5TaGlwcyIsImNvbnN0cnVjdG9yIiwidmFsdWUiLCJmbGVldCIsImZsZWV0U2l6ZSIsImNyZWF0ZVNoaXBzIiwicHJvcHMiLCJzaGlwc0FycmF5IiwiaXNWZXJ0aWNhbCIsInJvdW5kIiwidmVzc2VsIiwicHVzaCIsInBsYWNlU2hpcHMiLCJzaGlwIiwidmVydGljYWwiLCJzaGlwcyIsImlzQm9hcmRFbXB0eSIsInJhbmRYIiwicmFuZFkiLCJwbGFjZW1lbnRBbGxvd2VkIiwicmVjZWl2ZUF0dGFjayIsImlzSGl0IiwiY29vcmRpbmF0ZSIsImhpdCIsImlzU3VuayIsImNvdW50T2NjdXBpZWRTcXVhcmVzIiwiYXZhaWxhYmxlU3F1YXJlcyIsImF0dGFja3MiLCJlbmVteUJvYXJkIiwiaGFzQmVlbkF0dGFja2VkIiwicmFuZFJvdyIsInJhbmRDb2x1bW4iLCJoaXRzIiwicG9zaXRpb24iLCJpbmNsdWRlcyIsImNvcHlyaWdodFNwYW4iLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJtb2RhbCIsIm1haW5HYW1lIiwid2luZG93Iiwic2hvd01vZGFsIiwic3RhcnRCdG4iLCJhbGlhcyIsImNsb3NlIiwia2V5Q29kZSIsImNsaWNrIiwibmV3R2FtZSIsIm1vZGFsQ29uZmlybSIsImNvbmZpcm1ObyIsImluZm9JY29uIiwiaW5mb01vZGFsIiwidG9nZ2xlIl0sInNvdXJjZVJvb3QiOiIifQ==