/**
 * @author Yuan
 * @module Matrix
 */
 
 'use strict';
 
/**
 * FIXME: 函数式
 * @constructor Matrix
 */
 //function Matrix(arr){
	 
	 
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
	 //handle one dimensional matrix
	 if(typeof matrix[0] === 'number'){
		 return operate();
	 }
  
	 return dispatchOperate(type, 
									//handle row
									function(){return matrix.map((v, i) => add(v, arr));},
									//handle column and global
									operate, operate);
	
	
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
	 //handle one dimensional matrix
	 if(typeof matrix[0] === 'number'){
		 return operate();
	 }
	 
	 return dispatchOperate(type, 
											//row handle
											function(){return matrix.map(v => minus(v, arr));},
											//column and global handle
											operate, operate);
	
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
 Matrix.times = function(matrix, arr, type='global'){
	 //handle one dimensional matrix
	 if(typeof matrix[0] === 'number'){
		 return operate();
	 }
	 
	 return dispatchOperate(type,
							//row handle
							function(){return matrix.map(v => times(v, arr));},
							//column and global handle
							operate, operate );
		
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
	 //handle one dimensional matrix
	 if(typeof matrix[0] === 'number'){
		 return operate();
	 }
	 
	 return dispatchOperate(type, 
										//row handle
										function(){return matrix.map(v => divide(v, arr));},
										//column and global handle
										operate, operate);
										
	 function operate(){
		 if(matrix.length !== arr.length){
			 throw new RangeError('The length of the two array must be the same');
		 }
			
		 return matrix.map((v, i) => divide(v, arr[i]));
	 }
 }
 
 
/**
 * Convert to matrix
 * FIXME: 转数组为矩阵
 * @param {Array} arr
 * @return {Array}
 */
 function toMatrix(arr){
	 let matrix = {
		 add(add_arr, type){
			 return Matrix.add(this, add_arr, type);
		 },
	 };
	 
	 [arr.__proto__.__proto__, matrix.__proto__] = [matrix, arr.__proto__.__proto__];
	 
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
 * @param {Array|Number} main_arr 待加数组
 * @param {Array|Number} add_arr 做被加数的数组
 * @return {Array}
 * @inner
 */
 function add(main_arr, add_arr){
	 if(typeof add_arr === 'number'){
		 return typeof main_arr === 'number' ? main_arr+add_arr : main_arr.map(v => v+add_arr);
	 }
	 
	 return arithmetic(main_arr, add_arr, (val, index)=>val+add_arr[index]);
 }

 
/**
 * number/array minus arithmetic
 * 数字/数组减运算
 * @param {Array|Number} main_arr
 * @param {Array|Number} minus_arr
 * @return {Array}
 * @inner
 */
 function minus(main_arr, minus_arr){
	 if(typeof minus_arr === 'number'){
		 return typeof main_arr === 'number' ? main_arr-minus_arr : main_arr.map(v => v-minus_arr);
	 }
	 
	 return arithmetic(main_arr, minus_arr, (val, index)=>val-minus_arr[index]);
 }


/**
 * number/array times arithmetic
 * 数字/数组乘运算
 * @param {Array|Number} main_arr
 * @param {Array|Number} times_arr
 * @return {Array}
 * @inner
 */
 function times(main_arr, times_arr){
	 if(typeof times_arr === 'number'){
		 return typeof main_arr === 'number' ? main_arr*times_arr : main_arr.map(v => v*times_arr);
	 }
	 
	 return arithmetic(main_arr, times_arr, (val, index)=>val*times_arr[index]);
 }


/**
 * number/array divide arithmetic
 * 数字/数组除运算
 * @param {Array|Number} main_arr
 * @param {Array|Number} divide_arr
 * @return {Array}
 * @inner
 * TODO: 结果转换精度
 */
 function divide(main_arr, divide_arr){
	 if(typeof divide_arr === 'number'){
		 return typeof main_arr === 'number' ? main_arr/divide_arr : main_arr.map(v => v/divide_arr);;
	 }
	 
	 return arithmetic(main_arr, divide_arr, (val, index)=>val/divide_arr[index]);
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
