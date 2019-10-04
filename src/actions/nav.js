// (C) Copyright 2019 KG
import {
  NAV_SHOW
} from '../actions';

export function navShow(yesno) {
  return { type: NAV_SHOW, show:yesno };
}



