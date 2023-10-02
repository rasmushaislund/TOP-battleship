// START //

import { Game } from './gameController';

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
