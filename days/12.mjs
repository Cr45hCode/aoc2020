const DIRECTION = {
  NORTH: 'N',
  EAST: 'E',
  SOUTH: 'S',
  WEST: 'W',
};
const ACTION = {
  FORWARD: 'F',
  LEFT: 'L',
  RIGHT: 'R',
};
const INSTRUCTION = {
  ...DIRECTION,
  ...ACTION,
};
const ROTATION = {
  0: DIRECTION.NORTH,
  90: DIRECTION.EAST,
  180: DIRECTION.SOUTH,
  270: DIRECTION.WEST,
}

export default class Day12 {

  static part1(arr) {
    console.group('part1');

    // arr = [
    //   'F10',
    //   'N3',
    //   'F7',
    //   'R90',
    //   'F11',
    // ];

    const coords = this.getDestinationCoordsForInstructions(arr);

    console.groupEnd('part1');
    return Math.abs(coords.lon) + Math.abs(coords.lat);
  }

  static part2(arr) {
    console.group('part2');

    // arr = [
    //   'F10',
    //   'N3',
    //   'F7',
    //   'R90',
    //   'F11',
    // ];

    const coords = this.getDestinationCoordsForInstructionsByWaypoint(arr);

    console.groupEnd('part2');
    return Math.abs(coords.lon) + Math.abs(coords.lat);
  }

  static getDestinationCoordsForInstructions(inst, rotation = 90) {
    // ←→ longitude | + east, - west
    // ↓↑ latitude | + north, - south
    const coords = {
      lon: 0,
      lat: 0,
    };
    let rot = rotation;

    for (let i = 0; i < inst.length; i += 1) {
      if (inst[i].trim() === '') {
        continue;
      }

      let _;
      let action;
      let value;
      [_, action, value] = inst[i].match(/^(\w)(\d+)$/);
      value = parseInt(value, 10);

      if (action === INSTRUCTION.FORWARD) {
        action = ROTATION[rot];
      }

      switch (action) {
        case INSTRUCTION.NORTH:
          coords.lat += value;
          break;
        case INSTRUCTION.SOUTH:
          coords.lat -= value;
          break;
        case INSTRUCTION.EAST:
          coords.lon += value;
          break;
        case INSTRUCTION.WEST:
          coords.lon -= value;
          break;

        case INSTRUCTION.LEFT:
          rot = (rot - value) % 360;
          if (rot < 0) {
            rot = 360 + rot;
          }
          break;
        case INSTRUCTION.RIGHT:
          rot = (rot + value) % 360;
          break;

        default:
          break;
      }

      // console.log({action, value, coords, rot});
    }

    return coords;
  }

  static getDestinationCoordsForInstructionsByWaypoint(inst) {
    // ←→ longitude | + east, - west
    // ↓↑ latitude | + north, - south
    let coords = {
      lon: 0,
      lat: 0,
    };
    let waypoint = {
      lon: 10,
      lat: 1,
    };

    for (let i = 0; i < inst.length; i += 1) {
      if (inst[i].trim() === '') {
        continue;
      }

      let _;
      let action;
      let value;
      [_, action, value] = inst[i].match(/^(\w)(\d+)$/);
      value = parseInt(value, 10);

      switch (action) {
        case INSTRUCTION.NORTH:
          waypoint.lat += value;
          break;
        case INSTRUCTION.SOUTH:
          waypoint.lat -= value;
          break;
        case INSTRUCTION.EAST:
          waypoint.lon += value;
          break;
        case INSTRUCTION.WEST:
          waypoint.lon -= value;
          break;

        case INSTRUCTION.LEFT:
          waypoint = this.rotateWaypoint(waypoint, value, false);
          break;
        case INSTRUCTION.RIGHT:
          waypoint = this.rotateWaypoint(waypoint, value);
          break;

        case INSTRUCTION.FORWARD:
          coords = this.moveToWaypoint(coords, waypoint, value);
          break;
        default:
          break;
      }
    }

    return coords;
  }

  static moveToWaypoint(coords, waypoint, amount) {
    for (let i = 0; i < amount; i += 1) {
      coords.lon += waypoint.lon;
      coords.lat += waypoint.lat;
    }

    return coords;
  }

  static rotateWaypoint(waypoint, deg, cw = true) {
    let tempWaypoint = {...waypoint};
    let newWaypoint = {
      lon: 0,
      lat: 0,
    };
    for (let i = 0; i < (deg / 90); i += 1) {
      newWaypoint.lon = cw ? tempWaypoint.lat : -tempWaypoint.lat;
      newWaypoint.lat = cw ? -tempWaypoint.lon : tempWaypoint.lon;
      tempWaypoint = {...newWaypoint};
    }

    return newWaypoint;
  }
}
