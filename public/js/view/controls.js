import { dispatch, getActions, getState, STATE_CHANGE, } from '../store/store.js';

let rootEl, inputEl;
let resetKeyCombo = [];

export function setup() {
  rootEl = document.querySelector('#controls');
  inputEl = rootEl.querySelector('#midi-inputs');

  addEventListeners();
}

function addEventListeners() {
  document.addEventListener(STATE_CHANGE, handleStateChanges);

  document.addEventListener('keydown', e => {

    // don't perform shortcuts while typing in a text input.
    if (!(e.target.tagName.toLowerCase() == 'input' && e.target.getAttribute('type') == 'text')) {
      switch (e.keyCode) {
        case 82: // r
        case 83: // s
        case 84: // t
          // clear all data on key combination 'rst' (reset)
          resetKeyCombo.push(e.keyCode);
          if (resetKeyCombo.indexOf(82) > -1 && resetKeyCombo.indexOf(83) > -1 && resetKeyCombo.indexOf(84) > -1) {
            localStorage.clear();
            dispatch(getActions().setProject());
          }
          break;
        
        case 87: // w
          console.log(getState());
          break;
      }
    }
  });

  document.addEventListener('keyup', function(e) {

    // don't perform shortcuts while typing in a text input.
    if (!(e.target.tagName.toLowerCase() == 'input' && e.target.getAttribute('type') == 'text')) {
      switch (e.keyCode) {
        case 32: // space
          dispatch(getActions().togglePlay());
          break;
      }
    }

    resetKeyCombo.length = 0;
  });

  inputEl.addEventListener('change', e => {
    dispatch(getActions().selectMIDIInput(e.target.value));
  });
}

function handleStateChanges(e) {
  const { state, action, actions, } = e.detail;
  switch (action.type) {
    case actions.SELECT_MIDI_INPUT:
    case actions.UPDATE_MIDI_PORTS:
      updateMIDIInputs(state);
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
