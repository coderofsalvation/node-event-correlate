// example strings for 'when':
//   10 minutes from now
//   in 5 hours
//   at 5pm
//   at 12:30
//   at 23:35
//   in 2 days
//   tuesday at 9am
//   monday at 1:00am
//   last monday at 1:00am
//   tomorrow at 3pm
//   yesterday at 12:30am
//   5pm tonight
//   tomorrow at noon
//   next week tuesday
//   next week tuesday at 4:30pm
//   2 weeks from wednesday
//   tomorrow night at 9
//   tomorrow afternoon
//   this morning at 9
//   2 years from yesterday at 5pm
//   1 year ago from now
//   last month
//   tomorrow afternoon at 4:30pm 1 month from now
//   at 12:30
//   at 12.30
//   tuesday at 9
//   tomorrow at 15

var humandate = require("date.js");
require("date");

var method = pastevent.prototype;

function pastevent(config,engine){
  this.config = config;
  this.name   = "pastevent";
  this.engine = engine;
  this.succes = false;
  if( config.event == undefined ) throw new Exception("PROMISE_DATA_INCOMPLETE");
}

method.onStorageGet = function(data){
  console.log("onStorageGet()");
  return true;
}

method.process = function(input,callback){
  console.log("check whether pastevent "+this.config.event+" happened "+this.config.when);
  data = {
    search: {"name":this.config.event },
    context: this
  }
  this.engine.trigger("storage_get", data, function(result){
    var treshold = new Date( humandate( data.context.config.window ) ).getTime();
    var last     = new Date(result[0].date).getTime();
    process.env.DEBUG && console.log("treshold: "+treshold);
    process.env.DEBUG && console.log("last    : "+last);
    callback( true ) ;//(data.context.config.type == "before" ? (last<treshold) : (treshold>last)) );
  });
}

method.toString = function(){
  return this.config.event+" "+ (this.config.happened ? "did not happen" : "happened") + " "+this.config.when;
}

module.exports = pastevent;
