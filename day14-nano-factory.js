class ProductionUnit {
  constructor (map, batch, inputs) {
    this.map = map;
    this.batch = batch;
    this.inputs = inputs;
    this.count = 0;
    this.composants = {};
    this.inputs.split(', ').forEach(composant => {
      const [q, product] = composant.split(' ');
      this.composants[product] = parseInt(q);
    });
  }

  produce (quantity) {
    var toProduce = quantity;
    if(this.count >= toProduce) {
      this.count -= toProduce;
      return;
    }
    toProduce -= this.count;
    const numberOfBatch = Math.ceil(toProduce / this.batch);
    Object.keys(this.composants).forEach(product => {
      const q = this.composants[product];
      this.map[product].produce(q * numberOfBatch);
    });
    this.count = numberOfBatch * this.batch - toProduce;
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
 // Object.keys(map).forEach(product => {
 //   console.log(product + " : " + map[product].count);
 // });
  return map.ORE.count;
}

function howManyFuel (rulls) {

  var from = 460664;
  var to = 5586022;
  while(to - from > 1) {
    const m = Math.floor((to + from)/2);
    //console.log(to, from, m);
    const map = read(rulls);
    map.FUEL.produce(m);
    //console.log(map.ORE.count);
    if (map.ORE.count <= 1000000000000) {
      from = m;
    }
    else {
      //console.log(`${e} : can't produce ${m} fuel`);
      to = m;
    }
  }
  return from;
}

module.exports = {
  read,
  countOreToMakeOneFuel,
  howManyFuel
}
