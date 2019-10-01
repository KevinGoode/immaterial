import { SYSTEM_LOAD, SYSTEM_UNLOAD } from '../actions';
import { createReducer } from './utils';

const initialState = {
  system: {}
};

const handlers = {
  [SYSTEM_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return action.payload;
    }
    return { error: action.payload };
  },
  [SYSTEM_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers);
