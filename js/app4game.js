function jst(pJSON) {
  return JSON.stringify(pJSON,null,4);
}

//(function main () {

/*
 ******************************************************************************

    init

 ******************************************************************************
*/

var game;
var canvas;
var canvasid = "board";
var playerNameElement;
var difficultyElement;
var highScores;
var scoreInfo;
var scoreSelect;

function localStorageAvailable () {
        try {
            localStorage.setItem('xexe', 'ok');
            localStorage.getItem('xexe');
            localStorage.removeItem('xexe');
            return true;
        }
        catch (exception) {
            return false;
        }
}

function createCanvas4Board(pID) {
  pID = pID || "boarddiv";
  var cdiv = document.getElementById(pID);
  var cdiv = null;
  if (!cdiv) {
      // append canvas to document body
      cdiv = document.body;
      console.log("js/app4game.js:41 - canvas div element does not exist for board - append board canvas to document.body");
  } else {
      console.log("js/app4game.js:43 - DIV element for canvas of the board exists");
  }
  var canvas4div = document.createElement('canvas');
  canvas4div.id     = "board4div";
  canvas4div.width  = 1200;
  canvas4div.height = 600;
  cdiv.appendChild(canvas4div);
  return canvas4div;
}

function initGame(options) {
  options = options || {};
  canvas = document.getElementById('board');
  playerNameElement = document.getElementById('playerName');
  difficultyElement = document.getElementById('difficulty');
  scoreInfo = document.getElementById('score');
  scoreSelect = document.getElementById('score4selection');

  if (!canvas) {
    console.error("js/app4game.js:71 - canvas does not exist");
    canvas = createCanvas4Board('boarddiv');
  } else {
    if (canvas.width) {
      console.log("js/app4game.js:75 - Canvas exists  width=" + canvas.width + " height="+canvas.height+"!")
    } else {
      canvas = createCanvas4Board('boarddiv');
    }
    //alert("js/bubblebreaker.js:42 - Canvas exists  width=" + canvas.width + " height="+canvas.height+"!")
  }

  game = new BubbleBreaker(canvas, scoreInfo, scoreSelect, options);

  highScores = new HighScores('score', 5);
  // override default settings
  if (localStorageAvailable()) {
      if (localStorage.getItem('playerName')) {
          game.playerName = localStorage.playerName;
      }
      if (localStorage.getItem('difficulty')) {
          game.difficulty = localStorage.difficulty;
      }
      if (localStorage.getItem('highScores')) {
          highScores.load(localStorage.highScores);
      }
  }
  game.theme.background =
      getComputedStyle(canvas, null).getPropertyValue('background-color');
  document.getElementById('headingTitle').innerHTML = 'Bubble Breaker';
  playerNameElement.value = game.playerName;
  difficultyElement.value = game.difficulty;
  highScores.draw();
  game.newGame();
  canvas.addEventListener('click',
      function (event) {
          var bcr = board.getBoundingClientRect();
          var pos = {
              x: event.clientX - bcr.left - getComputedStyle(canvas,
                  null).getPropertyValue('padding-left').slice(0, -2),
              y: event.clientY - bcr.top - getComputedStyle(canvas,
                  null).getPropertyValue('padding-top').slice(0, -2)
          };
          //alert("js/main.js:71 - Click Position: "+JSON.stringify(pos,null,4));
          console.log("js/main.js:71 - Click Position: "+JSON.stringify(pos,null,4));
          var gameStatus = game.handleClick(pos);
          console.log("js/main.js:72 - gameStatus="+JSON.stringify(gameStatus,null,4));
          if (gameStatus.gameOver) {
              if (gameStatus.bonus) {
                  alert('Game over.\n\nBonus: ' + gameStatus.bonus);
              } else {
                  alert('Game over.');
              }
              if (game.playerName) {
                console.log("app4game.js:114 - Player name '"+game.playerName+"' exists");
              } else {
                game.playerName = window.prompt("Please enter Player Name", "");
                playerNameElement.value = game.playerName;
                if (localStorageAvailable()) {
                    localStorage.playerName = game.playerName;
                }
              }
              console.log("app4game.js:125 - consider Highscore "+game.score + "Name: '" + game.playerName+"'");
              highScores.consider(
                  {score: game.score, playerName: game.playerName}
              );
              if (game.score > 0) {
                if (localStorageAvailable()) {
                    localStorage.highScores = highScores.save();
                }
              }
          }
      }
  );

var btnlist = ["board","options","highScores"];

function hideAllButtons() {
  hide('button4new');
  hide('button4board');
  hide('button4options');
  hide('button4highScores');
}


function showAllButtons(pID) {
  console.log("showAllButtons('"+pID+"')");
  show('button4new');
  show('button4board');
  show('button4options');
  show('button4highScores');
  if (pID) {
    var found = btnlist.indexOf(pID);
    if (found >= 0) {
      hide('buttons4'+pID);
    }
  }
}

function hideAllPages(pID) {
  console.log("hideAllPages('"+pID+"')");
  hide('board');
  hide('options');
  hide('highScores');
  if (pID) {
    show_all_buttons(pID);
  } else {
    show_all_buttons();
  }

}


function showAllPages(pID) {
  console.log("showAllPages('"+pID+"')");
  show('board');
  show('options');
  show('highScores');
  if (pID) {
    hide(pID);
  } else {
    show_all_buttons();
  }

}

function showPage4Game(pID) {
  console.log("app4game.js:187 - showPage('"+pID+"')");
  hideAllPages(pID);
  showAllButtons(pID);
  if (pID && (pID !== "board")) {
    //hide("button4new");
  }
}

function showNewGame(event) {
    game.newGame();
    show('board');
    show('button4new');
    hide('options');
    hide('highScores');
}

function showNewGame4Menu(event) {
    game.newGame();
    app.nav.page('play');
}

  // click on new game

//  document.getElementById('newGame').addEventListener('click',showNewGame);
//  document.getElementById('button4new').addEventListener('click',showNewGame);

document.getElementById('button4clear').addEventListener('click',function (event) {
  highScores.initChart();
  if (localStorageAvailable()) {
      localStorage.highScores = highScores.save();
  }
  highScores.draw();

});
  // change player name

  playerNameElement.addEventListener('change',
      function () {
          if (localStorageAvailable()) {
              localStorage.playerName = playerNameElement.value;
          }
          game.playerName = playerNameElement.value;
      }
  );


  // change difficulty

  difficultyElement.addEventListener('change',
      function () {
          if (localStorageAvailable()) {
              localStorage.difficulty = difficultyElement.value;
          }
          game.difficulty = difficultyElement.value;
          game.newGame();
      }
  );

}

/*
 ******************************************************************************

    actions

 ******************************************************************************
*/
    //function handleClick4Canvas()


    // click on canvas
function assignEventListener() {

}

//})();
