import React from 'react'
import ReactDOM from 'react-dom'

import 'font-awesome/css/font-awesome.css'
import 'styles/bootstrap-theme.scss'
import 'styles/bootstrap.scss'
import './app.css'

import App from 'containers/App/App'

import {hashHistory} from 'react-router'
import makeRoutes from './routes'

const routes = makeRoutes()

const mountNode = document.querySelector('#root');
ReactDOM.render(
  <App history={hashHistory}
        routes={routes} />,
mountNode);
