import { accessMidi, setup as setupMidi, } from './midi/midi.js';
import { dispatch, getActions, getState, persist } from './store/store.js';
import { setup as setupControls } from './view/controls.js';
import { setup as setupSocket } from './midi/socket.js';

async function main() {
  await accessMidi();
  setupControls();
  setupSocket();
  persist();
  setupMidi();
}

main();
