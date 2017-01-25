/**
 * Created by andrewkeller on 1/25/17.
 */
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const remote = dgram.createSocket('udp4');

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
  remote.send('hey', espPortAddr, espIPAddr);
});

server.bind(myPortAddr);