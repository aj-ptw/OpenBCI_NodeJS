const ssdp = require('node-ssdp').Client;

let client = new ssdp({
//    unicastHost: '192.168.11.63'
});

client.on('notify', function () {
  console.log('Got a notification.')
});

client.on('response', function inResponse(headers, code, rinfo) {
  console.log('Got a response to an m-search:\n%d\n%s\n%s', code, JSON.stringify(headers, null, '  '), JSON.stringify(rinfo, null, '  '))
  setInterval(() => {
    hitThatShit(rinfo.address);
  }, 100)
});

// Search for just the wifi shield
client.search('urn:schemas-upnp-org:device:Basic:1');

// And after 10 seconds, you want to stop
setTimeout(function () {
  console.log('stoping');
  client.stop()
}, 60000);

var http = require('http');

const hitThatShit = (ip) => {
  //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
  var options = {
    host: ip,
    path: '/data'
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
    });
  };

  http.request(options, callback).end();
};

console.log("Server ready");