/**
 * Created by andrewkeller on 1/25/17.
 */
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const remote = dgram.createSocket('udp4');

const portscanner = require('portscanner');
const espIPAddr = '192.168.1.179';
const espPortAddr = 2390;
const myPortAddr = 2391;

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(msg);
  // console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);

    // Checks the status of an individual port.
    portscanner.checkPortStatus(2390, '192.168.1.18', function (error, status) {
        // Status should be 'open' since the HTTP server is listening on that port
        console.log('Status at port 2390 is ' + status)
        if (error) console.error(error)
    })
    // portscanner.checkPortStatus(3000, '127.0.0.1', function (error, status) {
    //     // Status should be 'closed' since no service is listening on that port.
    //     console.log('Status at port 3000 is ' + status)
    //     if (error) console.error(error)
    // })
    //
    // // Finds a port that a service is listening on
    // portscanner.findAPortInUse(3000, 3010, '127.0.0.1', function (error, port) {
    //     // Port should be 3005 as the HTTP server is listening on that port
    //     console.log('Found an open port at ' + port)
    //     if (error) console.error(error)
    // })
    // // Finds a port no service is listening on
    // portscanner.findAPortNotInUse(3000, 3010, '127.0.0.1', function (error, port) {
    //     // Will return any number between 3000 and 3010 (inclusive), that's not 3005.
    //     // The order is unknown as the port status checks are asynchronous.
    //     console.log('Found a closed port at ' + port)
    //     if (error) console.error(error)
    // })
  // remote.send('hey', espPortAddr, espIPAddr);
});

server.bind(myPortAddr);