let codeDimensions = [0,0];

export function solvePart1(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();

    const [startingCoordinates, instructions] = input.split('\r\n\r\n');
    var points = getPoints(startingCoordinates);

    const instArr = instructions.split("\r\n");
    var foldedPoints = points;
    for (let i = 0; i < instArr.length; i++) {
        foldedPoints = fold(instArr[i], foldedPoints);
    }

    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return foldedPoints.length;
}

export function solvePart2(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();

    const [startingCoordinates, instructions] = input.split('\r\n\r\n');
    var points = getPoints(startingCoordinates);

    const instArr = instructions.split("\r\n");
    var foldedPoints = points;
    for (let i = 0; i < instArr.length; i++) {
        foldedPoints = fold(instArr[i], foldedPoints);
    }

    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return "Code: \n\n" + printCode(foldedPoints);
}

function getPoints(points) {
    return points.split('\r\n').map(row => {
        let [x, y] = row.split(',');
        if(parseInt(x) > codeDimensions[0]) codeDimensions[0] = x;
        if(parseInt(y) > codeDimensions[1]) codeDimensions[1] = y;
        return [parseInt(x), parseInt(y)];
    });
}

function fold(instruction, points) {
    const [variable, value] = instruction.substring(11).split('=');
    if (variable == 'x')
        return foldHorizontally(parseInt(value), points);
    else
        return foldVertically(parseInt(value), points);
}

function foldHorizontally(foldingLine, points) {
    let foldedPoints = new Array();
    [...points].forEach(point => {
        const stringifiedPoints = new Set(foldedPoints.map(JSON.stringify));
      
        if (point[0] < foldingLine){
            let x = point[0];
            let y = point[1];
            const newPoint = JSON.stringify([x, y]);
            if (!stringifiedPoints.has(newPoint)) 
                foldedPoints.push(point);
        } else {
            let x = 2 * foldingLine - point[0];
            let y = point[1];
            const newPoint = JSON.stringify([x, y]);
            const stringifiedPoints = new Set(foldedPoints.map(JSON.stringify));
            if (!stringifiedPoints.has(newPoint)) 
                    foldedPoints.push(new Array(x, y));
        }
    });
    codeDimensions[0] =  foldingLine;
    return foldedPoints;
}

function foldVertically(foldingLine, points) {
    let foldedPoints = new Array();
    [...points].forEach(point => {
        const stringifiedPoints = new Set(foldedPoints.map(JSON.stringify));
      
        if (point[1] < foldingLine){
            let x = point[0];
            let y = point[1];
            const newPoint = JSON.stringify([x, y]);
            if (!stringifiedPoints.has(newPoint)) 
                foldedPoints.push(point);
        } else {
            let x = point[0];
            let y = 2 * foldingLine - point[1];
            const newPoint = JSON.stringify([x, y]);
            const stringifiedPoints = new Set(foldedPoints.map(JSON.stringify));
            if (!stringifiedPoints.has(newPoint)) 
                    foldedPoints.push(new Array(x, y));
        }
    });
    codeDimensions[1] =  foldingLine;
    return foldedPoints;
}

function printCode(foldedPoints){
    let a = Array(codeDimensions[0] * codeDimensions[1]).fill(' ');

    foldedPoints.forEach(point => {
        const index = point[0] + point[1] * codeDimensions[0];
        a[index] = '#';
    });

    let s = '';
    let i = 0;
    
    while(i <  a.length){
        let x = 0;
        while(x <  codeDimensions[0]){
            s += a[i];
            x++;
            i++;
        }
        s += "\n";
   }
    return s;
}