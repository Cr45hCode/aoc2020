export default class Day5 {

  static part1(arr) {
    let highestSeatId = 0;
    console.group('part1');
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].trim() === '') {
        continue;
      }

      let passport;
      let passRows;
      let passCols;
      [passport, passRows, passCols] = arr[i].match(/([FB]{7})([LR]{3})/);

      const row = this.processPassportInformation(passRows);
      const col = this.processPassportInformation(passCols);
      const seatId = row * 8 + col;

      if (seatId > highestSeatId) {
        console.log(`found higher ID: ${seatId} > ${highestSeatId}`);
        highestSeatId = seatId;
      }
    }
    console.groupEnd('part1');
    return highestSeatId;
  }

  static part2(arr) {
    let seatMap = this.createSeatMap();
    console.group('part2');
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].trim() === '') {
        continue;
      }

      let passport;
      let passRows;
      let passCols;
      [passport, passRows, passCols] = arr[i].match(/([FB]{7})([LR]{3})/);

      const row = this.processPassportInformation(passRows);
      const col = this.processPassportInformation(passCols);

      const seatId = row * 8 + col;

      seatMap[row][col] = seatId;
    }
    // console.log(seatMap);

    let ignore = true;
    for (let checkRow = 0; checkRow < seatMap.length; checkRow += 1) {
      for (let checkCol = 0; checkCol < 8; checkCol += 1) {
        if (seatMap[checkRow][checkCol] !== false) {
          ignore = false;
        } else if (!ignore && seatMap[checkRow][checkCol] === false) {
          return {row: checkRow, col: checkCol, id: checkRow * 8 + checkCol}
        }
      }
    }
    console.groupEnd('part2');
    return -1;
  }

  static createNumberedArray(size) {
    const arr = [];
    for (let i = 0; i < size; i += 1) {
      arr.push(i);
    }

    return arr;
  }

  static createSeatMap() {
    const map = [];
    for (let row = 0; row < 128; row += 1) {
      map[row] = [];
      for (let col = 0; col < 8; col += 1) {
        map[row].push(false);
      }
    }

    return map;
  }

  static processPassportInformation (passCode) {
    let size = 8;
    let up = 'R';
    let low = 'L';
    if (passCode.length > 3) {
      up = 'B';
      low = 'F';
      size = 128;
    }

    let seats = this.createNumberedArray(size);

    for (let part of passCode) {
      let half = Math.ceil(seats.length / 2);
      if (part === low) {
        seats = seats.splice(0, half);
      } else {
        seats = seats.splice(half, seats.length);
      }
    }

    if (seats.length > 1) {
      console.error('Process faild. PassCode/Seats: ', passCode, seats);
      return -1;
    }
    return seats[0];
  }
}
