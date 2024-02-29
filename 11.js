var grid = [];
var flashed = [];
var w = 0;
var res = 0;

function resetInput(){
    grid = [];
    flashed = [];
    w = 0;
    res = 0;
}

export function solvePart1(input) {
    resetInput();
    const start = performance.now();
    const memoryInfo = process.memoryUsage();
    
    w = input.indexOf("\r\n");
    const steps = 196;
    grid = input.replaceAll("\r\n","").split('');
    for(let i = 1; i < steps; i++){
        grid = grid.map(curr => { if(curr < 10) return parseInt(curr)+1; else return parseInt(curr);});
        grid.forEach((octoValue, index) => {
            if(octoValue > 9)
                grow(index);
        });
        resetFlashed();
        logStep(i);
    }
    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return res;
}

function grow(index){
    let newValue = grid[index] < 10 ? ++grid[index] : grid[index];
    if(newValue > 9 && flashed.indexOf(index) < 0){
        flash(index);
    }
}

function flash(i){
    res++;
    flashed.push(i);
    if(i-w > -1) grow(i-w); // N
    if(i-w > -1 && i % w < (w - 1)) grow(i-w+1) // NW
    if(i % w < (w - 1))grow(i+1) // W
    if(i+w < grid.length && i % w < (w - 1)) grow(i+w+1) // SW
    if(i+w < grid.length) grow(i+w); // S
    if(i+w < grid.length && i % w > 0) grow(i+w-1) // SE
    if(i % w > 0) grow(i-1) // E
    if(i-w > -1 && i % w > 0) grow(i-w-1) // NE
}

function resetFlashed(){
    grid = grid.map((curr, index) => {
        if(flashed.indexOf(index) > -1)
            return 0;
        else if(curr > 9)
            return 9;
        else 
            return curr;
    });
    flashed = [];
}

function logStep(index){
    console.log("Step ", index);
    
    const log = grid.reduce((acc, curr, i) => {
        if(i % w == w-1)
            return acc + curr + "\r\n";
        else
            return acc + curr;
    }, '');
    console.log(log);
}

export function solvePart2(input) {
    resetInput();
    const start = performance.now();
    const memoryInfo = process.memoryUsage();
    
    w = input.indexOf("\r\n");
    grid = input.replaceAll("\r\n","").split('');
    let stepCounter = 0;
    let endCondition = false;
    while(!endCondition){
        grid = grid.map(curr => { if(curr < 10) return parseInt(curr)+1; else return parseInt(curr);});
        grid.forEach((octoValue, index) => {
            if(octoValue > 9)
                grow(index);
        });
        resetFlashed();
        logStep(stepCounter);
        endCondition = checkEndCondition();
        stepCounter++;
    }
    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return stepCounter;
}

function checkEndCondition(){
    return grid.every(curr => curr === 0);
}