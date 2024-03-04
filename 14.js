var polymer;
var pairs = new Map();

export function solvePart1(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();
    const steps = 10;
    readInput(input);
   
    for(let step = 1; step <= steps; step ++){
        performStep(step);
    }

    let res = findMostCommonAndLeastCommon();

    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return res;
}

export function solvePart2(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();
    
    const steps = 40;
    readInput(input);
    var pairMap = initPairMap();
    for(let i = 1; i <= steps; i++) 
        pairMap = performStep2(i, pairMap);

    let res = findMostCommonAndLeastCommon2(pairMap);
    
    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);

    // Test should return 2188189693529
    return res;
}

function readInput(input){
    polymer = input.substring(0, input.indexOf("\r"));
    input.split('\r\n\r\n')[1].split('\r\n').forEach(curr => {
        let [pair, element] = curr.split(' -> ');
        pairs.set(pair, element);
    });
}

function performStep(step){
    let newPolymer = '';
    for(let index = 0; index < polymer.length-1; index++){
        const currPair = polymer.charAt(index) + polymer.charAt(index+1);
        if(pairs.get(currPair))
            newPolymer += polymer.charAt(index) + pairs.get(currPair);
        else 
            newPolymer += currPair;
    }
    newPolymer += polymer.charAt(polymer.length-1);
    polymer = newPolymer;
    // console.log(`After step ${step}: ${polymer}`);
}


function findMostCommonAndLeastCommon(){
    const charCounts = polymer.split('').reduce((counts, char) => {
        counts[char] = (counts[char] || 0) + 1;
        return counts;
    }, {});

    const sortedChars = Object.keys(charCounts).sort((a, b) => charCounts[b] - charCounts[a]);
    return charCounts[sortedChars[0]] - charCounts[sortedChars[sortedChars.length - 1]];
}

function initPairMap(){
    var pairMap = new Map();
    for(let index = 0; index < polymer.length-1; index++){
        const currPair = polymer.charAt(index) + polymer.charAt(index+1);
        if(!pairMap.get(currPair))
            pairMap.set(currPair, 1);
        else 
            pairMap.set(currPair, pairMap.get(currPair)+1);
    }
    return pairMap;
}

function performStep2(index, pairMap){
    let newPairMap = new Map();
    pairMap.forEach((value, key) => {
        if(pairs.get(key)){
            let firstPair = key.substring(0,1) + pairs.get(key);
            let secondPair = pairs.get(key) + key.substring(1);
            newPairMap.set(firstPair, !newPairMap.get(firstPair)?value:newPairMap.get(firstPair)+value);
            newPairMap.set(secondPair, !newPairMap.get(secondPair)?value:newPairMap.get(secondPair)+value);
        } else {
            newPairMap.set(key, !newPairMap.get(key)?value:newPairMap.get(key)+value);
        }
    });
    pairMap = newPairMap;
    return pairMap;
}

function findMostCommonAndLeastCommon2(pairMap){
    let charMap = new Map();
    pairMap.forEach((value, key) => {
        let firstChar = key.substring(0,1);
        charMap.set(firstChar, !charMap.get(firstChar)?value:charMap.get(firstChar)+value);
    });

    const lastChar = polymer.charAt(polymer.length-1);
    charMap.set(lastChar, charMap.get(lastChar)+1);


    const sortedChars = Array.from(charMap).sort((a,b) => b[1] - a[1]);
    return sortedChars[0][1] - sortedChars[sortedChars.length - 1][1];
}