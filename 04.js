export function solvePart1(input){
    var splitInput = input.split("\r\n\r\n");
    var calledNumbers = splitInput[0];
    var boards = splitInput.splice(1);
    var res;

    initBoards(boards);

    calledNumbers.split(",").every(lastCalledNumber =>{
        for(let i = 0; i < boards.length; i++){
            boards[i] = boards[i]
            .map((curr) => {
                return (curr == lastCalledNumber) ? -1 : curr;
            });
            let unmarkedNumbersSum = checkBingo(boards[i]);
            if(unmarkedNumbersSum){
                res = lastCalledNumber * unmarkedNumbersSum;
            }
        }
        if(res)
            return false;
        return true;
    });

    return res;
}

export function solvePart2(input){
    var splitInput = input.split("\r\n\r\n");
    var calledNumbers = splitInput[0];
    var boards = splitInput.splice(1);
    var res;
    let bingoedBoards = [];

    initBoards(boards);

    calledNumbers.split(",").every(lastCalledNumber =>{
        for(let i = 0; i < boards.length; i++){
            if(bingoedBoards.indexOf(i) == -1){
                boards[i] = boards[i]
                .map((curr) => {
                    return (curr == lastCalledNumber) ? -1 : curr;
                });
                let unmarkedNumbersSum = checkBingo(boards[i]);
                if(unmarkedNumbersSum){
                    bingoedBoards.push(i);
                    if(bingoedBoards.length == boards.length)
                        res = lastCalledNumber * unmarkedNumbersSum;
                }
            }
        } 
        return res ? false : true;
    });
    
    return res;
}

function initBoards(boards) {
    for (let i = 0; i < boards.length; i++) {
        boards[i] = boards[i]
            .trim()
            .replaceAll("\r\n", " ")
            .replaceAll("  ", " ")
            .split(" ");
    }
}

function checkBingo(currBoard){
    // check rows
    let x = 0;
    while(x < currBoard.length){
        let rowAcc = 0;
        for(let i = 0 + x; i < 5 + x; i++){
            rowAcc += parseInt(currBoard[i]);
        } 
        if(rowAcc == -5)
            return getUnmarkedNumbersSum(currBoard);
        x += 5;
    }

    // check columns
    let y = 0;
    while(y <= 5 ){
        let rowAcc = 0;
        for(let i = 0 + y; i < currBoard.length; i+=5){
            rowAcc += parseInt(currBoard[i]);
        } 
        if(rowAcc == -5)
            return getUnmarkedNumbersSum(currBoard);
        y ++;
    }
}

function getUnmarkedNumbersSum(currBoard){
    return currBoard.reduce((acc, curr) => {
        return curr >= 0 ? acc + parseInt(curr) : acc;
    }, 0);
}

