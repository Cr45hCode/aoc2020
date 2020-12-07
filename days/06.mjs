export default class Day6 {

  static part1(arr) {
    console.group('part1');
    let groupData = {};
    let count = 0;
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].trim() === '') {
        count += Object.keys(groupData).length;
        groupData = {};
        continue;
      }


      let questions = arr[i].split('');
      for (let question of questions) {
        groupData[question] = true;
      }
    }
    console.groupEnd('part1');
    return count;
  }

  static part2(arr) {
    console.group('part2');
    let groupData = {};
    let count = 0;
    let groupSize = 0;
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].trim() === '') {
        for (let q of Object.values(groupData)) {
          count += q === groupSize ? 1 : 0;
        }
        groupData = {};
        groupSize = 0;
        continue;
      }

      groupSize += 1;
      let questions = arr[i].split('');
      for (let question of questions) {
        groupData[question] = groupData[question] === undefined ? 1 : groupData[question] + 1;
      }
    }
    console.groupEnd('part2');
    return count;
  }
}
