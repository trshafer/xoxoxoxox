var debug = true;

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

var AI = function(){
  var smart = true;
  
  function init(startingIntelligence){
    smart = startingIntelligence;
  }
  
  function wiseChoice(){
    var userIds = Board.spaceIdsFor('user'), computerIds = Board.spaceIdsFor('computer');
    var availableIds = $('.space.unselected').map(function(index, elem){
      return parseInt($(this).attr('data-space-id'), 10);
    });
    var theCheck = checkWrapper(availableIds, userIds, computerIds);
    log(theCheck, 'theCheck')
    return theCheck;
  }
  
  function checkWrapper(availableIds, userIds, computerIds){
    availableIds.filter(function(index, item){
        return checkWrapper2(availableIds, userIds, computerIds, 'computer');
      });
    }

  function checkWrapper2(availableIds, userIds, computerIds, whoseMove){
    if(availableIds.size() == 0){
      var wrapper = $('<div>').addClass('console-output')
      var joined = userIds.get().join(', ')
      wrapper.append($('<p>').text("User ids: "+ joined))
      wrapper.append($('<p>').text("Computer ids: "+ computerIds.get().join(', ')))
      if(joined == '0, 2, 4, 6, 8'){
        $('#console-debug').append(wrapper)
       debugger;      
      }

      return Rules.computerWins(computerIds);
    }else{
      var winningIds = availableIds.filter(function(index, nextId){
        var copiedIds = availableIds.map(function(index, item){return item});
        copiedIds = copiedIds.not($(nextId))
        var newUserIds = userIds.map(function(index, item){return item});
        var newComputerIds = computerIds.map(function(index, item){return item});
        var nextPlayer;
        if(whoseMove == 'computer'){
          newComputerIds.push(nextId)
          nextPlayer = 'user'
        }else{
          newUserIds.push(nextId)
          nextPlayer = 'computer'
        }

         // debugger
        return checkWrapper2(copiedIds, newUserIds, newComputerIds, nextPlayer);
      });
      debugger
      return winningIds.size() > 0;
    }
  }
    
    // 
    //      return 
    // while(availableIds.size() > 0){
    //    return check(availableIds, userIds, computerIds, 'computer');
    // }
     
  
  function check(availableIds, userIds, computerIds, whoseMove){
    availableIds = availableIds.map(function(index, item){return item});
    userIds = userIds.map(function(index, item){return item});
    computerIds = computerIds.map(function(index, item){return item});

    // log(availableIds, 'availableIds')
    log(computerIds, 'computerIds');
    // log(userIds, 'userIds');

    
    if(Rules.computerWins(computerIds)){
      return true;
    }else if(availableIds.size() == 0){
      return false;
    }else{
      // copiedIds = availableIds.map(function(index, item){return item});
      // availableIds.each(function(index, nextId){
        var nextId = availableIds[0]
        // log(nextId, 'nextId')
        availableIds = availableIds.not($(nextId))
        // log(availableIds, 'availableIds - not')
        // var newAvailableIds = copiedIds.not($(nextId))
        var nextPlayer;
        if(whoseMove == 'computer'){
          computerIds.push(nextId)
          nextPlayer = 'user'
        }else{
          userIds.push(nextId)
          nextPlayer = 'computer'
        }
         return check(availableIds, userIds, computerIds, nextPlayer);
      // });
    }

    // availableIds.each(function(availableIds, item){
    //   afterMoveComputerIds.push(item);
    //   log(afterMoveComputerIds, 'afterMoveComputerIds');
    //   log(computerIds, 'computerIds');
    //   log(Rules.computerWins(afterMoveComputerIds), 'computerWins')
    // });
    //  bestId = availableIds[0];
    // return $('#space-'+bestId);
  }
  
  
  function randomChoice(){
    return $('.space.unselected').filter(':random');
  }
  
  function move(){
    var elem;
    if(smart){
      elem = wiseChoice();
    }else{
      elem = randomChoice();
    }
    elem.trigger('click', {player: 'computer'});
  }
  
  return {
    init: init,
    move: move
  };
}();
AI.init(false);

var Rules = function(){
  
  var winningSets = [
   [0,1,2], [3,4,5], [6,7,8], //across
   [0,3,6], [1,4,7], [2,5,8], //down
   [0,4,8], [2,4,6] //diagonal
  ];
  
  function computerWins(computerSpaces){
    computerWins = false;
    //check for computer win
    $.each(winningSets, function(index, elem){
      if(computerWins){
        return;
      }
      var intersection = intersectionOf($(this), computerSpaces);
      // log(intersection, 'intersection');
      if($(this).compare(intersection)){
        computerWins = true;
      }
    });
    return computerWins;
  }
  
  function gameOver(){
    var isGameOver = false;
    var winner = null;
    var winningSet = $();
    //first check for user wins
    var userSpaces = Board.spaceIdsFor('user'), computerSpaces = Board.spaceIdsFor('computer');
    // log(userSpaces, 'userSpaces');
    // log(computerSpaces, 'computerSpaces');
    
    //ugh I can do this better..
    //check for user win
    $.each(winningSets, function(index, elem){
      if(isGameOver){
        return;
      }
      var intersection = intersectionOf($(this), userSpaces);
      // log(intersection, 'intersection');
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
      // log(intersection, 'intersection');
      if($(this).compare(intersection)){
        winningSet = intersection;
        isGameOver = true;
        winner = 'computer';
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
  
  return {
    gameOver: gameOver,
    computerWins: computerWins
  };
  
}();


var Board = function(){
  

  function initClicks(){
    $('.space.unselected').live('click', spaceHandler);
  }
  
  function spaceHandler(ev, data){
    if(data == null){
      data= {player: 'user'};
    }
    // log('click by: '+ data.player);
    //the click action
    $(this).removeClass('unselected').addClass('selected').addClass(data.player);
    //check for game over
    if(Rules.gameOver()){
      log('game over');
      $('.space.unselected').die('click', spaceHandler);
      return;
    }
    if(data.player == 'user'){
       AI.move();
    }
  };
  
  function spaceIdsFor(player){
    return $('.space.selected.'+player).map(function(index, elem){
      return parseInt($(this).attr('data-space-id'), 10);
    });
  }
  
  return {
    init: function(){
      initClicks();
    },
    spaceIdsFor: spaceIdsFor
  };
  
}();
Board.init();


function log(obj,msg) {
  if( window.console && console.log && debug){
    if(msg != null)
      console.log(msg);
    console.log(obj);
  }
}
