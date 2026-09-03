let numbers = [10, 25, 7, 40, 15, 30];

let largest = -Infinity;
let secondLargest = -Infinity;

for (let num of numbers) {
    if (num > largest) {
        secondLargest = largest;
        largest = num;
    } else if (num > secondLargest && num !== largest) {
        secondLargest = num;
    }
}

console.log("Second largest:", secondLargest);
