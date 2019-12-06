function countObjectOrbit(object, mapOfObject) {
  if(mapOfObject[object] == 'COM'){
    return 1;
  }
  return 1 + countObjectOrbit(mapOfObject[object], mapOfObject);
}

function parseMap(map) {
  const mapOfObject = {};
  map
    .map((orbit) => orbit.split(')'))
    .forEach((orbit)=> {
      mapOfObject[orbit[1]]= orbit[0];
    })
  return mapOfObject;
}

function countOrbits (map) {
  var count = {};
  const mapOfObject = parseMap(map);
  Object.keys(mapOfObject).forEach((object) => {
    count[object] = countObjectOrbit(object, mapOfObject);
  });
  return count;
}

function countAllOrbits (map) {
  return Object.values(countOrbits(map.split('\n'))).reduce((acc, orbits) => acc + orbits, 0);
}

function _findAllOrbits (map, object) {
  if(object == 'COM') {
    return [];
  }
  const orbits = _findAllOrbits(map, map[object])
  orbits.push(map[object]);
  return orbits;
}

function findAllOrbits (map, object) {
  return _findAllOrbits(parseMap(map), object);
}

function numberOfOrbitalTransfert (map, o1, o2) {
  map = parseMap(map.split('\n'));
  const orbits1 = _findAllOrbits(map, o1);
  const orbits2 = _findAllOrbits(map, o2);

  for(var i = 0; i < orbits1.length && i < orbits2.length; i++) {
    if(orbits1[i] != orbits2[i]) {
      return orbits1.length - i + orbits2.length - i;
    }
  }
  return 4;
}

module.exports= {
  countOrbits,
  countAllOrbits,
  findAllOrbits,
  numberOfOrbitalTransfert
}
