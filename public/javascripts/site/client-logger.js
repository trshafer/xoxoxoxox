var Logger = new function(){
  
  var userConsole = 'user-console';
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
  
  function userLog(level, message){
    $('#'+userConsole).append($('<p>').addClass('log').addClass(level).text(++counter + ': ' +message));
  }
  
  return {
    info: info,
    warn: warn,
    error: error,
    systemError: systemError
  };
}();