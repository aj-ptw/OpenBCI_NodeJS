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
var ip = null;

var OpenBCIBoard = require('../../openBCIBoard').OpenBCIBoard;
var ourBoard = new OpenBCIBoard({
  debug: debug,
  verbose: verbose,
  wifi: wifi
});

// ourBoard.on('droppedPacket', console.log);
ourBoard.on('rawDataPacket', console.log);
var fs = require('fs');
var stream = fs.createWriteStream("noiseTest8Channel.txt");
// stream.once('open', function(fd) {
//   stream.write("My first row\n");
//   stream.write("My second row\n");
//   stream.end();
// });

var sentGroundCommand = false;
var timeOfStart = 0;
var timeDuration = 10000;
ourBoard.on('sample1',(sample) => {
  // console.log(sample.sampleNumber);
  if (!sentGroundCommand) {
    ourBoard.wifiPost(ip, '/command', {'command': '0'});
    sentGroundCommand = true;
    timeOfStart = Date.now();
  }
  /** Work with sample */
  if ((Date.now() - timeOfStart) > timeDuration) {
    console.log('Ten seconds is up');
    process.exit(0);
  } else {
    stream.write(sample.sampleNumber.toFixed(0));
    stream.write(',');
    for (let i = 0; i < ourBoard.numberOfChannels(); i++) {
      stream.write(sample.channelData[i].toFixed(10));
      if (i < ourBoard.numberOfChannels()-1) {
        stream.write(',');
      }
    }
    stream.write('\n');
  }
});

ourBoard.once('wifiShield', (obj) => {
  ip = obj.rinfo.address;
  ourBoard.wifiFindShieldsStop();
  ourBoard.connect(ip)
    .then(() => {
      ourBoard.wifiPost(ip, '/command', {'command': 'b'});
      // ourBoard.wifiPost(ip, '/command', {'command': '>'});
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
    if (ip) ourBoard.wifiPost(ip, '/command', {'command': 's'});
    ourBoard.removeAllListeners('rawDataPacket');
    ourBoard.removeAllListeners('droppedPacket');
    ourBoard.removeAllListeners('sample');
    ourBoard.wifiDestroy();
    stream.end();
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