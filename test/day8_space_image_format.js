const expect = require('expect.js');
const { splitInLayers, countDigits, findLayer, drawImage } = require('../space-image-format');
const puzzleInputs = require('../day8-space-image');

describe('day 8: space image format', function () {

  it('can split input in layers', function () {
    expect(splitInLayers('123456789012', 3, 2)).to.eql(['123456', '789012']);
  });

  it('count numver of digits by layers', function () {
    expect(countDigits('122233444455', 3, 2)).to.eql([
      {
        '1' : 1,
        '2' : 3,
        '3' : 2
      },
      {
        '4' : 4,
        '5' : 2
      },
    ]);
  });

  it('find the layer with the minimum number of zero', function () {
    expect(findLayer('022233004455', 3, 2)).to.eql({
      '0': 1,
      '2': 3,
      '3': 2
    });
  });

  it('find the layer with the minimum number of zero when there is none', function () {
    expect(findLayer('022233333333000000', 3, 2)).to.eql({
      '3': 6
    });

  });

  it('solve the part1 puzzle input', function () {
    const layer = findLayer(puzzleInputs, 25, 6);
    expect(layer['1'] * layer['2']).to.eql(1920);
  });

  it('draw an image of two layers', function () {
    expect(drawImage(['012', '111'])).to.eql(' XX');
  });

  it('draw the example image', function () {
    expect(drawImage(splitInLayers('0222112222120000', 2, 2))).to.eql(' XX ');
  });

  it('draw the puzzle input image', function () {
    var image = drawImage(splitInLayers(puzzleInputs, 25, 6));
    image = splitInLayers(image, 25, 1).join('\n');
    expect(image).to.eql('XXX   XX  X  X X     XX  \nX  X X  X X  X X    X  X \nX  X X    X  X X    X  X \nXXX  X    X  X X    XXXX \nX    X  X X  X X    X  X \nX     XX   XX  XXXX X  X ');
    //console.log(image);
  });
});
