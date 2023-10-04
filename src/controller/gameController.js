// START //

import { Gameboard } from '../factories/gameboard';
import { Player } from '../factories/player';

export function Game(playerName, aiName) {
  // Initialize gameboard and place ships
  const playerBoard = new Gameboard();
  const aiBoard = new Gameboard();

  const buildPlayerBoard = playerBoard.buildBoard();
  const buildAiBoard = aiBoard.buildBoard();

  const placeShipsPlayer = playerBoard.getRandomPlacement();
  const placeShipsAi = aiBoard.getRandomPlacement();

  // Initialize players and handle player's turn
  const players = [
    {
      name: playerName,
    },
    {
      name: aiName,
    },
  ];

  const player = new Player(players[0].name);
  const ai = new Player(players[1].name);

  let activePlayer = players[0];
  const switchPlayerTurn = () => {
    if (activePlayer === players[0]) {
      activePlayer = players[1];
    }
    activePlayer = players[0];
  };

  const getActivePlayer = () => activePlayer;

  // Play a round of the game
  let winner;
  const playRound = (row, column) => {
    if (getActivePlayer() === players[0]) {
      player.attackSquare(row, column);
    }
    ai.attackRandomSquare();

    // Check for a winner
    if (playerBoard.allShipsSunk) {
      winner = players[0].name;
    } else if (aiBoard.allShipsSunk) {
      winner = players[1].name;
    }

    switchPlayerTurn();
  };

  console.log(
    playerBoard.board,
    aiBoard.board,
    getActivePlayer,
    players,
    player,
    ai,
  );

  return {
    playerBoard,
    aiBoard,
    gridSize: playerBoard.gridSize,
    player2dArray: playerBoard.board,
    ai2dArray: aiBoard.board,
    getActivePlayer,
    playRound,
    winner,
  };
}

// END //
