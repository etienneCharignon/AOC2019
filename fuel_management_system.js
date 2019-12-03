const intersections= function (path1, path2) {
    var intersection = [];
    path1.forEach(p => {
      const p2 = path2.find(p2 => p2.x==p.x && p2.y==p.y);
      if(p2) {
        intersection.push({x:p.x, y:p.y, steps1:p.steps, steps2:p2.steps});
      }
    });
    return intersection;
  };

const distances_intersections= function (path1, path2) {
    return intersections(path1, path2).map(p => p.x + p.y);
  };

const steps_intersections= function (path1, path2) {
    return intersections(path1, path2).map(p => p.steps1 + p.steps2);
  };

module.exports = {
  collectPoints: function (path) {
    var points = []
    var x = 0;
    var y = 0;
    var steps = 0;
    path.split(',').forEach((command) => {
      const instruction = command.match(/(.)(\d+)/)
      const direction = instruction[1];
      const distance = parseInt(instruction[2]);
      for(var step=0; step < distance; step++) {
        if(direction== 'R') x++;
        if(direction== 'L') x--;
        if(direction== 'U') y++;
        if(direction== 'D') y--;
        steps++;
        points.push({x, y, steps});

      }
    });
    return points;
  },

  intersections: intersections,

  distances_intersections: distances_intersections,

  steps_intersections: steps_intersections,

  closest: function (path1, path2, f) {
    return Math.min(...f(path1, path2));
  }
};
