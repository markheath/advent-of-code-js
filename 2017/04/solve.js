function solve(input, part) {
    if (part === 1) {
        console.log(isValid("aa bb cc dd ee")); // true
        console.log(isValid("aa bb cc dd aa")); // false
        console.log(isValid("aa bb cc dd aaa")); // true
        return input.filter(isValid).length;
    }
    else {
        console.log(isValid2("abcde fghij")); // true
        console.log(isValid2("abcde xyz ecdab")); // false
        console.log(isValid2("a ab abc abd abf abj")); // true
        console.log(isValid2("iiii oiii ooii oooi oooo")); // true
        console.log(isValid2("oiii ioii iioi iiio")); // false
        return input.filter(isValid2).length;
    }
}

function isValid(passphrase) {
    const words = passphrase.split(' ');
    return words.length === new Set(words).size;
}

function isValid2(passphrase) {
    const words = passphrase.split(' ').map(w => [...w].sort().join(''));
    return words.length === new Set(words).size;
}

const expected = part => part === 1 ? -1 : -1;

module.exports = {solve,expected};