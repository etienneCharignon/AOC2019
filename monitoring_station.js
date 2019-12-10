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

function countInSight(asteroids, asteroid) {
  var count = 0;
  asteroids.forEach(otherAsteroid => {
    if(hasBetween(otherAsteroid, asteroid, asteroids)) {
      return;
    }
    count++;
  });
  return count;
}

function allInsigths(asteroids) {
  return asteroids.map(a => countInSight(asteroids, a));
}

module.exports = {
  isBetween,
  coordinates,
  countInSight,
  allInsigths
}
