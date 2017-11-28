
function solve(input, part) {
    const target = Number(input[0]);

    if (part === 1) {
        let houses = new Array(target/10 + 1).fill(0);
        for (let elf = 1; elf < houses.length; elf++)
            for (let house = elf; house < houses.length; house+=elf)
                houses[house] += elf * 10;
        for (let house = 1; house < houses.length; house++)
            if (houses[house] > target) { return house; }
    }
    else {
        let houses = new Array(Math.trunc(target/11) + 1).fill(0);
        for (let elf = 1; elf < houses.length; elf++)
            for (let house = elf, n = 0; house < houses.length && n < 50; house+=elf, n++)
                houses[house] += elf * 11;
        for (let house = 1; house < houses.length; house++)
            if (houses[house] > target) { return house; }
    }
}


function expected(part) {
    return part === 1 ? 831600 : 884520;
}


module.exports = {solve,expected};