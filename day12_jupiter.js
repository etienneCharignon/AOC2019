function computeVelocity (moons) {
  ['x', 'y', 'z'].forEach(axe => {
    moons =  moons.map((moon1, i1) => {
      moons.forEach((moon2, i2) => {
        if(i1 == i2) return;
        if(moon1.pos[axe] == moon2.pos[axe]) return;
        if(moon1.pos[axe] > moon2.pos[axe]) {
          moon1.v[axe] -= 1;
        }
        else {
          moon1.v[axe] += 1;
        }
      });
      return moon1;
    });
  });
  return moons;
}

function applyVelocity (moons) {
  ['x', 'y', 'z'].forEach(axe => {
    moons =  moons.map(moon => {
      moon.pos[axe] += moon.v[axe];
      return moon
    });
  });
  return moons;
}

function sumCoordinate(coordinates) {
  const summer = (acc, c) => Math.abs(c) + acc;
  return Object.values(coordinates).reduce(summer, 0);
}

function computeEnergie (moons) {
  return moons.reduce((energie, moon) => {
    const potentialEnergie = sumCoordinate(moon.pos);
    const cinertiqueEnergie = sumCoordinate(moon.v);
    return energie + (potentialEnergie * cinertiqueEnergie);
  }, 0);
}

module.exports = {
  computeVelocity,
  applyVelocity,
  computeEnergie
};
