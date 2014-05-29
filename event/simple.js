var method = simple.prototype;

function simple(config,engine){
  this.config = config;
  this.engine = engine;
}

method.process = function(input){
  if( this.config.promises == undefined || !this.config.promises.length )
    throw new Exception("NO_PROMISES_GIVEN");
  var promises = this.engine.getPromises(this.config.promises);
  var match = false;
  for( p in promises ){
    var promise = promises[p];
    if( promise.process(input) ) match = true;
  }
  console.log("promise was "+ (match ? "forfilled" : "not forfilled") );
}

module.exports = simple;
