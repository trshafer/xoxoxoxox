SmartAI = new function(){
  function move(){
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
    return {move:move};
}();
  