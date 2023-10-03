// START //

import { Gameboard } from '../factories/gameboard';
import { Player } from '../factories/player';
import { Display } from './displayController';

export function Game() {
  const playerBoard = new Gameboard();
  const aiBoard = new Gameboard();

  const buildPlayerBoard = playerBoard.buildBoard();
  const buildAiBoard = aiBoard.buildBoard();

  const placeShipsPlayer = playerBoard.getRandomPlacement();
  const placeShipsAi = aiBoard.getRandomPlacement();

  console.log(playerBoard.board, aiBoard.board);

  return {
    gridSize: playerBoard.gridSize,
    player2dArray: playerBoard.board,
    ai2dArray: aiBoard.board,
  };
}

// END //
