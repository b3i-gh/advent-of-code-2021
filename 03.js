export function solvePart1(input) {
    var columnBits = [];
    input.split("\r\n").forEach(curr => {
        curr.split('').map((cur, index, arr) => {
            if (!columnBits[index])
                columnBits[index] = 0;
            cur == '1' ? columnBits[index]++ : columnBits[index]--;
        }, 0);
    });

    const gamma = columnBits.reduce((acc, cur) => {
        return cur > 0 ? acc + '1' : acc + '0';
    }, "");

    const epsilon = gamma.split('').reduce((acc, cur) => {
        return cur == 0 ? acc + '1' : acc + '0';
    }, "");

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

export function solvePart2(input) {
    const ogr = scanData(input.split("\r\n"), true);
    const csr = scanData(input.split("\r\n"), false);
    return ogr * csr;
}

function scanData(dataSet, searchingOGR){
    var scanningBit = 0;
    while(dataSet.length > 1){
        let mcb = findMostCommonBit(dataSet, scanningBit, searchingOGR);
        dataSet = dataSet.filter((currRow) => {
            return currRow.charAt(scanningBit) == mcb;
        });
        scanningBit++;
    }
    return parseInt(dataSet[0], 2);
}

function findMostCommonBit(dataSet, bitIndex, searchingOGR) {
    var bitSums = [];

    dataSet.map((curr) => {
        curr.split('').map((curr, index) => {
            if (!bitSums[index])
            bitSums[index] = 0;
            curr == '1' ? bitSums[index]++ : bitSums[index];
        });
    });

    if(searchingOGR){
        if(bitSums[bitIndex] == dataSet.length / 2)
            return '1';
        return (bitSums[bitIndex] > dataSet.length / 2) ? '1' : '0';
    } else {
        if(bitSums[bitIndex] == dataSet.length)
            return '0';
        return (bitSums[bitIndex] < dataSet.length / 2) ? '1' : '0';
    }
}