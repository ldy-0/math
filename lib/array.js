/**
 * 
 * format arr Array
 * @param {Array} arr 
 * @param {Array} arr2 
 */ 
function formatArray(arr, arr2){

  arr.forEach((v, index) => {
    let list;

    if(index === 0) return v.list = arr2.map(v => 0);

    list = arr[index - 1].list.slice();

    // set list
    for(let i = arr2.length - 1; i >= 0; i--){

      if(list[i] < arr2[i].length - 1){
        list[i]++;
        break;
      }

      list[i] = 0;
    }

    v.list = list;

  });

  return arr;

}

function findArray(arr, arr2){

  return arr.map((v, i) => {
    return equal(v, arr2) ? i : -1;
  }).filter(v => v !== -1); 

}

/**
 * 
 * 比较arr数组是否相似于arr2
 * @param {Array} arr 
 * @param {Array} arr2 
 */
function equal(arr, arr2){
  let isEqual = true;

  for(let i = arr2.length - 1; i >= 0; i--){
    if(arr2[i] !== -1 && arr[i] !== arr2[i]){
      isEqual = false;
    }
  }

  return isEqual;
}

function getArray(integer, arr){
  //TODO: no integer
  let maxLen,
      len,
      new_arr = arr.map(v => 0);

  arr.forEach((v, i) => {

    for(let index = 0, L = v.length; index < L; index++){
      len = arr.slice(i + 1).reduce((pre, val) => pre * val.length, 1); 

      if(integer > len){
        integer -= len;
        continue;
      }

      new_arr[i] = index;
      integer = integer % len;
      // console.error('index', i, len, integer, new_arr[i]);
      break;
    };
    
  });

  return new_arr;
}

module.exports = {
  formatArray,
  findArray,
  equal,
  getArray,
}