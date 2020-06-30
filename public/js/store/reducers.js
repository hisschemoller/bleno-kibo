
const initialState = {
  midiInputs: [],
  midiMessage: {},
  midiOutputs: [],
  midiSelectedOutput: null,
};

/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 * @param {String} action.type
 */
export default function reduce(state = initialState, action, actions = {}) {
  switch (action.type) {
    case actions.SEND_MIDI_MESSAGE:
      return {
        ...state,
        midiMessage: { ...action.data },
      };

    case actions.SELECT_MIDI_INPUT:
      return {
        ...state,
        midiSelectedInput: action.name,
      };

    case actions.UPDATE_MIDI_PORTS: {
      const { portNames, portType, } = action;
      return {
        ...state,
        midiInputs: portType === 'input' ? [ ...portNames ] : state.midiInputs,
        midiOutputs: portType === 'output' ? [ ...portNames ] : state.midiOutputs,
      };
    }

    default:
      return state ? state : initialState;
  }
}
