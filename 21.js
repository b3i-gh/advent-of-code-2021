let playerScores = [0,0];
let playerPositions = [];
let rolls = 0;
let currentPlayer = 0;

export function solvePart1(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();
    
    setupPlayerPositions(input);

    while(playerScores[0] < 1000 && playerScores[1] < 1000){
        playARound();
    }

    let res = rolls * (Math.min(playerScores[0],playerScores[1]));

    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return res;
}

export function solvePart2(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();

    setupPlayerPositions(input);

    let res2 =countWins(playerPositions[0],playerPositions[1],0,0);


    
    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return res2;
}

function setupPlayerPositions(input){
    playerPositions = input.split("\r\n").map(row => {
        return parseInt(row.charAt(row.length - 1) - 1);
    });
}

function playARound(){
    let movement = 0;
    for(let i = 0; i < 3; i++){
        rolls++;
        movement += rolls;
    }
    playerPositions[currentPlayer] = (playerPositions[currentPlayer] + movement) %10;
    playerScores[currentPlayer] += (playerPositions[currentPlayer] == 0 ? 10 : playerPositions[currentPlayer]);
    currentPlayer == 0 ? currentPlayer = 1 : currentPlayer = 0; 
}

let dp = new Map();

function countWins(p1, p2, s1, s2){
    if( s1 >= 21)
        return [1,0];
    if( s2 >= 21)
        return [0,1];
    if(dp.get(JSON.stringify([p1,p2,s1,s2])))
        return dp.get(JSON.stringify([p1,p2,s1,s2]));
    let ans = [0,0];
    for (let d1 = 1; d1 < 4; d1++){
        for (let d2 = 1; d2 < 4; d2++){
            for (let d3 = 1; d3 < 4; d3++){
                let new_p1 = (p1+d1+d2+d3)%10;
                let new_s1 = s1 + new_p1 + 1;
                let [x1,y1] = countWins(p2, new_p1, s2, new_s1);
                ans = [ans[0]+y1, ans[1]+x1];
            }
        }
    }
    dp.set(JSON.stringify([p1,p2,s1,s2]), ans);
    return ans;
}