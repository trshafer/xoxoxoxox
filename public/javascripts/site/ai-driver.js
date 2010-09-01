var AIDriver = function(){
  var ai;
  function init(aiImplementation){
    ai = aiImplementation;
  }
  
  function move(){
    var response = ai.move();
    var elem = $(response);
    if(isInt(response)){
      elem = $('#space-'+response);
    }
    else if(isInt(elem.get(0))){
      elem = $('#space-'+elem.get(0));
    }else{
      elem = $(response);
    }
    if(elem.hasClass('selected')){
      Logger.systemError('AI returned a space which has already been selected.');
      return false;
    }
    else if(elem.hasClass('space')){
      elem.trigger('click', {player: 'computer'});
      return true;
    }else{
      Logger.systemError('AI did not return an Integer between 0-8.');
      Logger.systemError('Returned: '+response);
      return false;
    }
  }
  
  // http://www.peterbe.com/plog/isint-function
  function isInt(x) {
    var y = parseInt(x,10);
    if (isNaN(y)) return false;
    return x == y && x.toString() == y.toString();
  }
  
  function isInitialized(){
    return ai != null;
  }
  
  return {
    init: init,
    setAI: init,
    move: move,
    isInitialized: isInitialized
  };
}();