// START //

import { Gameboard } from '../gameboard';
import { Ship } from '../ship';

describe('Testing Gameboard class interfaces', () => {
  let gameboard = Gameboard;
  let ship = Ship;

  beforeEach(() => {
    gameboard = new Gameboard();
    gameboard.buildBoard();
    ship = new Ship('Patrol Boat', 2, true);
  });

  test('Gameboard grid is created as 10 x 10 2D-array', () => {
    expect(gameboard.board.length).toEqual(10);
    expect(gameboard.board[0].length).toEqual(10);
  });

  test('Placement of one ship in 2D-array', () => {
    gameboard.placeShips(ship, 5, 5, true);
    expect(gameboard.board[5][5]).toContain(0, ship);
    expect(gameboard.board[6][5]).toContain(1, ship);
    expect(gameboard.board[7][5]).not.toContain(2, ship);
  });

  test('Ships are created in Gameboard class', () => {
    const ships = gameboard.createShips();
    expect(ships.length).toEqual(5);
  });

  test('Five ships are placed randomly on the gameboard', () => {
    gameboard.getRandomPlacement();
    const countOccupied = gameboard.countOccupiedSquares();
    expect(countOccupied).toEqual(17);
  });

  test('Ships cannot overlap', () => {
    gameboard.placeShips(ship, 5, 5, true);
    expect(
      gameboard.placementAllowed(new Ship('Submarine', 3, false), 6, 5, false),
    ).toBe(false);
  });

  test('Ship can be hit if receiving an attack on an occupied square', () => {
    gameboard.placeShips(ship, 5, 5, true);
    expect(gameboard.receiveAttack(5, 5)).toBe(true);
    expect(ship.hits[0]).toEqual(0);
    // But ship is not sunken after only one hit
    expect(ship.isSunk()).toBe(false);
  });

  test('Ship will sink when having received enough hits', () => {
    gameboard.placeShips(ship, 5, 5, true);
    gameboard.receiveAttack(5, 5);
    gameboard.receiveAttack(6, 5);
    expect(ship.hits.length).toEqual(2);
    expect(ship.isSunk()).toBe(true);
  });

  test('Gameboard class can declare all ships sunken', () => {
    gameboard.placeShips(ship, 5, 5, true);
    gameboard.receiveAttack(5, 5);
    gameboard.receiveAttack(6, 5);
    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test('A missed shot will have its coordinates recorded in array', () => {
    gameboard.placeShips(ship, 5, 5, true);
    gameboard.receiveAttack(1, 8);
    gameboard.receiveAttack(8, 6);
    expect(gameboard.missedShots[0]).toContain(1, 8);
    expect(gameboard.missedShots[1]).toContain(8, 6);
    expect(gameboard.missedShots.length).toEqual(2);
  });

  test.only('Every attack - whether a hit or miss - will be recorded', () => {
    gameboard.receiveAttack(1, 8);
    expect(gameboard.attacks.length).toEqual(1);
  });
});
