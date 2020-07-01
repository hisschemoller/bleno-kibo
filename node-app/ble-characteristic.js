const util = require('util');
const bleno = require('bleno-mac');
const BlenoCharacteristic = bleno.Characteristic;
const midiCharacteristicUUID = '7772E5DB-3868-4112-A1A9-F2669D106BF3';
const notifyInterval = 5; // seconds
let isSubscribed = false;

const CustomCharacteristic = function() {
  CustomCharacteristic.super_.call(this, {
      uuid: midiCharacteristicUUID,
      properties: ['read', 'write', 'notify'],
  });
  this._value = Buffer.alloc(0);
  this._updateValueCallback = null;
};

util.inherits(CustomCharacteristic, BlenoCharacteristic);
module.exports = CustomCharacteristic;

CustomCharacteristic.prototype.onReadRequest = function (offset, callback) {
  console.log('CustomCharacteristic onReadRequest');
  var data = Buffer.alloc(1);
  data.writeUInt8(42, 0);
  callback(this.RESULT_SUCCESS, data);
};

CustomCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  this._value = data;
  console.log('CustomCharacteristic - onWriteRequest: value = ' + this._value.toString('hex'));
  callback(this.RESULT_SUCCESS);
};

CustomCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('CustomCharacteristic - onSubscribe');
  isSubscribed = true;
  // delayedNotification(updateValueCallback);
  this._updateValueCallback = updateValueCallback;
};

CustomCharacteristic.prototype.onUnsubscribe = function() {
  console.log('CustomCharacteristic - onUnsubscribe');
  isSubscribed = false;
  this._updateValueCallback = null;
};

const noteOn = 0x90;
const noteOff = 0x80;
const pitch = 60;
const velocity = 110;
let isOn = true;

function delayedNotification(callback) {
  setTimeout(function() { 
    if (isSubscribed) {
      // var data = Buffer.alloc(3);
      // var now = new Date();
      // data.writeUInt8(now.getHours(), 0);
      // data.writeUInt8(now.getMinutes(), 1);
      // data.writeUInt8(now.getSeconds(), 2);
      // byte midiData[] = {0x80, 0x80, 0x00, 0x00, 0x00};
      var data = Buffer.alloc(5);
      data.writeUInt8(0x80, 0);
      data.writeUInt8(0x80, 1);
      data.writeUInt8(isOn ? noteOn : noteOff , 2);
      data.writeUInt8(pitch, 3);
      data.writeUInt8(velocity, 4);
      isOn = !isOn;
      console.log('callback', data);
      callback(data);
      delayedNotification(callback);
    }
  }, notifyInterval * 1000);
}
