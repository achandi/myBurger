import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleWare from 'redux-saga';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilder from './store/reducers/burgerBuilder';
import orders from './store/reducers/order';
import auth from './store/reducers/auth';
import { watchAuth, watchIng, watchOrd } from './store/sagas/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combReduce = combineReducers({
  burBuild: burgerBuilder,
  ord: orders,
  auth: auth,
});
const sagaMiddleware = createSagaMiddleWare();

const store = createStore(
  combReduce,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);
//after store created
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchIng);
sagaMiddleware.run(watchOrd);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
