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
  const playerBoard = game.getPlayerBoard();
  const aiBoard = game.getAiBoard();
  const getPlayer = game.getPlayer();
  const getAi = game.getAi();

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
    const player2dArray = playerBoard.board;
    const playerBoardContainer = document.querySelector('.game-board-player');
    for (let i = 0; i < player2dArray.length; i++) {
      for (let j = 0; j < player2dArray[i].length; j++) {
        const cell = document.createElement('button');
        cell.classList.add('cell', 'cell-player');
        cell.setAttribute('type', 'button');
        cell.dataset.indexNumber = `${[i]}-${[j]}`;
        playerBoardContainer.appendChild(cell);

        // If array-index is a ship then add ship-name as class on grid-cell
        if (typeof player2dArray[i][j] !== 'number') {
          const row = i;
          const column = j;
          const shipType = player2dArray[i][j][1].type;
          colorShipCells(row, column, shipType);
        }
      }
    }

    // Build ai grid
    const ai2dArray = aiBoard.board;
    const aiBoardContainer = document.querySelector('.game-board-opponent');
    for (let i = 0; i < ai2dArray.length; i++) {
      for (let j = 0; j < ai2dArray[i].length; j++) {
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
  setPlayerName(player, ai);
  buildGrids();
  setNameWaiting();
  const boardAccessibility = status => {
    // Disable board for further input when winner is found or ai is to make an attack
    const gameBoards = document.querySelectorAll('.game-board');
    const aiBoard = document.querySelector('.game-board-opponent');
    const cells = document.querySelectorAll('.cell');
    if (status === 'waiting') {
      aiBoard.classList.add('disabled-board');
    }
    gameBoards.forEach(board => {
      if (status === 'disable') {
        board.classList.add('disabled-board');
      } else if (status === 'enable') {
        board.classList.remove('disabled-board');
      }
    });
    cells.forEach(cell => {
      if (status === 'disable') {
        cell.classList.add('disabled-cell');
      } else if (status === 'enable') {
        cell.classList.remove('disabled-cell');
      }
    });
  };

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
    if (!aiBoard.isHit) {
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
    const ai = game.getAi();

    // Set appropriate icon on attacked player cell wether a hit or a miss
    const showAiAttack = () => {
      const latestAiAttack = ai.attacks[ai.attacks.length - 1];
      const aiAttackRow = latestAiAttack[0];
      const aiAttackColumn = latestAiAttack[1];
      const getPlayerCell = document.querySelector(`[data-index-number='${aiAttackRow}-${aiAttackColumn}']`);
      if (!playerBoard.isHit) {
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
      boardAccessibility('enable');
    };

    // Show a winner
    const getWinner = game.getWinner();
    const winner = document.querySelector('#player-won');
    const winnerId = document.querySelector('#winner-id');
    const playerTurn = document.querySelector('.player-turn');
    if (getWinner) {
      winnerId.textContent = getWinner;
      winner.classList.remove('invisible');
      playerTurn.classList.add('invisible');
      boardAccessibility('disable');
    } else {
      winner.classList.add('invisible');
      playerTurn.classList.remove('invisible');

      // Prevent new player attack before ai has attacked
      boardAccessibility('waiting');

      // Makes random delay in ai decision
      const aiThinkTime = Math.random() * 3000;
      console.log(aiThinkTime);
      setTimeout(showAiAttack, aiThinkTime);
    }
  });

  // When confirming a new game
  const modalConfirm = document.querySelector('.modal-confirm');
  const confirmYes = document.querySelector('#yes-btn');
  const playerBoardContainer = document.querySelector('.game-board-player');
  const aiBoardContainer = document.querySelector('.game-board-opponent');
  confirmYes.addEventListener('click', () => {
    modalConfirm.close();
    modalConfirm.classList.remove('show');

    // Clear boards
    while (playerBoardContainer.firstChild) {
      playerBoardContainer.removeChild(playerBoardContainer.lastChild);
    }
    while (aiBoardContainer.firstChild) {
      aiBoardContainer.removeChild(aiBoardContainer.lastChild);
    }

    // Reset Initialized classes
    playerBoard.reset();
    aiBoard.reset();
    getPlayer.reset();
    getAi.reset();

    // Re-build boards and re-place ships after class reset
    playerBoard.buildBoard();
    aiBoard.buildBoard();
    playerBoard.getRandomPlacement();
    aiBoard.getRandomPlacement();
    buildGrids();

    // Hide winner UI and show player wait UI
    const winner = document.querySelector('#player-won');
    const playerTurn = document.querySelector('.player-turn');
    winner.classList.add('invisible');
    playerTurn.classList.remove('invisible');

    // Enable enemy board for attacks
    boardAccessibility('enable');
  });

  // When regretting to start a new game
  const confirmNo = document.querySelector('#no-btn');
  confirmNo.addEventListener('click', () => {
    modalConfirm.close();
    modalConfirm.classList.remove('show');
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
  const getPlayerBoard = () => playerBoard;
  const getAiBoard = () => aiBoard;
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
  const getPlayer = () => player;
  const getAi = () => ai;
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
  const getWinner = () => winner;
  const playRound = (row, column) => {
    // Reset winner variable in case of new game
    winner = '';

    // Check for a winner
    const isWinner = () => {
      if (playerBoard.allShipsSunk()) {
        winner = players[1].name;
      } else if (aiBoard.allShipsSunk()) {
        winner = players[0].name;
      }
    };
    if (getActivePlayer() === players[0]) {
      player.attackSquare(row, column, aiBoard);
      isWinner();
    }
    switchPlayerTurn();

    // Let AI attack player board with "thinking" delay
    if (getActivePlayer() === players[1]) {
      const aiAttack = () => {
        ai.attackRandomSquare(playerBoard);
        if (ai.alreadyAttacked) aiAttack();
      };
      aiAttack();
      isWinner();
    }
    switchPlayerTurn();
  };
  return {
    getPlayerBoard,
    getAiBoard,
    getPlayer,
    getAi,
    gridSize: getPlayerBoard.gridSize,
    getActivePlayer,
    playRound,
    getWinner
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
// START //



class Gameboard {
  board;
  missedShots;
  sunkenShips;
  gridSize = 10;
  isHit;
  constructor() {
    this.board = [];
    this.missedShots = [];
    this.sunkenShips = [];
  }
  reset() {
    this.board = [];
    this.missedShots = [];
    this.sunkenShips = [];
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
    if (this.sunkenShips.length !== _data_shipProperties__WEBPACK_IMPORTED_MODULE_0__.shipProperties.length) return false;
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
// START //

class Player {
  attacks;
  alreadyAttacked;
  constructor(playerName) {
    this.playerName = playerName;
    this.attacks = [];
  }
  reset() {
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
  reset() {
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
/* harmony import */ var _controller_displayController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller/displayController */ "./src/controller/displayController.js");
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
  (0,_controller_displayController__WEBPACK_IMPORTED_MODULE_2__.Display)(alias.value);
});

// ... or press 'enter'
alias.addEventListener('keypress', e => {
  if (e.keyCode === 13) startBtn.click();
});

// Show confirmation modal when wanting a new game
const newGame = document.querySelector('#new-game-btn');
const modalConfirm = document.querySelector('.modal-confirm');
newGame.addEventListener('click', () => {
  modalConfirm.showModal();
  modalConfirm.classList.add('show');
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
var code = "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Battleship</title>\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=Orbitron&display=swap\"\n      rel=\"stylesheet\"\n    />\n    <link\n      rel=\"stylesheet\"\n      href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"\n    />\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=Inter&family=Playfair+Display&display=swap\"\n      rel=\"stylesheet\"\n    />\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=Caveat&display=swap\"\n      rel=\"stylesheet\"\n    />\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap\"\n      rel=\"stylesheet\"\n    />\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=Monoton&display=swap\"\n      rel=\"stylesheet\"\n    />\n  </head>\n  <body>\n    <div class=\"developer\">\n      <p class=\"copyright\">&copy<span id=\"copyright-span\"> 2023</span></p>\n      <a\n        class=\"github-link\"\n        href=\"https://github.com/rasmushaislund\"\n        target=\"_blank\"\n        >Rasmus H.\n        <img\n          src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\"\n          class=\"github-logo\"\n          alt=\"github logo\"\n      /></a>\n    </div>\n    <div class=\"header\">\n      <p class=\"title\">BATTLESHIP</p>\n    </div>\n    <dialog class=\"modal-name\">\n      <label class=\"modal-label\" for=\"player-name\">Enter your game alias</label>\n      <input\n        id=\"player-name\"\n        type=\"text\"\n        name=\"player_name\"\n        maxlength=\"20\"\n        minlength=\"1\"\n        placeholder=\"Enter alias\"\n        autofocus\n        required\n      />\n      <button class=\"btn\" id=\"start-btn\" type=\"submit\">START</button>\n    </dialog>\n    <div class=\"main-game hide\">\n      <div class=\"game-container\">\n        <div class=\"player-turn\">\n          <p class=\"game-text\" id=\"player-turn\">\n            Waiting for <span id=\"player-id\"></span>\n          </p>\n          <div class=\"loader invisible\"></div>\n        </div>\n        <p class=\"game-text invisible\" id=\"player-won\">\n          <span id=\"winner-id\"></span> wins!\n        </p>\n        <div class=\"board-container\">\n          <div class=\"board\">\n            <div class=\"board-info\">\n              <img\n                class=\"icon player-icon\"\n                src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\"\n                alt=\"player icon\"\n              />\n              <p id=\"your-board\"></p>\n              <img\n                class=\"icon info-icon\"\n                src=\"" + ___HTML_LOADER_REPLACEMENT_2___ + "\"\n                alt=\"information\"\n              />\n              <div class=\"modal-info hide\">\n                <div class=\"legend\">\n                  <div class=\"square square-5\"></div>\n                  <p class=\"legend-text\">&times5</p>\n                  <p class=\"legend-text-1\">Carrier</p>\n                </div>\n                <div class=\"legend\">\n                  <div class=\"square square-4\"></div>\n                  <p class=\"legend-text\">&times4</p>\n                  <p class=\"legend-text\">Battleship</p>\n                </div>\n                <div class=\"legend\">\n                  <div class=\"square square-3-1\"></div>\n                  <p class=\"legend-text\">&times3</p>\n                  <p class=\"legend-text\">Destroyer</p>\n                </div>\n                <div class=\"legend\">\n                  <div class=\"square square-3-2\"></div>\n                  <p class=\"legend-text\">&times3</p>\n                  <p class=\"legend-text\">Submarine</p>\n                </div>\n                <div class=\"legend\">\n                  <div class=\"square square-2\"></div>\n                  <p class=\"legend-text\">&times2</p>\n                  <p class=\"legend-text\">Patrol Boat</p>\n                </div>\n                <div class=\"legend\">\n                  <img\n                    class=\"legend-icon\"\n                    src=\"" + ___HTML_LOADER_REPLACEMENT_3___ + "\"\n                    alt=\"explosion\"\n                  />\n                  <p class=\"legend-text\">Hit</p>\n                </div>\n                <div class=\"legend\">\n                  <img\n                    class=\"legend-icon\"\n                    src=\"" + ___HTML_LOADER_REPLACEMENT_4___ + "\"\n                    alt=\"waves\"\n                  />\n                  <p class=\"legend-text\">Miss</p>\n                </div>\n              </div>\n            </div>\n            <div class=\"game-board game-board-player\"></div>\n          </div>\n          <div class=\"board\">\n            <div class=\"board-info\">\n              <img\n                class=\"icon opponent-icon\"\n                src=\"" + ___HTML_LOADER_REPLACEMENT_5___ + "\"\n                alt=\"opponent icon\"\n              />\n              <p id=\"opponent-board\"></p>\n            </div>\n            <div class=\"game-board game-board-opponent\"></div>\n          </div>\n        </div>\n        <button class=\"btn\" id=\"new-game-btn\" type=\"button\">NEW GAME</button>\n      </div>\n    </div>\n    <dialog class=\"modal-confirm\">\n      <h3>Are you sure you want to start a new game?</h3>\n      <div class=\"buttons\">\n        <button class=\"btn\" id=\"yes-btn\" type=\"button\">YES</button>\n        <button class=\"btn\" id=\"no-btn\" type=\"button\">NO</button>\n      </div>\n    </dialog>\n  </body>\n</html>\n";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM5RSxzQ0FBc0MsdUZBQXdDO0FBQzlFLHNDQUFzQyx1RkFBd0M7QUFDOUUsc0NBQXNDLHVGQUF3QztBQUM5RTtBQUNBO0FBQ0EsK0RBQWUsSUFBSTs7Ozs7Ozs7OztBQ2pCTjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJOzs7QUFHSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUN6QkEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9jb250cm9sbGVyL2Rpc3BsYXlDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2NvbnRyb2xsZXIvZ2FtZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZGF0YS9zaGlwUHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvaHRtbC9pbmRleC5odG1sIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2h0bWwtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzP2UzMjAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gU1RBUlQgLy9cblxuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4vZ2FtZUNvbnRyb2xsZXInO1xuaW1wb3J0IHsgc2hpcFByb3BlcnRpZXMgfSBmcm9tICcuLi9kYXRhL3NoaXBQcm9wZXJ0aWVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIERpc3BsYXkocGxheWVyTmFtZSkge1xuICBjb25zdCBwbGF5ZXIgPSBwbGF5ZXJOYW1lO1xuICBjb25zdCBhaSA9ICdQaXJhdGUgQUknO1xuICBjb25zdCBnYW1lID0gR2FtZShwbGF5ZXIsIGFpKTtcblxuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGdhbWUuZ2V0UGxheWVyQm9hcmQoKTtcbiAgY29uc3QgYWlCb2FyZCA9IGdhbWUuZ2V0QWlCb2FyZCgpO1xuXG4gIGNvbnN0IGdldFBsYXllciA9IGdhbWUuZ2V0UGxheWVyKCk7XG4gIGNvbnN0IGdldEFpID0gZ2FtZS5nZXRBaSgpO1xuXG4gIC8vIFNldHRpbmcgcGxheWVyIGFuZCBhaSBuYW1lcyBvbiBVSVxuICBjb25zdCBzZXRQbGF5ZXJOYW1lID0gKHBsYXllciwgYWkpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5b3VyLWJvYXJkJyk7XG4gICAgY29uc3QgYWlJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcHBvbmVudC1ib2FyZCcpO1xuICAgIHBsYXllcklkLnRleHRDb250ZW50ID0gcGxheWVyO1xuICAgIGFpSWQudGV4dENvbnRlbnQgPSBhaTtcbiAgfTtcblxuICAvLyBDb2xvciBjZWxscyBvY2N1cGllZCBieSBzaGlwcyBvbiB0aGUgcGxheWVyIGJvYXJkXG4gIGNvbnN0IGNvbG9yU2hpcENlbGxzID0gKHJvdywgY29sdW1uLCB0eXBlKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0Q2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgW2RhdGEtaW5kZXgtbnVtYmVyPScke3Jvd30tJHtjb2x1bW59J11gLFxuICAgICk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwUHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHR5cGUgPT09IHNoaXBQcm9wZXJ0aWVzW2ldLnR5cGUpIHtcbiAgICAgICAgc2VsZWN0Q2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgJHtzaGlwUHJvcGVydGllc1tpXS5jb2xvcn1gO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBCdWlsZCBib2FyZCBncmlkcyBiYXNlZCBvbiAyRC1hcnJheXNcbiAgY29uc3QgYnVpbGRHcmlkcyA9ICgpID0+IHtcbiAgICAvLyBCdWlsZCBwbGF5ZXIgZ3JpZFxuICAgIGNvbnN0IHBsYXllcjJkQXJyYXkgPSBwbGF5ZXJCb2FyZC5ib2FyZDtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWJvYXJkLXBsYXllcicpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyMmRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwbGF5ZXIyZEFycmF5W2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJywgJ2NlbGwtcGxheWVyJyk7XG4gICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgICAgICBjZWxsLmRhdGFzZXQuaW5kZXhOdW1iZXIgPSBgJHtbaV19LSR7W2pdfWA7XG4gICAgICAgIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNlbGwpO1xuXG4gICAgICAgIC8vIElmIGFycmF5LWluZGV4IGlzIGEgc2hpcCB0aGVuIGFkZCBzaGlwLW5hbWUgYXMgY2xhc3Mgb24gZ3JpZC1jZWxsXG4gICAgICAgIGlmICh0eXBlb2YgcGxheWVyMmRBcnJheVtpXVtqXSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICBjb25zdCByb3cgPSBpO1xuICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGo7XG4gICAgICAgICAgY29uc3Qgc2hpcFR5cGUgPSBwbGF5ZXIyZEFycmF5W2ldW2pdWzFdLnR5cGU7XG4gICAgICAgICAgY29sb3JTaGlwQ2VsbHMocm93LCBjb2x1bW4sIHNoaXBUeXBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEJ1aWxkIGFpIGdyaWRcbiAgICBjb25zdCBhaTJkQXJyYXkgPSBhaUJvYXJkLmJvYXJkO1xuICAgIGNvbnN0IGFpQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1ib2FyZC1vcHBvbmVudCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWkyZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFpMmRBcnJheVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcsICdjZWxsLW9wcG9uZW50Jyk7XG4gICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgICAgICBjZWxsLmRhdGFzZXQuaW5kZXhOdW1iZXIgPSBgJHtbaV19LSR7W2pdfWA7XG4gICAgICAgIGFpQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIFNldCBuYW1lIGluIFwid2FpdGluZyBmb3IgcGxheWVyXCJcbiAgY29uc3Qgc2V0TmFtZVdhaXRpbmcgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2FpdGluZ0ZvclBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItaWQnKTtcbiAgICBjb25zdCBsb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGVyJyk7XG4gICAgd2FpdGluZ0ZvclBsYXllci50ZXh0Q29udGVudCA9IGdhbWUuZ2V0QWN0aXZlUGxheWVyKCkubmFtZTtcblxuICAgIC8vIFNob3cgbG9hZGVyIHdoaWxlIHdhaXRpbmcgZm9yIHBsYXllciB0byBtYWtlIGEgbW92ZVxuICAgIGxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcbiAgfTtcblxuICBzZXRQbGF5ZXJOYW1lKHBsYXllciwgYWkpO1xuICBidWlsZEdyaWRzKCk7XG4gIHNldE5hbWVXYWl0aW5nKCk7XG5cbiAgY29uc3QgYm9hcmRBY2Nlc3NpYmlsaXR5ID0gKHN0YXR1cykgPT4ge1xuICAgIC8vIERpc2FibGUgYm9hcmQgZm9yIGZ1cnRoZXIgaW5wdXQgd2hlbiB3aW5uZXIgaXMgZm91bmQgb3IgYWkgaXMgdG8gbWFrZSBhbiBhdHRhY2tcbiAgICBjb25zdCBnYW1lQm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbWUtYm9hcmQnKTtcbiAgICBjb25zdCBhaUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQtb3Bwb25lbnQnKTtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG5cbiAgICBpZiAoc3RhdHVzID09PSAnd2FpdGluZycpIHtcbiAgICAgIGFpQm9hcmQuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQtYm9hcmQnKTtcbiAgICB9XG5cbiAgICBnYW1lQm9hcmRzLmZvckVhY2goKGJvYXJkKSA9PiB7XG4gICAgICBpZiAoc3RhdHVzID09PSAnZGlzYWJsZScpIHtcbiAgICAgICAgYm9hcmQuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQtYm9hcmQnKTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnZW5hYmxlJykge1xuICAgICAgICBib2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZC1ib2FyZCcpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgaWYgKHN0YXR1cyA9PT0gJ2Rpc2FibGUnKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQtY2VsbCcpO1xuICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdlbmFibGUnKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQtY2VsbCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIC8vIEV2ZW50IGxpc3RlbmVyIGZvciBwbGF5ZXIgYXR0YWNrIG9uIGVuZW15XG4gIGNvbnN0IG9wcG9uZW50Qm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1ib2FyZC1vcHBvbmVudCcpO1xuXG4gIG9wcG9uZW50Qm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuXG4gICAgLy8gQ29udmVydCBjZWxsIGluZGV4TnVtYmVyIHRvIGNvb3JkaW5hdGVzXG4gICAgY29uc3QgaW5kZXhOdW1iZXIgPSB0YXJnZXQuZGF0YXNldC5pbmRleE51bWJlcjtcbiAgICBjb25zdCBpbmRleFRvQXJyYXkgPSBpbmRleE51bWJlci5zcGxpdCgnLScpO1xuICAgIGNvbnN0IHJvdyA9IE51bWJlcihpbmRleFRvQXJyYXlbMF0pO1xuICAgIGNvbnN0IGNvbHVtbiA9IE51bWJlcihpbmRleFRvQXJyYXlbMV0pO1xuXG4gICAgLy8gSW5pdGlhdGUgcm91bmQgd2l0aCBhdHRhY2sgZnJvbSBwbGF5ZXJcbiAgICBnYW1lLnBsYXlSb3VuZChyb3csIGNvbHVtbik7XG5cbiAgICAvLyBTZXQgYXBwcm9wcmlhdGUgaWNvbiBvbiBhdHRhY2tlZCBvcHBvbmVudCBjZWxsIHdldGhlciBhIGhpdCBvciBhIG1pc3NcbiAgICBpZiAoIWFpQm9hcmQuaXNIaXQpIHtcbiAgICAgIGNvbnN0IG1pc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIG1pc3MuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgICAgbWlzcy5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuLi9hc3NldHMvaW1nL21pc3Muc3ZnJyk7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQobWlzcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGhpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgaGl0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgaGl0LnNldEF0dHJpYnV0ZSgnc3JjJywgJy4uL2Fzc2V0cy9pbWcvaGl0LnN2ZycpO1xuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGhpdCk7XG4gICAgfVxuXG4gICAgLy8gRGlzYWJsZSBhdHRhY2tlZCBvcHBvbmVudCBjZWxsXG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnYXR0YWNrZWQtb3Bwb25lbnQtY2VsbCcpO1xuXG4gICAgY29uc3QgYWkgPSBnYW1lLmdldEFpKCk7XG5cbiAgICAvLyBTZXQgYXBwcm9wcmlhdGUgaWNvbiBvbiBhdHRhY2tlZCBwbGF5ZXIgY2VsbCB3ZXRoZXIgYSBoaXQgb3IgYSBtaXNzXG4gICAgY29uc3Qgc2hvd0FpQXR0YWNrID0gKCkgPT4ge1xuICAgICAgY29uc3QgbGF0ZXN0QWlBdHRhY2sgPSBhaS5hdHRhY2tzW2FpLmF0dGFja3MubGVuZ3RoIC0gMV07XG4gICAgICBjb25zdCBhaUF0dGFja1JvdyA9IGxhdGVzdEFpQXR0YWNrWzBdO1xuICAgICAgY29uc3QgYWlBdHRhY2tDb2x1bW4gPSBsYXRlc3RBaUF0dGFja1sxXTtcbiAgICAgIGNvbnN0IGdldFBsYXllckNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgW2RhdGEtaW5kZXgtbnVtYmVyPScke2FpQXR0YWNrUm93fS0ke2FpQXR0YWNrQ29sdW1ufSddYCxcbiAgICAgICk7XG5cbiAgICAgIGlmICghcGxheWVyQm9hcmQuaXNIaXQpIHtcbiAgICAgICAgY29uc3QgbWlzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBtaXNzLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgICAgbWlzcy5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuLi9hc3NldHMvaW1nL21pc3Muc3ZnJyk7XG4gICAgICAgIGdldFBsYXllckNlbGwuYXBwZW5kQ2hpbGQobWlzcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBoaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaGl0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICBoaXQuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi4vYXNzZXRzL2ltZy9oaXQuc3ZnJyk7XG4gICAgICAgIGdldFBsYXllckNlbGwuYXBwZW5kQ2hpbGQoaGl0KTtcbiAgICAgIH1cbiAgICAgIGJvYXJkQWNjZXNzaWJpbGl0eSgnZW5hYmxlJyk7XG4gICAgfTtcblxuICAgIC8vIFNob3cgYSB3aW5uZXJcbiAgICBjb25zdCBnZXRXaW5uZXIgPSBnYW1lLmdldFdpbm5lcigpO1xuICAgIGNvbnN0IHdpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItd29uJyk7XG4gICAgY29uc3Qgd2lubmVySWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2lubmVyLWlkJyk7XG4gICAgY29uc3QgcGxheWVyVHVybiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItdHVybicpO1xuXG4gICAgaWYgKGdldFdpbm5lcikge1xuICAgICAgd2lubmVySWQudGV4dENvbnRlbnQgPSBnZXRXaW5uZXI7XG4gICAgICB3aW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XG4gICAgICBwbGF5ZXJUdXJuLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xuXG4gICAgICBib2FyZEFjY2Vzc2liaWxpdHkoJ2Rpc2FibGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2lubmVyLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xuICAgICAgcGxheWVyVHVybi5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcblxuICAgICAgLy8gUHJldmVudCBuZXcgcGxheWVyIGF0dGFjayBiZWZvcmUgYWkgaGFzIGF0dGFja2VkXG4gICAgICBib2FyZEFjY2Vzc2liaWxpdHkoJ3dhaXRpbmcnKTtcblxuICAgICAgLy8gTWFrZXMgcmFuZG9tIGRlbGF5IGluIGFpIGRlY2lzaW9uXG4gICAgICBjb25zdCBhaVRoaW5rVGltZSA9IE1hdGgucmFuZG9tKCkgKiAzMDAwO1xuICAgICAgY29uc29sZS5sb2coYWlUaGlua1RpbWUpO1xuICAgICAgc2V0VGltZW91dChzaG93QWlBdHRhY2ssIGFpVGhpbmtUaW1lKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFdoZW4gY29uZmlybWluZyBhIG5ldyBnYW1lXG4gIGNvbnN0IG1vZGFsQ29uZmlybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jb25maXJtJyk7XG4gIGNvbnN0IGNvbmZpcm1ZZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeWVzLWJ0bicpO1xuICBjb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWJvYXJkLXBsYXllcicpO1xuICBjb25zdCBhaUJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQtb3Bwb25lbnQnKTtcblxuICBjb25maXJtWWVzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG1vZGFsQ29uZmlybS5jbG9zZSgpO1xuICAgIG1vZGFsQ29uZmlybS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG5cbiAgICAvLyBDbGVhciBib2FyZHNcbiAgICB3aGlsZSAocGxheWVyQm9hcmRDb250YWluZXIuZmlyc3RDaGlsZCkge1xuICAgICAgcGxheWVyQm9hcmRDb250YWluZXIucmVtb3ZlQ2hpbGQocGxheWVyQm9hcmRDb250YWluZXIubGFzdENoaWxkKTtcbiAgICB9XG4gICAgd2hpbGUgKGFpQm9hcmRDb250YWluZXIuZmlyc3RDaGlsZCkge1xuICAgICAgYWlCb2FyZENvbnRhaW5lci5yZW1vdmVDaGlsZChhaUJvYXJkQ29udGFpbmVyLmxhc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgLy8gUmVzZXQgSW5pdGlhbGl6ZWQgY2xhc3Nlc1xuICAgIHBsYXllckJvYXJkLnJlc2V0KCk7XG4gICAgYWlCb2FyZC5yZXNldCgpO1xuICAgIGdldFBsYXllci5yZXNldCgpO1xuICAgIGdldEFpLnJlc2V0KCk7XG5cbiAgICAvLyBSZS1idWlsZCBib2FyZHMgYW5kIHJlLXBsYWNlIHNoaXBzIGFmdGVyIGNsYXNzIHJlc2V0XG4gICAgcGxheWVyQm9hcmQuYnVpbGRCb2FyZCgpO1xuICAgIGFpQm9hcmQuYnVpbGRCb2FyZCgpO1xuICAgIHBsYXllckJvYXJkLmdldFJhbmRvbVBsYWNlbWVudCgpO1xuICAgIGFpQm9hcmQuZ2V0UmFuZG9tUGxhY2VtZW50KCk7XG4gICAgYnVpbGRHcmlkcygpO1xuXG4gICAgLy8gSGlkZSB3aW5uZXIgVUkgYW5kIHNob3cgcGxheWVyIHdhaXQgVUlcbiAgICBjb25zdCB3aW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLXdvbicpO1xuICAgIGNvbnN0IHBsYXllclR1cm4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXR1cm4nKTtcbiAgICB3aW5uZXIuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XG4gICAgcGxheWVyVHVybi5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcblxuICAgIC8vIEVuYWJsZSBlbmVteSBib2FyZCBmb3IgYXR0YWNrc1xuICAgIGJvYXJkQWNjZXNzaWJpbGl0eSgnZW5hYmxlJyk7XG4gIH0pO1xuXG4gIC8vIFdoZW4gcmVncmV0dGluZyB0byBzdGFydCBhIG5ldyBnYW1lXG4gIGNvbnN0IGNvbmZpcm1ObyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuby1idG4nKTtcblxuICBjb25maXJtTm8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbW9kYWxDb25maXJtLmNsb3NlKCk7XG4gICAgbW9kYWxDb25maXJtLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgfSk7XG59XG5cbi8vIEVORCAvL1xuIiwiLy8gU1RBUlQgLy9cblxuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi4vZmFjdG9yaWVzL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuLi9mYWN0b3JpZXMvcGxheWVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIEdhbWUocGxheWVyTmFtZSwgYWlOYW1lKSB7XG4gIC8vIEluaXRpYWxpemUgZ2FtZWJvYXJkIGFuZCBwbGFjZSBzaGlwc1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgY29uc3QgYWlCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgY29uc3QgZ2V0UGxheWVyQm9hcmQgPSAoKSA9PiBwbGF5ZXJCb2FyZDtcbiAgY29uc3QgZ2V0QWlCb2FyZCA9ICgpID0+IGFpQm9hcmQ7XG5cbiAgY29uc3QgYnVpbGRQbGF5ZXJCb2FyZCA9IHBsYXllckJvYXJkLmJ1aWxkQm9hcmQoKTtcbiAgY29uc3QgYnVpbGRBaUJvYXJkID0gYWlCb2FyZC5idWlsZEJvYXJkKCk7XG5cbiAgY29uc3QgcGxhY2VTaGlwc1BsYXllciA9IHBsYXllckJvYXJkLmdldFJhbmRvbVBsYWNlbWVudCgpO1xuICBjb25zdCBwbGFjZVNoaXBzQWkgPSBhaUJvYXJkLmdldFJhbmRvbVBsYWNlbWVudCgpO1xuXG4gIC8vIEluaXRpYWxpemUgcGxheWVycyBhbmQgaGFuZGxlIHBsYXllcidzIHR1cm5cbiAgY29uc3QgcGxheWVycyA9IFtcbiAgICB7XG4gICAgICBuYW1lOiBwbGF5ZXJOYW1lLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogYWlOYW1lLFxuICAgIH0sXG4gIF07XG5cbiAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihwbGF5ZXJzWzBdLm5hbWUpO1xuICBjb25zdCBhaSA9IG5ldyBQbGF5ZXIocGxheWVyc1sxXS5uYW1lKTtcbiAgY29uc3QgZ2V0UGxheWVyID0gKCkgPT4gcGxheWVyO1xuICBjb25zdCBnZXRBaSA9ICgpID0+IGFpO1xuXG4gIGxldCBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXJzWzBdO1xuICBjb25zdCBzd2l0Y2hQbGF5ZXJUdXJuID0gKCkgPT4ge1xuICAgIGlmIChhY3RpdmVQbGF5ZXIgPT09IHBsYXllcnNbMF0pIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcnNbMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcnNbMF07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEFjdGl2ZVBsYXllciA9ICgpID0+IGFjdGl2ZVBsYXllcjtcblxuICAvLyBQbGF5IGEgcm91bmQgb2YgdGhlIGdhbWVcbiAgbGV0IHdpbm5lcjtcbiAgY29uc3QgZ2V0V2lubmVyID0gKCkgPT4gd2lubmVyO1xuXG4gIGNvbnN0IHBsYXlSb3VuZCA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgIC8vIFJlc2V0IHdpbm5lciB2YXJpYWJsZSBpbiBjYXNlIG9mIG5ldyBnYW1lXG4gICAgd2lubmVyID0gJyc7XG5cbiAgICAvLyBDaGVjayBmb3IgYSB3aW5uZXJcbiAgICBjb25zdCBpc1dpbm5lciA9ICgpID0+IHtcbiAgICAgIGlmIChwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICB3aW5uZXIgPSBwbGF5ZXJzWzFdLm5hbWU7XG4gICAgICB9IGVsc2UgaWYgKGFpQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgd2lubmVyID0gcGxheWVyc1swXS5uYW1lO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoZ2V0QWN0aXZlUGxheWVyKCkgPT09IHBsYXllcnNbMF0pIHtcbiAgICAgIHBsYXllci5hdHRhY2tTcXVhcmUocm93LCBjb2x1bW4sIGFpQm9hcmQpO1xuICAgICAgaXNXaW5uZXIoKTtcbiAgICB9XG5cbiAgICBzd2l0Y2hQbGF5ZXJUdXJuKCk7XG5cbiAgICAvLyBMZXQgQUkgYXR0YWNrIHBsYXllciBib2FyZCB3aXRoIFwidGhpbmtpbmdcIiBkZWxheVxuICAgIGlmIChnZXRBY3RpdmVQbGF5ZXIoKSA9PT0gcGxheWVyc1sxXSkge1xuICAgICAgY29uc3QgYWlBdHRhY2sgPSAoKSA9PiB7XG4gICAgICAgIGFpLmF0dGFja1JhbmRvbVNxdWFyZShwbGF5ZXJCb2FyZCk7XG4gICAgICAgIGlmIChhaS5hbHJlYWR5QXR0YWNrZWQpIGFpQXR0YWNrKCk7XG4gICAgICB9O1xuICAgICAgYWlBdHRhY2soKTtcbiAgICAgIGlzV2lubmVyKCk7XG4gICAgfVxuXG4gICAgc3dpdGNoUGxheWVyVHVybigpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0UGxheWVyQm9hcmQsXG4gICAgZ2V0QWlCb2FyZCxcbiAgICBnZXRQbGF5ZXIsXG4gICAgZ2V0QWksXG4gICAgZ3JpZFNpemU6IGdldFBsYXllckJvYXJkLmdyaWRTaXplLFxuICAgIGdldEFjdGl2ZVBsYXllcixcbiAgICBwbGF5Um91bmQsXG4gICAgZ2V0V2lubmVyLFxuICB9O1xufVxuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmV4cG9ydCBjb25zdCBzaGlwUHJvcGVydGllcyA9IFtcbiAge1xuICAgIHR5cGU6ICdDYXJyaWVyJyxcbiAgICBsZW5ndGg6IDUsXG4gICAgY29sb3I6ICdyZ2IoMjUyLCA0LCA0LCAuNCknLFxuICB9LFxuICB7XG4gICAgdHlwZTogJ0JhdHRsZXNoaXAnLFxuICAgIGxlbmd0aDogNCxcbiAgICBjb2xvcjogJ3JnYig0LCAxNDAsIDQsIC40KScsXG4gIH0sXG4gIHtcbiAgICB0eXBlOiAnRGVzdHJveWVyJyxcbiAgICBsZW5ndGg6IDMsXG4gICAgY29sb3I6ICdyZ2IoNCwgNCwgMjUyLCAuNCknLFxuICB9LFxuICB7XG4gICAgdHlwZTogJ1N1Ym1hcmluZScsXG4gICAgbGVuZ3RoOiAzLFxuICAgIGNvbG9yOiAncmdiKDI1MiwgMjUxLCAzMiwgLjQpJyxcbiAgfSxcbiAge1xuICAgIHR5cGU6ICdQYXRyb2wgQm9hdCcsXG4gICAgbGVuZ3RoOiAyLFxuICAgIGNvbG9yOiAncmdiKDEyLCA0LCAxMiwgLjQpJyxcbiAgfSxcbl07XG4iLCIvLyBTVEFSVCAvL1xuXG5pbXBvcnQgeyBzaGlwUHJvcGVydGllcyB9IGZyb20gJy4uL2RhdGEvc2hpcFByb3BlcnRpZXMnO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCc7XG5cbmV4cG9ydCBjbGFzcyBHYW1lYm9hcmQge1xuICBib2FyZDtcbiAgbWlzc2VkU2hvdHM7XG4gIHN1bmtlblNoaXBzO1xuICBncmlkU2l6ZSA9IDEwO1xuICBpc0hpdDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJvYXJkID0gW107XG4gICAgdGhpcy5taXNzZWRTaG90cyA9IFtdO1xuICAgIHRoaXMuc3Vua2VuU2hpcHMgPSBbXTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICB0aGlzLm1pc3NlZFNob3RzID0gW107XG4gICAgdGhpcy5zdW5rZW5TaGlwcyA9IFtdO1xuICB9XG5cbiAgLy8gR2VuZXJhdGUgdGhlIGdhbWUgYm9hcmQgYXMgYSAyRC1hcnJheVxuICBidWlsZEJvYXJkKCkge1xuICAgIGxldCB2YWx1ZSA9IDE7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JpZFNpemU7IGkrKykge1xuICAgICAgdGhpcy5ib2FyZFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmdyaWRTaXplOyBqKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZFtpXVtqXSA9IHZhbHVlKys7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2FsY3VsYXRlIHRvdGFsIGZsZWV0IHNpemUgY291bnRlZCBhcyB0b3RhbCBudW1iZXIgb2Ygc3F1YXJlcyBvY2N1cGllZFxuICAvLyBieSB0aGUgc2hpcHMgb24gdGhlIGdhbWUtcmVhZHkgYm9hcmRcbiAgZmxlZXQoKSB7XG4gICAgbGV0IGZsZWV0U2l6ZSA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwUHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgZmxlZXRTaXplICs9IHNoaXBQcm9wZXJ0aWVzW2ldLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGZsZWV0U2l6ZTtcbiAgfVxuXG4gIC8vIENyZWF0ZSBzaGlwcyBieSBjYWxsaW5nIFNoaXAgY2xhc3NcbiAgY3JlYXRlU2hpcHMoKSB7XG4gICAgY29uc3QgcHJvcHMgPSBzaGlwUHJvcGVydGllcztcbiAgICBsZXQgc2hpcHNBcnJheSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaXNWZXJ0aWNhbCA9IFt0cnVlLCBmYWxzZV1bTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKV07XG4gICAgICBjb25zdCB2ZXNzZWwgPSBuZXcgU2hpcChwcm9wc1tpXS50eXBlLCBwcm9wc1tpXS5sZW5ndGgsIGlzVmVydGljYWwpO1xuICAgICAgc2hpcHNBcnJheS5wdXNoKHZlc3NlbCk7XG4gICAgfVxuICAgIHJldHVybiBzaGlwc0FycmF5O1xuICB9XG5cbiAgcGxhY2VTaGlwcyhzaGlwLCByb3csIGNvbHVtbiwgdmVydGljYWwpIHtcbiAgICBpZiAodmVydGljYWwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmJvYXJkW3JvdyArIGldW2NvbHVtbl0gPSBbaSwgc2hpcF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sdW1uICsgaV0gPSBbaSwgc2hpcF07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0UmFuZG9tUGxhY2VtZW50KCkge1xuICAgIC8vIEdldCByZXR1cm5lZCBhcnJheSBmcm9tICdjcmVhdGVTaGlwcygpJ1xuICAgIGNvbnN0IHNoaXBzID0gdGhpcy5jcmVhdGVTaGlwcygpO1xuXG4gICAgLy8gQ2hlY2sgdG8gc2VlIHRoYXQgYm9hcmQgaXMgZW1wdHkgKGkuZS4gcmVhZHkgZm9yIGEgbmV3IGdhbWUpXG4gICAgaWYgKCF0aGlzLmlzQm9hcmRFbXB0eSkgcmV0dXJuO1xuXG4gICAgLy8gRm9yIGV2ZXJ5IHNoaXAgaW4gYXJyYXlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBTZWxlY3QgcmFuZG9tIHN0YXJ0LWNvb3JkaW5hdGVcbiAgICAgIGNvbnN0IHJhbmRYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5ncmlkU2l6ZSk7XG4gICAgICBjb25zdCByYW5kWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZ3JpZFNpemUpO1xuICAgICAgLy8gUmVhZCBvcmllbnRhdGlvbiBvZiBzaGlwXG4gICAgICBjb25zdCB2ZXJ0aWNhbCA9IHNoaXBzW2ldLnZlcnRpY2FsO1xuXG4gICAgICAvLyBDaGVjayBpZiBwbGFjZW1lbnQgaXMgYWxsb3dlZCAtIG90aGVyd2lzZSByZS1zdGFydCBsb29wIGZyb20gY3VycmVudCBpbmRleCBhZ2FpblxuICAgICAgaWYgKCF0aGlzLnBsYWNlbWVudEFsbG93ZWQoc2hpcHNbaV0sIHJhbmRYLCByYW5kWSwgdmVydGljYWwpKSB7XG4gICAgICAgIGktLTtcbiAgICAgIH0gZWxzZSB0aGlzLnBsYWNlU2hpcHMoc2hpcHNbaV0sIHJhbmRYLCByYW5kWSwgdmVydGljYWwpO1xuICAgIH1cbiAgfVxuXG4gIHBsYWNlbWVudEFsbG93ZWQoc2hpcCwgcm93LCBjb2x1bW4sIHZlcnRpY2FsKSB7XG4gICAgLy8gQ2hlY2sgaWYgcGxhY2VtZW50IG9mIHNoaXAgaXMgZnVsbHkgb3IgcGFydGx5IG91dHNpZGUgZ3JpZCBwZXJpbWV0ZXJcbiAgICBpZiAoXG4gICAgICByb3cgPiB0aGlzLmdyaWRTaXplIHx8XG4gICAgICBjb2x1bW4gPiB0aGlzLmdyaWRTaXplIHx8XG4gICAgICByb3cgKyBzaGlwLmxlbmd0aCA+IHRoaXMuZ3JpZFNpemUgfHxcbiAgICAgIGNvbHVtbiArIHNoaXAubGVuZ3RoID4gdGhpcy5ncmlkU2l6ZVxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIC8vIENoZWNrIGlmIGEgZ2l2ZW4gY29vcmRpbmF0ZSBpcyBhbHJlYWR5IG9jY3VwaWVkXG4gICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW3JvdyArIGldW2NvbHVtbl0gIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbcm93XVtjb2x1bW4gKyBpXSAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSB7XG4gICAgbGV0IGNvb3JkaW5hdGUgPSB0aGlzLmJvYXJkW3Jvd11bY29sdW1uXTtcblxuICAgIGlmICh0eXBlb2YgY29vcmRpbmF0ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgIGNvb3JkaW5hdGVbMV0uaGl0KGNvb3JkaW5hdGVbMF0pO1xuICAgICAgdGhpcy5pc0hpdCA9IHRydWU7XG4gICAgICBpZiAoY29vcmRpbmF0ZVsxXS5pc1N1bmsoKSkge1xuICAgICAgICB0aGlzLnN1bmtlblNoaXBzLnB1c2goY29vcmRpbmF0ZVsxXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWlzc2VkU2hvdHMucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIHRoaXMuaXNIaXQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhbGxTaGlwc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuc3Vua2VuU2hpcHMubGVuZ3RoICE9PSBzaGlwUHJvcGVydGllcy5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzQm9hcmRFbXB0eSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JpZFNpemU7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmdyaWRTaXplOyBqKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW2ldW2pdICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIFVzZSB0aGlzIHRvIHZlcmlmeSBjb3JyZWN0IHBsYWNlbWVudCBvZiBzaGlwc1xuICBjb3VudE9jY3VwaWVkU3F1YXJlcygpIHtcbiAgICBjb25zdCBhdmFpbGFibGVTcXVhcmVzID0gdGhpcy5ncmlkU2l6ZSAqIHRoaXMuZ3JpZFNpemU7XG4gICAgY29uc3QgZmxlZXRTaXplID0gdGhpcy5mbGVldCgpO1xuICAgIHJldHVybiBhdmFpbGFibGVTcXVhcmVzIC0gKGF2YWlsYWJsZVNxdWFyZXMgLSBmbGVldFNpemUpO1xuICB9XG59XG5cbi8vIEVORCAvL1xuIiwiLy8gU1RBUlQgLy9cblxuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gIGF0dGFja3M7XG4gIGFscmVhZHlBdHRhY2tlZDtcblxuICBjb25zdHJ1Y3RvcihwbGF5ZXJOYW1lKSB7XG4gICAgdGhpcy5wbGF5ZXJOYW1lID0gcGxheWVyTmFtZTtcbiAgICB0aGlzLmF0dGFja3MgPSBbXTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuYXR0YWNrcyA9IFtdO1xuICB9XG5cbiAgYXR0YWNrU3F1YXJlKHJvdywgY29sdW1uLCBlbmVteUJvYXJkKSB7XG4gICAgaWYgKCF0aGlzLmhhc0JlZW5BdHRhY2tlZChyb3csIGNvbHVtbikpIHtcbiAgICAgIHRoaXMuYXR0YWNrcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGF0dGFja1JhbmRvbVNxdWFyZShwbGF5ZXJCb2FyZCkge1xuICAgIGlmICh0aGlzLmF0dGFja3MubGVuZ3RoID49IDEwMCkgcmV0dXJuO1xuICAgIGNvbnN0IHJhbmRSb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwbGF5ZXJCb2FyZC5ncmlkU2l6ZSk7XG4gICAgY29uc3QgcmFuZENvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBsYXllckJvYXJkLmdyaWRTaXplKTtcblxuICAgIGlmICghdGhpcy5oYXNCZWVuQXR0YWNrZWQocmFuZFJvdywgcmFuZENvbHVtbikpIHtcbiAgICAgIHRoaXMuYXR0YWNrcy5wdXNoKFtyYW5kUm93LCByYW5kQ29sdW1uXSk7XG4gICAgICBwbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRSb3csIHJhbmRDb2x1bW4pO1xuICAgICAgdGhpcy5hbHJlYWR5QXR0YWNrZWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hbHJlYWR5QXR0YWNrZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGhhc0JlZW5BdHRhY2tlZChyb3csIGNvbHVtbikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hdHRhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5hdHRhY2tzW2ldWzBdID09PSByb3cgJiYgdGhpcy5hdHRhY2tzW2ldWzFdID09PSBjb2x1bW4pXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gRU5EIC8vXG4iLCIvLyBTVEFSVCAvL1xuXG5leHBvcnQgY2xhc3MgU2hpcCB7XG4gIHR5cGU7XG4gIGxlbmd0aDtcbiAgdmVydGljYWwgPSBmYWxzZTtcbiAgaGl0cztcblxuICBjb25zdHJ1Y3Rvcih0eXBlLCBsZW5ndGgsIHZlcnRpY2FsKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnZlcnRpY2FsID0gdmVydGljYWw7XG4gICAgdGhpcy5oaXRzID0gW107XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmhpdHMgPSBbXTtcbiAgfVxuXG4gIGhpdChwb3NpdGlvbikge1xuICAgIGlmIChcbiAgICAgIHRoaXMuaGl0cy5pbmNsdWRlcyhwb3NpdGlvbikgfHxcbiAgICAgIHBvc2l0aW9uIDwgMCB8fFxuICAgICAgcG9zaXRpb24gPiB0aGlzLmxlbmd0aCAtIDFcbiAgICApXG4gICAgICByZXR1cm47XG4gICAgdGhpcy5oaXRzLnB1c2gocG9zaXRpb24pO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdHMubGVuZ3RoID09PSB0aGlzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIEVORCAvL1xuIiwiLy8gU1RBUlQgLy9cblxuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgJy4vaHRtbC9pbmRleC5odG1sJztcbmltcG9ydCB7IERpc3BsYXkgfSBmcm9tICcuL2NvbnRyb2xsZXIvZGlzcGxheUNvbnRyb2xsZXInO1xuXG4vLyBTZXQgY29weXJpZ2h0IHllYXIgYXV0b21hdGljYWxseVxuY29uc3QgY29weXJpZ2h0U3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb3B5cmlnaHQtc3BhbicpO1xuY29weXJpZ2h0U3Bhbi50ZXh0Q29udGVudCA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcblxuLy8gU2hvdyBtb2RhbCB3aXRoIHBhZ2UgbG9hZFxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtbmFtZScpO1xuY29uc3QgbWFpbkdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1nYW1lJyk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICBtYWluR2FtZS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIG1vZGFsLnNob3dNb2RhbCgpO1xuICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG59KTtcblxuLy8gU3RhcnQgZ2FtZSB3aGVuIHBsYXllciBuYW1lIGhhcyBiZWVuIGVudGVyZWRcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0LWJ0bicpO1xuY29uc3QgYWxpYXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLW5hbWUnKTtcblxuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIG1vZGFsLmNsb3NlKCk7XG4gIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgbWFpbkdhbWUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gIERpc3BsYXkoYWxpYXMudmFsdWUpO1xufSk7XG5cbi8vIC4uLiBvciBwcmVzcyAnZW50ZXInXG5hbGlhcy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gIGlmIChlLmtleUNvZGUgPT09IDEzKSBzdGFydEJ0bi5jbGljaygpO1xufSk7XG5cbi8vIFNob3cgY29uZmlybWF0aW9uIG1vZGFsIHdoZW4gd2FudGluZyBhIG5ldyBnYW1lXG5jb25zdCBuZXdHYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy1nYW1lLWJ0bicpO1xuY29uc3QgbW9kYWxDb25maXJtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWNvbmZpcm0nKTtcblxubmV3R2FtZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbW9kYWxDb25maXJtLnNob3dNb2RhbCgpO1xuICBtb2RhbENvbmZpcm0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xufSk7XG5cbi8vIFNob3cgaW5mbyBtb2RhbCBvbiBob3ZlclxuY29uc3QgaW5mb0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby1pY29uJyk7XG5jb25zdCBpbmZvTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtaW5mbycpO1xuXG5pbmZvSWNvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gIGluZm9Nb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG59KTtcblxuaW5mb0ljb24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gIGluZm9Nb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG59KTtcblxuaW5mb0ljb24uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiB7XG4gIGluZm9Nb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG59KTtcblxuLy8gRU5EIC8vXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2h0bWwtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1nL2dpdGh1Yi1sb2dvLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0hUTUxfTE9BREVSX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWcvc2FpbG9yLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0hUTUxfTE9BREVSX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWcvaW5mby5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfM19fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1nL2hpdC5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1nL21pc3Muc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzVfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltZy9waXJhdGUuc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG4vLyBNb2R1bGVcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8wX19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfMF9fXyk7XG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzFfX18pO1xudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzJfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF8yX19fKTtcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8zX19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfM19fXyk7XG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfNF9fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzRfX18pO1xudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzVfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF81X19fKTtcbnZhciBjb2RlID0gXCI8IWRvY3R5cGUgaHRtbD5cXG48aHRtbCBsYW5nPVxcXCJlblxcXCI+XFxuICA8aGVhZD5cXG4gICAgPG1ldGEgY2hhcnNldD1cXFwiVVRGLThcXFwiIC8+XFxuICAgIDxtZXRhIG5hbWU9XFxcInZpZXdwb3J0XFxcIiBjb250ZW50PVxcXCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wXFxcIiAvPlxcbiAgICA8dGl0bGU+QmF0dGxlc2hpcDwvdGl0bGU+XFxuICAgIDxsaW5rXFxuICAgICAgaHJlZj1cXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1PcmJpdHJvbiZkaXNwbGF5PXN3YXBcXFwiXFxuICAgICAgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIlxcbiAgICAvPlxcbiAgICA8bGlua1xcbiAgICAgIHJlbD1cXFwic3R5bGVzaGVldFxcXCJcXG4gICAgICBocmVmPVxcXCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9mb250LWF3ZXNvbWUvNC43LjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzXFxcIlxcbiAgICAvPlxcbiAgICA8bGlua1xcbiAgICAgIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9SW50ZXImZmFtaWx5PVBsYXlmYWlyK0Rpc3BsYXkmZGlzcGxheT1zd2FwXFxcIlxcbiAgICAgIHJlbD1cXFwic3R5bGVzaGVldFxcXCJcXG4gICAgLz5cXG4gICAgPGxpbmtcXG4gICAgICBocmVmPVxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUNhdmVhdCZkaXNwbGF5PXN3YXBcXFwiXFxuICAgICAgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIlxcbiAgICAvPlxcbiAgICA8bGlua1xcbiAgICAgIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9THVja2llc3QrR3V5JmRpc3BsYXk9c3dhcFxcXCJcXG4gICAgICByZWw9XFxcInN0eWxlc2hlZXRcXFwiXFxuICAgIC8+XFxuICAgIDxsaW5rXFxuICAgICAgaHJlZj1cXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Nb25vdG9uJmRpc3BsYXk9c3dhcFxcXCJcXG4gICAgICByZWw9XFxcInN0eWxlc2hlZXRcXFwiXFxuICAgIC8+XFxuICA8L2hlYWQ+XFxuICA8Ym9keT5cXG4gICAgPGRpdiBjbGFzcz1cXFwiZGV2ZWxvcGVyXFxcIj5cXG4gICAgICA8cCBjbGFzcz1cXFwiY29weXJpZ2h0XFxcIj4mY29weTxzcGFuIGlkPVxcXCJjb3B5cmlnaHQtc3BhblxcXCI+IDIwMjM8L3NwYW4+PC9wPlxcbiAgICAgIDxhXFxuICAgICAgICBjbGFzcz1cXFwiZ2l0aHViLWxpbmtcXFwiXFxuICAgICAgICBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vcmFzbXVzaGFpc2x1bmRcXFwiXFxuICAgICAgICB0YXJnZXQ9XFxcIl9ibGFua1xcXCJcXG4gICAgICAgID5SYXNtdXMgSC5cXG4gICAgICAgIDxpbWdcXG4gICAgICAgICAgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzBfX18gKyBcIlxcXCJcXG4gICAgICAgICAgY2xhc3M9XFxcImdpdGh1Yi1sb2dvXFxcIlxcbiAgICAgICAgICBhbHQ9XFxcImdpdGh1YiBsb2dvXFxcIlxcbiAgICAgIC8+PC9hPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiaGVhZGVyXFxcIj5cXG4gICAgICA8cCBjbGFzcz1cXFwidGl0bGVcXFwiPkJBVFRMRVNISVA8L3A+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGlhbG9nIGNsYXNzPVxcXCJtb2RhbC1uYW1lXFxcIj5cXG4gICAgICA8bGFiZWwgY2xhc3M9XFxcIm1vZGFsLWxhYmVsXFxcIiBmb3I9XFxcInBsYXllci1uYW1lXFxcIj5FbnRlciB5b3VyIGdhbWUgYWxpYXM8L2xhYmVsPlxcbiAgICAgIDxpbnB1dFxcbiAgICAgICAgaWQ9XFxcInBsYXllci1uYW1lXFxcIlxcbiAgICAgICAgdHlwZT1cXFwidGV4dFxcXCJcXG4gICAgICAgIG5hbWU9XFxcInBsYXllcl9uYW1lXFxcIlxcbiAgICAgICAgbWF4bGVuZ3RoPVxcXCIyMFxcXCJcXG4gICAgICAgIG1pbmxlbmd0aD1cXFwiMVxcXCJcXG4gICAgICAgIHBsYWNlaG9sZGVyPVxcXCJFbnRlciBhbGlhc1xcXCJcXG4gICAgICAgIGF1dG9mb2N1c1xcbiAgICAgICAgcmVxdWlyZWRcXG4gICAgICAvPlxcbiAgICAgIDxidXR0b24gY2xhc3M9XFxcImJ0blxcXCIgaWQ9XFxcInN0YXJ0LWJ0blxcXCIgdHlwZT1cXFwic3VibWl0XFxcIj5TVEFSVDwvYnV0dG9uPlxcbiAgICA8L2RpYWxvZz5cXG4gICAgPGRpdiBjbGFzcz1cXFwibWFpbi1nYW1lIGhpZGVcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImdhbWUtY29udGFpbmVyXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInBsYXllci10dXJuXFxcIj5cXG4gICAgICAgICAgPHAgY2xhc3M9XFxcImdhbWUtdGV4dFxcXCIgaWQ9XFxcInBsYXllci10dXJuXFxcIj5cXG4gICAgICAgICAgICBXYWl0aW5nIGZvciA8c3BhbiBpZD1cXFwicGxheWVyLWlkXFxcIj48L3NwYW4+XFxuICAgICAgICAgIDwvcD5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwibG9hZGVyIGludmlzaWJsZVxcXCI+PC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxwIGNsYXNzPVxcXCJnYW1lLXRleHQgaW52aXNpYmxlXFxcIiBpZD1cXFwicGxheWVyLXdvblxcXCI+XFxuICAgICAgICAgIDxzcGFuIGlkPVxcXCJ3aW5uZXItaWRcXFwiPjwvc3Bhbj4gd2lucyFcXG4gICAgICAgIDwvcD5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImJvYXJkLWNvbnRhaW5lclxcXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImJvYXJkXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJib2FyZC1pbmZvXFxcIj5cXG4gICAgICAgICAgICAgIDxpbWdcXG4gICAgICAgICAgICAgICAgY2xhc3M9XFxcImljb24gcGxheWVyLWljb25cXFwiXFxuICAgICAgICAgICAgICAgIHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8xX19fICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgIGFsdD1cXFwicGxheWVyIGljb25cXFwiXFxuICAgICAgICAgICAgICAvPlxcbiAgICAgICAgICAgICAgPHAgaWQ9XFxcInlvdXItYm9hcmRcXFwiPjwvcD5cXG4gICAgICAgICAgICAgIDxpbWdcXG4gICAgICAgICAgICAgICAgY2xhc3M9XFxcImljb24gaW5mby1pY29uXFxcIlxcbiAgICAgICAgICAgICAgICBzcmM9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMl9fXyArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICBhbHQ9XFxcImluZm9ybWF0aW9uXFxcIlxcbiAgICAgICAgICAgICAgLz5cXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWluZm8gaGlkZVxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxlZ2VuZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic3F1YXJlIHNxdWFyZS01XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPiZ0aW1lczU8L3A+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0LTFcXFwiPkNhcnJpZXI8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNxdWFyZSBzcXVhcmUtNFxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj4mdGltZXM0PC9wPlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+QmF0dGxlc2hpcDwvcD5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxlZ2VuZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic3F1YXJlIHNxdWFyZS0zLTFcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+JnRpbWVzMzwvcD5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPkRlc3Ryb3llcjwvcD5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxlZ2VuZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic3F1YXJlIHNxdWFyZS0zLTJcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+JnRpbWVzMzwvcD5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPlN1Ym1hcmluZTwvcD5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxlZ2VuZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic3F1YXJlIHNxdWFyZS0yXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPiZ0aW1lczI8L3A+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj5QYXRyb2wgQm9hdDwvcD5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxlZ2VuZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgPGltZ1xcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcImxlZ2VuZC1pY29uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzNfX18gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cXFwiZXhwbG9zaW9uXFxcIlxcbiAgICAgICAgICAgICAgICAgIC8+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj5IaXQ8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxpbWdcXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJsZWdlbmQtaWNvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF80X19fICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgICAgICBhbHQ9XFxcIndhdmVzXFxcIlxcbiAgICAgICAgICAgICAgICAgIC8+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj5NaXNzPC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdhbWUtYm9hcmQgZ2FtZS1ib2FyZC1wbGF5ZXJcXFwiPjwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYm9hcmRcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImJvYXJkLWluZm9cXFwiPlxcbiAgICAgICAgICAgICAgPGltZ1xcbiAgICAgICAgICAgICAgICBjbGFzcz1cXFwiaWNvbiBvcHBvbmVudC1pY29uXFxcIlxcbiAgICAgICAgICAgICAgICBzcmM9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfNV9fXyArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICBhbHQ9XFxcIm9wcG9uZW50IGljb25cXFwiXFxuICAgICAgICAgICAgICAvPlxcbiAgICAgICAgICAgICAgPHAgaWQ9XFxcIm9wcG9uZW50LWJvYXJkXFxcIj48L3A+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZ2FtZS1ib2FyZCBnYW1lLWJvYXJkLW9wcG9uZW50XFxcIj48L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XFxcImJ0blxcXCIgaWQ9XFxcIm5ldy1nYW1lLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIj5ORVcgR0FNRTwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpYWxvZyBjbGFzcz1cXFwibW9kYWwtY29uZmlybVxcXCI+XFxuICAgICAgPGgzPkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBzdGFydCBhIG5ldyBnYW1lPzwvaDM+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnV0dG9uc1xcXCI+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG5cXFwiIGlkPVxcXCJ5ZXMtYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiPllFUzwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuXFxcIiBpZD1cXFwibm8tYnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiPk5PPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGlhbG9nPlxcbiAgPC9ib2R5PlxcbjwvaHRtbD5cXG5cIjtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGNvZGU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVyc2NvcmUtZGFuZ2xlLCBuby1wYXJhbS1yZWFzc2lnblxuXG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMubWF5YmVOZWVkUXVvdGVzICYmIC9bXFx0XFxuXFxmXFxyIFwiJz08PmBdLy50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybCwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbIkdhbWUiLCJzaGlwUHJvcGVydGllcyIsIkRpc3BsYXkiLCJwbGF5ZXJOYW1lIiwicGxheWVyIiwiYWkiLCJnYW1lIiwicGxheWVyQm9hcmQiLCJnZXRQbGF5ZXJCb2FyZCIsImFpQm9hcmQiLCJnZXRBaUJvYXJkIiwiZ2V0UGxheWVyIiwiZ2V0QWkiLCJzZXRQbGF5ZXJOYW1lIiwicGxheWVySWQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhaUlkIiwidGV4dENvbnRlbnQiLCJjb2xvclNoaXBDZWxscyIsInJvdyIsImNvbHVtbiIsInR5cGUiLCJzZWxlY3RDZWxsIiwiaSIsImxlbmd0aCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJidWlsZEdyaWRzIiwicGxheWVyMmRBcnJheSIsImJvYXJkIiwicGxheWVyQm9hcmRDb250YWluZXIiLCJqIiwiY2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJkYXRhc2V0IiwiaW5kZXhOdW1iZXIiLCJhcHBlbmRDaGlsZCIsInNoaXBUeXBlIiwiYWkyZEFycmF5IiwiYWlCb2FyZENvbnRhaW5lciIsInNldE5hbWVXYWl0aW5nIiwid2FpdGluZ0ZvclBsYXllciIsImxvYWRlciIsImdldEFjdGl2ZVBsYXllciIsIm5hbWUiLCJyZW1vdmUiLCJib2FyZEFjY2Vzc2liaWxpdHkiLCJzdGF0dXMiLCJnYW1lQm9hcmRzIiwicXVlcnlTZWxlY3RvckFsbCIsImNlbGxzIiwiZm9yRWFjaCIsIm9wcG9uZW50Qm9hcmQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwiaW5kZXhUb0FycmF5Iiwic3BsaXQiLCJOdW1iZXIiLCJwbGF5Um91bmQiLCJpc0hpdCIsIm1pc3MiLCJoaXQiLCJzaG93QWlBdHRhY2siLCJsYXRlc3RBaUF0dGFjayIsImF0dGFja3MiLCJhaUF0dGFja1JvdyIsImFpQXR0YWNrQ29sdW1uIiwiZ2V0UGxheWVyQ2VsbCIsImdldFdpbm5lciIsIndpbm5lciIsIndpbm5lcklkIiwicGxheWVyVHVybiIsImFpVGhpbmtUaW1lIiwiTWF0aCIsInJhbmRvbSIsImNvbnNvbGUiLCJsb2ciLCJzZXRUaW1lb3V0IiwibW9kYWxDb25maXJtIiwiY29uZmlybVllcyIsImNsb3NlIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwibGFzdENoaWxkIiwicmVzZXQiLCJidWlsZEJvYXJkIiwiZ2V0UmFuZG9tUGxhY2VtZW50IiwiY29uZmlybU5vIiwiR2FtZWJvYXJkIiwiUGxheWVyIiwiYWlOYW1lIiwiYnVpbGRQbGF5ZXJCb2FyZCIsImJ1aWxkQWlCb2FyZCIsInBsYWNlU2hpcHNQbGF5ZXIiLCJwbGFjZVNoaXBzQWkiLCJwbGF5ZXJzIiwiYWN0aXZlUGxheWVyIiwic3dpdGNoUGxheWVyVHVybiIsImlzV2lubmVyIiwiYWxsU2hpcHNTdW5rIiwiYXR0YWNrU3F1YXJlIiwiYWlBdHRhY2siLCJhdHRhY2tSYW5kb21TcXVhcmUiLCJhbHJlYWR5QXR0YWNrZWQiLCJncmlkU2l6ZSIsIlNoaXAiLCJtaXNzZWRTaG90cyIsInN1bmtlblNoaXBzIiwiY29uc3RydWN0b3IiLCJ2YWx1ZSIsImZsZWV0IiwiZmxlZXRTaXplIiwiY3JlYXRlU2hpcHMiLCJwcm9wcyIsInNoaXBzQXJyYXkiLCJpc1ZlcnRpY2FsIiwicm91bmQiLCJ2ZXNzZWwiLCJwdXNoIiwicGxhY2VTaGlwcyIsInNoaXAiLCJ2ZXJ0aWNhbCIsInNoaXBzIiwiaXNCb2FyZEVtcHR5IiwicmFuZFgiLCJmbG9vciIsInJhbmRZIiwicGxhY2VtZW50QWxsb3dlZCIsInJlY2VpdmVBdHRhY2siLCJjb29yZGluYXRlIiwiaXNTdW5rIiwiY291bnRPY2N1cGllZFNxdWFyZXMiLCJhdmFpbGFibGVTcXVhcmVzIiwiZW5lbXlCb2FyZCIsImhhc0JlZW5BdHRhY2tlZCIsInJhbmRSb3ciLCJyYW5kQ29sdW1uIiwiaGl0cyIsInBvc2l0aW9uIiwiaW5jbHVkZXMiLCJjb3B5cmlnaHRTcGFuIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwibW9kYWwiLCJtYWluR2FtZSIsIndpbmRvdyIsInNob3dNb2RhbCIsInN0YXJ0QnRuIiwiYWxpYXMiLCJrZXlDb2RlIiwiY2xpY2siLCJuZXdHYW1lIiwiaW5mb0ljb24iLCJpbmZvTW9kYWwiLCJ0b2dnbGUiXSwic291cmNlUm9vdCI6IiJ9