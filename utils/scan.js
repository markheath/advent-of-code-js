function* scan(source, folder, startState) {
    let state = startState;
    for(var n of source) {
        if (typeof(state) === "undefined" ) {
            state = n;
        }
        else {
            state = folder(state, n);
            yield state;
        }
    }
}

let x = scan([1,2,3], (s,n) => s+n, 0);

console.log(Array.from(x));

x = scan([1,2,3], (s,n) => s+n);
console.log(Array.from(x));