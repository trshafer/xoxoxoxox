// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
$('.space.unselected').live('click', function(ev, data){
  if(data == null){
    data= {player: 'user'};
  }
  $(this).removeClass('unselected').addClass('selected').addClass(data.player);
  if(data.player == 'user'){
    Board.makeComputerMove();
  }
});

var Board = new function(){
  function makeComputerMove(){
    $('.space.unselected').first().trigger('click', {player: 'computer'});
  }
  return {
    makeComputerMove: makeComputerMove
  };
  
}();
