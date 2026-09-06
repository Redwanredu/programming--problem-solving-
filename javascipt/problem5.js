let numbers = [1, 2, 3, 5, 6];

let n = 6;

let expectedSum = (n * (n + 1)) / 2;
let actualSum = 0;

for (let num of numbers) {
    actualSum += num;
}

let missing = expectedSum - actualSum;

console.log("Missing number:", missing);
