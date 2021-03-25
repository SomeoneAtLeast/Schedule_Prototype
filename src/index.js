import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app';
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ErrorBoundry from "../src/components/error-boundry"
import store from "./store/store"

ReactDOM.render(
  <Provider store = {store}>
    <ErrorBoundry>
      <Router>
        <React.StrictMode>
          <Route path="/" render={({location}) => {
              return (
                <App location={location}/>
              )
          }}/>
        </React.StrictMode>
      </Router>
    </ErrorBoundry>
  </Provider>
  , document.getElementById('root')
);