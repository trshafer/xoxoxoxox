var debug = true;

function log(obj,msg) {
  if( window.console && console.log && debug){
    if(msg != null)
      console.log(msg);
    console.log(obj);
  }
}

$(document).ready(function(){
  if(!AIDriver.isInitialized()){
    if($('#user_ai').size() > 0){
      $('#user_ai').blur();
    }else{
      AIDriver.init(RandomAI);
    }
  }
    $('a.start-game').first().click();
});

var WindowHandler = function(){
  function resize(){
    //Left Side
    var fullHeight = $('#container').height() - $('#footer').height();
    var otherItemsHeight = $('#ai-code-header').height() + $('#ai-code-footer').height();
    $('#ai-code-content').height(fullHeight - otherItemsHeight);
    
    //Right side
    // need to subtract 21 for the heading padding, and 10 for the tic tac toe padding, and 2 for good measure :(
    $('#tic-tac-toe').height(fullHeight - $('#header').height() - 21-10 - 2);
  }
  return {
    resize: resize
  };
}();


$(document).ready(function(){
  $(window).resize(function(ev){
    WindowHandler.resize();
  });
  WindowHandler.resize();
});