import React from 'react';
import {  Route} from 'react-router-dom';
export function createReducer(initialState, handlers) {
  return (state = initialState, action) => {
    const handler = handlers[action.type];
    if (!handler) return state;
    return { ...state, ...handler(state, action) };
  };
}
export const PropsRoute = ({ component, ...rest }) => {
  //https://github.com/ReactTraining/react-router/issues/4105
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}
export default { createReducer};
