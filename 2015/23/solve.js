let utils = require("../../utils/utils");

function solve(input, part) {

    var instructions = input.map(i => i.split(' ').map(s => s.replace(',','')));
    if (part === 1) {
        return runInstructions({ a: 0, b: 0 },instructions).b;
    }
    else  {
        return runInstructions({ a: 1, b: 0 },instructions).b;
    }
}

function runInstructions(registers, instructions) {
    let index = 0;
    while (index < instructions.length)
    {
        var ins = instructions[index];
        switch (ins[0]) {
            case "inc":
                registers[ins[1]]++;
                index++;
                break;
            case "tpl":
                registers[ins[1]] *= 3;
                index++;
                break;
            case "hlf":
                registers[ins[1]] /= 2;
                index++;
                break;
            case "jio":
                index += registers[ins[1]] == 1 ? parseInt(ins[2]) : 1;
                break;
            case "jie":
                index += registers[ins[1]] % 2 == 0 ? parseInt(ins[2]) : 1;
                break;
            case "jmp":
                index += parseInt(ins[1]);
                break;
            default:
                throw "not implemented " + ins[0];
        }
    }
    return registers;
}

function expected(part) {
    return part == 1 ? 184 : 231;
}


module.exports = {solve,expected};