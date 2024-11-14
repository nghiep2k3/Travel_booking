const arr = [1, 5, 3, 5, 9, 2, 9];

function findMaxNumber(x) {
    console.log(111, ...x);

    return Math.max(...x);
}

findMaxNumber(arr);

console.log(findMaxNumber(arr));

// Tìm số lớn thứ hai 
function findSecondMax(x) {
    const unquie = [...new Set(x)];
    let items = unquie.sort().reverse();
    return items[1];
}

console.log(findSecondMax(arr));

// đếm số lần xuất hiện 
function CountNumber(arr, x) {
    let items = arr.filter(item => item == x).length;
    console.log('arr copy', arr.filter(item => item == x));
    return items
}


console.log(CountNumber(arr, 9));

function removeItem(arr, x) {
    let copy = [...new Set(arr)];
    let items = copy.filter(item => item != x)
    return items
}


console.log(removeItem(arr, 1));

// đối xứng
function isSymmetric(arr) {
    return arr.join('') === arr.reverse().join('');
}

// Ví dụ sử dụng
const arr1 = [1, 2, 3, 2, 1];
const arr2 = [1, 2, 3, 4, 5];
console.log(isSymmetric(arr1)); // Output: true
console.log(isSymmetric(arr2)); // Output: false


function checkSome(arr, x){
    return arr.some(item => item == x);
}


console.log(checkSome(arr, 0));
