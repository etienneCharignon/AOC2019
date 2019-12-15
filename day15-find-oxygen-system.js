const { Worker } = require('worker_threads');
const fs = require('fs');

class Maze {
  constructor() {
    this.walls = [];
    this.stops = [];
    this.moves = [1, 4, 2, 3];
    this.restart();
  }

  restart () {
    this.droidPosition = [0,0];
    this.droidDirection = 0;
    this.foundOxygenSystem = false;
    this.visited = [];
    this.allMoves = [];
  }

  draw () {
    const dimentions = {
      minX : 0,
      maxX : 0,
      minY : 0,
      maxY : 0
    };
    this.walls.forEach(wall => {
      const position = wall.split(',');
      const x = parseInt(position[0]);
      const y = parseInt(position[1]);
      dimentions.minX = Math.min(dimentions.minX, x);
      dimentions.maxX = Math.max(dimentions.maxX, x);
      dimentions.minY = Math.min(dimentions.minY, y);
      dimentions.maxY = Math.max(dimentions.maxY, y);
    });
    this.visited.forEach(cell => {
      const position = cell.split(',');
      const x = parseInt(position[0]);
      const y = parseInt(position[1]);
      dimentions.minX = Math.min(dimentions.minX, x);
      dimentions.maxX = Math.max(dimentions.maxX, x);
      dimentions.minY = Math.min(dimentions.minY, y);
      dimentions.maxY = Math.max(dimentions.maxY, y);
    });
    //console.log(dimentions);
    for(var r = dimentions.maxY; r >= dimentions.minY; r--) {
      const row = [];
      for(var c = dimentions.minX; c < dimentions.maxX + 1; c++) {
        const posX = c - dimentions.minX;
        row[posX] = this.walls.includes(`${[c,r]}`) ? '#' : ' ';
        if(this.visited.includes(`${[c,r]}`)) {
          row[posX] = '.';
        }
        if(this.stops.includes(`${[c,r]}`)) {
          row[posX] = 'X';
        }
        if(c == 16 && r == -12) {
          row[posX] = 'O';
        }
        if(c == 0 && r == 0) {
          row[posX] = 'S';
        }
        if(this.droidPosition[0] == c && this.droidPosition[1] == r) {
          row[posX] = 'D';
        }
      }
      console.log(row.join(''));
    }
    console.log('----------------------------------------');
  }

  isWall ([x, y]) {
    return this.walls.includes(`${x},${y}`);
  }

  isStops ([x, y]) {
    return this.stops.includes(`${x},${y}`);
  }

  isVisited ([x, y]) {
    return this.visited.includes(`${x},${y}`);
  }

  newRequestedPosition (direction) {
    var [x, y] = this.droidPosition;
    if(direction == 0) {
      y++;
    }
    else if(direction == 1){
      x++;
    }
    else if(direction == 2){
      y--;
    }
    else if(direction == 3){
      x--;
    }
    return [x,y]
  }

  setMove(move) {
    this.requestedPosition = this.newRequestedPosition(this.moves.indexOf(move));
  }

  getMove() {
    this.requestedPosition = this.newRequestedPosition(this.droidDirection);
    var watchedDirection = 0;
    while(this.isWall(this.requestedPosition)
      || this.isVisited(this.requestedPosition)
      || this.isStops(this.requestedPosition)) {
      this.droidDirection++;
      watchedDirection++;
      if(watchedDirection > 3) {
       throw "dead end";
      }
      if(this.droidDirection > 3) {
        this.droidDirection = 0;
      }
      this.requestedPosition = this.newRequestedPosition(this.droidDirection);
    }
    const move = this.moves[this.droidDirection];
    this.allMoves.push(move);
    return move;
  }

  report (data) {
    if(data == 0) {
      this.walls.push(`${this.requestedPosition}`);
    }
    if(data == 1) {
      this.visited.push(`${this.requestedPosition}`);
      this.droidPosition = this.requestedPosition;
    }
    if(data == 2) {
      this.foundOxygenSystem = true;
      this.droidPosition = this.requestedPosition;
      //console.log(`trouvé à la position : ${this.droidPosition}`);
    }
  }

  dumpWalls(fileName) {
    fs.writeFile(fileName, this.walls.toString(), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }
}

function moveDroid(repaireDroid, numberOfSteps, maze = new Maze()) {
  return new Promise((resolve) => {
    const worker = new Worker('./computer.js', {
      workerData: repaireDroid,
      stdin: true,
      stdout: true
    });
    worker.stdout.setEncoding('utf8');
    var steps = 0;
    worker.stdin.write(`${maze.getMove()}\n`);
    worker.stdout.on('data', (data) => {
      maze.report(parseInt(data));
      steps++;
      if(steps >= numberOfSteps) {
        worker.terminate();
        maze.stops.push(`${maze.droidPosition}`);
        //console.log(maze.droidPosition);
        resolve(parseInt(data));
      }
      if(maze.foundOxygenSystem) {
        console.log('trouvé' + maze.allMoves.length);
        worker.terminate();
        maze.draw();
        resolve(-1);
      }

      try {
        const newMove = maze.getMove();
        worker.stdin.write(`${newMove}\n`);
      } catch (ex) {
        maze.stops.push(`${maze.droidPosition}`);
        worker.terminate();
        maze.draw();
        resolve(maze.allMoves);
      }
    });
    worker.on('message', () => {
    });
  });
}

module.exports = {
  moveDroid,
  Maze
};
