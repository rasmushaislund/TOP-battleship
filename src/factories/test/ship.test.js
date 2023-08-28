// START //

import { Ship } from '../ship';

describe('Ship interface testing', () => {
  let ship = Ship;

  beforeEach(() => {
    ship = new Ship('Submarine', 3);
  });

  test('create a ship', () => {
    expect(ship).toEqual({
      type: 'Submarine',
      length: 3,
      hits: [],
    });
  });

  test('ship will accumulate hits', () => {
    ship.hit(35);
    ship.hit(45);
    expect(ship.hits.length).toEqual(2);
  });

  test('can ship sink?', () => {
    ship.hit(5);
    ship.hit(6);
    ship.hit(7);
    expect(ship.isSunk()).toEqual(true);
  });

  test('ship can only be hit once in the same position', () => {
    ship.hit(20);
    ship.hit(20);
    ship.hit(22);
    expect(ship.isSunk()).toEqual(false);
  });

  test.only('values where 0 > position > 99 will be ignored by the hit function', () => {
    ship.hit(81);
    ship.hit(82);
    ship.hit(-1);
    ship.hit(100);
    expect(ship.hits.length).toEqual(2);
  });
});
