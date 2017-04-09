const ssdp = require('node-ssdp').Client;
var http = require('http');


let client = new ssdp({
//    unicastHost: '192.168.11.63'
});

client.on('notify', function () {
  console.log('Got a notification.')
});

let hitter = null;
client.on('response', function inResponse(headers, code, rinfo) {
  console.log('Got a response to an m-search:\n%d\n%s\n%s', code, JSON.stringify(headers, null, '  '), JSON.stringify(rinfo, null, '  '));
  hitThatShit(rinfo.address, '/websocket');
  // hitter = setInterval(() => {
  //   hitThatShit(rinfo.address);
  // }, 200);
});

// Search for just the wifi shield
client.search('urn:schemas-upnp-org:device:Basic:1');


var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(socket){
  socket.on('event', function(data){});
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('data', function(msg) {
    console.log('message: ' + msg);
  });
});
server.listen(3000);

// And after 10 seconds, you want to stop
setTimeout(function () {
  if (hitter) clearInterval(hitter);
  console.log('stoping');
  client.stop()
}, 5 * 60 * 1000);

const hitThatShit = (host, path) => {
  //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
  var options = {
    host: host,
    path: path
  };

  const callback = (response) => {
    let str = '';
    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });
    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      console.log(str);

      // if (str !== "") {
      //   try {
      //     const packetObj = JSON.parse(str);
      //     const numSamples = packetObj.data.length;
      //
      //     console.log(numSamples);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // } else {
      //   console.log(str);
      // }
    });
    response.on('error', function(err) {
      console.log(err);
    });
  };

  try {
    http. request(options, callback).end();
  } catch (err) {
    console.log(err);
  }
};

console.log("Server ready");