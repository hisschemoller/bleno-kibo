import { dispatch, getActions, getState, STATE_CHANGE, } from '../store/store.js';

let rootEl, inputEl, outputEl, startBtn, stopBtn;
let resetKeyCombo = [];

export function setup() {
  rootEl = document.querySelector('#controls');
  inputEl = rootEl.querySelector('#midi-inputs');
  outputEl = rootEl.querySelector('#midi-outputs');
  startBtn = rootEl.querySelector('#btn-ble-start');
  stopBtn = rootEl.querySelector('#btn-ble-stop');

  addEventListeners();
}

function addEventListeners() {
  document.addEventListener(STATE_CHANGE, handleStateChanges);

  inputEl.addEventListener('change', e => {
    dispatch(getActions().selectMIDIInput(e.target.value));
  });
  outputEl.addEventListener('change', e => {
    dispatch(getActions().selectMIDIOutput(e.target.value));
  });
  startBtn.addEventListener('click', e => {
    dispatch(getActions().toggleBLE(true));
  });
  stopBtn.addEventListener('click', e => {
    dispatch(getActions().toggleBLE(false));
  });

  document.addEventListener('keydown', e => {

    // don't perform shortcuts while typing in a text input.
    if (!(e.target.tagName.toLowerCase() == 'input' && e.target.getAttribute('type') == 'text')) {
      switch (e.keyCode) {
        
        case 87: // w
          console.log(getState());
          break;
      }
    }
  });
}

function handleStateChanges(e) {
  const { state, action, actions, } = e.detail;
  switch (action.type) {
    case actions.SELECT_MIDI_INPUT:
      updateMIDIInputs(state);
      break;

    case actions.SELECT_MIDI_OUTPUT:
      updateMIDIOutputs(state);
      break;

    case actions.UPDATE_MIDI_PORTS:
      updateMIDIInputs(state);
      updateMIDIOutputs(state);
      break;
  }
}

function updateMIDIInputs(state) {
  const { midiInputs, midiSelectedInput } = state;

  inputEl.querySelectorAll('option').forEach((el, index) => {
    if (index > 0) {
      inputEl.removeChild(el);
    }
  });

  midiInputs.forEach(name => {
    const el = document.createElement('option');
    el.value = name;
    el.textContent = name;
    inputEl.appendChild(el);

    if (name === midiSelectedInput) {
      el.setAttribute('selected', 'selected');
    }
  });
}

function updateMIDIOutputs(state) {
  const { midiOutputs, midiSelectedOutput } = state;

  outputEl.querySelectorAll('option').forEach((el, index) => {
    if (index > 0) {
      outputEl.removeChild(el);
    }
  });

  midiOutputs.forEach(name => {
    const el = document.createElement('option');
    el.value = name;
    el.textContent = name;
    outputEl.appendChild(el);

    if (name === midiSelectedOutput) {
      el.setAttribute('selected', 'selected');
    }
  });
}
