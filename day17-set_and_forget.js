const { Worker } = require('worker_threads');
const ascii = require('./day17-ascii');

function provideString(string, stdin) {
  for(var c = 0; c < string.length; c++) {
    stdin.write(`${string.charCodeAt(c)}\n`);
  }
}

function walkTheScaffold () {
  ascii[0] = 2;
  return new Promise((resolve) => {
    const worker = new Worker('./computer.js', {
      workerData: ascii,
      stdin: true,
      stdout: true
    });
    provideString('A,B,A,C,A,B,C,C,A,B\n', worker.stdin);
    provideString('R,8,L,10,R,8\n', worker.stdin);
    provideString('R,12,R,8,L,8,L,12\n', worker.stdin);
    provideString('L,12,L,10,L,8\n', worker.stdin);
    provideString('y\n', worker.stdin);
    worker.stdout.setEncoding('utf8');
    var line = '';
    var scaffolds = '';
    var countLine = 0;
    worker.stdout.on('data', (data) => {
      if(data.length>4) {
        //console.log('not ascci ? : ' + data);
        resolve(parseInt(data));
      }
      line += String.fromCharCode(parseInt(data));
      if(data == 10) {
        scaffolds += line;
        line = '';
        countLine++;
      }
      if(countLine == 41) {
        //console.log(scaffolds);
        //console.log('-----------------------------------------------------');
        countLine = 0;
      }
    });
    worker.stdout.on('end', () => {
    });
  });
}

function read() {
  ascii[0] = 1;
  return new Promise((resolve) => {
    const worker = new Worker('./computer.js', {
      workerData: ascii,
      stdin: true,
      stdout: true
    });
    worker.stdout.setEncoding('utf8');
    var scaffolds = '';
    worker.stdout.on('data', (output) => {
      scaffolds += String.fromCharCode(parseInt(output));
    });
    worker.stdout.on('end', () => {
      resolve(scaffolds);
    });
  });
}

function getRowSize(scaffolds) {
  return scaffolds.indexOf('\n') + 1;
}

function getCoordinates(position, rowSize) {
  const row = Math.floor(position/rowSize);
  const column = position - row * rowSize;
  return [row, column];
}

function calibration(scaffolds) {
  const rowSize = getRowSize(scaffolds);
  var sum = 0;
  scaffolds.split('').forEach((c, i) => {
    if(c == '#'
      && scaffolds[i - rowSize] == '#'
      && scaffolds[i + rowSize] == '#'
      && scaffolds[i - 1] == '#'
      && scaffolds[i + 1] == '#'
    ) {
      const [row, col] = getCoordinates(i, rowSize);
      //console.log('intersection : ', row, col);
      sum += row * col;
    }
  });
  return sum;
}

module.exports = {
  read, calibration, getRowSize, getCoordinates, walkTheScaffold, provideString
};
