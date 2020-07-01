
// 'bleno' or 'bleno-mac' if you are using that
const bleno = require('bleno-mac') ;
const CustomCharacteristic = require('./ble-characteristic');
const BlenoPrimaryService = bleno.PrimaryService;
const d = new Date();
const name = `BlenoService_${d.getHours()}h${d.getMinutes()}m${d.getSeconds()}s`;
const midiServiceUUID = '03b80e5a-ede8-4b33-a751-6ce34ec4c700';
let characteristic = null;
let isPoweredOn = false;

bleno.on('stateChange', function(state) {
  console.log(`%c on -> stateChange! ${state}`, 'color: #ffcc33');
  isPoweredOn = state === 'poweredOn';
  // if (state === 'poweredOn') {
  //   console.log("request startAdvertising");
  //   bleno.startAdvertising(name, [midiServiceUUID]);
  // } else {
  //   console.log("request stopAdvertising");
  //   bleno.stopAdvertising();
  // }
});

bleno.on('advertisingStart', function(error) {
  characteristic = new CustomCharacteristic();
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: midiServiceUUID,
        characteristics: [
          characteristic
        ]
      })
    ]);
  }
});

const noteOn = 0x90;
const noteOff = 0x80;
const pitch = 60;
const velocity = 110;
let isOn = true;

exports.sendMIDI = function() {
  console.log('sendMIDI called');
  if (!characteristic._updateValueCallback) {
    return;
  }
  const data = Buffer.alloc(5);
  data.writeUInt8(0x80, 0);
  data.writeUInt8(0x80, 1);
  data.writeUInt8(isOn ? noteOn : noteOff , 2);
  data.writeUInt8(pitch, 3);
  data.writeUInt8(velocity, 4);
  isOn = !isOn;
  console.log('sendMIDI', isOn);
  characteristic._updateValueCallback(data);
}

exports.toggleAdvertising = isAdvertising => {
  if (!isPoweredOn) {
    return;
  }
  if (isAdvertising) {
    console.log("request startAdvertising");
    bleno.startAdvertising(name, [midiServiceUUID]);
  } else {
    console.log("request stopAdvertising");
    bleno.stopAdvertising();
  }
}
