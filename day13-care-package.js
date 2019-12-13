const { Worker } = require('worker_threads');

function runGame (game, numberOfSteps) {
  return new Promise((resolve) => {
    const worker = new Worker('./computer.js', {
      workerData: game,
      stdin: true,
      stdout: true
    });
    worker.stdout.setEncoding('utf8');
    const instructions = [];
    const instruction = {
      triplet: []
    };
    var ballX = 0;
    var padX = 0;
    var score = 0;
    var gameOver = false;
    worker.stdout.on('data', (data) => {
      instruction.triplet.push(parseInt(data));
      if(instruction.triplet.length == 3) {
        instructions.push(instruction.triplet);

        if(instruction.triplet[0] == -1) {
          // console.log(instruction.triplet);
          score = instruction.triplet[2];

          if(gameOver) {
            worker.terminate()
            resolve(score);
          }
        }

        if(instruction.triplet[2] == 4) {
          ballX = instruction.triplet[0];
          //console.log(`ball : ${ballX}`);
          if(ballX > padX) {
            worker.stdin.write(`1\n`);
          }
          else if (ballX < padX) {
            worker.stdin.write(`-1\n`);
          }
          else {
            worker.stdin.write(`0\n`);
          }
        }

        if(instruction.triplet[2] == 3) {
          padX = instruction.triplet[0];
          //console.log(`pad : ${padX}`);
        }

        if(instructions.length == numberOfSteps) {
          worker.terminate()
          resolve(instructions);
        }
        instruction.triplet = [];
      }
    });
    worker.on('message', () => {
      gameOver = true;
    });
  });
}
module.exports = {
  runGame
};
