const END = 'end';
const START = 'start';
var currentPath = "";
var partTwoPaths = new Set();
var adjacencyList  = new Map();

export function solvePart1(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();

    const graph = initGraph(input);

    const startNode = START;
    const endNode = END;
    const result = graph.countDistinctPaths(startNode, endNode);
    console.log(`Number of distinct paths: ${result}`);

    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return result;
}

export function solvePart2(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();

    const graph = initGraph(input);

    const startNode = START;
    const endNode = END;
    const result = graph.countDistinctPaths2(startNode, endNode);

    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return result;
}

class Graph {
    constructor() {
        this.adjList = new Map();
    }

    addNode(node) {
        if (!this.adjList.get(node))
            this.adjList.set(node, []);
    }

    addEdge(node1, node2) {
        this.adjList.get(node1).push(node2);
        this.adjList.get(node2).push(node1); // Assuming an undirected graph
    }

    dfsCountPaths(node, visited, endNode) {
        if (node === endNode) {
            return 1; // Reached the end, count as a valid path
        }

        if (node == node.toLowerCase())
            visited.add(node);
        let count = 0;

        for (const neighbor of this.adjList.get(node)) {
            if (!visited.has(neighbor)) {
                count += this.dfsCountPaths(neighbor, visited, endNode);
            }
        }

        visited.delete(node); // Backtrack

        return count;
    }

    countDistinctPaths(startNode, endNode) {
        const visited = new Set();
        return this.dfsCountPaths(startNode, visited, endNode);
    }

    countDistinctPaths2(startNode, endNode) {
        const visited = new Map();
        const smallNodeVisits = new Map(); // Track small node visits
        return this.dfsCountPaths2(startNode, visited, endNode);
    }

    dfsCountPaths2(node, visited, endNode) {
        if (node === endNode) {
            currentPath += node + " ";
            return 1; // Reached the end, count as a valid path
        }
        
        let count = 0;

        if (node == node.toLowerCase()){
            if(visited.get(node) > 1){
                visited.delete(node); // Backtrack
                currentPath += node + ' ';
                return count;
            } else if(visited.get(node) == 1){ 
                if(![...visited.values()].includes(2))
                    visited.set(node, 2);
                else {
                    visited.delete(node); // Backtrack
                    currentPath += node + ' ';
                    return count;
                }
            } else 
                visited.set(node, 1);
        } else 
            visited.set(node, 1);


        for (const neighbor of this.adjList.get(node)) {
            let neighborIsSmall = neighbor == neighbor.toLowerCase();

            if(!neighborIsSmall)
                count += this.dfsCountPaths2(neighbor, visited, endNode);
            else {
                if (neighbor != START
                    && (!visited.has(neighbor)
                        || (visited.has(neighbor) 
                            &&![...visited.values()].includes(2)
                        )
                    ))
                    count += this.dfsCountPaths2(neighbor, visited, endNode);
             }
        }

        visited.delete(node); // Backtrack
        currentPath += node + ' ';
        return count;
    }

}

function initGraph(input) {
    const graph = new Graph();
    input.split('\r\n').forEach(row => {
        const [nodeStart, nodeEnd] = row.split('-');
        graph.addNode(nodeStart);
        graph.addNode(nodeEnd);
        graph.addEdge(nodeStart, nodeEnd);
    });
    return graph;
}

