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
	 //FIXME: 判断矩阵列是否一致
	 if(len){
		 //FIXME: 
	 }
	 
	 switch(type){
		 case 'row':
			 return matrix.map((v, i, a)=>average(v));
		 case 'column':
			 return columnAverage();
		 case 'global':
			 return matrix.reduce((p, v, i, a)=>p+average(v), 0)/len;
		 default :
			 throw new RangeError('type value must be row|column|global');
	 }
	 
	 function columnAverage(){
		 let sum_arr = [];
		 matrix[0].forEach((val, index, arr)=>{
			 matrix.forEach((v, i, a)=>{
				 i === 0 ? sum_arr[index] = v[index] : sum_arr[index] += v[index];
			 });
			 sum_arr[index] /= matrix.length;
		 })
		 return sum_arr;
	 }
	 
 }
 
 
/**
 * compute array average
 * 数组求平均值
 * @param {Array} arr 待求数组
 * @param {Number} [start=0] 数组中求平均值的起始位置
 * @return {Number}
 */
function average(arr, start = 0){
  if(!Array.isArray(arr) && Number.isInteger(start)){
		throw new TypeError('argument type is illeagl');
  }

	let sum = 0, 
			leaglLength = arr.length - start;

	for(let i = start, len = arr.length; i<len; i++){
		typeof arr[i] === 'number' && !isNaN(arr[i]) ? sum += arr[i] : leaglLength-- ;
	}

	return sum/leaglLength;

}


/**
 * 数组累加
 * @param {Array} arr 将累加的数组
 * @param {Array} sum 之前累积总量
 * @param {Array} count 每个值的累加次数
 * @param {Number} [start=0] 数组中参与累加的起始位置
 * bug: 没有检查参数合法性
 */
function cumulate(arr, sum, count, start = 0){
  arr.forEach((val, index, arr)=>{
    if(val === ''){
      return ;
    }

    count[index]++;
    sum[index] = index>=start ? sum[index] + Number(val) : val ;
  });
}

/**
 * 数组除法
 */
 function divide(arr, count){
	 
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
