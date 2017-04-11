const ssdp = require('node-ssdp').Client;
var http = require('http');
var net = require('net');


////////////////
// TCP Server //
////////////////
var server = net.createServer(function(socket) {
  socket.on('data', function(data){
    // console.log(data);
    var textChunk = data.toString('utf8');
    console.log(textChunk);
  });
  socket.on('error', function (err) {
    console.log(err);
  })
}).listen();
console.log("Server listening on port 5000");

//////////
// SSDP //
//////////
let client = new ssdp({
//    unicastHost: '192.168.11.63'
});

client.on('notify', function () {
  console.log('Got a notification.')
});

let hitter = null;
client.on('response', function inResponse(headers, code, rinfo) {
  console.log('Got a response to an m-search:\n%d\n%s\n%s', code, JSON.stringify(headers, null, '  '), JSON.stringify(rinfo, null, '  '));
  // hitThatShit(rinfo.address, '/websocket');
  post(rinfo.address, '/websocket', {"port": server.address().port});
  // hitter = setInterval(() => {
  //   hitThatShit(rinfo.address);
  // }, 200);
});

// Search for just the wifi shield
client.search('urn:schemas-upnp-org:device:Basic:1');



// And after 10 seconds, you want to stop
setTimeout(function () {
  if (hitter) clearInterval(hitter);
  console.log('stoping');
  client.stop()
}, 5 * 60 * 1000);

const post = (host, path, payload) => {
  //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
  const output = JSON.stringify(payload);
  const options = {
    host: host,
    port: 80,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': output.length
    }
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });

// write data to request body
  req.write(output);
  req.end();
};

console.log("Server ready");