const expect = require('expect.js');
const {
  isBetween, coordinates,
  collectInSight, allInsigths,
  mapByAngle, computeAngle
} = require('../monitoring_station');
const puzzleInput = require('../day10-asteroids_field');

describe.only('day 10: monitoring station', function () {
  it('know if c is between a and b', function () {
    expect(isBetween({x:0,y:0}, {x:6,y:2}, {x:3,y:1})).to.eql(true);
  });

  it('find coordinates', function () {
    expect(coordinates('#.\n.#')).to.eql([{x:0,y:0}, {x:1, y:1}]);
  });

  it('count in sight when no obstacles', function () {
    expect(collectInSight([{x:0,y:0}, {x:1, y:1}], {x:0,y:0})).to.eql([{ x: 1, y: 1 }]);
  });

  it('count in sight with hidden asteroid', function () {
    expect(collectInSight([{x:0,y:0}, {x:0, y:1}, {x:0, y:2}], {x:0,y:0})).to.eql([{ x: 0, y: 1 }]);
  });

  it('count all insights', function () {
    const asteroids = coordinates(`.#..#
.....
#####
....#
...##`);
    expect (allInsigths(asteroids).map(list=>list.length)).to.eql([ 7, 7, 6, 7, 7, 7, 5, 7, 8, 7 ]);
  });

  it('find the number of the best location', function () {
    const fields = coordinates(puzzleInput);
    const allInSigths = allInsigths(fields);
    const max = allInSigths.reduce((max, inSights) => Math.max(max, inSights.length), 0);
    expect(max).to.equal(253);
    expect(fields[allInSigths
      .map(list=>list.length)
      .indexOf(max)]).to.eql({ x: 11, y: 19 });
  });

  it('compute angle origin, point in degre', function () {
    expect(computeAngle({x:0, y:0}, {x:0, y:-1})).to.eql(0);
    expect(computeAngle({x:0, y:0}, {x:0, y:1})).to.eql(180);
    expect(computeAngle({x:0, y:0}, {x:1, y:0})).to.eql(90);
    expect(computeAngle({x:1, y:1}, {x:1, y:0})).to.eql(0);
    expect(computeAngle({x:1, y:1}, {x:1, y:0})).to.eql(0);
    expect(computeAngle({x:1, y:1}, {x:0, y:0})).to.eql(315);
  });

  it('sort asteroids in sight by angular value starting from up', function () {
    expect(mapByAngle([
      {x:1, y:0},
      {x:2, y:1},
      {x:1, y:2},
      {x:0, y:1}
    ], {x:1,y:1})).to.eql({
      0: {x:1, y:0},
      90: {x:2, y:1},
      180:{x:1, y:2},
      270:{x:0, y:1}
    });
  });

  it('find the 200th asteroid', function () {
    const fields = coordinates(puzzleInput);
    const monitoringStation ={ x: 11, y: 19 };
    const map = mapByAngle(collectInSight(fields, monitoringStation), monitoringStation);
    const sortedAngles = Object.keys(map).sort((a, b) => a - b);
    expect(sortedAngles[199]).to.eql(323.13010235415595);
    expect(map[sortedAngles[199]]).to.eql({x:8, y:15});
  });
});
