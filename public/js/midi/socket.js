import { dispatch, getActions, STATE_CHANGE, } from '../store/store.js';

let socket;

function handleStateChanges(e) {
  const { state, action, actions, } = e.detail;
  switch (action.type) {

    case actions.RECEIVE_MIDI_NOTE:
      uploadNote(state);
      break;

    case actions.TOGGLE_BLE:
      toggleBLE(state);
      break;
  }
}

function uploadNote(state) {
  socket.emit('midi-message', {
    midiMessage: state.midiMessage,
  });
}

function toggleBLE(state) {
  socket.emit('toggle-ble', {
    toggle: state.isBLEAdvertising,
  });
}

export function setup() {
  document.addEventListener(STATE_CHANGE, handleStateChanges);
  socket = io.connect('http://localhost:3014');
}
