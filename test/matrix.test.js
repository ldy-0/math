const Matrix = require('../src/matrix');
const assert = require('assert');

const average = Matrix.average;

describe('Matrix', ()=>{
	
	describe('# Matrix.average', ()=>{
		it('should return 22 when value is [11, 22, 33]', ()=>{
			assert.equal(average([11,22,33]), 22);
		});
		it('should return 2 when value is [\'a\', 1, 2, 3],1', ()=>{
			assert.equal(average(['a', 1, 2, 3], 1), 2);
		});
		it('should return 2 when value is ["a", 1, 2, 3], "a", 1', ()=>{
			assert.equal(average([1, 2, 3, 4], 'a', 1), 3);
		});
		it('should return [11, 22, 2] when value is [22, 22, 22],[2, 1, 11]', ()=>{
			assert.deepEqual(average([22, 22, 22], [2, 1, 11]), [11, 22, 2]);
		});
		
	});

});
