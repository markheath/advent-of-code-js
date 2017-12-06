function solve(input, part) {
    if (part === 1) {
        const banks = input[0].split('\t').map(Number);
        //console.log(countRedistributions([0,2,7,0]));
        return countRedistributions(banks);
    }
    /*let banks = [0,2,7,0]
    console.log(redistribute(banks))
    console.log(redistribute(banks))
    console.log(redistribute(banks))
    console.log(redistribute(banks))
    console.log(redistribute(banks))
*/
}

function findMaxIndex(arr) {
    let maxIndex = 0;
    for(let n = 1; n < arr.length; n++) {
        if (arr[n] > arr[maxIndex]) maxIndex = n;
    }
    return maxIndex;
}

function countRedistributions(state) {
    let seenStates = new Set();
    seenStates.add(state.toString());
    let redistributions = 0;
    do {
        state = redistribute(state);
        seenStates.add(state.toString());
        //console.log(seenStates, redistributions);
    }
    while(seenStates.size > redistributions++);
    return redistributions - 1;
}

function redistribute(banks) {
    const maxIndex = findMaxIndex(banks);
    // redistribute
    let amount = banks[maxIndex];
    banks[maxIndex] = 0;
    for(let n = maxIndex + 1; amount > 0; n++, amount--) {
        banks[n % banks.length] += 1;
    }
    return banks;
}


const expected = part => part === 1 ? 4074 : -1;

module.exports = {solve,expected};