import { SYSTEM_LOAD, SYSTEM_UNLOAD } from '../actions';
import { watchSystem, unwatchSystem } from '../api/system';

export function loadSystem() {
  return dispatch => (
    watchSystem()
      .on('success',
        payload => dispatch({ type: SYSTEM_LOAD, payload })
      )
      .on('error',
        payload => dispatch({ type: SYSTEM_UNLOAD, error: true, payload })
      )
      .start()
  );
}

export function unloadSystem() {
  unwatchSystem();
  return { type: SYSTEM_UNLOAD };
}
