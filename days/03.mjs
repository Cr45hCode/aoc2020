export default class Day3 {
  static part1(arr) {
    const slope = {
      right: 3,
      down: 1,
    };

    return this.checkSlope(arr, slope);
  }

  static part2(arr) {
    let slopes = [
      this.checkSlope(arr, {right: 1, down: 1}),
      this.checkSlope(arr, {right: 3, down: 1}),
      this.checkSlope(arr, {right: 5, down: 1}),
      this.checkSlope(arr, {right: 7, down: 1}),
      this.checkSlope(arr, {right: 1, down: 2}),
    ];

    console.log(slopes);

    return slopes.reduce((acc, val) => acc * val);
  }

  static checkSlope(arr, slope) {
    const TREE = '#';
    let treeCount = 0;
    let posX = 0;

    for (let i = 0; i < arr.length; i += slope.down) {
      if (arr[i].trim() === '') {
        continue;
      }

      let char = arr[i].charAt(posX);
      if (char === TREE) {
        // console.log({char, i, posX});
        treeCount += 1;
      }

      posX += slope.right;
      if (posX > 30) {
        posX -= 31;
      }
    }
    return treeCount;
  }
}
