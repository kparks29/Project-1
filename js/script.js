angular.module('marioTicTacToe', ['firebase'])
.controller('MainCtrl', function($scope,$firebase) {	

  $scope.game = {
    cycle: 0,
    move: 0,
    up: 60,
    endMove: [],
    go: false,
    timeCount: 10,
    timeClicked: false,
    world: 1,
    level: 1,
    counter: 0,
    filler: "O",
    clickSound: new Audio('sounds/smw_coin.wav'),
    winnerSound: new Audio('sounds/winner.wav'),
    resetSound: new Audio('sounds/reset.wav'),
    win: false,
    wins: [0,0],
    board: [["T","I","C"],["T","A","C"],["T","O","E"]]
  }
//will run reset right away instead of loading these variables
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
  $scope.marioDisplayStyle = 'block';
  $scope.resetStyle = 'block';
  $scope.bushStyle = 680;
  $scope.floorStyle = -1;
  $scope.mountainStyle = 20;
  $scope.castleStyle = 1475;
  $scope.flagLeftStyle = 1320;
  $scope.flagBottomStyle = 350;
  $scope.flagPoleStyle = 1300;



	$scope.walk = function() {
			 switch ($scope.game.cycle) {
				case 0:
					$scope.marioBgStyle = "-129px 0";
					$scope.game.cycle++;
					break;
				case 1:
					$scope.marioBgStyle = "-86px 0";
					$scope.game.cycle++;
					break;
				case 2:
					$scope.marioBgStyle = "-50px 0";
					$scope.game.cycle++;
					break;
				case 3:
					$scope.marioBgStyle = "-225px 0";
					$scope.game.cycle = 0;
					break;
			}

      //need to find out how to call offsetleft
		 	if ($scope.game.move > 260) {
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
			$scope.game.move += 20;
			$scope.marioLeftStyle = $scope.game.move;
			setTimeout(function() {$scope.$apply(function(){$scope.walk()});}, 100);
		}
		
	}



	


    $scope.resetClick = function(){
        $scope.resetText = 'RESET';
        $scope.game.resetSound.play();
        $scope.reset();
    }
    
    //figureout how to make a cell click handler using ng-click
    //this section probably doesnt work
    $scope.boardClickHandler = function(i, j) {
      if ($scope.game.board[i][j] == "" && $scope.game.win == false) {
          $scope.game.clickSound.play();
          $scope.togglePlayer();
          $scope.game.board[i][j] = $scope.game.filler;
          $scope.game.boardClass = "";
          $scope.game.counter++;
          $scope.game.timeCount = 10;
          $scope.checkWin();
      } 
    }
    

    $scope.togglePlayer = function () {
        $scope.game.filler = ($scope.game.filler == "X"?"O":"X");
        $scope.turn = ($scope.game.filler == "X"?"LUIGI":"MARIO");
    }


     $scope.checkWin = function () {
//       //need to change win logic
//   //       if (counter <=9) {
//   //           //check wins for x and send player1Wins
//   //           if ((moves[0] + moves[1] + moves[2]) == "XXX" ){player1Wins();}
//   //           if ((moves[3] + moves[4] + moves[5]) == "XXX" ){player1Wins();}
//   //           if ((moves[6] + moves[7] + moves[8]) == "XXX" ){player1Wins();}
//   //           if ((moves[0] + moves[3] + moves[6]) == "XXX" ){player1Wins();}
//   //           if ((moves[1] + moves[4] + moves[7]) == "XXX" ){player1Wins();}
//   //           if ((moves[2] + moves[5] + moves[8]) == "XXX" ){player1Wins();}
//   //           if ((moves[0] + moves[4] + moves[8]) == "XXX" ){player1Wins();}
//   //           if ((moves[2] + moves[4] + moves[6]) == "XXX" ){player1Wins();}
//   //           //check wins for o and send player2Wins
//   //           if ((moves[0] + moves[1] + moves[2]) == "OOO" ){player2Wins();}
//   //           if ((moves[3] + moves[4] + moves[5]) == "OOO" ){player2Wins();}
//   //           if ((moves[6] + moves[7] + moves[8]) == "OOO" ){player2Wins();}
//   //           if ((moves[0] + moves[3] + moves[6]) == "OOO" ){player2Wins();}
//   //           if ((moves[1] + moves[4] + moves[7]) == "OOO" ){player2Wins();}
//   //           if ((moves[2] + moves[5] + moves[8]) == "OOO" ){player2Wins();}
//   //           if ((moves[0] + moves[4] + moves[8]) == "OOO" ){player2Wins();}
//   //           if ((moves[2] + moves[4] + moves[6]) == "OOO" ){player2Wins();}
//   //       }
        


//         if ($scope.game.counter >= 9 && $scope.game.win != true) {
//           $scope.turn = "TIE";
//           $scope.gameOver();
//         }
        
     }


    $scope.player1Wins = function () {
        $scope.turn = "MARIO WINS!";
        $scope.game.wins[0]++;
        $scope.score1 = $scope.game.wins[0];
        $scope.gameOver();
    }

    $scope.player2Wins =  function () {
        $scope.turn = "LUIGI WINS!";
        $scope.game.wins[1]++;
        $scope.score2 = $scope.game.wins[1];
        $scope.gameOver();
    }

  $scope.marioGoInCastle = function () {
    switch ($scope.game.cycle) {
        case 0:
          $scope.marioBgStyle = "-129px 0";
          $scope.game.cycle++;
          break;
        case 1:
          $scope.marioBgStyle = "-86px 0";
          $scope.game.cycle++;
          break;
        case 2:
          $scope.marioBgStyle = "-50px 0";
          $scope.game.cycle++;
          break;
        case 3:
          $scope.marioBgStyle = "-225px 0";
          $scope.game.cycle = 0;
          break;
      }
      //figure out offsets
     if ($scope.marioLeftStyle > $scope.castleStyle + 60) {
      $scope.marioBgStyle = "-225px 0";
      $scope.marioDisplayStyle = "none";
      $scope.resetStyle = "block";
    }
    else {
      $scope.game.move += 20;
      $scope.marioLeftStyle = $scope.game.move;
      setTimeout(function() {$scope.$apply(function(){$scope.marioGoInCastle()});}, 100);
    }
  }

  $scope.slideDownFlag = function () {
    if ($scope.game.up <= 65) {
      $scope.marioBgStyle = "-225px 0";
      $scope.marioGoInCastle();
    }
    else {
      if ($scope.game.up <= 80) {
        $scope.game.up = 60;
        $scope.marioBottomStyle = $scope.game.up;
        setTimeout(function() {$scope.$apply(function(){$scope.slideDownFlag()});}, 100);
      }
      else {
        $scope.game.up -= 20;
         $scope.flagBottomStyle = $scope.game.up + 40;
        $scope.marioBottomStyle = $scope.game.up;
        setTimeout(function() {$scope.$apply(function(){$scope.slideDownFlag()});}, 100);
      }
    }
  }


  $scope.jumpOnFlagSequence = function () {
    switch ($scope.game.cycle) {
        case 0:
          $scope.marioBgStyle = "-129px 0";
          $scope.game.cycle++;
          break;
        case 1:
          $scope.marioBgStyle = "-86px 0";
          $scope.game.cycle++;
          break;
        case 2:
          $scope.marioBgStyle = "-50px 0";
          $scope.game.cycle++;
          break;
        case 3:
          $scope.marioBgStyle = "-225px 0";
          $scope.game.cycle = 0;
          break;
      }

      if ($scope.marioLeftStyle > $scope.flagLeftStyle - 11) {
        $scope.slideDownFlag();
       }

      else if ($scope.marioLeftStyle > $scope.flagLeftStyle - 175) {
        $scope.marioBgStyle = "-129px 0";
        $scope.game.up += 30;
        $scope.marioBottomStyle = $scope.game.up;
        $scope.game.move += 20;
        $scope.marioLeftStyle = $scope.game.move;
        setTimeout(function() {$scope.$apply(function(){$scope.jumpOnFlagSequence()});}, 75);

      }
    else {
      $scope.game.move += 20;
      $scope.marioLeftStyle = $scope.game.move;
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
      switch ($scope.game.cycle) {
        case 0:
          $scope.marioBgStyle = "-129px 0";
          $scope.game.cycle++;
          break;
        case 1:
          $scope.marioBgStyle = "-86px 0";
          $scope.game.cycle++;
          break;
        case 2:
          $scope.marioBgStyle = "-50px 0";
          $scope.game.cycle++;
          break;
        case 3:
          $scope.marioBgStyle = "-225px 0";
          $scope.game.cycle = 0;
          break;
      }
    } 
     });}, 50);
  } 

    $scope.gameOver = function () {
        $scope.game.winnerSound.play();
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
          $scope.game.move = 0;
          $scope.timeCountdown = 10;
          $scope.resetText = "?";
          $scope.resetClass = "coinBox"
          $scope.marioClass = "";
          $scope.marioLeftStyle = $scope.game.move; 
          $scope.marioDisplayStyle = 'block';
          $scope.walk();
        }
         $scope.game.win = false;
         $scope.game.counter = 0;
         $scope.game.filler = "O";
         $scope.game.timeCount = 10;
         $scope.turn = "MARIO";
         for (var i=0;i<$scope.game.board.length;i++){
           for(var j=0;j<$scope.game.board[i].length;j++) {
             $scope.game.board[i][j] = "";
             //have to figure out a way to make each cell have its own class
             $scope.boardClass = "gameBoardHover";
            }
          }
         if ($scope.game.wins[0] + $scope.game.wins[1] + 1 == 0) {
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
       if (!$scope.game.timeClicked) {
	      $scope.timer = setInterval( function() {
          $scope.$apply(function() {
	    			$scope.game.timeCount--;
	    			$scope.game.timeClicked = true;
	    			$scope.timeCountdown = $scope.game.timeCount;
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

});



// angular.module('TicTacToe', ['firebase'])
//   .controller('TicTacToeCtrl', function($scope, $firebase) {
//     var numRows = 6;
//     var numColumns = 7;
//     var ticTacRef = new Firebase(''); //https://intense-fire-XXXX.firebaseio.com
//     $scope.fbRoot = $firebase(ticTacRef);

//     $scope.fbRoot.$on('loaded', function() {
//       var IDs = $scope.fbRoot.$getIndex();
//       if(IDs.length == 0) {
//         $scope.fbRoot.$add({ 
//           board: [],
//           xTurn: true
//         });
//         $scope.fbRoot.$on('change', function() {
//           IDs = $scope.fbRoot.$getIndex();
//           $scope.obj = $scope.fbRoot.$child(IDs[0]);
//         });
//       } else {
//         $scope.obj = $scope.fbRoot.$child(IDs[0]);
//       }
//     }

//     $scope.makeMove = function(i, j) {  // or function(i) if using one dimensional board
//     }
//   }
