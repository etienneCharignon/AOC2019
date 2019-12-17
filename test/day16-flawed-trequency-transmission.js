const expect = require('expect.js');
const Stopwatch = require("node-stopwatch").Stopwatch;
const basePattern = [ 0, 1, 0, -1 ];
const {
  computeElementFromBase,
  compute,
  patternIndex
} = require('../day16-flawed-frequency-transmission');

const puzzelInput = '59775675999083203307460316227239534744196788252810996056267313158415747954523514450220630777434694464147859581700598049220155996171361500188470573584309935232530483361639265796594588423475377664322506657596419440442622029687655170723364080344399753761821561397734310612361082481766777063437812858875338922334089288117184890884363091417446200960308625363997089394409607215164553325263177638484872071167142885096660905078567883997320316971939560903959842723210017598426984179521683810628956529638813221927079630736290924180307474765551066444888559156901159193212333302170502387548724998221103376187508278234838899434485116047387731626309521488967864391';

describe('day 16 - Flawed Frequency Transmission', function () {

  it('compute the pattern index for the first element', function () {
    expect([0,1,2,3,4].map(i=> patternIndex(i, 1))).to.eql([1,2,3,0,1]);
  });

  it('compute the pattern index for the second element', function () {
    expect([0,1,2,3,4,5,6,7,8].map(i=> patternIndex(i, 2))).to.eql([0,1,1,2,2,3,3,0,0]);
  });

  it('compute the pattern index for the third element', function () {
    expect([0,1,2,3,4,5,6,7,8].map(i=> patternIndex(i, 3))).to.eql([0,0,1,1,1,2,2,2,3]);
  });

  it('compute first element fist generation from basePattern', function () {
    const input = "12345678".split('').map(c => parseInt(c));
    expect(computeElementFromBase(1, input, basePattern)).to.eql(4);
  });

  it('compute second element fist generation from basePattern', function () {
    const input = "12345678".split('').map(c => parseInt(c));
    expect(computeElementFromBase(2, input, basePattern)).to.eql(8);
  });

  it('compute third element fist generation from basePattern', function () {
    const input = "12345678".split('').map(c => parseInt(c));
    expect(computeElementFromBase(3, input, basePattern)).to.eql(2);
  });

  it('compute first generation', function () {
    const input = "12345678".split('').map(c => parseInt(c));
    expect(compute(input, 1, basePattern)).to.eql([4,8,2,2,6,1,5,8]);
    expect(compute([4,8,2,2,6,1,5,8], 1, basePattern)).to.eql([3,4,0,4,0,4,3,8]);
  });

  it('compute a larger input', function () {
    const input = "80871224585914546619083218645595";

    var signal = input;
    for(var i = 0; i< 100;i++) {
      signal = compute(signal, 1, basePattern);
    }
    expect(signal.slice(0,8).join('')).to.eql('24176176');
  });

  it('compute puzzel input phase 1', function () {

    var signal = puzzelInput;
    for(var i = 0; i< 100;i++) {
      signal = compute(signal, 1, basePattern);
    }
    expect(signal.slice(0,8).join('')).to.eql('25131128');
  });

  xit('compute the puzzel input phase 2', function () {

    var signal = ''
    for(var n = 0; n <1; n++) {
      signal += puzzelInput;
    }

    signal = signal.split('').map(c => parseInt(c));

    console.log("ready")
    const stopwatch = Stopwatch.create();
    stopwatch.start();
    for(var i = 0; i< 100;i++) {
      signal = compute(signal, 100, basePattern);
    }
    stopwatch.stop();
    console.log(stopwatch.elapsed.seconds);
    console.log(parseInt(signal.slice(0,7).join('')));
    const offset = parseInt(signal.slice(0,7).join(''));
    expect(signal.slice(offset,offset+8).join('')).to.eql('25131128');
  });
});
