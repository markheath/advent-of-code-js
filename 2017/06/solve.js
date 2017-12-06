function solve(input, part) {
    const banks = input[0].split('\t').map(Number);
    
    if (part === 1) {
        return countRedistributions(banks).redistributions;
    }
    else {
        return countRedistributions(banks).loopSize;
    }
}

function findMaxIndex(arr) {
    let maxIndex = 0;
    for(let n = 1; n < arr.length; n++) {
        if (arr[n] > arr[maxIndex]) maxIndex = n;
    }
    return maxIndex;
}

function countRedistributions(state) {
    let seenStates = new Map();
    let key = state.toString()
    let redistributions = 0;
    while(!seenStates.has(key)) {
        seenStates.set(key, redistributions++);
        state = redistribute(state);
        key = state.toString();
    }
    return { redistributions: redistributions, loopSize: redistributions - seenStates.get(key) };
}

function redistribute(banks) {
    const maxIndex = findMaxIndex(banks);
    // banks = Array.from(banks); - to make the function pure
    // redistribute
    const amount = banks[maxIndex];
    const addToEach = Math.floor(amount/banks.length);
    const extras = amount % banks.length;
    banks[maxIndex] = 0;
    for(let n = 0; n < banks.length; n++) {
        banks[(n + maxIndex + 1) % banks.length] += addToEach + ((n < extras) ? 1: 0);
    }
    return banks;
}

const expected = part => part === 1 ? 4074 : 2793;

module.exports = {solve,expected,redistribute,countRedistributions};