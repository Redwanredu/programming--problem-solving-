let numbers = [1, 2, 3, 4, 2, 5, 3, 6, 2];

let seen = new Set();
let duplicates = new Set();

for (let num of numbers) {
    if (seen.has(num)) {
        duplicates.add(num);
    } else {
        seen.add(num);
    }
}

console.log([...duplicates]);
