
$('.reset-board').live('click', function(ev){
  ev.preventDefault();
  Board.reset();
  return false;
});

$('.start-game').live('click', function(ev){
  ev.preventDefault();
  Board.reset();
  // Account.startGame();
  return false;
});

// http://bytes.com/topic/javascript/answers/712559-determining-intersection-two-arrays
function intersectionOf(array1, array2){
  array3 = $();
  for(var i=0;i<array1.length;i++) {
    for(var j=0;j<array2.length;j++) {
      if(array2[j] == array1[i]) {
        array3.push(array2[j]);
      }
    }
  }
  return array3;
}

var Board = function(){
  

  function initClicks(){
    $('.space.unselected').live('click', spaceHandler);
  }
  
  function killClicks(){
    $('.space.unselected').die('click', spaceHandler);
  }
  
  function simulate(competitor){
    reset();
    var player = 'competitor';
    var aiWorks = true;
    var successfulAIMove;
    while(!Rules.gameOver() && aiWorks){
      if(player == 'competitor'){
        player = 'user';
        successfulAIMove = AIDriver.moveCompetitor();
        if(!successfulAIMove){
          aiWorks = false;
          Logger.systemError('The competitor\'s AI failed to make a correct move. Game Ending.');
          return;
        }
      }else{
        player = 'competitor';
        successfulAIMove = AIDriver.move();
        if(!successfulAIMove){
          aiWorks = false;
          Logger.systemError('Your AI failed to make a correct move.');
          return;
        }
      }
    }
  }
  
  function spaceHandler(ev, data){
    AIMaker.ensureCurrentCode();
    if(data == null){
      data= {player: 'user'};
    }
    // log('click by: '+ data.player);
    //the click action
    $(this).removeClass('unselected').addClass('selected').addClass(data.player);
    //check for game over
    if(Rules.gameOver()){
      // log('game over');
      // Account.endGame();
      killClicks();
      return;
    }
    if(data.player == 'user'){
       var successfulAIMove = AIDriver.move();
       if(!successfulAIMove){
         Logger.systemError('Retracted user move from space '+ $(this).attr('data-space-id')+'.');
         $(this).addClass('unselected').removeClass('selected').removeClass(data.player);
         return;
       }
    }
    // Account.markMove(data.player, $(this).attr('data-space-id'));
  };
  
  function spaceIdsFor(player){
    return $('.space.selected.'+player).map(function(index, elem){
      return parseInt($(this).attr('data-space-id'), 10);
    });
  }
  
  function emptySpaceIds(){
    return $('.space.unselected').map(function(index, elem){
      return parseInt($(this).attr('data-space-id'), 10);
    });
  }
  
  function reset(){
    $('.space').removeClass('selected').
    removeClass('user').removeClass('computer').removeClass('competitor').
    removeClass('winning-space').addClass('unselected');
    $('#end-game-results').text('');
    killClicks();
    initClicks();
  }
  
  return {
    init: function(){
      initClicks();
    },
    reset: reset,
    simulate: simulate,
    spaceIdsFor: spaceIdsFor,
    emptySpaceIds: emptySpaceIds
  };
  
}();
