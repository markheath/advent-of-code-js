
function solve(input, part) {
    let instructions = input[0].split(',')
    let state = [..."abcdefghijklmnop"]

    let swapPos = (a,b) => {
        let tmp = state[a]
        state[a] = state[b]
        state[b] = tmp
    }
    let spin = n => {
        state = state.slice(state.length - n).concat(state.slice(0,state.length - n))
    }
    for(let i of instructions) {
        let m = i.match(/x(\d+)\/(\d+)/)
        if (m) swapPos(Number(m[1]),Number(m[2]))
        else {
            m = i.match(/s(\d+)/)
            if (m) spin(Number(m[1]))
            else {
                let m = i.match(/p([a-z])\/([a-z])/)
                if (m) swapPos(state.indexOf(m[1]), state.indexOf(m[2]))
            }
        }
    }
    return state.join('')
}


const expected = part => part === 1 ? -1 : -1;

module.exports = {solve,expected};
