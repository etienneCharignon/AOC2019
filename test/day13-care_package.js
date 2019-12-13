const expect = require("expect.js");
const { runGame } = require('../day13-care-package');
const game = require('../day13-game');

describe('day 13: Care Package', function () {
  it('start the game', function () {
    game[0] = 1;
    return runGame(game, 798).then((instructions) => {
      expect(instructions.filter(i => i[2] == 2).length).to.eql(228);
    });
  });

  it('runs the game with coins', function () {
    this.timeout(15000);
    game[0] = 2;
    return runGame(game, 20000).then((instructions) => {
      expect(instructions).to.eql(10776);
    });
  });
});
