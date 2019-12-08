const { allOutputs } = require('./amplifier-controle-software-optimiser');
const puzzelInput = require('./amplifier-controle-software');

allOutputs([0, 1, 2, 3, 4], puzzelInput).then((outputs) => {
  console.log("max should be 38500 : " + outputs.reduce((a,e) => Math.max(a,e), 0));
});
