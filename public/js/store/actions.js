
const SELECT_MIDI_INPUT = 'SELECT_MIDI_INPUT';
const SEND_MIDI_MESSAGE = 'SEND_MIDI_MESSAGE';
const SET_PARAMETER = 'SET_PARAMETER';
const UPDATE_MIDI_PORTS = 'UPDATE_MIDI_PORTS';

// actions
export default {

  SEND_MIDI_MESSAGE,
  sendMIDIMessage: data => ({ type: SEND_MIDI_MESSAGE, data, }),

  SELECT_MIDI_INPUT,
  selectMIDIInput: name => ({ type: SELECT_MIDI_INPUT, name, }),

  SET_PARAMETER,
  setParameter: (id, name, value, valueNormal) => ({ type: SET_PARAMETER, id, name, value, valueNormal, }),

  UPDATE_MIDI_PORTS,
  updateMIDIPorts: (portNames, portType) => ({ type: UPDATE_MIDI_PORTS, portNames, portType, }),
};
