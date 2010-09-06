SmartAI = new function(){
  
  function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
  }
  
  function move(){
    var userBlock = checkForUserBlock();
    if(userBlock != null){
      return userBlock;
    }
    var nextOptions = [4,0,2,6,8];
    for(var i = 0; i < nextOptions.length; i++){
      var item = nextOptions[i];
      if(Board.getSpaceOccupier(item) == 'empty'){
        return item;
      }
    }
    return Board.getEmptySpaceIds()[0];
  }

  function checkForUserBlock(){
    var userSpaces = Board.getSpaceIdsForCompetitor();
    var aiSpaces = Board.getSpaceIdsForAI();
    var checking = [aiSpaces, userSpaces ];
    Logger.info(checking)
    for(var i=0; i < checking.length; i++){
      var spacesToCheck = checking[i];
      Logger.info(spacesToCheck)
      var horizontalCheckOptions = [[1,2],[0,2],[0,1]];
      var needBlock = worthwhileMove(spacesToCheck, horizontalCheckOptions, true);
      if(needBlock != null){
        Logger.info('BLOCKING HORIZ');
        return needBlock;
      }
      var verticalCheckOptions = [[3,6],[0,6],[0,3]];
    
      needBlock = worthwhileMove(spacesToCheck, verticalCheckOptions, false);
      if(needBlock != null){
        Logger.info('BLOCKING VERT');
        return needBlock;
      }
      //Diagonal
      if(include(spacesToCheck, 0) && include(spacesToCheck, 8)){
        if(Board.getSpaceOccupier(4) == 'empty'){
          return 4;
        }
      }
      if(include(spacesToCheck, 2) && include(spacesToCheck, 6)){
        if(Board.getSpaceOccupier(4) == 'empty'){
          return 4;
        }
      }
      var secondMove = checkSecondMove(spacesToCheck)
      if(secondMove){
        return secondMove;
      } 
    }
    return null;
  }  
  
  function checkSecondMove(spacesToCheck){
    var diagonalCheck = [
    [0,7,6], [2,7,8],[1,8,3],[2,6,0],
    [0,5,2],[6,5,8],[3,2,0],[3,8,6],
    [0,8,6],[0,8,2],[2,6,0],[2,6,8],
    [3,1,0],[1,5,2],[3,7,6],[7,5,8]];
    for(var i=0;i<diagonalCheck.length;i++){
      var item = diagonalCheck[i];
      if(include(spacesToCheck, item[0]) && include(spacesToCheck, item[1])){
        if(Board.getSpaceOccupier(item[2]) == 'empty'){
          return item[2];
        }
      }
    }
    return null;
  }
  
  function worthwhileMove(spacesToCheck, checkingOptions, horizontal){
    var move = horizontal ? 3 : 1 
    var aiSpaces = Board.getSpaceIdsForAI();
    // Logger.info(spacesToCheck);
    for(var i =0; i < checkingOptions.length; i++){
      var item = checkingOptions[i];
      // Logger.info(item)
      if(include(spacesToCheck, item[0]) && include(spacesToCheck, item[1])){
        var aiMove = (horizontal ? 0+i : i*3);
        if(Board.getSpaceOccupier(aiMove) == 'empty'){
          return aiMove;
        }
      }
      if(include(spacesToCheck, item[0]+move) && include(spacesToCheck, item[1]+move)){
        var aiMove =(horizontal ? 3+i : i*3+1);
        if(Board.getSpaceOccupier(aiMove) == 'empty'){
          return aiMove;
        }
      }
      if(include(spacesToCheck, item[0]+move*2) && include(spacesToCheck, item[1]+move*2)){
        var aiMove = (horizontal ? 6+i : i*3+2);
        if(Board.getSpaceOccupier(aiMove) == 'empty'){
          return aiMove;
        }
      }
    }
    return null;
  }
 

    return {move:move};
}();
  