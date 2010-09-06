var Help = new function(){
  
  // Create your own AI
  // The only function you must implement is a move function
  // 
  // 
  // Public interface:

  // Client Logger:
  //  
  //  
  // if you get frustrated, you can always go back to Board.getEmptySpaceIds().sort(function(){return 0.5-Math.random()})[0];

  function show(){
    var helpDialog = $('<div>', {title: 'Create your own AI'});
    var instructions = $('<p>').text('The only function you must implement is a move function. The move function must return an integer between 0-8. The space must be empty.');
    var interfaceInstructions = $('<ul>');
    $('<li>').text('To get competitor (user/opponent ai) spaces call: ').append($('<span class="code">').text('Board.getSpaceIdsForCompetitor();')).appendTo(interfaceInstructions);
    $('<li>').text('To get computer spaces call: ').append($('<span class="code">').text('Board.getSpaceIdsForAI();')).appendTo(interfaceInstructions);
    $('<li>').text('To get empty spaces call: ').append($('<span class="code">').text('Board.getEmptySpaceIds();')).appendTo(interfaceInstructions);
    $('<li>').text('To see who occupies a space (returns \'ai\', \'competitor\', \'blank\') pass an integer to: ').append($('<span class="code">').text('Board.getSpaceOccupier(spaceId);')).appendTo(interfaceInstructions);
    $('<li>').text('To see if you have a winning set use: ').append($('<span class="code">').text('Rules.playerWins(playerIdsArray);')).appendTo(interfaceInstructions);

    var loggerInstructions = $('<ul>');
    $('<li>').text("Logger.info('some info'), Logger.warn('a warning'), Logger.error('the error');").appendTo(loggerInstructions);
    $('<li>').text("The Logger will pretty print objects for you: {a: 'b', c: [1, 2, {d: 'f'}]}").appendTo(loggerInstructions);
    
    var quickAIs = $('<ul>');
    $('<li>').text('An AI which returns the first available space: ').append($('<span class="code">').text('Board.getEmptySpaceIds()[0];')).appendTo(quickAIs);
    $('<li>').text('An AI which returns a random available space: ').append($('<span class="code">').text('Board.getEmptySpaceIds().sort(function(){return 0.5-Math.random()})[0];')).appendTo(quickAIs);
    helpDialog.append(instructions);
    helpDialog.append($('<h3>').text('Public interface:'));
    helpDialog.append(interfaceInstructions);
    helpDialog.append($('<h3>').text('Client Logger:'));
    helpDialog.append(loggerInstructions);
    helpDialog.append($('<h3>').text('Sample AIs:'));
    helpDialog.append(quickAIs);

    helpDialog.dialog({
      dialogClass: 'help-dialog',
      height: 335,
      width: 746,
      close: function(ev){
        $(this).remove();
      },
      buttons: {
        'Close': function(ev){
          $(this).remove();
        }
      }
    });
    
  }
  
  return {show: show};
}();