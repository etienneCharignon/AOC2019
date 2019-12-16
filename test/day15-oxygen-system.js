const expect = require('expect.js');
const repaireDroid = require('../day15-repaire-droid');
const { moveDroid, Maze } = require('../day15-find-oxygen-system');

describe('Day 15: oxygen system', function () {
  it('move droid one step', function () {
    return moveDroid(repaireDroid, 1).then((report) => {
      expect(report).to.equal(0);
    });
  });

  it('start up first', function () {
    const maze = new Maze();
    expect(maze.getMove()).to.equal(1);
    expect(maze.requestedPosition).to.eql([0,1]);
  });

  it('report a wall to the Maze', function () {
    const maze = new Maze();
    maze.getMove();
    maze.report(0);
    expect(maze.walls).to.eql(["0,1"]);
    expect(maze.droidPosition).to.eql([0,0]);
  });

  it('move South if a wall in North', function () {
    const maze = new Maze();
    maze.getMove();
    maze.report(0);
    expect(maze.getMove()).to.equal(4);
    expect(maze.requestedPosition).to.eql([1,0]);
  });

  it('move North it Est wall', function () {
    const maze = new Maze();
    maze.droidDirection = 3;
    expect(maze.getMove()).to.equal(3);
    maze.report(0);
    expect(maze.getMove()).to.equal(1);
  });

  it('report an empty cell', function () {
    const maze = new Maze();
    maze.getMove();
    maze.report(1);
    expect(maze.droidPosition).to.eql([0,1]);
  });

  it('report the oxygen system', function () {
    const maze = new Maze();
    maze.getMove();
    maze.report(2);
    expect(maze.foundOxygenSystem).to.equal(true);
    expect(maze.droidPosition).to.eql([0,1]);
  });

  it('can draw the maze', function () {
    const maze = new Maze();
    maze.walls = require('../day15-walls.js');
    maze.draw();
  });

  async function runMultiple(maze) {
    var report;
    for(var i = 0; i < 500; i++) {
      console.log(i);
      report = await moveDroid(repaireDroid, 300, maze).then((report) => {
        maze.restart();
        return report;
      });
      if(report < 0) break;
    }
    //console.log('fini');
    //maze.dumpWalls('./day15-walls.js');
     report = await moveDroid(repaireDroid, 300, maze).then((report) => {
       maze.restart();
       return report;
     });
     report = await moveDroid(repaireDroid, 300, maze).then((report) => {
       maze.restart();
       return report;
     });
    expect(report.length).to.equal(96);
  }

  xit('move droid many step', function () {
    const maze = new Maze();
    return runMultiple(maze);

   // return moveDroid(repaireDroid, 300, maze).then((report) => {
   //   maze.restart();
   //   return moveDroid(repaireDroid, 300, maze).then(report => {
   //     expect(report.length).to.equal(96);
   //   });
   // });
  });

  it('can spread the oxygen', function () {
    const maze = new Maze([1,2]);
    maze.walls = ['1,0', '2,0', '3,0',
      '0,1', '4,1',
      '0,2', '4,2',
      '1,3', '2,3', '3,3'];
    maze.draw();
    expect(maze.spreadOxygen()).to.equal(2);
    expect(maze.minutes).to.equal(1);
    maze.draw();
    expect(maze.spreadOxygen()).to.equal(2);
    expect(maze.minutes).to.equal(2);
    maze.draw();
    expect(maze.spreadOxygen()).to.equal(1);
  });

  it('count minutes for oxygen spreading', function () {
    const maze = new Maze();
    maze.walls = require('../day15-walls.js');
    while(maze.spreadOxygen() != 0) {
      //maze.draw();
    }
    expect(maze.minutes - 1).to.equal(334);
  });
});
