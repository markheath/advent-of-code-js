function solve(input, part) {
    //let x =testInput.map(parse)
    //console.log(getGroup(0,x))
    //console.log(parse("4 <-> 2, 3, 6"))
    let programs = input.map(parse)
    if (part === 1) {
        return getGroup(0,programs).size
    }
    else {
        //let programs = testInput.map(parse)
        let groups = 0;
        let inAnyGroup = new Set();
        for(let g = 0; g < programs.length; g++) {
            if(!inAnyGroup.has(g.toString())) {
                groups++;
                let group = getGroup(g,programs);
                for(let m of group) {
                    inAnyGroup.add(m)
                }
                //console.log(inAnyGroup)
            }
        }
        return groups;
    }
}

const getGroup = (start,programs) => {
    let s = new Set()
    visit(s, programs[start].to, programs)
    return s;
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

const expected = part => part === 1 ? 134 : 193;

module.exports = {solve,expected};