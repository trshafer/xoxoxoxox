$('#login-link').live('click', function(ev){
  $('form#new_user_session').show();
});

$('#logout-link').live('click', function(ev){
  ev.preventDefault();
  $.get($(this).attr('href'));
  return false;
});

$('#signup-link').live('click', function(ev){
  $('form#new_user').show();
});

$('form#new_user_session').live('submit', function(ev){
  ev.preventDefault();
  $(this).ajaxSubmit({success: function(responseText, statusText, xhr){
    log(responseText)
  }});
  return false;
});

$('form#new_user').live('submit', function(ev){
  ev.preventDefault();
  $(this).ajaxSubmit({success: function(responseText, statusText, xhr){
    log(responseText)
  }});
  return false;
});  