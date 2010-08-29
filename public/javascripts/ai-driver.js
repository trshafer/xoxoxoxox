var AIDriver = function(){
  var ai;
  function init(aiImplementation){
    ai = aiImplementation;
  }
  
  function move(){
    var elem = ai.move();
    elem.trigger('click', {player: 'computer'});
  }
  
  function isInitialized(){
    return ai != null;
  }
  
  return {
    init: init,
    move: move,
    isInitialized: isInitialized
  };
}();
