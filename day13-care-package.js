const { Worker } = require('worker_threads');
const game = require('./day13-game');

function runGame (numberOfSteps) {
  return new Promise((resolve) => {
    const worker = new Worker('./computer.js', {
      workerData: game,
      stdin: true,
      stdout: true
    });
    //worker.stdin.write(`1\n`);
    worker.stdout.setEncoding('utf8');
    const instructions = [];
    const instruction = {
      triplet: []
    };
    worker.stdout.on('data', (data) => {
      instruction.triplet.push(parseInt(data));
      if(instruction.triplet.length == 3) {
        instructions.push(instruction.triplet);
        //console.log(instructions.length);

        if(instructions.length == numberOfSteps) {
          worker.terminate()
          resolve(instructions);
        }
        instruction.triplet = [];
      }
    });
    worker.on('message', (memory) => {
      if(instructions.length >  0) console.log(memory);
      //resolve(instructions);
    });
  });
}
module.exports = {
  runGame
};
