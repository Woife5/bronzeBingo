// Declare and initialize global variables
// The initialisation tells the editor which type every variable uses
let grid = [[false]];
let phrases = [''];
let won = false;

// Remember current timestamp to add to the time spent on page counter
let timestampArrived = Date.now();

window.onbeforeunload = function(){
  incrementStat('timeOnPage', Date.now()-timestampArrived);
};

// Add change listener to the mode selector
const modeselect = document.getElementById('modeselect');
modeselect.addEventListener('change', resetGame);

// Add chnage listener to the color selector
const colorselect = document.getElementById('colorselect');
colorselect.addEventListener('change', updateColorMode);

// Initialize mode and color selectors
resetColorSelector();
resetModeSelector();

// Check if gamemode is already set in localStorage and apply if it is set
if (localStorage.getItem('gamemode') && (Number(localStorage.getItem('gamemode')) < bronzeBingo.gameModeCount)) {
  modeselect.options.selectedIndex = localStorage.getItem('gamemode');
}

// Check if the colormode is already set in localStorage and apply if it is set
if (localStorage.getItem('colormode') && (Number(localStorage.getItem('colormode')) < bronzeBingo.colorModes.length)) {
  bronzeBingo.colorMode = localStorage.getItem('colormode');
  applyColorMode();
  colorselect.options.selectedIndex = bronzeBingo.colorMode;
}

// Initialize game
resetGame();

// Show game version in the title
document.getElementsByTagName('title')[0].textContent += ' ' + bronzeBingo.version;

/**
 * Resets the entire game board
 */
function resetGame() {
  // Reset the mode selector if new data has been added. This way new temporary game data
  // can be added by the user and the program can work with it.
  if (modeselect.childElementCount !== bronzeBingo.gameModeCount) {
    resetModeSelector();
  }

  // Currently selected gamemode
  const curmode = modeselect.options[modeselect.selectedIndex].value;

  // Set name of currently set gamemode
  document.getElementById('bingo').innerText = bronzeBingo.gameModes[curmode].name;

  // Store current gammode in localstorage
  let gamemode = Object.keys(bronzeBingo.gameModes).indexOf(curmode);
  localStorage.setItem('gamemode', gamemode);

  // Check the currently selected gamemode and set its phrases
  phrases = bronzeBingo.gameModes[curmode].data;

  // Reset the won variable and reshuffle the phrases array
  won = false;
  shuffle(phrases);

  // Remove the green color from Bingo and remove reset-button color
  document.getElementById('restartbutton').classList.remove('won');
  document.getElementById('bingo').classList = '';

  // Remove the active and winning paint from each tile
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const elem = document.getElementById(row + '' + col);
      elem.innerHTML = phrases[row * 4 + col];
      elem.classList = '';
      elem.onClick = function () { onClick(row, col) };
    }
  }

  // Reset the grid
  grid = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false]
  ];

  // Track games palyed counter
  incrementStat('gamesPlayed');
}

/**
 * Get all game modes from bronzeBingo object again and write them to the mode selector
 */
function resetModeSelector() {
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
function resetColorSelector() {
  colorselect.innerHTML = '';

  for (let i = 0; i < bronzeBingo.colorModes.length; i++) {
    const option = document.createElement('option');
    option.value = bronzeBingo.colorModes[i].mode;
    option.textContent = bronzeBingo.colorModes[i].name;
    colorselect.appendChild(option);
  }
}

/**
 * This method takes an array and shuffles it.
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
function onClick(row, col) {
  grid[row][col] = true;
  let elem = document.getElementById(row + '' + col);
  elem.classList.add('done');
  elem.onClick = function () { };

  if (!won) {
    if (checkWin()) {
      onWin();
    }
  }

  // Track clicked tiles stat
  incrementStat('tilesActivated');
}

/**
 * This method checks if the game is won
 * If the game is won, the row that won the game is colored accordingly
 * @return true when the current game is won, false otherwise
 */
function checkWin() {
  for (let row = 0; row < 4; row++) {
    if (grid[row][0] && grid[row][1] && grid[row][2] && grid[row][3]) {
      colorWinningRow(row);
      return true;
    }
  }
  for (let col = 0; col < 4; col++) {
    if (grid[0][col] && grid[1][col] && grid[2][col] && grid[3][col]) {
      colorWinningCol(col);
      return true;
    }
  }
}

/**
 * This method colors the reset button and Bingo text green
 */
function onWin() {
  won = true;
  document.getElementById('restartbutton').classList.add('won');
  document.getElementById('bingo').classList.add('bingo');

  // Track games won stat
  incrementStat('gamesWon');
}

/**
 * This method marks one row in the grid as the winning row
 * @param {Number} row Row-number
 */
function colorWinningRow(row) {
  for (let i = 0; i < 4; i++) {
    const elem = document.getElementById(row + '' + i);
    winningTile(elem);
  }
}

/**
 * This method marks one column in the grid as the winning column
 * @param {Number} col Column-number
 */
function colorWinningCol(col) {
  for (let i = 0; i < 4; i++) {
    const elem = document.getElementById(i + '' + col);
    winningTile(elem);
  }
}

/**
 * This method takes one html element, adds the 'winningrow' class and removes the 'done' class
 * @param {HTMLElement} elem Element to alter
 */
function winningTile(elem) {
  elem.classList.add('winningrow');
  elem.classList.remove('done');
}

/**
 * This function updates the color mode by swapping the class on the body.
 */
function updateColorMode() {
  bronzeBingo.colorMode = colorselect.selectedIndex;
  localStorage.setItem('colormode', bronzeBingo.colorMode);
  applyColorMode();
}

/**
 * Applys the currently selected colormode
 */
function applyColorMode() {
  const body = document.getElementsByTagName('body')[0];
  body.className = bronzeBingo.colorModes[bronzeBingo.colorMode].mode;
}

function incrementStat(stat, amount = 1) {
  let statCount = localStorage.getItem(stat);
  if(statCount){
    localStorage.setItem(stat, Number(statCount)+amount);
  }else{
    localStorage.setItem(stat, amount);
  }
}

function displayStats() {
  const wins = Number(localStorage.getItem('gamesWon'));
  const plays = Number(localStorage.getItem('gamesPlayed'));
  const clicks = Number(localStorage.getItem('tilesActivated'));

  incrementStat('timeOnPage', Date.now()-timestampArrived);
  timestampArrived = Date.now();

  let pagetime = Number(localStorage.getItem('timeOnPage'));
	const hours = Math.floor(pagetime / 3600000);
	pagetime -= hours * 3600000;
	const minutes = Math.floor(pagetime / 60000);
	pagetime -= minutes * 60000;
	const seconds = Math.floor(pagetime / 1000);

  const statText = `Games played: ${plays}
Games won: ${wins}
Tiles activated: ${clicks}
Time spent on page: ${hours}h, ${minutes}m, ${seconds}s`;

  alert(statText);
}