var method = Event.prototype;

function Event(type,patterntype,pattern,action,options){
  this.type = type;
  this.patterntype = patterntype;
  this.pattern = pattern;
  this.action = action;
  for( option in options ) this[option] = options[option];
  if( !this.validate() ) throw new Error("not validated");
}

method.getTypes = function(){
  return ["single"];
}

method.getActions = function(){
  // *TODO*
  // iterate over dir (see bullmq) with possible actions
}

method.validate = function(){
  var types = this.getTypes();
  return types.indexOf(this.type) > -1;
}

module.exports = Event;
