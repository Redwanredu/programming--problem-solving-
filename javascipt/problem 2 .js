let text = "programming";
let frequency = {};

for (let char of text) {
    if (frequency[char]) {
        frequency[char]++;
    } else {
        frequency[char] = 1;
    }
}

console.log(frequency);
