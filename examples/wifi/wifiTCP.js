const net = require('net');
const client = net.connect({
    host: '192.168.1.17',
    port: 80
}, () => {
    // 'connect' listener
    console.log('connected to server!');
    client.write('world!\r\n');
});
let bigCount = 0;
client.on('data', (data) => {
    // console.log(data);
    let numSamples = data.length / 32;
    let count = 0;

    let bigString = `TCP:ID ${bigCount}: `;
    bigCount++;
    while (count < numSamples) {
        let sample = data.slice(count * 32, (count + 1) * 32);
        bigString += `${sample[1]} `;
        count++;
    }
    console.log(bigString);
    //client.end();
});
client.on('end', () => {
    console.log('disconnected from server');
});
// var counter=0;
// setInterval(function(){
//     client.write(counter.toString()+"\r\n")
//     counter++
// },100)