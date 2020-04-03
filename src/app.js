import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes';

import "antd/dist/antd.css";
import './assets/styles/main.scss';
import './assets/styles/default.scss';

const store = configureStore();

const app = (<Provider store={store}>{routes(store)}</Provider>);

ReactDOM.render(app, document.querySelector("#root"));
