function solve(input, part) {
    let programs = parseInput(input);
    //console.log(buildTree(parseInput(testInput)))
    if (part === 1) {
        return findRoot(buildTree(programs));
    }
    //console.log ()
}

const parseInput = input => input.map(x => 
    /(\w+) \((\d+)\)( -> ([\w, ]+))?/.exec(x))
    .map(g => ({name:g[1],weight:Number(g[2]),children:g[4]?g[4].split(', '):[],parents:[] }))

function findRoot(programs) {
    return programs.find(p => p.parents.length === 0).name;
}

function buildTree(programs) {
    let nodes = new Map(programs.map(p => [p.name,p]));
    
    for(let p of programs) {
        p.children = p.children.map(c => nodes.get(c))
        for(let c of p.children) {
            c.parents.push(nodes.get(p.name))
        }
    }
    return programs; 
}


const testInput = [ "pbga (66)",
"xhth (57)",
"ebii (61)",
"havc (66)",
"ktlj (57)",
"fwft (72) -> ktlj, cntj, xhth",
"qoyq (66)",
"padx (45) -> pbga, havc, qoyq",
"tknk (41) -> ugml, padx, fwft",
"jptl (61)",
"ugml (68) -> gyxo, ebii, jptl",
"gyxo (61)",
"cntj (57)`;" ]

const expected = part => part === 1 ? "xegshds" : -1;

module.exports = {solve,expected};