const assert = require('assert');
const Matrix = require('../src/matrix');

const average = Matrix.average;
const cumulate = Matrix.cumulate;

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
		let matrix = [[1,2], [1,2,3,4], 5, [], 'aaaaaa', [1,2,3,4,5]  ];
		
		Matrix.normalize(matrix);
		
		it('matrix is [ [1, 2, null, null, null ],[1, 2, 3, 4, null ],[null, null, null, null, null ],[1, 2, 3, 4, 5 ] ]', 
		()=>assert.deepEqual(matrix, [ [1, 2, null, null, null ],
																	 [1, 2, 3, 4, null ],
																	 [5, null, null, null, null],
																	 [null, null, null, null, null ],
																	 [1, 2, 3, 4, 5 ] ]) ); 
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
	});
	
});
