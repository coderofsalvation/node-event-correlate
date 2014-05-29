var forEachAsync = require('foreachasync').forEachAsync

module.exports.init = function(engine){
  this.engine = engine;
}

module.exports.summarizeEvent = function(promises){
  var str = [];
  for( p in promises ) str.push( promises[p].toString() );
  return "gets triggered when "+ str.join(" and ");
}

module.exports.promisesSatisfied = function(event, input,promises,callback){
  var onFinish = function(status){
    callback( status != -1, event );
  }
  forEachAsync(promises, function (next, element, index, array) {
    element.process(input,function(succes){
      console.log( ( succes ? "☑" :"☐" ) + " "+element.name+": "+element.toString() );
      if( succes ) next();
      else onFinish(-1);
    });
  }).then( onFinish );
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
