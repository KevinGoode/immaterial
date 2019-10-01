import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Main from './components/Main';
export default () => (
  <Provider store={store}>
      <Main />
  </Provider>
);
/*
//ORIGINAL CODE
import React from 'react';
import Button from '@material-ui/core/Button';
function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}

export default App;
*/