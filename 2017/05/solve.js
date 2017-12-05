function solve(input, part) {
    const offsets = input.map(Number)
    return countStepsUntilExit(offsets, part === 1 ? () => 1 : n => (n>=3)?-1:1);
}

function countStepsUntilExit(offsets, updateOffset) {
    let currentIndex = 0;
    let steps = 0
    while(currentIndex >= 0 && currentIndex < offsets.length) {
        let skip = offsets[currentIndex];
        offsets[currentIndex] += updateOffset(skip);
        currentIndex+=skip;
        steps++;
    }
    return steps;
}

const expected = part => part === 1 ? 378980 : 26889114;

module.exports = {solve,expected,countStepsUntilExit};