// (C) Copyright 2019 KG
import React from 'react';
import {NAV_SHOW} from '../actions';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import TimerIcon from '@material-ui/icons/Timer';
import { createReducer } from './utils';
// Material icons are documented here:
//https://material.io/resources/icons/?style=baseline

const initialState = {
  show: false, // start with nav active
  enabled: true, // start with nav disabled
  items: [
    { path: '/dashboard', label: 'Dashboard', icon: <InsertChartIcon/>},
    { path: '/system', label: 'System' , icon: <DeveloperBoardIcon/>},
    { path: '/tasks', label: 'Tasks', icon: <TimerIcon/>}
  ]
};

const handlers = {
  [NAV_SHOW]: (_, action) => (
    { show: action.show}
  )

};

export default createReducer(initialState, handlers);
