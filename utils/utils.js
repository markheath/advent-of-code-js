function* scan(source, folder, startState) {
    let state = startState;
    if (typeof(state) !== "undefined" ) {
        yield startState;
    }
    for (let n of source) {
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

function flatMap(xs,f) {
    let out = []
    for (let x of xs) {
        out.push(...f(x));
    }
    return out;
}

function pairwise(arr) {
    let out = [];
    for (let n = 1; n < arr.length; n++) {
        out.push([arr[n-1],arr[n]]);
    }
    return out;
}

function* range(start, count) {
    for (let n = 0; n < count; n++) {
        yield start++;
    }
}

function sumBy(seq, selector) {
    let total = 0;
    for(let n of seq) {
        total += (typeof(selector) === 'undefined') ? n : selector(n);
    }
    return total;
}

function findBy(seq, selector, test) {
    let maxVal;
    let maxElem;
    for(let n of seq) {
        let val = (typeof(selector) === 'undefined') ? n : selector(n);
        if (typeof(maxElem) === 'undefined' || test(val,maxVal)) {
            maxElem = n;
            maxVal = val;
        }
    }
    return maxElem;
}

function maxBy(seq, selector) {
    return findBy(seq,selector,(a,b) => a > b);
}

function minBy(seq, selector) {
    return findBy(seq,selector,(a,b) => a < b);
}

function bfs(isSolution, getChildren, start)  {
    let q = [start]
    function *search() {
        if (q.length > 0) {
            let s = q.shift()
            if (isSolution(s)) {
                yield s;
            }
            q.push(...getChildren(s))
            yield* search()
        }
    }
    return search();
}

module.exports = { scan,pairwise,permutations,flatMap,range,sumBy,maxBy,minBy,bfs }