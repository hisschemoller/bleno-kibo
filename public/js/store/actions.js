
const RECEIVE_MIDI_NOTE = 'RECEIVE_MIDI_NOTE';
const SELECT_MIDI_INPUT = 'SELECT_MIDI_INPUT';
const SET_PARAMETER = 'SET_PARAMETER';
const TOGGLE_BLE = 'TOGGLE_BLE';
const UPDATE_MIDI_PORTS = 'UPDATE_MIDI_PORTS';

// actions
export default {

  RECEIVE_MIDI_NOTE,
  receiveMIDINote: data => ({ type: RECEIVE_MIDI_NOTE, data }),

  SELECT_MIDI_INPUT,
  selectMIDIInput: name => ({ type: SELECT_MIDI_INPUT, name, }),

  SET_PARAMETER,
  setParameter: (id, name, value, valueNormal) => ({ type: SET_PARAMETER, id, name, value, valueNormal, }),

  TOGGLE_BLE,
  toggleBLE: value => ({ type: TOGGLE_BLE, value, }),

  UPDATE_MIDI_PORTS,
  updateMIDIPorts: (portNames, portType) => ({ type: UPDATE_MIDI_PORTS, portNames, portType, }),
};
