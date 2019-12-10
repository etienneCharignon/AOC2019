const expect = require('expect.js');
const { isBetween, coordinates, countInSight, allInsigths } = require('../monitoring_station');
const puzzleInput = require('../day10-asteroids_field');

describe.only('day 10: monitoring station', function () {
  it('know if c is between a and b', function () {
    expect(isBetween({x:0,y:0}, {x:6,y:2}, {x:3,y:1})).to.eql(true);
  });

  it('find coordinates', function () {
    expect(coordinates('#.\n.#')).to.eql([{x:0,y:0}, {x:1, y:1}]);
  });

  it('count in sight when no obstacles', function () {
    expect(countInSight([{x:0,y:0}, {x:1, y:1}], {x:0,y:0})).to.equal(1);
  });

  it('count in sight with hidden asteroid', function () {
    expect(countInSight([{x:0,y:0}, {x:0, y:1}, {x:0, y:2}], {x:0,y:0})).to.equal(1);
  });

  it('count all insights', function () {
    const asteroids = coordinates(`.#..#
.....
#####
....#
...##`);
    expect (allInsigths(asteroids)).to.eql([ 7, 7, 6, 7, 7, 7, 5, 7, 8, 7 ]);
  });

  it('find the number of the best location', function () {
    const fields = coordinates(puzzleInput);
    const allInSigths = allInsigths(fields);
    const max = allInSigths.reduce((max, inSights) => Math.max(max, inSights), 0);
    expect(max).to.equal(253);
    expect(fields[allInSigths.indexOf(max)]).to.eql({ x: 11, y: 19 });
  });
});
