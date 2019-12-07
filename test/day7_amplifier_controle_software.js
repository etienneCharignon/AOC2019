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

// const example2_1 = [
//   3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
//   27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5
// ];

const puzzelInput = require('../amplifier-controle-software');

class MockStdin {
  constructor() {
    this.i = 0;
    this.input = [];
  }
  newInputs(inputs) {
    this.input = inputs
    this.i = 0;
  }
  read () {
    return this.input[this.i++];
  }
}

class MockStdout {
  write (output) {
    this.output = output
  }
}

describe.only('amplifier controle software', function () {

  let mockStdin;
  let mockStdout;

  beforeEach (function () {
    mockStdout = new MockStdout();
    mockStdin = new MockStdin();
  });

  it('chaine one amplifier with setting 4 with example 1 code', function () {
    chaine([4], example1, mockStdin, mockStdout);
    expect(mockStdout.output).to.equal('4\n');
  });

  it('chaine all 5 amplifiers with example 1 code', function () {
    chaine([4, 3, 2, 1, 0], example1, mockStdin, mockStdout);
    expect(mockStdout.output).to.equal('43210\n');
  });

  it('chaine all 5 amplifiers with example 2 code', function () {
    chaine([0, 1, 2, 3, 4], example2, mockStdin, mockStdout);
    expect(mockStdout.output).to.equal('54321\n');
  });

  it('chaine all 5 amplifiers with example 3 code', function () {
    chaine([1, 0, 4, 3, 2], example3, mockStdin, mockStdout);
    expect(mockStdout.output).to.equal('65210\n');
  });

  it('chaine all 5 amplifiers with puzzel input code', function () {
    chaine([0, 1, 2, 3, 4], puzzelInput, mockStdin, mockStdout);
    expect(mockStdout.output).to.equal('28604\n');
  });

  it('generate all possible sequences', function () {
    expect(generate([0])).to.eql([[0]]);
    expect(generate([0, 1])).to.eql([[0,1], [1,0]]);
    expect(generate([0, 1, 2, 3, 4]).length).to.equal(5*4*3*2*1);
  });

  it('find all sequences outputs', function () {
    expect(allOutputs([0,1], example1, mockStdin, mockStdout)).to.eql({
      1: [0,1],
      10: [1,0]
    });
  });

  it('find maximum sequence', function () {
    const outputs = allOutputs([0, 1, 2, 3, 4], puzzelInput, mockStdin, mockStdout);
    expect(Object.keys(outputs).reduce((a,e) => Math.max(a,e), 0)).to.equal(38500);
    //console.log(outputs[38500]);
  });

  // it.only('chain amplifieres with example 2_1 code', function () {
  //   chaine([9,8,7,6,5], example2_1, mockStdin, mockStdout);
  //   expect(mockStdout.output).to.equal('139629729\n');
  // });
});
