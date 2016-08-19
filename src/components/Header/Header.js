import React, { PropTypes as T } from 'react'
import {Col,  Row } from 'react-bootstrap';


import styles from './styles.module.css';

export class Header extends React.Component {
  render() {
    const {title} = this.props;

    return (
      <Col xs={12} sm={8} md={6} smOffset={2}  mdOffset={3}>
        <Row>
          Insert Nav Bar here
        </Row>
    	</Col> 
    )
  }
}

Header.propTypes = {
  title: T.string
}

Header.defaultProps = {
  title: 'common'
}

export default Header
