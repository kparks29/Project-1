/*  KNOWN BUGS
3rd click on online mode doesnt toggle
need to make waiting for player screen
need to $watch win condition
need to make rules for player can only play the move that is their symbol
*/



angular.module('marioTicTacToe', ['firebase'])
.controller('MainCtrl', function($scope,$firebase) {	

$scope.setPlayer = function() {
  console.log("entered set player");
  console.log("player 1: " + $scope.game.player[0])
  console.log("player 2: " + $scope.game.player[1])
    if (!$scope.game.player[0]) {
      $scope.game.player[0] = true;
      $scope.playerSymbol = "X";
    }
    else if (!$scope.game.player[1] && $scope.playerSymbol == "") {
      $scope.game.player[1] = true;
      $scope.playerSymbol = "O";
    }
    else if ($scope.game.player[0] && $scope.game.player[1]) {
      console.log("sorry game is full");
    }
    console.log("after setplayer = player 1: " + $scope.game.player[0])
  console.log("after setplayer = player 2: " + $scope.game.player[1])
    $scope.game.$save();
}

$scope.onlineMode = function() {
    var ticTacRef = new Firebase('https://mariotictactoe.firebaseio.com/'); 
    $scope.fbRoot = $firebase(ticTacRef);

    $scope.fbRoot.$on('loaded', function() {
      var IDs = $scope.fbRoot.$getIndex();
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
        $scope.fbRoot.$on('change', function() {
          IDs = $scope.fbRoot.$getIndex();
          $scope.game = $scope.fbRoot.$child(IDs[0]);
        });
      } 
      else 
      {
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

  $scope.keyPressed = function(key) {
    if (key.keyCode == 13 && $scope.showSelection[0] == true) {
      $scope.chooseGameMode($scope.getSelection())
    }
    else if ((key.keyCode == 38 || key.keyCode == 40) && $scope.showSelection[0] == true) {
      $scope.toggleSelector($scope.getSelection());
    }
  }

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


  $scope.welcomeScreenMouseClick = function(i) {
        if ($scope.selector[i] == "<" && $scope.showSelection[0] == true) {
          $scope.chooseGameMode(i);
        }
        else {
          $scope.toggleSelectorMouse(i);
        }
  }

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
      $scope.showSelection[4] = true;
      $scope.showSelection[5] = true;
      $scope.selector[3] = " ";
      $scope.selector[4] = "<";
      $scope.showSelection[2] = false;
      $scope.showSelection[3] = false;
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

	$scope.walk = function() {
			$scope.marioPosition();

		 	if ($scope.move > 260) {
		 		$scope.marioBgStyle = "-129px 0";
		 		$scope.marioClass = "jump";
		 		$scope.resetClass = "coinBox bounce";
		 		setTimeout(function() {$scope.$apply(function(){$scope.marioBgStyle = "-225px 0";});}, 1000);
		 		setTimeout(function() {$scope.$apply(function(){$scope.resetClass = "startgamebutton"; $scope.resetText = "";});}, 1000);
		 		setTimeout(function() {$scope.$apply(function(){$scope.resetClass= "button"; 
         if ($scope.game.wins[0] + $scope.game.wins[1] > 0) {
          $scope.resetText = "RESET";
        }
        else {
          $scope.resetText = "START GAME";
        }
       });}, 1400);

		   	}
		 else {
			$scope.move += 20;
			$scope.marioLeftStyle = $scope.move;
			setTimeout(function() {$scope.$apply(function(){$scope.walk()});}, 100);
		}
		
	}


  $scope.updateOnline = function() {
    if($scope.gameMode[2] == true) {
      $scope.game.$save();
    }
  }
	
  $scope.$watch('game.win', function(){
    // alert("yup");
  });


    $scope.resetClick = function(){
        $scope.resetText = 'RESET';
        $scope.reset();
        if (($scope.game.player[0] && $scope.game.player[1]) && $scope.gameMode[2]) {
        console.log("players here");
        }
      else if ($scope.game.player[0] && $scope.playerSymbol == ""){
        $scope.setPlayer();
        $scope.updateOnline();
      }
      else if ($scope.game.player[0] && !$scope.game.player[1]) {
        console.log("waiting for player 2")
      }
      else if ((!$scope.game.player[0] || !$scope.game.player[1]) && !$scope.playerSymbol == ""){
        console.log("assign player");
        $scope.setPlayer();
        $scope.updateOnline()
        console.log($scope.game.player);

      }
    }
    
    $scope.boardClickHandler = function(i, j) {
      
      console.log("click detected")
      console.log("gameboard=" + $scope.game.board[i][j])
      console.log("gamewon=" + $scope.game.win)
      console.log("gameMode1=" + $scope.gameMode[1])
      console.log("gamemode2=" + $scope.gameMode[2])
      console.log("player1=" + $scope.game.player[0])
      console.log("player2=" + $scope.game.player[1])
        if ($scope.game.board[i][j] == "" && !$scope.game.win && ($scope.gameMode[1] || ($scope.gameMode[2] && $scope.game.player[0] && $scope.game.player[1]))) {
            new Audio('sounds/smw_coin.wav').play();
            $scope.game.board[i][j] = $scope.game.filler;
            $scope.boardClass = "";
            $scope.game.counter++;
            $scope.game.timeCount = 10;
            $scope.updateOnline();
            $scope.checkWin();
            $scope.togglePlayer();
        }
        else if ($scope.game.board[i][j] == "" && !$scope.game.win && $scope.gameMode[0]) {
          console.log("player's turn filler should = X before this")
          console.log("num of moves: " + $scope.game.counter)
            if ($scope.game.counter%2 == 0) {
            new Audio('sounds/smw_coin.wav').play();
            $scope.game.board[i][j] = $scope.game.filler;
            $scope.checkWin();
            $scope.boardClass = "";
            $scope.game.counter++;
            $scope.game.timeCount = 10;
              if (!$scope.game.win) {
                console.log("computer's turn filler should = O before this")
                $scope.computerMove();
                console.log("Checking win for computer: " + $scope.game.filler)
              }
          }
        }
      //);
    }
    

    $scope.togglePlayer = function () {
        $scope.game.filler = ($scope.game.filler == "X"?"O":"X");
        $scope.turn = ($scope.game.filler == "X"?"LUIGI":"MARIO");
        console.log("switching to " + $scope.game.filler);
    }


     $scope.checkWin = function () {
      console.log("checking win for " + $scope.game.filler)
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
            console.log(r + " " + c + " " + d1 + " " + d2)
            //if they didnt win check for 2 counter in a row for row, backward diagonal, and forward diagonal
            if (r==2 && $scope.gameMode[0]){$scope.game.players[1].nextMove[0].row = true; $scope.game.players[1].nextMove[0].num = i; console.log("blocking row")}
            else if (d1==2 && $scope.gameMode[0]){$scope.game.players[1].nextMove[2].dia1 = true; console.log("doing dia1")}
            else if (d2==2 && $scope.gameMode[0]){$scope.game.players[1].nextMove[3].dia2 = true;console.log("blocking dia2")}
          }
        }
     }


    $scope.player1Wins = function () {
      console.log("running player 1 wins")
        $scope.turn = "MARIO WINS!";
        $scope.game.wins[0]++;
        $scope.score1 = $scope.game.wins[0];
        $scope.gameOver();
    }

    $scope.player2Wins =  function () {
      console.log("running player 2 wins")
      if ($scope.gameMode[0]) {
        setTimeout(function() {$scope.$apply(function(){
          $scope.turn = "LUIGI WINS!";
          $scope.game.wins[1]++;
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
          if ($scope.game.board[1][1] == '') {
            $scope.game.board[1][1] = "O";
            $scope.game.counter++;
          }
          else {
            $scope.game.board[0][0] = "O"; 
            $scope.game.counter++;

          }
        }
        else if ($scope.game.counter == 3 && $scope.game.board[2][2] == "X" && $scope.game.board[1][1] == "X") {
          $scope.game.board[2][0] = "O";
          $scope.game.counter++;
        }
        else if ($scope.game.counter == 3 && $scope.game.board[0][0] == "X" && $scope.game.board[2][1] == "X") {
          $scope.game.board[2][0] = "O";
          $scope.game.counter++;
        }
        else if ($scope.game.counter == 3 && $scope.game.board[0][0] == "X" && $scope.game.board[1][2] == "X") {
          $scope.game.board[0][2] = "O";
          $scope.game.counter++;
        }
        else if ($scope.game.counter == 3 && $scope.game.board[0][2] == "X" && $scope.game.board[2][1] == "X") {
          $scope.game.board[2][2] = "O";
          $scope.game.counter++;
        }
        else if ($scope.game.counter == 3 && $scope.game.board[2][0] == "X" && $scope.game.board[1][2] == "X") {
          $scope.game.board[2][2] = "O";
          $scope.game.counter++;
        }
        else if ($scope.game.counter%2 == 1){
          console.log("Checking for win First")
          $scope.resetNextMove();
          $scope.togglePlayer();
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
      if ($scope.game.players[1].nextMove[2].dia1 == true  && $scope.game.counter%2 == 1) {
        console.log("blocking dia 1")
        for (var i=0;i<$scope.game.board.length;i++){
          if($scope.game.board[i][i] == '') {
            $scope.game.board[i][i] = 'O';
            $scope.game.counter++;
            console.log("placed move in dia1")
          }
        } 
      }
      if ($scope.game.players[1].nextMove[3].dia2 == true && $scope.game.counter%2 == 1) {
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




