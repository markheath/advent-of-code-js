function solve(input,part) {
    const letters = [];
    let [x,y] = [input[0].indexOf('|'),0]
    for(let dir = "D", n = 0; input[y][x] != " ";n++) {
        let c = input[y][x];
        if (c >= "A" && c <= "Z") letters.push(c)

        if (dir === "D" || dir === "U") {
            if (c === "+") [x,dir] = input[y][x-1] != " " ? [x-1,"L"] : [x+1,"R"]
            else y += (dir === "D") ? 1 : -1;
        }
        else if (dir === "R" || dir === "L") {
            if (c === "+") [y,dir] = input[y-1][x] != " " ? [y-1,"U"] : [y+1,"D"]
            else x += (dir === "L") ? -1 : 1;
        }
    }
    return part === 1 ? letters.join('') : n;
} 

const expected = part => part === 1 ? "RUEDAHWKSM" : 17264

module.exports = {solve,expected}