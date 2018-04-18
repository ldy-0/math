/**
 * @author Yuan
 * @copyright 2017
 * @module Matrix
 */
 
 'use strict';
 

 
 const Matrix = {};
 
/**
 *
 * 查找数组/矩阵中指定数量的最小值集合
 * FIXME
 */
 Matrix.min = function(matrix, size = 1, type = 'global'){
	 if(!Array.isArray(matrix))
		 throw new TypeError('The parameter type must be an array');
	 
	 if(typeof matrix[0] === 'number' || matrix[0] === null){
		 return min(matrix, size);
	 }
	 
	 return min(matrix, size);
 }

/**
 *
 * 查找数组/矩阵中指定数量的最大值集合
 * FIXME
 */
 Matrix.max = function(matrix, size = 1, type = 'global'){
	 if(!Array.isArray(matrix))
		 throw new TypeError('The parameter type must be an array');
	 
	 if(typeof matrix[0] === 'number' || matrix[0] === null){
		 return max(matrix, size);
	 }
	 
	 return dispatchOperate(type, function(){return ;});
 }

/**
 *
 * compute matrix average/求矩阵平均值
 *
 * @param {Array} matrix
 * @param {String} [type='global'] 求平均值的类型
 * @param {Integer} [start=0] 		 数组中求平均值的起始位置
 * @return {Number|Array}
 * 1.matrix is one dimensional or type is 'global' return Number
 * 2.type is 'row' or 'column' return Array
 */
 Matrix.average = function(matrix, type = 'global', start = 0){
	 if(Array.isArray(this)){
		 //TODO: start value problem
		 [matrix, type, start] = [this, matrix || type, start];
	 }
	 
	 if(!Array.isArray(matrix))
		 throw new TypeError('The parameter type is illeagl');
	 //one dimensional
	 if(!Array.isArray(matrix[start])){
		 return average(toNumber(matrix), start);
	 }
	 
	 let len = matrix.length;
	 
	 matrix = Matrix.normalize(matrix);
	 
	 return dispatchOperate(type, 
									//row average handle
									() => matrix.map(v => average(v, start)),
									columnAverage,
									//global average handle
									() => matrix.reduce((p, v) => p+average(v, start), 0)/len );
										
	 //column average handle
	 function columnAverage(){
		 let arr = new Array(matrix[0].length).fill(0);
		 
		 matrix[0].forEach((val, i)=>{
			 let leaglLength = matrix.length;
			 
			 matrix.forEach(val => {
				 let v = val[i];
				 
				 typeof v !== 'number' || isNaN(v) ? leaglLength-- : arr[i] += v ;
			 });
			 
			 arr[i] /= leaglLength;
		 })
		 
		 return arr;
	 }
	 
 }
 
/**
 *
 * Modify value modification in different ways in different locations/在不同位置使用不同方式修改值修改
 *
 * @param {Array} matrix
 * @param {Array} splits 	      start position array/不同修改方式的起始索引值集合
 * @param {Array} operates      alter function array/修改函数集合
 * @param {String} [type='row'] alter pattern/修改方式
 * @return {Array}
 */
 Matrix.alter = function(matrix, splits, operates, type = 'row'){
	 if(Array.isArray(this)){
		 [matrix, splits, operates, type] = [this, matrix, splits, operates];
	 }
	 
	 if(typeof splits === 'function'){
		 [splits, operates] = [ [0], [splits] ];
	 }
	 
	 if(!Array.isArray(matrix)||
				!Array.isArray(splits)||
				!Array.isArray(operates)){
		 throw new TypeError('The parameter type must be an Array');
	 }
	 
	 if(!Array.isArray(matrix[0])){
		 return toMatrix(alter(matrix, splits, operates));
	 }
	 
	 if(type === 'column'){
		 return toMatrix(alter(matrix, splits, operates));
	 }
	 
	 return toMatrix(matrix.map(v => alter(v, splits, operates)));
 }
 
/**
 *
 * clone array
 *
 * @param {Boolean} [isDeep=false] set clone type
 * @return {Array}
 */
 Matrix.clone = function(isDeep = false){
	 return isDeep ? cloneArray(this) : this.slice();
 }
 
/**
 * Usage:
 * [ [1], [,2] ] -> [ [1,null], [null,2] ]
 *
 * matrix normalize/矩阵标准化
 * 1.每行元素个数相同，不够的补null
 * 2.matrix[i]为数字时，改为数组，不是数组或数字类型时删除元素
 * 3.matrix[i][j]数字化后为NaN的设为null
 *
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
			 matrix[i][j] = isNaN(Number(row[j])) || row[j] === '' ? null : Number(row[j]);
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
 *
 * matrix add arithmetic/矩阵加运算
 *
 * @param {Array} martix					 被加矩阵
 * @param {Array|Number} addend		 加数
 * @param {String} [type='global'] add pattern
 * @return {Array}
 */
 Matrix.add = function(matrix, addend, type = 'global'){
	 //this -> matrix
	 if(Array.isArray(this)){
		 [matrix, addend, type] = [this, matrix, addend];
	 }
	 
	 if(typeof addend === 'number'){
		 add(matrix, addend);
	 }
	 
	 //handle one dimensional matrix
	 if(typeof matrix[0] === 'number'){
		 return toMatrix(operate());
	 }
  
	 return toMatrix(dispatchOperate(type, 
									//handle row
									function(){return matrix.map((v, i) => add(v, addend));},
									//handle column and global
									operate, operate));
	
	
	 function operate(){
		 if(matrix.length !== addend.length)
			 throw new RangeError('The length of the two array must be the same ');
		
		 return matrix.map((row, i)=> add(row, addend[i]) );
	 }
	
 }

/**
 *
 * matrix minus arithmetic/矩阵减运算
 *
 * @param {Array} matrix
 * @param {Array|Number} subtractor 减数
 * @param {String} [type='global']
 * @return {Array}
 */
 Matrix.minus = function(matrix, subtractor, type='global'){
	 //handle this -> matrix
	 if(Array.isArray(this)){
		 [matrix, subtractor, type] = [this, matrix, subtractor];
	 }
	 
	 if(typeof subtractor === 'number'){
		 return minus(matrix, subtractor);
	 }
	 
	 //handle one dimensional matrix
	 if(typeof matrix[0] === 'number'){
		 return toMatrix(operate());
	 }
	 
	 return toMatrix(dispatchOperate(type, 
											//row handle
											function(){return matrix.map(v => minus(v, subtractor));},
											//column and global handle
											operate, operate));
	
	 function operate(){
		 if( matrix.length !== subtractor.length)
			 throw new RangeError('The length of the two array must be the same');
		
		 return matrix.map((v, i) => minus(v, subtractor[i]));
	 }
	
 }
 
 /**
  *
  * matrix times arithmetic/矩阵乘运算
	*
	* @param {Array} matrix
	* @param {Array|Number} multiplier
	* @param {String} [type='global']
	* @return {Array}
	*/
 Matrix.multiply = Matrix.times = function(matrix, multiplier, type='global'){
	 //handle this -> matrix
	 if(Array.isArray(this)){
		 [matrix, multiplier, type] = [this, matrix, multiplier];
	 }
	 
	 if(typeof multiplier === 'number'){
		 return times(matrix, multiplier);
	 }
	 
	 //handle one dimensional matrix
	 if(typeof matrix[0] === 'number'){
		 return toMatrix(operate());
	 }
	 
	 return toMatrix(dispatchOperate(type,
							//row handle
							function(){return matrix.map(v => times(v, multiplier));},
							//column and global handle
							operate, operate ));
		
	 function operate(){
		 if(matrix.length !== multiplier.length)
			 throw new RangeError('The length of the two array must be the same');
		
		 return matrix.map((v, i) => times(v, multiplier[i]));
	 }
		
 }
	
/**
 *
 * matrix divide arithmetic/阵除运算
 *
 * @param {Array} matrix
 * @param {Array|Number} divisor
 * @param {String} [type='global']
 * @return {Array}
 */
 Matrix.divide = function(matrix, divisor, type='global'){
	 //handle this -> matrix
	 if(Array.isArray(this)){
		 [matrix, divisor, type] = [this, matrix, divisor];
	 }
	 //FIXME: matrix 一维二维
	 if(typeof divisor === 'number'){
		 return divide(matrix, divisor);
	 }
	 
	 //handle one dimensional matrix
	 if(typeof matrix[0] === 'number'){
		 return toMatrix(operate());
	 }
	 
	 return toMatrix(dispatchOperate(type, 
										//row handle
										function(){return matrix.map(v => divide(v, divisor));},
										//column and global handle
										operate, operate));
										
	 function operate(){
		 if(matrix.length !== divisor.length)
			 throw new RangeError('The length of the two array must be the same');
			
		 return matrix.map((v, i) => divide(v, divisor[i]));
	 }
 }
 
 //
 Matrix.toMatrix = toMatrix;
 Matrix.toNumber = toNumber;
 
 
/*************** @private ********************/
 
 
/**
 *
 * Convert to matrix/数组转为矩阵
 *
 * @param {Array} arr
 * @return {Array}
 */
 function toMatrix(arr){
	 arr.__proto__.__proto__ = Matrix;
	 
	 return arr;
 }

/**
 *
 * 查找数组中指定数量的最小值集合
 *
 * @param {Array} arr
 * @param {Number} size 数量
 * @return {Array}
 */
 function min(arr, size = 1){
	 if(!Array.isArray(arr) || !Number.isInteger(size))
		 throw new TypeError('The parameter type is illeagl');

	 let min_arr = new Array(size).fill({value: Infinity});
	 
	 arr.forEach((value, index)=>{
		 if(value < min_arr[0].value){
			 min_arr[0] = { index, value };
		 }
		 
		 for(let i = 0; i<size-1; i++){
			 if(min_arr[i].value < min_arr[i+1].value){
				 [ min_arr[i], min_arr[i+1] ] = [ min_arr[i+1], min_arr[i] ];
			 }
		 }
	 });
	 
	 return min_arr;
 }

/**
 *
 * 查找数组中指定数量的最大值集合
 *
 * @param {Array} arr
 * @param {Number} size 数量
 * @return {Array}
 */
 function max(arr, size = 1){
	 if(!Array.isArray(arr) || !Number.isInteger(size))
		 throw new TypeError('The parameter type is illeagl');

	 let max_arr = new Array(size).fill({value: -Infinity});
	 
	 arr.forEach((value, index)=>{
		 if(value > max_arr[0].value){
			 max_arr[0] = { index, value };
		 }
		 
		 for(let i = 0; i<size-1; i++){
			 if(max_arr[i].value > max_arr[i+1].value){
				 [ max_arr[i], max_arr[i+1] ] = [ max_arr[i+1], max_arr[i] ];
			 }
		 }
	 });
	 
	 return max_arr;
 }

/**
 *
 * compute array average/数组求平均值
 *
 * @param {Array} arr 			 待求数组
 * @param {Number} [start=0] 数组中求平均值的起始位置
 * @return {Number}
 */
function average(arr, start = 0){
  if(!Array.isArray(arr) || !Number.isInteger(start))
		throw new TypeError('The parameter type is illeagl');

	let sum = 0, 
			leaglLength = arr.length - start;

	for(let i = start, len = arr.length; i<len; i++){
		typeof arr[i] === 'number' && !isNaN(arr[i]) ? sum += arr[i] : leaglLength-- ;
	}

	return sum/leaglLength;

}

/**
 *
 * Modify the array/matrix value modification in different ways in different locations/在数组/矩阵不同位置使用不同方式修改值
 *
 * @param {Array} main
 * @param {Array} [splits] start position array/不同修改方式的起始索引值集合
 * @param {Array} operates alter function array/修改函数集合
 * @return {Array}
 */
function alter(main, splits, operates){
  if(typeof splits === 'function'){
    [splits, operates] = [ [0], [splits] ];
  }

  return main.map((val, index) => {
		
    for(let i = 0, len = splits.length; i<len; i++){
      // 匹配相应的处理函数
      if(index >= splits[i] && (i+1 === len ? true : index < splits[i+1]) ){
        return val.map ? val.map(v => operates[i](v)) : operates[i](val);
      }
			
    }
		
  });
	
}

/**
 *
 * number/array cumulate arithmetic/数字/数组加运算
 *
 */
 function add(main, addend){
	 return arithmetic(main, addend, add_minus);
 }
 
/**
 *
 * number/array minus arithmetic/数字/数组减运算
 *
 */
 function minus(main, subtractor){
	 return arithmetic(main, Array.isArray(subtractor) ? subtractor.map(v => -v) : -subtractor , add_minus);
 }

/**
 *
 * number/array times arithmetic/数字/数组乘运算
 *
 */
 function times(main, multiplier){
	 return arithmetic(main, multiplier, multiply);
 }

/**
 *
 * number/array divide arithmetic/数字/数组除运算
 *
 */
 function divide(main, divisor){
	 return arithmetic(main, divisor, div);
 }

/**
 *
 * number/array arithmetic/数字/数组算术运算
 *
 * @param {Number|Array} main		 被操作数
 * @param {Number|Array} operand 操作数
 * @param {Function} operate
 * @return {Number|Array}
 */
 function arithmetic(main, operand, operate){
	 if(!typeof operate === 'function'){
		 throw new TypeError('The parameter type must be an Function');
	 }
	 
	 if(typeof operand === 'number'){
		 return typeof main === 'number' ? operate(main, operand) : main.map(v => operate(v, operand));
	 }
	 
	 if(Array.isArray(main) && Array.isArray(operand) && main.length === operand.length){
		 //TODO: 判断数组元素
		 return main.map((v, i) => operate(v, operand[i]));
	 }
	
	 throw new TypeError('The parameter type is illeagl');
	 
 }
 
 
/**
 *
 * The add/minus operate of the two Number(resolve double precision problem)
 * 数字的加减运算(解决浮点类型准确度问题)
 *
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
 *
 * The multiply operate of the two Number(resolve double precision problem)
 * 数字的乘运算(解决浮点类型准确度问题)
 *
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
 *
 * The divide operate of the two Number(resolve double precision problem)
 * 数字的除运算(解决浮点类型准确度问题)
 *
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
 *
 * dispatch Operate/分发操作
 *
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
 *
 * Deep copy array/深拷贝数组
 *
 * @param {Array} arr
 * @return {Array}
 */
 function cloneArray(arr){
	 let new_arr = [];
	 
	 for(let i = 0, len = arr.length; i<len; i++){
		 let v = arr[i];
		 new_arr[i] = typeof v === 'object' && v !== null ? cloneObject(v) : v;
	 }
	 
	 return new_arr;
 }
 
/**
 * FIXME: Function丢失
 * Deep copy object/深拷贝对象
 *
 * @param {Object|Array} value
 * @return {Object|Array}
 */
 function cloneObject(value){
	 let old_arr = [],
			 //缓存新对象引用
			 new_arr = [];
	 
	 return clone(value);
	 
	 function clone(){
		 if(Array.isArray(value)){
			 return cloneArray(value);
		 }else if(value instanceof Date){
			 return new Date(value);
		 }else if(value instanceof RegExp){
			 return new RegExp(value.source, value.flags);
		 };
		 
		 let obj = {};
		 //循环引用
		 let i = old_arr.indexOf(value);
		 if(i !== -1){
			 return new_arr[i];
		 }
		 old_arr.push(value);
		 new_arr.push(obj);
		 
		 
		 for(let key in value){
			 if(value.hasOwnProperty(key)){
				 let v = value[key];
				 obj[key] = typeof v === 'object' && v !== null ? clone(v) : v;
			 }
		 }
		 
		 return obj;
	 }
	 
 }
 
/**
 * FIXME: this
 * Matrix element value digitization/矩阵元素值数字化
 * undefined, ''转为null
 *
 * @param {Array|Number} matrix
 * @param {Integer} [precision=12]
 * @param {Boolean} [isSimple=true]
 * @return {Array|Number}
 */
 function toNumber(matrix, precision = 12, isSimple = true){
	 if(!Array.isArray(matrix)){
		 return Number(matrix);
	 }
	 
	 if(!Number.isInteger(precision))
		 throw new TypeError('The parameter value must be a Integer');
	 
	 for(let i = 0, len = matrix.length; i < len; i++){
		 let v = matrix[i];
		 /* matrix[i] = v === undefined || v === null || v === '' ? null : (isSimple && isNaN(Number(v)) ? v : Number(v)); */
		 matrix[i] = v == null || v === '' ? null : (isSimple && isNaN(Number(v)) ? v : Number(Number(v).toFixed(precision)));
	 }
	 
	 return matrix;
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
Matrix.countPercent = countPercent;
Matrix.count = count;

/** export **/
module.exports = Matrix;
