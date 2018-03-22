const assert = require('assert');
const Matrix = require('../lib/matrix');

const average = Matrix.average;
const add = Matrix.add;
const minus = Matrix.minus;
const times = Matrix.times;
const divide = Matrix.divide;

describe('Matrix', ()=>{
	
	describe('# Matrix.average', ()=>{
		it('average([11,22,33]) should return 22', ()=>{
			assert.strictEqual(average([11,22,33]), 22);
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
	
	/* arithmetic */
	
	describe('# 一维矩阵四则运算: ', ()=>{
		let matrix = [1,2,3,4,5];
		describe('## Matrix.add', ()=>{
			it('add(matrix, [11,22,33,44,55]) should return [12,24,36,48,60]', ()=>{
				assert.deepEqual(add(matrix, [11,22,33,44,55]), [12,24,36,48,60]);
			});
		});
		
	});
	
	describe('# 二维矩阵四则运算', ()=>{
		
		describe('# Matrix.add \n\t matrix : [ [1,2], [2,3] ]', ()=>{
			let matrix = [ [1,2], [2,3] ];
			//row
			it('add(matrix, [1,2], \'column\') should return [ [ 2, 4 ], [ 3, 5 ] ]', ()=>{
					assert.deepEqual(add(matrix, [1,2], 'row'), [[2, 4], [3, 5]]);
			});
			//column
			it('add([[1,2], [2,3]], [1,2], \'column\') should return [[2, 3], [4, 5]]', ()=>{
					assert.deepEqual(add(matrix, [1,2], 'column'), [[2, 3], [4, 5]]);
			});
			//global
			it('add([[1,2], [2,3]], [[1,2], [2,3]], \'global\') should return [[2,4], [4,9]]', ()=>{
				assert.deepEqual(add(matrix, [[1,2], [2,3]], 'global'), [[2,4], [4,6]]);
			});
		});
		
		
		describe('# Matrix.minus \n\t matrix : [ [1,2,3], [2,3,4] ]', ()=>{
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
		
		
		describe('# Matrix.times \n\t matrix : [ [1,2,3], [2,3,4] ]', ()=>{
			let matrix = [ [1,2,3], [2,3,4] ];
			//row
			it('times(matrix, [1,2,3], \'row\') should return [[1,4,9], [2,6,12]]', ()=>{
				assert.deepEqual(times(matrix, [1,2,3], 'row'), [[1,4,9], [2,6,12]]);
			});
			//column
			it('times(matrix, [1,2], \'column\') should return [[1,2,3], [4,6,8]]', ()=>{
				assert.deepEqual(times(matrix, [1,2], 'column'), [[1,2,3], [4,6,8]]);
			});
			//global
			it('times(matrix, [[1,2,3], [2,3,4]], \'global\') should return [[1,4,9],[4,9,16]]', ()=>{
				assert.deepEqual(times(matrix, [[1,2,3], [2,3,4]], 'global'), [[1,4,9],[4,9,16]]);
			});
		});
		
		
		describe('# Matrix.divide \n\t matrix:[ [11,22,33], [22,33,42] ]', ()=>{
			let matrix = [ [11,22,33], [22,33,42] ];
			//row
			it('divide(matrix, [1,2,3], \'row\') should return [ [11,11,11], [22,16.5,14] ]', ()=>{
				assert.deepEqual(divide(matrix, [1,2,3], 'row'), [ [11,11,11], [22,16.5,14] ]);
			});
			//column
			it('divide(matrix, [1,2], \'column\') should return [ [11,22,33], [11,16.5,21] ]', ()=>{
				assert.deepEqual(divide(matrix, [1,2], 'column'), [ [11,22,33], [11,16.5,21] ]);
			});
			//global
			it('divide(matrix, [[1,2,3],[4,5,6]], \'global\') should return [ [11,11,11], [5.5,6.6,7] ]', ()=>{
				assert.deepEqual(divide(matrix, [[1,2,3],[4,5,6]], 'global'), [ [11,11,11], [5.5,6.6,7] ]);
			});
		});
		
	});
	
	
	
	/* arithmetic end */
	
	
});
