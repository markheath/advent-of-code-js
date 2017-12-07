function solve(input, part) {
    let programs = parseInput(input);
    let tree = buildTree(programs);
    let root = findRoot(tree)
    //console.log(buildTree(parseInput(testInput)))
    if (part === 1) {
        return root.name;
    } else {
        return findUnbalancedNode(root).correctWeight;
    }
    //console.log ()
}

function findUnbalancedNode(node) {
    if (node.children.length === 0) return;
    let weights = node.children.map(getNodeWeight);
    let n = weights.findIndex(w => w !== weights[0])
    if (n < 0) { // all same
        for(let c of node.children) {
            let unbalanced = findUnbalancedNode(c);
            if (unbalanced) return unbalanced;
        }
    }
    else {
        let [differentIndex,correctIndex] = weights[0] === weights[weights.length - 1] ? [n,0] : [0,n];
        let difference = weights[differentIndex] - weights[correctIndex];
        let differentNode = node.children[differentIndex];
        console.log("different", differentNode.name, differentNode.weight, difference, differentIndex, weights)
        // 66057 wrong answer
        return {differentNode,correctWeight:differentNode.weight - difference};
    }
}

const parseInput = input => input.map(x => 
    /(\w+) \((\d+)\)( -> ([\w, ]+))?/.exec(x))
    .map(g => ({name:g[1],weight:Number(g[2]),children:g[4]?g[4].split(', '):[],parents:[] }))

function findRoot(programs) {
    return programs.find(p => p.parents.length === 0);
}

function getNodeWeight(node) {
    return node.weight + node.children.reduce((a,b) => a + getNodeWeight(b),0)
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