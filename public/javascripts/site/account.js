$('#login-link').live('click', function(ev){
  $('form#new_user_session').show();
  $('#login-signup-link-wrapper').hide();
});

$('#logout-link').live('click', function(ev){
  ev.preventDefault();
  $.get($(this).attr('href'), function(data){
    WindowHandler.resize();
  });
  return false;
});

$('a.cancel-login-form').live('click', function(ev){
  $(this).closest('form').hide();
  $('#login-signup-link-wrapper').show();
});

$('#signup-link').live('click', function(ev){
  $('form#new_user').show();
  $('#login-signup-link-wrapper').hide();
});

$('form#new_user_session').live('submit', function(ev){
  ev.preventDefault();
  $(this).ajaxSubmit({success: function(request, statusText, xhr){
    WindowHandler.resize();
    ReadyHandler.init();
  }, error: function(request, statusText, errorThrown){
    eval(request.responseText);
    $('#login-form-wrapper').find('form').show();
  }});
  return false;
});

$('form#new_user').live('submit', function(ev){
  ev.preventDefault();
  $(this).ajaxSubmit({success: function(request, statusText, xhr){
    WindowHandler.resize();
    ReadyHandler.init();
  }, error: function(request, statusText, errorThrown){
    eval(request.responseText);
    $('#signup-form-wrapper').find('form').show();

  }});
  return false;
});

var Account = new function(){
  
  var userId, gameId, aiImplementationId;
  
  function login(newUserId){
    userId = newUserId;
    $('#container').removeClass('logged-out').addClass('logged-in');
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
    $('#save-loader').show();
    $.ajax({
      url:'/users/'+userId+'/ai_implementations/' + aiImplementationId,
      data: {
        'ai_implementation[code]':code
      },
      success: function(data){
        $('#save-loader').hide();
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
    $('#container').addClass('logged-out').removeClass('logged-in');
    Account.initHomeScreen();
  }
  
  function endGame(){
    if(userId == null){return;}
    log('Insert AJAX call here to end game')
  }
  
  function currentUserId(){
    return userId;
  }
  
  function initHomeScreen(){
    $('#meeeee').find('a').attr('href', 'mailto:thomasjshafer@gmail.com');
    $('#overview').tabs();
  }
  
  return {
    currentUserId: currentUserId,
    login: login, 
    logout :logout,
    saveCode: saveCode,
    setCode: setCode,
    startGame: startGame, 
    markMove: markMove, 
    initHomeScreen: initHomeScreen,
    endGame: endGame}
}();