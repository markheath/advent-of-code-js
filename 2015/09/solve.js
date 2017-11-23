let utils = require('../../utils/utils');

function solve(input, part) {
    var solver = part === 1 ? part1 : part2;
    return solver(input);
}

function expected(part) {
    return part == 1 ? 207 : 804;
}



function getPlaces(distances) {
    return Array.from(new Set(utils.flatMap(d => [d.from, d.to],distances)))
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
    return utils.permutations(places)
            .map(r => utils.pairwise(r).map(([a,b]) => getDistance(a,b,distances)).reduce((a,b) => a+b));
}

function part1(input) {
    return Math.min.apply(null, getRouteLengths(input));
}

function part2(input) {
    return Math.max.apply(null, getRouteLengths(input));
}

module.exports = {solve,expected};