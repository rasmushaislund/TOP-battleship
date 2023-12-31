// START //

export class Ship {
  type;
  length;
  vertical = false;
  hits;

  constructor(type, length, vertical) {
    this.type = type;
    this.length = length;
    this.vertical = vertical;
    this.hits = [];
  }

  reset() {
    this.hits = [];
  }

  hit(position) {
    if (
      this.hits.includes(position) ||
      position < 0 ||
      position > this.length - 1
    )
      return;
    this.hits.push(position);
  }

  isSunk() {
    if (this.hits.length === this.length) return true;
    return false;
  }
}

// END //
