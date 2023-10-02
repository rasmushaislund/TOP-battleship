// START //

import { Gameboard } from '../factories/gameboard';
import { Player } from '../factories/player';
import { Display } from './displayController';

export function Game() {
  const playerBoard = new Gameboard();
  const aiBoard = new Gameboard();

  const buildPlayerBoard = playerBoard.buildBoard();
  const buildAiBoard = aiBoard.buildBoard();

  console.log(playerBoard, aiBoard);

  return {
    gridSize: playerBoard.gridSize,
    player2dArray: playerBoard.board,
    ai2dArray: aiBoard.board,
  };
}

// END //
