var method = regex.prototype;

function regex(config){
  this.config = config;
  this.name   = "regex";
  this.succes = false;
  if( config.pattern == undefined ) throw new Exception("PROMISE_DATA_INCOMPLETE");
}

method.process = function(input,callback){
  match =  String(input).match( new RegExp(this.config.pattern,"gi") );
  // report if things went ok
  callback( this.config.continue ? match : !match );
}

method.toString = function(){
  return "'"+this.config.pattern+"' is "+ (this.config.continue?"":"not ") +"mentioned";
}

module.exports = regex;
