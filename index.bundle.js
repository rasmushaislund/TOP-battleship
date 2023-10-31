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
  // const playerId = document.querySelector('#your-board');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXdDO0FBQzlFLHNDQUFzQyx1RkFBd0M7QUFDOUUsc0NBQXNDLHVGQUF3QztBQUM5RSxzQ0FBc0MsdUZBQXdDO0FBQzlFO0FBQ0E7QUFDQSwrREFBZSxJQUFJOzs7Ozs7Ozs7O0FDakJOOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7OztBQUdKOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ3pCQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2NvbnRyb2xsZXIvZGlzcGxheUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvY29udHJvbGxlci9nYW1lQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9kYXRhL3NoaXBQcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9odG1sL2luZGV4Lmh0bWwiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvaHRtbC1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/ZTMyMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTVEFSVCAvL1xuXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi9nYW1lQ29udHJvbGxlcic7XG5pbXBvcnQgeyBzaGlwUHJvcGVydGllcyB9IGZyb20gJy4uL2RhdGEvc2hpcFByb3BlcnRpZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gRGlzcGxheShwbGF5ZXJOYW1lKSB7XG4gIGNvbnN0IHBsYXllciA9IHBsYXllck5hbWU7XG4gIGNvbnN0IGFpID0gJ1BpcmF0ZSBBSSc7XG4gIGNvbnN0IGdhbWUgPSBHYW1lKHBsYXllciwgYWkpO1xuXG4gIGNvbnN0IHBsYXllckJvYXJkID0gZ2FtZS5nZXRQbGF5ZXJCb2FyZCgpO1xuICBjb25zdCBhaUJvYXJkID0gZ2FtZS5nZXRBaUJvYXJkKCk7XG5cbiAgY29uc3QgZ2V0UGxheWVyID0gZ2FtZS5nZXRQbGF5ZXIoKTtcbiAgY29uc3QgZ2V0QWkgPSBnYW1lLmdldEFpKCk7XG5cbiAgLy8gU2V0dGluZyBwbGF5ZXIgYW5kIGFpIG5hbWVzIG9uIFVJXG4gIGNvbnN0IHNldFBsYXllck5hbWUgPSAocGxheWVyLCBhaSkgPT4ge1xuICAgIGNvbnN0IHBsYXllcklkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lvdXItYm9hcmQnKTtcbiAgICBjb25zdCBhaUlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29wcG9uZW50LWJvYXJkJyk7XG4gICAgcGxheWVySWQudGV4dENvbnRlbnQgPSBwbGF5ZXI7XG4gICAgYWlJZC50ZXh0Q29udGVudCA9IGFpO1xuICB9O1xuXG4gIC8vIENvbG9yIGNlbGxzIG9jY3VwaWVkIGJ5IHNoaXBzIG9uIHRoZSBwbGF5ZXIgYm9hcmRcbiAgY29uc3QgY29sb3JTaGlwQ2VsbHMgPSAocm93LCBjb2x1bW4sIHR5cGUpID0+IHtcbiAgICBjb25zdCBzZWxlY3RDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbZGF0YS1pbmRleC1udW1iZXI9JyR7cm93fS0ke2NvbHVtbn0nXWAsXG4gICAgKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBQcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodHlwZSA9PT0gc2hpcFByb3BlcnRpZXNbaV0udHlwZSkge1xuICAgICAgICBzZWxlY3RDZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGAke3NoaXBQcm9wZXJ0aWVzW2ldLmNvbG9yfWA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIEJ1aWxkIGJvYXJkIGdyaWRzIGJhc2VkIG9uIDJELWFycmF5c1xuICBjb25zdCBidWlsZEdyaWRzID0gKCkgPT4ge1xuICAgIC8vIEJ1aWxkIHBsYXllciBncmlkXG4gICAgY29uc3QgcGxheWVyMmRBcnJheSA9IHBsYXllckJvYXJkLmJvYXJkO1xuICAgIGNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQtcGxheWVyJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXIyZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBsYXllcjJkQXJyYXlbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnLCAnY2VsbC1wbGF5ZXInKTtcbiAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgICAgIGNlbGwuZGF0YXNldC5pbmRleE51bWJlciA9IGAke1tpXX0tJHtbal19YDtcbiAgICAgICAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2VsbCk7XG5cbiAgICAgICAgLy8gSWYgYXJyYXktaW5kZXggaXMgYSBzaGlwIHRoZW4gYWRkIHNoaXAtbmFtZSBhcyBjbGFzcyBvbiBncmlkLWNlbGxcbiAgICAgICAgaWYgKHR5cGVvZiBwbGF5ZXIyZEFycmF5W2ldW2pdICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgIGNvbnN0IHJvdyA9IGk7XG4gICAgICAgICAgY29uc3QgY29sdW1uID0gajtcbiAgICAgICAgICBjb25zdCBzaGlwVHlwZSA9IHBsYXllcjJkQXJyYXlbaV1bal1bMV0udHlwZTtcbiAgICAgICAgICBjb2xvclNoaXBDZWxscyhyb3csIGNvbHVtbiwgc2hpcFR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQnVpbGQgYWkgZ3JpZFxuICAgIGNvbnN0IGFpMmRBcnJheSA9IGFpQm9hcmQuYm9hcmQ7XG4gICAgY29uc3QgYWlCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWJvYXJkLW9wcG9uZW50Jyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhaTJkQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWkyZEFycmF5W2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJywgJ2NlbGwtb3Bwb25lbnQnKTtcbiAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgICAgIGNlbGwuZGF0YXNldC5pbmRleE51bWJlciA9IGAke1tpXX0tJHtbal19YDtcbiAgICAgICAgYWlCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gU2V0IG5hbWUgaW4gXCJ3YWl0aW5nIGZvciBwbGF5ZXJcIlxuICBjb25zdCBzZXROYW1lV2FpdGluZyA9ICgpID0+IHtcbiAgICBjb25zdCB3YWl0aW5nRm9yUGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1pZCcpO1xuICAgIGNvbnN0IGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkZXInKTtcbiAgICB3YWl0aW5nRm9yUGxheWVyLnRleHRDb250ZW50ID0gZ2FtZS5nZXRBY3RpdmVQbGF5ZXIoKS5uYW1lO1xuXG4gICAgLy8gU2hvdyBsb2FkZXIgd2hpbGUgd2FpdGluZyBmb3IgcGxheWVyIHRvIG1ha2UgYSBtb3ZlXG4gICAgbG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xuICB9O1xuXG4gIHNldFBsYXllck5hbWUocGxheWVyLCBhaSk7XG4gIGJ1aWxkR3JpZHMoKTtcbiAgc2V0TmFtZVdhaXRpbmcoKTtcblxuICBjb25zdCBib2FyZEFjY2Vzc2liaWxpdHkgPSAoc3RhdHVzKSA9PiB7XG4gICAgLy8gRGlzYWJsZSBib2FyZCBmb3IgZnVydGhlciBpbnB1dCB3aGVuIHdpbm5lciBpcyBmb3VuZCBvciBhaSBpcyB0byBtYWtlIGFuIGF0dGFja1xuICAgIGNvbnN0IGdhbWVCb2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FtZS1ib2FyZCcpO1xuICAgIGNvbnN0IGFpQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1ib2FyZC1vcHBvbmVudCcpO1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcblxuICAgIGlmIChzdGF0dXMgPT09ICd3YWl0aW5nJykge1xuICAgICAgYWlCb2FyZC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZC1ib2FyZCcpO1xuICAgIH1cblxuICAgIGdhbWVCb2FyZHMuZm9yRWFjaCgoYm9hcmQpID0+IHtcbiAgICAgIGlmIChzdGF0dXMgPT09ICdkaXNhYmxlJykge1xuICAgICAgICBib2FyZC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZC1ib2FyZCcpO1xuICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdlbmFibGUnKSB7XG4gICAgICAgIGJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkLWJvYXJkJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBpZiAoc3RhdHVzID09PSAnZGlzYWJsZScpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZC1jZWxsJyk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ2VuYWJsZScpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZC1jZWxsJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gRXZlbnQgbGlzdGVuZXIgZm9yIHBsYXllciBhdHRhY2sgb24gZW5lbXlcbiAgY29uc3Qgb3Bwb25lbnRCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWJvYXJkLW9wcG9uZW50Jyk7XG5cbiAgb3Bwb25lbnRCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG5cbiAgICAvLyBDb252ZXJ0IGNlbGwgaW5kZXhOdW1iZXIgdG8gY29vcmRpbmF0ZXNcbiAgICBjb25zdCBpbmRleE51bWJlciA9IHRhcmdldC5kYXRhc2V0LmluZGV4TnVtYmVyO1xuICAgIGNvbnN0IGluZGV4VG9BcnJheSA9IGluZGV4TnVtYmVyLnNwbGl0KCctJyk7XG4gICAgY29uc3Qgcm93ID0gTnVtYmVyKGluZGV4VG9BcnJheVswXSk7XG4gICAgY29uc3QgY29sdW1uID0gTnVtYmVyKGluZGV4VG9BcnJheVsxXSk7XG5cbiAgICAvLyBJbml0aWF0ZSByb3VuZCB3aXRoIGF0dGFjayBmcm9tIHBsYXllclxuICAgIGdhbWUucGxheVJvdW5kKHJvdywgY29sdW1uKTtcblxuICAgIC8vIFNldCBhcHByb3ByaWF0ZSBpY29uIG9uIGF0dGFja2VkIG9wcG9uZW50IGNlbGwgd2V0aGVyIGEgaGl0IG9yIGEgbWlzc1xuICAgIGlmICghYWlCb2FyZC5pc0hpdCkge1xuICAgICAgY29uc3QgbWlzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgbWlzcy5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgICBtaXNzLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4uL2Fzc2V0cy9pbWcvbWlzcy5zdmcnKTtcbiAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChtaXNzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaGl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICBoaXQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICBoaXQuc2V0QXR0cmlidXRlKCdzcmMnLCAnLi4vYXNzZXRzL2ltZy9oaXQuc3ZnJyk7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoaGl0KTtcbiAgICB9XG5cbiAgICAvLyBEaXNhYmxlIGF0dGFja2VkIG9wcG9uZW50IGNlbGxcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdhdHRhY2tlZC1vcHBvbmVudC1jZWxsJyk7XG5cbiAgICBjb25zdCBhaSA9IGdhbWUuZ2V0QWkoKTtcblxuICAgIC8vIFNldCBhcHByb3ByaWF0ZSBpY29uIG9uIGF0dGFja2VkIHBsYXllciBjZWxsIHdldGhlciBhIGhpdCBvciBhIG1pc3NcbiAgICBjb25zdCBzaG93QWlBdHRhY2sgPSAoKSA9PiB7XG4gICAgICBjb25zdCBsYXRlc3RBaUF0dGFjayA9IGFpLmF0dGFja3NbYWkuYXR0YWNrcy5sZW5ndGggLSAxXTtcbiAgICAgIGNvbnN0IGFpQXR0YWNrUm93ID0gbGF0ZXN0QWlBdHRhY2tbMF07XG4gICAgICBjb25zdCBhaUF0dGFja0NvbHVtbiA9IGxhdGVzdEFpQXR0YWNrWzFdO1xuICAgICAgY29uc3QgZ2V0UGxheWVyQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGBbZGF0YS1pbmRleC1udW1iZXI9JyR7YWlBdHRhY2tSb3d9LSR7YWlBdHRhY2tDb2x1bW59J11gLFxuICAgICAgKTtcblxuICAgICAgaWYgKCFwbGF5ZXJCb2FyZC5pc0hpdCkge1xuICAgICAgICBjb25zdCBtaXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIG1pc3MuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgICAgICBtaXNzLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4uL2Fzc2V0cy9pbWcvbWlzcy5zdmcnKTtcbiAgICAgICAgZ2V0UGxheWVyQ2VsbC5hcHBlbmRDaGlsZChtaXNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGhpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBoaXQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAgIGhpdC5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuLi9hc3NldHMvaW1nL2hpdC5zdmcnKTtcbiAgICAgICAgZ2V0UGxheWVyQ2VsbC5hcHBlbmRDaGlsZChoaXQpO1xuICAgICAgfVxuICAgICAgYm9hcmRBY2Nlc3NpYmlsaXR5KCdlbmFibGUnKTtcbiAgICB9O1xuXG4gICAgLy8gU2hvdyBhIHdpbm5lclxuICAgIGNvbnN0IGdldFdpbm5lciA9IGdhbWUuZ2V0V2lubmVyKCk7XG4gICAgY29uc3Qgd2lubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci13b24nKTtcbiAgICBjb25zdCB3aW5uZXJJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3aW5uZXItaWQnKTtcbiAgICBjb25zdCBwbGF5ZXJUdXJuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci10dXJuJyk7XG5cbiAgICBpZiAoZ2V0V2lubmVyKSB7XG4gICAgICB3aW5uZXJJZC50ZXh0Q29udGVudCA9IGdldFdpbm5lcjtcbiAgICAgIHdpbm5lci5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcbiAgICAgIHBsYXllclR1cm4uY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XG5cbiAgICAgIGJvYXJkQWNjZXNzaWJpbGl0eSgnZGlzYWJsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5uZXIuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XG4gICAgICBwbGF5ZXJUdXJuLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xuXG4gICAgICAvLyBQcmV2ZW50IG5ldyBwbGF5ZXIgYXR0YWNrIGJlZm9yZSBhaSBoYXMgYXR0YWNrZWRcbiAgICAgIGJvYXJkQWNjZXNzaWJpbGl0eSgnd2FpdGluZycpO1xuXG4gICAgICAvLyBNYWtlcyByYW5kb20gZGVsYXkgaW4gYWkgZGVjaXNpb25cbiAgICAgIGNvbnN0IGFpVGhpbmtUaW1lID0gTWF0aC5yYW5kb20oKSAqIDMwMDA7XG4gICAgICBjb25zb2xlLmxvZyhhaVRoaW5rVGltZSk7XG4gICAgICBzZXRUaW1lb3V0KHNob3dBaUF0dGFjaywgYWlUaGlua1RpbWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gV2hlbiBjb25maXJtaW5nIGEgbmV3IGdhbWVcbiAgY29uc3QgbW9kYWxDb25maXJtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWNvbmZpcm0nKTtcbiAgLy8gY29uc3QgcGxheWVySWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeW91ci1ib2FyZCcpO1xuICBjb25zdCBjb25maXJtWWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3llcy1idG4nKTtcbiAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1ib2FyZC1wbGF5ZXInKTtcbiAgY29uc3QgYWlCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWJvYXJkLW9wcG9uZW50Jyk7XG5cbiAgY29uZmlybVllcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBtb2RhbENvbmZpcm0uY2xvc2UoKTtcbiAgICBtb2RhbENvbmZpcm0uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuXG4gICAgLy8gQ2xlYXIgYm9hcmRzXG4gICAgd2hpbGUgKHBsYXllckJvYXJkQ29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHBsYXllckJvYXJkQ29udGFpbmVyLnJlbW92ZUNoaWxkKHBsYXllckJvYXJkQ29udGFpbmVyLmxhc3RDaGlsZCk7XG4gICAgfVxuICAgIHdoaWxlIChhaUJvYXJkQ29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGFpQm9hcmRDb250YWluZXIucmVtb3ZlQ2hpbGQoYWlCb2FyZENvbnRhaW5lci5sYXN0Q2hpbGQpO1xuICAgIH1cblxuICAgIC8vIFJlc2V0IEluaXRpYWxpemVkIGNsYXNzZXNcbiAgICBwbGF5ZXJCb2FyZC5yZXNldCgpO1xuICAgIGFpQm9hcmQucmVzZXQoKTtcbiAgICBnZXRQbGF5ZXIucmVzZXQoKTtcbiAgICBnZXRBaS5yZXNldCgpO1xuXG4gICAgLy8gUmUtYnVpbGQgYm9hcmRzIGFuZCByZS1wbGFjZSBzaGlwcyBhZnRlciBjbGFzcyByZXNldFxuICAgIHBsYXllckJvYXJkLmJ1aWxkQm9hcmQoKTtcbiAgICBhaUJvYXJkLmJ1aWxkQm9hcmQoKTtcbiAgICBwbGF5ZXJCb2FyZC5nZXRSYW5kb21QbGFjZW1lbnQoKTtcbiAgICBhaUJvYXJkLmdldFJhbmRvbVBsYWNlbWVudCgpO1xuICAgIGJ1aWxkR3JpZHMoKTtcblxuICAgIC8vIEhpZGUgd2lubmVyIFVJIGFuZCBzaG93IHBsYXllciB3YWl0IFVJXG4gICAgY29uc3Qgd2lubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci13b24nKTtcbiAgICBjb25zdCBwbGF5ZXJUdXJuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci10dXJuJyk7XG4gICAgd2lubmVyLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xuICAgIHBsYXllclR1cm4uY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XG5cbiAgICAvLyBFbmFibGUgZW5lbXkgYm9hcmQgZm9yIGF0dGFja3NcbiAgICBib2FyZEFjY2Vzc2liaWxpdHkoJ2VuYWJsZScpO1xuICB9KTtcblxuICAvLyBXaGVuIHJlZ3JldHRpbmcgdG8gc3RhcnQgYSBuZXcgZ2FtZVxuICBjb25zdCBjb25maXJtTm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm8tYnRuJyk7XG5cbiAgY29uZmlybU5vLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG1vZGFsQ29uZmlybS5jbG9zZSgpO1xuICAgIG1vZGFsQ29uZmlybS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gIH0pO1xufVxuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4uL2ZhY3Rvcmllcy9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi4vZmFjdG9yaWVzL3BsYXllcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBHYW1lKHBsYXllck5hbWUsIGFpTmFtZSkge1xuICAvLyBJbml0aWFsaXplIGdhbWVib2FyZCBhbmQgcGxhY2Ugc2hpcHNcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGFpQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGdldFBsYXllckJvYXJkID0gKCkgPT4gcGxheWVyQm9hcmQ7XG4gIGNvbnN0IGdldEFpQm9hcmQgPSAoKSA9PiBhaUJvYXJkO1xuXG4gIGNvbnN0IGJ1aWxkUGxheWVyQm9hcmQgPSBwbGF5ZXJCb2FyZC5idWlsZEJvYXJkKCk7XG4gIGNvbnN0IGJ1aWxkQWlCb2FyZCA9IGFpQm9hcmQuYnVpbGRCb2FyZCgpO1xuXG4gIGNvbnN0IHBsYWNlU2hpcHNQbGF5ZXIgPSBwbGF5ZXJCb2FyZC5nZXRSYW5kb21QbGFjZW1lbnQoKTtcbiAgY29uc3QgcGxhY2VTaGlwc0FpID0gYWlCb2FyZC5nZXRSYW5kb21QbGFjZW1lbnQoKTtcblxuICAvLyBJbml0aWFsaXplIHBsYXllcnMgYW5kIGhhbmRsZSBwbGF5ZXIncyB0dXJuXG4gIGNvbnN0IHBsYXllcnMgPSBbXG4gICAge1xuICAgICAgbmFtZTogcGxheWVyTmFtZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IGFpTmFtZSxcbiAgICB9LFxuICBdO1xuXG4gIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIocGxheWVyc1swXS5uYW1lKTtcbiAgY29uc3QgYWkgPSBuZXcgUGxheWVyKHBsYXllcnNbMV0ubmFtZSk7XG4gIGNvbnN0IGdldFBsYXllciA9ICgpID0+IHBsYXllcjtcbiAgY29uc3QgZ2V0QWkgPSAoKSA9PiBhaTtcblxuICBsZXQgYWN0aXZlUGxheWVyID0gcGxheWVyc1swXTtcbiAgY29uc3Qgc3dpdGNoUGxheWVyVHVybiA9ICgpID0+IHtcbiAgICBpZiAoYWN0aXZlUGxheWVyID09PSBwbGF5ZXJzWzBdKSB7XG4gICAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXJzWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXJzWzBdO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRBY3RpdmVQbGF5ZXIgPSAoKSA9PiBhY3RpdmVQbGF5ZXI7XG5cbiAgLy8gUGxheSBhIHJvdW5kIG9mIHRoZSBnYW1lXG4gIGxldCB3aW5uZXI7XG4gIGNvbnN0IGdldFdpbm5lciA9ICgpID0+IHdpbm5lcjtcblxuICBjb25zdCBwbGF5Um91bmQgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICAvLyBSZXNldCB3aW5uZXIgdmFyaWFibGUgaW4gY2FzZSBvZiBuZXcgZ2FtZVxuICAgIHdpbm5lciA9ICcnO1xuXG4gICAgLy8gQ2hlY2sgZm9yIGEgd2lubmVyXG4gICAgY29uc3QgaXNXaW5uZXIgPSAoKSA9PiB7XG4gICAgICBpZiAocGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgd2lubmVyID0gcGxheWVyc1sxXS5uYW1lO1xuICAgICAgfSBlbHNlIGlmIChhaUJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgIHdpbm5lciA9IHBsYXllcnNbMF0ubmFtZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKGdldEFjdGl2ZVBsYXllcigpID09PSBwbGF5ZXJzWzBdKSB7XG4gICAgICBwbGF5ZXIuYXR0YWNrU3F1YXJlKHJvdywgY29sdW1uLCBhaUJvYXJkKTtcbiAgICAgIGlzV2lubmVyKCk7XG4gICAgfVxuXG4gICAgc3dpdGNoUGxheWVyVHVybigpO1xuXG4gICAgLy8gTGV0IEFJIGF0dGFjayBwbGF5ZXIgYm9hcmQgd2l0aCBcInRoaW5raW5nXCIgZGVsYXlcbiAgICBpZiAoZ2V0QWN0aXZlUGxheWVyKCkgPT09IHBsYXllcnNbMV0pIHtcbiAgICAgIGNvbnN0IGFpQXR0YWNrID0gKCkgPT4ge1xuICAgICAgICBhaS5hdHRhY2tSYW5kb21TcXVhcmUocGxheWVyQm9hcmQpO1xuICAgICAgICBpZiAoYWkuYWxyZWFkeUF0dGFja2VkKSBhaUF0dGFjaygpO1xuICAgICAgfTtcbiAgICAgIGFpQXR0YWNrKCk7XG4gICAgICBpc1dpbm5lcigpO1xuICAgIH1cblxuICAgIHN3aXRjaFBsYXllclR1cm4oKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdldFBsYXllckJvYXJkLFxuICAgIGdldEFpQm9hcmQsXG4gICAgZ2V0UGxheWVyLFxuICAgIGdldEFpLFxuICAgIGdyaWRTaXplOiBnZXRQbGF5ZXJCb2FyZC5ncmlkU2l6ZSxcbiAgICBnZXRBY3RpdmVQbGF5ZXIsXG4gICAgcGxheVJvdW5kLFxuICAgIGdldFdpbm5lcixcbiAgfTtcbn1cblxuLy8gRU5EIC8vXG4iLCIvLyBTVEFSVCAvL1xuXG5leHBvcnQgY29uc3Qgc2hpcFByb3BlcnRpZXMgPSBbXG4gIHtcbiAgICB0eXBlOiAnQ2FycmllcicsXG4gICAgbGVuZ3RoOiA1LFxuICAgIGNvbG9yOiAncmdiKDI1MiwgNCwgNCwgLjQpJyxcbiAgfSxcbiAge1xuICAgIHR5cGU6ICdCYXR0bGVzaGlwJyxcbiAgICBsZW5ndGg6IDQsXG4gICAgY29sb3I6ICdyZ2IoNCwgMTQwLCA0LCAuNCknLFxuICB9LFxuICB7XG4gICAgdHlwZTogJ0Rlc3Ryb3llcicsXG4gICAgbGVuZ3RoOiAzLFxuICAgIGNvbG9yOiAncmdiKDQsIDQsIDI1MiwgLjQpJyxcbiAgfSxcbiAge1xuICAgIHR5cGU6ICdTdWJtYXJpbmUnLFxuICAgIGxlbmd0aDogMyxcbiAgICBjb2xvcjogJ3JnYigyNTIsIDI1MSwgMzIsIC40KScsXG4gIH0sXG4gIHtcbiAgICB0eXBlOiAnUGF0cm9sIEJvYXQnLFxuICAgIGxlbmd0aDogMixcbiAgICBjb2xvcjogJ3JnYigxMiwgNCwgMTIsIC40KScsXG4gIH0sXG5dO1xuIiwiLy8gU1RBUlQgLy9cblxuaW1wb3J0IHsgc2hpcFByb3BlcnRpZXMgfSBmcm9tICcuLi9kYXRhL3NoaXBQcm9wZXJ0aWVzJztcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuXG5leHBvcnQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgYm9hcmQ7XG4gIG1pc3NlZFNob3RzO1xuICBzdW5rZW5TaGlwcztcbiAgZ3JpZFNpemUgPSAxMDtcbiAgaXNIaXQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgIHRoaXMubWlzc2VkU2hvdHMgPSBbXTtcbiAgICB0aGlzLnN1bmtlblNoaXBzID0gW107XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmJvYXJkID0gW107XG4gICAgdGhpcy5taXNzZWRTaG90cyA9IFtdO1xuICAgIHRoaXMuc3Vua2VuU2hpcHMgPSBbXTtcbiAgfVxuXG4gIC8vIEdlbmVyYXRlIHRoZSBnYW1lIGJvYXJkIGFzIGEgMkQtYXJyYXlcbiAgYnVpbGRCb2FyZCgpIHtcbiAgICBsZXQgdmFsdWUgPSAxO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdyaWRTaXplOyBpKyspIHtcbiAgICAgIHRoaXMuYm9hcmRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ncmlkU2l6ZTsgaisrKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbaV1bal0gPSB2YWx1ZSsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSB0b3RhbCBmbGVldCBzaXplIGNvdW50ZWQgYXMgdG90YWwgbnVtYmVyIG9mIHNxdWFyZXMgb2NjdXBpZWRcbiAgLy8gYnkgdGhlIHNoaXBzIG9uIHRoZSBnYW1lLXJlYWR5IGJvYXJkXG4gIGZsZWV0KCkge1xuICAgIGxldCBmbGVldFNpemUgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZsZWV0U2l6ZSArPSBzaGlwUHJvcGVydGllc1tpXS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBmbGVldFNpemU7XG4gIH1cblxuICAvLyBDcmVhdGUgc2hpcHMgYnkgY2FsbGluZyBTaGlwIGNsYXNzXG4gIGNyZWF0ZVNoaXBzKCkge1xuICAgIGNvbnN0IHByb3BzID0gc2hpcFByb3BlcnRpZXM7XG4gICAgbGV0IHNoaXBzQXJyYXkgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGlzVmVydGljYWwgPSBbdHJ1ZSwgZmFsc2VdW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSldO1xuICAgICAgY29uc3QgdmVzc2VsID0gbmV3IFNoaXAocHJvcHNbaV0udHlwZSwgcHJvcHNbaV0ubGVuZ3RoLCBpc1ZlcnRpY2FsKTtcbiAgICAgIHNoaXBzQXJyYXkucHVzaCh2ZXNzZWwpO1xuICAgIH1cbiAgICByZXR1cm4gc2hpcHNBcnJheTtcbiAgfVxuXG4gIHBsYWNlU2hpcHMoc2hpcCwgcm93LCBjb2x1bW4sIHZlcnRpY2FsKSB7XG4gICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZFtyb3cgKyBpXVtjb2x1bW5dID0gW2ksIHNoaXBdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbHVtbiArIGldID0gW2ksIHNoaXBdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFJhbmRvbVBsYWNlbWVudCgpIHtcbiAgICAvLyBHZXQgcmV0dXJuZWQgYXJyYXkgZnJvbSAnY3JlYXRlU2hpcHMoKSdcbiAgICBjb25zdCBzaGlwcyA9IHRoaXMuY3JlYXRlU2hpcHMoKTtcblxuICAgIC8vIENoZWNrIHRvIHNlZSB0aGF0IGJvYXJkIGlzIGVtcHR5IChpLmUuIHJlYWR5IGZvciBhIG5ldyBnYW1lKVxuICAgIGlmICghdGhpcy5pc0JvYXJkRW1wdHkpIHJldHVybjtcblxuICAgIC8vIEZvciBldmVyeSBzaGlwIGluIGFycmF5XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gU2VsZWN0IHJhbmRvbSBzdGFydC1jb29yZGluYXRlXG4gICAgICBjb25zdCByYW5kWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZ3JpZFNpemUpO1xuICAgICAgY29uc3QgcmFuZFkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmdyaWRTaXplKTtcbiAgICAgIC8vIFJlYWQgb3JpZW50YXRpb24gb2Ygc2hpcFxuICAgICAgY29uc3QgdmVydGljYWwgPSBzaGlwc1tpXS52ZXJ0aWNhbDtcblxuICAgICAgLy8gQ2hlY2sgaWYgcGxhY2VtZW50IGlzIGFsbG93ZWQgLSBvdGhlcndpc2UgcmUtc3RhcnQgbG9vcCBmcm9tIGN1cnJlbnQgaW5kZXggYWdhaW5cbiAgICAgIGlmICghdGhpcy5wbGFjZW1lbnRBbGxvd2VkKHNoaXBzW2ldLCByYW5kWCwgcmFuZFksIHZlcnRpY2FsKSkge1xuICAgICAgICBpLS07XG4gICAgICB9IGVsc2UgdGhpcy5wbGFjZVNoaXBzKHNoaXBzW2ldLCByYW5kWCwgcmFuZFksIHZlcnRpY2FsKTtcbiAgICB9XG4gIH1cblxuICBwbGFjZW1lbnRBbGxvd2VkKHNoaXAsIHJvdywgY29sdW1uLCB2ZXJ0aWNhbCkge1xuICAgIC8vIENoZWNrIGlmIHBsYWNlbWVudCBvZiBzaGlwIGlzIGZ1bGx5IG9yIHBhcnRseSBvdXRzaWRlIGdyaWQgcGVyaW1ldGVyXG4gICAgaWYgKFxuICAgICAgcm93ID4gdGhpcy5ncmlkU2l6ZSB8fFxuICAgICAgY29sdW1uID4gdGhpcy5ncmlkU2l6ZSB8fFxuICAgICAgcm93ICsgc2hpcC5sZW5ndGggPiB0aGlzLmdyaWRTaXplIHx8XG4gICAgICBjb2x1bW4gKyBzaGlwLmxlbmd0aCA+IHRoaXMuZ3JpZFNpemVcbiAgICApXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBDaGVjayBpZiBhIGdpdmVuIGNvb3JkaW5hdGUgaXMgYWxyZWFkeSBvY2N1cGllZFxuICAgIGlmICh2ZXJ0aWNhbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFtyb3cgKyBpXVtjb2x1bW5dICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW3Jvd11bY29sdW1uICsgaV0gIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbikge1xuICAgIGxldCBjb29yZGluYXRlID0gdGhpcy5ib2FyZFtyb3ddW2NvbHVtbl07XG5cbiAgICBpZiAodHlwZW9mIGNvb3JkaW5hdGUgIT09ICdudW1iZXInKSB7XG4gICAgICBjb29yZGluYXRlWzFdLmhpdChjb29yZGluYXRlWzBdKTtcbiAgICAgIHRoaXMuaXNIaXQgPSB0cnVlO1xuICAgICAgaWYgKGNvb3JkaW5hdGVbMV0uaXNTdW5rKCkpIHtcbiAgICAgICAgdGhpcy5zdW5rZW5TaGlwcy5wdXNoKGNvb3JkaW5hdGVbMV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pc3NlZFNob3RzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICB0aGlzLmlzSGl0ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGlmICh0aGlzLnN1bmtlblNoaXBzLmxlbmd0aCAhPT0gc2hpcFByb3BlcnRpZXMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0JvYXJkRW1wdHkoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdyaWRTaXplOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ncmlkU2l6ZTsgaisrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFtpXVtqXSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBVc2UgdGhpcyB0byB2ZXJpZnkgY29ycmVjdCBwbGFjZW1lbnQgb2Ygc2hpcHNcbiAgY291bnRPY2N1cGllZFNxdWFyZXMoKSB7XG4gICAgY29uc3QgYXZhaWxhYmxlU3F1YXJlcyA9IHRoaXMuZ3JpZFNpemUgKiB0aGlzLmdyaWRTaXplO1xuICAgIGNvbnN0IGZsZWV0U2l6ZSA9IHRoaXMuZmxlZXQoKTtcbiAgICByZXR1cm4gYXZhaWxhYmxlU3F1YXJlcyAtIChhdmFpbGFibGVTcXVhcmVzIC0gZmxlZXRTaXplKTtcbiAgfVxufVxuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICBhdHRhY2tzO1xuICBhbHJlYWR5QXR0YWNrZWQ7XG5cbiAgY29uc3RydWN0b3IocGxheWVyTmFtZSkge1xuICAgIHRoaXMucGxheWVyTmFtZSA9IHBsYXllck5hbWU7XG4gICAgdGhpcy5hdHRhY2tzID0gW107XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmF0dGFja3MgPSBbXTtcbiAgfVxuXG4gIGF0dGFja1NxdWFyZShyb3csIGNvbHVtbiwgZW5lbXlCb2FyZCkge1xuICAgIGlmICghdGhpcy5oYXNCZWVuQXR0YWNrZWQocm93LCBjb2x1bW4pKSB7XG4gICAgICB0aGlzLmF0dGFja3MucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhdHRhY2tSYW5kb21TcXVhcmUocGxheWVyQm9hcmQpIHtcbiAgICBpZiAodGhpcy5hdHRhY2tzLmxlbmd0aCA+PSAxMDApIHJldHVybjtcbiAgICBjb25zdCByYW5kUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcGxheWVyQm9hcmQuZ3JpZFNpemUpO1xuICAgIGNvbnN0IHJhbmRDb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwbGF5ZXJCb2FyZC5ncmlkU2l6ZSk7XG5cbiAgICBpZiAoIXRoaXMuaGFzQmVlbkF0dGFja2VkKHJhbmRSb3csIHJhbmRDb2x1bW4pKSB7XG4gICAgICB0aGlzLmF0dGFja3MucHVzaChbcmFuZFJvdywgcmFuZENvbHVtbl0pO1xuICAgICAgcGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kUm93LCByYW5kQ29sdW1uKTtcbiAgICAgIHRoaXMuYWxyZWFkeUF0dGFja2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWxyZWFkeUF0dGFja2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBoYXNCZWVuQXR0YWNrZWQocm93LCBjb2x1bW4pIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXR0YWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuYXR0YWNrc1tpXVswXSA9PT0gcm93ICYmIHRoaXMuYXR0YWNrc1tpXVsxXSA9PT0gY29sdW1uKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIEVORCAvL1xuIiwiLy8gU1RBUlQgLy9cblxuZXhwb3J0IGNsYXNzIFNoaXAge1xuICB0eXBlO1xuICBsZW5ndGg7XG4gIHZlcnRpY2FsID0gZmFsc2U7XG4gIGhpdHM7XG5cbiAgY29uc3RydWN0b3IodHlwZSwgbGVuZ3RoLCB2ZXJ0aWNhbCkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy52ZXJ0aWNhbCA9IHZlcnRpY2FsO1xuICAgIHRoaXMuaGl0cyA9IFtdO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5oaXRzID0gW107XG4gIH1cblxuICBoaXQocG9zaXRpb24pIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmhpdHMuaW5jbHVkZXMocG9zaXRpb24pIHx8XG4gICAgICBwb3NpdGlvbiA8IDAgfHxcbiAgICAgIHBvc2l0aW9uID4gdGhpcy5sZW5ndGggLSAxXG4gICAgKVxuICAgICAgcmV0dXJuO1xuICAgIHRoaXMuaGl0cy5wdXNoKHBvc2l0aW9uKTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRzLmxlbmd0aCA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0ICcuL2h0bWwvaW5kZXguaHRtbCc7XG5pbXBvcnQgeyBEaXNwbGF5IH0gZnJvbSAnLi9jb250cm9sbGVyL2Rpc3BsYXlDb250cm9sbGVyJztcblxuLy8gU2V0IGNvcHlyaWdodCB5ZWFyIGF1dG9tYXRpY2FsbHlcbmNvbnN0IGNvcHlyaWdodFNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29weXJpZ2h0LXNwYW4nKTtcbmNvcHlyaWdodFNwYW4udGV4dENvbnRlbnQgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cbi8vIFNob3cgbW9kYWwgd2l0aCBwYWdlIGxvYWRcbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLW5hbWUnKTtcbmNvbnN0IG1haW5HYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tZ2FtZScpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgbWFpbkdhbWUuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICBtb2RhbC5zaG93TW9kYWwoKTtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xufSk7XG5cbi8vIFN0YXJ0IGdhbWUgd2hlbiBwbGF5ZXIgbmFtZSBoYXMgYmVlbiBlbnRlcmVkXG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1idG4nKTtcbmNvbnN0IGFsaWFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1uYW1lJyk7XG5cbnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBtb2RhbC5jbG9zZSgpO1xuICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gIG1haW5HYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblxuICBEaXNwbGF5KGFsaWFzLnZhbHVlKTtcbn0pO1xuXG4vLyAuLi4gb3IgcHJlc3MgJ2VudGVyJ1xuYWxpYXMuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICBpZiAoZS5rZXlDb2RlID09PSAxMykgc3RhcnRCdG4uY2xpY2soKTtcbn0pO1xuXG4vLyBTaG93IGNvbmZpcm1hdGlvbiBtb2RhbCB3aGVuIHdhbnRpbmcgYSBuZXcgZ2FtZVxuY29uc3QgbmV3R2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctZ2FtZS1idG4nKTtcbmNvbnN0IG1vZGFsQ29uZmlybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jb25maXJtJyk7XG5cbm5ld0dhbWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIG1vZGFsQ29uZmlybS5zaG93TW9kYWwoKTtcbiAgbW9kYWxDb25maXJtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbn0pO1xuXG4vLyBTaG93IGluZm8gbW9kYWwgb24gaG92ZXJcbmNvbnN0IGluZm9JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8taWNvbicpO1xuY29uc3QgaW5mb01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWluZm8nKTtcblxuaW5mb0ljb24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICBpbmZvTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xufSk7XG5cbmluZm9JY29uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICBpbmZvTW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xufSk7XG5cbmluZm9JY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4ge1xuICBpbmZvTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xufSk7XG5cbi8vIEVORCAvL1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9odG1sLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltZy9naXRodWItbG9nby5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1nL3NhaWxvci5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1nL2luZm8uc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltZy9oaXQuc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzRfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltZy9taXNzLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0hUTUxfTE9BREVSX0lNUE9SVF81X19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWcvcGlyYXRlLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xuLy8gTW9kdWxlXG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzBfX18pO1xudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzFfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF8xX19fKTtcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8yX19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfMl9fXyk7XG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzNfX18pO1xudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzRfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF80X19fKTtcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF81X19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfNV9fXyk7XG52YXIgY29kZSA9IFwiPCFkb2N0eXBlIGh0bWw+XFxuPGh0bWwgbGFuZz1cXFwiZW5cXFwiPlxcbiAgPGhlYWQ+XFxuICAgIDxtZXRhIGNoYXJzZXQ9XFxcIlVURi04XFxcIiAvPlxcbiAgICA8bWV0YSBuYW1lPVxcXCJ2aWV3cG9ydFxcXCIgY29udGVudD1cXFwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFxcXCIgLz5cXG4gICAgPHRpdGxlPkJhdHRsZXNoaXA8L3RpdGxlPlxcbiAgICA8bGlua1xcbiAgICAgIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9T3JiaXRyb24mZGlzcGxheT1zd2FwXFxcIlxcbiAgICAgIHJlbD1cXFwic3R5bGVzaGVldFxcXCJcXG4gICAgLz5cXG4gICAgPGxpbmtcXG4gICAgICByZWw9XFxcInN0eWxlc2hlZXRcXFwiXFxuICAgICAgaHJlZj1cXFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzQuNy4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzc1xcXCJcXG4gICAgLz5cXG4gICAgPGxpbmtcXG4gICAgICBocmVmPVxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUludGVyJmZhbWlseT1QbGF5ZmFpcitEaXNwbGF5JmRpc3BsYXk9c3dhcFxcXCJcXG4gICAgICByZWw9XFxcInN0eWxlc2hlZXRcXFwiXFxuICAgIC8+XFxuICAgIDxsaW5rXFxuICAgICAgaHJlZj1cXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1DYXZlYXQmZGlzcGxheT1zd2FwXFxcIlxcbiAgICAgIHJlbD1cXFwic3R5bGVzaGVldFxcXCJcXG4gICAgLz5cXG4gICAgPGxpbmtcXG4gICAgICBocmVmPVxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUx1Y2tpZXN0K0d1eSZkaXNwbGF5PXN3YXBcXFwiXFxuICAgICAgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIlxcbiAgICAvPlxcbiAgICA8bGlua1xcbiAgICAgIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TW9ub3RvbiZkaXNwbGF5PXN3YXBcXFwiXFxuICAgICAgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIlxcbiAgICAvPlxcbiAgPC9oZWFkPlxcbiAgPGJvZHk+XFxuICAgIDxkaXYgY2xhc3M9XFxcImRldmVsb3BlclxcXCI+XFxuICAgICAgPHAgY2xhc3M9XFxcImNvcHlyaWdodFxcXCI+JmNvcHk8c3BhbiBpZD1cXFwiY29weXJpZ2h0LXNwYW5cXFwiPiAyMDIzPC9zcGFuPjwvcD5cXG4gICAgICA8YVxcbiAgICAgICAgY2xhc3M9XFxcImdpdGh1Yi1saW5rXFxcIlxcbiAgICAgICAgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL3Jhc211c2hhaXNsdW5kXFxcIlxcbiAgICAgICAgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiXFxuICAgICAgICA+UmFzbXVzIEguXFxuICAgICAgICA8aW1nXFxuICAgICAgICAgIHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8wX19fICsgXCJcXFwiXFxuICAgICAgICAgIGNsYXNzPVxcXCJnaXRodWItbG9nb1xcXCJcXG4gICAgICAgICAgYWx0PVxcXCJnaXRodWIgbG9nb1xcXCJcXG4gICAgICAvPjwvYT5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImhlYWRlclxcXCI+XFxuICAgICAgPHAgY2xhc3M9XFxcInRpdGxlXFxcIj5CQVRUTEVTSElQPC9wPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpYWxvZyBjbGFzcz1cXFwibW9kYWwtbmFtZVxcXCI+XFxuICAgICAgPGxhYmVsIGNsYXNzPVxcXCJtb2RhbC1sYWJlbFxcXCIgZm9yPVxcXCJwbGF5ZXItbmFtZVxcXCI+RW50ZXIgeW91ciBnYW1lIGFsaWFzPC9sYWJlbD5cXG4gICAgICA8aW5wdXRcXG4gICAgICAgIGlkPVxcXCJwbGF5ZXItbmFtZVxcXCJcXG4gICAgICAgIHR5cGU9XFxcInRleHRcXFwiXFxuICAgICAgICBuYW1lPVxcXCJwbGF5ZXJfbmFtZVxcXCJcXG4gICAgICAgIG1heGxlbmd0aD1cXFwiMjBcXFwiXFxuICAgICAgICBtaW5sZW5ndGg9XFxcIjFcXFwiXFxuICAgICAgICBwbGFjZWhvbGRlcj1cXFwiRW50ZXIgYWxpYXNcXFwiXFxuICAgICAgICBhdXRvZm9jdXNcXG4gICAgICAgIHJlcXVpcmVkXFxuICAgICAgLz5cXG4gICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG5cXFwiIGlkPVxcXCJzdGFydC1idG5cXFwiIHR5cGU9XFxcInN1Ym1pdFxcXCI+U1RBUlQ8L2J1dHRvbj5cXG4gICAgPC9kaWFsb2c+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1haW4tZ2FtZSBoaWRlXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJnYW1lLWNvbnRhaW5lclxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwbGF5ZXItdHVyblxcXCI+XFxuICAgICAgICAgIDxwIGNsYXNzPVxcXCJnYW1lLXRleHRcXFwiIGlkPVxcXCJwbGF5ZXItdHVyblxcXCI+XFxuICAgICAgICAgICAgV2FpdGluZyBmb3IgPHNwYW4gaWQ9XFxcInBsYXllci1pZFxcXCI+PC9zcGFuPlxcbiAgICAgICAgICA8L3A+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxvYWRlciBpbnZpc2libGVcXFwiPjwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8cCBjbGFzcz1cXFwiZ2FtZS10ZXh0IGludmlzaWJsZVxcXCIgaWQ9XFxcInBsYXllci13b25cXFwiPlxcbiAgICAgICAgICA8c3BhbiBpZD1cXFwid2lubmVyLWlkXFxcIj48L3NwYW4+IHdpbnMhXFxuICAgICAgICA8L3A+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJib2FyZC1jb250YWluZXJcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJib2FyZFxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYm9hcmQtaW5mb1xcXCI+XFxuICAgICAgICAgICAgICA8aW1nXFxuICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJpY29uIHBsYXllci1pY29uXFxcIlxcbiAgICAgICAgICAgICAgICBzcmM9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMV9fXyArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICBhbHQ9XFxcInBsYXllciBpY29uXFxcIlxcbiAgICAgICAgICAgICAgLz5cXG4gICAgICAgICAgICAgIDxwIGlkPVxcXCJ5b3VyLWJvYXJkXFxcIj48L3A+XFxuICAgICAgICAgICAgICA8aW1nXFxuICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJpY29uIGluZm8taWNvblxcXCJcXG4gICAgICAgICAgICAgICAgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzJfX18gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgYWx0PVxcXCJpbmZvcm1hdGlvblxcXCJcXG4gICAgICAgICAgICAgIC8+XFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1pbmZvIGhpZGVcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNxdWFyZSBzcXVhcmUtNVxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj4mdGltZXM1PC9wPlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dC0xXFxcIj5DYXJyaWVyPC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibGVnZW5kXFxcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzcXVhcmUgc3F1YXJlLTRcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+JnRpbWVzNDwvcD5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPkJhdHRsZXNoaXA8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNxdWFyZSBzcXVhcmUtMy0xXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPiZ0aW1lczM8L3A+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj5EZXN0cm95ZXI8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNxdWFyZSBzcXVhcmUtMy0yXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPiZ0aW1lczM8L3A+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj5TdWJtYXJpbmU8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNxdWFyZSBzcXVhcmUtMlxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj4mdGltZXMyPC9wPlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+UGF0cm9sIEJvYXQ8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxpbWdcXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJsZWdlbmQtaWNvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8zX19fICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgICAgICBhbHQ9XFxcImV4cGxvc2lvblxcXCJcXG4gICAgICAgICAgICAgICAgICAvPlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+SGl0PC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibGVnZW5kXFxcIj5cXG4gICAgICAgICAgICAgICAgICA8aW1nXFxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwibGVnZW5kLWljb25cXFwiXFxuICAgICAgICAgICAgICAgICAgICBzcmM9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfNF9fXyArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgYWx0PVxcXCJ3YXZlc1xcXCJcXG4gICAgICAgICAgICAgICAgICAvPlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+TWlzczwvcD5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJnYW1lLWJvYXJkIGdhbWUtYm9hcmQtcGxheWVyXFxcIj48L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImJvYXJkXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJib2FyZC1pbmZvXFxcIj5cXG4gICAgICAgICAgICAgIDxpbWdcXG4gICAgICAgICAgICAgICAgY2xhc3M9XFxcImljb24gb3Bwb25lbnQtaWNvblxcXCJcXG4gICAgICAgICAgICAgICAgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzVfX18gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgYWx0PVxcXCJvcHBvbmVudCBpY29uXFxcIlxcbiAgICAgICAgICAgICAgLz5cXG4gICAgICAgICAgICAgIDxwIGlkPVxcXCJvcHBvbmVudC1ib2FyZFxcXCI+PC9wPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdhbWUtYm9hcmQgZ2FtZS1ib2FyZC1vcHBvbmVudFxcXCI+PC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG5cXFwiIGlkPVxcXCJuZXctZ2FtZS1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+TkVXIEdBTUU8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaWFsb2cgY2xhc3M9XFxcIm1vZGFsLWNvbmZpcm1cXFwiPlxcbiAgICAgIDxoMz5BcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gc3RhcnQgYSBuZXcgZ2FtZT88L2gzPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ1dHRvbnNcXFwiPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuXFxcIiBpZD1cXFwieWVzLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIj5ZRVM8L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XFxcImJ0blxcXCIgaWQ9XFxcIm5vLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIj5OTzwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2RpYWxvZz5cXG4gIDwvYm9keT5cXG48L2h0bWw+XFxuXCI7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBjb2RlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZSwgbm8tcGFyYW0tcmVhc3NpZ25cblxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLm1heWJlTmVlZFF1b3RlcyAmJiAvW1xcdFxcblxcZlxcciBcIic9PD5gXS8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwsIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJHYW1lIiwic2hpcFByb3BlcnRpZXMiLCJEaXNwbGF5IiwicGxheWVyTmFtZSIsInBsYXllciIsImFpIiwiZ2FtZSIsInBsYXllckJvYXJkIiwiZ2V0UGxheWVyQm9hcmQiLCJhaUJvYXJkIiwiZ2V0QWlCb2FyZCIsImdldFBsYXllciIsImdldEFpIiwic2V0UGxheWVyTmFtZSIsInBsYXllcklkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWlJZCIsInRleHRDb250ZW50IiwiY29sb3JTaGlwQ2VsbHMiLCJyb3ciLCJjb2x1bW4iLCJ0eXBlIiwic2VsZWN0Q2VsbCIsImkiLCJsZW5ndGgiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwiYnVpbGRHcmlkcyIsInBsYXllcjJkQXJyYXkiLCJib2FyZCIsInBsYXllckJvYXJkQ29udGFpbmVyIiwiaiIsImNlbGwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwiZGF0YXNldCIsImluZGV4TnVtYmVyIiwiYXBwZW5kQ2hpbGQiLCJzaGlwVHlwZSIsImFpMmRBcnJheSIsImFpQm9hcmRDb250YWluZXIiLCJzZXROYW1lV2FpdGluZyIsIndhaXRpbmdGb3JQbGF5ZXIiLCJsb2FkZXIiLCJnZXRBY3RpdmVQbGF5ZXIiLCJuYW1lIiwicmVtb3ZlIiwiYm9hcmRBY2Nlc3NpYmlsaXR5Iiwic3RhdHVzIiwiZ2FtZUJvYXJkcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjZWxscyIsImZvckVhY2giLCJvcHBvbmVudEJvYXJkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImluZGV4VG9BcnJheSIsInNwbGl0IiwiTnVtYmVyIiwicGxheVJvdW5kIiwiaXNIaXQiLCJtaXNzIiwiaGl0Iiwic2hvd0FpQXR0YWNrIiwibGF0ZXN0QWlBdHRhY2siLCJhdHRhY2tzIiwiYWlBdHRhY2tSb3ciLCJhaUF0dGFja0NvbHVtbiIsImdldFBsYXllckNlbGwiLCJnZXRXaW5uZXIiLCJ3aW5uZXIiLCJ3aW5uZXJJZCIsInBsYXllclR1cm4iLCJhaVRoaW5rVGltZSIsIk1hdGgiLCJyYW5kb20iLCJjb25zb2xlIiwibG9nIiwic2V0VGltZW91dCIsIm1vZGFsQ29uZmlybSIsImNvbmZpcm1ZZXMiLCJjbG9zZSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImxhc3RDaGlsZCIsInJlc2V0IiwiYnVpbGRCb2FyZCIsImdldFJhbmRvbVBsYWNlbWVudCIsImNvbmZpcm1ObyIsIkdhbWVib2FyZCIsIlBsYXllciIsImFpTmFtZSIsImJ1aWxkUGxheWVyQm9hcmQiLCJidWlsZEFpQm9hcmQiLCJwbGFjZVNoaXBzUGxheWVyIiwicGxhY2VTaGlwc0FpIiwicGxheWVycyIsImFjdGl2ZVBsYXllciIsInN3aXRjaFBsYXllclR1cm4iLCJpc1dpbm5lciIsImFsbFNoaXBzU3VuayIsImF0dGFja1NxdWFyZSIsImFpQXR0YWNrIiwiYXR0YWNrUmFuZG9tU3F1YXJlIiwiYWxyZWFkeUF0dGFja2VkIiwiZ3JpZFNpemUiLCJTaGlwIiwibWlzc2VkU2hvdHMiLCJzdW5rZW5TaGlwcyIsImNvbnN0cnVjdG9yIiwidmFsdWUiLCJmbGVldCIsImZsZWV0U2l6ZSIsImNyZWF0ZVNoaXBzIiwicHJvcHMiLCJzaGlwc0FycmF5IiwiaXNWZXJ0aWNhbCIsInJvdW5kIiwidmVzc2VsIiwicHVzaCIsInBsYWNlU2hpcHMiLCJzaGlwIiwidmVydGljYWwiLCJzaGlwcyIsImlzQm9hcmRFbXB0eSIsInJhbmRYIiwiZmxvb3IiLCJyYW5kWSIsInBsYWNlbWVudEFsbG93ZWQiLCJyZWNlaXZlQXR0YWNrIiwiY29vcmRpbmF0ZSIsImlzU3VuayIsImNvdW50T2NjdXBpZWRTcXVhcmVzIiwiYXZhaWxhYmxlU3F1YXJlcyIsImVuZW15Qm9hcmQiLCJoYXNCZWVuQXR0YWNrZWQiLCJyYW5kUm93IiwicmFuZENvbHVtbiIsImhpdHMiLCJwb3NpdGlvbiIsImluY2x1ZGVzIiwiY29weXJpZ2h0U3BhbiIsIkRhdGUiLCJnZXRGdWxsWWVhciIsIm1vZGFsIiwibWFpbkdhbWUiLCJ3aW5kb3ciLCJzaG93TW9kYWwiLCJzdGFydEJ0biIsImFsaWFzIiwia2V5Q29kZSIsImNsaWNrIiwibmV3R2FtZSIsImluZm9JY29uIiwiaW5mb01vZGFsIiwidG9nZ2xlIl0sInNvdXJjZVJvb3QiOiIifQ==