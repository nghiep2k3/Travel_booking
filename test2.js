function LongestWord(sen) {
    let temp = sen.split(" ");
    // code goes here 
    let array = [];
    let count = 0;
    for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[i].length; j++) {
            if (/[a-zA-Z]/.test(temp[i][j])) {
                console.log(222, temp[i][j])
                count++;
            } else {
                continue;
            }

        }
        array.push(count);
        count = 0;
    }
    // Tìm số lớn nhất trong mảng
    let maxNumber = Math.max(...array);

    // Tìm vị trí (index) của số lớn nhất
    let maxIndex = array.indexOf(maxNumber);

    console.log(temp);
    console.log(array);
    console.log(maxIndex);
    console.log(temp[maxIndex]);
    return temp[maxIndex];

}

// keep this function call here 
console.log(LongestWord("I love dogds"));