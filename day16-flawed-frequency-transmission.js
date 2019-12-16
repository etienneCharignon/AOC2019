function elementPattern (row, input, basePattern) {
  const elementPattern = [];
  var bpI = 0;
  for (var c=0; c < input.length + 1; c += row) {
    for(var n=0; n<row; n++) {
      elementPattern.push(basePattern[bpI%basePattern.length]);
    }
    bpI++;
  }
  return elementPattern.slice(1,input.length + 1);
}

function computeElement(input, pattern) {
  const sum = input.map((e,i) => e * pattern[i]).reduce((s, e) => s+e);
  return parseInt(sum.toString().split('').pop());
}

function compute(generation, input, basePattern) {
  return input
    .map((e, i) => computeElement(input, elementPattern(i+1, input,basePattern)));
}

module.exports = {
  elementPattern,
  computeElement,
  compute
}
