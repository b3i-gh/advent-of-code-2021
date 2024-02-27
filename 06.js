export function solvePart1(input){
    const start = performance.now();
    const memoryInfo = process.memoryUsage();
    const totalDays = 80;
    
    var school = input.split(',');
    for(let day = 0; day < totalDays; day++){
        let newborns = 0;
        school.map((curr, index, arr) => {
            if(curr == 0){
                newborns++
                school[index] = 6;
            } else 
                school[index]--;
        })

        for(let n = 0; n < newborns; n++)
            school.push(8);
    }
    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return school.length;
}

export function solvePart2(input){
    const start = performance.now();
    const memoryInfo = process.memoryUsage();
    const totalDays = 256;
    
    // init
    var fishGroups = Array.from({ length: 9 }, () => 0);
    input.split(',').map(curr => {
        fishGroups[curr]++;
    })

    for(let day = 0; day < totalDays; day++){
        let newborns = 0;
        for(let g = 0; g < fishGroups.length; g++){
            if(g == 0 ) 
                newborns = fishGroups[g];
            else 
                fishGroups[g-1] = fishGroups[g];
        }
        fishGroups[8] = newborns;
        fishGroups[6] += newborns;
    }

    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return fishGroups.reduce((acc, curr) =>{
        return acc + curr;
    }, 0);
}