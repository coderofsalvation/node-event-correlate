
module.exports.init = function(engine){
  this.engine = engine;
}

module.exports.process = function (input, list, callback ){
  list.current.process( input, list.next(), callback );
}

module.exports.summarizeEvent = function(promises){
  var str = [];
  for( p in promises ) str.push( promises[p].toString() );
  return "gets triggered when "+ str.join(" and ");
}

module.exports.doActions = function(event,config){
  var actions = this.engine.getActions(config);
  this.engine.trigger("event_succes");
  for( a in actions ){
    this.engine.trigger("action_"+actions[a].name);
    if( actions[a].process != undefined ) actions[a].process();
    else throw "action "+a+" has no process() function";
  }
}
