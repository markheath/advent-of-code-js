function solve(input, part) {
    var solver = part === 1 ? part1 : part2;
    return solver(input);
}

function expected(part) {
    return part == 1 ? 207 : 804;
}

//https://stackoverflow.com/a/20871714/7532
function permutations(inputArr) {
    var results = [];
  
    function permute(arr, memo) {
      var cur, memo = memo || [];
  
      for (var i = 0; i < arr.length; i++) {
        cur = arr.splice(i, 1);
        if (arr.length === 0) {
          results.push(memo.concat(cur));
        }
        permute(arr.slice(), memo.concat(cur));
        arr.splice(i, 0, cur[0]);
      }
  
      return results;
    }
  
    return permute(inputArr);
  }

const flatMap = (f,xs) =>
    xs.reduce((acc,x) =>
        acc.concat(f(x)), []);

function getPlaces(distances) {
    return Array.from(new Set(flatMap(d => [d.from, d.to],distances)))
}

function getDistance (a,b,distances) {
    return distances.find(d => (d.from === a && d.to === b) || (d.to === a && d.from === b) ).distance;
}

function getDistances(input) {
    return input.split('\n')
        .slice(0,-1)
        .map(s => /^(\w+) to (\w+) = (\d+)/g.exec(s))
        .map(m => { return { from:m[1],to:m[2],distance:parseInt(m[3]) }})
}

function pairwise(arr) {
    let out = [];
    for (let n = 1; n < arr.length; n++) {
        out.push([arr[n-1],arr[n]]);
    }
    return out;
}

function getRouteLengths(input) {
    let distances = getDistances(input);
    let places = getPlaces(distances);
    return permutations(places).map(r => pairwise(r).map(([a,b]) => getDistance(a,b,distances)).reduce((a,b) => a+b));
}

function part1(input) {
    return Math.min.apply(null, getRouteLengths(input));
}

function part2(input) {
    return Math.max.apply(null, getRouteLengths(input));
}

module.exports = {solve,expected};