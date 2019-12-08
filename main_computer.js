const AmplifierControllerSoftware = require('./amplifier-controle-software');

process.stdin.setEncoding('utf8');

process.stdout.write('input ?:\n');
const { compute } = require('./computer.js');
compute(AmplifierControllerSoftware, process.stdin, process.stdout);

process.stdin.on('end', () => {
  process.stdout.write('end');
});
