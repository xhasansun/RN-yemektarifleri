import React from 'react';
import AppNavigate from './navigation/AppNavigate';
import { Provider } from 'react-redux';
import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigate />
    </Provider>
  );
};

export default App;