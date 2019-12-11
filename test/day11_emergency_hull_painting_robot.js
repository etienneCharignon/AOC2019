const expect = require('expect.js');
const { paint, moveAndReadColor } = require('../day11-robot');

describe('day 11: emergency hull painting robot', function () {
  it('runs one first step', function () {
    return paint(1).then((output) => {
      expect(output).to.eql([[0,1]]);
    });
  });

  it('runs two steps', function () {
    return paint(2).then((output) => {
      expect(output).to.eql([[0,1],[1,1]]);
    });
  });

  it('runs to the end and return the painted cells', function () {
    this.timeout(20000);
    return paint(2000).then((paintedCells) => {
      const keys = Object.keys(paintedCells);
      expect(keys.length).to.eql(249);

      const screen = [];
      keys.forEach(cell => {
        const position = cell.split(',');
        const y = parseInt(position[1]) + 5;
        const x = position[0];
        const row = screen[x];
        if(!row) {
          screen[x] = [];
        }
        screen[x][y] = paintedCells[cell] == 1 ? 'X' : ' ';
      });

      screen.forEach(row => {
        console.log(row.join(''));
      });
    });
  });

  it('can turn left', function () {
    const world = {
      direction: 0,
      position: [0,0],
      paintedCells: {}
    };
    moveAndReadColor(world, [1,0]);
    expect(world.direction).to.eql(3);
    expect(world.position).to.eql([-1,0]);

    moveAndReadColor(world, [1,0]);
    expect(world.direction).to.eql(2);
    expect(world.position).to.eql([-1,-1]);

    moveAndReadColor(world, [1,0]);
    expect(world.direction).to.eql(1);
    expect(world.position).to.eql([0,-1]);

    moveAndReadColor(world, [1,0]);
    expect(world.direction).to.eql(0);
    expect(world.position).to.eql([0,0]);
  });

  it('can turn right', function () {
    const world = {
      direction: 0,
      position: [0,0],
      paintedCells: {}
    };
    moveAndReadColor(world, [1,1]);
    expect(world.direction).to.eql(1);
    expect(world.position).to.eql([1,0]);
  });

  it('can read panels color', function () {
    const blackWorld = {
      direction: 0,
      position: [0,0],
      paintedCells: {}
    };
    expect(moveAndReadColor(blackWorld, [1,0])).to.equal(0);

    const whiteWorld = {
      direction: 0,
      position: [0,0],
      paintedCells: {'1,0': 1}
    };
    expect(moveAndReadColor(whiteWorld, [1,1])).to.equal(1);
  });

  it('paint the world', function () {
    const world = {
      direction: 0,
      position: [0,0],
      paintedCells: {}
    };
    moveAndReadColor(world, [1,0]);
    expect(world.paintedCells).to.eql({'0,0': 1});

    world.position = [0,0]
    world.paintedCells = {'0,0': 1};
    moveAndReadColor(world, [0,0]);
    expect(world.paintedCells).to.eql({'0,0': 0});
  });

  it('re-paint a cell', function () {
    const world = {
      direction: 0,
      position: [0,0],
      paintedCells: {'0,0': 1}
    };
    moveAndReadColor(world, [1,0]);
    expect(world.paintedCells).to.eql({'0,0': 1});
  });
});
