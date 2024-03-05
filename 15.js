export function solvePart1(input) {
  const startPerf = performance.now();
  const memoryInfo = process.memoryUsage();

  const data = input.split("\r\n").map(row => [...row].map(x => parseInt(x)));
  const sl = data.length;
  var grid = []

  for(let i = 0; i < sl; i++){
    grid[i] = [];
    for(let j = 0; j < sl; j++){
      grid[i][j] = (data[i%sl][j%sl] + Math.floor(i/sl) + Math.floor(j/sl) -1)%9 +1;
    }
  }

  var edges = [];

  var distances = [];

  for(var i=0; i < sl; ++i){
    distances[i] = [];
    for(var j=0; j< sl; ++j){
      distances[i][j] = Infinity;
      if(i > 0) edges.push([[i-1,j], [i,j], grid[i][j]]);
      if(j > 0) edges.push([[i,j-1], [i,j], grid[i][j]]);
      if(i < sl -1) edges.push([[i+1,j],[i,j],grid[i][j]]);
      if(j < sl -1) edges.push([[i,j+1],[i,j],grid[i][j]]);
    }
  }

  distances[0][0] = 0;

  // Bellman-Ford
  while(true){
    var updated = false;
    for(var edge of edges){
      var start = edge[0], end = edge[1], weight = edge[2];
      if(distances[start[0]][start[1]] + weight < distances[end[0]][end[1]]){
        distances[end[0]][end[1]] = distances[start[0]][start[1]] + weight;
        updated = true;
      }
    }
    if(!updated) 
    break;
  }

  let res = distances[sl-1][sl-1];
  
  const endPerf = performance.now();
  console.log("Execution time:", endPerf - startPerf, "milliseconds");
  console.log("Memory usage:", memoryInfo);
  return res;
}

export function solvePart2(input) {
  const startPerf = performance.now();
  const memoryInfo = process.memoryUsage();

  const data = input.split("\r\n").map(row => [...row].map(x => parseInt(x)));
  const sl = data.length;
  var grid = []

  for(let i = 0; i < sl * 5; ++i){
    grid[i] = [];
    for(let j = 0; j < sl * 5; j++){
      grid[i][j] = (data[i%sl][j%sl] + Math.floor(i/sl) + Math.floor(j/sl) -1)%9 +1;
    }
  }

  var edges = [];

  var distances = [];

  for(var i=0; i < sl * 5; ++i){
    distances[i] = [];
    for(var j=0; j< sl * 5; ++j){
      distances[i][j] = Infinity;
      if(i > 0) edges.push([[i-1,j], [i,j], grid[i][j]]);
      if(j > 0) edges.push([[i,j-1], [i,j], grid[i][j]]);
      if(i < sl * 5 -1) edges.push([[i+1,j],[i,j],grid[i][j]]);
      if(j < sl * 5 -1) edges.push([[i,j+1],[i,j],grid[i][j]]);
    }
  }

  distances[0][0] = 0;

  // Bellman-Ford
  while(true){
    var updated = false;
    for(var edge of edges){
      var start = edge[0], end = edge[1], weight = edge[2];
      if(distances[start[0]][start[1]] + weight < distances[end[0]][end[1]]){
        distances[end[0]][end[1]] = distances[start[0]][start[1]] + weight;
        updated = true;
      }
    }
    if(!updated) 
    break;
  }

  let res = distances[sl * 5 -1][sl * 5 -1];
  
  const endPerf = performance.now();
  console.log("Execution time:", endPerf - startPerf, "milliseconds");
  console.log("Memory usage:", memoryInfo);
  return res;
}