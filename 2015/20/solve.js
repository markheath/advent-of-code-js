
function solve(input, part) {
    const target = Number(input[0]);

    let presentsPerHouse = part === 1 ? 10 : 11;
    let houses = new Array(Math.trunc(target/presentsPerHouse) + 1).fill(0);

    for (let elf = 1; elf < houses.length; elf++)
        for (let house = elf, n = 0; house < houses.length && (part === 1 || n < 50); house+=elf, n++)
            houses[house] += elf * presentsPerHouse;
    for (let house = 1; house < houses.length; house++)
        if (houses[house] > target) { return house; }
}

const expected = part => part === 1 ? 831600 : 884520;

module.exports = {solve,expected};