// START //

import { Ship } from '../ship';

describe('Ship interface testing', () => {
  let ship = Ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('create a ship', () => {
    expect(ship).toEqual({
      hits: [],
      length: 3,
    });
  });

  test('ship will accumulate hits', () => {
    ship.hit(0);
    ship.hit(1);
    expect(ship.hits.length).toEqual(2);
  });

  test('can ship sink?', () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toEqual(true);
  });
});
