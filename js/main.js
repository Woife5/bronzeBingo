// Declare and initialize global variables
// The initialisation tells the editor which type every variable uses
let grid = [[false]];
let phrases = [""];
let won = false;

// Add change listener to the mode selector
const modeselect = document.getElementById('modeselect');
modeselect.addEventListener('change', resetGame);

// Add chnage listener to the color selector
const colorselect = document.getElementById('colorselect');
colorselect.addEventListener('change', updateColorMode);

// Initialize game
resetGame();

// Check if the colormode is already set in localStorage and apply if it is set
if (localStorage.getItem('colormode') && ( Number( localStorage.getItem('colormode') < bronzeBingo.colorModes.length ) ) ) {
  bronzeBingo.colorMode = localStorage.getItem('colormode');
  applyColorMode();
  colorselect.options.selectedIndex = bronzeBingo.colorMode;
}

/**
 * Resets the entire game board
 */
function resetGame(){
  // Reset the mode selector if new data has been added. This way new temporary game data
  // can be added by the user and the program can work with it.
  if (modeselect.childElementCount !== bronzeBingo.gameModeCount) {
    resetModeSelector();
  }

  // Check if the color selector contains all color modes
  if(colorselect.childElementCount !== bronzeBingo.colorModes.length) {
    resetColorSelector();
  }

  // Check the currently selected gamemode and set its phrases
  phrases = bronzeBingo.gameModes[modeselect.options[modeselect.selectedIndex].value].data;
  
  // Reset the won variable and reshuffle the phrases array
  won = false;
  shuffle(phrases);

  // Remove the restart text and green color from Bingo
  document.getElementById('restarttext').style.display="none";
  document.getElementById('bingo').classList = "";

  // Remove the active and winning paint from each tile
  for(let row = 0; row < 4; row++){
    for(let col = 0; col < 4; col++){
      const elem = document.getElementById(row+''+col);
      elem.innerHTML = phrases[row*4+col];
      elem.classList = "";
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
 * Get all game modes from bronzeBingo object again and write them to the mode selector
 */
function resetModeSelector(){
  // Reset the mode selector
  let modes = Object.keys(bronzeBingo.gameModes);
  modeselect.innerHTML = '';
  
  for (let i = 0; i < modes.length; i++) {
    const option = document.createElement('option');
    option.value = modes[i];
    option.textContent = bronzeBingo.gameModes[modes[i]].name;
    modeselect.appendChild(option);
  }
}

/**
 * Reset the color selector
 */
function resetColorSelector(){
  colorselect.innerHTML = '';

  for (let i = 0; i < bronzeBingo.colorModes.length; i++) {
    const option = document.createElement('option');
    option.value = bronzeBingo.colorModes[i].mode;
    option.textContent = bronzeBingo.colorModes[i].name;
    colorselect.appendChild(option);
  }
}

/**
 * This method taked an array and shuffles it.
 * @param {Array} a The array to be shuffled
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let x = a[i];
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
  elem.onClick = function() {};

  if ( !won ) {
    if( checkWin() ){
      onWin();
    }
  }
}

/**
 * This method checks if the game is won
 * If the game is won, the row that won the game is colored accordingly
 * @return true when the current game is won, false otherwise
 */
function checkWin(){
  for (let row = 0; row < 4; row++) {
    if(grid[row][0] && grid[row][1] && grid[row][2] && grid[row][3]){
      colorWinningRow(row, -1);
      return true;
    }
  }
  for (let col = 0; col < 4; col++) {
    if(grid[0][col] && grid[1][col] && grid[2][col] && grid[3][col]){
      colorWinningRow(-1, col);
      return true;
    }
  }
}

/**
 * This method activates the reset option and colors Bingo green
 */
function onWin(){
  won = true;
  document.getElementById('restarttext').style.display="block";
  document.getElementById('bingo').classList.add('bingo');
}

/**
 * This method takes the row or col that won the game and marks it green
 * If the win condition was met in a row, col must be -1 and otherwise
 */
function colorWinningRow(row, col){
  if(col === -1){
    for (let i = 0; i < 4; i++) {
      const elem = document.getElementById(row+''+i);
      elem.classList.add('winningrow');
    }
  }else{
    for (let i = 0; i < 4; i++) {
      const elem = document.getElementById(i+''+col);
      elem.classList.add('winningrow');
    }
  }
}

/**
 * This function updates the color mode by swapping the class on the body.
 */
function updateColorMode(){
  bronzeBingo.colorMode = colorselect.selectedIndex;
  localStorage.setItem('colormode', bronzeBingo.colorMode);
  applyColorMode();
}

/**
 * Applys the currently selected colormode
 */
function applyColorMode(){
  const body = document.getElementsByTagName('body')[0];
  body.className = bronzeBingo.colorModes[bronzeBingo.colorMode].mode;
}