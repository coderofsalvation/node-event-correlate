var EventCorrelate = require("./event-correlate");

// event correlation bus
var ec = new EventCorrelate();
ec.init({
  "events": {
    "FOO":{
      type: "simple",
      promises: [{
        type: "regex",
        data: {
          pattern: "w|world",
        }
      }],
      action: {
        type: "event",
        data: {}
      }
    }
  }
});

ec.process("hello world");
