import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from "./store";
import {Provider} from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App}/>
          <Route exact path="/logout" component={App}/>
        </Switch>
      </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
