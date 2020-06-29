console.log('main');
const bleService = require('./ble-service');

const midiServiceUUID = '03B80E5A-EDE8-4B33-A751-6CE34EC4C700';
const midiCharacteristicUUID = '7772E5DB-3868-4112-A1A9-F2669D106BF3';
const connectionInterval = 15; // 15ms or less