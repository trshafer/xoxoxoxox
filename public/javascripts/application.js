// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

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

var Board = new function(){
  
  var winningSets = [
   [0,1,2], [3,4,5], [6,7,8], //across
   [0,3,6], [1,4,7], [2,5,8], //down
   [0,4,8], [2,4,6] //diagonal
  ];
  
  function initClicks(){
    $('.space.unselected').live('click', spaceHandler);
  }
  
  function spaceHandler(ev, data){
    if(data == null){
      data= {player: 'user'};
    }
    log('click by: '+ data.player);
    //the click action
    $(this).removeClass('unselected').addClass('selected').addClass(data.player);
    //check for game over
    if(gameOver()){
      log('game over');
      $('.space.unselected').die('click', spaceHandler);
      return;
    }
    if(data.player == 'user'){
       makeComputerMove();
    }
  };
  
  function spaceIdsFor(player){
    return $('.space.selected.'+player).map(function(index, elem){
      return parseInt($(this).attr('data-space-id'), 10);
    });
  }
  
  function gameOver(){
    var isGameOver = false;
    var winner = null;
    var winningSet = $();
    //first check for user wins
    var userSpaces = spaceIdsFor('user'), computerSpaces = spaceIdsFor('computer');
    log(userSpaces, 'userSpaces');
    log(computerSpaces, 'computerSpaces');
    
    //ugh I can do this better..
    //check for user win
    $.each(winningSets, function(index, elem){
      if(isGameOver){
        return;
      }
      var intersection = intersectionOf($(this), userSpaces);
      log(intersection, 'intersection');
      if($(this).compare(intersection)){
        winningSet = intersection;
        isGameOver = true;
        winner = 'user';
      }
    });
    
    //check for computer win
    $.each(winningSets, function(index, elem){
      if(isGameOver){
        return;
      }
      var intersection = intersectionOf($(this), computerSpaces);
      log(intersection, 'intersection');
      if($(this).compare(intersection)){
        winningSet = intersection;
        isGameOver = true;
        winner = 'computer';
      }
    });
    
    
    
    log(winningSet, 'winningSet');
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
      $('#end-game-results').text('You ' + (winner == 'user' ? 'win' : 'lose') + '!' );
    }else{
      $('#end-game-results').text('It\'s a tie.');
    }
  }
  
  function markWinningSpaces(winningSet){
     winningSet.each(function(index, item){
      $('#space-'+item).addClass('winning-space');
    });
  }
  
  function makeComputerMove(){
    var elem = $('.space.unselected').filter(':random');
    elem.trigger('click', {player: 'computer'});
  }
  return {
    init: function(){
      initClicks();
    }
  };
  
}().init();


function log(obj,msg) {
  if( window.console && console.log ){
    if(msg != null)
      console.log(msg);
    console.log(obj);
  }
}
