import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

import apiConf from './configs/apiConf'

import 'font-awesome/css/font-awesome.css'
import 'styles/bootstrap-theme.scss'
import 'styles/bootstrap.scss'
import './app.css'


/*
*  Table of Contents - In our Single Page application
*
*/
import About from 'pages/About/About'
import App from 'pages/App/App'
import Dashboard from 'pages/Dashboard/Dashboard'
import Login from 'pages/Login/Login'
import Home from 'pages/Home/Home'
import Profile from 'pages/Profile/Profile'
import Project from 'pages/Project/Project'
import Signup from 'pages/Signup/Signup'

const routes = {
  path: '/'
  ,component: App
  ,indexRoute: { component: Home }
  ,childRoutes: [
    { path: 'about', component: About }
    ,{ path: 'login', component: Login }
    ,{ path: 'signup', component: Signup }
    ,{
      path: 'dashboard'
      ,component: Dashboard
      ,childRoutes: [
        {
          path: 'profile', component: Profile 
        }
        ,{
          path: 'project/:id'
          ,component: Project
          ,childRoutes: []
        }
      ]
    }
  ]
};

const configs = {
  apiConf
};

const mountNode = document.querySelector('#root');

// Start The Show
render(<Router routes={routes} history={hashHistory} />, mountNode)

