const ascii = require('./day17-ascii');
const { Worker } = require('worker_threads');

process.stdin.setEncoding('utf8');
process.stdout.setEncoding('utf8');

ascii[0] = 2;
const worker = new Worker('./computer.js', {
  workerData: ascii,
  stdin: true,
  stdout: true
});
worker.stdout.setEncoding('utf8');
process.stdin.on('data', data => {
  const asciiChar = data.charCodeAt(0);
  worker.stdin.write(`${asciiChar}\n`);
});

var line = '';
worker.stdout.on('data', (data) => {
  line += String.fromCharCode(parseInt(data));
  if(data == 10) {
    console.log(line);
    line = '';
  }
});
worker.on('message', () => {
});



