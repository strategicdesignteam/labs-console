import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'react-redux';

import store from './core/store';
import router from './core/router';
import history from './core/history';
import labsApi from './data/index';

//polyfill scripts
import objectAssign from './core/object-assign';
import find from './core/find';
import htmlElementShim from './core/htmlElementShim';

//webcomponents
import pfTabs from './components/Tabs/pf-tabs.component';

let routes = require('./routes.json'); // Loaded with utils/routes-loader.js
const container = document.getElementById('main');

function renderComponent(component) {
  ReactDOM.render(<Provider store={store}>{component}</Provider>, container);
}

// Find and render a web page matching the current URL path,
// if such page is not found then render an error page (see routes.json, core/router.js)
function render(location) {
  // Check if user logged in, if not, route to login page
  let loginApi = labsApi.LoginApi.instance;
  loginApi.getCredentials();
  
  if((!loginApi.loggedInUser || !loginApi.credentials ) && location.pathname !== '/'){
    return history.push('/');
  }

  router.resolve(routes, location)
    .then(renderComponent)
    .catch(error => router.resolve(routes, { ...location, error }).then(renderComponent));
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/ReactJSTraining/history/tree/master/docs#readme
history.listen(render);
render(history.getCurrentLocation());

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./routes.json', () => {
    routes = require('./routes.json'); // eslint-disable-line global-require
    render(history.getCurrentLocation());
  });
}
