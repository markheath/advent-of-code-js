function* scan(source, folder, startState) {
    let state = startState;
    if (typeof(state) !== "undefined" )
        yield state;
    for(var n of source) {
        if (typeof(state) === "undefined" ) {
            state = n;
        }
        else {
            state = folder(state, n);
        }
        yield state;
    }
}

//https://stackoverflow.com/a/20871714/7532
function permutations(inputArr) {
    var results = [];
  
    function permute(arr, memo) {
      var cur, memo = memo || [];
  
      for (var i = 0; i < arr.length; i++) {
        cur = arr.splice(i, 1);
        if (arr.length === 0) {
          results.push(memo.concat(cur));
        }
        permute(arr.slice(), memo.concat(cur));
        arr.splice(i, 0, cur[0]);
      }
  
      return results;
    }
  
    return permute(inputArr);
  }

const flatMap = (f,xs) =>
    xs.reduce((acc,x) =>
        acc.concat(f(x)), []);

function pairwise(arr) {
    let out = [];
    for (let n = 1; n < arr.length; n++) {
        out.push([arr[n-1],arr[n]]);
    }
    return out;
}

function test() {
    let x = scan([1,2,3], (s,n) => s+n, 0);

    console.log(Array.from(x));

    x = scan([1,2,3], (s,n) => s+n);
    console.log(Array.from(x));
}

module.exports = { scan,pairwise,permutations,flatMap}