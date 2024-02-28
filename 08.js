export function solvePart1(input) {
    let res = 0;
    const start = performance.now();
    const memoryInfo = process.memoryUsage();

    input.split("\r\n").forEach(row => {
        let [patterns, values] = row.split(' | ').map(curr => curr.split(" "));

        values.forEach(value => {
            if(value.length == 2
                || value.length == 4
                || value.length == 3
                || value.length == 7)
                res++;
        });
    });
    
    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return res;
}

export function solvePart2(input) {
    let res = 0;
    const start = performance.now();
    const memoryInfo = process.memoryUsage();

    input.split("\r\n").forEach(row => {
        let [patterns, values] = row.split(' | ').map(curr => curr.split(" "));

        const letters = ["a", "b", "c", "d", "e", "f", "g"];
        var frequencies = [];
        for(let x = 0; x < letters.length; x ++){
            frequencies[x] = patterns.toString().split(letters[x]).length - 1;
        }

        let reEncodedDigits = [];
        for(let i = 0; i < patterns.length; i++){
            reEncodedDigits[i] = patterns[i].split('').map(curr => frequencies[letters.indexOf(curr)]).toString().replaceAll(',','');
        }
        let reEncodedOutputs = [];
        for(let i = 0; i < values.length; i++){
            reEncodedOutputs[i] = values[i].split('').reduce((acc, curr) => {
                return acc + frequencies[letters.indexOf(curr)];
            }, 0);
        }

        let sums = [42, 17, 34, 39, 30, 37, 41, 25, 49, 45];

        let output = '';
        for(let i = 0; i < values.length; i++){
            output += sums.indexOf(reEncodedOutputs[i]);
        }
        res += parseInt(output);
    });
    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return res;
}