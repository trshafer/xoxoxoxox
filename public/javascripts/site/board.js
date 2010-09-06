
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
  
  var simulation;
  var simulationPlayer;

  function initClicks(){
    $('.space.unselected').live('click', spaceHandler);
  }
  
  function killClicks(){
    $('.space.unselected').die('click', spaceHandler);
  }
  
  function simulate(competitor){
    Board.reset();
    simulation = true;
    simulationPlayer = 'competitor';
    var aiWorks = true;
    var successfulAIMove;
    while(!Rules.gameOver() && aiWorks){
      if(simulationPlayer == 'competitor'){
        simulationPlayer = 'ai';
        successfulAIMove = AIDriver.moveCompetitor();
        if(!successfulAIMove){
          aiWorks = false;
          Logger.systemError('The competitor\'s AI failed to make a correct move. Game Ending.');
          return;
        }
      }else{
        simulationPlayer = 'competitor';
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
      data= {player: 'competitor'};
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
    if(data.player == 'competitor' && !simulation){
       var successfulAIMove = AIDriver.move();
       if(!successfulAIMove){
         Logger.systemError('Retracted user move from space '+ $(this).attr('data-space-id')+'.');
         $(this).addClass('unselected').removeClass('selected').removeClass(data.player);
         return;
       }
    }
    // Account.markMove(data.player, $(this).attr('data-space-id'));
  };
  
  function getSpaceIdsFor(player){
    return $('.space.selected.'+player).map(function(index, elem){
      return parseInt($(this).attr('data-space-id'), 10);
    }).toArray();
  }
  
  function getSpaceIdsForAI(){
    var player = ((simulationPlayer != null && simulationPlayer != 'competitor') ? 'ai' : 'competitor');
    return getSpaceIdsFor(player);
  }
  
  function getSpaceIdsForCompetitor(){
    var player = ((simulationPlayer != null && simulationPlayer != 'competitor') ? 'competitor' : 'ai');
    return getSpaceIdsFor(player);
  }
  
  function getEmptySpaceIds(){
    return $('.space.unselected').map(function(index, elem){
      return parseInt($(this).attr('data-space-id'), 10);
    }).toArray();
  }
  
  function reset(){
    simulation = false;
    simulationPlayer = null;
    $('.space').removeClass('selected').
    removeClass('ai').removeClass('competitor').
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
    getSpaceIdsForAI: getSpaceIdsForAI,
    getSpaceIdsForCompetitor: getSpaceIdsForCompetitor,
    getEmptySpaceIds: getEmptySpaceIds
  };
  
}();
