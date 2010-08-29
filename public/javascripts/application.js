var debug = true;

function log(obj,msg) {
  if( window.console && console.log && debug){
    if(msg != null)
      console.log(msg);
    console.log(obj);
  }
}