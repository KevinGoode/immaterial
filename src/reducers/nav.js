// (C) Copyright 2019 KG

import {
  NAV_SHOW
} from '../actions';

import { createReducer } from './utils';

const initialState = {
  show: false, // start with nav active
  enabled: true, // start with nav disabled
  items: [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/system', label: 'System' },
    { path: '/tasks', label: 'Tasks' }
  ]
};

const handlers = {
  [NAV_SHOW]: (_, action) => (
    { show: action.show}
  )

};

export default createReducer(initialState, handlers);
