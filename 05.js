export function solvePart1(input){
    var splitInput = input.split("\r\n");
    const grid = [];
     
    splitInput.forEach(curr =>{
        let [x1, y1, x2, y2] = curr
            .split(' -> ')
            .toString()
            .split(',');

        if(x1 == x2) { // vertical line
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++){
                if(!grid[y])
                    grid[y] = [];
                (grid[y][x1]) ? grid[y][x1]++ : grid[y][x1] = 1;
            }
        } else if (y1 == y2) { // horizontal line
            for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++){
                if(!grid[y1])
                    grid[y1] = [];
                (grid[y1][x]) ? grid[y1][x]++ : grid[y1][x] = 1;
            }
        }
    });
  
   

    return grid.toString().split(',').reduce((acc, curr) =>{
        return curr >= 2 ? acc+1 : acc;
    },0);
}

function printGrid(grid){
    const maxLenght = grid.reduce((acc,curr) => {
        return curr.length > acc ? curr.length : acc;
    }, 0);

    for(let y = 0; y < grid.length; y++){
        let row = '';
        for(let x = 0; x < maxLenght; x++){
            if(!grid[y]) grid[y] = [];
            row += grid[y][x] ? grid[y][x] : 0;
        }
        console.log(row);
    }
}

export function solvePart2(input){
    var splitInput = input.split("\r\n");
    const grid = [];
     
    splitInput.forEach(curr =>{
        let [x1, y1, x2, y2] = curr
            .split(' -> ')
            .toString()
            .split(',');

        if(x1 == x2) { // vertical line
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++){
                if(!grid[y])
                    grid[y] = [];
                (grid[y][x1]) ? grid[y][x1]++ : grid[y][x1] = 1;
            }
        } else if (y1 == y2) { // horizontal line
            for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++){
                if(!grid[y1])
                    grid[y1] = [];
                (grid[y1][x]) ? grid[y1][x]++ : grid[y1][x] = 1;
            }
        } else { // diagonal line
            let z = 0;
            let xDirection = parseInt(x1) < parseInt(x2) ? +1 : -1;
            let yDirection = parseInt(y2) > parseInt(y1) ? +1 : -1;

            let y = parseInt(y1);
            let x = parseInt(x1);
            while(z <= Math.abs(x2-x1)){
                if(!grid[y + (yDirection * z)])
                    grid[y + (yDirection * z)] = [];
                (grid[y + (yDirection * z)][x + (xDirection * z)]) ? grid[y + (yDirection * z)][x + (xDirection * z)]++ : grid[y + (yDirection *z)][x + (xDirection * z)] = 1;
                z++;
            } 
        }
    });

    // printGrid(grid);
  
   

    return grid.toString().split(',').reduce((acc, curr) =>{
        return curr >= 2 ? acc+1 : acc;
    },0);
}