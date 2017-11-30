let {pairwise,flatMap,permutations,min,max} = require('../../utils/utils');

function solve(input, part) {
    let routeLengths = getRouteLengths(input);
    return part === 1 ? min(routeLengths) : max(routeLengths);
}

function expected(part) {
    return part == 1 ? 207 : 804;
}

function getPlaces(distances) {
    return Array.from(new Set(flatMap(distances,d => [d.from, d.to])))
}

function getDistance (a,b,distances) {
    return distances.find(d => (d.from === a && d.to === b) || (d.to === a && d.from === b) ).distance;
}

function getDistances(input) {
    return input
        .map(s => /^(\w+) to (\w+) = (\d+)/g.exec(s))
        .map(m => { return { from:m[1],to:m[2],distance:parseInt(m[3]) }})
}

function getRouteLengths(input) {
    let distances = getDistances(input);
    let places = getPlaces(distances);
    return permutations(places)
            .map(r => pairwise(r).map(([a,b]) => getDistance(a,b,distances)).reduce((a,b) => a+b));
}

module.exports = {solve,expected};