$('#other_ais').live('change', function(){
  if($(this).val() == ''){
    $('#run-simulation-link').hide();
  }else{
    $('#run-simulation-link').show();
  }
});

$('.run-competition').live('click', function(){
  var competitorAI = AIMaker.wrapCode($('#other_ais').val());
  AIDriver.setCompetitorAI(competitorAI);
  Board.simulate();
});


var AIDriver = function(){
  var userAI;
  var competitorAI;
  function init(aiImplementation){
    userAI = aiImplementation;
  }
  
  function setCompetitorAI(aiImplementation){
    competitorAI = aiImplementation;
  }
  
  function moveCompetitor(){
    return move(competitorAI, 'competitor');
  }
  
  function move(ai, player){
    try{
      if(ai == null){
        ai = userAI;
      }
      if(player == null){
        player = 'ai';
      }
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
        Logger.systemError('AI returned space '+ elem.attr('data-space-id')+', which has already been selected.');
        return false;
      }
      else if(elem.hasClass('space')){
        elem.trigger('click', {player: player});
        return true;
      }else{
        Logger.systemError('AI did not return an Integer between 0-8.');
        Logger.systemError('Returned: '+response);
        return false;
      }
    }catch (e){
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
    return userAI != null;
  }
  
  return {
    init: init,
    setAI: init,
    setCompetitorAI: setCompetitorAI,
    move: move,
    moveCompetitor: moveCompetitor,
    isInitialized: isInitialized
  };
}();