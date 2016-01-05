[![Stories in Ready](https://badge.waffle.io/OpenBCI/openbci-js-sdk.png?label=ready&title=Ready)](https://waffle.io/OpenBCI/openbci-js-sdk)
[![Join the chat at https://gitter.im/OpenBCI/openbci-js-sdk](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/OpenBCI/openbci-js-sdk?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/OpenBCI/openbci-js-sdk.svg?branch=master)](https://travis-ci.org/OpenBCI/openbci-js-sdk)

# openbci-sdk

An NPM module for OpenBCI ~ written with love by Push The World

## Working with the Module

Initialization
--------------

Initializing the board:

```js
var OpenBCIBoard = require('openbci-sdk');
var ourBoard = new OpenBCIBoard.OpenBCIBoard();
```

'ready' event
------------

You MUST wait for the 'ready' event to be emitted before streaming/talking with the board. The ready happens asynchronously 
so installing the 'sample' listener and writing before the ready event might result in... nothing at all.

```js
var ourBoard = new require('openbci-sdk').OpenBCIBoard();
ourBoard.connect(portName).then(function(boardSerial) {
    ourBoard.on('ready',function() {
        /** Start streaming, reading registers, what ever your heart desires  */
    });
}).catch(function(err) {
    /** Handle connection errors */
});            
```

Sample properties:
------------------
1. `startByte` (`Number`  should be `0xA0`)
2. `sampleNumber` (a `Number` between 0-255) 
3. `channelData` (channel data indexed starting at 1 [1,2,3,4,5,6,7,8] filled with floating point `Numbers`)
4. `auxData` (aux data indexed starting at 0 [0,1,2] filled with floating point `Numbers`)
5. `stopByte` (`Number` should be `0xC0`)

The power of this module is in using the sample emitter, to be provided with samples to do with as you wish.

To get a 'sample' event, you need to:
-------------------------------------
1. Call `.connect(serialPortName)`
2. Install the 'ready' event emitter on resolved promise
3. In callback for 'ready' emitter, call `streamStart()`
4. Install the 'sample' event emitter
```js
var ourBoard = new require('openbci-sdk').OpenBCIBoard();
ourBoard.connect(portName).then(function(boardSerial) {
    ourBoard.on('ready',function() {
        ourBoard.streamStart();
        ourBoard.on('sample',function(sample) {
            /** Work with sample */
        });
    });
}).catch(function(err) {
    /** Handle connection errors */
});            
```
Close the connection with `.streamStop()` and disconnect with `.disconnect()`
```js
var ourBoard = new require('openbci-sdk').OpenBCIBoard();
ourBoard.streamStop().then(ourBoard.disconnect());
```

To start the simulator test samples:
----------
1. Call `.simulatorStart()`
2. In callback for 'ready' emitter, call `streamStart()`
3. Install the 'sample' event emitter
```js
var ourBoard = new require('openbci-sdk').OpenBCIBoard();
ourBoard.simulatorStart().then(function() {
    ourBoard.on('sample',function(sample) {
        /** Work with sample */
    });
}).catch(function(err) {
    console.log('Error [simulator]: ' + err);
});
```
To stop the simulator:
```js
ourBoard.simulatorStop()
```

Auto-finding boards
-------------------
You must have the OpenBCI board connected to the PC before trying to automatically find it.

If a port is not automatically found, then a list of ports will be returned, this would be a 
good place to present a drop down picker list to the user, so they may manually select the 
serial port name.

```js
var ourBoard = new require('openbci-sdk').OpenBCIBoard();
ourBoard.autoFindOpenBCIBoard(function(portName,ports) {
    if(portName) {
        /** 
        * Connect to the board with portName
        * i.e. ourBoard.connect(portName).....
        */

    } else {
        /** Display list of ports */
        console.log('Port not found... check ports for other ports');
    }
});
```


## Dev Notes
Running
-------
1. Plug usb module into serial port
1. Turn OpenBCI device on
1. Type `npm start` into the terminal in the project directory

Testing
-------
```
npm test
```

Reference Guide
---------------
## Methods

### OpenBCIBoard (portName,options)

Create new instance of an OpenBCI board on `portName`.

**_portName (optional)_**

The system path of the OpenBCI board serial port to open. For example, `/dev/tty` on Mac/Linux or `COM1` on Windows.

**_options (optional)_**

Board optional configurations.

* `baudRate` Baud Rate, defaults to 115200. Manipulating this is allowed if firmware on board has been previously configured.
* `daisy` Daisy chain board is connected to the OpenBCI board. (NOTE: THIS IS IN-OP AT THIS TIME DUE TO NO ACCESS TO ACCESSORY BOARD)

**Note, we have added support for either all lowercase OR camelcase of the options, use whichever style you prefer.**

### .connect (portName)

The essential precursor method to be called initially to establish a serial connection to the OpenBCI board.

**_portName_**

The system path of the OpenBCI board serial port to open. For example, `/dev/tty` on Mac/Linux or `COM1` on Windows.

**_Returns_** a promise, fulfilled by a successful serial connection to the board, containing the serial port object that was opened. The promise will be rejected at any time if the serial port has an 'error' or 'close' event emitted.

### .disconnect()

Closes the serial port opened by `.connect()`

**_Returns_** a promise, fulfilled by a successful close of the serial port object, rejected otherwise.

### .streamStart()

Sends a start streaming command to the board. 

**Note, You must have called and fulfilled `.connect()` AND observed a `'ready'` emitter before calling this method.**

**_Returns_** a promise, fulfilled if the command was sent to the write queue.

### .streamStop()

Sends a stop streaming command to the board. 

**Note, You must have called and fulfilled `.connect()` AND observed a `'ready'` emitter before calling this method.**

**_Returns_** a promise, fulfilled if the command was sent to the write queue.

### .write(data)

Send commands to the board. Due to the OpenBCI board firmware, a 10ms spacing **must** be observed between every command sent to the board. This method handles the timing and spacing between characters by adding characters to a global write queue and pulling from it every 10ms.

**_dataToWrite_** 

Either a single character or an Array of characters

**_Returns_** a promise, fulfilled if the board has been connected and `dataToWrite` has been added to the write queue

**Example**

Sends a single character command to the board.
```js
// ourBoard has fulfilled the promise on .connected() and 'ready' has been observed previously
ourBoard.write('a');
```

Sends an array of bytes
```js
// ourBoard has fulfilled the promise on .connected() and 'ready' has been observed previously
ourBoard.write(['x','0','1','0','0','0','0','0','0','X']);
```

Taking full advantage of the write queue. The following would be sent at t = 0, 10ms, 20ms, 30ms 
```js
ourBoard.write('t');
ourBoard.write('a');
ourBoard.write('c');
ourBoard.write('o');
```

### .softReset()

Sends a soft reset command to the board.

**Note, this method must be sent to the board before you can start streaming. This triggers the initial 'ready' event emitter.**

**_Returns_** a promise, fulfilled if the command was sent to the write queue.

### .getSettingsForChannel(channelNumber)

Gets the specified channelSettings register data from printRegisterSettings call.

**_channelNumber_** 

A number specifying which channel you want to get data on. Only 1-8 at this time.

**Note, at this time this does not work for the daisy board**

**_Returns_** a promise, fulfilled if the command was sent to the board and the `.processBytes()` function is ready to reach for the specified channel.

### .printRegisterSettings()

Prints all register settings for the ADS1299 and the LIS3DH on the OpenBCI board.

**_Returns_** a promise, fulfilled if the command was sent to the write queue.

### .channelOff(channelNumber)

Turn off a specified channel

**_channelNumber_**

A number (1-16) specifying which channel you want to turn off. 

**_Returns_** a promise, fulfilled if the command was sent to the write queue.

### .channelOn(channelNumber)

Turn on a specified channel

**_channelNumber_**

A number (1-16) specifying which channel you want to turn on. 

**_Returns_** a promise, fulfilled if the command was sent to the write queue.

### .channelSet(channelNumber,powerDown,gain,inputType,bias,srb2,srb1)

Send a channel setting command to the board.

**_channelNumber_**  

Determines which channel to set. It's a 'Number' (1-16)

**_powerDown_** 

Powers the channel up or down. It's a 'Bool' where `true` turns the channel off and `false` turns the channel on (default)

**_gain_**
 
Sets the gain for the channel. It's a 'Number' that is either (1,2,4,6,8,12,24(default))
  
**_inputType_** 
  
Selects the ADC channel input source. It's a 'String' that **MUST** be one of the following: "normal", "shorted", "biasMethod" , "mvdd" , "temp" , "testsig", "biasDrp", "biasDrn".

**_bias_** 

Selects if the channel shall include the channel input in bias generation. It's a 'Bool' where `true` includes the channel in bias (default) or `false` it removes it from bias.

**_srb2_**

Select to connect (`true`) this channel's P input to the SRB2 pin. This closes a switch between P input and SRB2 for the given channel, and allows the P input to also remain connected to the ADC. It's a 'Bool' where `true` connects this input to SRB2 (default) or `false` which disconnect this input from SRB2.

**_srb1_**
           
Select to connect (`true`) all channels' N inputs to SRB1. This effects all pins, and disconnects all N inputs from the ADC. It's a 'Bool' where `true` connects all N inputs to SRB1 and `false` disconnects all N inputs from SRB1 (default).

**_Returns_** a promise fulfilled if proper commands sent to the write queue, rejects on bad input or no board.

### .simulatorStart()

To start simulating an OpenBCI board. 

**Note, must be called after the constructor.**

**_Returns_** a promise, if the simulator was able to start.

### .simulatorStop()

To stop simulating an OpenBCI board. 

**Note, must be called after the constructor.**

**_Returns_** a promise, if the simulator was able to stop.

### .sampleRate()

Get the current sample rate.

**Note: This is dependent on if you configured the board correctly on setup options. Specifically as a daisy.**

**_Returns_** a number, the current sample rate.

### .numberOfChannels()

Get the current number of channels available to use. (i.e. 8 or 16).

**Note: This is dependent on if you configured the board correctly on setup options. Specifically as a daisy.**

**_Returns_** a number, the total number of available channels.

### .autoFindOpenBCIBoard(callback)

Automatically find an OpenBCI board. 

**_callback (optional)_** 

Called when an OpenBCI board is found `callback(portName,listOfPorts)` or when the method can't find an OpenBCI board `callback(null,listOfPorts)`. List of ports should be used to offer a list of ports for the user to pick from!

### .printPacketsBad()

Prints the total number of packets that were not able to be read in this session to the console.

### .printPacketsRead()

Prints the total number of packets that were read in this session to the console.

### .printBytesIn()

Prints the total number of bytes that were read in this session to the console.

### .debugSession()

Calls all `.printPacketsBad()`, `.printPacketsRead()`, `.printBytesIn()`

## Events

### .on('ready', callback)

### .on('sample', callback)

### .on('query', callback)

Emitted resulting in a call to `.getChannelSettings()` with the channelSettingsObject