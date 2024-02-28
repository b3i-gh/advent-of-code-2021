export function solvePart1(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();

    const width = input.indexOf("\r\n");
    input = input.replaceAll("\r\n", "");
    var lowPoints = [];

    // find low points
    for (let i = 0; i < input.length; i++) {
        if (checkNorth(input, i, width)
            && checkSouth(input, i, width)
            && checkEast(input, i, width)
            && checkWest(input, i, width))
            lowPoints.push(parseInt(input.charAt(i)));
    }

    // calculate risk level
    let res = lowPoints.reduce((acc, curr) => acc + (curr + 1), 0);

    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return res;
}

function checkNorth(input, i, w) {
    if (input.charAt(i - w))
        return input.charAt(i) < input.charAt(i - w);
    return true;
}

function checkSouth(input, i, w) {
    if (input.charAt(i + w))
        return input.charAt(i) < input.charAt(i + w);
    return true;
}

function checkEast(input, i, w) {
    if (input.charAt(i - 1) && i % w > 0)
        return input.charAt(i) < input.charAt(i - 1);
    return true;
}

function checkWest(input, i, w) {
    if (input.charAt(i + 1) && i % w < (w - 1))
        return input.charAt(i) < input.charAt(i + 1);
    return true;
}

export function solvePart2(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();

    const width = input.indexOf("\r\n");
    input = input.replaceAll("\r\n", "");
    var lowPoints = [];
    var basinSizes = [];

    // find low points
    for (let i = 0; i < input.length; i++) {
        if (checkNorth(input, i, width)
            && checkSouth(input, i, width)
            && checkEast(input, i, width)
            && checkWest(input, i, width))
            lowPoints.push(i);
    }

    lowPoints.forEach(curr => {
        let currBasinLocations = [];
        scanAdjacentLocations(input, curr, width, currBasinLocations);
        storeBasinSize(basinSizes, currBasinLocations.length);
    });


    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    
    // multiplicate basin sizes
    basinSizes.sort((a, b) => b - a);
    return basinSizes[0] * basinSizes[1] * basinSizes[2];

}

function scanAdjacentLocations(input, currLoc, w, currBasinLocations) {
    if (currBasinLocations.indexOf(currLoc) < 0) {
        currBasinLocations.push(currLoc);
        scanNorth(input, currLoc, w, currBasinLocations);
        scanSouth(input, currLoc, w, currBasinLocations);
        scanEast(input, currLoc, w, currBasinLocations);
        scanWest(input, currLoc, w, currBasinLocations);
    }
}

function storeBasinSize(basinSizes, curBasinSize) {
    basinSizes.push(parseInt(curBasinSize));
}

function scanNorth(input, i, w, currBasinLocations) {
    if (input.charAt(i - w)
        && input.charAt(i - w) < 9
        && input.charAt(i - w) > input.charAt(i))
        return scanAdjacentLocations(input, i - w, w, currBasinLocations)
    else
        return 0;
}

function scanSouth(input, i, w, currBasinLocations) {
    if (input.charAt(i + w)
        && input.charAt(i + w) < 9
        && input.charAt(i + w) > input.charAt(i))
        return scanAdjacentLocations(input, i + w, w, currBasinLocations)
    else
        return 0;
}

function scanEast(input, i, w, currBasinLocations) {
    if ((input.charAt(i - 1) && i % w > 0)
        && input.charAt(i - 1) < 9
        && input.charAt(i - 1) > input.charAt(i))
        return scanAdjacentLocations(input, i - 1, w, currBasinLocations)
    else
        return 0;
}

function scanWest(input, i, w, currBasinLocations) {
    if ((input.charAt(i + 1) && i % w < (w - 1))
        && input.charAt(i + 1) < 9
        && input.charAt(i + 1) > input.charAt(i))
        return scanAdjacentLocations(input, i + 1, w, currBasinLocations)
    else
        return 0;
}