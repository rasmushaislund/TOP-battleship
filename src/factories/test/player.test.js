// START //

import { Player } from '../player';
import { Gameboard } from '../gameboard';
import { Ship } from '../ship';

describe('Testing Player class interfaces', () => {
  let player = Player;
  let gameboard = Gameboard;
  let ship = Ship;

  beforeEach(() => {
    player = new Player('Rasmus');
    gameboard = new Gameboard();
    gameboard.buildBoard();
    ship = new Ship('Patrol Boat', 2, true);
  });

  test('Is name of playerOne Rasmus?', () => {
    expect(player.playerOneName).toEqual('Rasmus');
  });

  test('PlayerTwo name is computer', () => {
    expect(player.playerTwoName).toEqual('computer');
  });

  test('activePlayer can be changed to playerTwo', () => {
    player.activePlayer = player.playerTwoName;
    expect(player.activePlayer).toEqual('computer');
  });
});
