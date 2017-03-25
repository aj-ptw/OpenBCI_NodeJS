// // import the module
var mdns = require('mdns');

var browser = mdns.createBrowser(mdns.tcp('http'));

browser.on('serviceUp', function(service) {
  console.log("service up: ", service);
});
browser.on('serviceDown', function(service) {
  console.log("service down: ", service);
});

browser.start();
//
// require('libnmap').nmap('discover', function(err, report){
//   if (err) throw err
//   console.log(report)
// })

// var bonjour = require('bonjour')()
// // browse for all http services
// bonjour.find({}, function (service) {
//   console.log('Found an HTTP server:', service)
// })