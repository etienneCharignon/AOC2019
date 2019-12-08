const { Worker } = require('worker_threads');

function chaine (settingsSequence, code, feedbackloop) {
  return new Promise((resolve) => {
    const workers = [];
    for(var i = 0; i < settingsSequence.length; i++) {
      const worker = new Worker('./computer.js', {
        workerData: code,
        stdin: true,
        stdout: true
      });
      workers.push(worker);
      worker.stdin.write(`${settingsSequence[i]}\n`);
      worker.stdout.setEncoding('utf8');
      // worker.on('message', (message) => {
      //   console.log(message);
      // });
    }
    for(var w = 1; w < workers.length; w++) {
      workers[w-1].stdout.pipe(workers[w].stdin);
    }
    const lastWorker = workers[workers.length-1]
    if(feedbackloop) lastWorker.stdout.pipe(workers[0].stdin);
    const lastWorkerOutputs = [];
    lastWorker.stdout.on('data', (data) => {
      lastWorkerOutputs.push(data);
    });
    workers[0].stdin.write('0\n');
    lastWorker.on('message', () => {
      resolve(lastWorkerOutputs.pop());
    });
  });
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

function allOutputs (sequenceInitial, code, feedbackloop) {
  const allSequences = generate(sequenceInitial);
  const chaines = [];
  allSequences.forEach(sequence => {
    chaines.push(chaine(sequence, code, feedbackloop));
  });
  return Promise.all(chaines);
}

module.exports = {
  chaine,
  generate,
  allOutputs
};
