export function solvePart1(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();
    const rows = input.split("\r\n");
    var closers = [];
    var res = 0;

    rows.forEach(row => {
        row.split('').every( curr => {
            if(curr == '(') { closers.push(')'); return true;}
            else if(curr == '[') { closers.push(']'); return true;}
            else if(curr == '{') { closers.push('}'); return true;}
            else if(curr == '<') { closers.push('>'); return true;}

            else if(curr == closers[closers.length-1]){
                closers.pop();
                return true;
            }  else {
                switch(curr){
                    case ')':
                        res += 3;
                        break;
                    case ']':
                        res += 57;
                        break;
                    case '}':
                        res += 1197;
                        break;
                    case '>':
                        res += 25137;
                        break;
                }
                return false;
            }
        });
    });

    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return res;
}

export function solvePart2(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();
    const rows = input.split("\r\n");
    var closers = [];
    var res = 0;
    let incompleteRows = rows;

    for(let r = rows.length-1; r >= 0; r--){
        rows[r].split('').every( curr => {
            if(curr == '(') { closers.push(')'); return true;}
            else if(curr == '[') { closers.push(']'); return true;}
            else if(curr == '{') { closers.push('}'); return true;}
            else if(curr == '<') { closers.push('>'); return true;}

            else if(curr == closers[closers.length-1]){
                closers.pop();
                return true;
            }  else {
                switch(curr){
                    case ')':
                        res += 3;
                        break;
                    case ']':
                        res += 57;
                        break;
                    case '}':
                        res += 1197;
                        break;
                    case '>':
                        res += 25137;
                        break;
                }
                incompleteRows.splice(r, 1);
                return false;
            }
        });
    }

    const scores = incompleteRows.map(curr => {
        return calculateRowScore(curr);
    });

    
    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return scores.sort((a,b) => a - b)[Math.floor(scores.length/2)];
}

function calculateRowScore(row){
    let closers = [];
    row.split('').forEach(curr =>{
        if(curr == '(') closers.push(')');
        else if(curr == '[') closers.push(']');
        else if(curr == '{') closers.push('}'); 
        else if(curr == '<') closers.push('>'); 
        else if(curr == closers[closers.length-1])
            closers.pop();
    });

    return closers.reverse().reduce((acc, curr) => {
        acc *= 5;
        switch(curr){
            case ')':
                return acc + 1;
            case ']':
                return acc + 2;
            case '}':
                return acc + 3;
            case '>':
                return acc + 4;
        }
    }, 0);
}