const assert = require('assert');
const Matrix = require('../src/matrix');

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
		//row average
		it('should return [22, 5] when value is [[22, 22, 22],[2, 2, 11]]', ()=>{
			assert.deepEqual(average([ [22, 22, 22], [2, 2, 11] ], 'row'), [22, 5]);
		});
		//global average
		it('should return 11.5 when value is [[22, 22, 22], [2, 2, 11]]', ()=>{
			assert.equal(average([ [22, 22, 22], [2, 1, 0] ]), 11.5);
		});
		//column average
		it('should return [1.5,2.5,3.5,4.5] when value is [ [1,2,3,4], [2,3,4,5] ]', ()=>{
			assert.deepEqual(average([ [1,2,3,4], [2,3,4,5] ], 'column'), [1.5,2.5,3.5,4.5]);
		});
		
	});

});
