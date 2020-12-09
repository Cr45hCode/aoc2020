export default class Day9 {

  static part1(arr) {
    console.group('part1');



    console.groupEnd('part1');
    return this.findFirstInvalid(arr);
  }

  static part2(arr) {
    console.group('part2');

    const firstInvalid = this.findFirstInvalid(arr);

    console.groupEnd('part2');
    return this.findWeaknessForValue(firstInvalid, arr);
  }

  static findFirstInvalid(arr, preambleLength = 25) {
    const preamble = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].trim() === '') {
        continue;
      }

      let currentValue = parseInt(arr[i], 10);
      if (i > preambleLength) {
        if (!this.valueIsValid(currentValue, preamble)) {
          return currentValue;
        }
        preamble.shift();
      }
      preamble.push(currentValue);
    }

    return false;
  }

  static valueIsValid(value, preamble) {
    for (const a of preamble) {
      if (preamble.find(b => a + b === value)) {
        return true;
      }
    }
    return false;
  }

  static findWeaknessForValue(value, arr) {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].trim() === '') {
        continue;
      }

      let sum = 0;
      let values = [];
      for (let j = i; j < arr.length && sum < value; j += 1) {
        if (arr[i].trim() === '') {
          continue;
        }
        const currentValue = parseInt(arr[j], 10);
        values.push(currentValue);
        sum += currentValue;
        if (sum === value) {
          return Math.min(...values) + Math.max(...values);
        }
      }
    }

    return false;
  }
}
