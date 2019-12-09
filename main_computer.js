const BOOST = require('./day9-boost');

process.stdin.setEncoding('utf8');

process.stdout.write('input ?:\n');
const { compute } = require('./computer.js');
compute(BOOST, process.stdin, process.stdout);

process.stdin.on('end', () => {
  process.stdout.write('end');
});
