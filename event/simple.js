var method = simple.prototype;

function simple(name,config,engine){
  this.name   = name;
  this.next   = false;
  this.config = config;
  this.engine = engine;
}

method.process = function(event, input,callback){
  if( this.config.promises == undefined || !this.config.promises.length )
    throw new Exception("NO_PROMISES_GIVEN");
  var promises = this.engine.getPromises(this.config.promises);
  var satisfied = 0;
  console.log( this.name+" "+this.engine.event.summarizeEvent( promises ) );
  this.engine.event.promisesSatisfied(event,input,promises,callback);
}

module.exports = simple;
