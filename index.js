import {promises as fs} from 'fs';
const args = process.argv.slice(2);
var input = "";

// Entry point (args should be the day number, eg. 01, 02, 03...)
const day = args[0];
const useTestInput = args[1];
solve();

async function readInput(){
    try {
        var filePath = "";
        if(useTestInput)
            filePath = './input/test.txt';
        else 
            filePath = `./input/${day}.txt`;
        input = await fs.readFile(filePath, 'utf8');
    } catch (error){
        console.log(error.message);
    }
}

async function solvePart1(){
    return await import(`./${day}.js`)
      .then((module) => {
        return module.solvePart1(input);
      })
      .catch((err) => {
        console.log(err.message);
      });
}

async function solvePart2(){
    return await import(`./${day}.js`)
      .then((module) => {
        return module.solvePart2(input);
      })
      .catch((err) => {
        console.log(err.message);
      });
} 

async function solve(){
    try{ 
        await readInput();
        if(!input)
            console.log("No input found for arg", day);
        else {
            const res = await solvePart1();
            const res2 = await solvePart2();
            console.log(`Day ${day} part 1 solution : ${res}`);
            console.log(`Day ${day} part 2 solution : ${res2}`);
        }
    } catch (error) {
        console.error('Error reading the file:', error);
    }
}