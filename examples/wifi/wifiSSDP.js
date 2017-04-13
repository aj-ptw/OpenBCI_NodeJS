const ssdp = require('node-ssdp').Client;
const http = require('http');
const net = require('net');
const _ = require('lodash');


////////////////
// TCP Server //
////////////////
function debugBytes(prefix, data) {
  if (_.isUndefined(data)) return;
  if (typeof data === 'string') data = new Buffer(data);

  console.log('Debug bytes:');

  for (var j = 0; j < data.length;) {
    var hexPart = '';
    var ascPart = '';
    for (var end = Math.min(data.length, j + 16); j < end; ++j) {
      var byt = data[j];

      var hex = ('0' + byt.toString(16)).slice(-2);
      hexPart += (((j & 0xf) === 0x8) ? '  ' : ' '); // puts an extra space 8 bytes in
      hexPart += hex;

      var asc = (byt >= 0x20 && byt < 0x7f) ? String.fromCharCode(byt) : '.';
      ascPart += asc;
    }

    // pad to fixed width for alignment
    hexPart = (hexPart + '                                                   ').substring(0, 3 * 17);

    console.log(prefix + ' ' + hexPart + '|' + ascPart + '|');
  }
}
let firstPacket = true;
const server = net.createServer(function(socket) {
  let lastSampleNumber = 0;
  let lastZerothPacket = Date.now();
  let diffs = [];
  let lastAvgPrint = Date.now();
  socket.on('data', function(data){
    let index = 0;
    while (index < data.byteLength) {
      const currentSampleNumber = data[index + 1];
      if (currentSampleNumber === 0) {
        // console.log(`time dif ${Date.now() - lastZerothPacket}`);
        if ((Date.now() - lastZerothPacket) < 5) {

        }
        diffs.push(Date.now() - lastZerothPacket);
        lastZerothPacket = Date.now();
      }
      // console.log((Date.now() - lastAvgPrint));
      if ((Date.now() - lastAvgPrint) > 10000) {
        let sum = 0;
        for (let i = 0; i < diffs.length; i++) {
          sum += diffs[i];
        }
        console.log(`avg time: ${sum / diffs.length}`);
        diffs = [];
        lastAvgPrint = Date.now();
      }
      console.log(data[index + 1], Date.now());
      index += 32;
      let diff = data[index + 1] - lastSampleNumber;
      if (diff < 0) {
        diff = 255 + diff;
      }
      if (diff > 1 && !firstPacket) {
        console.log(`dropped ${diff} packet${(diff > 1) ? "s": ""}... current is ${data[1]}`);
      }
      lastSampleNumber = data[index + 1];
      if (firstPacket) firstPacket = false;
    }


    // const textChunk = data.toString('utf8');

    // debugBytes('in ->', data);
    // try {
    //   const obj = JSON.parse(textChunk);
    //   const numSamples = obj.data.length;
    //   for (let i = 0; i < numSamples; i++) {
    //     const sample = obj.data[i];
    //     console.log(sample[1]);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
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
  http.get({
    host: rinfo.address,
    port: 80,
    path: '/test/start'
  }, processRes);
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

const processRes = (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
};

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

  const req = http.request(options, processRes);

  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });

// write data to request body
  req.write(output);
  req.end();
};

console.log("Server ready");