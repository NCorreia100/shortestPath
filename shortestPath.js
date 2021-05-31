/*
 * Given a 2-D array as input containing 0s (open area) and 1s (obstacle), find target marked with 9 and return number of moves.
    Can only move horizontally or vertically. Start at [0,0] coordinate, but if it's not available select the area to the right, then down.
    If there's no solution return -1.

 var inputEx=  [
            [0,1,1,0],
            [0,0,1,0],
            [1,0,9,0],
            [1,0,0,0]
        ];

shortestPath(inputEx); ~~~> 3


Need: 
    1. LinkedList containing a node for each element and a 2-D array defaulted to its 0 value.
    2. Each node contains a list of neighbors, that can be moved to (0).
    3. A Queue to handle the path of movement.
    4. A regression function call to handle the queue.
    5. Input validation
 */

var LinkedList = function (inputArr) {
    this.inputArr = inputArr;
    this.nodeQueue = [];
    this.searchedElems = new Array(inputArr.length).fill([]).map(el=> new Array(inputArr.length)); //prevent same node from entering queue twice
}

var Node = function ({ value, rowIndex, colIndex, distanceFromInit = 0 }) {
    this.val = value;
    this.row = rowIndex;
    this.col = colIndex;
    this.distance = distanceFromInit;
}

LinkedList.prototype.createNodeAtCoordinate = function (row, col, distance) {

    let newNode = new Node({
        value: this.inputArr[row][col],
        rowIndex: row,
        colIndex: col,
        distanceFromInit: distance
    });

    return newNode;
}

LinkedList.prototype.retrieveNeighbors = function (row, col, distance) {

    let nodeArr = [];

    //for each direction, verify  that it's within the boundaries of the input,
    // it's not an obstacle, and node wasn't already checked
    //down
    if (row < this.inputArr.length - 1 && this.inputArr[row + 1][col] != 1 && !this.searchedElems[row + 1][col]) {
        nodeArr.push(this.createNodeAtCoordinate(row + 1, col, distance + 1));
    }
    //right
    if (col < this.inputArr[row].length - 1 && this.inputArr[row][col + 1] != 1 && !this.searchedElems[row][col + 1]) {
        nodeArr.push(this.createNodeAtCoordinate(row, col + 1, distance + 1));
    }
    //up
    if (row > 0 && this.inputArr[row - 1][col] != 1 && !this.searchedElems[row - 1][col]) {
        nodeArr.push(this.createNodeAtCoordinate(row - 1, col, distance + 1));
    }
    //left
    if (col > 0 && this.inputArr[row][col - 1] != 1 && !this.searchedElems[row][col - 1]) {
        nodeArr.push(this.createNodeAtCoordinate(row, col - 1, distance + 1));
    }

    return nodeArr;
}

LinkedList.prototype.appendNodeAndMarkElemAsChecked = function(node) {
    
    this.nodeQueue.push(node);

    this.searchedElems[node.row][node.col] = true;
}



const lookFor9Regressively = linkedList => {
    //get & remove next node on the queue
    let curNode = linkedList.nodeQueue.shift();
  
    //edge case ~> queue is empty because path is completely blocked or there is no 9
    
      if(!curNode) return -1;
    //base case ~> found 9
    if (curNode.val === 9) return curNode.distance;


    //get valid neighbors
    let uncheckedNeighbors = linkedList.retrieveNeighbors(curNode.row, curNode.col, curNode.distance);
    //create node for each neighbor ~>already during retrieval
    
    //append these nodes to the queue and mark them as checked
    uncheckedNeighbors.forEach(node => linkedList.appendNodeAndMarkElemAsChecked(node));
    
    //check the next node 
    return lookFor9Regressively(linkedList);
}

const shortestPath=inputArr=>{
    //input validation
    if(!Array.isArray(inputArr) || inputArr.length<1) return -1;

    let linkedList = new LinkedList(inputArr);

    let firstNode = new Node({
        value:inputArr[0][0],
        rowIndex:0,
        colIndex:0
    });

    //edge case ~> initial node has an obstacle
    while(firstNode.val===1){
        if(firstNode.col<inputArr[firstNode.row].length-1) 
        firstNode = new Node({
            value:inputArr[firstNode.row][firstNode.col+1],
            rowIndex:firstNode.row,
            colIndex:firstNode.col+1
        });
        else if (firstNode.row<inputArr.length-1) 
        firstNode = new Node({
            value:inputArr[firstNode.row+1][0],
            rowIndex:firstNode.row+1,
            colIndex:0
        });
        else return -1; //no 0s in the input array
    }

    //append first node
    linkedList.nodeQueue.push(firstNode);

    //start search for 9
    let distance = lookFor9Regressively(linkedList);

    //return distance
    return distance;
}

module.exports = shortestPath;