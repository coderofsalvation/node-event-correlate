var EventCorrelate = require("./event-correlate");
var db = require("./db"); // mongodb storage example
var userid = 123;

// event correlation bus
var ec = new EventCorrelate();
ec.init({
  "events": {
    "FOO":{
      type: "simple",
      promises: [{
        type: "pastevent",
        data: {
          event: "FOO",
          happened: true,
          window: "1 year ago from now",
          type: "before"
        }
      },{
        type: "regex",
        data: {
          pattern: "w|world",
          continue: true
        }
      }],
      action: [{
        type: "webhook",
        data: {}
      }]
    }
  }
});

ec.on("storage_get", function(data,callback){
  console.log("getting data: ");
  console.log(data.search);
  db.events.find( data.search, function(err, events) {
    //if( events && events.length > 1 ) throw "duplicate events in db *FIXME* syslog";
    callback(events);
    db.close();
  });
});

// whenever an event was triggered lets remember it (to enable correlation)
ec.on("event_succes", function(data,key){
  var event = {};
  event.userid = userid;
  event.name = data.name;
  event.date = Date();
  console.log("saving :");
  console.log(event);
  db.events.find( data, function(err, events) {
    if( events ) db.events.update({name:event.name}, event );
    else db.events.save(data);
    db.close();
  });
});

ec.process("hello world", function(){
  console.log("klaaaaaaaar"); 
});
