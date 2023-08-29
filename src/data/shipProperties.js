// START //

export const shipProperties = [
  {
    type: 'Carrier',
    length: 5,
    vertical: [true, false][Math.round(Math.random())],
  },
  {
    type: 'Battleship',
    length: 4,
    vertical: [true, false][Math.round(Math.random())],
  },
  {
    type: 'Destroyer',
    length: 3,
    vertical: [true, false][Math.round(Math.random())],
  },
  {
    type: 'Submarine',
    length: 3,
    vertical: [true, false][Math.round(Math.random())],
  },
  {
    type: 'Patrol Boat',
    length: 2,
    vertical: [true, false][Math.round(Math.random())],
  },
];
