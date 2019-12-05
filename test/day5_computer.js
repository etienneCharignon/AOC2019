var expect = require('expect.js');
const { compute, decomposeOpCode } = require('../computer.js');

describe.only('day5: computer', function() {

  beforeEach (function () {
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
    var actual_output;
    compute([4,0,99], { read:()=>{}}, {write:(output) => { actual_output = output; }});
    expect(actual_output).to.equal('4\n');
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
});
