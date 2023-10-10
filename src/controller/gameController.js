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
    } else {
      activePlayer = players[0];
    }
  };

  const getActivePlayer = () => activePlayer;

  // Play a round of the game
  let winner = players[0].name;
  const playRound = (row, column) => {
    // Check for a winner
    const checkWinner = () => {
      if (playerBoard.allShipsSunk) {
        winner = players[1].name;
      } else if (aiBoard.allShipsSunk) {
        winner = players[0].name;
      }
    };

    if (getActivePlayer() === players[0]) {
      player.attackSquare(row, column, aiBoard);
      checkWinner();
    }

    switchPlayerTurn();

    // Let AI attack player board with "thinking" delay
    if (getActivePlayer() === players[1]) {
      const delayAttack = Math.floor(Math.random() * 5000);
      console.log(delayAttack);
      const aiAttack = ai.attackRandomSquare(playerBoard);
      setTimeout(aiAttack, delayAttack);
      checkWinner();
    }

    switchPlayerTurn();

    console.log(playerBoard, aiBoard, player, ai);
  };

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
