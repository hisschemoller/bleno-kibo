
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
  console.log(`>>> Service on -> stateChange! ${state}`);
  isPoweredOn = state === 'poweredOn';

  // // immediately start advertising
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
  console.log('>>> Service on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
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

exports.sendMIDI = function(midiMessage) {
  console.log('>>> Service sendMIDI midiMessage', midiMessage);
  console.log('>>> Service characteristic', !!characteristic);
  if (characteristic) {
    console.log('>>> Service _updateValueCallback', characteristic._updateValueCallback);
  }
  if (!characteristic || !characteristic._updateValueCallback) {
    return;
  }
  const data = Buffer.alloc(5);
  data.writeUInt8(0x80, 0);
  data.writeUInt8(0x80, 1);
  data.writeUInt8(midiMessage[0], 2);
  data.writeUInt8(midiMessage[1], 3);
  data.writeUInt8(midiMessage[2], 4);
  console.log('>>> Service sendMIDI', data);
  characteristic._updateValueCallback(data);
}

exports.toggleAdvertising = isAdvertising => {
  console.log(">>> Service toggleAdvertising isPoweredOn", isPoweredOn);
  if (!isPoweredOn) {
    return;
  }
  if (isAdvertising) {
    console.log(">>> Service request startAdvertising");
    bleno.startAdvertising(name, [midiServiceUUID]);
  } else {
    console.log(">>> Service request stopAdvertising");
    bleno.stopAdvertising();
  }
}
