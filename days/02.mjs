export default class Day2 {

  static part1(arr) {
    let validPasswords = 0;
    let invalidPasswords = 0;

    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].trim() === '') {
        continue;
      }

      let policy;
      let password;
      [policy, password] = arr[i].split(': ');

      let min;
      let max;
      let char;
      [min, max, char] = policy.split(/[-\s]/);

      const policyExp = new RegExp(char, 'g');
      const count = (password.match(policyExp) || []).length;

      let correct;
      if (count >= min && count <= max) {
        correct = true;
        validPasswords += 1;
      } else {
        correct = false;
        invalidPasswords += 1;
      }
      // console.log({policy, password, count, correct});
    }

    return validPasswords;
  }

  static part2(arr) {
    let validPasswords = 0;
    let invalidPasswords = 0;

    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].trim() === '') {
        continue;
      }

      let policy;
      let password;
      [policy, password] = arr[i].split(': ');

      let pos1;
      let pos2;
      let char;
      [pos1, pos2, char] = policy.split(/[-\s]/);
      let charPos1 = password.charAt(parseInt(pos1, 10) - 1);
      let charPos2 = password.charAt(parseInt(pos2, 10) - 1);

      let correct;
      if ((charPos1 === char) ^ (charPos2 === char)) {
        correct = true;
        validPasswords += 1;
      } else {
        correct = false;
        invalidPasswords += 1;
      }
      // console.log({policy, password, chars: {charPos1, charPos2}, correct});
    }

    return validPasswords;
  }
}
