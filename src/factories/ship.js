// START //

export class Ship {
  type;
  length;
  hits;

  constructor(type, length) {
    this.type = type;
    this.length = length;
    this.hits = [];
  }

  hit(position) {
    if (this.hits.includes(position) || position < 0 || position > 99) return;
    this.hits.push(position);
  }

  isSunk() {
    if (this.hits.length === this.length) return true;
    return false;
  }
}

// const ship = new Ship('Submarine', 3, true);
// console.log(ship);

// END //
