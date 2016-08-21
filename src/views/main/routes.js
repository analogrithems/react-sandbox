import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Container from './Container'
import MarketingHome from './marketingHome/MarketingHome'

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container}>
      {/* Lazy-loading */}
      <Route path="login" getComponent={(location, cb) => {
          require.ensure([], (require) => {
            const mod = require('components/Login/Login');
            cb(null, mod.default);
          });
        }} />
      <Route path="signup" getComponent={(location, cb) => {
          require.ensure([], (require) => {
            const mod = require('./signup/Signup');
            cb(null, mod.default);
          });
        }} />
      <Route path="app" getComponent={(location, cb) => {
          require.ensure([], (require) => {
            const mod = require('./app/App');
            cb(null, mod.default);
          });
        }} />
      {/* inline loading */}
      <IndexRoute component={MarketingHome} />
    </Route>
  )
}

export default makeMainRoutes
