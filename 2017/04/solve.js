function solve(input, part) {
    return countValid(input, part === 1 ? isValid1 : isValid2);
}
const isValid1 = p => isValid(p, w => w);
const isValid2 = p => isValid(p, w => [...w].sort().join(''));
const countValid = (phrases, validator) => phrases.filter(validator).length;

function isValid(passphrase, wordMap) {
    const words = passphrase.split(' ').map(wordMap);
    return words.length === new Set(words).size;
}

const expected = part => part === 1 ? 337 : 231;

module.exports = {solve,expected,isValid1,isValid2};