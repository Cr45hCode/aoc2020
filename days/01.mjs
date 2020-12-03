export default class Day1 {

  static part1(arr) {
    let val1;
    let val2;

    for (let i = 0; i < arr.length; i += 1) {
      val1 = parseInt(arr[i], 10);
      for (let j = i; j < arr.length; j += 1) {
        val2 = parseInt(arr[j], 10);

        if (val1 + val2 === 2020) {
          console.log({val1, val2});
          return val1 * val2;
        }
      }
    }
    return -1;
  }

  static part2(arr) {
    let val1;
    let val2;
    let val3;

    for (let i = 0; i < arr.length; i += 1) {
      val1 = parseInt(arr[i], 10);
      for (let j = i; j < arr.length; j += 1) {
        val2 = parseInt(arr[j], 10);

        for (let k = j; k < arr.length; k += 1) {
          val3 = parseInt(arr[k], 10);

          if (val1 + val2 + val3 === 2020) {
            console.log({val1, val2, val3});
            return val1 * val2 * val3;
          }
        }
      }
    }
    return -1;
  }
}
