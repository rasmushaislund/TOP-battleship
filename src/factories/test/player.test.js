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

  test('Check that same coordinate cannot be attacked twice', () => {
    player.attacks.push([1, 8]);
    player.attackSquare(1, 8);
    expect(player.hasBeenAttacked(1, 8)).toBe(true);
    expect(player.hasBeenAttacked(1, 9)).toBe(false);
  });

  test.only('Player can launch attacks if the coordinate has not previously been attacked', () => {
    player.attacks.push([1, 8]);
    player.attackSquare(1, 0);
    expect(player.attacks[1][0]).toEqual(1);
    expect(player.attacks[1][1]).toEqual(0);
  });
});
