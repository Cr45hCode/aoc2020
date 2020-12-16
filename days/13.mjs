export default class Day0 {

  static part1(arr) {
    console.group('part1');

    // arr = [
    //   '939',
    //   '7,13,x,x,59,x,31,19',
    // ];

    const closestBus = {
      wait: -1,
      id: -1,
    };
    const arrival = parseInt(arr[0], 10);
    const busses =  arr[1].split(',')
                          .filter((bus) => bus !== 'x')
                          .map((bus) => parseInt(bus, 10));
                          // .sort((a, b) => a - b );

    // console.log({arrival, busses});

    for (let busId of busses) {
      let busArrival = 0;
      for (let i = 0; i < arrival + busId; i += busId) {
        busArrival = i;
      }
      // console.log({busId, busArrival});
      const waitingMinutes = busArrival - arrival;
      if (closestBus.id === -1 || waitingMinutes < closestBus.wait ) {
        closestBus.wait = waitingMinutes;
        closestBus.id = busId;
      }
    }

    console.groupEnd('part1');
    return closestBus.wait * closestBus.id;
  }

  static part2(arr) {
    console.group('part2');

    // arr = [
    //   '939',
    //   '7,13,x,x,59,x,31,19',
    // ];

    const t = this.findPattern(arr);

    console.groupEnd('part2');
    return t;
  }

  // TODO: to slow!
  static findPattern(arr) {
    const maxBus = {id: 0, offset: 0};
    const busses = arr[1]
      .split(',')

      .map((bus, i) => {
        if (bus === 'x') {
          return false;
        }
        const intBus = parseInt(bus, 10);
        if (intBus > maxBus.id) {
          maxBus.id = intBus;
          maxBus.offset = i;
        }
        return {id: intBus, offset: i};
      })
      .filter((bus) => bus);

    console.log({busses, maxBus});

    const modT = busses.shift().id; // remove first
    let t = 0;
    let mt = 0;
    while (true) {
      mt += maxBus.id;
      t = (mt - maxBus.offset);
      if (t % modT === 0) {
        // console.log({t, mt, maxBus});
        if (this.busPatternForT(t, busses)) {
          return t;
        }
      }
    }
  }

  static busPatternForT(t, busses) {
    for (let bus of busses) {
      if ((t + bus.offset) % bus.id !== 0) {
        return false;
      }
    }
    return true;
  }
}
