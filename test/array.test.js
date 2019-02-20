const Arr = require('../lib/array');

test('recursion checking each field.', function(){ 
  expect({name: 1}).toEqual({name: 1});
});

// Arr.equal
test('[0, 0, 0] alike [-1, 0, -1]', () =>{ expect(Arr.equal([0, 0, 0], [-1, 0, -1])).toBe(true); });
test('[0, 1, 1] alike [-1, 0, -1]', () => { expect(Arr.equal([0, 1, 1], [-1, 0, -1])).toBe(false); });

// Arr.findArray
let a = [ [ 0, 0, 0 ],
          [ 0, 0, 1 ],
          [ 0, 1, 0 ],
          [ 0, 1, 1 ],
          [ 0, 2, 0 ],
          [ 0, 2, 1 ],
          [ 1, 0, 0 ],
          [ 1, 0, 1 ],
          [ 1, 1, 0 ],
          [ 1, 1, 1 ],
          [ 1, 2, 0 ],
          [ 1, 2, 1 ] ]; 

test('[-1, 0, -1] findArray is [0, 1, 6, 7]', () => { expect(Arr.findArray(a, [-1, 0, -1])).toEqual([0, 1, 6, 7]); });
test('[-1, 1, 0] findArray is [2, 8]', () => { expect(Arr.findArray(a, [-1, 1, 0])).toEqual([2, 8]); });
test('[1, 2, 0] findArray is [10]', () => { expect(Arr.findArray(a, [1, 2, 0])).toEqual([10]); });

// Arr.formatArray
test('formatArray', function(){

  let goods = [
    { id: 1, name: 's-red-10cm' },
    { id: 2, name: 's-red-20cm' },
    { id: 3, name: 's-blue-10cm' },
    { id: 4, name: 's-blue-20cm' },
    { id: 5, name: 's-green-10cm' },
    { id: 6, name: 's-green-20cm' },
    { id: 7, name: 'xs-red-10cm' },
    { id: 8, name: 'xs-red-20cm' },
    { id: 9, name: 'xs-blue-10cm' },
    { id: 10, name: 'xs-blue-20cm' },
    { id: 11, name: 'xs-green-10cm' },
    { id: 12, name: 'xs-green-20cm' },
  ],
    skuList = [
      ['s', 'xs'],
      ['red', 'blue', 'green'],
      ['10cm', '20cm'],
    ];

  let res_arr = Arr.formatArray(goods, skuList);
  expect(res_arr.map(v => v.list)).toEqual(a);
  // let l_arr = Arr.findArray(res_arr.map(v => v.list), [-1, 0, -1]);
  // console.log(res_arr.map(v => v.list), l_arr);
});

let arr = [
    [1, 2, 3],
    [1, 2],
    [1, 2, 3],
  ];
test('getArray', function(){

  let res_arr = Arr.getArray(18, arr);
  console.error(res_arr);

  // expect(res_arr).toEqual([0, 1, 1]);
});

// test('get', function(){ expect(Arr.getArray(7, arr)).toEqual([1, 0, 0]); });
// test('get1', function(){ expect(Arr.getArray(18, arr)).toEqual([1, 1, 2]); });

