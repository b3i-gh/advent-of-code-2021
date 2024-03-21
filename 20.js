export function solvePart1(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();
    
    let [iea, ii] = input.trim().split("\r\n\r\n");
    iea = iea.replaceAll("\r\n", "");
    let inputImage = ii.split("\r\n").map(row => row.split(''));
    const enchances = 2;
    const originalLenght = inputImage.length;
    inputImage = padImage(inputImage, enchances*5);

    for(let e = 0; e < enchances; e++){
        inputImage = enhanceImage(iea, inputImage);
    }

    inputImage = unpadImage(inputImage, enchances, originalLenght);

    let res1 = 0;
    inputImage.forEach(curr => {
        curr.forEach(a => {
            if (a == '#')
                res1++
    });
});

    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return res1;
}

export function solvePart2(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();
    
    let [iea, ii] = input.trim().split("\r\n\r\n");
    iea = iea.replaceAll("\r\n", "");
    let inputImage = ii.split("\r\n").map(row => row.split(''));
    const enchances = 50;
    const originalLenght = inputImage.length;
    inputImage = padImage(inputImage, enchances*8);

    for(let e = 0; e < enchances; e++){
        inputImage = enhanceImage(iea, inputImage);
    }

    inputImage = unpadImage(inputImage, enchances, originalLenght);

    let res2 = 0;
    inputImage.forEach(curr => {
        curr.forEach(a => {
            if (a == '#')
                res2++
    });
});


    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return res2;
}

function enhanceImage(iea, inputImage){
    let enhancedImage = [];
   
    for(let y = 0; y < inputImage.length; y++){
        enhancedImage.push([]);
        for(let x = 0; x < inputImage[y].length; x++){
            enhancedImage[y].push(enhancePixel(iea, inputImage, x,y));
        }
    }

    return enhancedImage;
}

function enhancePixel(iea, inputImage, x, y){
    let s = "";
    try {s += inputImage[y-1][x-1] == undefined ? '.' : inputImage[y-1][x-1]} catch (error) {s += '.'}
    try {s += inputImage[y-1][x] == undefined ? '.' : inputImage[y-1][x]} catch (error) {s += '.'}
    try {s += inputImage[y-1][x+1] == undefined ? '.' : inputImage[y-1][x+1]} catch (error) {s += '.'}
    try {s += inputImage[y][x-1] == undefined ? '.' : inputImage[y][x-1]} catch (error) {s += '.'}
    try {s += inputImage[y][x] == undefined ? '.' : inputImage[y][x]} catch (error) {s += '.'}
    try {s += inputImage[y][x+1] == undefined ? '.' : inputImage[y][x+1]} catch (error) {s += '.'}
    try {s += inputImage[y+1][x-1] == undefined ? '.' : inputImage[y+1][x-1]} catch (error) {s += '.'}
    try {s += inputImage[y+1][x] == undefined ? '.' : inputImage[y+1][x]} catch (error) {s += '.'}
    try {s += inputImage[y+1][x+1] == undefined ? '.' : inputImage[y+1][x+1]} catch (error) {s += '.'}
    let n =  parseInt(s.replaceAll('.', '0').replaceAll('#', 1), 2);
    return iea.charAt(n)
}

function addBit(c){
    return c == null ? '.' : c;
}

function padImage(inputImage, n){
    for(let i = 0; i < n; i++){
     for(let y = 0; y < inputImage.length; y++){
        
        inputImage[y].unshift('.');
        inputImage[y].push('.');
    }
    inputImage.unshift(Array(inputImage[0].length).fill('.'));
    inputImage.push(Array(inputImage[0].length).fill('.'));
    }
    return inputImage;
}

function unpadImage(inputImage, n,originalLenght){
    while(inputImage.length > originalLenght + 2*n){
        for(let y = 0; y < inputImage.length; y++){
            inputImage[y].shift();
            inputImage[y].pop();
        }
        inputImage.shift();
        inputImage.pop();
    }
    return inputImage;
}