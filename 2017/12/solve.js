function solve(input, part) {
    //console.log(parse("4 <-> 2, 3, 6"))
    let programs = input.map(parse)
    let s = new Set()
    visit(s, programs[0].to, programs)
    return s.size
}

const visit = (visited,destinations,programs) => {
    //console.log('visiting', destinations)
    for(let d of destinations) {
        if (!visited.has(d)) {
            visited.add(d)
            visit(visited,programs[Number(d)].to,programs)
        }
    }
}

const testInput = ['0 <-> 2',
'1 <-> 1',
'2 <-> 0, 3, 4',
'3 <-> 2, 4',
'4 <-> 2, 3, 6',
'5 <-> 6',
'6 <-> 4, 5`']

const parse = s => {
    let [,from,dest] = /(\d+) <-> ((\d+)(, \d+)*)/.exec(s);
    return {from,to:dest.split(', ')}
}

const expected = part => part === 1 ? 134 : -1;

module.exports = {solve,expected};