var expect = require('expect.js');
const { compute, decomposeOpCode } = require('../computer.js');

class MockStdout {
  write (output) {
    this.output = output
  }
}

describe.only('day5: computer', function() {

  const nullInput = { read:()=>{}};
  let mockStdout;

  beforeEach (function () {
    mockStdout = new MockStdout();
  });

  it('terminate with 99', function () {
    expect(compute([99])).to.eql([99]);
  });

  it('add two numbers with 1', function () {
    expect(compute([1, 0, 0, 0, 99])).to.eql([2, 0, 0, 0, 99]);
  });

  it('multiply two numbers with 1', function () {
    expect(compute([2, 1, 0, 0, 99])).to.eql([2, 1, 0, 0, 99]);
  });

  it('computes divers programmes', function () {
    expect(compute([1,0,0,0,99])).to.eql([2,0,0,0,99]);
    expect(compute([2,3,0,3,99])).to.eql([2,3,0,6,99]);
    expect(compute([2,4,4,5,99,0])).to.eql([2,4,4,5,99,9801]);
    expect(compute([1,1,1,4,99,5,6,0,99])).to.eql([30,1,1,4,2,5,6,0,99]);
  });

  it('take a single integer as input', function () {
    const result = compute([3,0,99], { read:() => '1\n'});
    expect(result).to.eql([1,0,99]);
    expect(result[0]).to.equal(1);
  });

  it('write a single integer as output', function () {
    compute([4,0,99], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('4\n');
    compute([104,999,99], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('999\n');

  });

  it('extract insctruction from opCode', function () {
    expect(decomposeOpCode(2).instruction).to.eql(2);
    expect(decomposeOpCode(102).instruction).to.eql(2);
    expect(decomposeOpCode(1002).instruction).to.eql(2);
  });

  it('extract parameters modes', function () {
    expect(decomposeOpCode(2).parametersModes).to.eql([0, 0, 0]);
    expect(decomposeOpCode(102).parametersModes).to.eql([1, 0, 0]);
    expect(decomposeOpCode(1002).parametersModes).to.eql([0, 1, 0]);
    expect(decomposeOpCode(10002).parametersModes).to.eql([0, 0, 1]);
  });

  it('have a immediate mode for values', function () {
    expect(compute([1002,4,3,4,33])).to.eql([1002,4,3,4,99]);
  });

  it('jump if true jump if true', function () {
    compute([1105,1,4,99,104,42,99], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('42\n');
  });
  it('jump if true jump if a big integer', function () {
    compute([1105,227,4,99,104,42,99], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('42\n');
  });

  it('jump if true jump if true in position mode', function () {
    compute([5,8,7,99,104,42,99,4,1], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('42\n');
  });
  it('jump if true jump if true in position mode', function () {
    compute([6,8,7,99,104,42,99,4,0], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('42\n');
  });

  it('jump if true dont jump if false', function () {
    compute([1105,0,4,99,104,42,99], nullInput, mockStdout);
    expect(mockStdout.output).to.equal(undefined);
  });

  it('jump if false jump if false', function () {
    compute([1106,0,4,99,104,42,99], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('42\n');
  });

  it('equal set 1 if equal', function () {
    compute([1108,8,8,7,4,7,99,-1], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('1\n');
  });

  it('equal set 0 if different', function () {
    compute([1108,-1,8,7,4,7,99,-1], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('0\n');
  });

  it('equal in position mode', function () {
    compute([8,8,9,7,4,7,99,-1, 8, 8], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('1\n');
  });

  it('compare less than', function () {
    compute([1107,7,8,7,4,7,99,-1], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('1\n');
    mockStdout.output = -1;
    compute([1107,8,8,7,4,7,99,-1], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('0\n');
    mockStdout.output = -1;
    compute([1107,9,8,7,4,7,99,-1], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('0\n');
  });
});
