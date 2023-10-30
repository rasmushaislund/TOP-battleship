// START //

import { Gameboard } from '../factories/gameboard';
import { Player } from '../factories/player';

export function Game(playerName, aiName) {
  // Initialize gameboard and place ships
  const playerBoard = new Gameboard();
  const aiBoard = new Gameboard();
  const getPlayerBoard = () => playerBoard;
  const getAiBoard = () => aiBoard;

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
    getWinner,
  };
}

// END //
