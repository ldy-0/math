const arrs = require('.,/src/Array_extend');
const assert = require('assert');

describe('#Array_extend.js', ()=>{
  describe('#arrs.average()', ()=>{
    it('average() should return 2', ()=>{
      assert.strictEqual(average([1,2,3]), 2);
    });
  });
});
