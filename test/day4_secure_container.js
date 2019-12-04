const expect = require('expect.js');
const {
  count_passwords
} = require('../secure_container.js');

describe.only('Day4: Secure container', function () {

  it('count the number of occurences in the range full of password', function () {
    expect(count_passwords([555556,555557])).to.be(2);
  });

  it('count only occurences with doubles', function () {
    expect(count_passwords([123455,123456])).to.be(1);
  });

  it('count only occurences with increasing diggits', function () {
    expect(count_passwords([125565,125566])).to.be(1);
  });


  it('find the solution', function () {
    expect(count_passwords([231832,767346])).to.be(1330);
  });
});
