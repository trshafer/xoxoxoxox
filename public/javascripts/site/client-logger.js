var Logger = new function(){
  
  var userConsoleId = 'user-console';
  var counter = 0;
  function info(message){
    userLog('info', message);
  }
  function warn(message){
    userLog('warn', message);
  }
  function error(message){
    userLog('error', message);
  }
  function systemError(message){
    userLog('system-error', message);
  }
  
  function clear(){
    $('#'+userConsoleId).empty();
    counter = 0;
  }
  
  function itemNiceString(item){
   if(typeof item == 'string' || typeof item == 'number'){
      return item;
    //it is now an array,
    }else if(item instanceof Array){
      var collectedItems = [];
      $.each(item, function(index, singleItem){
        collectedItems.push(itemNiceString(singleItem));
      });
      return '[' + collectedItems.join(', ') +']';
    }else{
      var collectedItems = [];
      $.each(item, function(key,value){
        collectedItems.push(itemNiceString(key) + ': '+ itemNiceString(value));
      });
       return '{' + collectedItems.join(', ') + '}';
    }
  }
  
  function userLog(level, message){
    if(Board.isNotAI()){
      return;
    }
    var userConsole = $('#'+userConsoleId);
    //just set the message as a string
    message = itemNiceString(message);
    userConsole.append($('<p>').addClass('log').addClass(level).text(++counter + ': ' + message));
    userConsole.attr({ scrollTop: userConsole.attr("scrollHeight") - userConsole.height() });
  }
  
  return {
    info: info,
    warn: warn,
    error: error,
    clear: clear,
    systemError: systemError
  };
}();

$('a.clear-console').live('click', function(ev){
  Logger.clear();
  return false;
});