RandomAI = function(){
  function move(){
    return $('.space.unselected').filter(':random');
  }
  return {move:move};
}();
