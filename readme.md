 Given a 2-D array as input containing 0s (open area) and 1s (obstacle), find target marked with 9 and return number of moves.

Can only move horizontally or vertically. Start at [0,0] coordinate, but if it's not available go to the next coordinate to the right, then down.
If there's no solution return -1.

 var inputEx=  [
            [0,1,1,0],
            [0,0,1,0],
            [1,0,9,0],
            [1,0,0,0]
        ];

shortestPath(inputEx); ~~~> 3


solution approach:

Used a linked-list containing a queue (FIFO) of nodes. A 2D array initialized to its 0 value was also used to keep track of which coordinates were already checked to prevent circling back.

An alternative approach would be to use a Graph with search-in-breadth. Implementing Dijkstra's algorithm approach led to a smaller time complexity of O(n) (linear) as each coordinate is checked only once.
