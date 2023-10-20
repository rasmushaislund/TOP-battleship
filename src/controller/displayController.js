// START //

import { Game } from './gameController';
import { shipProperties } from '../data/shipProperties';

export function Display(playerName) {
  const player = playerName;
  const ai = 'Pirate AI';
  const game = Game(player, ai);

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
    const getPlayerCell = document.querySelector(
      `[data-index-number='${aiAttackRow}-${aiAttackColumn}']`,
    );

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

      gameBoards.forEach((board) => {
        board.classList.add('disabled-board');
      });

      cells.forEach((cell) => {
        cell.classList.add('disabled-cell');
      });
    }
  });
}

// END //
