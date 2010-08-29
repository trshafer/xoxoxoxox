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
      console.warn('Error making move!');
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

$('a#add-code').live('click', function(){
  $('form#new_ai_implementation').show()
});

$('a.cancel').live('click', function(){
  var form = $(this).closest('form').hide();
  form.find('input[type=text]').each(function(index){
    $(this).val('');
  });
})

$('#new_ai_implementation').live('submit', function(ev){
  ev.preventDefault();
  $(this).ajaxSubmit({
    dataType: 'json',
    success: function(data){
            log(data, 'SUCCESSS')

      var newItem = $('<li>').addClass('load-ai-code').attr('data-service-url', data.ai_implementation.service_url)
      newItem.text(data.ai_implementation.name)
      $('li.add-form-wrapper').after(newItem)
      newItem.click();
      $('a.cancel').click();
      }
  });
  return false;
})

$('#save-code').live('click', function(){
  Account.saveCode($('textarea#user_ai').val());
});

$('li.load-ai-code:not(.selected)').live('click', function(){
  var self = $(this)
  $.get(self.attr('data-service-url'), function(data){
    $('li.load-ai-code.selected').removeClass('selected');
    self.addClass('selected');
    $('textarea#user_ai').val(data.ai_implementation.code);
    Account.setCode(data.ai_implementation.id)
    $('textarea#user_ai').blur();
  }, 'json');
});

$('textarea#user_ai').live('blur', function(){
  var userCode = $('textarea#user_ai').val() +"return {move:move};";
  var UserAI = new Function(userCode)();
  AIDriver.setAI(UserAI);
});