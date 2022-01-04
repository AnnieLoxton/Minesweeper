/*Function to create the board and location of the mines.
The board makes use of a 2D array, where each cell has two values:
X for mines, and numbers for the free cells.*/
export default function CreateBoard(row, col, mines){
    //Board for storing the values of each cell.
    let board = [];

    //Keeps track of the location of the mines. 
    let mineLocation = [];

      //Create a blank board.
      for (let x = 0; x < row; x++) {
        let subCol = [];
        for (let y = 0; y < col; y++) {
          subCol.push({
            value: 0,
            revealed: false,
            x: x,
            y: y,
            flagged: false,
          });
        }
        board.push(subCol);
      }
    
      // Randomizes the bomb placement.
      let minesCount = 0;
      while (minesCount < mines) {

        //Implements 'random' function.
        let x = random(0, row - 1);
        let y = random(0, col - 1);
    
        //Places bomb at random location(x,y) on board[x][y]
        if (board[x][y].value === 0) {
          board[x][y].value = "X";
          mineLocation.push([x, y]);
          minesCount++;
        }
      }
    
      /*Increases the value of a specific cell. 
      If the cell contains a mine, increase the value by 1. 
      Adds numbers to the board. */
      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
          if (board[i][j].value === "X") {
            continue;
          }
    
          //Top
          if (i > 0 && board[i - 1][j].value === "X") {
            board[i][j].value++;
          }
    
          //Top Right
          if (
            i > 0 &&
            j < col - 1 &&
            board[i - 1][j + 1].value === "X"
          ) {
            board[i][j].value++;
          }
    
          //Right
          if (j < col - 1 && board[i][j + 1].value === "X") {
            board[i][j].value++;
          }
    
          //Bottom Right
          if (
            i < row - 1 &&
            j < col - 1 &&
            board[i + 1][j + 1].value === "X"
          ) {
            board[i][j].value++;
          }
    
          //Bottom
          if (i < row - 1 && board[i + 1][j].value === "X") {
            board[i][j].value++;
          }
    
          //Bottom Left
          if (
            i < row - 1 &&
            j > 0 &&
            board[i + 1][j - 1].value === "X"
          ) {
            board[i][j].value++;
          }
    
          //Left
          if (j > 0 && board[i][j - 1].value === "X") {
            board[i][j].value++;
          }
    
          //Top Left
          if (i > 0 && j > 0 && board[i - 1][j - 1].value === "X") {
            board[i][j].value++;
          }
        }
      }
      return { board, mineLocation };
    };
    
    //Random function used for generating random value of x & y
    function random(min = 0, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }