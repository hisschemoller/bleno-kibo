import { dispatch, getActions, STATE_CHANGE, } from '../store/store.js';

export const NOTE_ON = 144;
export const NOTE_OFF = 128;
export const CONTROL_CHANGE = 176;
export const SYSTEM_REALTIME = 240;
export const REALTIME_CLOCK = 248;
export const REALTIME_START = 250;
export const REALTIME_CONTINUE = 251;
export const REALTIME_STOP = 252;
const NOTE_DURATION = 300;

let midiAccess = null;
let midiInput = null;
let midiOutput = null;

export function accessMidi() { 
  return new Promise((resolve, reject) => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({ sysex: false })
        .then(
          access => {
            console.log('MIDI enabled.');
            midiAccess = access;
            resolve();
          },
          () => {
            reject(`MIDI access failed`);
          }
        );
    } else {
      reject(`No MIDI access in this browser`);
    }
  });
}

export function setup() {
  document.addEventListener(STATE_CHANGE, handleStateChanges);

  const inputs = midiAccess.inputs.values();
  const outputs = midiAccess.outputs.values();
  const inputNames = [];
  const outputNames = [];

  for (let port = inputs.next(); port && !port.done; port = inputs.next()) {
    inputNames.push(port.value.name);
  }

  for (let port = outputs.next(); port && !port.done; port = outputs.next()) {
    outputNames.push(port.value.name);
  }

  dispatch(getActions().updateMIDIPorts(inputNames, 'input'));
  dispatch(getActions().updateMIDIPorts(outputNames, 'output'));

  midiAccess.onstatechange = onAccessStateChange;
}

/**
 * MIDIAccess object statechange handler.
 * If the change is the addition of a new port, create a port module.
 * This handles MIDI devices that are connected after the app initialisation.
 * Disconnected or reconnected ports are handled by the port modules.
 * 
 * If this is
 * @param {Object} e MIDIConnectionEvent object.
 */
function onAccessStateChange(e) {
  console.log('onAccessStateChange: ', e.port.name);
  // dispatch(store.getActions().midiAccessChange(e.port));
}

function handleStateChanges(e) {
  const { state, action, actions, } = e.detail;
  switch (action.type) {

    case actions.SELECT_MIDI_INPUT:
      selectMIDIInput(state);
      break;

    case actions.SELECT_MIDI_OUTPUT:
      selectMIDIOutput(state);
      break;

    case actions.UPDATE_MIDI_PORTS:
      selectMIDIInput(state);
      selectMIDIOutput(state);
      break;
  }
}

/**
 * Handler for all incoming MIDI messages.
 * @param {Object} e MIDIMessageEvent.
 */
function onMIDIMessage(e) {
	// console.log(e.data[0] & 0xf0, e.data[0] & 0x0f, e.target.id, e.data[0], e.data[1], e.data[2]);
	switch (e.data[0] & 0xf0) {
		case SYSTEM_REALTIME:
			// onSystemRealtimeMessage(e);
			break;
		case CONTROL_CHANGE:
			// onControlChangeMessage(e);
			break;
		case NOTE_ON:
		case NOTE_OFF:
			dispatch(getActions().receiveMIDINote(e.data));
			break;
	}
}

function selectMIDIInput(state) {
  console.log('selectMIDIInput');
  midiInput = null;
  const inputs = midiAccess.inputs.values();
  for (let port = inputs.next(); port && !port.done; port = inputs.next()) {
    if (port.value.name === state.midiSelectedInput) {
      midiInput = port.value;
      console.log('selectMIDIInput', port);
      midiInput.onmidimessage = onMIDIMessage;
    }
  }
}

function selectMIDIOutput(state) {
  console.log('selectMIDIOutput');
  midiOutput = null;
  const outputs = midiAccess.outputs.values();
  for (let port = outputs.next(); port && !port.done; port = outputs.next()) {
    if (port.value.name === state.midiSelectedOutput) {
      midiOutput = port.value;
      console.log('selectMIDIOutput', port);
    }
  }
}
