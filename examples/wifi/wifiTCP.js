const net = require('net');
const client = net.connect({
    host: '192.168.1.18',
    port: 23
}, () => {
    // 'connect' listener
    console.log('connected to server!');
    client.write('world!\r\n');
});
client.on('data', (data) => {
    console.log(data.toString());
    //client.end();
});
client.on('end', () => {
    console.log('disconnected from server');
});
var counter=0;
setInterval(function(){
    client.write(counter.toString()+"\r\n")
    counter++
},10)