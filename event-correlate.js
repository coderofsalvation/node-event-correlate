var Event = require("./event");
var method = EventCorrelate.prototype;

function EventCorrelate(){
  this.load("action");
  this.load("event");
  this.load("promise");
  this.event = Event;
  this.event.init(this);
  this.config = {};
  this.callbacks = {};
}

// Load configurations in conf.d/*
method.load =  function(type){
  require('fs').readdirSync( type+'/' ).forEach(function(file) {
    if (file.match(/.+\.js/g) !== null) {
      var name = file.replace('.js', '');
      exports[name]   = require('./'+type+'/' + file);
      process.env.DEBUG && console.log("loading "+type+"/"+file);
    }
  });
}

method.init = function( config ){
  console.log("loading config");
  this.config = config;
}

method.getActions = function(actions){
  var actionsObj = [];
  this.trigger("storage_set", {"event":"flop"} );
  for( a in actions ){
    var actiondata = actions[a];
    process.env.DEBUG && console.log("creating action "+actiondata.type);
    actionsObj.push( new exports[ actiondata.type ](this) );
  }
  return actionsObj;
}

method.getEvents = function(){
  var events = {};
  for( event in this.config.events ){
    process.env.DEBUG && console.log("creating event "+event);
    var eventdata = this.config.events[event];
    events[event] = new exports[ eventdata.type ](event,eventdata,this);
  }
  return events;
}

method.getPromises = function(promises){
  var promisesObj = [];
  for( promise in promises ){
    var thepromise = promises[promise];
    process.env.DEBUG && console.log("creating promise "+thepromise.type);
    promisesObj.push( new exports[ thepromise.type ]( thepromise.data, this ) );
  }
  return promisesObj;
}

method.process = function( input ){
  console.log("processing '"+input+"'");
  var events = this.getEvents();
  for( event in events ) 
    events[event].process( events[event], input, function(succes,event){
      console.log( (succes ? "✔ " : "✖ " ) + (succes?"":"not ") +"all promised were satisfied");
      if( succes ) event.engine.event.doActions( event );
      else console.log("no actions because of failed promise");
    });
}

method.on = function(event,callback){
  if( this.callbacks[event] == undefined ) this.callbacks[event] = [];
  this.callbacks[event].push(callback);
}

method.trigger = function(event,data){
  process.env.DEBUG && console.log("=> event triggered: "+event); 
  if( this.callbacks[event] != undefined )
    for( cb in this.callbacks[event] ) 
      this.callbacks[event][cb](data);
}

module.exports = EventCorrelate;
