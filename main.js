let grid;
let phrases;
let won = false;
let mode = document.getElementById('mode');

mode.addEventListener('change', resetGame);
resetGame();

/**
 * Resets the entire game board
 */
function resetGame(){
  // Check the currently selected gamemode and set its phrases
  phrases = gameModes[mode.options[mode.selectedIndex].value];
  
  // Reset the won variable and reshuffle the phrases array
  won = false;
  shuffle(phrases);

  // Remove the restart text and green color from Bingo
  document.getElementById('restarttext').style.display="none";
  document.getElementById('bingo').classList.remove('bingo');

  // Remove the active and winning paint from each tile
  let elem;
  for(let row = 0; row < 4; row++){
    for(let col = 0; col < 4; col++){
      elem = document.getElementById(row+''+col);
      elem.innerHTML = phrases[row*4+col];
      elem.classList.remove('done');
      elem.classList.remove('winningrow');
      elem.onClick = function() {onClick(row,col)};
    }
  }

  // Reset the grid
  grid = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false]
  ];
}

/**
 * This method taked an array and shuffles it.
 * @param {Array} a The array to be shuffled
 */
function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

/**
 * This method marks a square on the playing field as checked.
 */
function onClick(row, col){
  grid[row][col] = true;
  let elem = document.getElementById(row+''+col);
  elem.classList.add('done');
  elem.onClick = null;

  if ( !won ) {
    if( checkWin() ){
      onWin();
    }
  }
}

/**
 * This method checks if the game is won
 */
function checkWin(){
  for (let row = 0; row < 4; row++) {
    if(grid[row][0] == true && grid[row][1] == true && grid[row][2] == true && grid[row][3] == true){
      colorWinningRow(row, -1);
      return true;
    }
  }
  for (let col = 0; col < 4; col++) {
    if(grid[0][col] == true && grid[1][col] == true && grid[2][col] == true && grid[3][col] == true){
      colorWinningRow(-1, col);
      return true;
    }
  }
}

/**
 * This method activates the reset option and colors Bingo green
 */
function onWin(){
  won = true
  document.getElementById('restarttext').style.display="block";
  document.getElementById('bingo').classList.add('bingo');
}

/**
 * This method takes the row or col that won the game and marks it green
 * If the win condition was met in a row, col must be -1 and otherwise
 */
function colorWinningRow(row, col){
  if(col == -1){
    for (let i = 0; i < 4; i++) {
      document.getElementById(row+''+i).classList.add('winningrow');
    }
  }else{
    for (let i = 0; i < 4; i++) {
      document.getElementById(i+''+col).classList.add('winningrow');
    }
  }
}

let game = {
  "version" : "1.0.0",
  "author" : "Wolfgang Schwendtbauer",
  "gameVerions" : 2
}