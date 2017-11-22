var _ = require('lodash');
var chalk = require('chalk');
var fs = require('fs');

let year = 2015;
for(let day = 5; day <= 5; day++) {
    let path = `./${year}/${("0" + day).slice(-2)}`;
    let solver = require(path +`/solve`);
    var text = fs.readFileSync(path + `/input.txt`).toString();

    for(let part of [1,2]) {
        let answer = solver.solve(text, part);
        let expected = solver.expected(part);
        if (answer === expected) {
            console.log(chalk.green(`${year} day ${day} part ${part}: ${answer}`));
        }
        else {
            console.log(chalk.red(`${year} day ${day} part ${part}: ${answer} - expected ${expected}`));
        }
    }
}
