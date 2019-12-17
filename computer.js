const { isMainThread, workerData, parentPort } = require('worker_threads');

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
  if(mode == 1) {
    return param;
  }
  if(mode == 2) {
    return memory[param + relativeBase];
  }
  return memory[param];
}

function writeValue(memory, param1, mode, input) {
  if(mode == 2) {
    memory[param1 + relativeBase] = input;
  }
  else {
    memory[param1] = input;
  }
}

function computeCondition(memory, parametersModes, i, f) {
  const value1 = getValue(memory, memory[i+1], parametersModes[0])
  const value2 = getValue(memory, memory[i+2], parametersModes[1]);
  const param3 = memory[i+3];

  const result = f(value1, value2) ? 1 : 0;
  writeValue(memory, param3, parametersModes[2], result);
}

function readInput(stdin) {
  return new Promise(resolve => stdin.on('data', (data) => {
    resolve(parseInt(data));
  }));
}

var relativeBase;

async function compute (memory, stdin, stdout) {
  relativeBase = 0;
  for(var i=0; i < memory.length; i++) {
    const opCode = memory[i];
    var ligne = `${i}: ${opCode}`;
    const { instruction, parametersModes } = decomposeOpCode(opCode);

    if(instruction == 99) {
      if (!isMainThread) {
        stdout.emit('end');
        parentPort.postMessage(memory);
      }
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
        writeValue(memory, param3, parametersModes[2], sum);
        i += 3;
        break;
      }
      case 2: {// Multiplication
        const param2 = memory[i+2];
        const param3 = memory[i+3];
        ligne += ` ${param2} ${param3} `;
        const product = getValue(memory, param1, parametersModes[0])
          * getValue(memory, param2, parametersModes[1]);
        writeValue(memory, param3, parametersModes[2], product);
        i += 3;
        break;
      }
      case 3: {// read input
        await readInput(stdin).then((input) => writeValue(memory, param1, parametersModes[0], input));
        i+=1;
        break;
      }
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
        computeCondition(memory, parametersModes, i, (v1, v2) => (v1 < v2));
        i+=3;
        break;
      }
      case 8: { // equal
        const param2 = memory[i+2];
        const param3 = memory[i+3];
        ligne += ` ${param2} ${param3} `;
        computeCondition(memory, parametersModes, i, (v1, v2) => (v1 == v2));
        i+=3;
        break;
      }
      case 9: { // update relative base
        relativeBase += getValue(memory, param1, parametersModes[0]);
        i+=1;
        break;
      }
    }

    const debug= false;
    if (debug) console.log(ligne);
  }

}

if (isMainThread) {
  module.exports = {
    compute,
    decomposeOpCode
  }
}
else {
  process.stdin.setEncoding('utf8');
  process.stdin.setMaxListeners(1000);
  compute(workerData, process.stdin, process.stdout);
}

