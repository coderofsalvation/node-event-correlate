var method = simple.prototype;

function simple(name,config,engine){
  this.name   = name;
  this.config = config;
  this.engine = engine;
}

method.process = function(input,callback){
  if( this.config.promises == undefined || !this.config.promises.length )
    throw new Exception("NO_PROMISES_GIVEN");
  var promises = this.engine.getPromises(this.config.promises);
  var satisfied = 0;
  console.log( this.name+" "+this.engine.event.summarizeEvent( promises ) );
  for( p in promises ){
    var promise = promises[p];
    if( promise.process(input) ){
      console.log("☑ "+promise);
      satisfied++;
    }else{
      console.log("☐ "+promise);
      break;
    }
  }
  console.log("promise was "+ ( promises.length == satisfied ? "forfilled" : "not forfilled") );
  return ( promises.length == satisfied );
}

module.exports = simple;
