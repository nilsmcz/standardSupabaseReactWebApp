import React from 'react';
import { I18nextProvider } from "react-i18next";
import i18next from "./i18n/i18n.config"
import NavigationCentral from './navigation/NavigationCentral';
import './supabase/sessionHandler.js'
import store from './redux/store.js';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <NavigationCentral />
      </I18nextProvider>
    </Provider>
  );
}

export default App;
