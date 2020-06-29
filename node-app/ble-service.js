
// 'bleno' or 'bleno-mac' if you are using that
const bleno = require('bleno-mac') ;
const CustomCharacteristic = require('./ble-characteristic');
const BlenoPrimaryService = bleno.PrimaryService;
const d = new Date();
const name = `BlenoService_${d.getHours()}h${d.getMinutes()}m${d.getSeconds()}s`;
const midiServiceUUID = '03b80e5a-ede8-4b33-a751-6ce34ec4c700';

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);
  if (state === 'poweredOn') {
    console.log("request startAdvertising");
    bleno.startAdvertising(name, [midiServiceUUID]);
  } else {
    console.log("request stopAdvertising");
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: midiServiceUUID,
        characteristics: [
          new CustomCharacteristic()
        ]
      })
    ]);
  }
});
