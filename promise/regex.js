var method = regex.prototype;

function regex(config){
  this.config = config;
  if( config.pattern == undefined ) throw new Exception("PROMISE_DATA_INCOMPLETE");
}

method.process = function(input){
  console.log("matching regex: "+this.config.pattern);
  return String(input).match( new RegExp(this.config.pattern,"gi") );
}

module.exports = regex;
