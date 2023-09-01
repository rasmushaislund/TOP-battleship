// START //

import { Ship } from '../ship';

describe('Ship interface testing', () => {
  let ship = Ship;

  beforeEach(() => {
    ship = new Ship('Submarine', 3, true);
  });

  test('create a ship', () => {
    expect(ship).toEqual({
      type: 'Submarine',
      length: 3,
      vertical: true,
      hits: [],
    });
  });

  test('ship will accumulate hits', () => {
    ship.hit(1);
    ship.hit(2);
    expect(ship.hits.length).toEqual(2);
  });

  test('can ship sink?', () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toEqual(true);
  });

  test('ship can only be hit once in the same position', () => {
    ship.hit(0);
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk()).toEqual(false);
  });

  test('values where 0 > position > ship.length will be ignored by the hit function', () => {
    ship.hit(-1);
    ship.hit(0);
    ship.hit(1);
    ship.hit(4);
    expect(ship.hits.length).toEqual(2);
  });
});
