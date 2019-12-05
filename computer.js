function decomposeOpCode (opCode) {
  const C = Math.floor(opCode/100);
  const B = Math.floor(opCode/1000);
  const A = Math.floor(opCode/10000);
  return {
    instruction: opCode - (Math.floor(opCode / 100) * 100),
    parametersModes: [
      C - (Math.floor(C/10)*10),
      B - (Math.floor(B/10)*10),
      A]
  }
}

function getValue(code, param, mode) {
  return mode == 1 ? param : code[param];
}

function compute (code, stdin, stdout) {
  for(var i=0; i < code.length; i++) {
    const opCode = code[i];
    const { instruction, parametersModes } = decomposeOpCode(opCode);

    if(instruction == 99) {
      return code;
    }
    const param1 = code[i+1];

    if(instruction == 1) { // addition
      const param2 = code[i+2];
      const param3 = code[i+3];
      const sum = getValue(code, param1, parametersModes[0])
        + getValue(code, param2, parametersModes[1]);
      code[param3] = sum;
      i += 2;
    }
    else if(instruction == 2) { // Multiplication
      const param2 = code[i+2];
      const param3 = code[i+3];
      const product = getValue(code, param1, parametersModes[0])
        * getValue(code, param2, parametersModes[1]);
      code[param3] = product;
      i += 2;
    }
    else if(instruction == 3) { // read input
      code[param1] = parseInt(stdin.read());
    }
    else if(instruction == 4) { // write output
      stdout.write(getValue(code, param1, parametersModes[0]) + '\n');
    }
    i+=1;
  }
}

module.exports = {
  compute,
  decomposeOpCode
}
