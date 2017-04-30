/**
 * This is an example from the readme.md
 * On windows you should run with PowerShell not git bash.
 * Install
 *   [nodejs](https://nodejs.org/en/)
 *
 * To run:
 *   change directory to this file `cd examples/debug`
 *   do `npm install`
 *   then `npm start`
 */
var debug = false; // Pretty print any bytes in and out... it's amazing...
var verbose = true; // Adds verbosity to functions
var wifi = true;

var OpenBCIBoard = require('../../openBCIBoard').OpenBCIBoard;
var ourBoard = new OpenBCIBoard({
  debug: debug,
  verbose: verbose,
  wifi: wifi
});

ourBoard.on('droppedPacket', console.log);
ourBoard.on('rawDataPacket', console.log);

ourBoard.on('sample',(sample) => {
  // console.log(sample.sampleNumber);
  /** Work with sample */
  // for (let i = 0; i < ourBoard.numberOfChannels(); i++) {
  //   console.log("Channel " + (i + 1) + ": " + sample.channelData[i].toFixed(8) + " Volts.");
  // }
});

ourBoard.once('wifiShield', (obj) => {
  const ip = obj.rinfo.address;
  ourBoard.wifiFindShieldsStop();
  ourBoard.connect(ip)
    .then(() => {
      ourBoard.wifiPost(ip, '/command', {'command': 'b'});
      console.log('connected');
    })
    .catch((err) => {
      console.log(err);
    });
});

ourBoard.wifiFindShieldsStart();

function exitHandler (options, err) {
  if (options.cleanup) {
    if (verbose) console.log('clean');
    /** Do additional clean up here */
    ourBoard.removeAllListeners('rawDataPacket');
    ourBoard.removeAllListeners('droppedPacket');
    ourBoard.removeAllListeners('sample');
    ourBoard.wifiDestroy();
  }
  if (err) console.log(err.stack);
  if (options.exit) {
    if (verbose) console.log('exit');
    // ourBoard.disconnect().catch(console.log);
  }
}

if (process.platform === "win32") {
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("SIGINT", function () {
    process.emit("SIGINT");
  });
}

// do something when app is closing
process.on('exit', exitHandler.bind(null, {
  cleanup: true
}));

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {
  exit: true
}));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {
  exit: true
}));