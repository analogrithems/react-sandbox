import React, { PropTypes as T } from 'react';
import {Link} from 'react-router';

import styles from './styles.module.css';

export class App extends React.Component {
  render() {
    return (
      <div className={styles.content}>
        <h1>Takes a Village - Dashboard</h1>
        <p className={styles.padding}>
          Todo
          <ul>
            <li>nav bar</li>
            <li>preferences</li>
            <li>Organization/Group Manager</li>
            <li>task manager</li>
            <li>chat client</li>
          </ul>
        </p>
      </div>
    )
  }
}

export default App;
