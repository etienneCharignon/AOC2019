function count_passwords (range) {
  var numberOfPasswords = 0;
  for(var occurence = range[0]; occurence <= range[1]; occurence++) {
    var hasDouble = [false, false, false, false, false, false, false, false, false, false];
    var repetition = [0,0,0,0,0,0,0,0,0,0];
    var increase = true;
    var previousN = -1;
    occurence.toString().split('').forEach(c => {
      var n = parseInt(c);
      if(increase && n == previousN) {
        repetition[n]++;
        if(repetition[n] == 1) hasDouble[n] = true;
        if(repetition[n] > 1) hasDouble[n] = false;
      }
      if(n < previousN) {
        increase = false;
      }
      previousN = n
    });
    if(hasDouble.some(d=>d) && increase) {
      numberOfPasswords++;
    }
  }
  return numberOfPasswords;
}

module.exports = {
  count_passwords
}
