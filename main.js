var grid = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false]
];
var phrases = [
  'kys',
  'Bronze',
  'idiot',
  'just a game',
  'u mad?',
  'blind',
  'kid',
  'retard',
  'easy',
  'uninstall',
  'Report',
  'your mom',
  'afk',
  'Noob',
  'cry',
  'suck',
  '****',
  'troll'
];
var won = false;

resetGame();

function resetGame(){
  won = false;
  shuffle(phrases);
  document.getElementById('restarttext').style.display="none";
  document.getElementById('bingo').classList.remove('bingo');
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
  grid = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false]
  ];
}

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function onClick(row, col){
  grid[row][col] = true;
  let elem = document.getElementById(row+''+col);
  elem.classList.add('done');
  elem.onClick = null;

  if (! won) {
    if(checkWin()){
      onWin();
    }
  }
}

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

function onWin(){
  won = true
  document.getElementById('restarttext').style.display="block";
  document.getElementById('bingo').classList.add('bingo');
}

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
