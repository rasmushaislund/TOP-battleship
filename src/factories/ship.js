// START //

export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = [];
  }

  hit(position) {
    if (this.hits.includes(position) || position < 0 || position >= this.length)
      return;
    this.hits.push(position);
  }

  isSunk() {
    if (this.hits.length === this.length) return true;
    return false;
  }
}

const ship = new Ship(3);
console.log(ship);

ship.hit(0);
ship.hit(1);
ship.hit(2);

console.log(ship.isSunk());

// END //
