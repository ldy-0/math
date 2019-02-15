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

module.exports = {
  formatArray,
  findArray,
  equal,
}