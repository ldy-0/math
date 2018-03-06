/**
 * @author Yuan
 * @module Matrix
 */
 
 'use strict';
 
/**
 * @constructor Matrix
 */
 /* function Matrix(){
	 
	 
 } */
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
	 Matrix.normalize(matrix);
	 
	 return dispatchOperate(type, 
										//row average handle
										function(){return matrix.map((v, i, a)=>average(v));},
										columnAverage,
										function(){return matrix.reduce((p, v, i, a)=>p+average(v), 0)/len;});
										
	 //column average handle
	 function columnAverage(){
		 let sum_arr = new Array(matrix[0].length).fill(0);
		 matrix[0].forEach((val, index, arr)=>{
			 let count = 0;
			 matrix.forEach((v, i, a)=>{
				 //i === 0 ? sum_arr[index] = v[index] : sum_arr[index] += v[index];
				 typeof v[index] !== 'number' || isNaN(v[index]) ? count++ : sum_arr[index] += v[index] ;
			 });
			 sum_arr[index] /= (matrix.length-count);
		 })
		 return sum_arr;
	 }
	 
 }
 
 
/**
 * matrix normalize [ [1], [1,2] ] -> [ [1,0], [1,2] ]
 * 矩阵标准化
 * 1.每行元素个数相同，不够的补null
 * 2.matrix[i]为数字时，改为数组，不是数组或数字类型时删除元素
 * @param {Array} matrix
 */
 Matrix.normalize = function(matrix){
	 let max_len = 0;
	 
	 for(let i = matrix.length-1; i>=0; i--){
		 let val = matrix[i];
		 
		 if(typeof val === 'number'){
			 val = matrix[i] = [val];
		 }
		 
		 if(!Array.isArray(val)){
			 matrix.splice(i, 1);
		 }
		 
		 max_len = matrix[i].length >= max_len ? matrix[i].length : max_len;
	 };
	 //fix matrix
	 matrix.forEach((val, index, arr)=>{
		 for(let i = val.length; i<max_len; val[i++] = null) /* empty */;
	 });
 }
 
 
/**
 * 
 */


/**
 * 矩阵累加
 * @param {Array} martix 待加矩阵
 * @param {Array} arr 做加数的数组
 * @param {String} [type='global'] 相加类型
 * @param {Number} [start=0] 数组中参与累加的起始位置
 * @return {Array}
 * bug: 没有检查参数合法性
 */
Matrix.cumulate = function(matrix, arr, type = 'global', start = 0){
  //TODO:
	return dispatchOperate(type, 
									//row cumulate handle
									function(){return matrix.map((v)=>cumulate(v, arr));}, columnCumulate);
	
	
	//column cumulate handle
	function columnCumulate(){
		if(matrix.length !== arr.length){
			throw new RangeError('matrix column length !== array length');
		}
		
		return matrix.map((row, index, a)=>row.map((v, i)=>v+arr[index]) );
	}
	
}


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
 * array cumulate
 * 数组累加
 * @param {Array} main_arr 待加数组
 * @param {Array} add_arr 做被加数的数组
 * @return {Array}
 * @inner
 */
 function cumulate(main_arr, add_arr){
	 if(!Array.isArray(main_arr) || !Array.isArray(add_arr)){
		 throw new TypeError('The parameter type must be an Array');
	 }
	 
	 if(main_arr.length !== add_arr.length){
		 throw new RangeError('The length of the two array must be the same');
	 }
	 //TODO: 判断数组元素
	 return main_arr.map((val, index, arr)=>val+add_arr[index]);
 }
//console.log(cumulate([1,2,3], [1,2,3]));

/**
 * FIXME: 数组除法
 */
 function divide(arr, count){
	 //FIXME:  matrix divide
 }

/**
 * dispatch Operate
 * 分发操作
 * @param {String} type
 * @param {Function} rowOperate
 * @param {Function} columnOperate
 * @return {Array}
 */
 function dispatchOperate(type, rowOperate, columnOperate, globalOperate){
	 if(!typeof rowOperate === 'function' && 
				!typeof columnOperate === 'function'){
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
