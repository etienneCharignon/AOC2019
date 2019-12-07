const { compute } = require('./computer.js');

function chaine (settingsSequence, code, stdin, stdout) {
  for(var i = 0; i < settingsSequence.length; i++) {
    const input = i == 0 ? 0 : parseInt(stdout.output);
    stdin.newInputs([settingsSequence[i],input]);
    compute(code.slice(), stdin, stdout);
  }
}

function generate(initialSequence) {
  const sequences = [];
  initialSequence.forEach(digit => {
    const digitsLeft = initialSequence.filter(e => e != digit);
    const others = generate(digitsLeft);
    if(others.length > 0) {
      others.forEach(sequence => {
        sequences.push([digit].concat(sequence));
      });
    }
    else sequences.push([digit]);
  });
  return sequences;
}

function allOutputs (sequenceInitial, code, stdIn, stdOut) {
  const allSequences = generate(sequenceInitial);
  const outputs = {};
  allSequences.forEach(sequence => {
    chaine(sequence, code, stdIn, stdOut);
    outputs[parseInt(stdOut.output)] = sequence;
  });
  return outputs;
}

module.exports = {
  chaine,
  generate,
  allOutputs
};
