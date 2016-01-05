/**
 * Created by ajk on 12/16/15.
 */
var assert = require('assert');
var k = require('../OpenBCIConstants');
var chai = require('chai')
    ,  expect = chai.expect
    ,  should = chai.should();
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('OpenBCIConstants', function() {
    describe('Turning Channels Off', function() {
        it('channel 1', function () {
            assert.equal('1', k.OBCIChannelOff_1);
        });
        it('channel 2', function () {
            assert.equal('2', k.OBCIChannelOff_2);
        });
        it('channel 3', function () {
            assert.equal('3', k.OBCIChannelOff_3);
        });
        it('channel 4', function () {
            assert.equal('4', k.OBCIChannelOff_4);
        });
        it('channel 5', function () {
            assert.equal('5', k.OBCIChannelOff_5);
        });
        it('channel 6', function () {
            assert.equal('6', k.OBCIChannelOff_6);
        });
        it('channel 7', function () {
            assert.equal('7', k.OBCIChannelOff_7);
        });
        it('channel 8', function () {
            assert.equal('8', k.OBCIChannelOff_8);
        });
        it('channel 9', function () {
            assert.equal('q', k.OBCIChannelOff_9);
        });
        it('channel 10', function () {
            assert.equal('w', k.OBCIChannelOff_10);
        });
        it('channel 11', function () {
            assert.equal('e', k.OBCIChannelOff_11);
        });
        it('channel 12', function () {
            assert.equal('r', k.OBCIChannelOff_12);
        });
        it('channel 13', function () {
            assert.equal('t', k.OBCIChannelOff_13);
        });
        it('channel 14', function () {
            assert.equal('y', k.OBCIChannelOff_14);
        });
        it('channel 15', function () {
            assert.equal('u', k.OBCIChannelOff_15);
        });
        it('channel 16', function () {
            assert.equal('i', k.OBCIChannelOff_16);
        });
    });
    describe('Turning Channels On', function() {
        it('channel 1', function () {
            assert.equal('!', k.OBCIChannelOn_1);
        });
        it('channel 2', function () {
            assert.equal('@', k.OBCIChannelOn_2);
        });
        it('channel 3', function () {
            assert.equal('#', k.OBCIChannelOn_3);
        });
        it('channel 4', function () {
            assert.equal('$', k.OBCIChannelOn_4);
        });
        it('channel 5', function () {
            assert.equal('%', k.OBCIChannelOn_5);
        });
        it('channel 6', function () {
            assert.equal('^', k.OBCIChannelOn_6);
        });
        it('channel 7', function () {
            assert.equal('&', k.OBCIChannelOn_7);
        });
        it('channel 8', function () {
            assert.equal('*', k.OBCIChannelOn_8);
        });
        it('channel 9', function () {
            assert.equal('Q', k.OBCIChannelOn_9);
        });
        it('channel 10', function () {
            assert.equal('W', k.OBCIChannelOn_10);
        });
        it('channel 11', function () {
            assert.equal('E', k.OBCIChannelOn_11);
        });
        it('channel 12', function () {
            assert.equal('R', k.OBCIChannelOn_12);
        });
        it('channel 13', function () {
            assert.equal('T', k.OBCIChannelOn_13);
        });
        it('channel 14', function () {
            assert.equal('Y', k.OBCIChannelOn_14);
        });
        it('channel 15', function () {
            assert.equal('U', k.OBCIChannelOn_15);
        });
        it('channel 16', function () {
            assert.equal('I', k.OBCIChannelOn_16);
        });
    });
    describe('Test Signal Control Commands', function() {
        it('Connect to DC', function() {
            assert.equal('p', k.OBCITestSignalConnectToDC);
        });
        it('Connect to Ground', function() {
            assert.equal('0', k.OBCITestSignalConnectToGround);
        });
        it('Connect to Pulse 1x Fast', function() {
            assert.equal('=', k.OBCITestSignalConnectToPulse1xFast);
        });
        it('Connect to Pulse 1x Slow', function() {
            assert.equal('-', k.OBCITestSignalConnectToPulse1xSlow);
        });
        it('Connect to Pulse 2x Fast', function() {
            assert.equal(']', k.OBCITestSignalConnectToPulse2xFast);
        });
        it('Connect to Pulse 2x Slow', function() {
            assert.equal('[', k.OBCITestSignalConnectToPulse2xSlow);
        });
    });
    describe('Channel Setting Commands', function() {
        describe('Channel Selection', function () {
            it('Channel 1', function() {
                assert.equal('1', k.OBCIChannelCmdChannel_1);
            });
            it('Channel 2', function() {
                assert.equal('2', k.OBCIChannelCmdChannel_2);
            });
            it('Channel 3', function() {
                assert.equal('3', k.OBCIChannelCmdChannel_3);
            });
            it('Channel 4', function() {
                assert.equal('4', k.OBCIChannelCmdChannel_4);
            });
            it('Channel 5', function() {
                assert.equal('5', k.OBCIChannelCmdChannel_5);
            });
            it('Channel 6', function() {
                assert.equal('6', k.OBCIChannelCmdChannel_6);
            });
            it('Channel 7', function() {
                assert.equal('7', k.OBCIChannelCmdChannel_7);
            });
            it('Channel 8', function() {
                assert.equal('8', k.OBCIChannelCmdChannel_8);
            });
            it('Channel 9', function() {
                assert.equal('Q', k.OBCIChannelCmdChannel_9);
            });
            it('Channel 10', function() {
                assert.equal('W', k.OBCIChannelCmdChannel_10);
            });
            it('Channel 11', function() {
                assert.equal('E', k.OBCIChannelCmdChannel_11);
            });
            it('Channel 12', function() {
                assert.equal('R', k.OBCIChannelCmdChannel_12);
            });
            it('Channel 13', function() {
                assert.equal('T', k.OBCIChannelCmdChannel_13);
            });
            it('Channel 14', function() {
                assert.equal('Y', k.OBCIChannelCmdChannel_14);
            });
            it('Channel 15', function() {
                assert.equal('U', k.OBCIChannelCmdChannel_15);
            });
            it('Channel 16', function() {
                assert.equal('I', k.OBCIChannelCmdChannel_16);
            });
        });
        describe('Power Down', function() {
            it('OFF', function() {
                assert.equal('1', k.OBCIChannelCmdPowerOff);
            });
            it('ON', function() {
                assert.equal('0', k.OBCIChannelCmdPowerOn);
            });
        });
        describe('Gain Setting', function () {
            it('1', function () {
                assert.equal('0', k.OBCIChannelCmdGain_1);
            });
            it('2', function () {
                assert.equal('1', k.OBCIChannelCmdGain_2);
            });
            it('4', function () {
                assert.equal('2', k.OBCIChannelCmdGain_4);
            });
            it('6', function () {
                assert.equal('3', k.OBCIChannelCmdGain_6);
            });
            it('8', function () {
                assert.equal('4', k.OBCIChannelCmdGain_8);
            });
            it('12', function () {
                assert.equal('5', k.OBCIChannelCmdGain_12);
            });
            it('24', function () {
                assert.equal('6', k.OBCIChannelCmdGain_24);
            });
        });
        describe('ADC Channel Input Soruce', function () {
            it('Normal', function() {
                assert.equal('0', k.OBCIChannelCmdADCNormal);
            });
            it('Shorted', function() {
                assert.equal('1', k.OBCIChannelCmdADCShorted);
            });
            it('Bias Method', function() {
                assert.equal('2', k.OBCIChannelCmdADCBiasMethod);
            });
            it('MVDD', function() {
                assert.equal('3', k.OBCIChannelCmdADCMVDD);
            });
            it('Temp', function() {
                assert.equal('4', k.OBCIChannelCmdADCTemp);
            });
            it('Test Signal', function() {
                assert.equal('5', k.OBCIChannelCmdADCTestSig);
            });
            it('Bias DRP', function() {
                assert.equal('6', k.OBCIChannelCmdADCBiasDRP);
            });
            it('Bias DRN', function() {
                assert.equal('7', k.OBCIChannelCmdADCBiasDRN);
            });
        });
        describe('Bias Set', function() {
            it('Include in BIAS', function() {
                assert.equal('1', k.OBCIChannelCmdBiasInclude);
            });
            it('Remove from BIAS', function() {
                assert.equal('0', k.OBCIChannelCmdBiasRemove);
            });
        });
        describe('SRB2 Set', function() {
            it('Disconnect this input from SRB2', function() {
                assert.equal('0', k.OBCIChannelCmdSRB2Diconnect);
            });
            it('Connect this input to the SRB2', function() {
                assert.equal('1', k.OBCIChannelCmdSRB2Connect);
            });
        });
        describe('SRB1 Set', function() {
            it('Disconnect this input from SRB1', function() {
                assert.equal('0', k.OBCIChannelCmdSRB1Diconnect);
            });
            it('Connect this input to the SRB1', function() {
                assert.equal('1', k.OBCIChannelCmdSRB1Connect);
            });
        });
        it('Command to access channel settings',function() {
            assert.equal('x', k.OBCIChannelCmdSet);
        });
        it('Command to latch',function() {
            assert.equal('X', k.OBCIChannelCmdLatch);
        });
    });
    describe('Default Channel Settings',function() {
        it('Set all channels to default',function() {
            assert.equal('d', k.OBCIChannelDefaultAllSet);
        });
        it('Get a report of the default settings card',function() {
            assert.equal('D', k.OBCIChannelDefaultAllGet);
        });
    });
    describe('LeadOff Impedance Commands',function() {
        it('Command to access impedance settings',function() {
            assert.equal('z', k.OBCIChannelImpedanceSet);
        });
        it('Command to latch',function() {
            assert.equal('Z', k.OBCIChannelImpedanceLatch);
        });
        it('Test signal not applied',function() {
            assert.equal('0', k.OBCIChannelImpedanceTestSignalAppliedNot);
        });
        it('Test signal applied',function() {
            assert.equal('1', k.OBCIChannelImpedanceTestSignalApplied);
        });
    });
    describe('SD card Commands',function() {
        it('logs for 1 hour', function() {
            assert.equal('G', k.OBCISDLogForHour1);
        });
        it('logs for 2 hours', function() {
            assert.equal('H', k.OBCISDLogForHour2);
        });
        it('logs for 4 hours', function() {
            assert.equal('J', k.OBCISDLogForHour4);
        });
        it('logs for 12 hours', function() {
            assert.equal('K', k.OBCISDLogForHour12);
        });
        it('logs for 24 hours', function() {
            assert.equal('L', k.OBCISDLogForHour24);
        });
        it('logs for 5 minutes', function() {
            assert.equal('A', k.OBCISDLogForMin5);
        });
        it('logs for 15 minutes', function() {
            assert.equal('S', k.OBCISDLogForMin15);
        });
        it('logs for 30 minutes', function() {
            assert.equal('F', k.OBCISDLogForMin30);
        });
        it('logs for 14 seconds', function() {
            assert.equal('a', k.OBCISDLogForSec14);
        });
        it('stop logging and close the SD file', function() {
            assert.equal('j', k.OBCISDLogStop);
        });
    });
    describe('Stream Data Commands',function() {
        it('starts',function () {
            assert.equal('b', k.OBCIStreamStart);
        });
        it('stops',function () {
            assert.equal('s', k.OBCIStreamStop);
        });
    });
    describe('Miscellaneous',function() {
        it('queries register settings',function () {
            assert.equal('?', k.OBCIMiscQueryRegisterSettings);
        });
        it('softly resets the board',function () {
            assert.equal('v', k.OBCIMiscSoftReset);
        });
    });
    describe('Max channel number commands',function() {
        it('sets max of 8',function () {
            assert.equal('c', k.OBCIChannelMaxNumber8);
        });
        it('sets max of 16',function () {
            assert.equal('C', k.OBCIChannelMaxNumber16);
        });
    });
    describe('On board filters',function() {
        it('disable',function () {
            assert.equal('g', k.OBCIFilterDisable);
        });
        it('enable',function () {
            assert.equal('f', k.OBCIFilterEnable);
        });
    });
    describe('should return the right command for each channel', function(){
        it('Channel 1', function() {
            var expectation = '1';
            var result = k.commandChannelForCmd(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 2', function() {
            var expectation = '2';
            var result = k.commandChannelForCmd(2);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 3', function() {
            var expectation = '3';
            var result = k.commandChannelForCmd(3);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 4', function() {
            var expectation = '4';
            var result = k.commandChannelForCmd(4);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 5', function() {
            var expectation = '5';
            var result = k.commandChannelForCmd(5);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 6', function() {
            var expectation = '6';
            var result = k.commandChannelForCmd(6);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 7', function() {
            var expectation = '7';
            var result = k.commandChannelForCmd(7);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 8', function() {
            var expectation = '8';
            var result = k.commandChannelForCmd(8);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 9', function() {
            var expectation = 'Q';
            var result = k.commandChannelForCmd(9);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 10', function() {
            var expectation = 'W';
            var result = k.commandChannelForCmd(10);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 11', function() {
            var expectation = 'E';
            var result = k.commandChannelForCmd(11);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 12', function() {
            var expectation = 'R';
            var result = k.commandChannelForCmd(12);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 13', function() {
            var expectation = 'T';
            var result = k.commandChannelForCmd(13);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 14', function() {
            var expectation = 'Y';
            var result = k.commandChannelForCmd(14);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 15', function() {
            var expectation = 'U';
            var result = k.commandChannelForCmd(15);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 16', function() {
            var expectation = 'I';
            var result = k.commandChannelForCmd(16);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Invalid channel request', function() {
            var result = k.commandChannelForCmd(17);
            return expect(result).to.be.rejected;
        });
    });
    describe('should return correct channel off command for number', function(){
        it('Channel 1', function() {
            var expectation = '1';
            var result = k.commandChannelOff(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 2', function() {
            var expectation = '2';
            var result = k.commandChannelOff(2);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 3', function() {
            var expectation = '3';
            var result = k.commandChannelOff(3);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 4', function() {
            var expectation = '4';
            var result = k.commandChannelOff(4);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 5', function() {
            var expectation = '5';
            var result = k.commandChannelOff(5);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 6', function() {
            var expectation = '6';
            var result = k.commandChannelOff(6);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 7', function() {
            var expectation = '7';
            var result = k.commandChannelOff(7);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 8', function() {
            var expectation = '8';
            var result = k.commandChannelOff(8);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 9', function() {
            var expectation = 'q';
            var result = k.commandChannelOff(9);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 10', function() {
            var expectation = 'w';
            var result = k.commandChannelOff(10);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 11', function() {
            var expectation = 'e';
            var result = k.commandChannelOff(11);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 12', function() {
            var expectation = 'r';
            var result = k.commandChannelOff(12);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 13', function() {
            var expectation = 't';
            var result = k.commandChannelOff(13);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 14', function() {
            var expectation = 'y';
            var result = k.commandChannelOff(14);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 15', function() {
            var expectation = 'u';
            var result = k.commandChannelOff(15);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 16', function() {
            var expectation = 'i';
            var result = k.commandChannelOff(16);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Invalid channel request', function() {
            var result = k.commandChannelOff(17);
            return expect(result).to.be.rejected;
        });
    });
    describe('should return correct channel on command for number', function(){
        it('Channel 1', function() {
            var expectation = '!';
            var result = k.commandChannelOn(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 2', function() {
            var expectation = '!';
            var result = k.commandChannelOn(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 3', function() {
            var expectation = '!';
            var result = k.commandChannelOn(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 4', function() {
            var expectation = '!';
            var result = k.commandChannelOn(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 5', function() {
            var expectation = '!';
            var result = k.commandChannelOn(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 6', function() {
            var expectation = '!';
            var result = k.commandChannelOn(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 7', function() {
            var expectation = '!';
            var result = k.commandChannelOn(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 8', function() {
            var expectation = '!';
            var result = k.commandChannelOn(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 9', function() {
            var expectation = '!';
            var result = k.commandChannelOn(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 10', function() {
            var expectation = '!';
            var result = k.commandChannelOn(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 11', function() {
            var expectation = '!';
            var result = k.commandChannelOn(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 12', function() {
            var expectation = '!';
            var result = k.commandChannelOn(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 13', function() {
            var expectation = '!';
            var result = k.commandChannelOn(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 14', function() {
            var expectation = '!';
            var result = k.commandChannelOn(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 15', function() {
            var expectation = '!';
            var result = k.commandChannelOn(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Channel 16', function() {
            var expectation = '!';
            var result = k.commandChannelOn(1);
            return expect(result).to.eventually.equal(expectation);
        });
        it('Invalid channel request', function() {
            var result = k.commandChannelOn(17);
            return expect(result).to.be.rejected;
        });
    });
    describe('Number of channels',function() {
        it('Daisy',function () {
            assert.equal(16, k.OBCINumberOfChannelsDaisy);
        });
        it('Default',function () {
            assert.equal(8, k.OBCINumberOfChannelsDefault);
        });
        it('Ganglion',function () {
            assert.equal(4, k.OBCINumberOfChannelsGanglion);
        });
    });
    describe('Possible Sample Rates',function() {
        it('should be 125',function () {
            assert.equal(125, k.OBCISampleRate125);
        });
        it('should be 250',function () {
            assert.equal(250, k.OBCISampleRate250);
        });
    });
    describe('#getChannelSetter', function() {
        //'channel 1, power on, gain 24, inputType normal, bias include, srb2 connect, srb1 dissconnect'
        describe('channel input selection works', function() {
            //this.timeout(5000);
            it('channel 2', function() {
                k.getChannelSetter(2,false,24,'normal',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[1].should.equal('2');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('channel 5', function() {
                k.getChannelSetter(5,false,24,'normal',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[1].should.equal('5');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('channel 9', function() {
                k.getChannelSetter(9,false,24,'normal',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[1].should.equal('Q');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('channel 15', function() {
                k.getChannelSetter(15,false,24,'normal',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[1].should.equal('U');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('Invalid channel selection', function() {
                k.getChannelSetter(0,false,24,'normal',true,true,false).then(function(arrayOfCommands) {
                    done('Should have rejected promise');
                }, function(err) {
                    done(err);
                });
            });
            it('Invalid type', function() {
                k.getChannelSetter('0',false,24,'normal',true,true,false).then(function(arrayOfCommands) {
                    done('Should have rejected promise');
                }, function(err) {
                    done(err);
                });
            });
        });
        describe('power selection works', function() {
            it('on', function() {
                k.getChannelSetter(1,false,24,'normal',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[2].should.equal('0');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('off', function() {
                k.getChannelSetter(1,true,24,'normal',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[2].should.equal('1');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('Invalid type', function() {
                k.getChannelSetter(1,'taco',24,'normal',true,true,false).then(function(arrayOfCommands) {
                    done('Should have rejected promise');
                }, function(err) {
                    done(err);
                });
            });
        });
        describe('gain selection works', function() {
            it('1x', function() {
                k.getChannelSetter(1,false,1,'normal',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[3].should.equal('0');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('2x', function() {
                k.getChannelSetter(1,false,2,'normal',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[3].should.equal('1');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('4x', function() {
                k.getChannelSetter(1,false,4,'normal',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[3].should.equal('3');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('6x', function() {
                k.getChannelSetter(1,false,6,'normal',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[3].should.equal('4');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('8x', function() {
                k.getChannelSetter(1,false,8,'normal',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[3].should.equal('5');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('12x', function() {
                k.getChannelSetter(1,false,12,'normal',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[3].should.equal('6');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('24x', function() {
                k.getChannelSetter(1,false,24,'normal',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[3].should.equal('7');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('Invalid type', function() {
                k.getChannelSetter(1,false,'24','normal',true,true,false).then(function(arrayOfCommands) {
                    done('Should have rejected promise');
                }, function(err) {
                    done(err);
                });
            });
            it('Invalid gain setting', function() {
                k.getChannelSetter(1,false,5,'normal',true,true,false).then(function(arrayOfCommands) {
                    done('Should have rejected promise');
                }, function(err) {
                    done(err);
                });
            });
        });
        describe('input type', function() {
            it('normal', function() {
                k.getChannelSetter(1,false,24,'normal',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[4].should.equal('0');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('shorted', function() {
                k.getChannelSetter(1,false,24,'shorted',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[4].should.equal('1');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('biasMethod', function() {
                k.getChannelSetter(1,false,24,'biasMethod',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[4].should.equal('2');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('mvdd', function() {
                k.getChannelSetter(1,false,24,'mvdd',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[4].should.equal('3');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('temp', function() {
                k.getChannelSetter(1,false,24,'temp',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[4].should.equal('4');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('testsig', function() {
                k.getChannelSetter(1,false,24,'testsig',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[4].should.equal('5');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('biasDrp', function() {
                k.getChannelSetter(1,false,24,'biasDrp',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[4].should.equal('6');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('biasDrn', function() {
                k.getChannelSetter(1,false,24,'biasDrn',true,true,false).then(function(arrayOfCommands) {
                    arrayOfCommands[4].should.equal('7');
                    done();
                }, function(err) {
                    done(err);
                });
            });
            it('Invalid setting', function() {
                k.getChannelSetter(1,false,24,'taco',true,true,false).then(function(arrayOfCommands) {
                    done('Should have rejected promise');
                }, function(err) {
                    done(err);
                });
            });
            it('Invalid type', function() {
                k.getChannelSetter(1,false,24,1,true,true,false).then(function(arrayOfCommands) {
                    done('Should have rejected promise');
                }, function(err) {
                    done(err);
                });
            });
        });
    });
});