import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app';
import {Provider} from "react-redux";
import {HashRouter as Router, Route} from 'react-router-dom';
import ErrorBoundry from "../src/components/error-boundry"
import Service from "./services/service"
import Context from "./context"
import store from "./store/store"

const service = new Service();

ReactDOM.render(
  <Provider store = {store}>
    <ErrorBoundry>
      <Context.Provider value={service}>
        <Router>
          <React.StrictMode>
            <Route path="/" render={({location}) => {
                return (
                  <App location={location}/>
                )
            }}/>
          </React.StrictMode>
        </Router>
      </Context.Provider>
    </ErrorBoundry>
  </Provider>
  , document.getElementById('root')
);