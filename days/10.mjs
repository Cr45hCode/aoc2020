export default class Day10 {

  static part1(arr) {
    console.group('part1');

    let adapters = arr.filter(item => item.trim() !== '')
                      .map(item => parseInt(item, 10))
                      .sort((a, b) => a - b);
    // adapters = [0, ...adapters, adapters[adapters.length] +3];

    console.log(adapters);

    let diff1 = 1;
    let diff3 = 1;
    for (let i = 0; i < adapters.length -1; i += 1) {
      const diff = adapters[i+1] - adapters[i];
      if (diff === 1) {
        diff1 += 1;
      } else if (diff === 3) {
        diff3 += 1;
      } else {
        console.log({diff, a:adapters[i+1], b:adapters[i]});
      }
    }

    console.log({diff1, diff3});

    console.groupEnd('part1');
    return diff1 * diff3;
  }

  static part2(arr) {
    console.group('part2');

    let adapters = arr.filter(item => item.trim() !== '')
                      .map(item => parseInt(item, 10))
                      .sort((a, b) => a - b);
    adapters = [0, ...adapters, adapters[adapters.length - 1] + 3];

    const contiguous = [];
    for (let i = 0; i < adapters.length - 1; i += 1) {
      if (adapters[i + 1] - adapters[i] === 1) {
        const start = i;
        while (adapters[i + 1] - adapters[i] === 1) {
          i++;
        }
        contiguous.push(i - start + 1);
      }
    }

    const variations = contiguous.map(
      (item) => Array.from({ length: item - 1 })
                  .reduce((acc, _, i) => acc + i, 1)
    );

    console.groupEnd('part2');
    return variations.reduce((a, b) => a * b, 1);
  }
}
