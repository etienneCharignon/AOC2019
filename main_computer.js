const { Maze } = require('./day15-find-oxygen-system');
const repaireDroid = require('./day15-repaire-droid');
const { Worker } = require('worker_threads');

const keys = ['z', 's', 'q', 'd'];

process.stdin.setEncoding('utf8');
process.stdout.setEncoding('utf8');


    const worker = new Worker('./computer.js', {
      workerData: repaireDroid,
      stdin: true,
      stdout: true
    });
    worker.stdout.setEncoding('utf8');
    const maze = new Maze();
    process.stdin.on('data', data => {
      const move = keys.indexOf(data[0]) + 1;
      maze.setMove(move);
      worker.stdin.write(`${move}\n`);
    });
    worker.stdout.on('data', (data) => {
      maze.report(parseInt(data));
      if(maze.foundOxygenSystem) {
        console.log('trouvé');
        worker.terminate();
        resolve(maze.droidPosition);
      }
      maze.draw();
    });
    worker.on('message', () => {
    });





// 
// const { compute } = require('./computer.js');
// compute(repaireDroid, process.stdin, process.stdout);
// 
// process.stdin.on('end', () => {
//   process.stdout.write('end');
// });
// 
// const maze = new Maze();
// 
// process.stdout.on('data', (data) => {
//   maze.report(parseInt(data));
//   maze.draw();
//   if(maze.foundOxygenSystem) {
//     console.log('trouvé');
//     console.log(maze.droidPosition);
//   }
// });
