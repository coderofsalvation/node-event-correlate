// *TODO* action will fire an event back to event-correllate (handy for aliasing)
var method = ignore.prototype;

function ignore(){
  this.name = "ignore";
}

method.ignore = function(){
  return false; // nothing more to say here :)
}

module.exports = ignore;
