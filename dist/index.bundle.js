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
        const cell = document.createElement('button');
        cell.classList.add('cell', 'cell-player');
        cell.setAttribute('type', 'button');
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
        const cell = document.createElement('button');
        cell.classList.add('cell', 'cell-opponent');
        cell.setAttribute('type', 'button');
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

    // Initiate round with attack from player
    game.playRound(row, column);

    // Set appropriate icon on attacked opponent cell wether a hit or a miss
    if (!game.aiBoard.isHit) {
      const miss = document.createElement('img');
      miss.classList.add('miss');
      miss.setAttribute('src', '../assets/img/miss.svg');
      target.appendChild(miss);
    } else {
      const hit = document.createElement('img');
      hit.classList.add('hit');
      hit.setAttribute('src', '../assets/img/hit.svg');
      target.appendChild(hit);
    }

    // Disable attacked opponent cell
    target.setAttribute('disabled', true);
    target.classList.add('attacked-opponent-cell');

    // Set appropriate icon on attacked player cell wether a hit or a miss
    const latestAiAttack = game.aiAttacks[game.aiAttacks.length - 1];
    const aiAttackRow = latestAiAttack[0];
    const aiAttackColumn = latestAiAttack[1];
    const getPlayerCell = document.querySelector(`[data-index-number='${aiAttackRow}-${aiAttackColumn}']`);
    if (!game.playerBoard.isHit) {
      const miss = document.createElement('img');
      miss.classList.add('miss');
      miss.setAttribute('src', '../assets/img/miss.svg');
      getPlayerCell.appendChild(miss);
    } else {
      const hit = document.createElement('img');
      hit.classList.add('hit');
      hit.setAttribute('src', '../assets/img/hit.svg');
      getPlayerCell.appendChild(hit);
    }

    // Show a winner
    if (game.winner) {
      const winner = document.querySelector('#player-won');
      const winnerId = document.querySelector('#winner-id');
      const playerTurn = document.querySelector('.player-turn');
      winnerId.textContent = game.winner;
      winner.classList.remove('invisible');
      playerTurn.classList.add('invisible');

      // Disable board for further input when winner is found
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
  let winner;
  const playRound = (row, column) => {
    // Check for a winner
    const checkWinner = () => {
      if (playerBoard.allShipsSunk()) {
        winner = players[1].name;
      } else if (aiBoard.allShipsSunk()) {
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
      const aiAttack = () => {
        ai.attackRandomSquare(playerBoard);
        if (ai.alreadyAttacked) aiAttack();
      };
      aiAttack();
      checkWinner();
    }
    switchPlayerTurn();
    console.log(playerBoard, aiBoard, player, ai, playerBoard.allShipsSunk(), aiBoard.allShipsSunk(), winner);
  };
  return {
    playerBoard,
    aiBoard,
    playerAttacks: player.attacks,
    aiAttacks: ai.attacks,
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
  isHit;
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
    let coordinate = this.board[row][column];
    if (typeof coordinate !== 'number') {
      coordinate[1].hit(coordinate[0]);
      this.isHit = true;
      if (coordinate[1].isSunk()) {
        this.sunkenShips.push(coordinate[1]);
      }
    } else {
      this.missedShots.push([row, column]);
      this.isHit = false;
    }
  }
  allShipsSunk() {
    if (this.sunkenShips.length < 1) return false;
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
  alreadyAttacked;
  constructor(playerName) {
    this.playerName = playerName;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7QUFDakMsQ0FBQyxDQUFDO0FBRUZtSCxRQUFRLENBQUNuRyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtFQUN2Q29HLFNBQVMsQ0FBQ3JILFNBQVMsQ0FBQ3NILE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDcEMsQ0FBQyxDQUFDOztBQUVGOzs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQzZHO0FBQzdHLHlDQUF5QyxzSUFBZ0Q7QUFDekYseUNBQXlDLDRIQUEyQztBQUNwRix5Q0FBeUMsd0hBQXlDO0FBQ2xGLHlDQUF5QyxzSEFBd0M7QUFDakYseUNBQXlDLHdIQUF5QztBQUNsRix5Q0FBeUMsNEhBQTJDO0FBQ3BGO0FBQ0Esc0NBQXNDLHVGQUF3QztBQUM5RSxzQ0FBc0MsdUZBQXdDO0FBQzlFLHNDQUFzQyx1RkFBd0M7QUFDOUUsc0NBQXNDLHVGQUF3QztBQUM5RSxzQ0FBc0MsdUZBQXdDO0FBQzlFLHNDQUFzQyx1RkFBd0M7QUFDOUU7QUFDQTtBQUNBLCtEQUFlLElBQUk7Ozs7Ozs7Ozs7QUNqQk47O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7O0FBR0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDekJBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvY29udHJvbGxlci9kaXNwbGF5Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9jb250cm9sbGVyL2dhbWVDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2RhdGEvc2hpcFByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2h0bWwvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9odG1sLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz9lMzIwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFNUQVJUIC8vXG5cbmltcG9ydCB7IEdhbWUgfSBmcm9tICcuL2dhbWVDb250cm9sbGVyJztcbmltcG9ydCB7IHNoaXBQcm9wZXJ0aWVzIH0gZnJvbSAnLi4vZGF0YS9zaGlwUHJvcGVydGllcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBEaXNwbGF5KHBsYXllck5hbWUpIHtcbiAgY29uc3QgcGxheWVyID0gcGxheWVyTmFtZTtcbiAgY29uc3QgYWkgPSAnUGlyYXRlIEFJJztcbiAgY29uc3QgZ2FtZSA9IEdhbWUocGxheWVyLCBhaSk7XG5cbiAgLy8gU2V0dGluZyBwbGF5ZXIgYW5kIGFpIG5hbWVzIG9uIFVJXG4gIGNvbnN0IHNldFBsYXllck5hbWUgPSAocGxheWVyLCBhaSkgPT4ge1xuICAgIGNvbnN0IHBsYXllcklkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lvdXItYm9hcmQnKTtcbiAgICBjb25zdCBhaUlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29wcG9uZW50LWJvYXJkJyk7XG4gICAgcGxheWVySWQudGV4dENvbnRlbnQgPSBwbGF5ZXI7XG4gICAgYWlJZC50ZXh0Q29udGVudCA9IGFpO1xuICB9O1xuXG4gIC8vIENvbG9yIGNlbGxzIG9jY3VwaWVkIGJ5IHNoaXBzIG9uIHRoZSBwbGF5ZXIgYm9hcmRcbiAgY29uc3QgY29sb3JTaGlwQ2VsbHMgPSAocm93LCBjb2x1bW4sIHR5cGUpID0+IHtcbiAgICBjb25zdCBzZWxlY3RDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbZGF0YS1pbmRleC1udW1iZXI9JyR7cm93fS0ke2NvbHVtbn0nXWAsXG4gICAgKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBQcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodHlwZSA9PT0gc2hpcFByb3BlcnRpZXNbaV0udHlwZSkge1xuICAgICAgICBzZWxlY3RDZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGAke3NoaXBQcm9wZXJ0aWVzW2ldLmNvbG9yfWA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIEJ1aWxkIGJvYXJkIGdyaWRzIGJhc2VkIG9uIDJELWFycmF5c1xuICBjb25zdCBidWlsZEdyaWRzID0gKCkgPT4ge1xuICAgIC8vIEJ1aWxkIHBsYXllciBncmlkXG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBnYW1lLnBsYXllcjJkQXJyYXk7XG4gICAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1ib2FyZC1wbGF5ZXInKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBsYXllckJvYXJkW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJywgJ2NlbGwtcGxheWVyJyk7XG4gICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgICAgICBjZWxsLmRhdGFzZXQuaW5kZXhOdW1iZXIgPSBgJHtbaV19LSR7W2pdfWA7XG4gICAgICAgIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNlbGwpO1xuXG4gICAgICAgIC8vIElmIGFycmF5LWluZGV4IGlzIGEgc2hpcCB0aGVuIGFkZCBzaGlwLW5hbWUgYXMgY2xhc3Mgb24gZ3JpZC1jZWxsXG4gICAgICAgIGlmICh0eXBlb2YgcGxheWVyQm9hcmRbaV1bal0gIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgY29uc3Qgcm93ID0gaTtcbiAgICAgICAgICBjb25zdCBjb2x1bW4gPSBqO1xuICAgICAgICAgIGNvbnN0IHNoaXBUeXBlID0gcGxheWVyQm9hcmRbaV1bal1bMV0udHlwZTtcbiAgICAgICAgICBjb2xvclNoaXBDZWxscyhyb3csIGNvbHVtbiwgc2hpcFR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQnVpbGQgYWkgZ3JpZFxuICAgIGNvbnN0IGFpQm9hcmQgPSBnYW1lLmFpMmRBcnJheTtcbiAgICBjb25zdCBhaUJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQtb3Bwb25lbnQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFpQm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWlCb2FyZFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcsICdjZWxsLW9wcG9uZW50Jyk7XG4gICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgICAgICBjZWxsLmRhdGFzZXQuaW5kZXhOdW1iZXIgPSBgJHtbaV19LSR7W2pdfWA7XG4gICAgICAgIGFpQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIFNldCBuYW1lIGluIFwid2FpdGluZyBmb3IgcGxheWVyXCJcbiAgY29uc3Qgc2V0TmFtZVdhaXRpbmcgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2FpdGluZ0ZvclBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItaWQnKTtcbiAgICBjb25zdCBsb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGVyJyk7XG4gICAgd2FpdGluZ0ZvclBsYXllci50ZXh0Q29udGVudCA9IGdhbWUuZ2V0QWN0aXZlUGxheWVyKCkubmFtZTtcblxuICAgIC8vIFNob3cgbG9hZGVyIHdoaWxlIHdhaXRpbmcgZm9yIHBsYXllciB0byBtYWtlIGEgbW92ZVxuICAgIGxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcbiAgfTtcblxuICAvLyBDaGVjayB3aGljaCBwbGF5ZXIgdHVybiBpdCBpc1xuXG4gIHNldFBsYXllck5hbWUocGxheWVyLCBhaSk7XG4gIGJ1aWxkR3JpZHMoKTtcbiAgc2V0TmFtZVdhaXRpbmcoKTtcblxuICAvLyBFdmVudCBsaXN0ZW5lciBmb3IgcGxheWVyIGF0dGFjayBvbiBlbmVteVxuICBjb25zdCBvcHBvbmVudEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQtb3Bwb25lbnQnKTtcblxuICBvcHBvbmVudEJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcblxuICAgIC8vIENvbnZlcnQgY2VsbCBpbmRleE51bWJlciB0byBjb29yZGluYXRlc1xuICAgIGNvbnN0IGluZGV4TnVtYmVyID0gdGFyZ2V0LmRhdGFzZXQuaW5kZXhOdW1iZXI7XG4gICAgY29uc3QgaW5kZXhUb0FycmF5ID0gaW5kZXhOdW1iZXIuc3BsaXQoJy0nKTtcbiAgICBjb25zdCByb3cgPSBOdW1iZXIoaW5kZXhUb0FycmF5WzBdKTtcbiAgICBjb25zdCBjb2x1bW4gPSBOdW1iZXIoaW5kZXhUb0FycmF5WzFdKTtcblxuICAgIC8vIEluaXRpYXRlIHJvdW5kIHdpdGggYXR0YWNrIGZyb20gcGxheWVyXG4gICAgZ2FtZS5wbGF5Um91bmQocm93LCBjb2x1bW4pO1xuXG4gICAgLy8gU2V0IGFwcHJvcHJpYXRlIGljb24gb24gYXR0YWNrZWQgb3Bwb25lbnQgY2VsbCB3ZXRoZXIgYSBoaXQgb3IgYSBtaXNzXG4gICAgaWYgKCFnYW1lLmFpQm9hcmQuaXNIaXQpIHtcbiAgICAgIGNvbnN0IG1pc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIG1pc3MuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgICAgbWlzcy5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuLi9hc3NldHMvaW1nL21pc3Muc3ZnJyk7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQobWlzcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGhpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgaGl0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgaGl0LnNldEF0dHJpYnV0ZSgnc3JjJywgJy4uL2Fzc2V0cy9pbWcvaGl0LnN2ZycpO1xuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGhpdCk7XG4gICAgfVxuXG4gICAgLy8gRGlzYWJsZSBhdHRhY2tlZCBvcHBvbmVudCBjZWxsXG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnYXR0YWNrZWQtb3Bwb25lbnQtY2VsbCcpO1xuXG4gICAgLy8gU2V0IGFwcHJvcHJpYXRlIGljb24gb24gYXR0YWNrZWQgcGxheWVyIGNlbGwgd2V0aGVyIGEgaGl0IG9yIGEgbWlzc1xuICAgIGNvbnN0IGxhdGVzdEFpQXR0YWNrID0gZ2FtZS5haUF0dGFja3NbZ2FtZS5haUF0dGFja3MubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgYWlBdHRhY2tSb3cgPSBsYXRlc3RBaUF0dGFja1swXTtcbiAgICBjb25zdCBhaUF0dGFja0NvbHVtbiA9IGxhdGVzdEFpQXR0YWNrWzFdO1xuICAgIGNvbnN0IGdldFBsYXllckNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFtkYXRhLWluZGV4LW51bWJlcj0nJHthaUF0dGFja1Jvd30tJHthaUF0dGFja0NvbHVtbn0nXWAsXG4gICAgKTtcblxuICAgIGlmICghZ2FtZS5wbGF5ZXJCb2FyZC5pc0hpdCkge1xuICAgICAgY29uc3QgbWlzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgbWlzcy5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgICBtaXNzLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4uL2Fzc2V0cy9pbWcvbWlzcy5zdmcnKTtcbiAgICAgIGdldFBsYXllckNlbGwuYXBwZW5kQ2hpbGQobWlzcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGhpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgaGl0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgaGl0LnNldEF0dHJpYnV0ZSgnc3JjJywgJy4uL2Fzc2V0cy9pbWcvaGl0LnN2ZycpO1xuICAgICAgZ2V0UGxheWVyQ2VsbC5hcHBlbmRDaGlsZChoaXQpO1xuICAgIH1cblxuICAgIC8vIFNob3cgYSB3aW5uZXJcbiAgICBpZiAoZ2FtZS53aW5uZXIpIHtcbiAgICAgIGNvbnN0IHdpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItd29uJyk7XG4gICAgICBjb25zdCB3aW5uZXJJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3aW5uZXItaWQnKTtcbiAgICAgIGNvbnN0IHBsYXllclR1cm4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXR1cm4nKTtcblxuICAgICAgd2lubmVySWQudGV4dENvbnRlbnQgPSBnYW1lLndpbm5lcjtcbiAgICAgIHdpbm5lci5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcbiAgICAgIHBsYXllclR1cm4uY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XG5cbiAgICAgIC8vIERpc2FibGUgYm9hcmQgZm9yIGZ1cnRoZXIgaW5wdXQgd2hlbiB3aW5uZXIgaXMgZm91bmRcbiAgICAgIGNvbnN0IGdhbWVCb2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FtZS1ib2FyZCcpO1xuICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuXG4gICAgICBnYW1lQm9hcmRzLmZvckVhY2goKGJvYXJkKSA9PiB7XG4gICAgICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkLWJvYXJkJyk7XG4gICAgICB9KTtcblxuICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkLWNlbGwnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIEVORCAvL1xuIiwiLy8gU1RBUlQgLy9cblxuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi4vZmFjdG9yaWVzL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuLi9mYWN0b3JpZXMvcGxheWVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIEdhbWUocGxheWVyTmFtZSwgYWlOYW1lKSB7XG4gIC8vIEluaXRpYWxpemUgZ2FtZWJvYXJkIGFuZCBwbGFjZSBzaGlwc1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgY29uc3QgYWlCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcblxuICBjb25zdCBidWlsZFBsYXllckJvYXJkID0gcGxheWVyQm9hcmQuYnVpbGRCb2FyZCgpO1xuICBjb25zdCBidWlsZEFpQm9hcmQgPSBhaUJvYXJkLmJ1aWxkQm9hcmQoKTtcblxuICBjb25zdCBwbGFjZVNoaXBzUGxheWVyID0gcGxheWVyQm9hcmQuZ2V0UmFuZG9tUGxhY2VtZW50KCk7XG4gIGNvbnN0IHBsYWNlU2hpcHNBaSA9IGFpQm9hcmQuZ2V0UmFuZG9tUGxhY2VtZW50KCk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBwbGF5ZXJzIGFuZCBoYW5kbGUgcGxheWVyJ3MgdHVyblxuICBjb25zdCBwbGF5ZXJzID0gW1xuICAgIHtcbiAgICAgIG5hbWU6IHBsYXllck5hbWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBhaU5hbWUsXG4gICAgfSxcbiAgXTtcblxuICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKHBsYXllcnNbMF0ubmFtZSk7XG4gIGNvbnN0IGFpID0gbmV3IFBsYXllcihwbGF5ZXJzWzFdLm5hbWUpO1xuXG4gIGxldCBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXJzWzBdO1xuICBjb25zdCBzd2l0Y2hQbGF5ZXJUdXJuID0gKCkgPT4ge1xuICAgIGlmIChhY3RpdmVQbGF5ZXIgPT09IHBsYXllcnNbMF0pIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcnNbMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcnNbMF07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEFjdGl2ZVBsYXllciA9ICgpID0+IGFjdGl2ZVBsYXllcjtcblxuICAvLyBQbGF5IGEgcm91bmQgb2YgdGhlIGdhbWVcbiAgbGV0IHdpbm5lcjtcbiAgY29uc3QgcGxheVJvdW5kID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgLy8gQ2hlY2sgZm9yIGEgd2lubmVyXG4gICAgY29uc3QgY2hlY2tXaW5uZXIgPSAoKSA9PiB7XG4gICAgICBpZiAocGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgd2lubmVyID0gcGxheWVyc1sxXS5uYW1lO1xuICAgICAgfSBlbHNlIGlmIChhaUJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgIHdpbm5lciA9IHBsYXllcnNbMF0ubmFtZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKGdldEFjdGl2ZVBsYXllcigpID09PSBwbGF5ZXJzWzBdKSB7XG4gICAgICBwbGF5ZXIuYXR0YWNrU3F1YXJlKHJvdywgY29sdW1uLCBhaUJvYXJkKTtcbiAgICAgIGNoZWNrV2lubmVyKCk7XG4gICAgfVxuXG4gICAgc3dpdGNoUGxheWVyVHVybigpO1xuXG4gICAgLy8gTGV0IEFJIGF0dGFjayBwbGF5ZXIgYm9hcmQgd2l0aCBcInRoaW5raW5nXCIgZGVsYXlcbiAgICBpZiAoZ2V0QWN0aXZlUGxheWVyKCkgPT09IHBsYXllcnNbMV0pIHtcbiAgICAgIGNvbnN0IGFpQXR0YWNrID0gKCkgPT4ge1xuICAgICAgICBhaS5hdHRhY2tSYW5kb21TcXVhcmUocGxheWVyQm9hcmQpO1xuICAgICAgICBpZiAoYWkuYWxyZWFkeUF0dGFja2VkKSBhaUF0dGFjaygpO1xuICAgICAgfTtcbiAgICAgIGFpQXR0YWNrKCk7XG4gICAgICBjaGVja1dpbm5lcigpO1xuICAgIH1cblxuICAgIHN3aXRjaFBsYXllclR1cm4oKTtcblxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgcGxheWVyQm9hcmQsXG4gICAgICBhaUJvYXJkLFxuICAgICAgcGxheWVyLFxuICAgICAgYWksXG4gICAgICBwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSxcbiAgICAgIGFpQm9hcmQuYWxsU2hpcHNTdW5rKCksXG4gICAgICB3aW5uZXIsXG4gICAgKTtcbiAgfTtcbiAgcmV0dXJuIHtcbiAgICBwbGF5ZXJCb2FyZCxcbiAgICBhaUJvYXJkLFxuICAgIHBsYXllckF0dGFja3M6IHBsYXllci5hdHRhY2tzLFxuICAgIGFpQXR0YWNrczogYWkuYXR0YWNrcyxcbiAgICBncmlkU2l6ZTogcGxheWVyQm9hcmQuZ3JpZFNpemUsXG4gICAgcGxheWVyMmRBcnJheTogcGxheWVyQm9hcmQuYm9hcmQsXG4gICAgYWkyZEFycmF5OiBhaUJvYXJkLmJvYXJkLFxuICAgIGdldEFjdGl2ZVBsYXllcixcbiAgICBwbGF5Um91bmQsXG4gICAgd2lubmVyLFxuICB9O1xufVxuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmV4cG9ydCBjb25zdCBzaGlwUHJvcGVydGllcyA9IFtcbiAge1xuICAgIHR5cGU6ICdDYXJyaWVyJyxcbiAgICBsZW5ndGg6IDUsXG4gICAgY29sb3I6ICdyZ2IoMjUyLCA0LCA0LCAuNCknLFxuICB9LFxuICB7XG4gICAgdHlwZTogJ0JhdHRsZXNoaXAnLFxuICAgIGxlbmd0aDogNCxcbiAgICBjb2xvcjogJ3JnYig0LCAxNDAsIDQsIC40KScsXG4gIH0sXG4gIHtcbiAgICB0eXBlOiAnRGVzdHJveWVyJyxcbiAgICBsZW5ndGg6IDMsXG4gICAgY29sb3I6ICdyZ2IoNCwgNCwgMjUyLCAuNCknLFxuICB9LFxuICB7XG4gICAgdHlwZTogJ1N1Ym1hcmluZScsXG4gICAgbGVuZ3RoOiAzLFxuICAgIGNvbG9yOiAncmdiKDI1MiwgMjUxLCAzMiwgLjQpJyxcbiAgfSxcbiAge1xuICAgIHR5cGU6ICdQYXRyb2wgQm9hdCcsXG4gICAgbGVuZ3RoOiAyLFxuICAgIGNvbG9yOiAncmdiKDEyLCA0LCAxMiwgLjQpJyxcbiAgfSxcbl07XG4iLCIvLyBTVEFSVCAvL1xuXG5pbXBvcnQgeyBzaGlwUHJvcGVydGllcyB9IGZyb20gJy4uL2RhdGEvc2hpcFByb3BlcnRpZXMnO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5cbmV4cG9ydCBjbGFzcyBHYW1lYm9hcmQge1xuICBib2FyZDtcbiAgbWlzc2VkU2hvdHM7XG4gIHN1bmtlblNoaXBzO1xuICBncmlkU2l6ZSA9IDEwO1xuICBpc0hpdDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJvYXJkID0gW107IC8vIEludGVyZmFjZVxuICAgIHRoaXMubWlzc2VkU2hvdHMgPSBbXTsgLy8gSW50ZXJmYWNlXG4gICAgdGhpcy5zdW5rZW5TaGlwcyA9IFtdOyAvLyBJbnRlcmZhY2VcbiAgfVxuXG4gIC8vIEdlbmVyYXRlIHRoZSBnYW1lIGJvYXJkIGFzIGEgMkQtYXJyYXlcbiAgYnVpbGRCb2FyZCgpIHtcbiAgICBsZXQgdmFsdWUgPSAxO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdyaWRTaXplOyBpKyspIHtcbiAgICAgIHRoaXMuYm9hcmRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ncmlkU2l6ZTsgaisrKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbaV1bal0gPSB2YWx1ZSsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSB0b3RhbCBmbGVldCBzaXplIGNvdW50ZWQgYXMgdG90YWwgbnVtYmVyIG9mIHNxdWFyZXMgb2NjdXBpZWRcbiAgLy8gYnkgdGhlIHNoaXBzIG9uIHRoZSBnYW1lLXJlYWR5IGJvYXJkXG4gIGZsZWV0KCkge1xuICAgIGxldCBmbGVldFNpemUgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZsZWV0U2l6ZSArPSBzaGlwUHJvcGVydGllc1tpXS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBmbGVldFNpemU7XG4gIH1cblxuICAvLyBDcmVhdGUgc2hpcHMgYnkgY2FsbGluZyBTaGlwIGNsYXNzXG4gIGNyZWF0ZVNoaXBzKCkge1xuICAgIGNvbnN0IHByb3BzID0gc2hpcFByb3BlcnRpZXM7XG4gICAgbGV0IHNoaXBzQXJyYXkgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGlzVmVydGljYWwgPSBbdHJ1ZSwgZmFsc2VdW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSldO1xuICAgICAgY29uc3QgdmVzc2VsID0gbmV3IFNoaXAocHJvcHNbaV0udHlwZSwgcHJvcHNbaV0ubGVuZ3RoLCBpc1ZlcnRpY2FsKTtcbiAgICAgIHNoaXBzQXJyYXkucHVzaCh2ZXNzZWwpO1xuICAgIH1cbiAgICByZXR1cm4gc2hpcHNBcnJheTtcbiAgfVxuXG4gIHBsYWNlU2hpcHMoc2hpcCwgcm93LCBjb2x1bW4sIHZlcnRpY2FsKSB7XG4gICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZFtyb3cgKyBpXVtjb2x1bW5dID0gW2ksIHNoaXBdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbHVtbiArIGldID0gW2ksIHNoaXBdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFJhbmRvbVBsYWNlbWVudCgpIHtcbiAgICAvLyBHZXQgcmV0dXJuZWQgYXJyYXkgZnJvbSAnY3JlYXRlU2hpcHMoKSdcbiAgICBjb25zdCBzaGlwcyA9IHRoaXMuY3JlYXRlU2hpcHMoKTtcblxuICAgIC8vIENoZWNrIHRvIHNlZSB0aGF0IGJvYXJkIGlzIGVtcHR5IChpLmUuIHJlYWR5IGZvciBhIG5ldyBnYW1lKVxuICAgIGlmICghdGhpcy5pc0JvYXJkRW1wdHkpIHJldHVybjtcblxuICAgIC8vIEZvciBldmVyeSBzaGlwIGluIGFycmF5XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gU2VsZWN0IHJhbmRvbSBzdGFydC1jb29yZGluYXRlXG4gICAgICBjb25zdCByYW5kWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZ3JpZFNpemUpO1xuICAgICAgY29uc3QgcmFuZFkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmdyaWRTaXplKTtcbiAgICAgIC8vIFJlYWQgb3JpZW50YXRpb24gb2Ygc2hpcFxuICAgICAgY29uc3QgdmVydGljYWwgPSBzaGlwc1tpXS52ZXJ0aWNhbDtcblxuICAgICAgLy8gQ2hlY2sgaWYgcGxhY2VtZW50IGlzIGFsbG93ZWQgLSBvdGhlcndpc2UgcmUtc3RhcnQgbG9vcCBmcm9tIGN1cnJlbnQgaW5kZXggYWdhaW5cbiAgICAgIGlmICghdGhpcy5wbGFjZW1lbnRBbGxvd2VkKHNoaXBzW2ldLCByYW5kWCwgcmFuZFksIHZlcnRpY2FsKSkge1xuICAgICAgICBpLS07XG4gICAgICB9IGVsc2UgdGhpcy5wbGFjZVNoaXBzKHNoaXBzW2ldLCByYW5kWCwgcmFuZFksIHZlcnRpY2FsKTtcbiAgICB9XG4gIH1cblxuICBwbGFjZW1lbnRBbGxvd2VkKHNoaXAsIHJvdywgY29sdW1uLCB2ZXJ0aWNhbCkge1xuICAgIC8vIENoZWNrIGlmIHBsYWNlbWVudCBvZiBzaGlwIGlzIGZ1bGx5IG9yIHBhcnRseSBvdXRzaWRlIGdyaWQgcGVyaW1ldGVyXG4gICAgaWYgKFxuICAgICAgcm93ID4gdGhpcy5ncmlkU2l6ZSB8fFxuICAgICAgY29sdW1uID4gdGhpcy5ncmlkU2l6ZSB8fFxuICAgICAgcm93ICsgc2hpcC5sZW5ndGggPiB0aGlzLmdyaWRTaXplIHx8XG4gICAgICBjb2x1bW4gKyBzaGlwLmxlbmd0aCA+IHRoaXMuZ3JpZFNpemVcbiAgICApXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBDaGVjayBpZiBhIGdpdmVuIGNvb3JkaW5hdGUgaXMgYWxyZWFkeSBvY2N1cGllZFxuICAgIGlmICh2ZXJ0aWNhbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFtyb3cgKyBpXVtjb2x1bW5dICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW3Jvd11bY29sdW1uICsgaV0gIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbikge1xuICAgIGxldCBjb29yZGluYXRlID0gdGhpcy5ib2FyZFtyb3ddW2NvbHVtbl07XG5cbiAgICBpZiAodHlwZW9mIGNvb3JkaW5hdGUgIT09ICdudW1iZXInKSB7XG4gICAgICBjb29yZGluYXRlWzFdLmhpdChjb29yZGluYXRlWzBdKTtcbiAgICAgIHRoaXMuaXNIaXQgPSB0cnVlO1xuICAgICAgaWYgKGNvb3JkaW5hdGVbMV0uaXNTdW5rKCkpIHtcbiAgICAgICAgdGhpcy5zdW5rZW5TaGlwcy5wdXNoKGNvb3JkaW5hdGVbMV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pc3NlZFNob3RzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICB0aGlzLmlzSGl0ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGlmICh0aGlzLnN1bmtlblNoaXBzLmxlbmd0aCA8IDEpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzQm9hcmRFbXB0eSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JpZFNpemU7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmdyaWRTaXplOyBqKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW2ldW2pdICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIFVzZSB0aGlzIHRvIHZlcmlmeSBjb3JyZWN0IHBsYWNlbWVudCBvZiBzaGlwc1xuICBjb3VudE9jY3VwaWVkU3F1YXJlcygpIHtcbiAgICBjb25zdCBhdmFpbGFibGVTcXVhcmVzID0gdGhpcy5ncmlkU2l6ZSAqIHRoaXMuZ3JpZFNpemU7XG4gICAgY29uc3QgZmxlZXRTaXplID0gdGhpcy5mbGVldCgpO1xuICAgIHJldHVybiBhdmFpbGFibGVTcXVhcmVzIC0gKGF2YWlsYWJsZVNxdWFyZXMgLSBmbGVldFNpemUpO1xuICB9XG59XG5cbi8vIEVORCAvL1xuIiwiLy8gU1RBUlQgLy9cblxuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4uL2NvbnRyb2xsZXIvZ2FtZUNvbnRyb2xsZXInO1xuXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgYXR0YWNrcztcbiAgYWxyZWFkeUF0dGFja2VkO1xuXG4gIGNvbnN0cnVjdG9yKHBsYXllck5hbWUpIHtcbiAgICB0aGlzLnBsYXllck5hbWUgPSBwbGF5ZXJOYW1lO1xuICAgIHRoaXMuYXR0YWNrcyA9IFtdO1xuICB9XG5cbiAgYXR0YWNrU3F1YXJlKHJvdywgY29sdW1uLCBlbmVteUJvYXJkKSB7XG4gICAgaWYgKCF0aGlzLmhhc0JlZW5BdHRhY2tlZChyb3csIGNvbHVtbikpIHtcbiAgICAgIHRoaXMuYXR0YWNrcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGF0dGFja1JhbmRvbVNxdWFyZShwbGF5ZXJCb2FyZCkge1xuICAgIGlmICh0aGlzLmF0dGFja3MubGVuZ3RoID49IDEwMCkgcmV0dXJuO1xuICAgIGNvbnN0IHJhbmRSb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwbGF5ZXJCb2FyZC5ncmlkU2l6ZSk7XG4gICAgY29uc3QgcmFuZENvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBsYXllckJvYXJkLmdyaWRTaXplKTtcblxuICAgIGlmICghdGhpcy5oYXNCZWVuQXR0YWNrZWQocmFuZFJvdywgcmFuZENvbHVtbikpIHtcbiAgICAgIHRoaXMuYXR0YWNrcy5wdXNoKFtyYW5kUm93LCByYW5kQ29sdW1uXSk7XG4gICAgICBwbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRSb3csIHJhbmRDb2x1bW4pO1xuICAgICAgdGhpcy5hbHJlYWR5QXR0YWNrZWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hbHJlYWR5QXR0YWNrZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGhhc0JlZW5BdHRhY2tlZChyb3csIGNvbHVtbikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hdHRhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5hdHRhY2tzW2ldWzBdID09PSByb3cgJiYgdGhpcy5hdHRhY2tzW2ldWzFdID09PSBjb2x1bW4pXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gRU5EIC8vXG4iLCIvLyBTVEFSVCAvL1xuXG5leHBvcnQgY2xhc3MgU2hpcCB7XG4gIHR5cGU7XG4gIGxlbmd0aDtcbiAgdmVydGljYWwgPSBmYWxzZTtcbiAgaGl0cztcblxuICBjb25zdHJ1Y3Rvcih0eXBlLCBsZW5ndGgsIHZlcnRpY2FsKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnZlcnRpY2FsID0gdmVydGljYWw7XG4gICAgdGhpcy5oaXRzID0gW107XG4gIH1cblxuICBoaXQocG9zaXRpb24pIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmhpdHMuaW5jbHVkZXMocG9zaXRpb24pIHx8XG4gICAgICBwb3NpdGlvbiA8IDAgfHxcbiAgICAgIHBvc2l0aW9uID4gdGhpcy5sZW5ndGggLSAxXG4gICAgKVxuICAgICAgcmV0dXJuO1xuICAgIHRoaXMuaGl0cy5wdXNoKHBvc2l0aW9uKTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRzLmxlbmd0aCA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0ICcuL2h0bWwvaW5kZXguaHRtbCc7XG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9mYWN0b3JpZXMvc2hpcCc7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2ZhY3Rvcmllcy9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9mYWN0b3JpZXMvcGxheWVyJztcbmltcG9ydCB7IEdhbWUgfSBmcm9tICcuL2NvbnRyb2xsZXIvZ2FtZUNvbnRyb2xsZXInO1xuaW1wb3J0IHsgRGlzcGxheSB9IGZyb20gJy4vY29udHJvbGxlci9kaXNwbGF5Q29udHJvbGxlcic7XG5cbi8vIFNldCBjb3B5cmlnaHQgeWVhciBhdXRvbWF0aWNhbGx5XG5jb25zdCBjb3B5cmlnaHRTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvcHlyaWdodC1zcGFuJyk7XG5jb3B5cmlnaHRTcGFuLnRleHRDb250ZW50ID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXG4vLyBTaG93IG1vZGFsIHdpdGggcGFnZSBsb2FkXG5jb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1uYW1lJyk7XG5jb25zdCBtYWluR2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLWdhbWUnKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIG1haW5HYW1lLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgbW9kYWwuc2hvd01vZGFsKCk7XG4gIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbn0pO1xuXG4vLyBTdGFydCBnYW1lIHdoZW4gcGxheWVyIG5hbWUgaGFzIGJlZW4gZW50ZXJlZFxuY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtYnRuJyk7XG5jb25zdCBhbGlhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItbmFtZScpO1xuXG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbW9kYWwuY2xvc2UoKTtcbiAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICBtYWluR2FtZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cbiAgRGlzcGxheShhbGlhcy52YWx1ZSk7XG59KTtcblxuLy8gLi4uIG9yIHByZXNzICdlbnRlcidcbmFsaWFzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHN0YXJ0QnRuLmNsaWNrKCk7XG59KTtcblxuLy8gU2hvdyBjb25maXJtYXRpb24gbW9kYWwgd2hlbiB3YW50aW5nIGEgbmV3IGdhbWVcbmNvbnN0IG5ld0dhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LWdhbWUtYnRuJyk7XG5jb25zdCBtb2RhbENvbmZpcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY29uZmlybScpO1xuXG5uZXdHYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb25zdCBtb2RhbENvbmZpcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY29uZmlybScpO1xuICBtb2RhbENvbmZpcm0uc2hvd01vZGFsKCk7XG4gIG1vZGFsQ29uZmlybS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG59KTtcblxuLy8gV2hlbiByZWdyZXR0aW5nIHRvIHN0YXJ0IGEgbmV3IGdhbWVcbmNvbnN0IGNvbmZpcm1ObyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuby1idG4nKTtcblxuY29uZmlybU5vLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBtb2RhbENvbmZpcm0uY2xvc2UoKTtcbiAgbW9kYWxDb25maXJtLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbn0pO1xuXG4vLyBTaG93IGluZm8gbW9kYWwgb24gaG92ZXJcbmNvbnN0IGluZm9JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8taWNvbicpO1xuY29uc3QgaW5mb01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWluZm8nKTtcblxuaW5mb0ljb24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICBpbmZvTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xufSk7XG5cbmluZm9JY29uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICBpbmZvTW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xufSk7XG5cbmluZm9JY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4ge1xuICBpbmZvTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xufSk7XG5cbi8vIEVORCAvL1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9odG1sLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltZy9naXRodWItbG9nby5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1nL3NhaWxvci5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1nL2luZm8uc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltZy9oaXQuc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzRfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltZy9taXNzLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0hUTUxfTE9BREVSX0lNUE9SVF81X19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWcvcGlyYXRlLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xuLy8gTW9kdWxlXG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzBfX18pO1xudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzFfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF8xX19fKTtcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8yX19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfMl9fXyk7XG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzNfX18pO1xudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzRfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF80X19fKTtcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF81X19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfNV9fXyk7XG52YXIgY29kZSA9IFwiPCFkb2N0eXBlIGh0bWw+XFxuPGh0bWwgbGFuZz1cXFwiZW5cXFwiPlxcbiAgPGhlYWQ+XFxuICAgIDxtZXRhIGNoYXJzZXQ9XFxcIlVURi04XFxcIiAvPlxcbiAgICA8bWV0YSBuYW1lPVxcXCJ2aWV3cG9ydFxcXCIgY29udGVudD1cXFwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFxcXCIgLz5cXG4gICAgPHRpdGxlPkJhdHRsZXNoaXA8L3RpdGxlPlxcbiAgICA8bGlua1xcbiAgICAgIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9T3JiaXRyb24mZGlzcGxheT1zd2FwXFxcIlxcbiAgICAgIHJlbD1cXFwic3R5bGVzaGVldFxcXCJcXG4gICAgLz5cXG4gICAgPGxpbmtcXG4gICAgICByZWw9XFxcInN0eWxlc2hlZXRcXFwiXFxuICAgICAgaHJlZj1cXFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzQuNy4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzc1xcXCJcXG4gICAgLz5cXG4gICAgPGxpbmtcXG4gICAgICBocmVmPVxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUludGVyJmZhbWlseT1QbGF5ZmFpcitEaXNwbGF5JmRpc3BsYXk9c3dhcFxcXCJcXG4gICAgICByZWw9XFxcInN0eWxlc2hlZXRcXFwiXFxuICAgIC8+XFxuICAgIDxsaW5rXFxuICAgICAgaHJlZj1cXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1DYXZlYXQmZGlzcGxheT1zd2FwXFxcIlxcbiAgICAgIHJlbD1cXFwic3R5bGVzaGVldFxcXCJcXG4gICAgLz5cXG4gICAgPGxpbmtcXG4gICAgICBocmVmPVxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUx1Y2tpZXN0K0d1eSZkaXNwbGF5PXN3YXBcXFwiXFxuICAgICAgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIlxcbiAgICAvPlxcbiAgICA8bGlua1xcbiAgICAgIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TW9ub3RvbiZkaXNwbGF5PXN3YXBcXFwiXFxuICAgICAgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIlxcbiAgICAvPlxcbiAgPC9oZWFkPlxcbiAgPGJvZHk+XFxuICAgIDxkaXYgY2xhc3M9XFxcImRldmVsb3BlclxcXCI+XFxuICAgICAgPHAgY2xhc3M9XFxcImNvcHlyaWdodFxcXCI+JmNvcHk8c3BhbiBpZD1cXFwiY29weXJpZ2h0LXNwYW5cXFwiPiAyMDIzPC9zcGFuPjwvcD5cXG4gICAgICA8YVxcbiAgICAgICAgY2xhc3M9XFxcImdpdGh1Yi1saW5rXFxcIlxcbiAgICAgICAgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL3Jhc211c2hhaXNsdW5kXFxcIlxcbiAgICAgICAgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiXFxuICAgICAgICA+UmFzbXVzIEguXFxuICAgICAgICA8aW1nXFxuICAgICAgICAgIHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8wX19fICsgXCJcXFwiXFxuICAgICAgICAgIGNsYXNzPVxcXCJnaXRodWItbG9nb1xcXCJcXG4gICAgICAgICAgYWx0PVxcXCJnaXRodWIgbG9nb1xcXCJcXG4gICAgICAvPjwvYT5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImhlYWRlclxcXCI+XFxuICAgICAgPHAgY2xhc3M9XFxcInRpdGxlXFxcIj5CQVRUTEVTSElQPC9wPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpYWxvZyBjbGFzcz1cXFwibW9kYWwtbmFtZVxcXCI+XFxuICAgICAgPGxhYmVsIGNsYXNzPVxcXCJtb2RhbC1sYWJlbFxcXCIgZm9yPVxcXCJwbGF5ZXItbmFtZVxcXCI+RW50ZXIgeW91ciBnYW1lIGFsaWFzPC9sYWJlbD5cXG4gICAgICA8aW5wdXRcXG4gICAgICAgIGlkPVxcXCJwbGF5ZXItbmFtZVxcXCJcXG4gICAgICAgIHR5cGU9XFxcInRleHRcXFwiXFxuICAgICAgICBuYW1lPVxcXCJwbGF5ZXJfbmFtZVxcXCJcXG4gICAgICAgIG1heGxlbmd0aD1cXFwiMjBcXFwiXFxuICAgICAgICBtaW5sZW5ndGg9XFxcIjFcXFwiXFxuICAgICAgICBwbGFjZWhvbGRlcj1cXFwiRW50ZXIgYWxpYXNcXFwiXFxuICAgICAgICByZXF1aXJlZFxcbiAgICAgIC8+XFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuXFxcIiBpZD1cXFwic3RhcnQtYnRuXFxcIiB0eXBlPVxcXCJzdWJtaXRcXFwiPlNUQVJUPC9idXR0b24+XFxuICAgIDwvZGlhbG9nPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtYWluLWdhbWVcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImdhbWUtY29udGFpbmVyXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInBsYXllci10dXJuXFxcIj5cXG4gICAgICAgICAgPHAgY2xhc3M9XFxcImdhbWUtdGV4dFxcXCIgaWQ9XFxcInBsYXllci10dXJuXFxcIj5cXG4gICAgICAgICAgICBXYWl0aW5nIGZvciA8c3BhbiBpZD1cXFwicGxheWVyLWlkXFxcIj48L3NwYW4+XFxuICAgICAgICAgIDwvcD5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwibG9hZGVyIGludmlzaWJsZVxcXCI+PC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxwIGNsYXNzPVxcXCJnYW1lLXRleHQgaW52aXNpYmxlXFxcIiBpZD1cXFwicGxheWVyLXdvblxcXCI+XFxuICAgICAgICAgIDxzcGFuIGlkPVxcXCJ3aW5uZXItaWRcXFwiPjwvc3Bhbj4gd2lucyFcXG4gICAgICAgIDwvcD5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImJvYXJkLWNvbnRhaW5lclxcXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImJvYXJkXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJib2FyZC1pbmZvXFxcIj5cXG4gICAgICAgICAgICAgIDxpbWdcXG4gICAgICAgICAgICAgICAgY2xhc3M9XFxcImljb24gcGxheWVyLWljb25cXFwiXFxuICAgICAgICAgICAgICAgIHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8xX19fICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgIGFsdD1cXFwicGxheWVyIGljb25cXFwiXFxuICAgICAgICAgICAgICAvPlxcbiAgICAgICAgICAgICAgPHAgaWQ9XFxcInlvdXItYm9hcmRcXFwiPjwvcD5cXG4gICAgICAgICAgICAgIDxpbWdcXG4gICAgICAgICAgICAgICAgY2xhc3M9XFxcImljb24gaW5mby1pY29uXFxcIlxcbiAgICAgICAgICAgICAgICBzcmM9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMl9fXyArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICBhbHQ9XFxcImluZm9ybWF0aW9uXFxcIlxcbiAgICAgICAgICAgICAgLz5cXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWluZm8gaGlkZVxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxlZ2VuZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic3F1YXJlIHNxdWFyZS01XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPiZ0aW1lczU8L3A+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0LTFcXFwiPkNhcnJpZXI8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNxdWFyZSBzcXVhcmUtNFxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj4mdGltZXM0PC9wPlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+QmF0dGxlc2hpcDwvcD5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxlZ2VuZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic3F1YXJlIHNxdWFyZS0zLTFcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+JnRpbWVzMzwvcD5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPkRlc3Ryb3llcjwvcD5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxlZ2VuZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic3F1YXJlIHNxdWFyZS0zLTJcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+JnRpbWVzMzwvcD5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPlN1Ym1hcmluZTwvcD5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxlZ2VuZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic3F1YXJlIHNxdWFyZS0yXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPiZ0aW1lczI8L3A+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj5QYXRyb2wgQm9hdDwvcD5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxlZ2VuZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgPGltZ1xcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcImxlZ2VuZC1pY29uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzNfX18gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cXFwiZXhwbG9zaW9uXFxcIlxcbiAgICAgICAgICAgICAgICAgIC8+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj5IaXQ8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxpbWdcXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJsZWdlbmQtaWNvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF80X19fICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgICAgICBhbHQ9XFxcIndhdmVzXFxcIlxcbiAgICAgICAgICAgICAgICAgIC8+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj5NaXNzPC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdhbWUtYm9hcmQgZ2FtZS1ib2FyZC1wbGF5ZXJcXFwiPjwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYm9hcmRcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImJvYXJkLWluZm9cXFwiPlxcbiAgICAgICAgICAgICAgPGltZ1xcbiAgICAgICAgICAgICAgICBjbGFzcz1cXFwiaWNvbiBvcHBvbmVudC1pY29uXFxcIlxcbiAgICAgICAgICAgICAgICBzcmM9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfNV9fXyArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICBhbHQ9XFxcIm9wcG9uZW50IGljb25cXFwiXFxuICAgICAgICAgICAgICAvPlxcbiAgICAgICAgICAgICAgPHAgaWQ9XFxcIm9wcG9uZW50LWJvYXJkXFxcIj48L3A+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ2FtZS1ib2FyZCBnYW1lLWJvYXJkLW9wcG9uZW50XFxcIj48L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XFxcImJ0blxcXCIgaWQ9XFxcIm5ldy1nYW1lLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIj5ORVcgR0FNRTwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpYWxvZyBjbGFzcz1cXFwibW9kYWwtY29uZmlybVxcXCI+XFxuICAgICAgPGgzPkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBzdGFydCBhIG5ldyBnYW1lPzwvaDM+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnV0dG9uc1xcXCI+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG5cXFwiIGlkPVxcXCJ5ZXMtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiPllFUzwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuXFxcIiBpZD1cXFwibm8tYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiPk5PPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGlhbG9nPlxcbiAgPC9ib2R5PlxcbjwvaHRtbD5cXG5cIjtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGNvZGU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVyc2NvcmUtZGFuZ2xlLCBuby1wYXJhbS1yZWFzc2lnblxuXG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMubWF5YmVOZWVkUXVvdGVzICYmIC9bXFx0XFxuXFxmXFxyIFwiJz08PmBdLy50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybCwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbIkdhbWUiLCJzaGlwUHJvcGVydGllcyIsIkRpc3BsYXkiLCJwbGF5ZXJOYW1lIiwicGxheWVyIiwiYWkiLCJnYW1lIiwic2V0UGxheWVyTmFtZSIsInBsYXllcklkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWlJZCIsInRleHRDb250ZW50IiwiY29sb3JTaGlwQ2VsbHMiLCJyb3ciLCJjb2x1bW4iLCJ0eXBlIiwic2VsZWN0Q2VsbCIsImkiLCJsZW5ndGgiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwiYnVpbGRHcmlkcyIsInBsYXllckJvYXJkIiwicGxheWVyMmRBcnJheSIsInBsYXllckJvYXJkQ29udGFpbmVyIiwiaiIsImNlbGwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwiZGF0YXNldCIsImluZGV4TnVtYmVyIiwiYXBwZW5kQ2hpbGQiLCJzaGlwVHlwZSIsImFpQm9hcmQiLCJhaTJkQXJyYXkiLCJhaUJvYXJkQ29udGFpbmVyIiwic2V0TmFtZVdhaXRpbmciLCJ3YWl0aW5nRm9yUGxheWVyIiwibG9hZGVyIiwiZ2V0QWN0aXZlUGxheWVyIiwibmFtZSIsInJlbW92ZSIsIm9wcG9uZW50Qm9hcmQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwiaW5kZXhUb0FycmF5Iiwic3BsaXQiLCJOdW1iZXIiLCJwbGF5Um91bmQiLCJpc0hpdCIsIm1pc3MiLCJoaXQiLCJsYXRlc3RBaUF0dGFjayIsImFpQXR0YWNrcyIsImFpQXR0YWNrUm93IiwiYWlBdHRhY2tDb2x1bW4iLCJnZXRQbGF5ZXJDZWxsIiwid2lubmVyIiwid2lubmVySWQiLCJwbGF5ZXJUdXJuIiwiZ2FtZUJvYXJkcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjZWxscyIsImZvckVhY2giLCJib2FyZCIsIkdhbWVib2FyZCIsIlBsYXllciIsImFpTmFtZSIsImJ1aWxkUGxheWVyQm9hcmQiLCJidWlsZEJvYXJkIiwiYnVpbGRBaUJvYXJkIiwicGxhY2VTaGlwc1BsYXllciIsImdldFJhbmRvbVBsYWNlbWVudCIsInBsYWNlU2hpcHNBaSIsInBsYXllcnMiLCJhY3RpdmVQbGF5ZXIiLCJzd2l0Y2hQbGF5ZXJUdXJuIiwiY2hlY2tXaW5uZXIiLCJhbGxTaGlwc1N1bmsiLCJhdHRhY2tTcXVhcmUiLCJhaUF0dGFjayIsImF0dGFja1JhbmRvbVNxdWFyZSIsImFscmVhZHlBdHRhY2tlZCIsImNvbnNvbGUiLCJsb2ciLCJwbGF5ZXJBdHRhY2tzIiwiYXR0YWNrcyIsImdyaWRTaXplIiwiU2hpcCIsIm1pc3NlZFNob3RzIiwic3Vua2VuU2hpcHMiLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwiZmxlZXQiLCJmbGVldFNpemUiLCJjcmVhdGVTaGlwcyIsInByb3BzIiwic2hpcHNBcnJheSIsImlzVmVydGljYWwiLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJ2ZXNzZWwiLCJwdXNoIiwicGxhY2VTaGlwcyIsInNoaXAiLCJ2ZXJ0aWNhbCIsInNoaXBzIiwiaXNCb2FyZEVtcHR5IiwicmFuZFgiLCJmbG9vciIsInJhbmRZIiwicGxhY2VtZW50QWxsb3dlZCIsInJlY2VpdmVBdHRhY2siLCJjb29yZGluYXRlIiwiaXNTdW5rIiwiY291bnRPY2N1cGllZFNxdWFyZXMiLCJhdmFpbGFibGVTcXVhcmVzIiwiZW5lbXlCb2FyZCIsImhhc0JlZW5BdHRhY2tlZCIsInJhbmRSb3ciLCJyYW5kQ29sdW1uIiwiaGl0cyIsInBvc2l0aW9uIiwiaW5jbHVkZXMiLCJjb3B5cmlnaHRTcGFuIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwibW9kYWwiLCJtYWluR2FtZSIsIndpbmRvdyIsInNob3dNb2RhbCIsInN0YXJ0QnRuIiwiYWxpYXMiLCJjbG9zZSIsImtleUNvZGUiLCJjbGljayIsIm5ld0dhbWUiLCJtb2RhbENvbmZpcm0iLCJjb25maXJtTm8iLCJpbmZvSWNvbiIsImluZm9Nb2RhbCIsInRvZ2dsZSJdLCJzb3VyY2VSb290IjoiIn0=