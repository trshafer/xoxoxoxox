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
    var fullHeight = $('#ai-code-wrapper').height();
    var otherItemsHeight = $('#ai-code-header').height() + $('#ai-code-footer').height();
    $('#ai-code-content').height(fullHeight - otherItemsHeight);
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