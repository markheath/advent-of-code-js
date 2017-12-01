
function solve(input, part) {
    var solver = part === 1 ? part1 : part2;
    return solver(input);
}

function expected(part) {
    return part == 1 ? 236 : 51;
}
function countNice(input, isNice) {
    return input.filter(isNice).length;
}

function part1(input) {
    const hasThreeVowels = /[aeiou].*[aeiou].*[aeiou]/g;
    const hasDoubleLetter = /(\w)\1+/g;
    const containsNaughtyString = /ab|cd|pq|xy/g;
    return countNice(input, s => s.match(hasThreeVowels) && s.match(hasDoubleLetter) && !s.match(containsNaughtyString));
}

function part2(input) {
    const containsNonOverlappingPair = /(\w{2}).*\1+/;
    const containsDuplicateSeparatedByOne = /(\w).\1/;
    return countNice(input, s => s.match(containsNonOverlappingPair) && s.match(containsDuplicateSeparatedByOne));
}

module.exports = {solve,expected};