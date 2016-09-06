import React from 'react'
import { Link } from 'react-router'

/*
 * This page is really just the container around the app as a whole
 *  A bit of trial and error will be needed to figure out the exact logic
 * 
 */

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>Taks-A-Village</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

export default App