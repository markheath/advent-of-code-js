var _ = require('lodash');
var fs = require('fs');

let year = 2015;
let day = 1;

let path = `./${year}/${("0" + day).slice(-2)}`;
let solver = require(path +`/solve`);
var text = fs.readFileSync(path + `/input.txt`).toString();

for(let part of [1,2]) {
    let answer = solver.solve(text, part);
    console.log(`${year} day ${day} part ${part}: ${answer}`);
}
