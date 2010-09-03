var Rules = function(){
  
  var winningSets = [
   [0,1,2], [3,4,5], [6,7,8], //across
   [0,3,6], [1,4,7], [2,5,8], //down
   [0,4,8], [2,4,6] //diagonal
  ];
  
  function playerWins(computerSpaces){
    playerWins = false;
    //check for computer win
    $.each(winningSets, function(index, elem){
      if(playerWins){
        return;
      }
      var intersection = intersectionOf($(this), computerSpaces);
      // log(intersection, 'intersection');
      if($(this).compare(intersection)){
        playerWins = true;
      }
    });
    return playerWins;
  }
  
  function gameOver(){
    var isGameOver = false;
    var winner = null;
    var winningSet = $();
    //first check for competitor wins
    var competitorSpaces = Board.getSpaceIdsForCompetitor(), computerSpaces = Board.getSpaceIdsForAI();
    // log(competitorSpaces, 'competitorSpaces');
    // log(computerSpaces, 'computerSpaces');
    
    //ugh I can do this better..
    //check for competitor win
    $.each(winningSets, function(index, elem){
      if(isGameOver){
        return;
      }
      var intersection = intersectionOf($(this), competitorSpaces);
      // log(intersection, 'intersection');
      if($(this).compare(intersection)){
        winningSet = intersection;
        isGameOver = true;
        winner = 'competitor';
      }
    });
    
    //check for computer win
    $.each(winningSets, function(index, elem){
      if(isGameOver){
        return;
      }
      var intersection = intersectionOf($(this), computerSpaces);
      // log(intersection, 'intersection');
      if($(this).compare(intersection)){
        winningSet = intersection;
        isGameOver = true;
        winner = 'ai';
      }
    });
    
    // log(winningSet, 'winningSet');
    if(winner != null){
      markWinningSpaces(winningSet);
    }
    //finally just see if there are no more moves
    if($('.space.unselected').size() == 0){
      isGameOver = true;
    }
    if(isGameOver){
      informOfWinner(winner);
    }
    return isGameOver;
  }
  
  function informOfWinner(winner){
    if(winner != null){
      $('#end-game-results').text('You ' + (winner == 'competitor' ? 'win' : 'lose') + '!' );
    }else{
      $('#end-game-results').text('It\'s a tie.');
    }
  }
  
  function markWinningSpaces(winningSet){
     winningSet.each(function(index, item){
      $('#space-'+item).addClass('winning-space');
    });
  }
  
  return {
    gameOver: gameOver,
    playerWins: playerWins,
    informOfWinner: informOfWinner
  };
  
}();