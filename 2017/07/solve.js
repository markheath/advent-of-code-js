const solve = (input, part) => ((part === 1) ? part1 : part2)(input);

const part1 = input => findRoot(buildTree(parseInput(input))).name;

function part2(input) {
    const root = findRoot(buildTree(parseInput(input)));
    return findUnbalancedNode(root).correctWeight;
}

function findDifferentIndex(arr) {
    let n = arr.findIndex(w => w !== arr[0])
    if (n < 0) return [-1];
    return (n === 1 && arr[n] === arr[arr.length - 1]) ? [0,n] : [n,0];
}

function findUnbalancedNode(node) {
    if (node.children.length === 0) return;
    for(let c of node.children) {
        let unbalanced = findUnbalancedNode(c);
        if (unbalanced) return unbalanced;
    }

    let weights = node.children.map(getNodeWeight);
    let [differentIndex,correctIndex] = findDifferentIndex(weights);
    if (differentIndex < 0) { // all same
        return;
    }
    else {
        let difference = weights[differentIndex] - weights[correctIndex];
        let differentNode = node.children[differentIndex];
        //console.log("different", node.name, differentNode.name, differentNode.weight, difference, weights, differentIndex,correctIndex)
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

const expected = part => part === 1 ? "xegshds" : 299;

module.exports = {solve,expected,part1,part2,findDifferentIndex};