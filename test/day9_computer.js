var expect = require('expect.js');
const { Worker } = require('worker_threads');
const BOOST = require('../day9-boost.js');
const { compute, decomposeOpCode } = require('../computer.js');

class MockStdout {
  write (output) {
    this.output = output
  }
}

describe('day9: computer', function() {

  const nullInput = null;
  let mockStdout;

  beforeEach (function () {
    mockStdout = new MockStdout();
  });

  it('terminate with 99', function () {
    return Promise.resolve(compute([99])).then((output) => {
      expect(output).to.eql([99]);
    });
  });

  it('1: add two numbers', function () {
    return Promise.resolve(compute([1,0,0,0,99])).then((output) => {
      expect(output).to.eql([2,0,0,0, 99]);
    });
  });

  it('2: multiply two numbers', function () {
    return Promise.resolve(compute([2, 1, 0, 0, 99])).then((output) => {
      expect(output).to.eql([2, 1, 0, 0, 99]);
    });
  });

  it('computes divers programmes', function () {
    return Promise.all([
      compute([2, 1, 0, 0, 99]),
      compute([1,0,0,0,99]),
      compute([2,3,0,3,99]),
      compute([2,4,4,5,99,0]),
      compute([1,1,1,4,99,5,6,0,99])
    ]).then((outputs) => {
      expect(outputs[0]).to.eql([2,1,0,0,99]);
      expect(outputs[1]).to.eql([2,0,0,0,99]);
      expect(outputs[2]).to.eql([2,3,0,6,99]);
      expect(outputs[3]).to.eql([2,4,4,5,99,9801]);
      expect(outputs[4]).to.eql([30,1,1,4,2,5,6,0,99]);
    });
  });

  it('3: take integers as input', function (done) {
    const worker = new Worker('./computer.js', {
      workerData: [3,0,3,1,99],
      stdin: true,
      stdout: true
    });
    worker.stdin.write('10000\n');
    worker.stdin.write('12\n');
    worker.on('message', (result) => {
      expect(result).to.eql([10000,12,3,1,99]);
      expect(result[0]).to.equal(10000);
      done();
    });
  });

  it('4: write a single integer as output', function (done) {
    const worker = new Worker('./computer.js', {
      workerData: [4,0,99],
      stdin: true,
      stdout: true
    });
    worker.stdout.setEncoding('utf8');
    worker.on('message', () => {
      expect(worker.stdout.read()).to.equal('4\n');
      done();
    });
  });

  it('4: write a single integer as output in immediate mode', function (done) {
    const worker = new Worker('./computer.js', {
      workerData: [104,999,99],
      stdin: true,
      stdout: true
    });
    worker.stdout.setEncoding('utf8');
    worker.on('message', () => {
      expect(worker.stdout.read()).to.equal('999\n');
      done();
    });
  });

  it('pipes two workers', function (done) {
    const outWorker = new Worker('./computer.js', {
      workerData: [3,5,4,5,99,0],
      stdin: true,
      stdout: true
    });
    const inWorker = new Worker('./computer.js', {
      workerData: [3,0,99],
      stdin: true,
      stdout: true
    });
    outWorker.stdout.pipe(inWorker.stdin);
    outWorker.stdin.write('1234\n');
    inWorker.on('message', (resultCode) => {
      expect(resultCode).to.eql([1234, 0, 99]);
      expect(resultCode[0]).to.equal(1234);
      done();
    });
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
    return Promise.resolve(compute([1002,4,3,4,33])).then((output) => {
      expect(output).to.eql([1002,4,3,4,99]);
    });
  });

  it('5: jump if true jump if true', function () {
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

  it('6: jump if false jump if false', function () {
    compute([1106,0,4,99,104,42,99], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('42\n');
  });

  it('7: compare less than', function () {
    compute([1107,7,8,7,4,7,99,-1], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('1\n');
    mockStdout.output = -1;
    compute([1107,8,8,7,4,7,99,-1], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('0\n');
    mockStdout.output = -1;
    compute([1107,9,8,7,4,7,99,-1], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('0\n');
  });

  it('8: equal set 1 if equal', function () {
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

  it('can manage high memory adresse', function () {
    compute([1101,1,1,100,4,100,99], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('2\n');
  });

  it('has a relative parameter mode with default base to 0', function () {
    compute([1101,1,1,100,204,100,99], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('2\n');
  });

  it('has a relative parameter mode', function () {
    compute([1101,1,2,100,109,20,204,80,99], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('3\n');
  });

  it('can read input in relative mode', function (done) {
    const worker = new Worker('./computer.js', {
      workerData: [109,20,203,80,204,80,99],
      stdin: true,
      stdout: true
    });
    worker.stdout.setEncoding('utf8');
    worker.stdin.write('1\n');
    worker.on('message', () => {
      expect(worker.stdout.read()).to.equal('1\n');
      done();
    });
  });

  it('check day8 example 1', function () {
    const day8example1 = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
    return Promise.resolve(day8example1).then((memory) => {
      expect(memory).to.eql(day8example1);
    });
  });

  it('can output a very large number', function () {
    compute([1102,34915192,34915192,7,4,7,99,0], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('1219070632396864\n');
    mockStdout.output = -1;
    compute([104,1125899906842624,99], nullInput, mockStdout);
    expect(mockStdout.output).to.equal('1125899906842624\n');
  });

  it('can run the BOOST programme', function (done) {
    const worker = new Worker('./computer.js', {
      workerData: BOOST,
      stdin: true,
      stdout: true
    });
    worker.stdout.setEncoding('utf8');
    worker.stdin.write('1\n');
    worker.on('message', () => {
      expect(worker.stdout.read()).to.equal('2714716640\n');
      done();
    });
  });

});
