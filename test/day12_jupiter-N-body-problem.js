const expect = require('expect.js');
const { computeVelocity,
  applyVelocity,
  computeEnergie,
  compare
} = require('../day12_jupiter');

describe('day 12 Jupiter N-body probleme', function () {
  it('compute velocity on one axes', function () {
    const moons = computeVelocity([
      {pos: {x: -1}, v:{ x:0}},
      {pos: {x: 2}, v:{ x:0}},
      {pos: {x: 4}, v:{ x:0}},
      {pos: {x: 2}, v:{ x:1}},
    ]);
    expect(moons[0].v.x).to.eql(3);
    expect(moons[1].v.x).to.eql(0);
    expect(moons[2].v.x).to.eql(-3);
    expect(moons[3].v.x).to.eql(1);
  });

  it('compute velocity on other axes', function () {
    const moons = computeVelocity([
      {pos: {y: 0, z:1}, v:{ y:0, z:0}},
      {pos: {y: 1, z:0}, v:{ y:0, z:0}}
    ]);
    expect(moons[0].v.y).to.eql(1);
    expect(moons[1].v.y).to.eql(-1);
    expect(moons[0].v.z).to.eql(-1);
    expect(moons[1].v.z).to.eql(1);
  });

  it('apply velocity', function () {
    const moons = applyVelocity([
      {pos: {x: -1}, v:{ x:1}},
      {pos: {x: 2}, v:{ x:-1}},
      {pos: {x: 4}, v:{ x:0}},
    ]);
    expect(moons[0].pos.x).to.eql(0);
    expect(moons[1].pos.x).to.eql(1);
    expect(moons[2].pos.x).to.eql(4);
  });

  it('compute total system energie', function () {
    const moons = [
      {pos: {x: 2, y:1, z:-3}, v:{ x:-3, y:-2, z:1}}
    ];
    expect(computeEnergie(moons)).to.eql(36);
  });

  it('compute total system energie of the puzzle input', function () {
    var puzzleInput = [
      {pos: {x: -10, y:-13, z:7}, v:{ x:0, y:0, z:0}},
      {pos: {x: 1, y:2, z:1}, v:{ x:0, y:0, z:0}},
      {pos: {x: -15, y:-3, z:13}, v:{ x:0, y:0, z:0}},
      {pos: {x: 3, y:7, z:-4}, v:{ x:0, y:0, z:0}}
    ];

    for(var step = 0; step < 1000; step++) {
      puzzleInput = applyVelocity(computeVelocity(puzzleInput));
    }

    expect(computeEnergie(puzzleInput)).to.eql(8454);
  });

  it('can compare two world', function () {

    const moons = [
      {pos: {x: 2, y:1, z:-3}, v:{ x:0, y:0, z:0}},
      {pos: {x: 2, y:1, z:-3}, v:{ x:0, y:0, z:0}}
    ];
    const moons2 = [
      {pos: {x: 2, y:1, z:-3}, v:{ x:0, y:0, z:0}},
      {pos: {x: 2, y:1, z:0}, v:{ x:0, y:0, z:0}},
    ];
    expect(compare(moons, moons)).to.be(true);
    expect(compare(moons, moons2)).to.be(false);
  });

  it('runs until it returns to origin', function () {
    const example_1 = [
      {pos: {x: -1, y:0, z:2}, v:{ x:0, y:0, z:0}},
      {pos: {x: 2, y:-10, z:-7}, v:{ x:0, y:0, z:0}},
      {pos: {x: 4, y:-8, z:8}, v:{ x:0, y:0, z:0}},
      {pos: {x: 3, y:5, z:-1}, v:{ x:0, y:0, z:0}}
    ];

    var world = [
      {pos: {x: -1, y:0, z:2}, v:{ x:0, y:0, z:0}},
      {pos: {x: 2, y:-10, z:-7}, v:{ x:0, y:0, z:0}},
      {pos: {x: 4, y:-8, z:8}, v:{ x:0, y:0, z:0}},
      {pos: {x: 3, y:5, z:-1}, v:{ x:0, y:0, z:0}}
    ];
    var step = 0;
    var equals = false;
    for(; !equals; step++) {
      world = applyVelocity(computeVelocity(world));
      equals = compare(world, example_1);
    }
    expect(step).to.eql(2772);
  });

  it('runs until on the puzzle input', function () {
    this.timeout(2000);
    var puzzleInput = [
      {pos: {x: -10, y:-13, z:7}, v:{ x:0, y:0, z:0}},
      {pos: {x: 1, y:2, z:1}, v:{ x:0, y:0, z:0}},
      {pos: {x: -15, y:-3, z:13}, v:{ x:0, y:0, z:0}},
      {pos: {x: 3, y:7, z:-4}, v:{ x:0, y:0, z:0}}
    ];
    var world = [
      {pos: {x: -10, y:-13, z:7}, v:{ x:0, y:0, z:0}},
      {pos: {x: 1, y:2, z:1}, v:{ x:0, y:0, z:0}},
      {pos: {x: -15, y:-3, z:13}, v:{ x:0, y:0, z:0}},
      {pos: {x: 3, y:7, z:-4}, v:{ x:0, y:0, z:0}}
    ];
    var step = 0;
    var equals = false;
    for(; !equals; step++) {
      world = applyVelocity(computeVelocity(world));
      equals = compare(world, puzzleInput);
    }
    expect(step).to.eql(2772);
    // x: 186028
    // y: 161428
    // z: 193052
    // ppcm : 362336016722948
  });

});
