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
/* harmony import */ var _assets_img_hit_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/img/hit.svg */ "./src/assets/img/hit.svg");
/* harmony import */ var _assets_img_miss_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/img/miss.svg */ "./src/assets/img/miss.svg");
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
      miss.setAttribute('src', _assets_img_miss_svg__WEBPACK_IMPORTED_MODULE_3__);
      target.appendChild(miss);
    } else {
      const hit = document.createElement('img');
      hit.classList.add('hit');
      hit.setAttribute('src', _assets_img_hit_svg__WEBPACK_IMPORTED_MODULE_2__);
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
        miss.setAttribute('src', _assets_img_miss_svg__WEBPACK_IMPORTED_MODULE_3__);
        getPlayerCell.appendChild(miss);
      } else {
        const hit = document.createElement('img');
        hit.classList.add('hit');
        hit.setAttribute('src', _assets_img_hit_svg__WEBPACK_IMPORTED_MODULE_2__);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRXdDO0FBQ2dCO0FBQ1o7QUFDRTtBQUV2QyxTQUFTSSxPQUFPQSxDQUFDQyxVQUFVLEVBQUU7RUFDbEMsTUFBTUMsTUFBTSxHQUFHRCxVQUFVO0VBQ3pCLE1BQU1FLEVBQUUsR0FBRyxXQUFXO0VBQ3RCLE1BQU1DLElBQUksR0FBR1IscURBQUksQ0FBQ00sTUFBTSxFQUFFQyxFQUFFLENBQUM7RUFFN0IsTUFBTUUsV0FBVyxHQUFHRCxJQUFJLENBQUNFLGNBQWMsQ0FBQyxDQUFDO0VBQ3pDLE1BQU1DLE9BQU8sR0FBR0gsSUFBSSxDQUFDSSxVQUFVLENBQUMsQ0FBQztFQUVqQyxNQUFNQyxTQUFTLEdBQUdMLElBQUksQ0FBQ0ssU0FBUyxDQUFDLENBQUM7RUFDbEMsTUFBTUMsS0FBSyxHQUFHTixJQUFJLENBQUNNLEtBQUssQ0FBQyxDQUFDOztFQUUxQjtFQUNBLE1BQU1DLGFBQWEsR0FBR0EsQ0FBQ1QsTUFBTSxFQUFFQyxFQUFFLEtBQUs7SUFDcEMsTUFBTVMsUUFBUSxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFDdEQsTUFBTUMsSUFBSSxHQUFHRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztJQUN0REYsUUFBUSxDQUFDSSxXQUFXLEdBQUdkLE1BQU07SUFDN0JhLElBQUksQ0FBQ0MsV0FBVyxHQUFHYixFQUFFO0VBQ3ZCLENBQUM7O0VBRUQ7RUFDQSxNQUFNYyxjQUFjLEdBQUdBLENBQUNDLEdBQUcsRUFBRUMsTUFBTSxFQUFFQyxJQUFJLEtBQUs7SUFDNUMsTUFBTUMsVUFBVSxHQUFHUixRQUFRLENBQUNDLGFBQWEsQ0FDdEMsdUJBQXNCSSxHQUFJLElBQUdDLE1BQU8sSUFDdkMsQ0FBQztJQUNELEtBQUssSUFBSUcsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHekIsZ0VBQWMsQ0FBQzBCLE1BQU0sRUFBRUQsQ0FBQyxFQUFFLEVBQUU7TUFDOUMsSUFBSUYsSUFBSSxLQUFLdkIsZ0VBQWMsQ0FBQ3lCLENBQUMsQ0FBQyxDQUFDRixJQUFJLEVBQUU7UUFDbkNDLFVBQVUsQ0FBQ0csS0FBSyxDQUFDQyxlQUFlLEdBQUksR0FBRTVCLGdFQUFjLENBQUN5QixDQUFDLENBQUMsQ0FBQ0ksS0FBTSxFQUFDO01BQ2pFO0lBQ0Y7RUFDRixDQUFDOztFQUVEO0VBQ0EsTUFBTUMsVUFBVSxHQUFHQSxDQUFBLEtBQU07SUFDdkI7SUFDQSxNQUFNQyxhQUFhLEdBQUd2QixXQUFXLENBQUN3QixLQUFLO0lBQ3ZDLE1BQU1DLG9CQUFvQixHQUFHakIsUUFBUSxDQUFDQyxhQUFhLENBQUMsb0JBQW9CLENBQUM7SUFDekUsS0FBSyxJQUFJUSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdNLGFBQWEsQ0FBQ0wsTUFBTSxFQUFFRCxDQUFDLEVBQUUsRUFBRTtNQUM3QyxLQUFLLElBQUlTLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0gsYUFBYSxDQUFDTixDQUFDLENBQUMsQ0FBQ0MsTUFBTSxFQUFFUSxDQUFDLEVBQUUsRUFBRTtRQUNoRCxNQUFNQyxJQUFJLEdBQUduQixRQUFRLENBQUNvQixhQUFhLENBQUMsUUFBUSxDQUFDO1FBQzdDRCxJQUFJLENBQUNFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUM7UUFDekNILElBQUksQ0FBQ0ksWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7UUFDbkNKLElBQUksQ0FBQ0ssT0FBTyxDQUFDQyxXQUFXLEdBQUksR0FBRSxDQUFDaEIsQ0FBQyxDQUFFLElBQUcsQ0FBQ1MsQ0FBQyxDQUFFLEVBQUM7UUFDMUNELG9CQUFvQixDQUFDUyxXQUFXLENBQUNQLElBQUksQ0FBQzs7UUFFdEM7UUFDQSxJQUFJLE9BQU9KLGFBQWEsQ0FBQ04sQ0FBQyxDQUFDLENBQUNTLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtVQUMzQyxNQUFNYixHQUFHLEdBQUdJLENBQUM7VUFDYixNQUFNSCxNQUFNLEdBQUdZLENBQUM7VUFDaEIsTUFBTVMsUUFBUSxHQUFHWixhQUFhLENBQUNOLENBQUMsQ0FBQyxDQUFDUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ1gsSUFBSTtVQUM1Q0gsY0FBYyxDQUFDQyxHQUFHLEVBQUVDLE1BQU0sRUFBRXFCLFFBQVEsQ0FBQztRQUN2QztNQUNGO0lBQ0Y7O0lBRUE7SUFDQSxNQUFNQyxTQUFTLEdBQUdsQyxPQUFPLENBQUNzQixLQUFLO0lBQy9CLE1BQU1hLGdCQUFnQixHQUFHN0IsUUFBUSxDQUFDQyxhQUFhLENBQUMsc0JBQXNCLENBQUM7SUFDdkUsS0FBSyxJQUFJUSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdtQixTQUFTLENBQUNsQixNQUFNLEVBQUVELENBQUMsRUFBRSxFQUFFO01BQ3pDLEtBQUssSUFBSVMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHVSxTQUFTLENBQUNuQixDQUFDLENBQUMsQ0FBQ0MsTUFBTSxFQUFFUSxDQUFDLEVBQUUsRUFBRTtRQUM1QyxNQUFNQyxJQUFJLEdBQUduQixRQUFRLENBQUNvQixhQUFhLENBQUMsUUFBUSxDQUFDO1FBQzdDRCxJQUFJLENBQUNFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUM7UUFDM0NILElBQUksQ0FBQ0ksWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7UUFDbkNKLElBQUksQ0FBQ0ssT0FBTyxDQUFDQyxXQUFXLEdBQUksR0FBRSxDQUFDaEIsQ0FBQyxDQUFFLElBQUcsQ0FBQ1MsQ0FBQyxDQUFFLEVBQUM7UUFDMUNXLGdCQUFnQixDQUFDSCxXQUFXLENBQUNQLElBQUksQ0FBQztNQUNwQztJQUNGO0VBQ0YsQ0FBQzs7RUFFRDtFQUNBLE1BQU1XLGNBQWMsR0FBR0EsQ0FBQSxLQUFNO0lBQzNCLE1BQU1DLGdCQUFnQixHQUFHL0IsUUFBUSxDQUFDQyxhQUFhLENBQUMsWUFBWSxDQUFDO0lBQzdELE1BQU0rQixNQUFNLEdBQUdoQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxTQUFTLENBQUM7SUFDaEQ4QixnQkFBZ0IsQ0FBQzVCLFdBQVcsR0FBR1osSUFBSSxDQUFDMEMsZUFBZSxDQUFDLENBQUMsQ0FBQ0MsSUFBSTs7SUFFMUQ7SUFDQUYsTUFBTSxDQUFDWCxTQUFTLENBQUNjLE1BQU0sQ0FBQyxXQUFXLENBQUM7RUFDdEMsQ0FBQztFQUVEckMsYUFBYSxDQUFDVCxNQUFNLEVBQUVDLEVBQUUsQ0FBQztFQUN6QndCLFVBQVUsQ0FBQyxDQUFDO0VBQ1pnQixjQUFjLENBQUMsQ0FBQztFQUVoQixNQUFNTSxrQkFBa0IsR0FBSUMsTUFBTSxJQUFLO0lBQ3JDO0lBQ0EsTUFBTUMsVUFBVSxHQUFHdEMsUUFBUSxDQUFDdUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDO0lBQzNELE1BQU03QyxPQUFPLEdBQUdNLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLHNCQUFzQixDQUFDO0lBQzlELE1BQU11QyxLQUFLLEdBQUd4QyxRQUFRLENBQUN1QyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7SUFFaEQsSUFBSUYsTUFBTSxLQUFLLFNBQVMsRUFBRTtNQUN4QjNDLE9BQU8sQ0FBQzJCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0lBQ3pDO0lBRUFnQixVQUFVLENBQUNHLE9BQU8sQ0FBRXpCLEtBQUssSUFBSztNQUM1QixJQUFJcUIsTUFBTSxLQUFLLFNBQVMsRUFBRTtRQUN4QnJCLEtBQUssQ0FBQ0ssU0FBUyxDQUFDQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7TUFDdkMsQ0FBQyxNQUFNLElBQUllLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDOUJyQixLQUFLLENBQUNLLFNBQVMsQ0FBQ2MsTUFBTSxDQUFDLGdCQUFnQixDQUFDO01BQzFDO0lBQ0YsQ0FBQyxDQUFDO0lBRUZLLEtBQUssQ0FBQ0MsT0FBTyxDQUFFdEIsSUFBSSxJQUFLO01BQ3RCLElBQUlrQixNQUFNLEtBQUssU0FBUyxFQUFFO1FBQ3hCbEIsSUFBSSxDQUFDRSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxlQUFlLENBQUM7TUFDckMsQ0FBQyxNQUFNLElBQUllLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDOUJsQixJQUFJLENBQUNFLFNBQVMsQ0FBQ2MsTUFBTSxDQUFDLGVBQWUsQ0FBQztNQUN4QztJQUNGLENBQUMsQ0FBQztFQUNKLENBQUM7O0VBRUQ7RUFDQSxNQUFNTyxhQUFhLEdBQUcxQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztFQUVwRXlDLGFBQWEsQ0FBQ0MsZ0JBQWdCLENBQUMsU0FBUyxFQUFHQyxDQUFDLElBQUs7SUFDL0NBLENBQUMsQ0FBQ0MsY0FBYyxDQUFDLENBQUM7SUFDbEIsTUFBTUMsTUFBTSxHQUFHRixDQUFDLENBQUNFLE1BQU07O0lBRXZCO0lBQ0EsTUFBTXJCLFdBQVcsR0FBR3FCLE1BQU0sQ0FBQ3RCLE9BQU8sQ0FBQ0MsV0FBVztJQUM5QyxNQUFNc0IsWUFBWSxHQUFHdEIsV0FBVyxDQUFDdUIsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUMzQyxNQUFNM0MsR0FBRyxHQUFHNEMsTUFBTSxDQUFDRixZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsTUFBTXpDLE1BQU0sR0FBRzJDLE1BQU0sQ0FBQ0YsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUV0QztJQUNBeEQsSUFBSSxDQUFDMkQsU0FBUyxDQUFDN0MsR0FBRyxFQUFFQyxNQUFNLENBQUM7O0lBRTNCO0lBQ0EsSUFBSSxDQUFDWixPQUFPLENBQUN5RCxLQUFLLEVBQUU7TUFDbEIsTUFBTUMsSUFBSSxHQUFHcEQsUUFBUSxDQUFDb0IsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUMxQ2dDLElBQUksQ0FBQy9CLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUMxQjhCLElBQUksQ0FBQzdCLFlBQVksQ0FBQyxLQUFLLEVBQUVyQyxpREFBUSxDQUFDO01BQ2xDNEQsTUFBTSxDQUFDcEIsV0FBVyxDQUFDMEIsSUFBSSxDQUFDO0lBQzFCLENBQUMsTUFBTTtNQUNMLE1BQU1DLEdBQUcsR0FBR3JELFFBQVEsQ0FBQ29CLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDekNpQyxHQUFHLENBQUNoQyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxLQUFLLENBQUM7TUFDeEIrQixHQUFHLENBQUM5QixZQUFZLENBQUMsS0FBSyxFQUFFdEMsZ0RBQU8sQ0FBQztNQUNoQzZELE1BQU0sQ0FBQ3BCLFdBQVcsQ0FBQzJCLEdBQUcsQ0FBQztJQUN6Qjs7SUFFQTtJQUNBUCxNQUFNLENBQUN2QixZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztJQUNyQ3VCLE1BQU0sQ0FBQ3pCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLHdCQUF3QixDQUFDO0lBRTlDLE1BQU1oQyxFQUFFLEdBQUdDLElBQUksQ0FBQ00sS0FBSyxDQUFDLENBQUM7O0lBRXZCO0lBQ0EsTUFBTXlELFlBQVksR0FBR0EsQ0FBQSxLQUFNO01BQ3pCLE1BQU1DLGNBQWMsR0FBR2pFLEVBQUUsQ0FBQ2tFLE9BQU8sQ0FBQ2xFLEVBQUUsQ0FBQ2tFLE9BQU8sQ0FBQzlDLE1BQU0sR0FBRyxDQUFDLENBQUM7TUFDeEQsTUFBTStDLFdBQVcsR0FBR0YsY0FBYyxDQUFDLENBQUMsQ0FBQztNQUNyQyxNQUFNRyxjQUFjLEdBQUdILGNBQWMsQ0FBQyxDQUFDLENBQUM7TUFDeEMsTUFBTUksYUFBYSxHQUFHM0QsUUFBUSxDQUFDQyxhQUFhLENBQ3pDLHVCQUFzQndELFdBQVksSUFBR0MsY0FBZSxJQUN2RCxDQUFDO01BRUQsSUFBSSxDQUFDbEUsV0FBVyxDQUFDMkQsS0FBSyxFQUFFO1FBQ3RCLE1BQU1DLElBQUksR0FBR3BELFFBQVEsQ0FBQ29CLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDMUNnQyxJQUFJLENBQUMvQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDMUI4QixJQUFJLENBQUM3QixZQUFZLENBQUMsS0FBSyxFQUFFckMsaURBQVEsQ0FBQztRQUNsQ3lFLGFBQWEsQ0FBQ2pDLFdBQVcsQ0FBQzBCLElBQUksQ0FBQztNQUNqQyxDQUFDLE1BQU07UUFDTCxNQUFNQyxHQUFHLEdBQUdyRCxRQUFRLENBQUNvQixhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ3pDaUMsR0FBRyxDQUFDaEMsU0FBUyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3hCK0IsR0FBRyxDQUFDOUIsWUFBWSxDQUFDLEtBQUssRUFBRXRDLGdEQUFPLENBQUM7UUFDaEMwRSxhQUFhLENBQUNqQyxXQUFXLENBQUMyQixHQUFHLENBQUM7TUFDaEM7TUFDQWpCLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztJQUM5QixDQUFDOztJQUVEO0lBQ0EsTUFBTXdCLFNBQVMsR0FBR3JFLElBQUksQ0FBQ3FFLFNBQVMsQ0FBQyxDQUFDO0lBQ2xDLE1BQU1DLE1BQU0sR0FBRzdELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGFBQWEsQ0FBQztJQUNwRCxNQUFNNkQsUUFBUSxHQUFHOUQsUUFBUSxDQUFDQyxhQUFhLENBQUMsWUFBWSxDQUFDO0lBQ3JELE1BQU04RCxVQUFVLEdBQUcvRCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxjQUFjLENBQUM7SUFFekQsSUFBSTJELFNBQVMsRUFBRTtNQUNiRSxRQUFRLENBQUMzRCxXQUFXLEdBQUd5RCxTQUFTO01BQ2hDQyxNQUFNLENBQUN4QyxTQUFTLENBQUNjLE1BQU0sQ0FBQyxXQUFXLENBQUM7TUFDcEM0QixVQUFVLENBQUMxQyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxXQUFXLENBQUM7TUFFckNjLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztJQUMvQixDQUFDLE1BQU07TUFDTHlCLE1BQU0sQ0FBQ3hDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztNQUNqQ3lDLFVBQVUsQ0FBQzFDLFNBQVMsQ0FBQ2MsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7TUFFeEM7TUFDQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDOztNQUU3QjtNQUNBLE1BQU00QixXQUFXLEdBQUdDLElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJO01BQ3hDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0osV0FBVyxDQUFDO01BQ3hCSyxVQUFVLENBQUNmLFlBQVksRUFBRVUsV0FBVyxDQUFDO0lBQ3ZDO0VBQ0YsQ0FBQyxDQUFDOztFQUVGO0VBQ0EsTUFBTU0sWUFBWSxHQUFHdEUsUUFBUSxDQUFDQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7RUFDN0QsTUFBTXNFLFVBQVUsR0FBR3ZFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFVBQVUsQ0FBQztFQUNyRCxNQUFNZ0Isb0JBQW9CLEdBQUdqQixRQUFRLENBQUNDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztFQUN6RSxNQUFNNEIsZ0JBQWdCLEdBQUc3QixRQUFRLENBQUNDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztFQUV2RXNFLFVBQVUsQ0FBQzVCLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0lBQ3pDMkIsWUFBWSxDQUFDRSxLQUFLLENBQUMsQ0FBQztJQUNwQkYsWUFBWSxDQUFDakQsU0FBUyxDQUFDYyxNQUFNLENBQUMsTUFBTSxDQUFDOztJQUVyQztJQUNBLE9BQU9sQixvQkFBb0IsQ0FBQ3dELFVBQVUsRUFBRTtNQUN0Q3hELG9CQUFvQixDQUFDeUQsV0FBVyxDQUFDekQsb0JBQW9CLENBQUMwRCxTQUFTLENBQUM7SUFDbEU7SUFDQSxPQUFPOUMsZ0JBQWdCLENBQUM0QyxVQUFVLEVBQUU7TUFDbEM1QyxnQkFBZ0IsQ0FBQzZDLFdBQVcsQ0FBQzdDLGdCQUFnQixDQUFDOEMsU0FBUyxDQUFDO0lBQzFEOztJQUVBO0lBQ0FuRixXQUFXLENBQUNvRixLQUFLLENBQUMsQ0FBQztJQUNuQmxGLE9BQU8sQ0FBQ2tGLEtBQUssQ0FBQyxDQUFDO0lBQ2ZoRixTQUFTLENBQUNnRixLQUFLLENBQUMsQ0FBQztJQUNqQi9FLEtBQUssQ0FBQytFLEtBQUssQ0FBQyxDQUFDOztJQUViO0lBQ0FwRixXQUFXLENBQUNxRixVQUFVLENBQUMsQ0FBQztJQUN4Qm5GLE9BQU8sQ0FBQ21GLFVBQVUsQ0FBQyxDQUFDO0lBQ3BCckYsV0FBVyxDQUFDc0Ysa0JBQWtCLENBQUMsQ0FBQztJQUNoQ3BGLE9BQU8sQ0FBQ29GLGtCQUFrQixDQUFDLENBQUM7SUFDNUJoRSxVQUFVLENBQUMsQ0FBQzs7SUFFWjtJQUNBLE1BQU0rQyxNQUFNLEdBQUc3RCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFDcEQsTUFBTThELFVBQVUsR0FBRy9ELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGNBQWMsQ0FBQztJQUN6RDRELE1BQU0sQ0FBQ3hDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUNqQ3lDLFVBQVUsQ0FBQzFDLFNBQVMsQ0FBQ2MsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7SUFFeEM7SUFDQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDO0VBQzlCLENBQUMsQ0FBQzs7RUFFRjtFQUNBLE1BQU0yQyxTQUFTLEdBQUcvRSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxTQUFTLENBQUM7RUFFbkQ4RSxTQUFTLENBQUNwQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtJQUN4QzJCLFlBQVksQ0FBQ0UsS0FBSyxDQUFDLENBQUM7SUFDcEJGLFlBQVksQ0FBQ2pELFNBQVMsQ0FBQ2MsTUFBTSxDQUFDLE1BQU0sQ0FBQztFQUN2QyxDQUFDLENBQUM7QUFDSjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQzFQQTs7QUFFbUQ7QUFDTjtBQUV0QyxTQUFTcEQsSUFBSUEsQ0FBQ0ssVUFBVSxFQUFFOEYsTUFBTSxFQUFFO0VBQ3ZDO0VBQ0EsTUFBTTFGLFdBQVcsR0FBRyxJQUFJd0YsMkRBQVMsQ0FBQyxDQUFDO0VBQ25DLE1BQU10RixPQUFPLEdBQUcsSUFBSXNGLDJEQUFTLENBQUMsQ0FBQztFQUMvQixNQUFNdkYsY0FBYyxHQUFHQSxDQUFBLEtBQU1ELFdBQVc7RUFDeEMsTUFBTUcsVUFBVSxHQUFHQSxDQUFBLEtBQU1ELE9BQU87RUFFaEMsTUFBTXlGLGdCQUFnQixHQUFHM0YsV0FBVyxDQUFDcUYsVUFBVSxDQUFDLENBQUM7RUFDakQsTUFBTU8sWUFBWSxHQUFHMUYsT0FBTyxDQUFDbUYsVUFBVSxDQUFDLENBQUM7RUFFekMsTUFBTVEsZ0JBQWdCLEdBQUc3RixXQUFXLENBQUNzRixrQkFBa0IsQ0FBQyxDQUFDO0VBQ3pELE1BQU1RLFlBQVksR0FBRzVGLE9BQU8sQ0FBQ29GLGtCQUFrQixDQUFDLENBQUM7O0VBRWpEO0VBQ0EsTUFBTVMsT0FBTyxHQUFHLENBQ2Q7SUFDRXJELElBQUksRUFBRTlDO0VBQ1IsQ0FBQyxFQUNEO0lBQ0U4QyxJQUFJLEVBQUVnRDtFQUNSLENBQUMsQ0FDRjtFQUVELE1BQU03RixNQUFNLEdBQUcsSUFBSTRGLHFEQUFNLENBQUNNLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ3JELElBQUksQ0FBQztFQUMxQyxNQUFNNUMsRUFBRSxHQUFHLElBQUkyRixxREFBTSxDQUFDTSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUNyRCxJQUFJLENBQUM7RUFDdEMsTUFBTXRDLFNBQVMsR0FBR0EsQ0FBQSxLQUFNUCxNQUFNO0VBQzlCLE1BQU1RLEtBQUssR0FBR0EsQ0FBQSxLQUFNUCxFQUFFO0VBRXRCLElBQUlrRyxZQUFZLEdBQUdELE9BQU8sQ0FBQyxDQUFDLENBQUM7RUFDN0IsTUFBTUUsZ0JBQWdCLEdBQUdBLENBQUEsS0FBTTtJQUM3QixJQUFJRCxZQUFZLEtBQUtELE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtNQUMvQkMsWUFBWSxHQUFHRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUMsTUFBTTtNQUNMQyxZQUFZLEdBQUdELE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDM0I7RUFDRixDQUFDO0VBRUQsTUFBTXRELGVBQWUsR0FBR0EsQ0FBQSxLQUFNdUQsWUFBWTs7RUFFMUM7RUFDQSxJQUFJM0IsTUFBTTtFQUNWLE1BQU1ELFNBQVMsR0FBR0EsQ0FBQSxLQUFNQyxNQUFNO0VBRTlCLE1BQU1YLFNBQVMsR0FBR0EsQ0FBQzdDLEdBQUcsRUFBRUMsTUFBTSxLQUFLO0lBQ2pDO0lBQ0F1RCxNQUFNLEdBQUcsRUFBRTs7SUFFWDtJQUNBLE1BQU02QixRQUFRLEdBQUdBLENBQUEsS0FBTTtNQUNyQixJQUFJbEcsV0FBVyxDQUFDbUcsWUFBWSxDQUFDLENBQUMsRUFBRTtRQUM5QjlCLE1BQU0sR0FBRzBCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ3JELElBQUk7TUFDMUIsQ0FBQyxNQUFNLElBQUl4QyxPQUFPLENBQUNpRyxZQUFZLENBQUMsQ0FBQyxFQUFFO1FBQ2pDOUIsTUFBTSxHQUFHMEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDckQsSUFBSTtNQUMxQjtJQUNGLENBQUM7SUFFRCxJQUFJRCxlQUFlLENBQUMsQ0FBQyxLQUFLc0QsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO01BQ3BDbEcsTUFBTSxDQUFDdUcsWUFBWSxDQUFDdkYsR0FBRyxFQUFFQyxNQUFNLEVBQUVaLE9BQU8sQ0FBQztNQUN6Q2dHLFFBQVEsQ0FBQyxDQUFDO0lBQ1o7SUFFQUQsZ0JBQWdCLENBQUMsQ0FBQzs7SUFFbEI7SUFDQSxJQUFJeEQsZUFBZSxDQUFDLENBQUMsS0FBS3NELE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtNQUNwQyxNQUFNTSxRQUFRLEdBQUdBLENBQUEsS0FBTTtRQUNyQnZHLEVBQUUsQ0FBQ3dHLGtCQUFrQixDQUFDdEcsV0FBVyxDQUFDO1FBQ2xDLElBQUlGLEVBQUUsQ0FBQ3lHLGVBQWUsRUFBRUYsUUFBUSxDQUFDLENBQUM7TUFDcEMsQ0FBQztNQUNEQSxRQUFRLENBQUMsQ0FBQztNQUNWSCxRQUFRLENBQUMsQ0FBQztJQUNaO0lBRUFELGdCQUFnQixDQUFDLENBQUM7RUFDcEIsQ0FBQztFQUVELE9BQU87SUFDTGhHLGNBQWM7SUFDZEUsVUFBVTtJQUNWQyxTQUFTO0lBQ1RDLEtBQUs7SUFDTG1HLFFBQVEsRUFBRXZHLGNBQWMsQ0FBQ3VHLFFBQVE7SUFDakMvRCxlQUFlO0lBQ2ZpQixTQUFTO0lBQ1RVO0VBQ0YsQ0FBQztBQUNIOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQzdGQTs7QUFFTyxNQUFNNUUsY0FBYyxHQUFHLENBQzVCO0VBQ0V1QixJQUFJLEVBQUUsU0FBUztFQUNmRyxNQUFNLEVBQUUsQ0FBQztFQUNURyxLQUFLLEVBQUU7QUFDVCxDQUFDLEVBQ0Q7RUFDRU4sSUFBSSxFQUFFLFlBQVk7RUFDbEJHLE1BQU0sRUFBRSxDQUFDO0VBQ1RHLEtBQUssRUFBRTtBQUNULENBQUMsRUFDRDtFQUNFTixJQUFJLEVBQUUsV0FBVztFQUNqQkcsTUFBTSxFQUFFLENBQUM7RUFDVEcsS0FBSyxFQUFFO0FBQ1QsQ0FBQyxFQUNEO0VBQ0VOLElBQUksRUFBRSxXQUFXO0VBQ2pCRyxNQUFNLEVBQUUsQ0FBQztFQUNURyxLQUFLLEVBQUU7QUFDVCxDQUFDLEVBQ0Q7RUFDRU4sSUFBSSxFQUFFLGFBQWE7RUFDbkJHLE1BQU0sRUFBRSxDQUFDO0VBQ1RHLEtBQUssRUFBRTtBQUNULENBQUMsQ0FDRjs7Ozs7Ozs7Ozs7Ozs7OztBQzVCRDs7QUFFd0Q7QUFDMUI7QUFFdkIsTUFBTW1FLFNBQVMsQ0FBQztFQUNyQmhFLEtBQUs7RUFDTGtGLFdBQVc7RUFDWEMsV0FBVztFQUNYSCxRQUFRLEdBQUcsRUFBRTtFQUNiN0MsS0FBSztFQUVMaUQsV0FBV0EsQ0FBQSxFQUFHO0lBQ1osSUFBSSxDQUFDcEYsS0FBSyxHQUFHLEVBQUU7SUFDZixJQUFJLENBQUNrRixXQUFXLEdBQUcsRUFBRTtJQUNyQixJQUFJLENBQUNDLFdBQVcsR0FBRyxFQUFFO0VBQ3ZCO0VBRUF2QixLQUFLQSxDQUFBLEVBQUc7SUFDTixJQUFJLENBQUM1RCxLQUFLLEdBQUcsRUFBRTtJQUNmLElBQUksQ0FBQ2tGLFdBQVcsR0FBRyxFQUFFO0lBQ3JCLElBQUksQ0FBQ0MsV0FBVyxHQUFHLEVBQUU7RUFDdkI7O0VBRUE7RUFDQXRCLFVBQVVBLENBQUEsRUFBRztJQUNYLElBQUl3QixLQUFLLEdBQUcsQ0FBQztJQUViLEtBQUssSUFBSTVGLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxJQUFJLENBQUN1RixRQUFRLEVBQUV2RixDQUFDLEVBQUUsRUFBRTtNQUN0QyxJQUFJLENBQUNPLEtBQUssQ0FBQ1AsQ0FBQyxDQUFDLEdBQUcsRUFBRTtNQUNsQixLQUFLLElBQUlTLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxJQUFJLENBQUM4RSxRQUFRLEVBQUU5RSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUNGLEtBQUssQ0FBQ1AsQ0FBQyxDQUFDLENBQUNTLENBQUMsQ0FBQyxHQUFHbUYsS0FBSyxFQUFFO01BQzVCO0lBQ0Y7RUFDRjs7RUFFQTtFQUNBO0VBQ0FDLEtBQUtBLENBQUEsRUFBRztJQUNOLElBQUlDLFNBQVMsR0FBRyxDQUFDO0lBQ2pCLEtBQUssSUFBSTlGLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3pCLGdFQUFjLENBQUMwQixNQUFNLEVBQUVELENBQUMsRUFBRSxFQUFFO01BQzlDOEYsU0FBUyxJQUFJdkgsZ0VBQWMsQ0FBQ3lCLENBQUMsQ0FBQyxDQUFDQyxNQUFNO0lBQ3ZDO0lBQ0EsT0FBTzZGLFNBQVM7RUFDbEI7O0VBRUE7RUFDQUMsV0FBV0EsQ0FBQSxFQUFHO0lBQ1osTUFBTUMsS0FBSyxHQUFHekgsZ0VBQWM7SUFDNUIsSUFBSTBILFVBQVUsR0FBRyxFQUFFO0lBRW5CLEtBQUssSUFBSWpHLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR2dHLEtBQUssQ0FBQy9GLE1BQU0sRUFBRUQsQ0FBQyxFQUFFLEVBQUU7TUFDckMsTUFBTWtHLFVBQVUsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzFDLElBQUksQ0FBQzJDLEtBQUssQ0FBQzNDLElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQzNELE1BQU0yQyxNQUFNLEdBQUcsSUFBSVosdUNBQUksQ0FBQ1EsS0FBSyxDQUFDaEcsQ0FBQyxDQUFDLENBQUNGLElBQUksRUFBRWtHLEtBQUssQ0FBQ2hHLENBQUMsQ0FBQyxDQUFDQyxNQUFNLEVBQUVpRyxVQUFVLENBQUM7TUFDbkVELFVBQVUsQ0FBQ0ksSUFBSSxDQUFDRCxNQUFNLENBQUM7SUFDekI7SUFDQSxPQUFPSCxVQUFVO0VBQ25CO0VBRUFLLFVBQVVBLENBQUNDLElBQUksRUFBRTNHLEdBQUcsRUFBRUMsTUFBTSxFQUFFMkcsUUFBUSxFQUFFO0lBQ3RDLElBQUlBLFFBQVEsRUFBRTtNQUNaLEtBQUssSUFBSXhHLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3VHLElBQUksQ0FBQ3RHLE1BQU0sRUFBRUQsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDTyxLQUFLLENBQUNYLEdBQUcsR0FBR0ksQ0FBQyxDQUFDLENBQUNILE1BQU0sQ0FBQyxHQUFHLENBQUNHLENBQUMsRUFBRXVHLElBQUksQ0FBQztNQUN6QztJQUNGLENBQUMsTUFBTTtNQUNMLEtBQUssSUFBSXZHLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3VHLElBQUksQ0FBQ3RHLE1BQU0sRUFBRUQsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDTyxLQUFLLENBQUNYLEdBQUcsQ0FBQyxDQUFDQyxNQUFNLEdBQUdHLENBQUMsQ0FBQyxHQUFHLENBQUNBLENBQUMsRUFBRXVHLElBQUksQ0FBQztNQUN6QztJQUNGO0VBQ0Y7RUFFQWxDLGtCQUFrQkEsQ0FBQSxFQUFHO0lBQ25CO0lBQ0EsTUFBTW9DLEtBQUssR0FBRyxJQUFJLENBQUNWLFdBQVcsQ0FBQyxDQUFDOztJQUVoQztJQUNBLElBQUksQ0FBQyxJQUFJLENBQUNXLFlBQVksRUFBRTs7SUFFeEI7SUFDQSxLQUFLLElBQUkxRyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUd5RyxLQUFLLENBQUN4RyxNQUFNLEVBQUVELENBQUMsRUFBRSxFQUFFO01BQ3JDO01BQ0EsTUFBTTJHLEtBQUssR0FBR25ELElBQUksQ0FBQ29ELEtBQUssQ0FBQ3BELElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM4QixRQUFRLENBQUM7TUFDdkQsTUFBTXNCLEtBQUssR0FBR3JELElBQUksQ0FBQ29ELEtBQUssQ0FBQ3BELElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM4QixRQUFRLENBQUM7TUFDdkQ7TUFDQSxNQUFNaUIsUUFBUSxHQUFHQyxLQUFLLENBQUN6RyxDQUFDLENBQUMsQ0FBQ3dHLFFBQVE7O01BRWxDO01BQ0EsSUFBSSxDQUFDLElBQUksQ0FBQ00sZ0JBQWdCLENBQUNMLEtBQUssQ0FBQ3pHLENBQUMsQ0FBQyxFQUFFMkcsS0FBSyxFQUFFRSxLQUFLLEVBQUVMLFFBQVEsQ0FBQyxFQUFFO1FBQzVEeEcsQ0FBQyxFQUFFO01BQ0wsQ0FBQyxNQUFNLElBQUksQ0FBQ3NHLFVBQVUsQ0FBQ0csS0FBSyxDQUFDekcsQ0FBQyxDQUFDLEVBQUUyRyxLQUFLLEVBQUVFLEtBQUssRUFBRUwsUUFBUSxDQUFDO0lBQzFEO0VBQ0Y7RUFFQU0sZ0JBQWdCQSxDQUFDUCxJQUFJLEVBQUUzRyxHQUFHLEVBQUVDLE1BQU0sRUFBRTJHLFFBQVEsRUFBRTtJQUM1QztJQUNBLElBQ0U1RyxHQUFHLEdBQUcsSUFBSSxDQUFDMkYsUUFBUSxJQUNuQjFGLE1BQU0sR0FBRyxJQUFJLENBQUMwRixRQUFRLElBQ3RCM0YsR0FBRyxHQUFHMkcsSUFBSSxDQUFDdEcsTUFBTSxHQUFHLElBQUksQ0FBQ3NGLFFBQVEsSUFDakMxRixNQUFNLEdBQUcwRyxJQUFJLENBQUN0RyxNQUFNLEdBQUcsSUFBSSxDQUFDc0YsUUFBUSxFQUVwQyxPQUFPLEtBQUs7O0lBRWQ7SUFDQSxJQUFJaUIsUUFBUSxFQUFFO01BQ1osS0FBSyxJQUFJeEcsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHdUcsSUFBSSxDQUFDdEcsTUFBTSxFQUFFRCxDQUFDLEVBQUUsRUFBRTtRQUNwQyxJQUFJLE9BQU8sSUFBSSxDQUFDTyxLQUFLLENBQUNYLEdBQUcsR0FBR0ksQ0FBQyxDQUFDLENBQUNILE1BQU0sQ0FBQyxLQUFLLFFBQVEsRUFBRSxPQUFPLEtBQUs7TUFDbkU7SUFDRixDQUFDLE1BQU07TUFDTCxLQUFLLElBQUlHLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3VHLElBQUksQ0FBQ3RHLE1BQU0sRUFBRUQsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxPQUFPLElBQUksQ0FBQ08sS0FBSyxDQUFDWCxHQUFHLENBQUMsQ0FBQ0MsTUFBTSxHQUFHRyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUUsT0FBTyxLQUFLO01BQ25FO0lBQ0Y7SUFDQSxPQUFPLElBQUk7RUFDYjtFQUVBK0csYUFBYUEsQ0FBQ25ILEdBQUcsRUFBRUMsTUFBTSxFQUFFO0lBQ3pCLElBQUltSCxVQUFVLEdBQUcsSUFBSSxDQUFDekcsS0FBSyxDQUFDWCxHQUFHLENBQUMsQ0FBQ0MsTUFBTSxDQUFDO0lBRXhDLElBQUksT0FBT21ILFVBQVUsS0FBSyxRQUFRLEVBQUU7TUFDbENBLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQ3BFLEdBQUcsQ0FBQ29FLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUNoQyxJQUFJLENBQUN0RSxLQUFLLEdBQUcsSUFBSTtNQUNqQixJQUFJc0UsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDQyxNQUFNLENBQUMsQ0FBQyxFQUFFO1FBQzFCLElBQUksQ0FBQ3ZCLFdBQVcsQ0FBQ1csSUFBSSxDQUFDVyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDdEM7SUFDRixDQUFDLE1BQU07TUFDTCxJQUFJLENBQUN2QixXQUFXLENBQUNZLElBQUksQ0FBQyxDQUFDekcsR0FBRyxFQUFFQyxNQUFNLENBQUMsQ0FBQztNQUNwQyxJQUFJLENBQUM2QyxLQUFLLEdBQUcsS0FBSztJQUNwQjtFQUNGO0VBRUF3QyxZQUFZQSxDQUFBLEVBQUc7SUFDYixJQUFJLElBQUksQ0FBQ1EsV0FBVyxDQUFDekYsTUFBTSxLQUFLMUIsZ0VBQWMsQ0FBQzBCLE1BQU0sRUFBRSxPQUFPLEtBQUs7SUFDbkUsT0FBTyxJQUFJO0VBQ2I7RUFFQXlHLFlBQVlBLENBQUEsRUFBRztJQUNiLEtBQUssSUFBSTFHLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxJQUFJLENBQUN1RixRQUFRLEVBQUV2RixDQUFDLEVBQUUsRUFBRTtNQUN0QyxLQUFLLElBQUlTLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxJQUFJLENBQUM4RSxRQUFRLEVBQUU5RSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxJQUFJLE9BQU8sSUFBSSxDQUFDRixLQUFLLENBQUNQLENBQUMsQ0FBQyxDQUFDUyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7VUFDeEMsT0FBTyxLQUFLO1FBQ2Q7TUFDRjtJQUNGO0lBQ0EsT0FBTyxJQUFJO0VBQ2I7O0VBRUE7RUFDQXlHLG9CQUFvQkEsQ0FBQSxFQUFHO0lBQ3JCLE1BQU1DLGdCQUFnQixHQUFHLElBQUksQ0FBQzVCLFFBQVEsR0FBRyxJQUFJLENBQUNBLFFBQVE7SUFDdEQsTUFBTU8sU0FBUyxHQUFHLElBQUksQ0FBQ0QsS0FBSyxDQUFDLENBQUM7SUFDOUIsT0FBT3NCLGdCQUFnQixJQUFJQSxnQkFBZ0IsR0FBR3JCLFNBQVMsQ0FBQztFQUMxRDtBQUNGOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQzNKQTs7QUFFTyxNQUFNdEIsTUFBTSxDQUFDO0VBQ2xCekIsT0FBTztFQUNQdUMsZUFBZTtFQUVmSyxXQUFXQSxDQUFDaEgsVUFBVSxFQUFFO0lBQ3RCLElBQUksQ0FBQ0EsVUFBVSxHQUFHQSxVQUFVO0lBQzVCLElBQUksQ0FBQ29FLE9BQU8sR0FBRyxFQUFFO0VBQ25CO0VBRUFvQixLQUFLQSxDQUFBLEVBQUc7SUFDTixJQUFJLENBQUNwQixPQUFPLEdBQUcsRUFBRTtFQUNuQjtFQUVBb0MsWUFBWUEsQ0FBQ3ZGLEdBQUcsRUFBRUMsTUFBTSxFQUFFdUgsVUFBVSxFQUFFO0lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUNDLGVBQWUsQ0FBQ3pILEdBQUcsRUFBRUMsTUFBTSxDQUFDLEVBQUU7TUFDdEMsSUFBSSxDQUFDa0QsT0FBTyxDQUFDc0QsSUFBSSxDQUFDLENBQUN6RyxHQUFHLEVBQUVDLE1BQU0sQ0FBQyxDQUFDO01BQ2hDdUgsVUFBVSxDQUFDTCxhQUFhLENBQUNuSCxHQUFHLEVBQUVDLE1BQU0sQ0FBQztJQUN2QyxDQUFDLE1BQU07TUFDTCxPQUFPLEtBQUs7SUFDZDtFQUNGO0VBRUF3RixrQkFBa0JBLENBQUN0RyxXQUFXLEVBQUU7SUFDOUIsSUFBSSxJQUFJLENBQUNnRSxPQUFPLENBQUM5QyxNQUFNLElBQUksR0FBRyxFQUFFO0lBQ2hDLE1BQU1xSCxPQUFPLEdBQUc5RCxJQUFJLENBQUNvRCxLQUFLLENBQUNwRCxJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDLEdBQUcxRSxXQUFXLENBQUN3RyxRQUFRLENBQUM7SUFDaEUsTUFBTWdDLFVBQVUsR0FBRy9ELElBQUksQ0FBQ29ELEtBQUssQ0FBQ3BELElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUMsR0FBRzFFLFdBQVcsQ0FBQ3dHLFFBQVEsQ0FBQztJQUVuRSxJQUFJLENBQUMsSUFBSSxDQUFDOEIsZUFBZSxDQUFDQyxPQUFPLEVBQUVDLFVBQVUsQ0FBQyxFQUFFO01BQzlDLElBQUksQ0FBQ3hFLE9BQU8sQ0FBQ3NELElBQUksQ0FBQyxDQUFDaUIsT0FBTyxFQUFFQyxVQUFVLENBQUMsQ0FBQztNQUN4Q3hJLFdBQVcsQ0FBQ2dJLGFBQWEsQ0FBQ08sT0FBTyxFQUFFQyxVQUFVLENBQUM7TUFDOUMsSUFBSSxDQUFDakMsZUFBZSxHQUFHLEtBQUs7SUFDOUIsQ0FBQyxNQUFNO01BQ0wsSUFBSSxDQUFDQSxlQUFlLEdBQUcsSUFBSTtJQUM3QjtFQUNGO0VBRUErQixlQUFlQSxDQUFDekgsR0FBRyxFQUFFQyxNQUFNLEVBQUU7SUFDM0IsS0FBSyxJQUFJRyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsSUFBSSxDQUFDK0MsT0FBTyxDQUFDOUMsTUFBTSxFQUFFRCxDQUFDLEVBQUUsRUFBRTtNQUM1QyxJQUFJLElBQUksQ0FBQytDLE9BQU8sQ0FBQy9DLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLSixHQUFHLElBQUksSUFBSSxDQUFDbUQsT0FBTyxDQUFDL0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUtILE1BQU0sRUFDN0QsT0FBTyxJQUFJO0lBQ2Y7SUFDQSxPQUFPLEtBQUs7RUFDZDtBQUNGOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQy9DQTs7QUFFTyxNQUFNMkYsSUFBSSxDQUFDO0VBQ2hCMUYsSUFBSTtFQUNKRyxNQUFNO0VBQ051RyxRQUFRLEdBQUcsS0FBSztFQUNoQmdCLElBQUk7RUFFSjdCLFdBQVdBLENBQUM3RixJQUFJLEVBQUVHLE1BQU0sRUFBRXVHLFFBQVEsRUFBRTtJQUNsQyxJQUFJLENBQUMxRyxJQUFJLEdBQUdBLElBQUk7SUFDaEIsSUFBSSxDQUFDRyxNQUFNLEdBQUdBLE1BQU07SUFDcEIsSUFBSSxDQUFDdUcsUUFBUSxHQUFHQSxRQUFRO0lBQ3hCLElBQUksQ0FBQ2dCLElBQUksR0FBRyxFQUFFO0VBQ2hCO0VBRUFyRCxLQUFLQSxDQUFBLEVBQUc7SUFDTixJQUFJLENBQUNxRCxJQUFJLEdBQUcsRUFBRTtFQUNoQjtFQUVBNUUsR0FBR0EsQ0FBQzZFLFFBQVEsRUFBRTtJQUNaLElBQ0UsSUFBSSxDQUFDRCxJQUFJLENBQUNFLFFBQVEsQ0FBQ0QsUUFBUSxDQUFDLElBQzVCQSxRQUFRLEdBQUcsQ0FBQyxJQUNaQSxRQUFRLEdBQUcsSUFBSSxDQUFDeEgsTUFBTSxHQUFHLENBQUMsRUFFMUI7SUFDRixJQUFJLENBQUN1SCxJQUFJLENBQUNuQixJQUFJLENBQUNvQixRQUFRLENBQUM7RUFDMUI7RUFFQVIsTUFBTUEsQ0FBQSxFQUFHO0lBQ1AsSUFBSSxJQUFJLENBQUNPLElBQUksQ0FBQ3ZILE1BQU0sS0FBSyxJQUFJLENBQUNBLE1BQU0sRUFBRSxPQUFPLElBQUk7SUFDakQsT0FBTyxLQUFLO0VBQ2Q7QUFDRjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUNuQ0E7O0FBRXFCO0FBQ007QUFDOEI7O0FBRXpEO0FBQ0EsTUFBTTBILGFBQWEsR0FBR3BJLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0FBQy9EbUksYUFBYSxDQUFDakksV0FBVyxHQUFHLElBQUlrSSxJQUFJLENBQUMsQ0FBQyxDQUFDQyxXQUFXLENBQUMsQ0FBQzs7QUFFcEQ7QUFDQSxNQUFNQyxLQUFLLEdBQUd2SSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxhQUFhLENBQUM7QUFDbkQsTUFBTXVJLFFBQVEsR0FBR3hJLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFlBQVksQ0FBQztBQUVyRHdJLE1BQU0sQ0FBQzlGLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxNQUFNO0VBQ3BDNkYsUUFBUSxDQUFDbkgsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO0VBQzlCaUgsS0FBSyxDQUFDRyxTQUFTLENBQUMsQ0FBQztFQUNqQkgsS0FBSyxDQUFDbEgsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQzdCLENBQUMsQ0FBQzs7QUFFRjtBQUNBLE1BQU1xSCxRQUFRLEdBQUczSSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxZQUFZLENBQUM7QUFDckQsTUFBTTJJLEtBQUssR0FBRzVJLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGNBQWMsQ0FBQztBQUVwRDBJLFFBQVEsQ0FBQ2hHLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0VBQ3ZDNEYsS0FBSyxDQUFDL0QsS0FBSyxDQUFDLENBQUM7RUFDYitELEtBQUssQ0FBQ2xILFNBQVMsQ0FBQ2MsTUFBTSxDQUFDLE1BQU0sQ0FBQztFQUM5QnFHLFFBQVEsQ0FBQ25ILFNBQVMsQ0FBQ2MsTUFBTSxDQUFDLE1BQU0sQ0FBQztFQUVqQ2hELHNFQUFPLENBQUN5SixLQUFLLENBQUN2QyxLQUFLLENBQUM7QUFDdEIsQ0FBQyxDQUFDOztBQUVGO0FBQ0F1QyxLQUFLLENBQUNqRyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUdDLENBQUMsSUFBSztFQUN4QyxJQUFJQSxDQUFDLENBQUNpRyxPQUFPLEtBQUssRUFBRSxFQUFFRixRQUFRLENBQUNHLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQzs7QUFFRjtBQUNBLE1BQU1DLE9BQU8sR0FBRy9JLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGVBQWUsQ0FBQztBQUN2RCxNQUFNcUUsWUFBWSxHQUFHdEUsUUFBUSxDQUFDQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFFN0Q4SSxPQUFPLENBQUNwRyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtFQUN0QzJCLFlBQVksQ0FBQ29FLFNBQVMsQ0FBQyxDQUFDO0VBQ3hCcEUsWUFBWSxDQUFDakQsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQ3BDLENBQUMsQ0FBQzs7QUFFRjtBQUNBLE1BQU0wSCxRQUFRLEdBQUdoSixRQUFRLENBQUNDLGFBQWEsQ0FBQyxZQUFZLENBQUM7QUFDckQsTUFBTWdKLFNBQVMsR0FBR2pKLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGFBQWEsQ0FBQztBQUV2RCtJLFFBQVEsQ0FBQ3JHLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNO0VBQzNDc0csU0FBUyxDQUFDNUgsU0FBUyxDQUFDYyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ3BDLENBQUMsQ0FBQztBQUVGNkcsUUFBUSxDQUFDckcsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLE1BQU07RUFDMUNzRyxTQUFTLENBQUM1SCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDakMsQ0FBQyxDQUFDO0FBRUYwSCxRQUFRLENBQUNyRyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtFQUN2Q3NHLFNBQVMsQ0FBQzVILFNBQVMsQ0FBQzZILE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDcEMsQ0FBQyxDQUFDOztBQUVGOzs7Ozs7Ozs7Ozs7O0FDOURBO0FBQzZHO0FBQzdHLHlDQUF5QyxzSUFBZ0Q7QUFDekYseUNBQXlDLDRIQUEyQztBQUNwRix5Q0FBeUMsd0hBQXlDO0FBQ2xGLHlDQUF5QyxzSEFBd0M7QUFDakYseUNBQXlDLHdIQUF5QztBQUNsRix5Q0FBeUMsNEhBQTJDO0FBQ3BGO0FBQ0Esc0NBQXNDLHVGQUF3QztBQUM5RSxzQ0FBc0MsdUZBQXdDO0FBQzlFLHNDQUFzQyx1RkFBd0M7QUFDOUUsc0NBQXNDLHVGQUF3QztBQUM5RSxzQ0FBc0MsdUZBQXdDO0FBQzlFLHNDQUFzQyx1RkFBd0M7QUFDOUU7QUFDQTtBQUNBLCtEQUFlLElBQUk7Ozs7Ozs7Ozs7QUNqQk47O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7O0FBR0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDekJBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvY29udHJvbGxlci9kaXNwbGF5Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9jb250cm9sbGVyL2dhbWVDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2RhdGEvc2hpcFByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2h0bWwvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9odG1sLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz9lMzIwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFNUQVJUIC8vXG5cbmltcG9ydCB7IEdhbWUgfSBmcm9tICcuL2dhbWVDb250cm9sbGVyJztcbmltcG9ydCB7IHNoaXBQcm9wZXJ0aWVzIH0gZnJvbSAnLi4vZGF0YS9zaGlwUHJvcGVydGllcyc7XG5pbXBvcnQgaGl0SWNvbiBmcm9tICcuLi9hc3NldHMvaW1nL2hpdC5zdmcnO1xuaW1wb3J0IG1pc3NJY29uIGZyb20gJy4uL2Fzc2V0cy9pbWcvbWlzcy5zdmcnO1xuXG5leHBvcnQgZnVuY3Rpb24gRGlzcGxheShwbGF5ZXJOYW1lKSB7XG4gIGNvbnN0IHBsYXllciA9IHBsYXllck5hbWU7XG4gIGNvbnN0IGFpID0gJ1BpcmF0ZSBBSSc7XG4gIGNvbnN0IGdhbWUgPSBHYW1lKHBsYXllciwgYWkpO1xuXG4gIGNvbnN0IHBsYXllckJvYXJkID0gZ2FtZS5nZXRQbGF5ZXJCb2FyZCgpO1xuICBjb25zdCBhaUJvYXJkID0gZ2FtZS5nZXRBaUJvYXJkKCk7XG5cbiAgY29uc3QgZ2V0UGxheWVyID0gZ2FtZS5nZXRQbGF5ZXIoKTtcbiAgY29uc3QgZ2V0QWkgPSBnYW1lLmdldEFpKCk7XG5cbiAgLy8gU2V0dGluZyBwbGF5ZXIgYW5kIGFpIG5hbWVzIG9uIFVJXG4gIGNvbnN0IHNldFBsYXllck5hbWUgPSAocGxheWVyLCBhaSkgPT4ge1xuICAgIGNvbnN0IHBsYXllcklkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lvdXItYm9hcmQnKTtcbiAgICBjb25zdCBhaUlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29wcG9uZW50LWJvYXJkJyk7XG4gICAgcGxheWVySWQudGV4dENvbnRlbnQgPSBwbGF5ZXI7XG4gICAgYWlJZC50ZXh0Q29udGVudCA9IGFpO1xuICB9O1xuXG4gIC8vIENvbG9yIGNlbGxzIG9jY3VwaWVkIGJ5IHNoaXBzIG9uIHRoZSBwbGF5ZXIgYm9hcmRcbiAgY29uc3QgY29sb3JTaGlwQ2VsbHMgPSAocm93LCBjb2x1bW4sIHR5cGUpID0+IHtcbiAgICBjb25zdCBzZWxlY3RDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbZGF0YS1pbmRleC1udW1iZXI9JyR7cm93fS0ke2NvbHVtbn0nXWAsXG4gICAgKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBQcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodHlwZSA9PT0gc2hpcFByb3BlcnRpZXNbaV0udHlwZSkge1xuICAgICAgICBzZWxlY3RDZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGAke3NoaXBQcm9wZXJ0aWVzW2ldLmNvbG9yfWA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIEJ1aWxkIGJvYXJkIGdyaWRzIGJhc2VkIG9uIDJELWFycmF5c1xuICBjb25zdCBidWlsZEdyaWRzID0gKCkgPT4ge1xuICAgIC8vIEJ1aWxkIHBsYXllciBncmlkXG4gICAgY29uc3QgcGxheWVyMmRBcnJheSA9IHBsYXllckJvYXJkLmJvYXJkO1xuICAgIGNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQtcGxheWVyJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXIyZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBsYXllcjJkQXJyYXlbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnLCAnY2VsbC1wbGF5ZXInKTtcbiAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgICAgIGNlbGwuZGF0YXNldC5pbmRleE51bWJlciA9IGAke1tpXX0tJHtbal19YDtcbiAgICAgICAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2VsbCk7XG5cbiAgICAgICAgLy8gSWYgYXJyYXktaW5kZXggaXMgYSBzaGlwIHRoZW4gYWRkIHNoaXAtbmFtZSBhcyBjbGFzcyBvbiBncmlkLWNlbGxcbiAgICAgICAgaWYgKHR5cGVvZiBwbGF5ZXIyZEFycmF5W2ldW2pdICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgIGNvbnN0IHJvdyA9IGk7XG4gICAgICAgICAgY29uc3QgY29sdW1uID0gajtcbiAgICAgICAgICBjb25zdCBzaGlwVHlwZSA9IHBsYXllcjJkQXJyYXlbaV1bal1bMV0udHlwZTtcbiAgICAgICAgICBjb2xvclNoaXBDZWxscyhyb3csIGNvbHVtbiwgc2hpcFR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQnVpbGQgYWkgZ3JpZFxuICAgIGNvbnN0IGFpMmRBcnJheSA9IGFpQm9hcmQuYm9hcmQ7XG4gICAgY29uc3QgYWlCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWJvYXJkLW9wcG9uZW50Jyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhaTJkQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWkyZEFycmF5W2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJywgJ2NlbGwtb3Bwb25lbnQnKTtcbiAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgICAgIGNlbGwuZGF0YXNldC5pbmRleE51bWJlciA9IGAke1tpXX0tJHtbal19YDtcbiAgICAgICAgYWlCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gU2V0IG5hbWUgaW4gXCJ3YWl0aW5nIGZvciBwbGF5ZXJcIlxuICBjb25zdCBzZXROYW1lV2FpdGluZyA9ICgpID0+IHtcbiAgICBjb25zdCB3YWl0aW5nRm9yUGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1pZCcpO1xuICAgIGNvbnN0IGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkZXInKTtcbiAgICB3YWl0aW5nRm9yUGxheWVyLnRleHRDb250ZW50ID0gZ2FtZS5nZXRBY3RpdmVQbGF5ZXIoKS5uYW1lO1xuXG4gICAgLy8gU2hvdyBsb2FkZXIgd2hpbGUgd2FpdGluZyBmb3IgcGxheWVyIHRvIG1ha2UgYSBtb3ZlXG4gICAgbG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xuICB9O1xuXG4gIHNldFBsYXllck5hbWUocGxheWVyLCBhaSk7XG4gIGJ1aWxkR3JpZHMoKTtcbiAgc2V0TmFtZVdhaXRpbmcoKTtcblxuICBjb25zdCBib2FyZEFjY2Vzc2liaWxpdHkgPSAoc3RhdHVzKSA9PiB7XG4gICAgLy8gRGlzYWJsZSBib2FyZCBmb3IgZnVydGhlciBpbnB1dCB3aGVuIHdpbm5lciBpcyBmb3VuZCBvciBhaSBpcyB0byBtYWtlIGFuIGF0dGFja1xuICAgIGNvbnN0IGdhbWVCb2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FtZS1ib2FyZCcpO1xuICAgIGNvbnN0IGFpQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1ib2FyZC1vcHBvbmVudCcpO1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcblxuICAgIGlmIChzdGF0dXMgPT09ICd3YWl0aW5nJykge1xuICAgICAgYWlCb2FyZC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZC1ib2FyZCcpO1xuICAgIH1cblxuICAgIGdhbWVCb2FyZHMuZm9yRWFjaCgoYm9hcmQpID0+IHtcbiAgICAgIGlmIChzdGF0dXMgPT09ICdkaXNhYmxlJykge1xuICAgICAgICBib2FyZC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZC1ib2FyZCcpO1xuICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdlbmFibGUnKSB7XG4gICAgICAgIGJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkLWJvYXJkJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBpZiAoc3RhdHVzID09PSAnZGlzYWJsZScpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZC1jZWxsJyk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ2VuYWJsZScpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZC1jZWxsJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gRXZlbnQgbGlzdGVuZXIgZm9yIHBsYXllciBhdHRhY2sgb24gZW5lbXlcbiAgY29uc3Qgb3Bwb25lbnRCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWJvYXJkLW9wcG9uZW50Jyk7XG5cbiAgb3Bwb25lbnRCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG5cbiAgICAvLyBDb252ZXJ0IGNlbGwgaW5kZXhOdW1iZXIgdG8gY29vcmRpbmF0ZXNcbiAgICBjb25zdCBpbmRleE51bWJlciA9IHRhcmdldC5kYXRhc2V0LmluZGV4TnVtYmVyO1xuICAgIGNvbnN0IGluZGV4VG9BcnJheSA9IGluZGV4TnVtYmVyLnNwbGl0KCctJyk7XG4gICAgY29uc3Qgcm93ID0gTnVtYmVyKGluZGV4VG9BcnJheVswXSk7XG4gICAgY29uc3QgY29sdW1uID0gTnVtYmVyKGluZGV4VG9BcnJheVsxXSk7XG5cbiAgICAvLyBJbml0aWF0ZSByb3VuZCB3aXRoIGF0dGFjayBmcm9tIHBsYXllclxuICAgIGdhbWUucGxheVJvdW5kKHJvdywgY29sdW1uKTtcblxuICAgIC8vIFNldCBhcHByb3ByaWF0ZSBpY29uIG9uIGF0dGFja2VkIG9wcG9uZW50IGNlbGwgd2V0aGVyIGEgaGl0IG9yIGEgbWlzc1xuICAgIGlmICghYWlCb2FyZC5pc0hpdCkge1xuICAgICAgY29uc3QgbWlzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgbWlzcy5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgICBtaXNzLnNldEF0dHJpYnV0ZSgnc3JjJywgbWlzc0ljb24pO1xuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKG1pc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBoaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIGhpdC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgIGhpdC5zZXRBdHRyaWJ1dGUoJ3NyYycsIGhpdEljb24pO1xuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGhpdCk7XG4gICAgfVxuXG4gICAgLy8gRGlzYWJsZSBhdHRhY2tlZCBvcHBvbmVudCBjZWxsXG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnYXR0YWNrZWQtb3Bwb25lbnQtY2VsbCcpO1xuXG4gICAgY29uc3QgYWkgPSBnYW1lLmdldEFpKCk7XG5cbiAgICAvLyBTZXQgYXBwcm9wcmlhdGUgaWNvbiBvbiBhdHRhY2tlZCBwbGF5ZXIgY2VsbCB3ZXRoZXIgYSBoaXQgb3IgYSBtaXNzXG4gICAgY29uc3Qgc2hvd0FpQXR0YWNrID0gKCkgPT4ge1xuICAgICAgY29uc3QgbGF0ZXN0QWlBdHRhY2sgPSBhaS5hdHRhY2tzW2FpLmF0dGFja3MubGVuZ3RoIC0gMV07XG4gICAgICBjb25zdCBhaUF0dGFja1JvdyA9IGxhdGVzdEFpQXR0YWNrWzBdO1xuICAgICAgY29uc3QgYWlBdHRhY2tDb2x1bW4gPSBsYXRlc3RBaUF0dGFja1sxXTtcbiAgICAgIGNvbnN0IGdldFBsYXllckNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgW2RhdGEtaW5kZXgtbnVtYmVyPScke2FpQXR0YWNrUm93fS0ke2FpQXR0YWNrQ29sdW1ufSddYCxcbiAgICAgICk7XG5cbiAgICAgIGlmICghcGxheWVyQm9hcmQuaXNIaXQpIHtcbiAgICAgICAgY29uc3QgbWlzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBtaXNzLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgICAgbWlzcy5zZXRBdHRyaWJ1dGUoJ3NyYycsIG1pc3NJY29uKTtcbiAgICAgICAgZ2V0UGxheWVyQ2VsbC5hcHBlbmRDaGlsZChtaXNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGhpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBoaXQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAgIGhpdC5zZXRBdHRyaWJ1dGUoJ3NyYycsIGhpdEljb24pO1xuICAgICAgICBnZXRQbGF5ZXJDZWxsLmFwcGVuZENoaWxkKGhpdCk7XG4gICAgICB9XG4gICAgICBib2FyZEFjY2Vzc2liaWxpdHkoJ2VuYWJsZScpO1xuICAgIH07XG5cbiAgICAvLyBTaG93IGEgd2lubmVyXG4gICAgY29uc3QgZ2V0V2lubmVyID0gZ2FtZS5nZXRXaW5uZXIoKTtcbiAgICBjb25zdCB3aW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLXdvbicpO1xuICAgIGNvbnN0IHdpbm5lcklkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dpbm5lci1pZCcpO1xuICAgIGNvbnN0IHBsYXllclR1cm4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXR1cm4nKTtcblxuICAgIGlmIChnZXRXaW5uZXIpIHtcbiAgICAgIHdpbm5lcklkLnRleHRDb250ZW50ID0gZ2V0V2lubmVyO1xuICAgICAgd2lubmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xuICAgICAgcGxheWVyVHVybi5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKTtcblxuICAgICAgYm9hcmRBY2Nlc3NpYmlsaXR5KCdkaXNhYmxlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbm5lci5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKTtcbiAgICAgIHBsYXllclR1cm4uY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XG5cbiAgICAgIC8vIFByZXZlbnQgbmV3IHBsYXllciBhdHRhY2sgYmVmb3JlIGFpIGhhcyBhdHRhY2tlZFxuICAgICAgYm9hcmRBY2Nlc3NpYmlsaXR5KCd3YWl0aW5nJyk7XG5cbiAgICAgIC8vIE1ha2VzIHJhbmRvbSBkZWxheSBpbiBhaSBkZWNpc2lvblxuICAgICAgY29uc3QgYWlUaGlua1RpbWUgPSBNYXRoLnJhbmRvbSgpICogMzAwMDtcbiAgICAgIGNvbnNvbGUubG9nKGFpVGhpbmtUaW1lKTtcbiAgICAgIHNldFRpbWVvdXQoc2hvd0FpQXR0YWNrLCBhaVRoaW5rVGltZSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBXaGVuIGNvbmZpcm1pbmcgYSBuZXcgZ2FtZVxuICBjb25zdCBtb2RhbENvbmZpcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY29uZmlybScpO1xuICBjb25zdCBjb25maXJtWWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3llcy1idG4nKTtcbiAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1ib2FyZC1wbGF5ZXInKTtcbiAgY29uc3QgYWlCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWJvYXJkLW9wcG9uZW50Jyk7XG5cbiAgY29uZmlybVllcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBtb2RhbENvbmZpcm0uY2xvc2UoKTtcbiAgICBtb2RhbENvbmZpcm0uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuXG4gICAgLy8gQ2xlYXIgYm9hcmRzXG4gICAgd2hpbGUgKHBsYXllckJvYXJkQ29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHBsYXllckJvYXJkQ29udGFpbmVyLnJlbW92ZUNoaWxkKHBsYXllckJvYXJkQ29udGFpbmVyLmxhc3RDaGlsZCk7XG4gICAgfVxuICAgIHdoaWxlIChhaUJvYXJkQ29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGFpQm9hcmRDb250YWluZXIucmVtb3ZlQ2hpbGQoYWlCb2FyZENvbnRhaW5lci5sYXN0Q2hpbGQpO1xuICAgIH1cblxuICAgIC8vIFJlc2V0IEluaXRpYWxpemVkIGNsYXNzZXNcbiAgICBwbGF5ZXJCb2FyZC5yZXNldCgpO1xuICAgIGFpQm9hcmQucmVzZXQoKTtcbiAgICBnZXRQbGF5ZXIucmVzZXQoKTtcbiAgICBnZXRBaS5yZXNldCgpO1xuXG4gICAgLy8gUmUtYnVpbGQgYm9hcmRzIGFuZCByZS1wbGFjZSBzaGlwcyBhZnRlciBjbGFzcyByZXNldFxuICAgIHBsYXllckJvYXJkLmJ1aWxkQm9hcmQoKTtcbiAgICBhaUJvYXJkLmJ1aWxkQm9hcmQoKTtcbiAgICBwbGF5ZXJCb2FyZC5nZXRSYW5kb21QbGFjZW1lbnQoKTtcbiAgICBhaUJvYXJkLmdldFJhbmRvbVBsYWNlbWVudCgpO1xuICAgIGJ1aWxkR3JpZHMoKTtcblxuICAgIC8vIEhpZGUgd2lubmVyIFVJIGFuZCBzaG93IHBsYXllciB3YWl0IFVJXG4gICAgY29uc3Qgd2lubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci13b24nKTtcbiAgICBjb25zdCBwbGF5ZXJUdXJuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci10dXJuJyk7XG4gICAgd2lubmVyLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xuICAgIHBsYXllclR1cm4uY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XG5cbiAgICAvLyBFbmFibGUgZW5lbXkgYm9hcmQgZm9yIGF0dGFja3NcbiAgICBib2FyZEFjY2Vzc2liaWxpdHkoJ2VuYWJsZScpO1xuICB9KTtcblxuICAvLyBXaGVuIHJlZ3JldHRpbmcgdG8gc3RhcnQgYSBuZXcgZ2FtZVxuICBjb25zdCBjb25maXJtTm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm8tYnRuJyk7XG5cbiAgY29uZmlybU5vLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG1vZGFsQ29uZmlybS5jbG9zZSgpO1xuICAgIG1vZGFsQ29uZmlybS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gIH0pO1xufVxuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4uL2ZhY3Rvcmllcy9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi4vZmFjdG9yaWVzL3BsYXllcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBHYW1lKHBsYXllck5hbWUsIGFpTmFtZSkge1xuICAvLyBJbml0aWFsaXplIGdhbWVib2FyZCBhbmQgcGxhY2Ugc2hpcHNcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGFpQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGdldFBsYXllckJvYXJkID0gKCkgPT4gcGxheWVyQm9hcmQ7XG4gIGNvbnN0IGdldEFpQm9hcmQgPSAoKSA9PiBhaUJvYXJkO1xuXG4gIGNvbnN0IGJ1aWxkUGxheWVyQm9hcmQgPSBwbGF5ZXJCb2FyZC5idWlsZEJvYXJkKCk7XG4gIGNvbnN0IGJ1aWxkQWlCb2FyZCA9IGFpQm9hcmQuYnVpbGRCb2FyZCgpO1xuXG4gIGNvbnN0IHBsYWNlU2hpcHNQbGF5ZXIgPSBwbGF5ZXJCb2FyZC5nZXRSYW5kb21QbGFjZW1lbnQoKTtcbiAgY29uc3QgcGxhY2VTaGlwc0FpID0gYWlCb2FyZC5nZXRSYW5kb21QbGFjZW1lbnQoKTtcblxuICAvLyBJbml0aWFsaXplIHBsYXllcnMgYW5kIGhhbmRsZSBwbGF5ZXIncyB0dXJuXG4gIGNvbnN0IHBsYXllcnMgPSBbXG4gICAge1xuICAgICAgbmFtZTogcGxheWVyTmFtZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IGFpTmFtZSxcbiAgICB9LFxuICBdO1xuXG4gIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIocGxheWVyc1swXS5uYW1lKTtcbiAgY29uc3QgYWkgPSBuZXcgUGxheWVyKHBsYXllcnNbMV0ubmFtZSk7XG4gIGNvbnN0IGdldFBsYXllciA9ICgpID0+IHBsYXllcjtcbiAgY29uc3QgZ2V0QWkgPSAoKSA9PiBhaTtcblxuICBsZXQgYWN0aXZlUGxheWVyID0gcGxheWVyc1swXTtcbiAgY29uc3Qgc3dpdGNoUGxheWVyVHVybiA9ICgpID0+IHtcbiAgICBpZiAoYWN0aXZlUGxheWVyID09PSBwbGF5ZXJzWzBdKSB7XG4gICAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXJzWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXJzWzBdO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRBY3RpdmVQbGF5ZXIgPSAoKSA9PiBhY3RpdmVQbGF5ZXI7XG5cbiAgLy8gUGxheSBhIHJvdW5kIG9mIHRoZSBnYW1lXG4gIGxldCB3aW5uZXI7XG4gIGNvbnN0IGdldFdpbm5lciA9ICgpID0+IHdpbm5lcjtcblxuICBjb25zdCBwbGF5Um91bmQgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICAvLyBSZXNldCB3aW5uZXIgdmFyaWFibGUgaW4gY2FzZSBvZiBuZXcgZ2FtZVxuICAgIHdpbm5lciA9ICcnO1xuXG4gICAgLy8gQ2hlY2sgZm9yIGEgd2lubmVyXG4gICAgY29uc3QgaXNXaW5uZXIgPSAoKSA9PiB7XG4gICAgICBpZiAocGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgd2lubmVyID0gcGxheWVyc1sxXS5uYW1lO1xuICAgICAgfSBlbHNlIGlmIChhaUJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgIHdpbm5lciA9IHBsYXllcnNbMF0ubmFtZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKGdldEFjdGl2ZVBsYXllcigpID09PSBwbGF5ZXJzWzBdKSB7XG4gICAgICBwbGF5ZXIuYXR0YWNrU3F1YXJlKHJvdywgY29sdW1uLCBhaUJvYXJkKTtcbiAgICAgIGlzV2lubmVyKCk7XG4gICAgfVxuXG4gICAgc3dpdGNoUGxheWVyVHVybigpO1xuXG4gICAgLy8gTGV0IEFJIGF0dGFjayBwbGF5ZXIgYm9hcmQgd2l0aCBcInRoaW5raW5nXCIgZGVsYXlcbiAgICBpZiAoZ2V0QWN0aXZlUGxheWVyKCkgPT09IHBsYXllcnNbMV0pIHtcbiAgICAgIGNvbnN0IGFpQXR0YWNrID0gKCkgPT4ge1xuICAgICAgICBhaS5hdHRhY2tSYW5kb21TcXVhcmUocGxheWVyQm9hcmQpO1xuICAgICAgICBpZiAoYWkuYWxyZWFkeUF0dGFja2VkKSBhaUF0dGFjaygpO1xuICAgICAgfTtcbiAgICAgIGFpQXR0YWNrKCk7XG4gICAgICBpc1dpbm5lcigpO1xuICAgIH1cblxuICAgIHN3aXRjaFBsYXllclR1cm4oKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdldFBsYXllckJvYXJkLFxuICAgIGdldEFpQm9hcmQsXG4gICAgZ2V0UGxheWVyLFxuICAgIGdldEFpLFxuICAgIGdyaWRTaXplOiBnZXRQbGF5ZXJCb2FyZC5ncmlkU2l6ZSxcbiAgICBnZXRBY3RpdmVQbGF5ZXIsXG4gICAgcGxheVJvdW5kLFxuICAgIGdldFdpbm5lcixcbiAgfTtcbn1cblxuLy8gRU5EIC8vXG4iLCIvLyBTVEFSVCAvL1xuXG5leHBvcnQgY29uc3Qgc2hpcFByb3BlcnRpZXMgPSBbXG4gIHtcbiAgICB0eXBlOiAnQ2FycmllcicsXG4gICAgbGVuZ3RoOiA1LFxuICAgIGNvbG9yOiAncmdiKDI1MiwgNCwgNCwgLjQpJyxcbiAgfSxcbiAge1xuICAgIHR5cGU6ICdCYXR0bGVzaGlwJyxcbiAgICBsZW5ndGg6IDQsXG4gICAgY29sb3I6ICdyZ2IoNCwgMTQwLCA0LCAuNCknLFxuICB9LFxuICB7XG4gICAgdHlwZTogJ0Rlc3Ryb3llcicsXG4gICAgbGVuZ3RoOiAzLFxuICAgIGNvbG9yOiAncmdiKDQsIDQsIDI1MiwgLjQpJyxcbiAgfSxcbiAge1xuICAgIHR5cGU6ICdTdWJtYXJpbmUnLFxuICAgIGxlbmd0aDogMyxcbiAgICBjb2xvcjogJ3JnYigyNTIsIDI1MSwgMzIsIC40KScsXG4gIH0sXG4gIHtcbiAgICB0eXBlOiAnUGF0cm9sIEJvYXQnLFxuICAgIGxlbmd0aDogMixcbiAgICBjb2xvcjogJ3JnYigxMiwgNCwgMTIsIC40KScsXG4gIH0sXG5dO1xuIiwiLy8gU1RBUlQgLy9cblxuaW1wb3J0IHsgc2hpcFByb3BlcnRpZXMgfSBmcm9tICcuLi9kYXRhL3NoaXBQcm9wZXJ0aWVzJztcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuXG5leHBvcnQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgYm9hcmQ7XG4gIG1pc3NlZFNob3RzO1xuICBzdW5rZW5TaGlwcztcbiAgZ3JpZFNpemUgPSAxMDtcbiAgaXNIaXQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgIHRoaXMubWlzc2VkU2hvdHMgPSBbXTtcbiAgICB0aGlzLnN1bmtlblNoaXBzID0gW107XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmJvYXJkID0gW107XG4gICAgdGhpcy5taXNzZWRTaG90cyA9IFtdO1xuICAgIHRoaXMuc3Vua2VuU2hpcHMgPSBbXTtcbiAgfVxuXG4gIC8vIEdlbmVyYXRlIHRoZSBnYW1lIGJvYXJkIGFzIGEgMkQtYXJyYXlcbiAgYnVpbGRCb2FyZCgpIHtcbiAgICBsZXQgdmFsdWUgPSAxO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdyaWRTaXplOyBpKyspIHtcbiAgICAgIHRoaXMuYm9hcmRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ncmlkU2l6ZTsgaisrKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbaV1bal0gPSB2YWx1ZSsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSB0b3RhbCBmbGVldCBzaXplIGNvdW50ZWQgYXMgdG90YWwgbnVtYmVyIG9mIHNxdWFyZXMgb2NjdXBpZWRcbiAgLy8gYnkgdGhlIHNoaXBzIG9uIHRoZSBnYW1lLXJlYWR5IGJvYXJkXG4gIGZsZWV0KCkge1xuICAgIGxldCBmbGVldFNpemUgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZsZWV0U2l6ZSArPSBzaGlwUHJvcGVydGllc1tpXS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBmbGVldFNpemU7XG4gIH1cblxuICAvLyBDcmVhdGUgc2hpcHMgYnkgY2FsbGluZyBTaGlwIGNsYXNzXG4gIGNyZWF0ZVNoaXBzKCkge1xuICAgIGNvbnN0IHByb3BzID0gc2hpcFByb3BlcnRpZXM7XG4gICAgbGV0IHNoaXBzQXJyYXkgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGlzVmVydGljYWwgPSBbdHJ1ZSwgZmFsc2VdW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSldO1xuICAgICAgY29uc3QgdmVzc2VsID0gbmV3IFNoaXAocHJvcHNbaV0udHlwZSwgcHJvcHNbaV0ubGVuZ3RoLCBpc1ZlcnRpY2FsKTtcbiAgICAgIHNoaXBzQXJyYXkucHVzaCh2ZXNzZWwpO1xuICAgIH1cbiAgICByZXR1cm4gc2hpcHNBcnJheTtcbiAgfVxuXG4gIHBsYWNlU2hpcHMoc2hpcCwgcm93LCBjb2x1bW4sIHZlcnRpY2FsKSB7XG4gICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZFtyb3cgKyBpXVtjb2x1bW5dID0gW2ksIHNoaXBdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbHVtbiArIGldID0gW2ksIHNoaXBdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFJhbmRvbVBsYWNlbWVudCgpIHtcbiAgICAvLyBHZXQgcmV0dXJuZWQgYXJyYXkgZnJvbSAnY3JlYXRlU2hpcHMoKSdcbiAgICBjb25zdCBzaGlwcyA9IHRoaXMuY3JlYXRlU2hpcHMoKTtcblxuICAgIC8vIENoZWNrIHRvIHNlZSB0aGF0IGJvYXJkIGlzIGVtcHR5IChpLmUuIHJlYWR5IGZvciBhIG5ldyBnYW1lKVxuICAgIGlmICghdGhpcy5pc0JvYXJkRW1wdHkpIHJldHVybjtcblxuICAgIC8vIEZvciBldmVyeSBzaGlwIGluIGFycmF5XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gU2VsZWN0IHJhbmRvbSBzdGFydC1jb29yZGluYXRlXG4gICAgICBjb25zdCByYW5kWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZ3JpZFNpemUpO1xuICAgICAgY29uc3QgcmFuZFkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmdyaWRTaXplKTtcbiAgICAgIC8vIFJlYWQgb3JpZW50YXRpb24gb2Ygc2hpcFxuICAgICAgY29uc3QgdmVydGljYWwgPSBzaGlwc1tpXS52ZXJ0aWNhbDtcblxuICAgICAgLy8gQ2hlY2sgaWYgcGxhY2VtZW50IGlzIGFsbG93ZWQgLSBvdGhlcndpc2UgcmUtc3RhcnQgbG9vcCBmcm9tIGN1cnJlbnQgaW5kZXggYWdhaW5cbiAgICAgIGlmICghdGhpcy5wbGFjZW1lbnRBbGxvd2VkKHNoaXBzW2ldLCByYW5kWCwgcmFuZFksIHZlcnRpY2FsKSkge1xuICAgICAgICBpLS07XG4gICAgICB9IGVsc2UgdGhpcy5wbGFjZVNoaXBzKHNoaXBzW2ldLCByYW5kWCwgcmFuZFksIHZlcnRpY2FsKTtcbiAgICB9XG4gIH1cblxuICBwbGFjZW1lbnRBbGxvd2VkKHNoaXAsIHJvdywgY29sdW1uLCB2ZXJ0aWNhbCkge1xuICAgIC8vIENoZWNrIGlmIHBsYWNlbWVudCBvZiBzaGlwIGlzIGZ1bGx5IG9yIHBhcnRseSBvdXRzaWRlIGdyaWQgcGVyaW1ldGVyXG4gICAgaWYgKFxuICAgICAgcm93ID4gdGhpcy5ncmlkU2l6ZSB8fFxuICAgICAgY29sdW1uID4gdGhpcy5ncmlkU2l6ZSB8fFxuICAgICAgcm93ICsgc2hpcC5sZW5ndGggPiB0aGlzLmdyaWRTaXplIHx8XG4gICAgICBjb2x1bW4gKyBzaGlwLmxlbmd0aCA+IHRoaXMuZ3JpZFNpemVcbiAgICApXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBDaGVjayBpZiBhIGdpdmVuIGNvb3JkaW5hdGUgaXMgYWxyZWFkeSBvY2N1cGllZFxuICAgIGlmICh2ZXJ0aWNhbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFtyb3cgKyBpXVtjb2x1bW5dICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW3Jvd11bY29sdW1uICsgaV0gIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbikge1xuICAgIGxldCBjb29yZGluYXRlID0gdGhpcy5ib2FyZFtyb3ddW2NvbHVtbl07XG5cbiAgICBpZiAodHlwZW9mIGNvb3JkaW5hdGUgIT09ICdudW1iZXInKSB7XG4gICAgICBjb29yZGluYXRlWzFdLmhpdChjb29yZGluYXRlWzBdKTtcbiAgICAgIHRoaXMuaXNIaXQgPSB0cnVlO1xuICAgICAgaWYgKGNvb3JkaW5hdGVbMV0uaXNTdW5rKCkpIHtcbiAgICAgICAgdGhpcy5zdW5rZW5TaGlwcy5wdXNoKGNvb3JkaW5hdGVbMV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pc3NlZFNob3RzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICB0aGlzLmlzSGl0ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGlmICh0aGlzLnN1bmtlblNoaXBzLmxlbmd0aCAhPT0gc2hpcFByb3BlcnRpZXMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0JvYXJkRW1wdHkoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdyaWRTaXplOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ncmlkU2l6ZTsgaisrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFtpXVtqXSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBVc2UgdGhpcyB0byB2ZXJpZnkgY29ycmVjdCBwbGFjZW1lbnQgb2Ygc2hpcHNcbiAgY291bnRPY2N1cGllZFNxdWFyZXMoKSB7XG4gICAgY29uc3QgYXZhaWxhYmxlU3F1YXJlcyA9IHRoaXMuZ3JpZFNpemUgKiB0aGlzLmdyaWRTaXplO1xuICAgIGNvbnN0IGZsZWV0U2l6ZSA9IHRoaXMuZmxlZXQoKTtcbiAgICByZXR1cm4gYXZhaWxhYmxlU3F1YXJlcyAtIChhdmFpbGFibGVTcXVhcmVzIC0gZmxlZXRTaXplKTtcbiAgfVxufVxuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICBhdHRhY2tzO1xuICBhbHJlYWR5QXR0YWNrZWQ7XG5cbiAgY29uc3RydWN0b3IocGxheWVyTmFtZSkge1xuICAgIHRoaXMucGxheWVyTmFtZSA9IHBsYXllck5hbWU7XG4gICAgdGhpcy5hdHRhY2tzID0gW107XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmF0dGFja3MgPSBbXTtcbiAgfVxuXG4gIGF0dGFja1NxdWFyZShyb3csIGNvbHVtbiwgZW5lbXlCb2FyZCkge1xuICAgIGlmICghdGhpcy5oYXNCZWVuQXR0YWNrZWQocm93LCBjb2x1bW4pKSB7XG4gICAgICB0aGlzLmF0dGFja3MucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhdHRhY2tSYW5kb21TcXVhcmUocGxheWVyQm9hcmQpIHtcbiAgICBpZiAodGhpcy5hdHRhY2tzLmxlbmd0aCA+PSAxMDApIHJldHVybjtcbiAgICBjb25zdCByYW5kUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcGxheWVyQm9hcmQuZ3JpZFNpemUpO1xuICAgIGNvbnN0IHJhbmRDb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwbGF5ZXJCb2FyZC5ncmlkU2l6ZSk7XG5cbiAgICBpZiAoIXRoaXMuaGFzQmVlbkF0dGFja2VkKHJhbmRSb3csIHJhbmRDb2x1bW4pKSB7XG4gICAgICB0aGlzLmF0dGFja3MucHVzaChbcmFuZFJvdywgcmFuZENvbHVtbl0pO1xuICAgICAgcGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kUm93LCByYW5kQ29sdW1uKTtcbiAgICAgIHRoaXMuYWxyZWFkeUF0dGFja2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWxyZWFkeUF0dGFja2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBoYXNCZWVuQXR0YWNrZWQocm93LCBjb2x1bW4pIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXR0YWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuYXR0YWNrc1tpXVswXSA9PT0gcm93ICYmIHRoaXMuYXR0YWNrc1tpXVsxXSA9PT0gY29sdW1uKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIEVORCAvL1xuIiwiLy8gU1RBUlQgLy9cblxuZXhwb3J0IGNsYXNzIFNoaXAge1xuICB0eXBlO1xuICBsZW5ndGg7XG4gIHZlcnRpY2FsID0gZmFsc2U7XG4gIGhpdHM7XG5cbiAgY29uc3RydWN0b3IodHlwZSwgbGVuZ3RoLCB2ZXJ0aWNhbCkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy52ZXJ0aWNhbCA9IHZlcnRpY2FsO1xuICAgIHRoaXMuaGl0cyA9IFtdO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5oaXRzID0gW107XG4gIH1cblxuICBoaXQocG9zaXRpb24pIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmhpdHMuaW5jbHVkZXMocG9zaXRpb24pIHx8XG4gICAgICBwb3NpdGlvbiA8IDAgfHxcbiAgICAgIHBvc2l0aW9uID4gdGhpcy5sZW5ndGggLSAxXG4gICAgKVxuICAgICAgcmV0dXJuO1xuICAgIHRoaXMuaGl0cy5wdXNoKHBvc2l0aW9uKTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRzLmxlbmd0aCA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBFTkQgLy9cbiIsIi8vIFNUQVJUIC8vXG5cbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0ICcuL2h0bWwvaW5kZXguaHRtbCc7XG5pbXBvcnQgeyBEaXNwbGF5IH0gZnJvbSAnLi9jb250cm9sbGVyL2Rpc3BsYXlDb250cm9sbGVyJztcblxuLy8gU2V0IGNvcHlyaWdodCB5ZWFyIGF1dG9tYXRpY2FsbHlcbmNvbnN0IGNvcHlyaWdodFNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29weXJpZ2h0LXNwYW4nKTtcbmNvcHlyaWdodFNwYW4udGV4dENvbnRlbnQgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cbi8vIFNob3cgbW9kYWwgd2l0aCBwYWdlIGxvYWRcbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLW5hbWUnKTtcbmNvbnN0IG1haW5HYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tZ2FtZScpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgbWFpbkdhbWUuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICBtb2RhbC5zaG93TW9kYWwoKTtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xufSk7XG5cbi8vIFN0YXJ0IGdhbWUgd2hlbiBwbGF5ZXIgbmFtZSBoYXMgYmVlbiBlbnRlcmVkXG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1idG4nKTtcbmNvbnN0IGFsaWFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1uYW1lJyk7XG5cbnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBtb2RhbC5jbG9zZSgpO1xuICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gIG1haW5HYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblxuICBEaXNwbGF5KGFsaWFzLnZhbHVlKTtcbn0pO1xuXG4vLyAuLi4gb3IgcHJlc3MgJ2VudGVyJ1xuYWxpYXMuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICBpZiAoZS5rZXlDb2RlID09PSAxMykgc3RhcnRCdG4uY2xpY2soKTtcbn0pO1xuXG4vLyBTaG93IGNvbmZpcm1hdGlvbiBtb2RhbCB3aGVuIHdhbnRpbmcgYSBuZXcgZ2FtZVxuY29uc3QgbmV3R2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctZ2FtZS1idG4nKTtcbmNvbnN0IG1vZGFsQ29uZmlybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jb25maXJtJyk7XG5cbm5ld0dhbWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIG1vZGFsQ29uZmlybS5zaG93TW9kYWwoKTtcbiAgbW9kYWxDb25maXJtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbn0pO1xuXG4vLyBTaG93IGluZm8gbW9kYWwgb24gaG92ZXJcbmNvbnN0IGluZm9JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8taWNvbicpO1xuY29uc3QgaW5mb01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWluZm8nKTtcblxuaW5mb0ljb24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICBpbmZvTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xufSk7XG5cbmluZm9JY29uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICBpbmZvTW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xufSk7XG5cbmluZm9JY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4ge1xuICBpbmZvTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xufSk7XG5cbi8vIEVORCAvL1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9odG1sLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltZy9naXRodWItbG9nby5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1nL3NhaWxvci5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1nL2luZm8uc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltZy9oaXQuc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzRfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltZy9taXNzLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0hUTUxfTE9BREVSX0lNUE9SVF81X19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWcvcGlyYXRlLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xuLy8gTW9kdWxlXG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzBfX18pO1xudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzFfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF8xX19fKTtcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8yX19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfMl9fXyk7XG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzNfX18pO1xudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzRfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF80X19fKTtcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF81X19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfNV9fXyk7XG52YXIgY29kZSA9IFwiPCFkb2N0eXBlIGh0bWw+XFxuPGh0bWwgbGFuZz1cXFwiZW5cXFwiPlxcbiAgPGhlYWQ+XFxuICAgIDxtZXRhIGNoYXJzZXQ9XFxcIlVURi04XFxcIiAvPlxcbiAgICA8bWV0YSBuYW1lPVxcXCJ2aWV3cG9ydFxcXCIgY29udGVudD1cXFwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFxcXCIgLz5cXG4gICAgPHRpdGxlPkJhdHRsZXNoaXA8L3RpdGxlPlxcbiAgICA8bGlua1xcbiAgICAgIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9T3JiaXRyb24mZGlzcGxheT1zd2FwXFxcIlxcbiAgICAgIHJlbD1cXFwic3R5bGVzaGVldFxcXCJcXG4gICAgLz5cXG4gICAgPGxpbmtcXG4gICAgICByZWw9XFxcInN0eWxlc2hlZXRcXFwiXFxuICAgICAgaHJlZj1cXFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzQuNy4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzc1xcXCJcXG4gICAgLz5cXG4gICAgPGxpbmtcXG4gICAgICBocmVmPVxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUludGVyJmZhbWlseT1QbGF5ZmFpcitEaXNwbGF5JmRpc3BsYXk9c3dhcFxcXCJcXG4gICAgICByZWw9XFxcInN0eWxlc2hlZXRcXFwiXFxuICAgIC8+XFxuICAgIDxsaW5rXFxuICAgICAgaHJlZj1cXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1DYXZlYXQmZGlzcGxheT1zd2FwXFxcIlxcbiAgICAgIHJlbD1cXFwic3R5bGVzaGVldFxcXCJcXG4gICAgLz5cXG4gICAgPGxpbmtcXG4gICAgICBocmVmPVxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUx1Y2tpZXN0K0d1eSZkaXNwbGF5PXN3YXBcXFwiXFxuICAgICAgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIlxcbiAgICAvPlxcbiAgICA8bGlua1xcbiAgICAgIGhyZWY9XFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TW9ub3RvbiZkaXNwbGF5PXN3YXBcXFwiXFxuICAgICAgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIlxcbiAgICAvPlxcbiAgPC9oZWFkPlxcbiAgPGJvZHk+XFxuICAgIDxkaXYgY2xhc3M9XFxcImRldmVsb3BlclxcXCI+XFxuICAgICAgPHAgY2xhc3M9XFxcImNvcHlyaWdodFxcXCI+JmNvcHk8c3BhbiBpZD1cXFwiY29weXJpZ2h0LXNwYW5cXFwiPiAyMDIzPC9zcGFuPjwvcD5cXG4gICAgICA8YVxcbiAgICAgICAgY2xhc3M9XFxcImdpdGh1Yi1saW5rXFxcIlxcbiAgICAgICAgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL3Jhc211c2hhaXNsdW5kXFxcIlxcbiAgICAgICAgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiXFxuICAgICAgICA+UmFzbXVzIEguXFxuICAgICAgICA8aW1nXFxuICAgICAgICAgIHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8wX19fICsgXCJcXFwiXFxuICAgICAgICAgIGNsYXNzPVxcXCJnaXRodWItbG9nb1xcXCJcXG4gICAgICAgICAgYWx0PVxcXCJnaXRodWIgbG9nb1xcXCJcXG4gICAgICAvPjwvYT5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImhlYWRlclxcXCI+XFxuICAgICAgPHAgY2xhc3M9XFxcInRpdGxlXFxcIj5CQVRUTEVTSElQPC9wPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpYWxvZyBjbGFzcz1cXFwibW9kYWwtbmFtZVxcXCI+XFxuICAgICAgPGxhYmVsIGNsYXNzPVxcXCJtb2RhbC1sYWJlbFxcXCIgZm9yPVxcXCJwbGF5ZXItbmFtZVxcXCI+RW50ZXIgeW91ciBnYW1lIGFsaWFzPC9sYWJlbD5cXG4gICAgICA8aW5wdXRcXG4gICAgICAgIGlkPVxcXCJwbGF5ZXItbmFtZVxcXCJcXG4gICAgICAgIHR5cGU9XFxcInRleHRcXFwiXFxuICAgICAgICBuYW1lPVxcXCJwbGF5ZXJfbmFtZVxcXCJcXG4gICAgICAgIG1heGxlbmd0aD1cXFwiMjBcXFwiXFxuICAgICAgICBtaW5sZW5ndGg9XFxcIjFcXFwiXFxuICAgICAgICBwbGFjZWhvbGRlcj1cXFwiRW50ZXIgYWxpYXNcXFwiXFxuICAgICAgICBhdXRvZm9jdXNcXG4gICAgICAgIHJlcXVpcmVkXFxuICAgICAgLz5cXG4gICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG5cXFwiIGlkPVxcXCJzdGFydC1idG5cXFwiIHR5cGU9XFxcInN1Ym1pdFxcXCI+U1RBUlQ8L2J1dHRvbj5cXG4gICAgPC9kaWFsb2c+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1haW4tZ2FtZSBoaWRlXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJnYW1lLWNvbnRhaW5lclxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwbGF5ZXItdHVyblxcXCI+XFxuICAgICAgICAgIDxwIGNsYXNzPVxcXCJnYW1lLXRleHRcXFwiIGlkPVxcXCJwbGF5ZXItdHVyblxcXCI+XFxuICAgICAgICAgICAgV2FpdGluZyBmb3IgPHNwYW4gaWQ9XFxcInBsYXllci1pZFxcXCI+PC9zcGFuPlxcbiAgICAgICAgICA8L3A+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxvYWRlciBpbnZpc2libGVcXFwiPjwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8cCBjbGFzcz1cXFwiZ2FtZS10ZXh0IGludmlzaWJsZVxcXCIgaWQ9XFxcInBsYXllci13b25cXFwiPlxcbiAgICAgICAgICA8c3BhbiBpZD1cXFwid2lubmVyLWlkXFxcIj48L3NwYW4+IHdpbnMhXFxuICAgICAgICA8L3A+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJib2FyZC1jb250YWluZXJcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJib2FyZFxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYm9hcmQtaW5mb1xcXCI+XFxuICAgICAgICAgICAgICA8aW1nXFxuICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJpY29uIHBsYXllci1pY29uXFxcIlxcbiAgICAgICAgICAgICAgICBzcmM9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMV9fXyArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICBhbHQ9XFxcInBsYXllciBpY29uXFxcIlxcbiAgICAgICAgICAgICAgLz5cXG4gICAgICAgICAgICAgIDxwIGlkPVxcXCJ5b3VyLWJvYXJkXFxcIj48L3A+XFxuICAgICAgICAgICAgICA8aW1nXFxuICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJpY29uIGluZm8taWNvblxcXCJcXG4gICAgICAgICAgICAgICAgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzJfX18gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgYWx0PVxcXCJpbmZvcm1hdGlvblxcXCJcXG4gICAgICAgICAgICAgIC8+XFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1pbmZvIGhpZGVcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNxdWFyZSBzcXVhcmUtNVxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj4mdGltZXM1PC9wPlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dC0xXFxcIj5DYXJyaWVyPC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibGVnZW5kXFxcIj5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzcXVhcmUgc3F1YXJlLTRcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+JnRpbWVzNDwvcD5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPkJhdHRsZXNoaXA8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNxdWFyZSBzcXVhcmUtMy0xXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPiZ0aW1lczM8L3A+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj5EZXN0cm95ZXI8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNxdWFyZSBzcXVhcmUtMy0yXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwibGVnZW5kLXRleHRcXFwiPiZ0aW1lczM8L3A+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj5TdWJtYXJpbmU8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNxdWFyZSBzcXVhcmUtMlxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImxlZ2VuZC10ZXh0XFxcIj4mdGltZXMyPC9wPlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+UGF0cm9sIEJvYXQ8L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmRcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxpbWdcXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJsZWdlbmQtaWNvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8zX19fICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgICAgICBhbHQ9XFxcImV4cGxvc2lvblxcXCJcXG4gICAgICAgICAgICAgICAgICAvPlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+SGl0PC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibGVnZW5kXFxcIj5cXG4gICAgICAgICAgICAgICAgICA8aW1nXFxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwibGVnZW5kLWljb25cXFwiXFxuICAgICAgICAgICAgICAgICAgICBzcmM9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfNF9fXyArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgYWx0PVxcXCJ3YXZlc1xcXCJcXG4gICAgICAgICAgICAgICAgICAvPlxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJsZWdlbmQtdGV4dFxcXCI+TWlzczwvcD5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJnYW1lLWJvYXJkIGdhbWUtYm9hcmQtcGxheWVyXFxcIj48L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImJvYXJkXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJib2FyZC1pbmZvXFxcIj5cXG4gICAgICAgICAgICAgIDxpbWdcXG4gICAgICAgICAgICAgICAgY2xhc3M9XFxcImljb24gb3Bwb25lbnQtaWNvblxcXCJcXG4gICAgICAgICAgICAgICAgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzVfX18gKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgYWx0PVxcXCJvcHBvbmVudCBpY29uXFxcIlxcbiAgICAgICAgICAgICAgLz5cXG4gICAgICAgICAgICAgIDxwIGlkPVxcXCJvcHBvbmVudC1ib2FyZFxcXCI+PC9wPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImdhbWUtYm9hcmQgZ2FtZS1ib2FyZC1vcHBvbmVudFxcXCI+PC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG5cXFwiIGlkPVxcXCJuZXctZ2FtZS1idG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+TkVXIEdBTUU8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaWFsb2cgY2xhc3M9XFxcIm1vZGFsLWNvbmZpcm1cXFwiPlxcbiAgICAgIDxoMz5BcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gc3RhcnQgYSBuZXcgZ2FtZT88L2gzPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ1dHRvbnNcXFwiPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuXFxcIiBpZD1cXFwieWVzLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIj5ZRVM8L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XFxcImJ0blxcXCIgaWQ9XFxcIm5vLWJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIj5OTzwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2RpYWxvZz5cXG4gIDwvYm9keT5cXG48L2h0bWw+XFxuXCI7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBjb2RlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZSwgbm8tcGFyYW0tcmVhc3NpZ25cblxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLm1heWJlTmVlZFF1b3RlcyAmJiAvW1xcdFxcblxcZlxcciBcIic9PD5gXS8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwsIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJHYW1lIiwic2hpcFByb3BlcnRpZXMiLCJoaXRJY29uIiwibWlzc0ljb24iLCJEaXNwbGF5IiwicGxheWVyTmFtZSIsInBsYXllciIsImFpIiwiZ2FtZSIsInBsYXllckJvYXJkIiwiZ2V0UGxheWVyQm9hcmQiLCJhaUJvYXJkIiwiZ2V0QWlCb2FyZCIsImdldFBsYXllciIsImdldEFpIiwic2V0UGxheWVyTmFtZSIsInBsYXllcklkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWlJZCIsInRleHRDb250ZW50IiwiY29sb3JTaGlwQ2VsbHMiLCJyb3ciLCJjb2x1bW4iLCJ0eXBlIiwic2VsZWN0Q2VsbCIsImkiLCJsZW5ndGgiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwiYnVpbGRHcmlkcyIsInBsYXllcjJkQXJyYXkiLCJib2FyZCIsInBsYXllckJvYXJkQ29udGFpbmVyIiwiaiIsImNlbGwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwiZGF0YXNldCIsImluZGV4TnVtYmVyIiwiYXBwZW5kQ2hpbGQiLCJzaGlwVHlwZSIsImFpMmRBcnJheSIsImFpQm9hcmRDb250YWluZXIiLCJzZXROYW1lV2FpdGluZyIsIndhaXRpbmdGb3JQbGF5ZXIiLCJsb2FkZXIiLCJnZXRBY3RpdmVQbGF5ZXIiLCJuYW1lIiwicmVtb3ZlIiwiYm9hcmRBY2Nlc3NpYmlsaXR5Iiwic3RhdHVzIiwiZ2FtZUJvYXJkcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjZWxscyIsImZvckVhY2giLCJvcHBvbmVudEJvYXJkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImluZGV4VG9BcnJheSIsInNwbGl0IiwiTnVtYmVyIiwicGxheVJvdW5kIiwiaXNIaXQiLCJtaXNzIiwiaGl0Iiwic2hvd0FpQXR0YWNrIiwibGF0ZXN0QWlBdHRhY2siLCJhdHRhY2tzIiwiYWlBdHRhY2tSb3ciLCJhaUF0dGFja0NvbHVtbiIsImdldFBsYXllckNlbGwiLCJnZXRXaW5uZXIiLCJ3aW5uZXIiLCJ3aW5uZXJJZCIsInBsYXllclR1cm4iLCJhaVRoaW5rVGltZSIsIk1hdGgiLCJyYW5kb20iLCJjb25zb2xlIiwibG9nIiwic2V0VGltZW91dCIsIm1vZGFsQ29uZmlybSIsImNvbmZpcm1ZZXMiLCJjbG9zZSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImxhc3RDaGlsZCIsInJlc2V0IiwiYnVpbGRCb2FyZCIsImdldFJhbmRvbVBsYWNlbWVudCIsImNvbmZpcm1ObyIsIkdhbWVib2FyZCIsIlBsYXllciIsImFpTmFtZSIsImJ1aWxkUGxheWVyQm9hcmQiLCJidWlsZEFpQm9hcmQiLCJwbGFjZVNoaXBzUGxheWVyIiwicGxhY2VTaGlwc0FpIiwicGxheWVycyIsImFjdGl2ZVBsYXllciIsInN3aXRjaFBsYXllclR1cm4iLCJpc1dpbm5lciIsImFsbFNoaXBzU3VuayIsImF0dGFja1NxdWFyZSIsImFpQXR0YWNrIiwiYXR0YWNrUmFuZG9tU3F1YXJlIiwiYWxyZWFkeUF0dGFja2VkIiwiZ3JpZFNpemUiLCJTaGlwIiwibWlzc2VkU2hvdHMiLCJzdW5rZW5TaGlwcyIsImNvbnN0cnVjdG9yIiwidmFsdWUiLCJmbGVldCIsImZsZWV0U2l6ZSIsImNyZWF0ZVNoaXBzIiwicHJvcHMiLCJzaGlwc0FycmF5IiwiaXNWZXJ0aWNhbCIsInJvdW5kIiwidmVzc2VsIiwicHVzaCIsInBsYWNlU2hpcHMiLCJzaGlwIiwidmVydGljYWwiLCJzaGlwcyIsImlzQm9hcmRFbXB0eSIsInJhbmRYIiwiZmxvb3IiLCJyYW5kWSIsInBsYWNlbWVudEFsbG93ZWQiLCJyZWNlaXZlQXR0YWNrIiwiY29vcmRpbmF0ZSIsImlzU3VuayIsImNvdW50T2NjdXBpZWRTcXVhcmVzIiwiYXZhaWxhYmxlU3F1YXJlcyIsImVuZW15Qm9hcmQiLCJoYXNCZWVuQXR0YWNrZWQiLCJyYW5kUm93IiwicmFuZENvbHVtbiIsImhpdHMiLCJwb3NpdGlvbiIsImluY2x1ZGVzIiwiY29weXJpZ2h0U3BhbiIsIkRhdGUiLCJnZXRGdWxsWWVhciIsIm1vZGFsIiwibWFpbkdhbWUiLCJ3aW5kb3ciLCJzaG93TW9kYWwiLCJzdGFydEJ0biIsImFsaWFzIiwia2V5Q29kZSIsImNsaWNrIiwibmV3R2FtZSIsImluZm9JY29uIiwiaW5mb01vZGFsIiwidG9nZ2xlIl0sInNvdXJjZVJvb3QiOiIifQ==