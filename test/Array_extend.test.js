const average = require('../src/Array_extend').average;
const assert = require('assert');

describe('Array_extend.js', ()=>{
  describe('#arrs.average()', ()=>{
    it('average() should return 2', ()=>{
      assert.strictEqual(2, average([1,2,3]));
    });
  });
});
