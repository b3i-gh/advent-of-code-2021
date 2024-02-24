export function solvePart1(input){
    return input.split("\r\n").reduce((acc, curr, index, arr) => (curr > arr[index - 1] ? acc + 1 : acc),0);
}

export function solvePart2(input){
    const rows = input.split("\r\n");
    return rows
        .map(el => parseInt(el))
        .reduce((acc, curr, index, arr) => {
            const currSum = curr + arr[index+1] + arr[index+2];
            const prevSum = arr[index-1] ? arr[index-1] + arr[index] + arr[index+1] : 0;
            return prevSum && currSum > prevSum ? acc + 1 : acc;
        },0);
}