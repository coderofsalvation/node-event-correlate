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
          event: "BAR",
          happened: true,
          when: "1 year ago from now"
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

ec.on("storage_get", function(data){
  console.log("getting events");
  //db.events.find({userid:userid}, function(err, events) {
  //  data.callback(events);
  //});
  //db.close();
});

ec.on("storage_set", function(data){
 // db.events.save( {userid:userid,data:data} );
});

ec.process("hello world", function(){
  console.log("klaaaaaaaar"); 
});
