/**
  * 数组求平均值
  *   1. 省略count参数，表示求sum数组的平均数
  *   2. 有count参数，sum表示总量数组，count表示个数数组，返回值为sum[i]/count[i]数组
  * @param {Array} arr 待求数组
  * @param {Array} [count] 每个值的次数
  * @param {Number} [start=0] 数组中求平均值的起始位置
  * @return {Array}
  */
function average(arr, count, start = 0){
  if(!Array.isArray(arr)){
    throw new TypeError('参数必须为数组.');
  }

  // 求数组平均值
  if(!Array.isArray(count)){
    let ave = 0,
        leaglLength = arr.length;

    for(let i = 0, len = leaglLength; i<len; i++){
      typeof arr[i] === 'number' ? ave += arr[i] : leaglLength-- ;
    }

    return ave/leaglLength;
  }

  return arr.map((val, index, arr)=>{
    return index >= start ? (val !== 0 ? val/count[index] : 0) : val ;
  });;
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
