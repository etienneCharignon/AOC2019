function isBetween(a, b, c) {
    const crossproduct = (c.y - a.y) * (b.x - a.x) - (c.x - a.x) * (b.y - a.y);

    // compare versus epsilon for floating point values, or != 0 if using integers
    if (Math.abs(crossproduct) > 0) {
        return false;
    }

    const dotproduct = (c.x - a.x) * (b.x - a.x) + (c.y - a.y)*(b.y - a.y)
    if (dotproduct < 0) {
        return false;
    }

    const squaredlengthba = (b.x - a.x)*(b.x - a.x) + (b.y - a.y)*(b.y - a.y)
    if (dotproduct > squaredlengthba) {
        return false;
    }

    return true;
}

function coordinates(field) {
  const coordinates = [];
  field.split('\n').forEach((row, y) => {
    row.split('').forEach((cell, x) => {
      if(cell == '#') {
        coordinates.push({x,y});
      }
    });
  });
  return coordinates;
}

function hasBetween(a1, a2, asteroids) {
  if(a2.x == a1.x && a2.y == a1.y) {
    return true;
  }

  for(var i = 0 ; i < asteroids.length ; i++) {
    const potentiel = asteroids[i];
    if(a1.x == potentiel.x && a1.y == potentiel.y) {
      continue;
    }
    if(a2.x == potentiel.x && a2.y == potentiel.y) {
      continue;
    }
    if(isBetween(a1, a2, potentiel)) {
      return true;
    }
  }
  return false;
}

function collectInSight(asteroids, asteroid) {
  const inSight = [];
  asteroids.forEach(otherAsteroid => {
    if(hasBetween(otherAsteroid, asteroid, asteroids)) {
      return;
    }
    inSight.push(otherAsteroid);
  });
  return inSight;
}

function allInsigths(asteroids) {
  return asteroids.map(a => collectInSight(asteroids, a));
}

function computeAngle(origin, point) {
  const angle = Math.atan2(point.y - origin.y, point.x - origin.x) * 180 / Math.PI + 90;
  if(angle < 0) return angle + 360;
  return angle;
}

function mapByAngle(asteroids, o) {
  const map = {};
  asteroids.forEach(a => {
    map[computeAngle(o, a)] = a;
  });
  return map;
}

module.exports = {
  isBetween,
  coordinates,
  collectInSight,
  allInsigths,
  mapByAngle,
  computeAngle
}
