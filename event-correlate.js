var db = require("./db");
var Event = require("./event");

//db.users.save({email: "srirangan@gmail.com", password: "iLoveMongo", sex: "male"}, function(err, saved) {
//    if( err || !saved ) console.log("User not saved");
//      else console.log("User saved");
//});
//
//// app.js
//db.users.find({sex: "male"}, function(err, users) {
//  if( err || !users) console.log("No female users found");
//  else users.forEach( function(femaleUser) {
//    console.log(femaleUser);
//  } );
//});

var method = EventCorrelate.prototype;

function EventCorrelate(){
  var f = new Event("single",1,2,3);
  this.load("action");
  this.load("event");
  this.load("promise");
  this.config = {};
}

// Load configurations in conf.d/*
method.load =  function(type){
  require('fs').readdirSync( type+'/' ).forEach(function(file) {
    if (file.match(/.+\.js/g) !== null) {
      var name = file.replace('.js', '');
      exports[name]   = require('./'+type+'/' + file);
      console.log("loading "+type+"/"+file);
    }
  });
}

method.init = function( config ){
  console.log("loading config");
  this.config = config;
}

method.getEvents = function(){
  var events = {};
  for( event in this.config.events ){
    console.log("creating event "+event);
    var eventdata = this.config.events[event];
    events[event] = new exports[ eventdata.type ](eventdata,this);
  }
  return events;
}

method.getPromises = function(promises){
  var promisesObj = [];
  for( promise in promises ){
    var thepromise = promises[promise];
    console.log("creating promise "+thepromise.type);
    promisesObj.push( new exports[ thepromise.type ]( thepromise.data ) );
  }
  return promisesObj;
}

method.process = function( input ){
  console.log("processing '"+input+"'");
  var events = this.getEvents();
  for( event in events ) events[event].process(input);
}

module.exports = EventCorrelate;
