class ProductionUnit {
  constructor (map, batch, inputs) {
    this.map = map;
    this.batch = batch;
    this.inputs = inputs;
    this.count = 0;
  }

  produce (quantity) {
    for(var i = 0; i < quantity; i++) {
      if(this.count == 0) {
        this.inputs.split(', ').forEach(composant => {
	    const [q, product] = composant.split(' ');
	    this.map[product].produce(parseInt(q));
	});
	this.count += this.batch;
      }
      this.count--;
    }
  }
}

class OreProductionUnit {
  constructor () {
    this.count = 0;
  }

  produce (q) {
    this.count += q;
  }
}

function read(input) {
  const map = {};
  input.split('\n').forEach(line => {
    if(line == '') return;
    const [inputs, outputs] = line.split(' => ');
    const [quantite, product] = outputs.split(' ');
    const batch = parseInt(quantite);
    map[product] = new ProductionUnit(map, batch, inputs);
  });

  map['ORE'] = new OreProductionUnit();

  return map;
}

function countOreToMakeOneFuel (map) {
  map.FUEL.produce(1);
  return map.ORE.count;
}

module.exports = {
  read,
  countOreToMakeOneFuel,
}
