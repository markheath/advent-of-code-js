function solve(input,part) {
    const startingPoint = input[0].indexOf('|')
    const letters = [];
    let [x,y] = [startingPoint,0]
    let direction = "D"
    for(;;) {
        let c = input[y][x]
        if (direction === "D") {
            if (c === "|") y++;
            else if (c === "-") y++;
            else if (c === "+") [x,direction] = input[y][x-1] != " " ? [x-1,"L"] : [x+1,"R"]
            else if (c >= "A" && c <= "Z") {
                letters.push(c)
                y++
            }
            else break;
        }
        else if (direction === "U") {
            if (c === "|") y--;
            else if (c === "-") y--;
            else if (c === "+") [x,direction] = input[y][x-1] != " " ? [x-1,"L"] : [x+1,"R"]
            else if (c >= "A" && c <= "Z") {
                letters.push(c)
                y--
            }
            else break;
        }
        else if (direction === "R") {
            if (c === "|") x++;
            else if (c === "-") x++;
            else if (c === "+") [y,direction] = input[y-1][x] != " " ? [y-1,"U"] : [y+1,"D"]
            else if (c >= "A" && c <= "Z") {
                letters.push(c)
                x++
            }
            else break;
        }
        else if (direction === "L") {
            if (c === "|") x--;
            else if (c === "-") x--;
            else if (c === "+") [y,direction] = input[y-1][x] != " " ? [y-1,"U"] : [y+1,"D"]
            else if (c >= "A" && c <= "Z") {
                letters.push(c)
                x--
            }
            else break;
        }
    }
    return letters.join('');
} 

const expected = part => part === 1 ? "todo" : "todo"

module.exports = {solve,expected}