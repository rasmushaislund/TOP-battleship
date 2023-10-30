// START //

import { Game } from './gameController';
import { shipProperties } from '../data/shipProperties';

export function Display(playerName) {
  const player = playerName;
  const ai = 'Pirate AI';
  const game = Game(player, ai);

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
    const selectCell = document.querySelector(
      `[data-index-number='${row}-${column}']`,
    );
    for (let i = 0; i < shipProperties.length; i++) {
      if (type === shipProperties[i].type) {
        selectCell.style.backgroundColor = `${shipProperties[i].color}`;
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

  const boardAccessibility = (status) => {
    // Disable board for further input when winner is found
    const gameBoards = document.querySelectorAll('.game-board');
    const cells = document.querySelectorAll('.cell');

    gameBoards.forEach((board) => {
      if (status === 'disable') {
        board.classList.add('disabled-board');
      } else if (status === 'enable') {
        board.classList.remove('disabled-board');
      }
    });

    cells.forEach((cell) => {
      if (status === 'disable') {
        cell.classList.add('disabled-cell');
      } else if (status === 'enable') {
        cell.classList.remove('disabled-cell');
      }
    });
  };

  // Event listener for player attack on enemy
  const opponentBoard = document.querySelector('.game-board-opponent');

  opponentBoard.addEventListener('mouseup', (e) => {
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
      const getPlayerCell = document.querySelector(
        `[data-index-number='${aiAttackRow}-${aiAttackColumn}']`,
      );

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

      // Makes random delay in ai decision and
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
