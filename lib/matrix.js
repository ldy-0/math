/**
 * @author Yuan
 * @module Matrix
 */
 
 'use strict';
 
/**
 * FIXME: 函数式
 * @constructor Matrix
 */
 //function M(arr){
	 
	 
 //}
 
 const Matrix = {};
 
/**
 * compute matrix average
 * 求矩阵平均值
 * @param {Array} matrix
 * @param {String} [type='global'] 求平均值的类型
 * @param {Integer} [start=0] 数组中求平均值的起始位置
 * @return {Number|Array}
 * 1.matrix=[1,2] or type='global' return Number
 * 2.type='row' or type='column' return Array
 */
 Matrix.average = function(matrix, type = 'global', start = 0){
	 if(!Array.isArray(matrix)){
		 throw new TypeError('argument type is illeagl');
	 }
	 
	 if(!Array.isArray(matrix[0])){
		 return average(matrix, Number.isInteger(start) ? start : Math.round(start));
	 }
	 
	 let len = matrix.length;
	 matrix = Matrix.normalize(matrix);
	 
	 return dispatchOperate(type, 
										//row average handle
										function(){return matrix.map((v, i)=>average(v));},
										columnAverage,
										//global average handle
										function(){return matrix.reduce((p, v, i)=>p+average(v), 0)/len;});
										
	 //column average handle
	 function columnAverage(){
		 let sum_arr = new Array(matrix[0].length).fill(0);
		 
		 matrix[0].forEach((val, index, arr)=>{
			 let count = 0;
			 matrix.forEach((v, i, a)=>{
				 //i === 0 ? sum_arr[index] = v[index] : sum_arr[index] += v[index];
				 let cell = v[index];
				 typeof cell !== 'number' || isNaN(cell) ? count++ : sum_arr[index] += cell ;
			 });
			 sum_arr[index] /= (matrix.length-count);
		 })
		 
		 return sum_arr;
	 }
	 
 }
 
 
//
 Matrix.toNumber = toNumber;
 
 
/**
 * TODO: clone
 */
 
 
/**
 * Usage:
 * [ [1], [,2] ] -> [ [1,null], [null,2] ]
 *
 * matrix normalize
 * 矩阵标准化
 * 1.每行元素个数相同，不够的补null
 * 2.matrix[i]为数字时，改为数组，不是数组或数字类型时删除元素
 * 3.matrix[i][j]数字化后为NaN的设为null
 * @param {Array} matrix
 * @return {Array}
 */
 Matrix.normalize = function(matrix){
	 let max_len = 0;
	 
	 for(let i = matrix.length-1; i>=0; i--){
		 let row = matrix[i],
				 len;
		 
		 if(typeof row === 'number'){
			 row = matrix[i] = [row];
		 }
		 
		 if(!Array.isArray(row)){
			 matrix.splice(i, 1);
			 continue;
		 }
		 
		 len = row.length;
		 
		 for(let j = 0; j<len; j++){
			 matrix[i][j] = isNaN(Number(row[j])) ? null : Number(row[j]);
		 }
		 
		 max_len = len > max_len ? len : max_len;
	 };
	 //fix matrix
	 matrix.forEach((val, index, arr)=>{
		 for(let i = val.length; i<max_len; val[i++] = null) /* empty */;
	 });
	 
	 return matrix
 }
 


/**
 * matrix add arithmetic
 * 矩阵加运算
 * @param {Array} martix 待加矩阵
 * @param {Array} arr 做加数的数组
 * @param {String} [type='global'] 相加类型
 * @return {Array}
 */
 Matrix.add = function(matrix, arr, type = 'global'){
	 //handle this -> matrix
	 if(Array.isArray(this)){
		 [matrix, arr, type] = [this, matrix, arr];
	 }
	 
	 //handle one dimensional matrix
	 if(typeof matrix[0] === 'number'){
		 return toMatrix(operate());
	 }
  
	 return toMatrix(dispatchOperate(type, 
									//handle row
									function(){return matrix.map((v, i) => add(v, arr));},
									//handle column and global
									operate, operate));
	
	
	 function operate(){
		 if(matrix.length !== arr.length){
			 throw new RangeError('The length of the two array must be the same ');
		 }
		
		 return matrix.map((row, i)=> add(row, arr[i]) );
	 }
	
 }


/**
 * matrix minus arithmetic
 * 矩阵减运算
 * @param {Array} matrix
 * @param {Array} arr
 * @param {String} [type='global']
 * @return {Array}
 */
 Matrix.minus = function(matrix, arr, type='global'){
	 //handle this -> matrix
	 if(Array.isArray(this)){
		 [matrix, arr, type] = [this, matrix, arr];
	 }
	 
	 //handle one dimensional matrix
	 if(typeof matrix[0] === 'number'){
		 return toMatrix(operate());
	 }
	 
	 return toMatrix(dispatchOperate(type, 
											//row handle
											function(){return matrix.map(v => minus(v, arr));},
											//column and global handle
											operate, operate));
	
	 function operate(){
		 if(matrix.length !== arr.length){
			 throw new RangeError('The length of the two array must be the same');
		 }
		
		 return matrix.map((v, i) => minus(v, arr[i]));
	 }
	
 }
 
 
 /**
  * matrix times arithmetic
	* 矩阵乘运算
	* @param {Array} matrix
	* @param {Array} arr
	* @param {String} [type='global']
	* @return {Array}
	*/
 Matrix.multiply = Matrix.times = function(matrix, arr, type='global'){
	 //handle this -> matrix
	 if(Array.isArray(this)){
		 [matrix, arr, type] = [this, matrix, arr];
	 }
	 
	 //handle one dimensional matrix
	 if(typeof matrix[0] === 'number'){
		 return toMatrix(operate());
	 }
	 
	 return toMatrix(dispatchOperate(type,
							//row handle
							function(){return matrix.map(v => times(v, arr));},
							//column and global handle
							operate, operate ));
		
	 function operate(){
		 if(matrix.length !== arr.length){
			 throw new RangeError('The length of the two array must be the same');
		 }
		
		 return matrix.map((v, i) => times(v, arr[i]));
	 }
		
 }
	
	
/**
 * matrix divide arithmetic
 * 矩阵除运算
 * @param {Array} matrix
 * @param {Array} arr
 * @param {String} [type='global']
 * @return {Array}
 */
 Matrix.divide = function(matrix, arr, type='global'){
	 //handle this -> matrix
	 if(Array.isArray(this)){
		 [matrix, arr, type] = [this, matrix, arr];
	 }
	 
	 //handle one dimensional matrix
	 if(typeof matrix[0] === 'number'){
		 return toMatrix(operate());
	 }
	 
	 return toMatrix(dispatchOperate(type, 
										//row handle
										function(){return matrix.map(v => divide(v, arr));},
										//column and global handle
										operate, operate));
										
	 function operate(){
		 if(matrix.length !== arr.length){
			 throw new RangeError('The length of the two array must be the same');
		 }
			
		 return matrix.map((v, i) => divide(v, arr[i]));
	 }
 }
 
 
/**
 * Convert to matrix
 * 数组转为矩阵
 * @param {Array} arr
 * @return {Array}
 */
 function toMatrix(arr){
	 arr.__proto__.__proto__ = Matrix;
	 
	 return arr;
 }
 
 
 
 /**************************/


/**
 * compute array average
 * 数组求平均值
 * @param {Array} arr 待求数组
 * @param {Number} [start=0] 数组中求平均值的起始位置
 * @return {Number}
 * @inner
 */
function average(arr, start = 0){
  if(!Array.isArray(arr) && Number.isInteger(start)){
		throw new TypeError('The parameter type is illeagl');
  }

	let sum = 0, 
			leaglLength = arr.length - start;

	for(let i = start, len = arr.length; i<len; i++){
		typeof arr[i] === 'number' && !isNaN(arr[i]) ? sum += arr[i] : leaglLength-- ;
	}

	return sum/leaglLength;

}

/**
 * number/array cumulate arithmetic
 * 数字/数组加运算
 * @param {Array|Number} main 待加数字/数组
 * @param {Array|Number} add 做被加数的数字/数组
 * @return {Array}
 */
 function add(main, add){
	 if(typeof add === 'number'){
		 return typeof main === 'number' ? add_minus(main, add) : main.map(v => add_minus(v, add));
	 }
	 
	 return arithmetic(main, add, (v, i) => add_minus(v, add[i]));
	 
 }
 
 
/**
 * number/array minus arithmetic
 * 数字/数组减运算
 * @param {Array|Number} main
 * @param {Array|Number} minus
 * @return {Array}
 */
 function minus(main, minus){
	 if(typeof minus === 'number'){
		 return typeof main === 'number' ? add_minus(main, -minus) : main.map(v => add_minus(v, -minus));
	 }
	 
	 return arithmetic(main, minus, (v, i)=>add_minus(v, -minus[i]));
 }


/**
 * number/array times arithmetic
 * 数字/数组乘运算
 * @param {Array|Number} main
 * @param {Array|Number} times
 * @return {Array}
 */
 function times(main, times){
	 if(typeof times === 'number'){
		 return typeof main === 'number' ? multiply(main, times) : main.map(v => multiply(v, times));
	 }
	 
	 return arithmetic(main, times, (v, i)=> multiply(v, times[i]));
 }


/**
 * number/array divide arithmetic
 * 数字/数组除运算
 * @param {Array|Number} main
 * @param {Array|Number} divide
 * @return {Array}
 * TODO: 结果转换精度
 */
 function divide(main, divide){
	 if(typeof divide === 'number'){
		 return typeof main === 'number' ? div(main, divide) : main.map(v => div(v, divide));
	 }
	 
	 return arithmetic(main, divide, (v, i) => div(v, divide[i]));
 }
 
 
/**
 * array arithmetic
 * 数组算术运算
 * @param {Array} main_arr
 * @param {Array} operate_arr
 * @param {Function} operate
 * @return {Array}
 * @inner
 */
 function arithmetic(main_arr, operate_arr, operate){
	 if(!Array.isArray(main_arr) || 
			!Array.isArray(operate_arr) ||
			!typeof operate === 'function'){
		 throw new TypeError('The parameter type must be an Array');
	 }
	 
	 if(main_arr.length !== operate_arr.length){
		 throw new RangeError('The length of the two array must be the same');
	 }
	 //TODO: 判断数组元素
	 return main_arr.map(operate);
 }
 
 
/**
 * The add/minus operate of the two Number(resolve double precision problem)
 * 数字的加减运算(解决双精度问题)
 * @param {Number} nub1 
 * @param {Number} nub2
 * @return {Number}
 */
 function add_minus(nub1, nub2){
	 let len1, len2, m;
	 
	 try{len1 = nub1.toString().split('.')[1].length;}catch(e){len1 = 0;}
	 try{len2 = nub2.toString().split('.')[1].length;}catch(e){len2 = 0;}
	 m = 10**Math.max(len1, len2);
	 
	 return (nub1*m+nub2*m)/m;
 }
 
 
/**
 * The multiply operate of the two Number(resolve double precision problem)
 * 数字的乘运算(解决双精度问题)
 * @param {Number} nub1 
 * @param {Number} nub2
 * @return {Number}
 */
 function multiply(nub1, nub2){
	 let str1 = nub1.toString(), 
			 str2 = nub2.toString(), 
			 m = 0;
	 
	 try{m += str1.split('.')[1].length}catch(e){}
	 try{m += str2.split('.')[1].length}catch(e){}
	 
	 return Number(str1.replace('.', ''))*Number(str2.replace('.', ''))/10**m;
 }
 
 
/**
 * The divide operate of the two Number(resolve double precision problem)
 * 数字的除运算(解决双精度问题)
 * @param {Number} nub1 
 * @param {Number} nub2
 * @return {Number}
 * FIXME: 无限循环小数准确度问题
 */
 function div(nub1, nub2){
	 let str1 = nub1.toString(), 
			 str2 = nub2.toString(), 
			 len1  = 0, len2 = 0;
	 
	 try{len1 = str1.split('.')[1].length}catch(e){}
	 try{len2 = str2.split('.')[1].length}catch(e){}
	 
	 return multiply(Number(str1.replace('.', ''))/Number(str2.replace('.', '')), 10**(len2-len1));
 }
 


/**
 * dispatch Operate
 * 分发操作
 * @param {String} type
 * @param {Function} rowOperate
 * @param {Function} columnOperate
 * @param {Function} globalOperate
 * @return {Array}
 */
 function dispatchOperate(type, rowOperate, columnOperate, globalOperate){
	 if(!typeof rowOperate === 'function' && 
				!typeof columnOperate === 'function' &&
				!typeof globalOperate === 'function'){
		 throw new TypeError('The parameter type must be a function');
	 }
	 
	 switch(type){
		case 'row':
			return rowOperate();
		case 'column':
			return columnOperate();
		case 'global':
			return globalOperate();
		default :
			throw new RangeError('type parameter must be "row" or "column" or "global" ');
	 }
 }
 
 
/**
 * 矩阵元素类型转换
 * undefined转为null
 * @param {Array|Number} matrix
 * @return {Array|Number}
 */
 function toNumber(matrix){
	 if(!Array.isArray(matrix)){
		 return Number(matrix);
	 }
	 
	 for(let i = 0, len = matrix.length; i < len; i++){
		 matrix[i] = matrix[i] === undefined ? null : Number(matrix[i]);
	 }
	 
	 return matrix;
 }
 

/**
 * 不同位置使用不同方式修改数组值
 * @param {Array} arr 待修改的数组
 * @param {Array} [dash] 数组中不同修改方式的起始位置集合
 * @param {Array} callback 修改函数集合
 * @return {Array}
 */
function alter(arr, dash, ...callback){
  if(typeof dash === 'Function'){
    callback = [dash];
    dash = [0];
  }

  return arr.map((val, index, arr)=>{
    for(let i = 0, len = dash.length; i<len; i++){
      // 匹配相应的处理函数
      if(index >= dash[i] && (i+1 === len ? true : index < dash[i+1]) ){
        return callback[i](val);
      }
    }
  });
}


/**
 * 统计arr中各值占百分比
 * @param {Array} arr 待统计数组
 * @param {String} [type='percent'] 输出值类型，percent表示百分比，decimal表示小数。
 * bug: 不能设置精确度
 */
function countPercent(arr, type = 'percent'){
  if(!Array.isArray(arr)){
    throw new TypeError('参数必须是数组');
  }

  let sum;

  sum = arr.reduce((pre, val, index, arr)=>{
    if(isNaN(Number(val))){
      throw new TypeError('数组值必须为数字类型');
    }
    return pre += Number(val);
  }, 0);

  return arr.map((val, index, arr)=>{
    return type === 'decimal' ? Number(val)/sum : Math.round( Number(val)/sum*100 );
  });
}


/**
 * 统计arr在count规定的区间中的分布情况
 * @param {Array} arr 数据数组
 * @param {Array} intervals 区间数组,数组最后必须为Infinity
 * @param {Object}
 */
function count(arr, intervals){
  let obj = {};

  arr.forEach((val, index, arr)=>{
    let v = Number(val);

    for(let i = 1, len = intervals.length; i<len; i++){
      if(v>=intervals[i-1] && v<intervals[i]){
        obj[intervals[i-1]+'-'+intervals[i]] ? obj[intervals[i-1]+'-'+intervals[i]]++ : obj[intervals[i-1]+'-'+intervals[i]] = 1 ;
        break;
      }

    }
  });
  return obj;
}


/**
 * export
 */
module.exports = Matrix;
