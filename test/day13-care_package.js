const expect = require("expect.js");
const { runGame } = require('../day13-care-package');

describe.only('day 13: Care Package', function () {
  it('runs the game', function () {
    return runGame(798).then((instructions) => {
      expect(instructions.filter(i => i[2] == 2).length).to.eql(228);
    });
  });
});
