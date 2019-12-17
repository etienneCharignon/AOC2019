function patternIndex(i, row) {
  return Math.floor((i+1) / row) % 4;
}

function computeElementFromBase(row, input, basePattern, repetition = 1) {
  var sum = 0;
  for(var i = row-1; i < input.length;i++) {
   // for(var p = 0; p < row && i < input.length; p++) {
   //   sum += input[i];
   //   i++;
   // }
   // i += row;
   // for(var m = 0; m < row && i < input.length; m++) {
   //   sum -= input[i];
   //   i++;
   // }
   // i += row;
    const pattern = basePattern[patternIndex(i,row)];
    // if(pattern == 0) {
    //   i += row -1;
    //   continue;
    // }
    sum += input[i] * pattern;
  }
  sum *= repetition;
  return parseInt(sum.toString().split('').pop());
}

function compute(input, repetition, basePattern) {
  const result = [];
  for(var i = 1; i <= input.length; i++) {
    result.push(computeElementFromBase(i, input, basePattern, repetition));
  }
  return result;
}

module.exports = {
  compute,
  computeElementFromBase,
  patternIndex
}
