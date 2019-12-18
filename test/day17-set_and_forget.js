const expect = require('expect.js');
const { read, calibration, getRowSize,
  getCoordinates, walkTheScaffold,
  provideString } = require('../day17-set_and_forget');

describe.only('day 17: set and forget', function () {
  it('run the ascii code', function () {
    return read().then(scaffolds => {
      console.log(scaffolds);
      expect(calibration(scaffolds)).to.eql(2804);
    });
  });

  it('can compute the rowSize', function () {
    expect(getRowSize('12\n')).to.equal(3);
  });

  it('can compute coordinates', function () {
    expect(getCoordinates(1, 10)).to.eql([0, 1]);
    expect(getCoordinates(11, 10)).to.eql([1, 1]);
    expect(getCoordinates(35, 10)).to.eql([3, 5]);
  });

  it('can provide a string to the vaccum cleaner', function () {
    var printedCharacters = []
    provideString('A,B\n', { write: (string) => {
      printedCharacters.push(parseInt(string));
    }});
    expect(printedCharacters).to.eql([65,44,66,10]);
  });

  it('can walk the scaffold', function () {
    this.timeout(30000);
    return walkTheScaffold().then(dust => {
      expect(dust).to.eql(833429);
    });
  });
});
