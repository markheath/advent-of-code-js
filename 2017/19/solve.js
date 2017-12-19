function solve(input,part) {
    const startingPoint = input[0].indexOf('|')
    const letters = [];
    let [x,y] = [startingPoint,0]
    let dir = "D"
    let n = 0;
    for(;;) {
        n++;
        let c = input[y][x]
        if (c === " ") break;
        if (c >= "A" && c <= "Z") letters.push(c)

        if (dir === "D") {
            if (c === "+") [x,dir] = input[y][x-1] != " " ? [x-1,"L"] : [x+1,"R"]
            else y++;
        }
        else if (dir === "U") {
            if (c === "+") [x,dir] = input[y][x-1] != " " ? [x-1,"L"] : [x+1,"R"]
            else y--;
        }
        else if (dir === "R") {
            if (c === "+") [y,dir] = input[y-1][x] != " " ? [y-1,"U"] : [y+1,"D"]
            else x++;
        }
        else if (dir === "L") {
            if (c === "+") [y,dir] = input[y-1][x] != " " ? [y-1,"U"] : [y+1,"D"]
            else x--;
        }
    }
    return part === 1 ? letters.join('') : n-1;
} 

const expected = part => part === 1 ? "RUEDAHWKSM" : 17264

module.exports = {solve,expected}