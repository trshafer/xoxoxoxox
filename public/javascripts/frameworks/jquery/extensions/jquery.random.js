// Taken from: http://blog.mastykarz.nl/jquery-random-filter/
$.fn.random = function(){
  function randOrd(){return (Math.round(Math.random())-0.5); } 
  return $(this).sort(randOrd).first();
}