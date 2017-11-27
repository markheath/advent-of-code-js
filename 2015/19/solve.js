let utils = require("../../utils/utils");


function solve(input, part) {
    let replacements = input
                        .map(s => s.split(' '))
                        .filter(a => a.length === 3)
                        .map(a => [ a[0], a[2] ]);

    let medicineMolecule = input[input.length - 1];
    if (part === 1) {
        return new Set(mutate(medicineMolecule,replacements)).size;
    }
    else {
        return search(medicineMolecule, replacements);
    }
}

function* mutate(sq, replacements) {
    for(let pos of utils.range(0, sq.length)) {
        for(let rep of replacements) {
            let [a,b] = rep;
            if(sq.substring(pos).startsWith(a)) {
                 yield sq.substring(0,pos) + b + sq.substring(pos+a.length);
            }
        }
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function search (molecule, replacements) {
    let target = molecule;
    let mutations = 0;

    while (target != "e") {
        let tmp = target;
        for (let rep of replacements) {
            let [a,b] = rep;
            var index = target.indexOf(b);
            if (index >= 0)
            {
                target = target.substring(0, index) + a + target.substring(index + b.length);
                mutations++;
            }
        }

        if (tmp === target) {
            target = molecule;
            mutations = 0;
            shuffle(replacements);
        }
    }
    return mutations;
}

function expected(part) {
    return part == 1 ? 509 : 195;
}


module.exports = {solve,expected};