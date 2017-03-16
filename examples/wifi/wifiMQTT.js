// var mqtt = require('mqtt')
// var client  = mqtt.connect('mqtt://broker.hivemq.com');
//
// client.on('connect', function () {
//   client.subscribe('openbci/node');
//   client.publish('openbci/wifi', 'Hello ESP8266')
// })
//
// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(message.toString());
//   client.end();
// })
//
// var client = mqtt.createClient();
//
// client.subscribe("mqtt/demo");
//
// client.on("message", function(topic, payload) {
//   alert([topic, payload].join(": "));
//   client.end();
// });
//
// client.publish("mqtt/demo", "hello world!");

var ascoltatori = require('ascoltatori');
var settings = {
  type: 'zmq',
  json: false,
  zmq: require("zmq"),
  port: "tcp://127.0.0.1:33333",
  controlPort: "tcp://127.0.0.1:33334",
  delay: 10
};

ascoltatori.build(settings, function (ascoltatore) {
  // subscribes to a topic
  ascoltatore.subscribe('openbci/node', function() {
    console.log(arguments);
    // { '0': 'hello', '1': 'a message' }
  });

  // publishes a message to the topic 'hello'
  ascoltatore.publish('openbci/wifi', 'a message', function() {
    console.log('message published');
  });
  // ...
});