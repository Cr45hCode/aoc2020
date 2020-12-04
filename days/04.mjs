export default class Day4 {

  static part1(arr) {
    console.group('part1');
    const requiredFields = [
      'byr',
      'iyr',
      'eyr',
      'hgt',
      'hcl',
      'ecl',
      'pid',
      // 'cid',
    ];
    let batchBuffer = '';
    let validBatches = 0;

    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].trim() === '') {
        console.info('processing batch...', batchBuffer);

        let batchEntries = batchBuffer.split(/\s+/);
        const currentBatch = {};
        for (let entry of batchEntries) {
          const pair = entry.split(':');
          console.info({pair});
          currentBatch[pair[0]] = pair[1];
        }

        let valid = 1;
        for (let field of requiredFields) {
          if (!currentBatch[field] || currentBatch[field] === '') {
            console.info('missing field', field);
            valid = 0;
          }
        }

        validBatches += valid;
        console.info('found ' + (valid ? '' : 'in') + 'valid batch: ', batchBuffer);

        batchBuffer = '';
      } else {
        batchBuffer += ' ' + arr[i];
        console.info('reading... ', batchBuffer);
      }
    }
    console.groupEnd('part1');
    return validBatches;
  }

  static part2(arr) {
    console.group('part2');
    const requiredFields = {
      byr: (input) => {
        try {
          const val = parseInt(input, 10);
          return (val >= 1920 && val <= 2002);
        } catch (e) {
          return false;
        }
      },
      iyr: (input) => {
        try {
          const val = parseInt(input, 10);
          return (val >= 2010 && val <= 2020);
        } catch (e) {
          return false;
        }
      },
      eyr: (input) => {
        try {
          const val = parseInt(input, 10);
          return (val >= 2020 && val <= 2030);
        } catch (e) {
          return false;
        }
      },
      hgt: (input) => {
        let match = input.match(/^([0-9]{3})cm$/);
        let val = 0;
        if (match && match[1]) {
          val = parseInt(match[1], 10);
          return (val >= 150 && val <= 193);
        } else {
          match = input.match(/^([0-9]{2})in$/);
          if (match && match[1]) {
            val = parseInt(match[1], 10);
            return (val >= 59 && val <= 76);
          }
        }
        return false;
      },
      hcl: (input) => {
        return input.match(/#[0-9a-f]{6}/);
      },
      ecl: (input) => {
        return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(input);
      },
      pid: (input) => {
        return input.match(/^[0-9]{9}$/);
      },
      // cid: '',
    };
    let batchBuffer = '';
    let validBatches = 0;

    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].trim() === '') {
        console.info('processing batch...', batchBuffer);

        let batchEntries = batchBuffer.split(/\s+/);
        const currentBatch = {};
        for (let entry of batchEntries) {
          const pair = entry.split(':');
          console.info({pair});
          currentBatch[pair[0]] = pair[1];
        }

        let valid = 1;
        for (let field in requiredFields) {
          let batchValue = currentBatch[field];
          let validator = requiredFields[field];
          if (!batchValue || batchValue === '') {
            console.info('missing field', field);
            valid = 0;
          } else if (!validator(batchValue)) {
            console.info(`[x] invalid value for [${field}]:`, batchValue);
            valid = 0;
          } else {
            console.info(`[✓] valid value for [${field}]:`, batchValue);
          }
        }

        validBatches += valid;
        console.info('found ' + (valid ? '' : 'in') + 'valid batch: ', batchBuffer);

        batchBuffer = '';
      } else {
        batchBuffer += ' ' + arr[i];
        console.info('reading... ', batchBuffer);
      }
    }
    console.groupEnd('part2');
    return validBatches;
  }
}
