function splitInLayers (image, width, height) {
  const layers = [];
  const layerSize = width*height;
  for(var l = 0; l< image.length / layerSize; l++) {
    layers.push(image.substring(l*layerSize, (l+1)*layerSize));
  }
  return layers;
}

function countDigits (image, width, height) {
  return splitInLayers(image, width, height).map((layer) => {
    const layerModel = {};
    layer.split('').forEach (digit => {
      if(!layerModel[digit]) {
        layerModel[digit] = 0;
      }
      layerModel[digit] += 1;
    });
    return layerModel;
  });
}

function findLayer (image, width, height) {
  return countDigits(image, width, height).reduce((acc, layer) => {
    if(!acc['0']) return acc;
    return acc['0'] < layer['0'] ? acc : layer;
  }, {'0':99999})
}

function drawImage (layers) {
  const image = layers[0].split('');
  layers.forEach(layer => {
    for(var c = 0; c<layer.length; c++) {
      image[c] = image[c] == '2' ? layer.charAt(c) : image[c];
    }
  });
  return image.join('').replace(/0/g, ' ').replace(/1/g, 'X');
}

module.exports = {
  splitInLayers,
  countDigits,
  findLayer,
  drawImage
};
