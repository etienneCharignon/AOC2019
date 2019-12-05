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

function getValue(memory, param, mode) {
  return mode == 1 ? param : memory[param];
}

function exec(memory, parametersModes, i, f) {
  const value1 = getValue(memory, memory[i+1], parametersModes[0])
  const value2 = getValue(memory, memory[i+2], parametersModes[1]);
  const param3 = memory[i+3];

  memory[param3] = f(value1, value2) ? 1 : 0;
}

function compute (memory, stdin, stdout) {
  for(var i=0; i < memory.length; i++) {
    const opCode = memory[i];
    var ligne = `${i}: ${opCode}`;
    const { instruction, parametersModes } = decomposeOpCode(opCode);

    if(instruction == 99) {
      return memory;
    }
    const param1 = memory[i+1];
    ligne += ` ${param1}`;

    switch (instruction) {
      case 1: { // addition
        const param2 = memory[i+2];
        const param3 = memory[i+3];
        ligne += ` ${param2} ${param3} `;
        const sum = getValue(memory, param1, parametersModes[0])
          + getValue(memory, param2, parametersModes[1]);
        memory[param3] = sum;
        i += 3;
        break;
      }
      case 2: {// Multiplication
        const param2 = memory[i+2];
        const param3 = memory[i+3];
        ligne += ` ${param2} ${param3} `;
        const product = getValue(memory, param1, parametersModes[0])
          * getValue(memory, param2, parametersModes[1]);
        memory[param3] = product;
        i += 3;
        break;
      }
      case 3: // read input
        memory[param1] = parseInt(stdin.read());
        i+=1;
        break;
      case 4: // write output
        stdout.write(getValue(memory, param1, parametersModes[0]) + '\n');
        i+=1;
        break;
      case 5: // jump if true
      case 6: { // jump if false
        const param2 = memory[i+2];
        ligne += ` ${param2} `;
        const value1 = getValue(memory, param1, parametersModes[0]);
        const value2 = getValue(memory, param2, parametersModes[1]);
        if((value1 !== 0 ) == (instruction == 5)) i = value2 - 1;
        else i+=2;
        break;
      }
      case 7: { // less than
        const param2 = memory[i+2];
        const param3 = memory[i+3];
        ligne += ` ${param2} ${param3} `;
        exec(memory, parametersModes, i, (v1, v2) => (v1 < v2));
        i+=3;
        break;
      }
      case 8: { // equal
        const param2 = memory[i+2];
        const param3 = memory[i+3];
        ligne += ` ${param2} ${param3} `;
        exec(memory, parametersModes, i, (v1, v2) => (v1 == v2));
        i+=3;
        break;
      }
    }

    const debug= false;
    if (debug) console.log(ligne);
  }

}

module.exports = {
  compute,
  decomposeOpCode
}
