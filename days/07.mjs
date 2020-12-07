export default class Day7 {

  static part1(arr) {
    console.group('part1');
    let bagRules = this.processBagRules(arr);

    let pBags = {};
    let listParents = (color) => {
      if (bagRules[color].parents) {
        for (const parent of Object.keys(bagRules[color].parents)) {
          pBags[parent] = true;
          listParents(parent);
        }
      }
    }

    listParents('shiny gold')
    console.groupEnd('part1');
    return Object.keys(pBags).length;
  }

  static part2(arr) {
    console.group('part2');
    let bagRules = this.processBagRules(arr);

    let countChildren = (color) => {
      let count = 0;
      if (bagRules[color].children) {
        for (const [childColor, childCount] of Object.entries(bagRules[color].children)) {
          count += childCount * (1 + countChildren(childColor));
        }
      }

      return count;
    }

    console.groupEnd('part2');
    return countChildren('shiny gold');
  }

  static processBagRules(arr) {
    let bagRules = {};

    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].trim() === '') {
        continue;
      }

      let line;
      let color;
      let children;
      let noChildren;
      [line, color, children, noChildren] = arr[i].match(
        /^(\w+\s\w+)\s+bags contain\s((?:\d+\s\w+\s\w+\sbags?[,\s]*)*)(no\sother\sbags)?\.$/
      );

      bagRules[color] = bagRules[color] || {};
      if (!noChildren) {
        bagRules[color].children = {};
        for (const child of children.split(', ')) {
          let childLine;
          let count;
          let childColor;
          [childLine, count, childColor] = child.match(/(\d+)\s(\w+\s\w+)\sbags?/);

          bagRules[color].children[childColor] = count;

          bagRules[childColor] = bagRules[childColor] || {};
          bagRules[childColor].parents = bagRules[childColor].parents || {};
          bagRules[childColor].parents[color] = count;
        }
      }
    }

    return bagRules;
  }
}
