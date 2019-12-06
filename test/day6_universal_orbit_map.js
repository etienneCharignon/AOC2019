const expect = require('expect.js');
const {countOrbits, countAllOrbits, findAllOrbits, numberOfOrbitalTransfert} = require('../universal_orbit_map');
const puzzleInput = require('../uom_puzzle_input.js').map;

describe.only('day 6: universal orbit map', function () {
  it('count B direct orbit', function () {
    expect(countOrbits(['COM)B']).B).to.be(1);
    expect(countOrbits(['COM)B', 'COM)C']).B).to.be(1);
  });

  it('count C direct and first indirect orbit', function () {
    expect(countOrbits(['COM)B', 'B)C']).C).to.be(2);
    expect(countOrbits(['B)C', 'COM)B']).C).to.be(2);
  });

  it('count D direct and all indirect orbit', function () {
    expect(countOrbits(['COM)B', 'B)C', 'C)D']).D).to.be(3);
  });

  it('count D direct and all indirect orbit when indirect orbit are after', function () {
    expect(countOrbits(['COM)B', 'C)D', 'B)C']).D).to.be(3);
  });

  it('count the example', function () {
    expect(countAllOrbits(`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`)).to.be(42);
  });

  it('count part 1 puzzle input', function () {
    expect(countAllOrbits(puzzleInput)).to.be(261306);
  });

  it('find all orbits to COM', function () {
    expect(findAllOrbits(['COM)A', 'A)B', 'B)C', 'C)D'], 'D')).to.eql(['COM', 'A', 'B', 'C']);
  });

  it('compute number of orbital transfert', function () {
    expect(numberOfOrbitalTransfert(`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`, 'YOU', 'SAN')).to.be(4);
  });

  it('count numver of orbital transfert in puzzle input', function () {
    expect(numberOfOrbitalTransfert(puzzleInput, 'YOU', 'SAN')).to.be(382);
  });
});
