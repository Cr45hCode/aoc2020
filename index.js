'use strict';

import Reader from './reader.mjs';
import Day1 from './days/01.mjs';
import Day2 from './days/02.mjs';
import Day3 from './days/03.mjs';

const days = {
  1: Day1,
  2: Day2,
  3: Day3,
};

const DAY = 3;

(async () => {
  try {
    const arr = await Reader.getInputArrayForDay(DAY);
    console.log('Input: ', arr);
    console.log(days[DAY].part1(arr));
    console.log(days[DAY].part2(arr));
  } catch (e) {
    console.log(e);
  }
})();
