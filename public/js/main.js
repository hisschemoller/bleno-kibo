import { accessMidi, setup as setupMidi, } from './midi/midi.js';
import { dispatch, getActions, getState, persist } from './store/store.js';
import { setup as setupControls } from './view/controls.js';

async function main() {
  await accessMidi();
  setupControls();
  persist();
  setupMidi();
}

main();