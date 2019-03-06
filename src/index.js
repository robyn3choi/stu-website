import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-app-polyfill/ie9';
import smoothscroll from 'smoothscroll-polyfill';
import 'polyfill-array-includes';
import {BrowserRouter} from 'react-router-dom';

smoothscroll.polyfill();

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
