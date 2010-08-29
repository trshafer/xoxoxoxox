RandomAI = function(){
  function move(){
    log(Board.emptySpaceIds())
    log(Board.emptySpaceIds().random())
    return Board.emptySpaceIds().random();
  }
  return {move:move};
}();
