export default class Day14 {

  static part1(arr) {
    console.group('part1');

    arr = [
      'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
      'mem[8] = 11',
      'mem[7] = 101',
      'mem[8] = 0',
    ];

    const mem = this.executeProgram(arr);
    console.log(mem);

    console.groupEnd('part1');
    return -1;
  }

  static part2(arr) {
    console.group('part2');
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].trim() === '') {
        continue;
      }
    }
    console.groupEnd('part2');
    return -1;
  }

  // note: cannot use js bit operations, as they are 32bit
  //       and we are dealing with 36bit operations
  static executeProgram(code) {
    const mem = {};
    let rawMask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    let mask = {};

    for (let i = 0; i < code.length; i += 1) {
      if (code[i].trim() === '') {
        continue;
      }

      let key;
      let value;
      [key, value] = code[i].split(' = ');

      if (key === 'mask') {
        rawMask = value;
        for (let c = 0; c < rawMask.length; c += 1) {
          const char = rawMask[c];
          if (char !== 'X') {
            mask[c] = char;
          }
        }
      } else {
        const address = parseInt(key.match(/\[(\d+)\]/)[1], 10);
        value = parseInt(value, 10).toString(2);

        let arrValue = [...value];
        // console.log({i, arrValue, address, mask});

        let finalValue = '';
        for (let b = 0; b < 36; b += 1) {
          finalValue += mask[b] ? mask[b].char : (arrValue[b] || '0');
        }
        mem[address] = finalValue;

        console.log({i, arrValue, address, mask, finalValue});
      }
    }

    return mem;
  }
}
