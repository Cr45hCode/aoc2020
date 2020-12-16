export default class Day15 {

  static part1(arr) {
    console.group('part1');

    // arr = ['0,3,6'];
    // arr = ['1,3,2'];

    const startingNumbers = arr[0].split(',');
    const result = this.playTillTurn(startingNumbers, 2020);
    // const result = this.playTillTurn(startingNumbers, 10);

    console.groupEnd('part1');
    return result;
  }

  static part2(arr) {
    console.group('part2');

    const startingNumbers = arr[0].split(',');
    const result = this.playTillTurn(startingNumbers, 30000000);

    console.groupEnd('part2');
    return result;
  }

  static playTillTurn(startingNumbers, lastTurn) {
    // const memStack = [...startingNumbers];
    const memory = {};

    for (let i = 0; i < startingNumbers.length; i += 1) {
      memory[startingNumbers[i]] = [i+1];
    }

    let lastNumber = parseInt(startingNumbers[startingNumbers.length-1], 10);
    console.log({lastNumber, memory});
    for (let round = startingNumbers.length; round < lastTurn; round += 1) {
      const lastNumberTurns = memory[lastNumber];
      if (lastNumberTurns.length === 1) {
        lastNumber = 0;
      } else {
        lastNumber = lastNumberTurns[1] - lastNumberTurns[0];
      }

      this.updateNumberTurns(lastNumber, memory, round+1);

      // console.log({lastNumber, memory});
    }

    return lastNumber;
  }

  static updateNumberTurns(number, memory, turn) {
    if (!memory[number]) {
      memory[number] = [];
    }
    const numberTurns = memory[number];
    numberTurns.push(turn);
    if (numberTurns.length > 2) {
      numberTurns.shift();
    }
  }
}
