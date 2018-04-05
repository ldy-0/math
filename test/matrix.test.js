const assert = require('assert');
const Matrix = require('../lib/matrix');


const add = Matrix.add;
const minus = Matrix.minus;
const times = Matrix.times;
const divide = Matrix.divide;
//
const average = Matrix.average;

describe('Matrix', ()=>{
	
	describe('# 矩阵格式', ()=>{
		describe('# Matrix.toNumber', ()=>{
			let matrix = ['1', 2, "3", , '', ' '];
			it('Matrix.toNumber(matrix) should return [1,2,3,null,0,0]', ()=>{
				assert.deepEqual(Matrix.toNumber(matrix), [1,2,3,null,0,0]);
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
		
	});
	
	
	
	/* arithmetic */
	
	describe('\n # 一维矩阵四则运算: \n\t matrix:[1,2,3,4,5]\n\t arr:[1.1,2.2,3.3,4.4,5.5]', ()=>{
		let matrix = [1,2,3,4,5],
				arr = [1.1,2.2,3.3,4.4,5.5];
		
		describe('## Matrix.add', ()=>{
			it('add(matrix, arr, \'row\') should return [2.1,4.2,6.3,8.4,10.5]', ()=>{
				assert.deepEqual(add(matrix, arr, 'row'), [2.1,4.2,6.3,8.4,10.5]);
			});
		});
		describe('## Matrix.minus', ()=>{
			it('minus(matrix, arr, \'row\') should return [-0.1, -0.2, -0.3, -0.4, -0.5]', ()=>{
				assert.deepEqual(minus(matrix, arr, 'row'), [-0.1, -0.2, -0.3, -0.4, -0.5]);
			});
		});
		describe('## Matrix.times', ()=>{
			it('times(matrix, arr, \'row\') should return [1.1, 4.4, 9.9, 17.6, 27.5]', ()=>{
				assert.deepEqual(times(matrix, arr, 'row'), [1.1, 4.4, 9.9, 17.6, 27.5]);
			});
		});
		describe('## Matrix.divide', ()=>{
			it('divide(matrix, arr, \'row\') should return [0.9090909090909092]', ()=>{
				assert.deepEqual(divide(matrix, arr, 'row'), [0.9090909090909092, 0.9090909090909092, 0.9090909090909092, 0.9090909090909092, 0.9090909090909092]);
			});
		});
		
	});
	
	
	describe('\n# 二维矩阵四则运算', ()=>{
		
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
	
	
	/* 链式调用 */
	
	describe('# 链式调用 \n\t main_arr: [1,2,3,4,5] \n\t arr: [1.1, 2.2, 3.3, 4.4, 5.5]', ()=>{
		let main_arr = [1,2,3,4,5],
				arr = [1.1, 2.2, 3.3, 4.4, 5.5];
				
		it('add(main_arr, arr).add(main_arr).minus(main_arr).times(main_arr).divide(main_arr) should return [2.1, 4.2, 6.3, 8.4, 10.5]', ()=>{
			assert.deepEqual(add(main_arr, arr).add(main_arr).minus(main_arr).times(main_arr).divide(main_arr), [2.1, 4.2, 6.3, 8.4, 10.5]);
		});
	});
	
	
});
