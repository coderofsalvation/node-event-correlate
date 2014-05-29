// *TODO* action will fire an webhook back to event-correllate (handy for aliasing)
var method = webhook.prototype;

function webhook(){
  this.name = "webhook";
}

method.process = function(){
  console.log("doing request");
}

module.exports = webhook;
