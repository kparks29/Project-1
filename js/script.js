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

  $scope.resetClass = "coinBox";
  $scope.resetText = "?";
  $scope.turn = "MARIO";


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
        //$scope.reset();
    }
    
    //figureout how to make a cell click handler using ng-click
    //this section probably doesnt work
    $scope.boardClickHandler = function(i, j) {
      if ($scope.game.board[i][j] == "" && $scope.game.win == false) {
          $scope.game.clickSound.play();
          $scope.togglePlayer();
          $scope.game.board[i][j] = $scope.game.filler;
          $scope.game.boardClass[i][j] = "";
          $scope.game.counter++;
          $scope.game.timeCount = 10;
          //$scope.checkWin();
      } 
    }
    

    $scope.togglePlayer = function () {
        $scope.game.filler = (filler == "X"?"O":"X");
        $scope.turn = (filler == "X"?"LUIGI":"MARIO");
    }


//     $scope.checkWin = function () {
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
        
//     }


//     $scope.player1Wins = function () {
//         $scope.turn = "MARIO WINS!";
//         $scope.game.wins[0]++;
//         $scope.score1 = $scope.game.wins[0];
//         $scope.gameOver();
//     }

//     $scope.player2Wins =  function () {
//         $scope.turn = "LUIGI WINS!";
//         $scope.game.wins[1]++;
//         $scope.score2 = $scope.game.wins[1];
//         $scope.gameOver();
//     }

//   $scope.marioGoInCastle = function () {
//     switch ($scope.game.cycle) {
//         case 0:
//           $scope.marioBgStyle = "background-position: -129px 0";
//           $scope.game.cycle++;
//           break;
//         case 1:
//           $scope.marioBgStyle = "background-position: -86px 0";
//           $scope.game.cycle++;
//           break;
//         case 2:
//           $scope.marioBgStyle = "background-position: -50px 0";
//           $scope.game.cycle++;
//           break;
//         case 3:
//           $scope.marioBgStyle = "background-position: -225px 0";
//           $scope.game.cycle = 0;
//           break;
//       }
//       //figure out offsets
//      if (mario.offsetLeft > castle.offsetLeft + 60) {
//       $scope.marioBgStyle = "background-position: -225px 0";
//       $scope.marioDisplayStyle = "display: none";
//       $scope.resetStyle = "display: block";
//     }
//     else {
//       $scope.game.move += 20;
//       $scope.marioLeftStyle = "left: " + $scope.game.move + "px";
//       setTimeout(function() {$scope.$apply(function(){$scope.marioGoInCastle()});}, 100);
//     }
//   }

//   $scope.slideDownFlag = function () {
//     if ($scope.game.up <= 65) {
//       $scope.marioBgStyle = "background-position: -225px 0";
//       $scope.marioGoInCastle();
//     }
//     else {
//       if ($scope.game.up <= 80) {
//         $scope.game.up = 60;
//         $scope.marioBottomStyle = "bottom: " + $scope.game.up + "px";
//         setTimeout(function() {$scope.$apply(function(){$scope.slideDownFlag()});}, 100);
//       }
//       else {
//         $scope.game.up -= 20;
//          $scope.flagBottomStyle = "bottom: " + ($scope.game.up + 40) + "px";
//         $scope.marioBottomStyle = "bottom: " + $scope.game.up + "px";
//         setTimeout(function() {$scope.$apply(function(){$scope.slideDownFlag()});}, 100);
//       }
//     }
//   }
//   $scope.jumpOnFlagSequence = function () {
//     switch ($scope.game.cycle) {
//         case 0:
//           $scope.marioBgStyle = "background-position: -129px 0";
//           $scope.game.cycle++;
//           break;
//         case 1:
//           $scope.marioBgStyle = "background-position: -86px 0";
//           $scope.game.cycle++;
//           break;
//         case 2:
//           $scope.marioBgStyle = "background-position: -50px 0";
//           c$scope.game.ycle++;
//           break;
//         case 3:
//           $scope.marioBgStyle = "background-position: -225px 0";
//           $scope.game.cycle = 0;
//           break;
//       }
//       //fix offsets
//       if (mario.offsetLeft > flag.offsetLeft - 11) {
//         $scope.slideDownFlag();
//        }
//       //fix offsets
//       else if (mario.offsetLeft > flag.offsetLeft - 175) {
//         $scope.marioBgStyle = "background-position: -129px 0";
//         $scope.game.up += 30;
//         $scope.marioBottomStyle = "bottom: " + $scope.game.up + "px";
//         $scope.game.move += 20;
//         $scope.marioLeftStyle = "left: " + $scope.game.move + "px";
//         setTimeout(function() {$scope.$apply(function(){$scope.jumpOnFlagSequence()});}, 75);

//       }
//     else {
//       $scope.game.move += 20;
//       $scope.marioLeftStyle = "left: " + $scope.game.move + "px";
//       setTimeout(function() {$scope.$apply(function(){$scope.jumpOnFlagSequence()});}, 50);
//     }
//   }

//   $scope.endGameSequence = function () {  //fix offsets
//     $scope.game.endMove = [floor.offsetLeft, bush.offsetLeft, mountain.offsetLeft, castle.offsetLeft,flag.offsetLeft,flagPole.offsetLeft];
//     $scope.endGameTimer = setInterval( function() {$scope.$apply(function(){
//     if (castle.offsetLeft > document.getElementById('body').offsetWidth - 400) {
//       for (i in $scope.game.endMove) {
//         if (i == 0) {
//           $scope.game.endMove[i] -=20
//         }
//         else {
//           $scope.game.endMove[i] -= 10;
//         }
//       }
//       $scope.floorStyle = "left: " + $scope.game.endMove[0] + "px";
//       $scope.bush.bushStyle = "left: " + $scope.game.endMove[1] + "px";
//       $scope.mountain.mountainStyle = "left: " + $scope.game.endMove[2] + "px"; 
//       $scope.castle.castleStyle = "left: " + $scope.game.endMove[3] + "px";
//       $scope.flag.flagLeftStyle = "left: " + $scope.game.endMove[4] + "px";
//       $scope.flagPole.flagPoleStyle = "left: " + $scope.game.endMove[5] + "px"; 
//       switch ($scope.game.cycle) {
//         case 0:
//           $scope.marioBgStyle = "background-position: -129px 0";
//           $scope.game.cycle++;
//           break;
//         case 1:
//           $scope.marioBgStyle = "background-position: -86px 0";
//           $scope.game.cycle++;
//           break;
//         case 2:
//           $scope.marioBgStyle = "background-position: -50px 0";
//           $scope.game.cycle++;
//           break;
//         case 3:
//           $scope.marioBgStyle = "background-position: -225px 0";
//           $scope.game.cycle = 0;
//           break;
//       }
//     } 
//      });}, 50);
//   } 

//     $scope.gameOver = function () {
//         //play the winner sound
//         $scope.game.winnerSound.play();
//         //change the button to new game
//         $scope.resetText = 'NEW GAME';
//         //make the board no longer hoverable
//         for (var i=0;i<$scope.game.board.length;i++){
//           for (var j=0;j<$scope.game.board[i].length;j++) {
//             $scope.boardClass[i][j] = ""; 
//           }
//          }
//         //say that the game has been won
//         $scope.game.win = true;
//         clearInterval($scope.timer);
//         $scope.game.timeClicked = false;
//         $scope.resetStyle = "display: none";
//         $scope.gameStyle = "display: none";
//         $scope.endGameSequence();
//         setTimeout(function(){$scope.$apply(function(){clearInterval($scope.endGameTimer);$scope.jumpOnFlagSequence();});},3000);
//     }

//     $scope.reset = function() {
//     	  $scope.gameStyle = "display: block";
//         $scope.floorStyle = "left: -1px";
//         $scope.bushStyle = "left: 680px";
//         $scope.mountainStyle = "left: 20px"; 
//         $scope.castleStyle = "left: 115%";
//         $scope.flagLeftStyle = "left: 101.5%";
//         $scope.flagBottomStyle = "bottom: 350px";
//         $scope.flagPoleStyle = "left: 100%";
//         if ($scope.game.win == true) {
//           $scope.game.move = 0;
//           $scope.resetText = "?";
//           $scope.resetClass = "coinBox"
//           $scope.marioClass = "";
//           $scope.marioLeftStyle = "left: "+move + "px"; 
//           $scope.marioDisplayStyle = "display:block;";
//           $scope.walk();
//         }
//          $scope.game.board = [["","",""],["","",""],["","",""]];
//          $scope.game.win = false;
//          $scope.game.counter = 0;
//          $scope.game.filler = "O";
//          $scope.game.timeCount = 10;
//          $scope.turn = "MARIO";
//          for (var i=0;i<$scope.game.board.length;i++){
//           for(var j=0;j<$scope.game.board[i].length;j++)
//             $scope.game.board[i][j] = "";

//           //possible error
//             $scope.game.boardClass[i][j] = "gameBoardHover";
//          }
//          if ($scope.game.wins[0] + $scope.game.wins[1] + 1 == 0) {
//          	$scope.world = $scope.game.world;
//           $scope.level = $scope.game.level;
//          }
//          else {
//          	if ($scope.game.level >= 8) {
//          		$scope.game.level = ($scope.game.level + 1) - (8 * $scope.game.world);
//          		$scope.game.world++;
//          	}
//          	else {
//          		$scope.game.level = ($scope.game.wins[0] + $scope.game.wins[1] + 1);
//          	}
//          	$scope.world = $scope.game.world;
//           $scope.level = $scope.game.level;
//          }
//        if (!$scope.game.timeClicked) {
// 	      $scope.timer = setInterval( function() {
//           $scope.$apply(function() {
// 	    			$scope.game.timeCount--;
// 	    			$scope.game.timeClicked = true;
// 	    			$scope.timeCountdown = $scope.game.timeCount;
// 	    			if ($scope.game.timeCount <= 0) {
// 	    				if ($scope.game.filler == "X") {
// 	    					$scope.player1Wins();
// 	    				}
//     					else {
//     						$scope.player2Wins();
//     					}
// 	    			}
// 					});}, 1000);   
// 		    }
//     }
//   $scope.cloudMover = function() {
//   	$scope.clouds = setInterval( function() {
//       $scope.$apply(function(){

// 	  	//for(var i=0;i<4;i++) {
//         //fix conditional statement
// 	  		//if (cloud[i].offsetLeft + cloud[i].offsetWidth <= 0) {
// 	    		//$scope.cloudLeft[i] = "left: " + body.offsetWidth; //fix offsetWidth
// 	    		$scope.cloudTop1 = "top: " + Math.floor(Math.random()*300 + 100);
//           $scope.cloudTop2 = "top: " + Math.floor(Math.random()*300 + 100);
//           $scope.cloudTop3 = "top: " + Math.floor(Math.random()*300 + 100);
//           $scope.cloudTop4 = "top: " + Math.floor(Math.random()*300 + 100);

// 	    	// }
// 	    	// else {
//       //     if (i == 3){
//       //       $scope.cloudLeft[i] = "left: " + cloud[i].offsetLeft - 1;
//       //     }
//       //     else {
//       //       $scope.cloudLeft[i] = "left: " + cloud[i].offsetLeft - 2;
//       //     }
// 		    // }
	  	
// 		});}, 50);   
// 	}
//document.getElementById('mario').offsetLeft
// //need to test
  

//   //$scope.walk();
//   //$scope.cloudMover();
});

