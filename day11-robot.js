const robotBrain = require('./day11-brain-robot');
const { Worker } = require('worker_threads');

function moveAndReadColor(world, step) {
  world.paintedCells[`${world.position}`] = step[0];

  // manage direction
  var x = world.position[0];
  var y = world.position[1];
  if(step[1] == 0) {
    world.direction = (world.direction + 3) % 4;
  }
  else {
    world.direction = (world.direction + 1) % 4;
  }
  switch (world.direction) {
    case 0:
      y += 1;
      break;
    case 1:
      x += 1;
      break;
    case 2:
      y -= 1;
      break;
    case 3:
      x -= 1;
      break;
  }
  world.position = [x, y];
  const color = world.paintedCells[`${world.position}`];
  //console.log(world);
  return color == undefined ? 0 : color;
}

function paint (numberOfSteps) {
  return new Promise((resolve) => {
    const worker = new Worker('./computer.js', {
      workerData: robotBrain,
      stdin: true,
      stdout: true
    });
    worker.stdin.write(`1\n`);
    worker.stdout.setEncoding('utf8');
    const steps = [];
    const world = {
      direction: 0,
      position: [0,0],
      paintedCells: {}
    };
    const oneStepOutput = {
      pair: []
    };
    worker.stdout.on('data', (data) => {
      oneStepOutput.pair.push(parseInt(data));
      if(oneStepOutput.pair.length == 2) {
        //console.log(oneStepOutput.pair);
        steps.push(oneStepOutput.pair);

        if(steps.length == numberOfSteps) {
          worker.terminate()
          resolve(steps);
        }
        const colorPanel = moveAndReadColor(world, oneStepOutput.pair);
        oneStepOutput.pair = [];
        worker.stdin.write(`${colorPanel}\n`);
        //console.log(Object.keys(world.paintedCells).length);
      }
    });
    worker.on('message', () => {
      //console.log(world.paintedCells);
      resolve(world.paintedCells);
    });
  });
}

module.exports = {
  paint,
  moveAndReadColor
}
