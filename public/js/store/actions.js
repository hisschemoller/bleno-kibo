import { NOTE_OFF } from '../midi/midi.js';

const lpd8 = [37, 38, 46, 44, 35, 36, 42, 39];
const kibo = [67, 69, 71, 72, 60, 62, 64, 65];

const RECEIVE_MIDI_NOTE = 'RECEIVE_MIDI_NOTE';
const SELECT_MIDI_INPUT = 'SELECT_MIDI_INPUT';
const SELECT_MIDI_OUTPUT = 'SELECT_MIDI_OUTPUT';
const SET_PARAMETER = 'SET_PARAMETER';
const TOGGLE_BLE = 'TOGGLE_BLE';
const UPDATE_MIDI_PORTS = 'UPDATE_MIDI_PORTS';

// actions
export default {

  RECEIVE_MIDI_NOTE,
  receiveMIDINote: data => {
    return (dispatch, getState, getActions) => {

      // translate my Akai LPD8 to Kodaly Kibo
      // LPD 8
      // pads left to right, top to bottom
      // top row, note pitch 37, 38, 46, 44
      // btm row, note pitch 35, 36, 42, 39
      // Kibo
      // buttons left to right, top to bottom
      // top row, note pitch 67, 69, 71, 72
      // btm row, note pitch 60, 62, 64, 65
      // on a single MIDI channel

      // not needed anymore because the lpd8 is reprogrammed with the correct pitches
      // data[1] = kibo[lpd8.indexOf(data[1])];

      // set Note Off velocity to 0
      if (data[0] === NOTE_OFF) {
        data[2] = 0;
      }

      return{ type: RECEIVE_MIDI_NOTE, data };
    };
  },
  
  SELECT_MIDI_INPUT,
  selectMIDIInput: name => ({ type: SELECT_MIDI_INPUT, name, }),
  
  SELECT_MIDI_OUTPUT,
  selectMIDIOutput: name => ({ type: SELECT_MIDI_OUTPUT, name, }),

  SET_PARAMETER,
  setParameter: (id, name, value, valueNormal) => ({ type: SET_PARAMETER, id, name, value, valueNormal, }),

  TOGGLE_BLE,
  toggleBLE: value => ({ type: TOGGLE_BLE, value, }),

  UPDATE_MIDI_PORTS,
  updateMIDIPorts: (portNames, portType) => ({ type: UPDATE_MIDI_PORTS, portNames, portType, }),
};
