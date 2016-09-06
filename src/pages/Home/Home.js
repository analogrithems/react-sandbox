import React, { PropTypes as T } from 'react';
import {Link} from 'react-router';

import styles from './styles.module.css';

export class Home extends React.Component {
  render() {
    return (
      <div className={styles.content}>
        <h1>Takes a Village</h1>
        <p className={styles.padding}>
          Takes a village is a collaborative task tool that allows people to work on a list of tasks in real time.  Everyone can add and complete tasks.  Often times though working together means communicating together. Takes-A-Village has a realtime secure chat client built right into your task list.
        </p>
        <p>
          <Link to="signup">Signup</Link>
        </p>
        <p>
          <Link to="login">Login</Link>
        </p>
      </div>
    )
  }
}

export default Home;
