function solve(input, part) {
    console.log(isValid("aa bb cc dd ee"));
    console.log(isValid("aa bb cc dd aa"));
    console.log(isValid("aa bb cc dd aaa"));
    return input.filter(isValid).length;
}

function isValid(passphrase) {
    const words = passphrase.split(' ');
    return words.length === new Set(words).size;
}

const expected = part => part === 1 ? -1 : -1;

module.exports = {solve,expected};