function count_passwords (range) {
  var numberOfPasswords = 0;
  for(var occurence = range[0]; occurence <= range[1]; occurence++) {
    var hasDouble = false;
    var increase = true;
    var previousN = -1;
    occurence.toString().split('').forEach(c => {
      var n = parseInt(c);
      if(increase && n == previousN) {
        hasDouble = true;
      }
      if(n < previousN) {
        increase = false;
      }
      previousN = n
    });
    if(hasDouble && increase) {
      numberOfPasswords++;
    }
  }
  return numberOfPasswords;
}

module.exports = {
  count_passwords
}
