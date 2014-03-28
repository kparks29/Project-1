/*  KNOWN BUGS
3rd click on online mode doesnt toggle
need to make waiting for player screen
need to $watch win condition
need to make rules for player can only play the move that is their symbol
*/



angular.module('marioTicTacToe', ['firebase'])
.controller('MainCtrl', function($scope,$firebase) {	

  //see's if there are two players active and sets a symbol to them
  //if there is not 1 player then add him
  $scope.setPlayer = function() {
    if (!$scope.game.player[0]) {
      $scope.game.player[0] = true;
      $scope.playerSymbol = "X";
    }
    //if there is no player 2 then add him
    else if (!$scope.game.player[1] && $scope.playerSymbol == "") {
      $scope.game.player[1] = true;
      $scope.playerSymbol = "O";
    }

    //if both players exist, announce game is full in the console
    else if ($scope.game.player[0] && $scope.game.player[1]) {
      console.log("sorry game is full");
    }
    //save this to the DB
    $scope.game.$save();
  }

  //if the player selects online mode, load the DB
  $scope.onlineMode = function() {
    var ticTacRef = new Firebase('https://mariotictactoe.firebaseio.com/'); 
    $scope.fbRoot = $firebase(ticTacRef);

  //after the DB loads run this
    $scope.fbRoot.$on('loaded', function() {
      var IDs = $scope.fbRoot.$getIndex();
      //if the DB is empty load up the DB with these values (aka new game)

      if(IDs.length == 0) {
        $scope.fbRoot.$add({ 
          endMove: [],
          go: false,
          timeCount: 10,
          timeClicked: false,
          world: 1,
          level: 1,
          counter: 0,
          filler: "X",
          win: false,
          wins: [0,0],
          board: [["T","I","C"],["T","A","C"],["T","O","E"]],
          player: [false,false],
          players: [
           {chip: 'X', gamesWon:0},
           {chip:'O',gamesWon:0,nextMove: [{row:false, num:0},{col:false,num:0},{dia1:false},{dia2:false}]}
           ],
          xturn: {val:false}
        });
        //if something is changed, get the id of the variable then load it into the game variable
        $scope.fbRoot.$on('change', function() {
          IDs = $scope.fbRoot.$getIndex();
          $scope.game = $scope.fbRoot.$child(IDs[0]);
        });
      } 
      else 
      {
        //game variable is loaded
        $scope.game = $scope.fbRoot.$child(IDs[0]);
      }
      
    });
  }



  


$scope.loadNewGame = function() {
//will run reset right away instead of loading these variables
  $scope.gameMode = [false,false,false,false];
  $scope.playerSymbol = "";
  $scope.cycle = 0;
  $scope.resetClass = "coinBox";
  $scope.resetText = "?";
  $scope.turn = "MARIO";
  $scope.score1 = 0;
  $scope.score2 = 0;
  $scope.world = 1;
  $scope.level = 1;
  $scope.timeCountdown = 10;
  $scope.cloudLeft1 = 150;
  $scope.cloudTop1 = 110;
  $scope.cloudLeft2 = 1300;
  $scope.cloudTop2 = 80;
  $scope.cloudLeft3 = 750;
  $scope.cloudTop3 = 200;
  $scope.cloudLeft4 = 400;
  $scope.cloudTop4 = 280;
  $scope.floorStyle = 0;
  $scope.marioBottomStyle = 60;
  $scope.marioDisplayStyle = 'none';
  $scope.resetStyle = 'none';
  $scope.bushStyle = 680;
  $scope.floorStyle = -1;
  $scope.mountainStyle = 20;
  $scope.castleStyle = 1475;
  $scope.flagLeftStyle = 1320;
  $scope.flagBottomStyle = 350;
  $scope.flagPoleStyle = 1300;
  $scope.player1Ready = "";
  $scope.player2Ready = "";
  $scope.showSelection = [true,true,true,true,false,false,false,false];
  $scope.selector = ["","","<"," "," "," "];
  $scope.move = 0;
  $scope.up = 60;

  //load the game object for new game
  $scope.game = {
    endMove: [],
    go: false,
    timeCount: 10,
    timeClicked: false,
    world: 1,
    level: 1,
    counter: 0,
    filler: "X",
    win: false,
    wins: [0,0],
    board: [["T","I","C"],["T","A","C"],["T","O","E"]],
    player: [false,false],
    players: [
     {chip: 'X', gamesWon:0},
     {chip:'O',gamesWon:0,nextMove: [{row:false, num:0},{col:false,num:0},{dia1:false},{dia2:false}]}
     ],
    xturn: {val:false}
      };
}





//first screen you see
  $scope.welcomeScreen = function() {
    $scope.cloudMover();
  }


//if a key is pressed run this
  $scope.keyPressed = function(key) {
    //if the key is enter and the welcome screen is visible, select game mode
    if (key.keyCode == 13 && $scope.showSelection[0] == true) {
      $scope.chooseGameMode($scope.getSelection())
    }
    //if the key is up or down and the welcome screen is visible, toggle which game mode is active
    else if ((key.keyCode == 38 || key.keyCode == 40) && $scope.showSelection[0] == true) {
      $scope.toggleSelector($scope.getSelection());
    }
  }

//find out which game mode the selector is on
  $scope.getSelection = function() {
    if ($scope.selector[2] == "<") {
      return 2;
    }
    else if ($scope.selector[3] == "<") {
      return 3;
    } 
    else if ($scope.selector[4] == "<") {
      return 4;
    }
    else if ($scope.selector[5] == "<") {
      return 5;
    }
  }

//toggle the selector for key presses
  $scope.toggleSelector = function(i) {
    if (i == 2) {
      $scope.selector[i] = " ";
      $scope.selector[3] = "<"
    }
    else if (i == 3) {
      $scope.selector[i] = " ";
      $scope.selector[2] = "<"
    }
    if (i == 4) {
      $scope.selector[i] = " ";
      $scope.selector[5] = "<"
    }
    if (i == 5) {
      $scope.selector[i] = " ";
      $scope.selector[4] = "<"
    }
  }

//toggle the selector for mouse clicks
  $scope.toggleSelectorMouse = function(i) {
    if (i == 2) {
      $scope.selector[i] = "<";
      $scope.selector[3] = " "
    }
    else if (i == 3) {
      console.log("true for toggle")
      $scope.selector[i] = "<";
      $scope.selector[2] = " "
    }
    if (i == 4) {
      $scope.selector[i] = "<";
      $scope.selector[5] = " "
    }
    if (i == 5) {
      $scope.selector[i] = "<";
      $scope.selector[4] = " "
    }
  }


//check to see if you clicked on the selected item then run the game mode, if not toggle
  $scope.welcomeScreenMouseClick = function(i) {
    if ($scope.selector[i] == "<" && $scope.showSelection[0] == true) {
      $scope.chooseGameMode(i);
    }
    else {
      $scope.toggleSelectorMouse(i);
    }
  }
//choose which gamemode to run and switch the welcome screen off
  $scope.chooseGameMode = function(i) {
  //if selected run player 1 mode
    if (i == 2) {
      $scope.showSelection[7] = true;
      $scope.showSelection[0] = false;
      $scope.resetStyle = "block";
      $scope.marioDisplayStyle = "block";
      $scope.walk();
      $scope.gameMode[0] = true;
    }
  //if player 2 is selected show next options
    else if (i == 3) {

      $scope.showSelection[7] = true;
      $scope.showSelection[0] = false;
      $scope.marioDisplayStyle = "block";
      $scope.resetStyle = "block";
      $scope.walk();
      $scope.gameMode[1] = true;

      //this is for online mode
      // $scope.showSelection[4] = true;
      // $scope.showSelection[5] = true;
      // $scope.selector[3] = " ";
      // $scope.selector[4] = "<";
      // $scope.showSelection[2] = false;
      // $scope.showSelection[3] = false;
    }
    //if selected run pass n play mode
    else if (i == 4) {
      $scope.showSelection[7] = true;
      $scope.showSelection[0] = false;
      $scope.marioDisplayStyle = "block";
      $scope.resetStyle = "block";
      $scope.walk();
      $scope.gameMode[1] = true;
    }
    //if selected run online mode
    else if (i == 5) {
      $scope.showSelection[7] = true;
      $scope.showSelection[0] = false;
      $scope.marioDisplayStyle = "block";
      $scope.resetStyle = "block";
      $scope.walk();
      $scope.gameMode[2] = true;
      $scope.onlineMode();
    }
  }



//the running animation for mario
  $scope.marioPosition = function() {
    switch ($scope.cycle) {
        case 0:
          $scope.marioBgStyle = "-129px 0";
          $scope.cycle++;
          break;
        case 1:
          $scope.marioBgStyle = "-86px 0";
          $scope.cycle++;
          break;
        case 2:
          $scope.marioBgStyle = "-50px 0";
          $scope.cycle++;
          break;
        case 3:
          $scope.marioBgStyle = "-225px 0";
          $scope.cycle = 0;
          break;
      }
  }

//the opening walk for mario
	$scope.walk = function() {
		$scope.marioPosition();

	 	if ($scope.move > 260) { //when he is under the ? box
	 		$scope.marioBgStyle = "-129px 0"; //jump position
	 		$scope.marioClass = "jump"; //jump css animation
	 		$scope.resetClass = "coinBox bounce"; //box bounce css animation
      //delay 1 sec and make mario in standing position
	 		setTimeout(function() {$scope.$apply(function(){$scope.marioBgStyle = "-225px 0";});}, 1000);
	 		//delay 1 sec and make the box shapeshift
      setTimeout(function() {$scope.$apply(function(){$scope.resetClass = "startgamebutton"; $scope.resetText = "";});}, 1000);
	 		//make the box be in final position after 1.4 secs
      setTimeout(function() {$scope.$apply(function(){$scope.resetClass= "button"; 
      //if the game is continuing then make the text RESET otherwise its a new game
      if ($scope.game.wins[0] + $scope.game.wins[1] > 0) {
        $scope.resetText = "RESET";
      }
      else {
        $scope.resetText = "START GAME";
      }
     });}, 2000);

	   	}
//if mario hasn't reached the box move him to the left and rerun the function till he gets there
	  else {
		 $scope.move += 20;
		 $scope.marioLeftStyle = $scope.move;
		 setTimeout(function() {$scope.$apply(function(){$scope.walk()});}, 100);
	  }
		
	}

//update the DB if gamemode is online

  $scope.updateOnline = function() {
    if($scope.gameMode[2] == true) {
      $scope.game.$save();
    }
  }

	// will help fix the sync'd animation issue
  // $scope.$watch('game.win', function(){
  //   // alert("yup");
  // });


  $scope.resetClick = function(){
    //run reset and check to see if both players are here in online mode
    $scope.resetText = 'RESET';
    $scope.reset();
    if (($scope.game.player[0] && $scope.game.player[1]) && $scope.gameMode[2]) {
      //wlll add logic here, might not need this function
    }
    //if no 1st player add 1st player
    else if (($scope.game.player[0] && $scope.playerSymbol == "") && $scope.gameMode[2]){
      $scope.setPlayer();
      $scope.updateOnline();
    }
    //if 1 player and no 2nd player
    else if (($scope.game.player[0] && !$scope.game.player[1]) && $scope.gameMode[2]) {
      //will add logic here, might not need this function
    }
    //if no players add players
    else if ((!$scope.game.player[0] || !$scope.game.player[1]) && $scope.gameMode[2]){
      $scope.setPlayer();
      $scope.updateOnline()
      console.log($scope.game.player);

    }
  }
    
  $scope.boardClickHandler = function(i, j) {
    //if the cell is blank, the game isnt over, and its 2 player mode or online mode
    if ($scope.game.board[i][j] == "" && !$scope.game.win && ($scope.gameMode[1] || ($scope.gameMode[2] && $scope.game.player[0] && $scope.game.player[1]))) {
      new Audio('sounds/smw_coin.wav').play(); //play sound
      $scope.game.board[i][j] = $scope.game.filler; //place move
      $scope.boardClass = "";
      $scope.game.counter++;
      $scope.game.timeCount = 10;
      $scope.updateOnline();
      $scope.checkWin();
      $scope.togglePlayer();  //toggle player
    }
    //if the cell is blank, the game isnt over, and its 1 player mode
    else if ($scope.game.board[i][j] == "" && !$scope.game.win && $scope.gameMode[0]) {
      //on even moves play the user's click
      if ($scope.game.counter%2 == 0) {
      new Audio('sounds/smw_coin.wav').play(); //play the coin sound
      $scope.game.board[i][j] = "X";
      $scope.game.filler = "X";
      $scope.checkWin(); //check the win
      $scope.boardClass = "";
      $scope.game.counter++;
      $scope.game.timeCount = 10;
      $scope.togglePlayer();
      //if the game isnt over let the computer play
        if (!$scope.game.win) {
          $scope.computerMove();
        }
      }
    }
  }
    

  $scope.togglePlayer = function () {
    $scope.game.filler = ($scope.game.filler == "X"?"O":"X");
    $scope.turn = ($scope.game.filler == "X"?"LUIGI":"MARIO");
  }


 $scope.checkWin = function () {
    for (var i=0; i<$scope.game.board.length; i++) {
      var r=0; c=0; d1=0; d2=0; //reset checking variables
      for (var j=0; j<$scope.game.board[i].length;j++) {
        if ($scope.game.board[i][j] == $scope.game.filler) {r++}; //check rows
        if ($scope.game.board[j][i] == $scope.game.filler) {c++}; //check columns
        if ($scope.game.board[j][j] == $scope.game.filler) {d1++}; //check backward diagonal
        if ($scope.game.board[j][2-j] == $scope.game.filler) {d2++}; //check forward diagonal
        if (c==2 && $scope.gameMode[0]){$scope.game.players[1].nextMove[1].col = true;$scope.game.players[1].nextMove[1].num = i; console.log("blocking column")} 
         if((d1 == 3 || d2 ==3) && !$scope.game.win) {
          console.log("won on a diagonal and game win=" + $scope.game.win)
          $scope.game.win = true;
          if ($scope.game.filler == "X") {
            $scope.player1Wins();
          }
          else {
            $scope.player2Wins();
          }
         }
        }
      
      if ((r == 3 || c == 3) && !$scope.game.win){
        $scope.game.win = true;
        if ($scope.game.filler == "X") {
          $scope.player1Wins();
        } 
        else {
          $scope.player2Wins();
        }
      }
      else if ($scope.game.counter == 9 && !$scope.game.win) {$scope.turn="TIE";$scope.gameOver();$scope.game.win}
      else {
        //if they didnt win check for 2 counter in a row for row, backward diagonal, and forward diagonal
        if (r==2 && $scope.gameMode[0]){$scope.game.players[1].nextMove[0].row = true; $scope.game.players[1].nextMove[0].num = i; console.log("blocking row")}
        else if (d1==2 && $scope.gameMode[0]){$scope.game.players[1].nextMove[2].dia1 = true; console.log("doing dia1")}
        else if (d2==2 && $scope.gameMode[0]){$scope.game.players[1].nextMove[3].dia2 = true;console.log("blocking dia2")}
      }
    }
 }


  $scope.player1Wins = function () {
    $scope.turn = "MARIO WINS!";
    $scope.game.wins[0]++;
    $scope.score1 = $scope.game.wins[0];
    $scope.gameOver();
  }

  $scope.player2Wins =  function () {
    if ($scope.gameMode[0]) {
      setTimeout(function() {$scope.$apply(function(){
        $scope.turn = "LUIGI WINS!";
        $scope.score2 = $scope.game.wins[1];
        $scope.gameOver();
      });},200);
    }
    else {
      $scope.turn = "LUIGI WINS!";
      $scope.game.wins[1]++;
      $scope.score2 = $scope.game.wins[1];
      $scope.gameOver();
    }
  }


  $scope.marioGoInCastle = function () {
     $scope.marioPosition();
      //figure out offsets
     if ($scope.marioLeftStyle > $scope.castleStyle + 60) {
      $scope.marioBgStyle = "-225px 0";
      $scope.marioDisplayStyle = "none";
      $scope.resetStyle = "block";
    }
    else {
      $scope.move += 20;
      $scope.marioLeftStyle = $scope.move;
      setTimeout(function() {$scope.$apply(function(){$scope.marioGoInCastle()});}, 100);
    }
  }

  $scope.slideDownFlag = function () {
    if ($scope.up <= 65) {
      $scope.marioBgStyle = "-225px 0";
      $scope.marioGoInCastle();
    }
    else {
      if ($scope.up <= 80) {
        $scope.up = 60;
        $scope.marioBottomStyle = $scope.up;
        setTimeout(function() {$scope.$apply(function(){$scope.slideDownFlag()});}, 100);
      }
      else {
        $scope.up -= 20;
        $scope.flagBottomStyle = $scope.up + 40;
        $scope.marioBottomStyle = $scope.up;
        setTimeout(function() {$scope.$apply(function(){$scope.slideDownFlag()});}, 100);
      }
    }
  }


  $scope.jumpOnFlagSequence = function () {
    $scope.marioPosition();

      if ($scope.marioLeftStyle > $scope.flagLeftStyle - 11) {
        $scope.slideDownFlag();
       }

      else if ($scope.marioLeftStyle > $scope.flagLeftStyle - 175) {
        $scope.marioBgStyle = "-129px 0";
        $scope.up += 30;
        $scope.marioBottomStyle = $scope.up;
        $scope.move += 20;
        $scope.marioLeftStyle = $scope.move;
        setTimeout(function() {$scope.$apply(function(){$scope.jumpOnFlagSequence()});}, 75);

      }
    else {
      $scope.move += 20;
      $scope.marioLeftStyle = $scope.move;
      setTimeout(function() {$scope.$apply(function(){$scope.jumpOnFlagSequence()});}, 50);
    }
  }



  $scope.endGameSequence = function () {  
    $scope.game.endMove = [$scope.floorStyle, $scope.bushStyle, $scope.mountainStyle, $scope.castleStyle, $scope.flagLeftStyle, $scope.flagPoleStyle];
    $scope.endGameTimer = setInterval( function() {$scope.$apply(function(){
    if ($scope.castleStyle > 900) {
      for (i in $scope.game.endMove) {
        if (i == 0) {
          $scope.game.endMove[i] -=20
        }
        else {
          $scope.game.endMove[i] -= 10;
        }
      }
      $scope.floorStyle = $scope.game.endMove[0];
      $scope.bushStyle = $scope.game.endMove[1];
      $scope.mountainStyle = $scope.game.endMove[2]; 
      $scope.castleStyle = $scope.game.endMove[3];
      $scope.flagLeftStyle = $scope.game.endMove[4];
      $scope.flagPoleStyle = $scope.game.endMove[5]; 
      $scope.marioPosition();
    } 
     });}, 50);
  } 

    $scope.gameOver = function () {
      console.log("GAMEOVER")
        new Audio('sounds/winner.wav').play();
        $scope.resetText = 'NEW GAME';
        for (var i=0;i<$scope.game.board.length;i++){
          for (var j=0;j<$scope.game.board[i].length;j++) {
            $scope.boardClass = ""; 
          }
         }
        $scope.game.win = true;
        clearInterval($scope.timer);
        $scope.game.timeClicked = false;
        $scope.resetStyle = 'none';
        $scope.gameStyle = 'none';
        if ($scope.gameMode[2]) {
          $scope.updateOnline();
        }
        $scope.endGameSequence();
        setTimeout(function(){$scope.$apply(function(){clearInterval($scope.endGameTimer);$scope.jumpOnFlagSequence();});},3000);
    }



    $scope.reset = function() {
    	  $scope.gameStyle = 'block';
        $scope.floorStyle = -1;
        $scope.bushStyle = 680;
        $scope.mountainStyle = 20; 
        $scope.castleStyle = 1475;
        $scope.flagLeftStyle = 1320;
        $scope.flagBottomStyle = 350;
        $scope.flagPoleStyle = 1300;
        if ($scope.game.win == true) {
          $scope.move = 0;
          $scope.timeCountdown = 10;
          $scope.resetText = "?";
          $scope.resetClass = "coinBox"
          $scope.marioClass = "";
          $scope.marioLeftStyle = $scope.move; 
          $scope.marioDisplayStyle = 'block';
          $scope.walk();
        }
        else if ($scope.gameMode[0]) {
          $scope.resetNextMove();
          $scope.game.xturn.val = false;
        }
        $scope.game.win = false;
        $scope.game.counter = 0;
        $scope.game.filler = "X";
        $scope.game.timeCount = 10;
        $scope.turn = "MARIO";
        for (var i=0;i<$scope.game.board.length;i++){
           for(var j=0;j<$scope.game.board[i].length;j++) {
             $scope.game.board[i][j] = "";
             //have to figure out a way to make each cell have its own class
             $scope.boardClass = "gameBoardHover";
            }
          }
         if ($scope.game.wins[0] + $scope.game.wins[1] == 0) {
         	$scope.world = $scope.game.world;
         $scope.level = $scope.game.level;
         }
         else {
         	if ($scope.game.level >= 8) {
         		$scope.game.level = ($scope.game.level + 1) - (8 * $scope.game.world);
         		$scope.game.world++;
         	}
         	else {
         		$scope.game.level = ($scope.game.wins[0] + $scope.game.wins[1] + 1);
         	}
         	$scope.world = $scope.game.world;
          $scope.level = $scope.game.level;
         }
         $scope.updateOnline();
      if (!$scope.game.timeClicked && ($scope.gameMode[0] || $scope.gameMode[1] || ($scope.gameMode[2] && $scope.game.player[0] & $scope.game.player[1]) )) {
	      $scope.runTimer();
        new Audio('sounds/reset.wav').play();
		  }
      
    }

  $scope.runTimer = function() {
    $scope.timer = setInterval( function() {
          $scope.$apply(function() {
            $scope.game.timeCount--;
            $scope.game.timeClicked = true;
            $scope.timeCountdown = $scope.game.timeCount;
            $scope.updateOnline();
            if ($scope.game.timeCount <= 0) {
              if ($scope.game.filler == "X") {
                $scope.player1Wins();
              }
              else {
                $scope.player2Wins();
              }
            }
          });}, 1000);
  }

  $scope.cloudMover = function() {
  	$scope.clouds = setInterval( function() {
      $scope.$apply(function(){
  	  	if(($scope.cloudLeft1 + 75) <= 0){
             $scope.cloudLeft1 = 1300;
             $scope.cloudTop1 = Math.floor(Math.random()*300 + 100);
        }
        else {
          $scope.cloudLeft1 -= 2;
        }
        if ($scope.cloudLeft2 + 75 <= 0) {
          $scope.cloudLeft2 = 1300;
          $scope.cloudTop2 = Math.floor(Math.random()*300 + 100);
        }
        else {
          $scope.cloudLeft2 -= 2;
        }
        if ($scope.cloudLeft3 + 75 <= 0) {
          $scope.cloudLeft3 = 1300;
          $scope.cloudTop3 = Math.floor(Math.random()*300 + 100);
        }
        else {
          $scope.cloudLeft3 -= 2;
        }
        if ($scope.cloudLeft4 + 225 <= 0) {
          $scope.cloudLeft4 = 1300;
          $scope.cloudTop4 = Math.floor(Math.random()*300 + 100);
        }
        else {
          $scope.cloudLeft4 -= 1;
        }	
		});}, 50);   
	}

  $scope.computerMove = function() {

    console.log("num of moves: " + $scope.game.counter)
    console.log("inside computerMove and filler = " + $scope.game.filler)
    setTimeout(function(){
      $scope.$apply(function(){
        //first move
        if ($scope.game.counter == 1) {

          if ($scope.game.board[1][1] == ''  && $scope.game.level == 2) {
            $scope.game.board[1][1] = "O";
            $scope.game.counter++;
          }
          else if ($scope.game.board[0][0] == "") {
            $scope.game.board[0][0] = "O"; 
            $scope.game.counter++;
          }
          else if ($scope.game.board[0][1] == "") {
            $scope.game.board[0][1] = "O"; 
            $scope.game.counter++;
          }
          else {
            $scope.game.board[0][0] = "O"; 
            $scope.game.counter++;
          }
        }
        else if ($scope.game.counter == 3 && $scope.game.board[2][2] == "X" && $scope.game.board[1][1] == "X" && $scope.game.level == 8) {
          $scope.game.board[2][0] = "O";
          $scope.game.counter++;
        }
        else if ($scope.game.counter == 3 && $scope.game.board[0][0] == "X" && $scope.game.board[2][1] == "X" && $scope.game.level == 8) {
          $scope.game.board[2][0] = "O";
          $scope.game.counter++;
        }
        else if ($scope.game.counter == 3 && $scope.game.board[0][0] == "X" && $scope.game.board[1][2] == "X" && $scope.game.level == 8) {
          $scope.game.board[0][2] = "O";
          $scope.game.counter++;
        }
        else if ($scope.game.counter == 3 && $scope.game.board[0][2] == "X" && $scope.game.board[2][1] == "X" && $scope.game.level == 8) {
          $scope.game.board[2][2] = "O";
          $scope.game.counter++;
        }
        else if ($scope.game.counter == 3 && $scope.game.board[2][0] == "X" && $scope.game.board[1][2] == "X" && $scope.game.level == 8) {

          $scope.game.board[2][2] = "O";
          $scope.game.counter++;
        }
        else if ($scope.game.counter%2 == 1){
          console.log("Checking for win First")
          $scope.resetNextMove();

          $scope.game.filler = "O";
          $scope.checkWin();
          $scope.nextMove();

          if($scope.game.counter%2 == 1) {
            console.log("now checking for block") 
            $scope.resetNextMove();
            $scope.togglePlayer();
            $scope.checkWin();
            $scope.nextMove();
            $scope.resetNextMove();
          }
          
          //reload nextcounter
          if ($scope.game.counter%2 == 1) {
            console.log("doing a random move");
            for (var i=0;i<$scope.game.board.length;i++) {
              for (var j=0;j<$scope.game.board[i].length;j++) {
                if ($scope.game.board[i][j] == '' && $scope.game.counter%2 == 1) {
                  $scope.game.board[i][j] = 'O';
                  $scope.game.counter++;
                }
              }
            }
          }
        }
      });
    },500);

    $scope.resetNextMove();

  }

  $scope.nextMove = function() {
    console.log("inside next move")
    if ($scope.game.players[1].nextMove[0].row == true && $scope.game.counter%2 == 1) {
        for(var i=0;i<$scope.game.board.length;i++){
          if ($scope.game.board[$scope.game.players[1].nextMove[0].num][i] == '') {
            $scope.game.board[$scope.game.players[1].nextMove[0].num][i] = "O";
            $scope.game.counter++;
            console.log("placed move in row")
          } 
        }
      }
      if ($scope.game.players[1].nextMove[1].col == true && $scope.game.counter%2 == 1) {
        
        for(var i=0;i<$scope.game.board.length;i++){
          if ($scope.game.board[i][$scope.game.players[1].nextMove[1].num] == '') {
            $scope.game.board[i][$scope.game.players[1].nextMove[1].num] = "O";
            $scope.game.counter++;
            console.log("placed move in col")
          } 
        }
      }

      if ($scope.game.players[1].nextMove[2].dia1 == true  && $scope.game.counter%2 == 1  && $scope.game.level == 5) {
        console.log("blocking dia 1")
        for (var i=0;i<$scope.game.board.length;i++){
          if($scope.game.board[i][i] == '') {
            $scope.game.board[i][i] = 'O';
            $scope.game.counter++;
            console.log("placed move in dia1")
          }
        } 
      }

      if ($scope.game.players[1].nextMove[3].dia2 == true && $scope.game.counter%2 == 1  && $scope.game.level == 6) {

        for (var i=0;i<$scope.game.board.length;i++) {
          if ($scope.game.board[i][2-i] == ''){
            $scope.game.board[i][2-i] = 'O';
            $scope.game.counter++;
            console.log("placed move in dia2")
          }
        }
      }

    $scope.checkWin();
  }


  $scope.resetNextMove = function() {
    $scope.game.players[1].nextMove[0].num = 0;
    $scope.game.players[1].nextMove[1].num = 0;
    $scope.game.players[1].nextMove[0].row = false;
    $scope.game.players[1].nextMove[1].col = false;
    $scope.game.players[1].nextMove[2].dia1 = false;
    $scope.game.players[1].nextMove[3].dia2 = false;
  }


});




