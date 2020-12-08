'use strict';

import Reader from './reader.mjs';
import Day1 from './days/01.mjs';
import Day2 from './days/02.mjs';
import Day3 from './days/03.mjs';
import Day4 from './days/04.mjs';
import Day5 from './days/05.mjs';
import Day6 from './days/06.mjs';
import Day7 from './days/07.mjs';
import Day8 from './days/08.mjs';

const days = {
  1: Day1,
  2: Day2,
  3: Day3,
  4: Day4,
  5: Day5,
  6: Day6,
  7: Day7,
  8: Day8,
};

const DAY = 8;

(async () => {
  try {
    const arr = await Reader.getInputArrayForDay(DAY);
    console.groupCollapsed();
    console.log('Input: ', arr);
    console.groupEnd();
    console.group(`[ Day ${DAY} ]==========================================`)
    console.time(`Part 1 | time`);
    console.log('Part 1 | result: ', days[DAY].part1(arr));
    console.timeEnd(`Part 1 | time`);
    console.time(`Part 2 | time`);
    console.log('Part 2 | result: ', days[DAY].part2(arr));
    console.timeEnd(`Part 2 | time`);
  } catch (e) {
    console.error(e);
  }
})();
