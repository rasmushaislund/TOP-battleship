// START //

import { Game } from './gameController';
import { shipProperties } from '../data/shipProperties';

export function Display(playerName) {
  const game = Game();
  const player = playerName;
  const ai = 'Enemy';

  // Setting player and ai names on UI
  const setPlayerName = (player, ai) => {
    const playerId = document.querySelector('#your-board');
    const aiId = document.querySelector('#opponent-board');
    playerId.textContent = player;
    aiId.textContent = ai;
  };

  // Color cells occupied buy ships on the player board
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

  setPlayerName(player, ai);
  buildGrids();
}

// END //
