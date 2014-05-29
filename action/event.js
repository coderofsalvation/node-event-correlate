// *TODO* action will fire an event back to event-correllate (handy for aliasing)
var method = event.prototype;

function event(){
  console.log("created event");
}

module.exports = event;
