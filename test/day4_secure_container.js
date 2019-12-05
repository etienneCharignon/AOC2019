const expect = require('expect.js');
const {
  count_passwords
} = require('../secure_container.js');

describe('Day4: Secure container', function () {

  it('count the number of occurences in the range full of password', function () {
    expect(count_passwords([123556,123557])).to.be(2);
  });

  it('count only occurences with doubles', function () {
    expect(count_passwords([123455,123456])).to.be(1);
  });

  it('count only occurences with increasing diggits', function () {
    expect(count_passwords([125565,125566])).to.be(1);
  });

  it('count only occurences with at lease one multiple of only two', function () {
    expect(count_passwords([125554,125555])).to.be(0);
  });


  it('find the solution', function () {
    expect(count_passwords([231832,767346])).to.be(876);
  });
});
