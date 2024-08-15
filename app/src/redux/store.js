import { createStore } from 'redux';
import rootReducer from './reducers'; // Ersetzen Sie dies durch den tatsächlichen Pfad zu Ihrem Root-Reducer

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
