const STATE = {
  FLOOR: '.',
  EMPTY: 'L',
  TAKEN: '#',
};

export default class Day11 {

  static part1(arr) {

    // arr = [
    //   'L.LL.LL.LL',
    //   'LLLLLLL.LL',
    //   'L.L.L..L..',
    //   'LLLL.LL.LL',
    //   'L.LL.LL.LL',
    //   'L.LLLLL.LL',
    //   '..L.L.....',
    //   'LLLLLLLLLL',
    //   'L.LLLLLL.L',
    //   'L.LLLLL.LL',
    // ];

    console.group('part1');
    const mapStates = [this.createSeatMap(arr)];

    for (let state = 0; state < mapStates.length; state += 1) {
      const currentState = mapStates[state];
      const newState = [];
      let changed = false;
      for (let row = 0; row < currentState.length; row += 1) {
        newState[row] = [];
        for (let col = 0; col < currentState[row].length; col += 1) {
          const currentSeat = currentState[row][col];
          const adjacentTaken = this.countAdjacentTaken({row, col}, currentState);
          let newSeat;
          if (currentSeat === STATE.EMPTY && adjacentTaken === 0) {
            changed = true;
            newSeat = STATE.TAKEN;
          } else if (currentSeat === STATE.TAKEN && adjacentTaken >= 4) {
            changed = true;
            newSeat = STATE.EMPTY;
          } else {
            newSeat = currentSeat;
          }
          newState[row][col] = newSeat;
        }
      }

      if (changed && state < 1000) {
        mapStates.push(newState);
      }
    }

    console.groupEnd('part1');
    return this.countTaken(mapStates.pop());
  }

  static part2(arr) {
    console.group('part2');
    const mapStates = [this.createSeatMap(arr)];

    for (let state = 0; state < mapStates.length; state += 1) {
      const currentState = mapStates[state];
      const newState = [];
      let changed = false;
      for (let row = 0; row < currentState.length; row += 1) {
        newState[row] = [];
        for (let col = 0; col < currentState[row].length; col += 1) {
          const currentSeat = currentState[row][col];
          const viewTaken = this.countViewTaken({row, col}, currentState);
          let newSeat;
          if (currentSeat === STATE.EMPTY && viewTaken === 0) {
            changed = true;
            newSeat = STATE.TAKEN;
          } else if (currentSeat === STATE.TAKEN && viewTaken >= 5) {
            changed = true;
            newSeat = STATE.EMPTY;
          } else {
            newSeat = currentSeat;
          }
          newState[row][col] = newSeat;
        }
      }

      if (changed) {
        mapStates.push(newState);
      }
    }
    console.groupEnd('part2');
    return this.countTaken(mapStates.pop());;
  }

  static createSeatMap(arr) {
    const map = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].trim() === '') {
        continue;
      }
      map.push(arr[i].split(''));
    }

    return map;
  }

  static countAdjacentTaken(pos, arr) {
    let count = 0;
    for (let row = -1; row < 2; row += 1) {
      for (let col = -1; col < 2; col += 1) {
        if (!(row === 0 && col === 0) && arr[pos.row+row] && arr[pos.row+row][pos.col+col] === STATE.TAKEN) {
          count += 1;
        }
      }
    }
    return count;
  }

  static countViewTaken(pos, arr) {
    let count = 0;
    for (let row = -1; row < 2; row += 1) {
      for (let col = -1; col < 2; col += 1) {
        if (!(row === 0 && col === 0) && this.seatInLine(pos, row, col, arr) === STATE.TAKEN) {
          count += 1;
        }
      }
    }
    return count;
  }

  static seatInLine(pos, rowDelta, colDelta, arr) {
    let row = rowDelta;
    let col = colDelta;
    while (true) {
      if (arr[pos.row+row] && arr[pos.row+row][pos.col+col]) {
        let currentSeat = arr[pos.row+row][pos.col+col];
        if (currentSeat !== STATE.FLOOR) {
          return currentSeat;
        }
      } else {
        return STATE.EMPTY;
      }
      row += rowDelta;
      col += colDelta;
    }
  }

  static countTaken(seats) {
    let count = 0;
    for (let row = 0; row < seats.length; row += 1) {
      for (let col = 0; col < seats[row].length; col += 1) {
        if (seats[row][col] === STATE.TAKEN) {
          count += 1;
        }
      }
    }
    return count;
  }
}
