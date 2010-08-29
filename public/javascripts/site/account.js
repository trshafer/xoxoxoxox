$('#login-link').live('click', function(ev){
  $('form#new_user_session').show();
});

$('#logout-link').live('click', function(ev){
  ev.preventDefault();
  $.get($(this).attr('href'), function(data){
    WindowHandler.resize();
  });
  return false;
});

$('#signup-link').live('click', function(ev){
  $('form#new_user').show();
});

$('form#new_user_session').live('submit', function(ev){
  ev.preventDefault();
  $(this).ajaxSubmit({success: function(responseText, statusText, xhr){
    WindowHandler.resize();
  }});
  return false;
});

$('form#new_user').live('submit', function(ev){
  ev.preventDefault();
  $(this).ajaxSubmit({success: function(responseText, statusText, xhr){
    WindowHandler.resize();
  }});
  return false;
});

var Account = new function(){
  
  var userId, gameId, aiImplementationId;
  
  function login(newUserId){
    userId = newUserId;
  }
  
  function startGame(){
    if(userId == null){return;}
    $.post('/users/'+userId+'/games', function(data){
      gameId = data.game_id
      log(data, 'startGame')
    }, 'json');
  }
  
  
  function setCode(ai_id){
      aiImplementationId = ai_id;
  }
  
  function saveCode(code){
    if(userId == null){return;}
    $.ajax({
      url:'/users/'+userId+'/ai_implementations/' + aiImplementationId,
      data: {
        'ai_implementation[code]':code
      },
      success: function(data){
        log(data, 'saveCode')
      }, 
      dataType: 'json',
      type: 'put'});
  }
  
  function markMove(player, space){
    if(userId == null){return;}
    if(gameId == null){
      console.warn("HEY DUDE THIS SHOULDN'T HAPPEN");
      return;
    }
    $.post('/users/'+userId+'/games/'+gameId+'/mark_move',{'move[player]': player, 'move[space]': space}, function(data){
      log(data, 'markMove');
    }, 'json')
  }
  
  function logout(){
    userId = null;
    gameId = null;
  }
  
  function endGame(){
    if(userId == null){return;}
    log('Insert AJAX call here to end game')
  }
  
  function currentUserId(){
    return userId;
  }
  
  return {
    currentUserId: currentUserId,
    login: login, 
    logout :logout,
    saveCode: saveCode,
    setCode: setCode,
    startGame: startGame, 
    markMove: markMove, 
    endGame: endGame}
}();