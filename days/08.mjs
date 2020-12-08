const OP = {
  NOP: 'nop',
  ACC: 'acc',
  JMP: 'jmp',
};

export default class Day8 {

  static part1(arr) {
    console.group('part1');

    // arr = [
    //   'nop +0',
    //   'acc +1',
    //   'jmp +4',
    //   'acc +3',
    //   'jmp -3',
    //   'acc -99',
    //   'acc +1',
    //   'jmp -4',
    //   'acc +6',
    // ];

    let acc = this.detectLoop(arr);

    console.groupEnd('part1');
    return acc;
  }

  static part2(arr) {
    console.group('part2');

    console.groupEnd('part2');
    return this.fixLoop(arr);
  }

  static detectLoop(asm, accOnErr = true) {
    let acc = 0;
    const lineLog = {};
    for (let i = 0; i < asm.length; i += 1) {
      if (asm[i].trim() === '') {
        continue;
      }

      if (lineLog[i]) {
        return accOnErr ? acc : false;
      }
      lineLog[i] = true;

      let mnem;
      let val;
      [mnem, val] = asm[i].split(' ');
      val = parseInt(val, 10);

      // console.log('EXEC: ', {i, mnem, val, acc});

      switch (mnem) {
        case OP.ACC:
          acc += val;
          break;
        case OP.JMP:
          i += val - 1;
          break;
        case OP.NOP:
        default:
          break;
      }
    }

    return accOnErr ? false : acc; // no loop detected
  }

  static fixLoop(asm) {
    let revert = '';
    for (let i = 0; i < asm.length; i += 1) {
      if (asm[i].trim() === '') {
        continue;
      }

      let mnem;
      let val;
      [mnem, val] = asm[i].split(' ');
      val = parseInt(val, 10);

      revert = asm[i];
      switch (mnem) {
        case OP.NOP:
          asm[i] = asm[i].replace(OP.NOP, OP.JMP);
          break;
        case OP.JMP:
          asm[i] = asm[i].replace(OP.JMP, OP.NOP);
          break;
        case OP.ACC:
        default:
          continue;
      }

      const acc = this.detectLoop(asm, false);
      if (acc) {
        return acc;
      }
      asm[i] = revert;
    }

    return false; // could not fix
  }
}
