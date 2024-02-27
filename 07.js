export function solvePart1(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();
    var initialPositions = input.split(',');
    const median = calculateMedian(initialPositions);
    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return initialPositions.reduce((acc, curr) => acc + Math.abs(curr - median), 0);
}

function calculateMedian(data){
    data = data.map(curr => parseInt(curr));
    const sorted = [...data].sort((a, b) => a - b);
    const midpoint = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        // Even number of elements
        return (sorted[midpoint - 1] + sorted[midpoint]) / 2;
    } else {
        // Odd number of elements
        return sorted[midpoint];
    }
}

function calculateMean(data){
    const sum = data.reduce((acc, curr) => parseFloat(acc) + parseFloat(curr));
    return sum / data.length;
}


export function solvePart2(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();
    var initialPositions = input.split(',');
    const mean = calculateMean(initialPositions);
    
    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    const floorFuel = initialPositions.reduce((acc, curr) => {
        let fuel = 0;
        for(let d = 0; d <= Math.abs(curr - Math.floor(mean)); d++){
            fuel += d;
        } 
        return acc + fuel;
    }, 0);
    const ceilingFuel = initialPositions.reduce((acc, curr) => {
        let fuel = 0;
        for(let d = 0; d <= Math.abs(curr - Math.ceil(mean)); d++){
            fuel += d;
        } 
        return acc + fuel;
    }, 0);
    return Math.min(floorFuel, ceilingFuel);
}