import React, { PropTypes as T } from 'react'
import {Col,  Grid, Row } from 'react-bootstrap';
import Header from './Header'
import styles from './styles.module.css'

export class Dashboard extends React.Component {
  renderChildren() {
    const childProps = {
      ...this.props
    };
    const {children} = this.props;
    return React.Children.map(children,
              c => React.cloneElement(c, childProps));
  }
  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col lg={8} lgOffset={2} md={8} mdOffset={2} xs={10} xsOffset={1} >
              <Header title="Tasker" />
              <div className={styles.content}>
                {this.renderChildren()}
              </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Dashboard.contextTypes = {
  router: T.object
}

export default Dashboard
