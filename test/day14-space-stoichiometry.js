const expect = require('expect.js');
const {
  read,
  countOreToMakeOneFuel,
	howManyFuel
} = require('../day14-nano-factory');
const puzzleInput = require('../day14-factory-rulls');

const firstVerySimpleExample = `10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL
`;

const example3 = `157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`;

describe('day 14: Space Stoichiometry', function () {
  it('can read the input map', function () {
    const structuredInput = read(firstVerySimpleExample);
    expect(structuredInput.A.batch).to.equal(10);
    expect(structuredInput.A.inputs).to.equal('10 ORE');
    expect(structuredInput.B.batch).to.equal(1);
    expect(structuredInput.B.inputs).to.equal('1 ORE');
    expect(structuredInput.C.batch).to.equal(1);
    expect(structuredInput.C.inputs).to.equal('7 A, 1 B');
    expect(structuredInput.ORE.count).to.equal(0);
  });

  it('compute the first very simple example', function () {
    expect(countOreToMakeOneFuel(read(firstVerySimpleExample))).to.equal(31);
  });

  it('compute ORE for FUEL', function () {
    expect(countOreToMakeOneFuel(read(`9 ORE => 1 FUEL`))).to.equal(9);
  });

  it('compute ORE for FUEL by A', function () {
    expect(countOreToMakeOneFuel(read(`
9 ORE => 1 A
2 A => 1 FUEL`))).to.equal(18);
    expect(countOreToMakeOneFuel(read(`
9 ORE => 2 A
2 A => 1 FUEL`))).to.equal(9);
    expect(countOreToMakeOneFuel(read(`
9 ORE => 2 A
3 A => 1 FUEL`))).to.equal(18);
  });

  it('compute ORE for FUEL by A and B', function () {
    expect(countOreToMakeOneFuel(read(`
9 ORE => 1 A
2 ORE => 1 B
1 A, 1 B => 1 FUEL`))).to.equal(11);
  });

  it('compute the second example', function () {
    const example2 = `
9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL`;

    const input = read(example2);
    expect(countOreToMakeOneFuel(input)).to.equal(165);
  });

  it('compute the third example', function () {
    const input = read(example3);
    //console.log(input);
    expect(countOreToMakeOneFuel(input)).to.equal(13312);
  });

  it('count the ORE for the puzzleInput', function () {
    const input = read(puzzleInput);
    expect(countOreToMakeOneFuel(input)).to.equal(443537);
  });

  it('count the Fuel for 1 trillion ORE', function () {
    expect(howManyFuel(puzzleInput)).to.equal(2910558);
  });
});
