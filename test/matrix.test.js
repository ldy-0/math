const assert = require('assert');
const Matrix = require('../src/matrix');

const average = Matrix.average;
const cumulate = Matrix.cumulate;
const minus = Matrix.minus;

describe('Matrix', ()=>{
	
	describe('# Matrix.average', ()=>{
		it('average([11,22,33]) should return 22', ()=>{
			assert.equal(average([11,22,33]), 22);
		});
		it('average([\'a\', 1, 2, 3], 1) should return 2', ()=>{
			assert.equal(average(['a', 1, 2, 3], 1), 2);
		});
		it('average([1, 2, 3, 4], \'a\', 1) should return 2 ', ()=>{
			assert.equal(average([1, 2, 3, 4], 'a', 1), 3);
		});
		//row average
		it('average([[22, 22, 22], [2, 2, 11]], \'row\') should return [22, 5]', ()=>{
			assert.deepEqual(average([ [22, 22, 22], [2, 2, 11] ], 'row'), [22, 5]);
		});
		//global average
		it('average([ [22, 22, 22], [2, 1, 0] ]) should return 11.5', ()=>{
			assert.equal(average([ [22, 22, 22], [2, 1, 0] ]), 11.5);
		});
		//column average
		it('average([ [1,2,3,4], [2,3,4,5] ], \'column\') should return [1.5,2.5,3.5,4.5] ', ()=>{
			assert.deepEqual(average([ [1,2,3,4], [2,3,4,5] ], 'column'), [1.5,2.5,3.5,4.5]);
		});
		it('average([ [1,2,3,4], [2,3,4,5] ], \'column\') should return [1.5,2.5,3.5,4.5] ', ()=>{
			assert.deepEqual(average([ [1,2,3,4], [2,3,4] ], 'column'), [1.5,2.5,3.5,4]);
		});
		
	});

	
	describe('# Matrix.normalize', ()=>{
		let matrix = [[1,2], [1,2,3,4], 5, [], 'aaaaaa', [1,,3,4,5] ];
		
		matrix = Matrix.normalize(matrix);
		
		it('matrix is \
												[ \
													[1, 	 2, 	 null, null, null ],\
													[1, 	 2, 	 3, 	 4, 	 null ],\
													[null, null, null, null, null ],\
													[1, 	 null, 3, 	 4, 	 5 ]\
												]', 
		()=>assert.deepEqual(matrix, [ [1, 2, null, null, null ],
																	 [1, 2, 3, 4, null ],
																	 [5, null, null, null, null],
																	 [null, null, null, null, null ],
																	 [1, null, 3, 4, 5 ] ]) ); 
	});
	
	
	describe('# Matrix.cumulate', ()=>{
		let matrix = [ [1,2], [2,3] ];
		//row
		it('cumulate([[1,2], [2,3]], [1,2], \'column\') should return [ [ 2, 4 ], [ 3, 5 ] ]', ()=>{
				assert.deepEqual(cumulate(matrix, [1,2], 'row'), [[2, 4], [3, 5]]);
		});
		//column
		it('cumulate([[1,2], [2,3]], [1,2], \'column\') should return [[2, 3], [4, 5]]', ()=>{
				assert.deepEqual(cumulate(matrix, [1,2], 'column'), [[2, 3], [4, 5]]);
		});
		//global
		it('cumulate([[1,2], [2,3]], [[1,2], [2,3]], \'global\') should return [[2,4], [4,9]]', ()=>{
			assert.deepEqual(cumulate(matrix, [[1,2], [2,3]], 'global'), [[2,4], [4,6]]);
		});
	});
	
	
	describe('# Matrix.minus', ()=>{
		let matrix = [ [1,2,3], [2,3,4] ];
		//row
		it('minus(matrix, [1,2,3], \'row\') should return [[0,0,0],[1,1,1]]', ()=>{
			assert.deepEqual(minus(matrix, [1,2,3], 'row'), [[0,0,0],[1,1,1]]);
		});
		//column
		it('minus(matrix, [1,2], \'column\') should return [[0,1,2], [0,1,2]]', ()=>{
			assert.deepEqual(minus(matrix, [1,2], 'column'), [[0,1,2], [0,1,2]]);
		});
		//global
		it('minus(matrix, [[0,1,2], [1,2,3]], \'global\') should return [[1,1,1], [1,1,1]]', ()=>{
			assert.deepEqual(minus(matrix, [[0,1,2], [1,2,3]], 'global'), [[1,1,1], [1,1,1]]);
		});
		
	});
	
	
});
