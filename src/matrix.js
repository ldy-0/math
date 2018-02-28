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
 * compute array average
 * 数组求平均值
 *   1.省略count参数，表示求arr数组的平均数
 *   2.有count参数且为数组，表示求arr中每个值的平均数arr[i]/count[i]
 * @param {Array} arr 待求数组
 * @param {Array} [count] 对应arr中每个值的次数
 * @param {Number} [start=0] 数组中求平均值的起始位置
 * @return {Array}
 * TODO: 求列平均未测试
 */
Matrix.average = function(arr, count, start = 0){
  if(!Array.isArray(arr)){
		throw new TypeError('第一个参数必须为数组');
  }

  // compute array average 求数组平均值
  if(!Array.isArray(count)){
    let sum = 0,
				s = Number.isInteger(count) ? count : (Number.isInteger(start) ? start : 0 ), 
        leaglLength = arr.length - s;

    for(let i = s, len = arr.length; i<len; i++){
      typeof arr[i] === 'number' && !isNaN(arr[i]) ? sum += arr[i] : leaglLength-- ;
    }

    return sum/leaglLength;
  }

  return arr.map((val, index, arr)=>{
    return index >= start ? (val !== 0 ? val/count[index] : '') : val ;
  });
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
