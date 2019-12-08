const expect = require('expect.js');
const { chaine, generate, allOutputs } = require('../amplifier-controle-software-optimiser');
const example1 = [
  3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0
];

const example2 = [
  3,23,3,24,1002,24,10,24,1002,23,-1,23,
  101,5,23,23,1,24,23,23,4,23,99,0,0
];

const example3 = [
  3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,
  1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0
];

const example2_1 = [
  3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
  27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5
];

const example2_2 = [
  3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
  -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
  53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10
];

const puzzelInput = require('../amplifier-controle-software');

describe('day7: amplifier controle software', function () {

  it('chaine one amplifier with setting 4 with example 1 code', function () {
    return chaine([4], example1).then( (output) => {
      expect(output).to.equal('4\n');
    });
  });

  it('chaine all 5 amplifiers with example 1 code', function () {
    return chaine([4, 3, 2, 1, 0], example1).then((output) => {
      expect(output).to.equal('43210\n');
    });
  });

  it('chaine all 5 amplifiers with example 2 code', function () {
    return chaine([0, 1, 2, 3, 4], example2).then((output) => {
      expect(output).to.equal('54321\n');
    });
  });

  it('chaine all 5 amplifiers with example 3 code', function () {
    return chaine([1, 0, 4, 3, 2], example3).then((output) => {
      expect(output).to.equal('65210\n');
    });
  });

  it('chaine all 5 amplifiers with puzzel input code', function () {
    return chaine([0, 1, 2, 3, 4], puzzelInput).then((output) => {
      expect(output).to.equal('28604\n');
    });
  });

  it('generate all possible sequences', function () {
    expect(generate([0])).to.eql([[0]]);
    expect(generate([0, 1])).to.eql([[0,1], [1,0]]);
    expect(generate([0, 1, 2, 3, 4]).length).to.equal(5*4*3*2*1);
  });

  it('find all sequences outputs', function () {
    return allOutputs([0,1], example1).then((outputs) => {
      expect(outputs).to.eql([ 1, 10 ]);
    });
  });

  xit('find maximum sequence', function () {
    this.timeout(30000);
    return allOutputs([0, 1, 2, 3, 4], puzzelInput).then((outputs) => {
      expect(outputs.reduce((a,e) => Math.max(a,e), 0)).to.equal(38500);
    });
  });

  it('chain amplifieres with example 2_1 code', function () {
    return chaine([9,8,7,6,5], example2_1, true).then((output) => {
      expect(output).to.equal('139629729\n');
    });
  });

  it('chain amplifieres with example 2_2 code', function () {
    return chaine([9,7,8,5,6], example2_2, true).then((output) => {
      expect(output).to.equal('18216\n');
    });
  });

  xit('find maximum sequence day 2', function () {
    this.timeout(60000);
    return allOutputs([5, 6, 7, 8, 9], puzzelInput, true).then((outputs) => {
      expect(outputs.reduce((a,e) => Math.max(a,e), 0)).to.equal(33660560);
    });
  });
});
