var sinon = require('sinon');
var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    openBCIBoard = require('../openBCIBoard');


describe('openbci-sdk',function() {
    xdescribe('#testsWithBoard', function() {
        this.timeout(10000);
        describe('#connect', function() {
            var running = false;
            beforeEach(function(done) {
                var ourBoard = new openBCIBoard.OpenBCIBoard();

                ourBoard.autoFindOpenBCIBoard(function(portName,ports) {
                    if(portName) {
                        ourBoard.connect(portName).then(function(boardSerial) {
                            console.log('board connected');
                            ourBoard.on('ready',function() {
                                console.log('Ready to start streaming!');
                                ourBoard.streamStart();
                                ourBoard.on('sample',function(sample) {
                                    //OpenBCISample.debugPrettyPrint(sample);
                                });
                            });
                        }).catch(function(err) {
                            console.log('Error [setup]: ' + err);
                            done();
                        });

                    } else {
                        /** Display list of ports*/
                        console.log('Port not found... check ports for other ports');
                        done();
                    }
                });
                setTimeout(function() {
                    ourBoard.streamStop().then(ourBoard.disconnect()).then(function(msg) {
                        running = true;
                        done();
                    }, function(err) {
                        console.log('Error: ' + err);
                        done();
                    });
                },5000);
            });
            it('should stop the simulator after 5 seconds', function() {
                expect(running).equals(true);
            });
        });
        describe('#confirm channel 1 off with query register settings', function() {
            var channelIsOn = false;
            var didTryToSendPrintCommand = false;
            var didTryToTurnChannel1Off = false;
            beforeEach(function(done) {
                var ourBoard = new openBCIBoard.OpenBCIBoard();

                ourBoard.autoFindOpenBCIBoard(function (portName, ports) {
                    if (portName) {
                        ourBoard.connect(portName).then(function (boardSerial) {
                            //console.log('board connected');
                            ourBoard.on('ready', function () {
                                //console.log('Ready to print register settings!');
                                if (!didTryToSendPrintCommand) {
                                    didTryToSendPrintCommand = true;
                                    ourBoard.getSettingsForChannel(1); //sets isChannelOn to true
                                } else if (!didTryToTurnChannel1Off) {
                                    didTryToTurnChannel1Off = true;
                                    //console.log('Tried to turn channel 1 off');
                                    ourBoard.channelOff(1);
                                    setTimeout(function() {
                                        //console.log('Re print register settings');
                                        ourBoard.getSettingsForChannel(1);
                                    },100);
                                }
                                ourBoard.on('query',function(channelSettingsObject) {
                                    //ourBoard.debugPrintChannelSettings(channelSettingsObject);
                                    channelIsOn = ourBoard.channelIsOnFromChannelSettingsObject(channelSettingsObject);
                                });
                            });
                        }).catch(function (err) {
                            console.log('Error [setup]: ' + err);
                            done();
                        });

                    } else {
                        /** Display list of ports*/
                        console.log('Port not found... check ports for other ports');
                        done();
                    }
                });
                setTimeout(function () {
                    ourBoard.streamStop().then(ourBoard.disconnect).then(function (msg) {
                        done();
                    }, function (err) {
                        console.log('Error: ' + err);
                        done();
                    });
                }, 6000);
            });
            it('should turn channel off', function() {
                expect(channelIsOn).equals(false);
            });
        });
        describe('#confirm channel 2 off with query register settings', function() {
            var channelIsOn = true;
            var didTryToSendPrintCommand = false;
            var didTryToTurnChannel1Off = false;
            beforeEach(function(done) {
                var ourBoard = new openBCIBoard.OpenBCIBoard();

                ourBoard.autoFindOpenBCIBoard(function (portName, ports) {
                    if (portName) {
                        ourBoard.connect(portName).then(function (boardSerial) {
                            //console.log('board connected');
                            ourBoard.on('ready', function () {
                                //console.log('Ready to print register settings!');
                                if (!didTryToSendPrintCommand) {
                                    didTryToSendPrintCommand = true;
                                    ourBoard.getSettingsForChannel(2); //set isChannelOn to true
                                } else if (!didTryToTurnChannel1Off) {
                                    didTryToTurnChannel1Off = true;
                                    //console.log('Tried to turn channel 1 off');
                                    ourBoard.channelOff(2);
                                    setTimeout(function() {
                                        //console.log('Re print register settings');
                                        ourBoard.getSettingsForChannel(2);
                                    },100);
                                }
                                ourBoard.on('query',function(channelSettingsObject) {
                                    //ourBoard.debugPrintChannelSettings(channelSettingsObject);
                                    channelIsOn = ourBoard.channelIsOnFromChannelSettingsObject(channelSettingsObject);
                                });
                            });
                        }).catch(function (err) {
                            console.log('Error [setup]: ' + err);
                            done();
                        });

                    } else {
                        /** Display list of ports*/
                        console.log('Port not found... check ports for other ports');
                        done();
                    }
                });
                setTimeout(function () {
                    ourBoard.streamStop().then(ourBoard.disconnect).then(function (msg) {
                        done();
                    }, function (err) {
                        console.log('Error: ' + err);
                        done();
                    });
                }, 6000);
            });
            it('should turn channel off', function() {
                expect(channelIsOn).equals(false);
            });
        });
    });
    xdescribe('#simulator', function() {
        var running = false;
        beforeEach(function(done) {
            var ourBoard = new openBCIBoard.OpenBCIBoard();

            ourBoard.simulatorStart().then(function() {
                console.log('Simulator started');
                ourBoard.on('sample',function(sample) {
                    //OpenBCISample.debugPrettyPrint(sample);
                });
            }).catch(function(err) {
                console.log('Error [simulator]: ' + err);
            });
            setTimeout(function() {
                ourBoard.simulatorStop().then(function() {
                    running = true;
                    done();
                },function(err) {
                    console.log('Error: ' + err);
                    done();
                });
            },1000);
        });
        it('should stop the simulator after 1 second', function() {
            expect(running).equals(true);
        });
    });
    //xdescribe('write with different calls', function() {
    //    this.timeout(10000);
    //    //var running = false;
    //    var ourBoard = new openBCIBoard.OpenBCIBoard();
    //    //console.log(ourBoard.writeAndDrain.toString());
    //    ourBoard.serial = 'taco';
    //    //var sandbox = sinon.sandbox.create();//(ourBoard.writeAndDrain);
    //    var mock = sinon.mock(ourBoard);
    //    //console.log(JSON.stringify(mock));
    //
    //    ourBoard.write('1');
    //    ourBoard.write('2');
    //    beforeEach(function(done) {
    //        setTimeout(function() {
    //            done();
    //        },40);
    //    });
    //    afterEach(function() {
    //        mock.restore();
    //    });
    //    it('should send command to writeAndDrain three times', function() {
    //        //console.log(JSON.stringify(ourBoard));
    //        expect(ourBoard.calledThrice);
    //        //expect(running).equals(true);
    //    });
    //});
    describe('write with array', function() {
        this.timeout(10000);
        var running = false;
        var ourBoard = new openBCIBoard.OpenBCIBoard();

        ourBoard.serial = 'taco';

        ourBoard.write(['1','2','3']);
        ourBoard.write('4');
        ourBoard.write('5');
        ourBoard.write('6');
        ourBoard.write('7');
        ourBoard.write('8');
        ourBoard.write(['9','10','11']);

        beforeEach(function(done) {
            setTimeout(function() {
                running = true;
                done();
            },8000);
        });
        it('should send command to writeAndDrain three times', function() {
            expect(running).equals(true);
        });
    });

});