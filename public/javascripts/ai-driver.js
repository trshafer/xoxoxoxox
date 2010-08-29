var AIDriver = function(){
  var ai;
  function init(aiImplementation){
    ai = aiImplementation;
  }
  
  function move(){
    var elem = ai.move();
    elem = $(elem);
    if(isInt(elem.get(0))){
      elem = $('#space-'+elem.get(0));
    }
    if(elem.hasClass('space')){
      elem.trigger('click', {player: 'computer'});
      return true;
    }else{
      console.warn('Error making move!')
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

$('textarea#user_ai').live('blur', function(){
  var userCode = $('textarea#user_ai').val() +"return {move:move};";
  var UserAI = new Function(userCode)();
  AIDriver.setAI(UserAI);
});