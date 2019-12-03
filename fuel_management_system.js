const intersections= function (path1, path2) {
    return path1.filter(p => path2.find(p2 => p2.x==p.x && p2.y==p.y));
  };

const distances_intersections= function (path1, path2) {
    return intersections(path1, path2).map(p => p.x + p.y);
  };

module.exports = {
  collectPoints: function (path) {
    var points = []
    var x = 0;
    var y = 0;
    path.split(',').forEach((command) => {
      const instruction = command.match(/(.)(\d+)/)
      const direction = instruction[1];
      const distance = parseInt(instruction[2]);
      for(var step=0; step < distance; step++) {
        if(direction== 'R') x++;
        if(direction== 'L') x--;
        if(direction== 'U') y++;
        if(direction== 'D') y--;
        points.push({x, y});

      }
    });
    return points;
  },

  intersections: intersections,
  distances_intersections: distances_intersections,
  closest_disctances_intersections: function (path1, path2) {
    return Math.min(...distances_intersections(path1, path2));
  }
};
