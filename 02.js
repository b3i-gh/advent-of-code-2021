export function solvePart1(input){
    var hPos = 0;
    var vPos = 0;
    input
        .split("\r\n")
        .forEach(curr => {
            let [direction, units] = curr.split(" ");
            switch(direction){
                case 'forward':
                    hPos+=parseInt(units);
                    break;
                case 'down':
                    vPos+=parseInt(units);
                    break;
                case 'up':
                    vPos+=parseInt(units);
                    break;
            }
        });
    return hPos * vPos;
}

export function solvePart2(input){
    var aim = 0;
    var hPos = 0;
    var vPos = 0;
    input
        .split("\r\n")
        .forEach(curr => {
            let [direction, units] = curr.split(" ");
            switch(direction){
                case 'forward':
                    hPos+=parseInt(units);
                    vPos+= aim*parseInt(units);
                    break;
                case 'down':
                    aim+=parseInt(units);
                    break;
                case 'up':
                    aim-=parseInt(units);
                    break;
            }
        });
    return hPos * vPos;
}