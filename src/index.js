import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from "./store";
import {Provider} from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';
import Profile from './components/Profile'

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App}/>
          <Route exact path="/logout" component={Logout}/>
          <PrivateRoute path="/profile/:id" component={Profile}/>
          <PrivateRoute exact path="/myprofile" component={Profile}/>
        </Switch>
      </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
